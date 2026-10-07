// Runs the REAL send-enquiry.php under real PHP (php-wasm), on every PHP version a host is likely to use.
// mail() and the mail server are stand-ins, so every message can be inspected.
//   node php-mailer.test.mjs            all versions
//   node php-mailer.test.mjs 8.3        one version
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { ROOT, PROD_ORIGIN, newPhp, recorder } from './lib.mjs';

const SCRIPT = fs.readFileSync(process.env.SCRIPT_PATH || ROOT + '/send-enquiry.php', 'utf8');
const versions = process.argv.slice(2).length ? process.argv.slice(2) : ['7.4', '8.0', '8.1', '8.2', '8.3', '8.4', '8.5'];
const OUT = '/tmp/pfp-php-test-out';
const MAILBOX = 'inquires@premiumfuneralplanning.co.za';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// ---- stand-ins loaded in front of the real script -------------------------------------------
const STUBS = String.raw`<?php
namespace PFP {
    // stand-in for the server's mail(): records the call, then behaves as the test asks
    function mail($to, $subject, $message, $headers = '', $params = '') {
        $f = '/tmp/mail-calls.json';
        $calls = is_file($f) ? json_decode(file_get_contents($f), true) : array();
        $calls[] = array('to' => $to, 'subject' => $subject, 'message' => $message, 'headers' => $headers, 'params' => $params);
        file_put_contents($f, json_encode($calls));
        $mode = is_file('/tmp/mail-mode') ? trim(file_get_contents('/tmp/mail-mode')) : 'ok';
        if ($mode === 'throw') { throw new \RuntimeException('boom from mail in /home/u/public_html/x.php'); }
        if ($mode === 'fatal') { ini_set('memory_limit', '4M'); $boom = str_repeat('x', 64 * 1024 * 1024); }   // a real out-of-memory crash
        if ($mode === 'fail-all') { return false; }
        if ($mode === 'fail-first' && $params !== '') { return false; }
        return true;
    }

    function smtp_cfg() { return json_decode(is_file('/tmp/fake-smtp.json') ? file_get_contents('/tmp/fake-smtp.json') : '{}', true); }
    function smtp_note($line) { file_put_contents('/tmp/smtp-log.txt', $line . "\n", FILE_APPEND); }

    function stream_socket_client($address, &$errno = null, &$errstr = null, $timeout = null, $flags = null, $context = null) {
        $cfg = smtp_cfg();
        smtp_note('CONNECT ' . $address);
        preg_match('/:(\d+)$/', $address, $m);
        $refuse = isset($cfg['refuse_ports']) ? $cfg['refuse_ports'] : array();
        if (in_array((int) $m[1], $refuse, true)) { $errno = 111; $errstr = 'Connection refused'; return false; }
        return fopen('fakesmtp://' . $address, 'r+');
    }
    function stream_socket_enable_crypto($stream, $enable, $method = null, $session = null) {
        $cfg = smtp_cfg();
        smtp_note('TLS-ENABLED');
        return !isset($cfg['tls_ok']) || $cfg['tls_ok'];
    }

    // a pretend mail server, spoken to through a PHP stream
    class FakeSmtp {
        public $context;
        private $cfg = array(); private $out = ''; private $in = ''; private $data = false; private $msg = '';
        private $tls = false; private $auth = null; private $authUser = '';
        function stream_open($path, $mode, $options, &$opened) {
            $this->cfg = smtp_cfg();
            $this->out = array_key_exists('greeting', $this->cfg) ? $this->cfg['greeting'] : "220 fake.example ESMTP ready\r\n";
            return true;
        }
        function stream_read($count) { $chunk = (string) substr($this->out, 0, $count); $this->out = (string) substr($this->out, strlen($chunk)); return $chunk; }
        function stream_eof() { return false; }
        function stream_set_option($option, $arg1, $arg2) { return false; }
        function stream_close() {}
        function stream_flush() { return true; }
        function stream_write($d) {
            $this->in .= $d;
            while (true) {
                if ($this->data) {
                    $end = strpos($this->in, "\r\n.\r\n");
                    if ($end === false) { break; }
                    $this->msg = substr($this->in, 0, $end + 2);
                    $this->in = (string) substr($this->in, $end + 5);
                    smtp_note("DATA-BEGIN\n" . $this->msg . "DATA-END");
                    $this->data = false;
                    $this->out .= array_key_exists('data_reply', $this->cfg) ? $this->cfg['data_reply'] : "250 2.0.0 Ok: queued\r\n";
                    continue;
                }
                $p = strpos($this->in, "\r\n");
                if ($p === false) { break; }
                $line = substr($this->in, 0, $p);
                $this->in = (string) substr($this->in, $p + 2);
                $this->command($line);
            }
            return strlen($d);
        }
        private function say($text) { $this->out .= $text; }
        private function command($line) {
            $c = $this->cfg;
            if ($this->auth === 'user') { $this->authUser = base64_decode($line); $this->auth = 'pass'; smtp_note('C: [login user step]'); $this->say("334 UGFzc3dvcmQ6\r\n"); return; }
            if ($this->auth === 'pass') { $this->auth = null; smtp_note('C: [login password step]'); $this->finishAuth($this->authUser, base64_decode($line)); return; }
            $u = strtoupper($line);
            smtp_note('C: ' . (strpos($u, 'AUTH PLAIN ') === 0 ? 'AUTH PLAIN [credentials]' : $line));
            if (strpos($u, 'EHLO') === 0 || strpos($u, 'HELO') === 0) {
                $caps = ($this->tls && isset($c['ehlo_tls'])) ? $c['ehlo_tls'] : (isset($c['ehlo']) ? $c['ehlo'] : "250-fake.example\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n");
                $this->say($caps); return;
            }
            if ($u === 'STARTTLS') { $this->say(isset($c['starttls_reply']) ? $c['starttls_reply'] : "220 2.0.0 Ready to start TLS\r\n"); $this->tls = true; return; }
            if (strpos($u, 'AUTH PLAIN ') === 0) { $parts = explode("\0", base64_decode(substr($line, 11))); $this->finishAuth(isset($parts[1]) ? $parts[1] : '', isset($parts[2]) ? $parts[2] : ''); return; }
            if ($u === 'AUTH LOGIN') { $this->auth = 'user'; $this->say("334 VXNlcm5hbWU6\r\n"); return; }
            if (strpos($u, 'MAIL FROM:') === 0) { $this->say(isset($c['mail_reply']) ? $c['mail_reply'] : "250 2.1.0 Ok\r\n"); return; }
            if (strpos($u, 'RCPT TO:') === 0) { $this->say(isset($c['rcpt_reply']) ? $c['rcpt_reply'] : "250 2.1.5 Ok\r\n"); return; }
            if ($u === 'DATA') { $this->data = true; $this->say("354 End data with <CR><LF>.<CR><LF>\r\n"); return; }
            if ($u === 'QUIT') { $this->say("221 2.0.0 Bye\r\n"); return; }
            $this->say("502 5.5.2 Error: command not recognized\r\n");
        }
        private function finishAuth($user, $pass) {
            $c = $this->cfg;
            $ok = !isset($c['auth_ok']) || $c['auth_ok'];
            if (isset($c['expect_user']) && $user !== $c['expect_user']) { $ok = false; }
            if (isset($c['expect_pass']) && $pass !== $c['expect_pass']) { $ok = false; }
            smtp_note('AUTH-RESULT ' . ($ok ? 'accepted' : 'rejected') . ' user=' . $user);
            $this->say($ok ? "235 2.7.0 Authentication successful\r\n" : "535 5.7.8 Authentication failed\r\n");
        }
    }
}
namespace {
    error_reporting(E_ALL);
    set_error_handler(function ($no, $str, $file, $line) {
        if (!(error_reporting() & $no)) { return true; }
        file_put_contents('/tmp/errors.log', "[$no] $str @ " . basename($file) . ":$line\n", FILE_APPEND);
        return true;
    });
    stream_wrapper_register('fakesmtp', 'PFP\FakeSmtp');
}
`;
const WRAPPER = String.raw`<?php
require __DIR__ . '/stubs.php';
if (isset($_SERVER['HTTP_X_TEST_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_TEST_IP']; }
$_SERVER['DOCUMENT_ROOT'] = isset($_SERVER['HTTP_X_TEST_DOCROOT']) ? $_SERVER['HTTP_X_TEST_DOCROOT'] : '/home/u/public_html';
if (isset($_SERVER['HTTP_X_TEST_SERVER_NAME'])) { $_SERVER['SERVER_NAME'] = $_SERVER['HTTP_X_TEST_SERVER_NAME']; }
require __DIR__ . '/send-enquiry.php';
`;
const UNIT = String.raw`<?php
define('PFP_NO_RUN', true);
require __DIR__ . '/stubs.php';
$_SERVER['DOCUMENT_ROOT'] = '/home/u/public_html';
require __DIR__ . '/send-enquiry.php';
echo json_encode((function () { return include '/tmp/unit-code.php'; })());
`;

const R = recorder();
const manifest = [];
const form = (o) => new URLSearchParams(o).toString();
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
const decodeQp = (s) => Buffer.from(s.replace(/=\n/g, '').replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))), 'latin1').toString('utf8');

for (const v of versions) {
  const php = await newPhp(v);
  for (const d of ['/home', '/home/u', '/home/u/public_html']) { try { php.mkdir(d); } catch (_) {} }
  const SITE = '/home/u/public_html';
  php.writeFile(SITE + '/send-enquiry.php', SCRIPT);
  php.writeFile(SITE + '/stubs.php', STUBS);
  php.writeFile(SITE + '/wrapper.php', WRAPPER);
  php.writeFile(SITE + '/unit.php', UNIT);

  const sh = async (code) => (await php.run({ code: '<?php ' + code })).text;
  const check = (label, cond, detail = '') => R.check(`[PHP ${v}] ${label}`, cond, detail);
  const reset = async (mode = 'ok') => {
    await sh('foreach ((array)glob("/tmp/pfp_rl_*") as $f) @unlink($f); foreach (array("/tmp/mail-calls.json","/tmp/smtp-log.txt","/tmp/fake-smtp.json","/home/u/pfp-mail-password.txt","/home/u/public_html/pfp-mail-password.txt") as $f) @unlink($f); file_put_contents("/tmp/mail-mode", ' + JSON.stringify(mode) + ');');
  };
  const mails = async () => JSON.parse((await sh('echo is_file("/tmp/mail-calls.json") ? file_get_contents("/tmp/mail-calls.json") : "[]";')) || '[]');
  const smtpLog = async () => await sh('echo is_file("/tmp/smtp-log.txt") ? file_get_contents("/tmp/smtp-log.txt") : "";');
  const setSmtp = (cfg) => php.writeFile('/tmp/fake-smtp.json', JSON.stringify(cfg));
  const setPassword = (content, where = '/home/u/pfp-mail-password.txt') => php.writeFile(where, content);
  const unit = async (code) => {
    php.writeFile('/tmp/unit-code.php', '<?php ' + code);
    const r = await php.run({ scriptPath: SITE + '/unit.php', method: 'GET' });
    try { return JSON.parse(r.text); } catch (_) { return { __raw: r.text }; }
  };

  const good = { name: 'Lesego Mokoena', phone: '065 611 1247', package: 'Package 2 - Grocery & Cash - R395', age: '18-64 years', page: PROD_ORIGIN + '/', _honey: '' };
  const call = async (opts = {}) => {
    let r;
    try {
      r = await php.run({
        scriptPath: SITE + '/wrapper.php',
        method: opts.method || 'POST',
        headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': PROD_ORIGIN, 'X-Test-IP': '10.0.0.1' }, opts.headers || {}),
        body: new TextEncoder().encode(opts.body !== undefined ? opts.body : form(Object.assign({}, good, opts.fields || {}))),
      });
    } catch (e) {
      if (e && e.response) r = e.response; // PHP exited with a fatal error: the reply it produced is still what a browser would get
      else throw e;
    }
    let json = null; try { json = JSON.parse(r.text); } catch (_) {}
    const hdr = (n) => { const h = r.headers || {}; const k = Object.keys(h).find((x) => x.toLowerCase() === n.toLowerCase()); return k ? [].concat(h[k]).join(', ') : ''; };
    return { status: r.httpStatusCode, text: r.text, json, hdr };
  };
  const saveMail = async (tag, expect) => {
    const m = (await mails()).slice(-1)[0];
    if (!m) { check(tag + ': an email was captured', false); return; }
    const file = `${OUT}/${v}__${tag}.json`;
    fs.writeFileSync(file, JSON.stringify({ kind: 'mail', ...m }));
    manifest.push(Object.assign({ file }, expect));
  };
  const saveSmtp = async (tag, expect) => {
    const log = await smtpLog();
    const m = log.match(/DATA-BEGIN\n([\s\S]*?)DATA-END/);
    if (!m) { check(tag + ': a message went through the mail server', false); return null; }
    const file = `${OUT}/${v}__${tag}.json`;
    fs.writeFileSync(file, JSON.stringify({ kind: 'raw', message: m[1] }));
    manifest.push(Object.assign({ file }, expect));
    return m[1];
  };

  // ---- 1. anything but POST is refused, with a helpful body ---------------------------------
  await reset();
  for (const m of ['GET', 'PUT', 'DELETE']) {
    const r = await call({ method: m, body: '' });
    check(`${m} -> 405`, r.status === 405 && r.json && r.json.ok === false && r.json.service === 'pfp-enquiry', `got ${r.status} ${r.text.slice(0, 80)}`);
    check(`${m} -> Allow: POST`, /POST/.test(r.hdr('Allow')));
  }
  { const r = await call({ method: 'GET', body: '' });
    check('GET reports php version, mail() and that no mailbox login is set', r.json && /^\d+\.\d+$/.test(r.json.php) && r.json.mail === true && r.json.login === false, r.text);
    setPassword('secret');
    const r2 = await call({ method: 'GET', body: '' });
    check('GET reports login:true once the password file exists, and never shows it', r2.json && r2.json.login === true && !/secret/.test(r2.text), r2.text); }

  // ---- 2. happy path via mail() ---------------------------------------------------------------
  await reset();
  { const r = await call();
    check('valid form POST -> 200 {ok:true, via:mail}', r.status === 200 && r.json && r.json.ok === true && r.json.via === 'mail', `got ${r.status} ${r.text.slice(0, 120)}`);
    check('reply is JSON, never cached', /json/i.test(r.hdr('Content-Type')) && /no-store/i.test(r.hdr('Cache-Control')));
    const ms = await mails();
    check('exactly one email sent', ms.length === 1, `got ${ms.length}`);
    if (ms[0]) {
      check('sent to the PFP mailbox', ms[0].to === MAILBOX);
      check('envelope sender -f given', ms[0].params === '-f' + MAILBOX);
      check('subject has no line breaks', !/[\r\n]/.test(ms[0].subject), JSON.stringify(ms[0].subject));
      check('subject text', ms[0].subject === 'New callback request: Package 2 - Lesego Mokoena', ms[0].subject);
    }
    await saveMail('ok-form', { subject: 'New callback request: Package 2 - Lesego Mokoena', has: ['Name:      Lesego Mokoena', 'Phone:     065 611 1247', 'Package:   Package 2 - Grocery & Cash - R395', 'Age band:  18-64 years', 'Page:      ' + PROD_ORIGIN + '/', 'https://wa.me/27656111247', '(SA time)'], hasNot: [] });
  }
  await reset();
  { const r = await call({ headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(good) });
    check('valid JSON POST -> 200', r.status === 200 && r.json && r.json.ok === true, `got ${r.status} ${r.text.slice(0, 120)}`); }
  await reset();
  { const r = await call({ fields: { _honey: 'http://spam.example' } });
    check('honeypot -> 200 ok but nothing sent', r.status === 200 && r.json.ok === true && (await mails()).length === 0); }

  // ---- 3. validation ---------------------------------------------------------------------------
  const bad = async (label, fields, expectStatus = 422) => {
    await reset();
    const r = await call({ fields });
    check(`${label} -> ${expectStatus}, nothing sent`, r.status === expectStatus && r.json && r.json.ok === false && (await mails()).length === 0, `got ${r.status} ${r.text.slice(0, 80)}`);
  };
  await bad('phone with letters', { phone: 'abc def ghi jkl' });
  await bad('phone too short', { phone: '12345678' });
  await bad('phone too long', { phone: '1234567890123456' });
  await bad('phone empty', { phone: '' });
  await bad('name too short', { name: 'A' });
  await bad('name empty', { name: '' });
  await bad('name over 80 chars', { name: 'x'.repeat(81) });
  await bad('name with link', { name: 'visit http://spam.example now' });
  await bad('name with www', { name: 'www.spam.example' });
  await bad('name with <script>', { name: '<script>alert(1)</script>' });
  await bad('package 9', { package: 'Package 9 - nope' });
  await bad('package missing', { package: '' });
  await bad('package with html', { package: 'Package 1 <b>' });
  await bad('age too short', { age: 'x' });
  await bad('age with html', { age: '18-64 <i>' });
  { await reset(); const r = await call({ body: 'name%5B%5D=x&phone=0656111247&package=Package+1&age=18-64+years' });
    check('name as an array -> 422', r.status === 422 && (await mails()).length === 0, `got ${r.status}`); }
  { await reset(); const r = await call({ body: 'name=%FF%FEabc&phone=0656111247&package=Package+1&age=18-64+years' });
    check('invalid UTF-8 name -> 422', r.status === 422 && r.json && r.json.ok === false && (await mails()).length === 0, `got ${r.status} ${r.text.slice(0, 120)}`); }
  { await reset(); const r = await call({ body: '' });
    check('empty POST -> 400', r.status === 400 && r.json && r.json.ok === false, `got ${r.status}`); }
  { await reset(); const r = await call({ headers: { 'Content-Type': 'application/json' }, body: '{not json' });
    check('broken JSON -> 400', r.status === 400, `got ${r.status}`); }

  // ---- 4. only our own website may post --------------------------------------------------------
  await reset();
  { const r = await call({ headers: { Origin: 'https://evil.example' } });
    check('foreign Origin -> 403, nothing sent', r.status === 403 && (await mails()).length === 0, `got ${r.status}`); }
  { await reset(); const r = await call({ headers: { Origin: '', Referer: 'https://evil.example/page' } });
    check('foreign Referer -> 403', r.status === 403, `got ${r.status}`); }
  for (const [label, o] of [['non-www own Origin', 'https://premiumfuneralplanning.co.za'], ['http (not https) own Origin', 'http://www.premiumfuneralplanning.co.za'], ['Origin: null', 'null'], ['no Origin/Referer at all', '']]) {
    await reset(); const r = await call({ headers: { Origin: o, Referer: '' } });
    check(`${label} -> allowed`, r.status === 200, `got ${r.status}`);
  }
  { await reset(); const r = await call({ headers: { Origin: 'https://www.premiumfuneralplanning.co.za.evil.example' } });
    check('look-alike host -> 403', r.status === 403, `got ${r.status}`); }

  // ---- 5. header injection can't work ----------------------------------------------------------
  await reset();
  { const r = await call({ fields: { name: 'Bob\r\nBcc: evil@example.com\r\nSubject: hacked' } });
    const ms = await mails();
    check('CRLF in name still sends (cleaned)', r.status === 200 && ms.length === 1, `got ${r.status}`);
    if (ms[0]) {
      check('no raw CR/LF in subject', !/[\r\n]/.test(ms[0].subject), JSON.stringify(ms[0].subject));
      check('no Bcc header created', !/^Bcc:/im.test(ms[0].headers) && ms[0].headers.split('\n').length === 5, JSON.stringify(ms[0].headers));
    } }
  await reset();
  { await call({ fields: { phone: '0656111247\r\nBcc: evil@example.com' } }); const ms = await mails();
    check('CRLF in phone cannot add headers', ms.length === 0 || !/^Bcc:/im.test(ms[0].headers)); }
  await reset();
  { const r = await call({ fields: { name: 'Ann\u0000\u0007\u001bMarie' } }); const ms = await mails();
    check('control characters in name -> still 200', r.status === 200 && ms.length === 1, `got ${r.status}`);
    if (ms[0]) {
      check('no control characters left in subject', !/[\x00-\x1F\x7F]/.test(ms[0].subject), JSON.stringify(ms[0].subject));
      check('control characters replaced by a space', ms[0].subject === 'New callback request: Package 2 - Ann Marie', JSON.stringify(ms[0].subject));
    } }

  // ---- 6. names from any language survive intact -----------------------------------------------
  await reset();
  { const r = await call({ fields: { name: 'Zoë Ndlovu', package: 'Package 3 - Grocery & Catering - R445', age: '65-75 years' } });
    check('non-ASCII name -> 200', r.status === 200, `got ${r.status}`);
    await saveMail('non-ascii', { subject: 'New callback request: Package 3 - Zoë Ndlovu', has: ['Name:      Zoë Ndlovu', 'Package:   Package 3 - Grocery & Catering - R445', 'Age band:  65-75 years'], hasNot: [] }); }
  await reset();
  { const long = 'é'.repeat(80);
    const r = await call({ fields: { name: long } });
    check('80-char non-ASCII name -> 200', r.status === 200, `got ${r.status}`);
    const m = (await mails())[0];
    if (m) {
      const words = m.subject.split('\r\n ');
      check('each encoded word <= 75 chars', words.every((w) => w.length <= 75), words.map((w) => w.length).join(','));
      check('only CRLF+space folds in subject', !/(?<!\r)\n|\r(?!\n )/.test(m.subject));
    }
    await saveMail('long-non-ascii', { subject: 'New callback request: Package 2 - ' + long, has: ['Name:      ' + long], hasNot: [] }); }
  await reset();
  { const r = await call({ fields: { name: 'Thabo "Tee" O\'Neil & Sons = 50%' } });
    check('quotes, apostrophe, &, =, % are fine', r.status === 200, `got ${r.status}`);
    await saveMail('punctuation', { subject: 'New callback request: Package 2 - Thabo "Tee" O\'Neil & Sons = 50%', has: ['Name:      Thabo "Tee" O\'Neil & Sons = 50%'], hasNot: [] }); }

  // ---- 7. WhatsApp link only for numbers we recognise ------------------------------------------
  for (const [phone, expect] of [['065 611 1247', '27656111247'], ['0656111247', '27656111247'], ['+27 65 611 1247', '27656111247'], ['0027656111247', '27656111247'], ['(011) 555-0199', '27115550199'], ['+44 7700 900123', '']]) {
    await reset();
    const r = await call({ fields: { phone } });
    const m = (await mails())[0];
    check(`phone "${phone}" accepted`, r.status === 200 && !!m, `got ${r.status}`);
    if (m) { const link = (decodeQp(m.message).match(/https:\/\/wa\.me\/(\d+)/) || [])[1] || ''; check(`phone "${phone}" -> wa.me/${expect || '(none)'}`, link === expect, `got "${link}"`); }
  }
  await reset();
  { await call({ fields: { page: 'https://evil.example/x' } }); const m = (await mails())[0];
    check('foreign page URL is left out', m && !/evil\.example/.test(m.message)); }
  await reset();
  { await call({ fields: { page: 'javascript:alert(1)' } }); const m = (await mails())[0];
    check('javascript: page is left out', m && !/javascript/.test(m.message)); }

  // ---- 8. mail() trouble is reported plainly, never as a silent empty 500 ----------------------
  await reset('fail-first');
  { const r = await call(); const ms = await mails();
    check('first mail() attempt refused -> retries without -f and succeeds', r.status === 200 && r.json.via === 'mail' && ms.length === 2 && ms[0].params !== '' && ms[1].params === '', `got ${r.status}, calls=${ms.length}`); }
  await reset('fail-all');
  { const r = await call(); const ms = await mails();
    check('mail() always refused -> 500 JSON with a code and the reasons', r.status === 500 && r.json && r.json.ok === false && r.json.code === 'send_failed' && ms.length === 2, `got ${r.status} ${r.text.slice(0, 200)}`);
    check('...reason says there is no password file', r.json && /no pfp-mail-password\.txt found/.test(r.json.detail), r.text);
    check('...reason says mail() was refused and names sendmail_path', r.json && /mail\(\) was refused/.test(r.json.detail) && /sendmail_path:/.test(r.json.detail), r.text);
    check('...detail is one short line with no folder names', r.json && !/[\r\n]/.test(r.json.detail) && r.json.detail.length <= 400 && !/\/home\//.test(r.json.detail), r.text); }
  await reset('throw');
  { const r = await call();
    check('an exception inside sending -> 500 JSON code:exception (not an empty page)', r.status === 500 && r.json && r.json.code === 'exception' && /boom from mail/.test(r.json.detail) && !/\/home\//.test(r.json.detail), `got ${r.status} ${r.text.slice(0, 200)}`); }
  await reset('fatal');
  { const r = await call();
    check('a fatal error inside sending -> 500 JSON code:fatal (not an empty page)', r.status === 500 && r.json && r.json.code === 'fatal' && /Allowed memory size/.test(r.json.detail) && !/\/home\//.test(r.json.detail), `got ${r.status} ${r.text.slice(0, 200)}`); }

  // ---- 9. sending through the mailbox's own login ----------------------------------------------
  const PASS = `Sup3r pass'"\\ $x ;<>&`;
  const EXPECT = { subject: 'New callback request: Package 2 - Lesego Mokoena', has: ['Name:      Lesego Mokoena', 'Phone:     065 611 1247', 'Package:   Package 2 - Grocery & Cash - R395', 'Age band:  18-64 years', 'https://wa.me/27656111247'], hasNot: [] };

  // 9a. implicit-TLS port 465, AUTH PLAIN, a hard password
  await reset();
  setPassword(PASS + '\r\n');
  setSmtp({ expect_user: MAILBOX, expect_pass: PASS });
  { const r = await call(); const log = await smtpLog();
    check('login send -> 200 via smtp', r.status === 200 && r.json && r.json.ok === true && r.json.via === 'smtp', `got ${r.status} ${r.text.slice(0, 200)}\n${log}`);
    check('mail() was not used', (await mails()).length === 0);
    check('connected to localhost:465 over TLS first', /CONNECT ssl:\/\/localhost:465/.test(log), log);
    check('said hello, logged in with PLAIN, accepted by the server (user + exact password)', /C: EHLO [A-Za-z0-9.\-]+/.test(log) && /C: AUTH PLAIN \[credentials\]/.test(log) && new RegExp('AUTH-RESULT accepted user=' + MAILBOX.replace(/[.]/g, '\\.')).test(log), log);
    check('envelope: MAIL FROM and RCPT TO are the mailbox', log.includes(`C: MAIL FROM:<${MAILBOX}>`) && log.includes(`C: RCPT TO:<${MAILBOX}>`), log);
    check('commands in the right order', log.indexOf('C: EHLO') < log.indexOf('AUTH PLAIN') && log.indexOf('AUTH PLAIN') < log.indexOf('MAIL FROM') && log.indexOf('MAIL FROM') < log.indexOf('RCPT TO') && log.indexOf('RCPT TO') < log.indexOf('C: DATA') && log.indexOf('C: DATA') < log.indexOf('DATA-BEGIN') && log.indexOf('DATA-END') < log.indexOf('C: QUIT'), log);
    const msg = await saveSmtp('smtp-465', EXPECT);
    if (msg) {
      check('message uses CRLF line endings only', !/(^|[^\r])\n/.test(msg), JSON.stringify(msg.slice(0, 200)));
      check('message has Date, Message-ID, From, To, Subject headers', /^Date: .+\r\nMessage-ID: <[0-9a-f]+@premiumfuneralplanning\.co\.za>\r\nFrom: PFP Website <inquires@premiumfuneralplanning\.co\.za>\r\nTo: inquires@premiumfuneralplanning\.co\.za\r\nSubject: New callback request: Package 2 - Lesego Mokoena\r\n/.test(msg), msg.slice(0, 400));
    } }

  // 9b. wrong password -> falls back to mail()
  await reset();
  setPassword('wrong password');
  setSmtp({ expect_user: MAILBOX, expect_pass: 'the right one' });
  { const r = await call();
    check('login refused (535) -> falls back to mail() and still succeeds', r.status === 200 && r.json && r.json.via === 'mail' && (await mails()).length === 1, `got ${r.status} ${r.text.slice(0, 200)}`); }
  await reset('fail-all');
  setPassword('wrong password');
  setSmtp({ expect_user: MAILBOX, expect_pass: 'the right one' });
  { const r = await call();
    check('login refused AND mail() refused -> 500 whose reasons name both', r.status === 500 && r.json && r.json.code === 'send_failed' && /mailbox login: port 465: login failed \(535 5\.7\.8 Authentication failed\)/.test(r.json.detail) && /mail\(\) was refused/.test(r.json.detail), `got ${r.status} ${r.text.slice(0, 400)}`);
    check('...and the password is never in the reply', !/wrong password/.test(r.text)); }

  // 9c. no port given: tries 465 then 587 (STARTTLS, then AUTH LOGIN)
  await reset();
  setPassword('pw-587');
  setSmtp({ refuse_ports: [465], ehlo: '250-fake.example\r\n250-STARTTLS\r\n250 8BITMIME\r\n', ehlo_tls: '250-fake.example\r\n250-AUTH LOGIN\r\n250 8BITMIME\r\n', expect_user: MAILBOX, expect_pass: 'pw-587' });
  { const r = await call(); const log = await smtpLog();
    check('465 refused -> 587 with STARTTLS + AUTH LOGIN works', r.status === 200 && r.json && r.json.via === 'smtp', `got ${r.status} ${r.text.slice(0, 300)}\n${log}`);
    check('tried 465 first, then 587', log.indexOf('CONNECT ssl://localhost:465') !== -1 && log.indexOf('CONNECT tcp://localhost:587') > log.indexOf('CONNECT ssl://localhost:465'), log);
    check('STARTTLS -> TLS -> hello again -> login (user step, password step)', /C: STARTTLS[\s\S]*TLS-ENABLED[\s\S]*C: EHLO[\s\S]*C: AUTH LOGIN[\s\S]*\[login user step\][\s\S]*\[login password step\][\s\S]*AUTH-RESULT accepted/.test(log), log); }

  // 9d. a remote host that does not offer encryption: the password is NOT sent
  await reset();
  setPassword('pw\nhost=mail.example.com\nport=587');
  setSmtp({ ehlo: '250-fake.example\r\n250-AUTH PLAIN\r\n250 8BITMIME\r\n' });
  { const r = await call(); const log = await smtpLog();
    check('remote host without STARTTLS -> password never sent', !/AUTH/.test(log.replace(/250-AUTH/g, '')) && /CONNECT tcp:\/\/mail\.example\.com:587/.test(log), log);
    check('...falls back to mail()', r.status === 200 && r.json.via === 'mail', `got ${r.status}`); }
  await reset('fail-all');
  setPassword('pw\nhost=mail.example.com\nport=587');
  setSmtp({ ehlo: '250-fake.example\r\n250-AUTH PLAIN\r\n250 8BITMIME\r\n' });
  { const r = await call();
    check('...and says why', r.json && /port 587: encryption failed \(the server does not offer encryption, so the password was not sent\)/.test(r.json.detail), r.text); }

  // 9e. connection / protocol failures are reported precisely
  await reset('fail-all');
  setPassword('pw');
  setSmtp({ refuse_ports: [465, 587] });
  { const r = await call();
    check('every port refused -> both ports named', r.json && /port 465: could not connect \(Connection refused\); port 587: could not connect \(Connection refused\)/.test(r.json.detail), r.text); }
  await reset('fail-all');
  setPassword('pw\nport=465');
  setSmtp({ rcpt_reply: '550 5.1.1 No such mailbox here\r\n' });
  { const r = await call();
    check('recipient refused (550) -> reported', r.json && /port 465: recipient failed \(550 5\.1\.1 No such mailbox here\)/.test(r.json.detail), r.text); }
  await reset('fail-all');
  setPassword('pw\nport=465');
  setSmtp({ data_reply: '554 5.7.1 Message refused as spam\r\n' });
  { const r = await call();
    check('message refused (554) -> reported', r.json && /port 465: message failed \(554 5\.7\.1 Message refused as spam\)/.test(r.json.detail), r.text); }
  await reset('fail-all');
  setPassword('pw\nport=465');
  setSmtp({ greeting: '' });
  { const r = await call();
    check('server says nothing -> "greeting failed (no reply)"', r.json && /port 465: greeting failed \(no reply\)/.test(r.json.detail), r.text); }
  await reset('fail-all');
  setPassword('pw\nport=465');
  setSmtp({ greeting: '421 4.3.2 Service not available\r\n' });
  { const r = await call();
    check('server busy (421) -> reported', r.json && /port 465: greeting failed \(421 4\.3\.2 Service not available\)/.test(r.json.detail), r.text); }
  await reset();
  setPassword('pw\nport=465');
  setSmtp({ ehlo: '250-fake.example\r\n250 8BITMIME\r\n' });
  { const r = await call(); const log = await smtpLog();
    check('localhost relay that offers no login -> sends without logging in', r.status === 200 && r.json.via === 'smtp' && !/AUTH/.test(log.replace(/250-AUTH/g, '')), `got ${r.status} ${r.text.slice(0, 200)}\n${log}`); }

  // 9f. the password file
  const loginFrom = async (setup) => { await reset('fail-all'); setup(); setSmtp({ refuse_ports: [465, 587] }); return await call(); };
  { const r = await loginFrom(() => {});
    check('no password file -> says so', r.json && /no pfp-mail-password\.txt found above the site folder/.test(r.json.detail), r.text); }
  { const r = await loginFrom(() => setPassword('   \r\n'));
    check('empty password file -> says so', r.json && /pfp-mail-password\.txt is empty/.test(r.json.detail), r.text); }
  { const r = await loginFrom(() => setPassword('secret', SITE + '/pfp-mail-password.txt'));
    check('a password file inside the public folder is ignored (it could be downloaded)', r.json && /no pfp-mail-password\.txt found above the site folder/.test(r.json.detail) && !/mailbox login/.test(r.json.detail), r.text); }
  for (const [label, content] of [['trailing CRLF', 'pw1\r\n'], ['trailing spaces and blank lines', '  pw1  \n\n\n'], ['a Windows BOM', Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from('pw1\n')])]]) {
    await reset();
    setPassword(typeof content === 'string' ? content : new Uint8Array(content));
    setSmtp({ expect_user: MAILBOX, expect_pass: 'pw1' });
    const r = await call();
    check(`password file with ${label} -> exact password "pw1" used`, r.status === 200 && r.json.via === 'smtp', `got ${r.status} ${r.text.slice(0, 200)}`);
  }
  await reset();
  setPassword('pw2\nuser=other@premiumfuneralplanning.co.za\nhost=localhost\nport=587\nverify=no\nignored line');
  setSmtp({ expect_user: 'other@premiumfuneralplanning.co.za', expect_pass: 'pw2', ehlo: '250-fake.example\r\n250-AUTH PLAIN\r\n250 8BITMIME\r\n' });
  { const r = await call(); const log = await smtpLog();
    check('optional user=/host=/port= lines are honoured (587, custom user)', r.status === 200 && r.json.via === 'smtp' && /CONNECT tcp:\/\/localhost:587/.test(log) && /MAIL FROM:<other@premiumfuneralplanning\.co\.za>/.test(log), `got ${r.status} ${r.text.slice(0, 200)}\n${log}`); }

  // ---- 10. unit tests of internals -------------------------------------------------------------
  await reset();
  setSmtp({});
  { const out = await unit(String.raw`
      $why = '';
      $ok = \PFP\smtp_deliver(array('user' => 'inquires@premiumfuneralplanning.co.za', 'pass' => 'x', 'host' => 'localhost', 'port' => 465, 'verify' => true), 'Test subject', ".starts with a dot\nnormal line\n..two dots\n", $why);
      return array('ok' => $ok, 'why' => $why);`);
    const log = await smtpLog(); const m = log.match(/DATA-BEGIN\n([\s\S]*?)DATA-END/);
    check('unit: smtp_deliver succeeds against the pretend server', out && out.ok === true, JSON.stringify(out));
    check('unit: lines starting with a dot are "dot-stuffed" (.x -> ..x, ..x -> ...x)', m && /\r\n\.\.starts with a dot\r\n/.test(m[1]) && /\r\n\.\.\.two dots\r\n/.test(m[1]), m && JSON.stringify(m[1].slice(-120))); }
  { const out = await unit(String.raw`return array(
      \PFP\safe_detail("failed at /home/u123/public_html/x.php on line 5\n\twith\x07 junk"),
      \PFP\safe_detail(str_repeat('a', 900)),
      \PFP\whatsapp_number('27656111247'), \PFP\whatsapp_number('0656111247'), \PFP\whatsapp_number('441234567890'));`);
    check('unit: safe_detail hides folders, flattens whitespace, strips control characters', out && out[0] === 'failed at [home] on line 5 with junk', JSON.stringify(out && out[0]));
    check('unit: safe_detail is capped at 400 characters', out && out[1].length === 400, String(out && out[1].length));
    check('unit: whatsapp_number', out && out[2] === '27656111247' && out[3] === '27656111247' && out[4] === '', JSON.stringify(out && out.slice(2))); }

  // ---- 11. rate limits -------------------------------------------------------------------------
  await reset();
  { let last;
    for (let i = 1; i <= 10; i++) { last = await call({ headers: { 'X-Test-IP': '9.9.9.9' } }); check(`visitor request ${i}/10 allowed`, last.status === 200, `got ${last.status}`); }
    last = await call({ headers: { 'X-Test-IP': '9.9.9.9' } });
    check('11th request from one visitor -> 429', last.status === 429 && last.json.ok === false, `got ${last.status}`);
    const other = await call({ headers: { 'X-Test-IP': '8.8.8.8' } });
    check('a different visitor is unaffected', other.status === 200, `got ${other.status}`);
    check('429 sent nothing extra', (await mails()).length === 11, `calls=${(await mails()).length}`); }
  await reset();
  { let blockedAt = 0;
    for (let i = 1; i <= 130; i++) { const r = await call({ headers: { 'X-Test-IP': `172.16.${Math.floor(i / 200)}.${i}` } }); if (r.status === 429 && !blockedAt) blockedAt = i; }
    check('whole-site cap (120/hour) kicks in at request 121', blockedAt === 121, `blocked at ${blockedAt}`); }
  await reset();
  { for (let i = 0; i < 10; i++) await call({ fields: { phone: 'bad' }, headers: { 'X-Test-IP': '7.7.7.7' } });
    const r = await call({ headers: { 'X-Test-IP': '7.7.7.7' } });
    check('failed attempts count towards the visitor limit', r.status === 429, `got ${r.status}`); }

  // ---- 12. size limit and PHP hygiene ----------------------------------------------------------
  await reset();
  { const r = await call({ body: form(Object.assign({}, good, { junk: 'x'.repeat(25000) })) });
    check('oversized request -> 413 (or accepted if the runtime hides CONTENT_LENGTH)', r.status === 413 || r.status === 200, `got ${r.status}`); }
  { const errs = (await sh('echo is_file("/tmp/errors.log") ? file_get_contents("/tmp/errors.log") : "";')).trim();
    check('no PHP warnings, notices or deprecations at all', errs === '', '\n' + errs); }
  console.log(`PHP ${v}: done`);
}

// ---- decode every captured email with Python's real e-mail parser and check what a person would see
fs.writeFileSync(OUT + '/manifest.json', JSON.stringify(manifest, null, 1));
const py = `
import json, email, email.policy, sys
bad = 0; n = 0
for item in json.load(open('${OUT}/manifest.json')):
    m = json.load(open(item['file']))
    if m['kind'] == 'mail':
        raw = 'To: ' + m['to'] + '\\n' + 'Subject: ' + m['subject'] + '\\n' + m['headers'] + '\\n\\n' + m['message']
    else:
        raw = m['message']
    msg = email.message_from_string(raw, policy=email.policy.default)
    body = msg.get_body(preferencelist=('plain',)).get_content()
    tag = item['file'].split('/')[-1]
    def ok(cond, what):
        global bad, n
        n += 1
        if not cond:
            bad += 1; print('  FAIL', tag, what)
    ok(str(msg['subject']) == item['subject'], 'subject %r != %r' % (str(msg['subject']), item['subject']))
    ok('${MAILBOX}' in str(msg['from']) and 'PFP Website' in str(msg['from']), 'from header %r' % msg['from'])
    ok(str(msg['to']) == '${MAILBOX}', 'to header')
    ok(msg['bcc'] is None and msg['cc'] is None, 'no bcc/cc')
    ok(msg.get_content_charset() == 'utf-8', 'charset')
    ok(msg['content-transfer-encoding'] == 'quoted-printable', 'cte')
    if m['kind'] == 'raw':
        ok(msg['date'] is not None and msg['message-id'] is not None, 'date and message-id present')
        ok(msg['date'].datetime is not None, 'date parses')
    for h in item['has']:
        ok(h in body, 'body missing %r' % h)
    for h in item['hasNot']:
        ok(h not in body, 'body should not contain %r' % h)
    ok(body.splitlines()[0] == 'A visitor has asked for a callback on the PFP website.', 'first line')
print('email decode checks: %d, failed: %d' % (n, bad))
sys.exit(1 if bad else 0)
`;
let pyOk = true;
try { console.log(execFileSync('python3', ['-c', py], { encoding: 'utf8' }).trim()); }
catch (e) { pyOk = false; console.log((e.stdout || '').toString().trim()); console.log((e.stderr || '').toString().trim()); }

console.log(`\nPHP checks: ${R.total}, failed: ${R.failed}`);
for (const f of R.failures) console.log('  FAIL', f);
process.exit(R.failed || !pyOk ? 1 : 0);
