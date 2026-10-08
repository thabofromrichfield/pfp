// End to end: real Chromium + the real index.html / script.js + the real send-enquiry.php (php-wasm).
// Only mail() and FormSubmit are stand-ins. Run with:
//   export AWS_EXECUTION_ENV=AWS_Lambda_nodejs22.x LD_LIBRARY_PATH=/tmp/al2023/lib   (after: node inflate-libs.mjs)
//   node form-e2e.test.mjs
import http from 'node:http';
import fs from 'node:fs';
import { ROOT, PROD_ORIGIN, sleep, staticFile, recorder, launch, newPhp } from './lib.mjs';

const PORT = 8123;
const R = recorder();
const check = R.check;
const phpFile = process.env.SCRIPT_PATH || ROOT + '/send-enquiry.php';

// ---- the real PHP file, with a stand-in for mail() ------------------------------------------
const php = await newPhp('8.3');
for (const d of ['/home', '/home/u', '/home/u/public_html']) { try { php.mkdir(d); } catch (_) {} }
php.writeFile('/home/u/public_html/send-enquiry.php', fs.readFileSync(phpFile, 'utf8'));
php.writeFile('/home/u/public_html/wrapper.php', String.raw`<?php
namespace PFP {
    function stream_socket_client($a, &$errno = null, &$errstr = null, $t = null, $f = null, $c = null) { $errno = 111; $errstr = 'Connection refused'; return false; }
    function mail($to, $subject, $message, $headers = '', $params = '') {
        $f = '/tmp/mail-calls.json';
        $calls = is_file($f) ? json_decode(file_get_contents($f), true) : array();
        $calls[] = array('to' => $to, 'subject' => $subject, 'message' => $message, 'headers' => $headers, 'params' => $params);
        file_put_contents($f, json_encode($calls));
        return !(is_file('/tmp/mail-mode') && trim(file_get_contents('/tmp/mail-mode')) === 'fail-all');
    }
}
namespace {
    if (isset($_SERVER['HTTP_X_TEST_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_TEST_IP']; }
    $_SERVER['DOCUMENT_ROOT'] = '/home/u/public_html';
    require __DIR__ . '/send-enquiry.php';
}
`);
const phpSh = async (code) => (await php.run({ code: '<?php ' + code })).text;
const capturedMail = async () => JSON.parse((await phpSh('echo is_file("/tmp/mail-calls.json") ? file_get_contents("/tmp/mail-calls.json") : "[]";')) || '[]');
const resetPhp = async () => phpSh('foreach ((array)glob("/tmp/pfp_rl_*") as $f) @unlink($f); @unlink("/tmp/mail-calls.json"); @unlink("/tmp/mail-mode");');

// ---- the local "hosting": static files + /send-enquiry.php + a stand-in FormSubmit ---------------
const S = { mailer: 'real', fs: 'ok', origin: 'prod', ip: '10.1.0.1' };
const calls = { mailer: [], fs: [] };
const hung = new Set();
const readBody = (req) => new Promise((r) => { const c = []; req.on('data', (d) => c.push(d)); req.on('end', () => r(Buffer.concat(c))); });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/send-enquiry.php') {
      const body = await readBody(req);
      calls.mailer.push({ method: req.method, type: req.headers['content-type'], body: body.toString('utf8') });
      if (S.mailer === 'hang') { hung.add(res); return; }
      if (S.mailer === 'reset') { req.socket.destroy(); return; }
      if (S.mailer === 'missing') { res.writeHead(404, { 'Content-Type': 'text/html' }); return res.end('<h1>404 Not Found</h1>'); }
      if (S.mailer === 'blocked') { res.writeHead(403, { 'Content-Type': 'text/html' }); return res.end('<h1>403 Forbidden (firewall)</h1>'); }
      if (S.mailer === 'php-source') { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end(fs.readFileSync(phpFile)); }
      if (S.mailer === 'html-200') { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end('<html><body>Welcome</body></html>'); }
      if (S.mailer === 'empty-500') { res.writeHead(500, { 'Content-Type': 'text/html' }); return res.end(''); }
      const headers = Object.assign({}, req.headers, { 'x-test-ip': S.ip });
      if (S.origin === 'prod') { headers.origin = PROD_ORIGIN; if (headers.referer) headers.referer = PROD_ORIGIN + '/'; }
      delete headers.host; delete headers.connection;
      let r;
      try { r = await php.run({ scriptPath: '/home/u/public_html/wrapper.php', method: req.method, headers, body: new Uint8Array(body) }); }
      catch (e) { if (e && e.response) r = e.response; else throw e; }
      res.writeHead(r.httpStatusCode, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(Buffer.from(r.bytes));
    }
    if (url.pathname === '/__fs') {
      const body = await readBody(req);
      calls.fs.push({ method: req.method, type: req.headers['content-type'], body: body.toString('utf8') });
      if (S.fs === 'hang') { hung.add(res); return; }
      if (S.fs === 'ok') { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"success":"true","message":"The form was submitted successfully."}'); }
      if (S.fs === 'needs-activation') { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"success":"false","message":"This form needs Activation. We\'ve sent you an email containing an \'Activate Form\' link."}'); }
      if (S.fs === '500') { res.writeHead(500, { 'Content-Type': 'application/json' }); return res.end('{"success":"false"}'); }
      res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end('<html>oops</html>');
    }
    const f = staticFile(url.pathname);
    if (!f) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': f.type, 'Cache-Control': 'no-store' });
    res.end(f.body);
  } catch (e) { try { res.writeHead(500); res.end(String(e)); } catch (_) {} }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

// ---- test plumbing ---------------------------------------------------------------------------------
const browser = await launch({ width: 1280, height: 900 });
let ipN = 1;

async function scenario(name, cfg, fn) {
  Object.assign(S, { mailer: 'real', fs: 'ok', origin: 'prod', ip: `10.1.${++ipN}.1` }, cfg.modes || {});
  calls.mailer.length = 0; calls.fs.length = 0;
  await resetPhp();
  if (cfg.phpMail) php.writeFile('/tmp/mail-mode', cfg.phpMail);
  const page = await browser.newPage();
  const logs = [];
  page.on('console', (m) => logs.push(m.text()));
  page.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message));
  await page.setRequestInterception(true);
  page.on('request', (rq) => { new URL(rq.url()).hostname === 'localhost' ? rq.continue() : rq.abort(); });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });
  await page.evaluate((u, a, b) => { PFP.endpoint = u; if (a) PFP.waitMailer = a; if (b) PFP.waitBackup = b; }, `http://localhost:${PORT}/__fs`, cfg.waitMailer || 0, cfg.waitBackup || 0);
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await sleep(500);
  const ui = {
    fill: async (o = {}) => {
      await page.type('#callbackForm input[name="Full Name"]', o.name || 'Lesego Mokoena');
      await page.type('#callbackForm input[name="Phone Number"]', o.phone || '065 611 1247');
      await page.select('#callbackForm select[name="Package"]', o.pack || 'Package 2 - Grocery & Cash - R395');
      await page.select('#callbackForm select[name="Age Band"]', o.age || '18-64 years');
    },
    submit: () => page.click('#callbackForm button[type=submit]'),
    waitStatus: (ms = 30000) => page.waitForFunction(() => !document.getElementById('formStatus').hidden, { timeout: ms }),
    state: () => page.evaluate(() => {
      const st = document.getElementById('formStatus'), b = document.querySelector('#callbackForm button[type=submit]');
      return { hidden: st.hidden, cls: st.className, text: st.innerText.replace(/\s+/g, ' ').trim(), btn: b.textContent, disabled: b.disabled, btnCls: b.className,
               links: Array.from(st.querySelectorAll('a')).map((a) => ({ t: a.textContent.trim(), h: a.getAttribute('href') })),
               name: document.querySelector('#callbackForm input[name="Full Name"]').value };
    }),
  };
  console.log('· ' + name);
  try { await fn({ page, ui, logs }); }
  catch (e) { check(name + ': scenario ran without throwing', false, String(e && e.message || e)); }
  for (const r of hung) { try { r.destroy(); } catch (_) {} } hung.clear();
  await page.close();
}
async function shoot(page, file) {
  await page.addStyleTag({ content: '#nav{display:none!important}' });
  await sleep(1300);
  await (await page.$('#contact')).screenshot({ path: file });
}
const SUCCESS_TEXT = 'Thank you. A PFP consultant will contact you shortly. Every detail with care.';
const FALLBACK_TEXT = 'We couldn’t send your request automatically Please send it to us directly — your details are already filled in for you.';
const startsCI = (a, b) => a.toLowerCase().startsWith(b.toLowerCase());
const warn = (logs) => logs.find((l) => l.startsWith('[PFP] could not send')) || '';

// 1. the normal case: the site's own mailer works
await scenario('1. own mailer works -> success, FormSubmit never used', {}, async ({ page, ui, logs }) => {
  await ui.fill(); const t0 = Date.now(); await ui.submit(); await ui.waitStatus(); const dt = Date.now() - t0;
  const st = await ui.state();
  check('1: success panel shown', st.cls.includes('ok') && /request sent/i.test(st.text) && st.text.includes(SUCCESS_TEXT), JSON.stringify(st));
  check('1: button says Request Sent and is re-enabled', st.btn.includes('Request Sent') && !st.disabled && st.btnCls.includes('is-sent'));
  check('1: answered quickly (< 3 s)', dt < 3000, dt + ' ms');
  check('1: own mailer called once, FormSubmit not at all', calls.mailer.length === 1 && calls.fs.length === 0, `mailer=${calls.mailer.length} fs=${calls.fs.length}`);
  const c = calls.mailer[0] || {}; const f = new URLSearchParams(c.body || '');
  check('1: mailer got a plain form POST', c.method === 'POST' && /x-www-form-urlencoded/.test(c.type || ''), c.type);
  check('1: mailer got the right details', f.get('name') === 'Lesego Mokoena' && f.get('phone') === '065 611 1247' && f.get('package') === 'Package 2 - Grocery & Cash - R395' && f.get('age') === '18-64 years' && f.get('page') === `http://localhost:${PORT}/` && f.get('_honey') === '', c.body);
  const mails = await capturedMail();
  check('1: exactly one email handed to the mail system', mails.length === 1, String(mails.length));
  check('1: email goes to inquires@premiumfuneralplanning.co.za', mails[0] && mails[0].to === 'inquires@premiumfuneralplanning.co.za');
  check('1: email subject names package and person', mails[0] && mails[0].subject === 'New callback request: Package 2 - Lesego Mokoena', mails[0] && mails[0].subject);
  check('1: form was cleared', st.name === '');
  check('1: nothing is logged to the console on success', warn(logs) === '');
  await shoot(page, '/tmp/pfp-e2e-success.png');
  await sleep(3200);
  const later = await ui.state();
  check('1: button goes back to "Request a Callback" after ~4 s', later.btn.trim() === 'Request a Callback' && !later.btnCls.includes('is-sent'), later.btn);
  check('1: no page errors', !logs.some((l) => l.startsWith('PAGEERROR')), logs.join(' | '));
});

// 2-5, 15-16, 20. the mailer isn't usable -> FormSubmit takes over
for (const [n, label, modes, phpMail] of [
  ['2', 'mailer file missing (404)', { mailer: 'missing' }],
  ['3', 'PHP not enabled (file served as text)', { mailer: 'php-source' }],
  ['4', 'firewall blocks it (403 HTML)', { mailer: 'blocked' }],
  ['5', 'server refuses to send (mail() fails -> 500 JSON)', { mailer: 'real' }, 'fail-all'],
  ['15', 'connection dropped', { mailer: 'reset' }],
  ['16', '200 but not JSON', { mailer: 'html-200' }],
  ['20', 'blank 500 page (a crash with no message)', { mailer: 'empty-500' }],
]) {
  await scenario(`${n}. ${label} -> FormSubmit backup succeeds`, { modes, phpMail }, async ({ ui, logs }) => {
    await ui.fill(); await ui.submit(); await ui.waitStatus();
    const st = await ui.state();
    check(`${n}: success panel shown via backup`, st.cls.includes('ok') && st.text.includes(SUCCESS_TEXT), JSON.stringify(st));
    check(`${n}: mailer tried (chrome may retry a dropped connection itself), FormSubmit once`, calls.mailer.length >= 1 && calls.fs.length === 1, `mailer=${calls.mailer.length} fs=${calls.fs.length}`);
    check(`${n}: nothing is logged when the backup succeeds`, warn(logs) === '');
    if (n === '2') {
      const p = JSON.parse(calls.fs[0].body || '{}');
      check('2: FormSubmit got JSON with all fields', /application\/json/.test(calls.fs[0].type || '') && p['Full Name'] === 'Lesego Mokoena' && p['Phone Number'] === '065 611 1247' && p['Package'] && p['Age Band'] === '18-64 years' && p['_subject'] === 'New callback request: Package 2 - Lesego Mokoena' && p['_template'] === 'table' && p['_captcha'] === 'false' && p['Submitted'] && p['Page'], calls.fs[0].body);
    }
    if (n === '5') check('5: PHP tried the mail system (twice: with and without -f)', (await capturedMail()).length === 2);
  });
}

// 6-7. nothing works -> the fallback panel, with the visitor's details filled in, and a readable console line
for (const [n, label, fsMode, expectBackup] of [['6', 'FormSubmit not activated yet', 'needs-activation', /Backup: 200 - This form needs Activation/], ['7', 'FormSubmit errors (500)', '500', /Backup: 500$/]]) {
  await scenario(`${n}. mailer missing + ${label} -> fallback panel`, { modes: { mailer: 'missing', fs: fsMode } }, async ({ page, ui, logs }) => {
    await ui.fill({ name: 'Thandi Nkosi', phone: '082 123 4567', pack: 'Package 3 - Grocery & Catering - R445', age: '65-75 years' });
    await ui.submit(); await ui.waitStatus();
    const st = await ui.state();
    check(`${n}: error panel with the usual wording`, st.cls.includes('err') && startsCI(st.text, FALLBACK_TEXT), st.text);
    const wa = st.links.find((l) => l.t === 'WhatsApp'), em = st.links.find((l) => l.t === 'Email'), tel = st.links.find((l) => /611-1247/.test(l.t));
    check(`${n}: WhatsApp button goes to 27656111247 and carries the details`, wa && wa.h.startsWith('https://wa.me/27656111247?text=') && decodeURIComponent(wa.h).includes('Thandi Nkosi') && decodeURIComponent(wa.h).includes('082 123 4567') && decodeURIComponent(wa.h).includes('Package 3'), wa && wa.h);
    check(`${n}: Email button goes to inquires@ and carries the details`, em && em.h.startsWith('mailto:inquires@premiumfuneralplanning.co.za?subject=') && decodeURIComponent(em.h).includes('Thandi Nkosi') && decodeURIComponent(em.h).includes('082 123 4567'), em && em.h);
    check(`${n}: call link present`, !!tel && tel.h === 'tel:+27656111247', JSON.stringify(st.links));
    check(`${n}: button back to normal, form data kept`, st.btn.trim() === 'Request a Callback' && !st.disabled && st.name === 'Thandi Nkosi', JSON.stringify({ b: st.btn, d: st.disabled, n: st.name }));
    check(`${n}: both routes were tried once`, calls.mailer.length === 1 && calls.fs.length === 1);
    const line = warn(logs);
    check(`${n}: one readable console line says what each route answered`, /^\[PFP\] could not send\. Mailer: 404 \| Backup: /.test(line) && expectBackup.test(line), line);
    if (n === '6') await shoot(page, '/tmp/pfp-e2e-fallback.png');
  });
}

// 8. both routes hang: the visitor waits waitMailer + waitBackup, no longer
await scenario('8. both routes hang -> fallback after the two waits (test: 700 + 500 ms)', { modes: { mailer: 'hang', fs: 'hang' }, waitMailer: 700, waitBackup: 500 }, async ({ ui, logs }) => {
  await ui.fill(); const t0 = Date.now(); await ui.submit();
  await sleep(250);
  const mid = await ui.state();
  check('8: while waiting the button says Sending… and is disabled', mid.btn.includes('Sending') && mid.disabled && mid.hidden, JSON.stringify(mid));
  await ui.waitStatus(); const dt = Date.now() - t0; const st = await ui.state();
  check('8: gave up after about 1.2 s (not 20 s)', dt >= 1100 && dt < 2600, dt + ' ms');
  check('8: fallback panel shown, button re-enabled', st.cls.includes('err') && startsCI(st.text, FALLBACK_TEXT) && !st.disabled && st.btn.trim() === 'Request a Callback', JSON.stringify(st));
  check('8: each route tried once', calls.mailer.length === 1 && calls.fs.length === 1);
  check('8: console line says both timed out', /Mailer: timeout \| Backup: timeout/.test(warn(logs)), warn(logs));
});

// 9. mailer hangs, FormSubmit answers
await scenario('9. mailer hangs, FormSubmit answers -> success after the first wait', { modes: { mailer: 'hang', fs: 'ok' }, waitMailer: 700, waitBackup: 500 }, async ({ ui }) => {
  await ui.fill(); const t0 = Date.now(); await ui.submit(); await ui.waitStatus(); const dt = Date.now() - t0; const st = await ui.state();
  check('9: success via backup', st.cls.includes('ok') && st.text.includes(SUCCESS_TEXT), JSON.stringify(st));
  check('9: took about the first wait (0.7 s) and not much longer', dt >= 650 && dt < 2200, dt + ' ms');
});

// 10. the mailer is reached but says no (too many requests): do NOT go round it via FormSubmit
await scenario('10. rate limit (429 from the real PHP) -> fallback panel, FormSubmit not used', {}, async ({ ui, logs }) => {
  for (let i = 0; i < 10; i++) await fetch(`http://localhost:${PORT}/send-enquiry.php`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ name: 'Warm Up', phone: '0656111247', package: 'Package 1', age: '18-64 years' }) });
  calls.mailer.length = 0; await phpSh('@unlink("/tmp/mail-calls.json");');
  await ui.fill(); await ui.submit(); await ui.waitStatus(); const st = await ui.state();
  check('10: fallback panel shown', st.cls.includes('err') && startsCI(st.text, FALLBACK_TEXT), JSON.stringify(st));
  check('10: FormSubmit was not used to get round the limit', calls.mailer.length === 1 && calls.fs.length === 0, `mailer=${calls.mailer.length} fs=${calls.fs.length}`);
  check('10: console line names the 429', /Mailer: 429/.test(warn(logs)) && /Backup: not tried/.test(warn(logs)), warn(logs));
});

// 11. another website posting to the mailer is refused by the real PHP (403 JSON) -> the page uses the backup route
await scenario('11. request from another website -> real PHP says 403 -> backup route used', { modes: { origin: 'foreign' } }, async ({ ui }) => {
  await ui.fill(); await ui.submit(); await ui.waitStatus(); const st = await ui.state();
  check('11: success via the backup', st.cls.includes('ok') && st.text.includes(SUCCESS_TEXT), JSON.stringify(st));
  check('11: the real PHP refused it: nothing emailed by the mailer', (await capturedMail()).length === 0 && calls.mailer.length === 1 && calls.fs.length === 1);
});

// 18. the mailer is reached but rejects the details themselves (422): fallback, no backup
await scenario('18. details rejected by the real PHP (422) -> fallback panel, FormSubmit not used', {}, async ({ ui }) => {
  await ui.fill({ name: 'see http://spam.example' }); await ui.submit(); await ui.waitStatus(); const st = await ui.state();
  check('18: fallback panel shown', st.cls.includes('err') && startsCI(st.text, FALLBACK_TEXT), JSON.stringify(st));
  check('18: nothing emailed, FormSubmit not used', (await capturedMail()).length === 0 && calls.mailer.length === 1 && calls.fs.length === 0);
});

// 21. the case that was happening on the live site: the server refuses to send AND FormSubmit is not activated.
//     The console must say exactly why, in one line, so it can be fixed without guessing.
await scenario('21. server refuses to send + FormSubmit not activated -> the console line explains both', { modes: { fs: 'needs-activation' }, phpMail: 'fail-all' }, async ({ ui, logs }) => {
  await ui.fill(); await ui.submit(); await ui.waitStatus(); const st = await ui.state();
  check('21: fallback panel shown', st.cls.includes('err') && startsCI(st.text, FALLBACK_TEXT), JSON.stringify(st));
  const line = warn(logs);
  check('21: line starts with the mailer status and code', /^\[PFP\] could not send\. Mailer: 500 - send_failed - /.test(line), line);
  check('21: line says there is no password file and that mail() was refused', /no pfp-mail-password\.txt found above the site folder; mail\(\) was refused/.test(line), line);
  check('21: line also says what FormSubmit answered', /Backup: 200 - This form needs Activation/.test(line), line);
  check('21: it is a single line with no folder names', !/[\r\n]/.test(line) && !/\/home\//.test(line), line);
});

// 12-13. bots and typos never reach either route
await scenario('12. honeypot filled -> nothing is sent at all', {}, async ({ page, ui }) => {
  await ui.fill(); await page.$eval('#callbackForm input[name="_honey"]', (e) => { e.value = 'http://spam.example'; });
  await ui.submit(); await sleep(1200); const st = await ui.state();
  check('12: no request made, no message shown', calls.mailer.length === 0 && calls.fs.length === 0 && st.hidden, JSON.stringify({ m: calls.mailer.length, f: calls.fs.length, h: st.hidden }));
});
await scenario('13. invalid phone number -> browser message, nothing is sent', {}, async ({ page, ui }) => {
  await ui.fill({ phone: '12345' }); await ui.submit(); await sleep(800);
  const msg = await page.$eval('#callbackForm input[name="Phone Number"]', (e) => e.validationMessage);
  check('13: asks for a valid phone number', /valid phone number/i.test(msg), msg);
  check('13: nothing sent', calls.mailer.length === 0 && calls.fs.length === 0);
});

// 14. double click while sending
await scenario('14. double submit while the first is still sending -> only one request', { modes: { mailer: 'hang', fs: 'hang' }, waitMailer: 900, waitBackup: 300 }, async ({ page, ui }) => {
  await ui.fill(); await ui.submit(); await page.evaluate(() => document.getElementById('callbackForm').requestSubmit()); await sleep(200);
  check('14: just one request to the mailer so far', calls.mailer.length === 1, String(calls.mailer.length));
  await ui.waitStatus();
  check('14: still only one request per route in the end', calls.mailer.length === 1 && calls.fs.length === 1, `mailer=${calls.mailer.length} fs=${calls.fs.length}`);
});

// 17. a non-ASCII name goes through the real PHP intact
await scenario('17. non-English name goes through the real PHP intact', {}, async ({ ui }) => {
  await ui.fill({ name: 'Zoë Ndlovu' }); await ui.submit(); await ui.waitStatus(); const st = await ui.state();
  const m = (await capturedMail())[0];
  check('17: success', st.cls.includes('ok'), JSON.stringify(st));
  check('17: subject is RFC2047 encoded and ASCII-only', m && /^[\x20-\x7E]+$/.test(m.subject.replace(/\r\n /g, '')) && m.subject.startsWith('=?UTF-8?B?'), m && m.subject);
  check('17: name decodes back to Zoë Ndlovu', m && Buffer.from(m.subject.replace(/\r\n /g, '').replace(/=\?UTF-8\?B\?([^?]*)\?=/g, '$1'), 'base64').toString('utf8') === 'New callback request: Package 2 - Zoë Ndlovu', m && m.subject);
});

// 19. nothing else on the page was disturbed by the script change
await scenario('19. other features still work (Select Package buttons, Call/WhatsApp chooser)', {}, async ({ page, logs }) => {
  await page.evaluate(() => { document.getElementById('nav').style.display = 'none'; });
  await page.evaluate(() => document.querySelector('[data-package="3"]').scrollIntoView({ block: 'center' }));
  await sleep(900);
  await page.click('[data-package="3"]');
  await sleep(500);
  const sel = await page.$eval('#callbackForm select[name="Package"]', (e) => e.value);
  check('19: "Select Package 3" pre-selects Package 3 in the form', /^Package 3 /.test(sel), sel);
  await page.evaluate(() => document.querySelector('.contact-direct a.js-contact').scrollIntoView({ block: 'center' }));
  await sleep(900);
  await page.click('.contact-direct a.js-contact');
  await sleep(300);
  const chooser = await page.evaluate(() => ({ hidden: document.getElementById('contactChooser').hidden, call: document.getElementById('ccCall').getAttribute('href'), wa: document.getElementById('ccWa').getAttribute('href') }));
  check('19: phone link opens the Call / WhatsApp chooser', chooser.hidden === false && chooser.call === 'tel:+27656111247' && chooser.wa.startsWith('https://wa.me/27656111247?text='), JSON.stringify(chooser));
  await page.keyboard.press('Escape'); await sleep(200);
  check('19: Escape closes the chooser', await page.evaluate(() => document.getElementById('contactChooser').hidden));
  check('19: no page errors', !logs.some((l) => l.startsWith('PAGEERROR')), logs.join(' | '));
});

await browser.close();
server.close();
console.log(`\nbrowser end-to-end checks: ${R.total}, failed: ${R.failed}`);
for (const f of R.failures) console.log('  FAIL', f);
process.exit(R.failed ? 1 : 0);
