<?php
/**
 * PFP Premium Funeral Planning - "Request a Callback" mailer
 * ===========================================================================
 * The website form posts to this file. It emails the request straight to the
 * PFP enquiries mailbox from this web hosting account, so there is no
 * third-party service and nothing to activate.
 *
 * How it sends, in order:
 *   1. With the mailbox's own login - only if you have created the password
 *      file described below (normally NOT needed).
 *   2. With the server's built-in mail() function (the normal way).
 *   3. Only if 2 failed: straight to this server's own mail service. PHP's
 *      mail() never says why it failed; the mail service does, in its own words.
 * If everything fails it says exactly why. The website writes that reason to
 * the browser console (visitors never see it) so the problem can be fixed fast.
 *
 *   - Keep this file next to index.html (the web root of the site).
 *   - To change where enquiries go, edit TO and FROM below.
 *   - If the site ever moves to another web address, add it to SITE_HOSTS.
 *
 * OPTIONAL - only needed if the server blocks mail():
 *   In cPanel > File Manager, in your HOME folder (the one that contains
 *   public_html, NOT inside public_html), create a plain text file named
 *   pfp-mail-password.txt. Put the mailbox password on the first line and
 *   nothing else. Optional extra lines: host=...  port=...  user=...
 *   The file is deliberately ignored if it sits inside the public web folder,
 *   so it can never be downloaded.
 *
 * Protections: only the website's own form is accepted (origin check), a hidden
 * honeypot field catches bots, and there is a cap on how often one visitor, and
 * the site as a whole, can send. Visitor details are emailed to PFP and are not
 * stored by this script.
 *
 * Quick check: open https://www.premiumfuneralplanning.co.za/send-enquiry.php
 * in a browser. A short line of text starting {"ok":false ... is correct.
 */
namespace PFP;

// ---- settings ---------------------------------------------------------------
const TO               = 'inquires@premiumfuneralplanning.co.za'; // where every request is emailed
const FROM             = 'inquires@premiumfuneralplanning.co.za'; // sender: must be an address on your own domain
const SITE_HOSTS       = 'www.premiumfuneralplanning.co.za,premiumfuneralplanning.co.za';
const PER_VISITOR      = 10;    // requests one visitor may send ...
const PER_VISITOR_SECS = 600;   // ... in any 10 minutes
const PER_SITE         = 120;   // requests the whole site may send ...
const PER_SITE_SECS    = 3600;  // ... in any hour
const PASSWORD_FILE    = 'pfp-mail-password.txt';
const SMTP_BUDGET      = 6;     // seconds to spend on the mailbox login before falling back to mail()
const BUILD            = '2026-10-08'; // shown when the address is opened in a browser, to tell which version is live

// ---- small helpers ----------------------------------------------------------
function respond($code, $data)
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function text_len($s)
{
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

function text_cut($s, $max)
{
    if (text_len($s) <= $max) {
        return $s;
    }
    return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max);
}

/** One line of plain text: valid UTF-8, no control characters (so nothing can inject mail headers), trimmed. */
function clean($value, $max)
{
    if (!is_string($value)) {
        return '';
    }
    if (function_exists('mb_check_encoding') && !mb_check_encoding($value, 'UTF-8')) {
        return '';
    }
    $value = (string) preg_replace('/[\x00-\x1F\x7F]+/', ' ', $value);
    $value = (string) preg_replace('/[\x{0085}\x{2028}\x{2029}]+/u', ' ', $value);
    $value = (string) preg_replace('/\s+/u', ' ', $value);
    return text_cut(trim($value), $max);
}

/** Short, single-line, folder-free text that is safe to send back so a problem can be diagnosed. */
function safe_detail($text)
{
    $text = (string) preg_replace('~/home\d*/[^\s\'":;,)\]]*~', '[home]', (string) $text);
    $text = (string) preg_replace('/[^\x20-\x7E]+/', ' ', $text);
    return text_cut(trim((string) preg_replace('/\s+/', ' ', $text)), 400);
}

function host_ok($url)
{
    $host = parse_url((string) $url, PHP_URL_HOST);
    return is_string($host) && in_array(strtolower($host), explode(',', SITE_HOSTS), true);
}

/** True when $key has already been used $max times in the last $secs seconds; otherwise records this use. */
function too_many($key, $max, $secs)
{
    $dir = sys_get_temp_dir();
    if (!is_dir($dir) || !is_writable($dir)) {
        return false; // cannot keep count here, so never block anyone
    }
    $file = $dir . DIRECTORY_SEPARATOR . 'pfp_rl_' . md5($key);
    $now  = time();
    $hits = array();
    $raw  = is_file($file) ? @file_get_contents($file) : false;
    if (is_string($raw) && $raw !== '') {
        foreach (explode(',', $raw) as $t) {
            $t = (int) $t;
            if ($t > $now - $secs) {
                $hits[] = $t;
            }
        }
    }
    if (count($hits) >= $max) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, implode(',', $hits), LOCK_EX);
    if (mt_rand(1, 40) === 1) { // now and then, tidy away old counters
        foreach ((array) glob($dir . DIRECTORY_SEPARATOR . 'pfp_rl_*') as $old) {
            if (@filemtime($old) < $now - 7200) {
                @unlink($old);
            }
        }
    }
    return false;
}

/** South African number -> international digits for a WhatsApp link ('' if not recognisable). */
function whatsapp_number($digits)
{
    if (strpos($digits, '00') === 0) {
        $digits = substr($digits, 2);
    }
    if (strlen($digits) === 10 && $digits[0] === '0') {
        return '27' . substr($digits, 1);
    }
    if (strlen($digits) === 11 && strpos($digits, '27') === 0) {
        return $digits;
    }
    return '';
}

/** Email header text: plain ASCII as is, anything else as RFC 2047 encoded words (joined by a plain space, never a line break). */
function mime_header($text)
{
    if (!preg_match('/[^\x20-\x7E]/', $text)) {
        return $text;
    }
    $chars = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY);
    if (!is_array($chars)) {
        return (string) preg_replace('/[^\x20-\x7E]+/', '?', $text);
    }
    $words = array();
    $cur   = '';
    foreach ($chars as $c) {
        if (strlen($cur) + strlen($c) > 45) {
            $words[] = $cur;
            $cur     = '';
        }
        $cur .= $c;
    }
    if ($cur !== '') {
        $words[] = $cur;
    }
    foreach ($words as $i => $w) {
        $words[$i] = '=?UTF-8?B?' . base64_encode($w) . '?=';
    }
    return implode(' ', $words);
}

/**
 * The line break PHP's own mail() puts after "To:" and "Subject:" on THIS server. Our extra headers must use
 * the very same one: mixing the two makes Exim fold every header after the first into it (one giant
 * "From:"), and hosts then reject the message as having an invalid sender. PHP 8.0+ uses CRLF unless the
 * mail.mixed_lf_and_crlf setting is on; PHP 7 uses LF.
 */
function mail_line_break()
{
    if (PHP_VERSION_ID < 80000) {
        return "\n";
    }
    $mixed = ini_get('mail.mixed_lf_and_crlf'); // false on builds that do not have the setting
    if ($mixed !== false && in_array(strtolower(trim((string) $mixed)), array('1', 'on', 'true', 'yes'), true)) {
        return "\n";
    }
    return "\r\n";
}

// ---- the mailbox's own login (optional) -------------------------------------
/**
 * Reads pfp-mail-password.txt from the folder ABOVE the public web folder. Returns
 * array(user, pass, host, port, verify) or null. A file inside the public folder is ignored.
 */
function load_login(&$note)
{
    $note = '';
    $root = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/\\') : '';
    if ($root !== '') {
        $real = @realpath($root);
        if (is_string($real) && $real !== '') {
            $root = $real;
        }
    }
    $dirs = array();
    if ($root !== '') {
        $dirs[] = dirname($root);
    }
    $dirs[] = dirname(__DIR__);
    foreach (array_unique($dirs) as $dir) {
        if ($root !== '' && ($dir === $root || strpos($dir . '/', $root . '/') === 0)) {
            continue; // inside the public folder: anyone could download it, so never use it
        }
        $file = $dir . DIRECTORY_SEPARATOR . PASSWORD_FILE;
        if (!@is_file($file)) {
            continue;
        }
        $raw = @file_get_contents($file);
        if (!is_string($raw)) {
            $note = PASSWORD_FILE . ' could not be read';
            return null;
        }
        $raw   = (string) preg_replace('/^\xEF\xBB\xBF/', '', $raw);
        $lines = preg_split('/\r\n|\n|\r/', $raw);
        $pass  = trim((string) array_shift($lines));
        if ($pass === '') {
            $note = PASSWORD_FILE . ' is empty';
            return null;
        }
        $login = array('user' => FROM, 'pass' => $pass, 'host' => 'localhost', 'port' => 0, 'verify' => true);
        foreach ($lines as $line) {
            if (preg_match('/^\s*(host|port|user|verify)\s*=\s*(.*?)\s*$/i', $line, $m)) {
                $k = strtolower($m[1]);
                if ($k === 'port') {
                    $login['port'] = (int) $m[2];
                } elseif ($k === 'verify') {
                    $login['verify'] = !in_array(strtolower($m[2]), array('no', 'false', '0', 'off'), true);
                } elseif ($m[2] !== '') {
                    $login[$k] = $m[2];
                }
            }
        }
        return $login;
    }
    $note = 'no ' . PASSWORD_FILE . ' found above the site folder';
    return null;
}

/** One SMTP reply (may span several lines). Returns the 3-digit code, or 0 for no/invalid reply. */
function smtp_reply($fp, &$text, $deadline)
{
    $text = '';
    for ($i = 0; $i < 60; $i++) {
        if (microtime(true) > $deadline) {
            return 0;
        }
        $line = fgets($fp, 2048);
        if ($line === false) {
            return 0;
        }
        $text .= $line;
        if (preg_match('/^(\d{3})([ -]|\r?\n|$)/', $line, $m) && $m[2] !== '-') {
            return (int) $m[1];
        }
    }
    return 0;
}

function smtp_say($fp, $line, &$text, $deadline)
{
    fwrite($fp, $line . "\r\n");
    return smtp_reply($fp, $text, $deadline);
}

function smtp_short($text)
{
    $first = trim((string) strtok((string) $text, "\r\n"));
    return $first === '' ? 'no reply' : text_cut($first, 70);
}

/** One attempt on one port. True when the server accepted the message. */
function smtp_try($login, $port, $from, $message, $deadline, &$why)
{
    $host     = $login['host'];
    $local    = in_array(strtolower($host), array('localhost', '127.0.0.1', '::1'), true);
    $implicit = ($port === 465);
    $ssl      = ($local || !$login['verify'])
        ? array('verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true)
        : array();
    $ctx    = stream_context_create(array('ssl' => $ssl));
    $errno  = 0;
    $errstr = '';
    $fp = @stream_socket_client(($implicit ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, 3, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        $why = 'port ' . $port . ': could not connect (' . ($errstr !== '' ? $errstr : 'error ' . $errno) . ')';
        return false;
    }
    @stream_set_timeout($fp, 5);

    $name = (isset($_SERVER['SERVER_NAME']) && preg_match('/^[A-Za-z0-9.\-]+$/', (string) $_SERVER['SERVER_NAME']))
        ? $_SERVER['SERVER_NAME'] : 'localhost';
    $t    = '';
    $step = 'greeting';
    $ok   = false;
    do {
        if (smtp_reply($fp, $t, $deadline) !== 220) {
            break;
        }
        $step = 'hello';
        if (smtp_say($fp, 'EHLO ' . $name, $t, $deadline) !== 250) {
            break;
        }
        $caps      = strtoupper($t);
        $needLogin = ($login['pass'] !== '');
        if ($needLogin && !$implicit && strpos($caps, 'STARTTLS') !== false) {
            $step = 'encryption';
            if (smtp_say($fp, 'STARTTLS', $t, $deadline) !== 220) {
                break;
            }
            if (!@stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                $t = 'TLS handshake failed';
                break;
            }
            $step = 'hello';
            if (smtp_say($fp, 'EHLO ' . $name, $t, $deadline) !== 250) {
                break;
            }
            $caps = strtoupper($t);
        } elseif ($needLogin && !$implicit && !$local) {
            $step = 'encryption';
            $t    = 'the server does not offer encryption, so the password was not sent';
            break;
        }
        $step = 'login';
        if ($needLogin) {
            if (strpos($caps, 'AUTH') !== false) {
                if (preg_match('/AUTH[ =][^\r\n]*\bPLAIN\b/', $caps)) {
                    $code = smtp_say($fp, 'AUTH PLAIN ' . base64_encode("\0" . $login['user'] . "\0" . $login['pass']), $t, $deadline);
                } else {
                    $code = smtp_say($fp, 'AUTH LOGIN', $t, $deadline);
                    if ($code === 334) {
                        $code = smtp_say($fp, base64_encode($login['user']), $t, $deadline);
                    }
                    if ($code === 334) {
                        $code = smtp_say($fp, base64_encode($login['pass']), $t, $deadline);
                    }
                }
                if ($code !== 235) {
                    break;
                }
            } elseif (!$local) {
                $t = 'the server does not offer a login';
                break;
            }
        }
        $step = 'sender';
        if (smtp_say($fp, 'MAIL FROM:<' . $from . '>', $t, $deadline) !== 250) {
            break;
        }
        $step = 'recipient';
        $code = smtp_say($fp, 'RCPT TO:<' . TO . '>', $t, $deadline);
        if ($code !== 250 && $code !== 251) {
            break;
        }
        $step = 'message';
        if (smtp_say($fp, 'DATA', $t, $deadline) !== 354) {
            break;
        }
        fwrite($fp, $message . ".\r\n");
        if (smtp_reply($fp, $t, $deadline) !== 250) {
            break;
        }
        $ok = true;
    } while (false);

    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);
    if (!$ok) {
        $why = 'port ' . $port . ': ' . $step . ' failed (' . smtp_short($t) . ')';
    }
    return $ok;
}

/** Sends through the mailbox's own login. True on success; on failure $why says what went wrong. */
function smtp_deliver($login, $subject, $qpBody, &$why)
{
    $ports = ($login['port'] > 0) ? array($login['port']) : array(465, 587);
    $from  = (strpos($login['user'], '@') !== false) ? $login['user'] : FROM;
    $message = implode("\r\n", array(
        'Date: ' . date('r'),
        'Message-ID: <' . md5(uniqid('', true)) . '@' . substr((string) strrchr(FROM, '@'), 1) . '>',
        'From: ' . FROM,
        'To: ' . TO,
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: quoted-printable',
    )) . "\r\n\r\n" . str_replace("\n", "\r\n", str_replace("\r\n", "\n", $qpBody));
    $message = (string) preg_replace('/^\./m', '..', $message); // SMTP "dot-stuffing"
    if (substr($message, -2) !== "\r\n") {
        $message .= "\r\n";
    }

    $deadline = microtime(true) + SMTP_BUDGET;
    $reasons  = array();
    foreach ($ports as $port) {
        if (microtime(true) > $deadline) {
            $reasons[] = 'ran out of time';
            break;
        }
        $r = '';
        if (smtp_try($login, $port, $from, $message, $deadline, $r)) {
            return true;
        }
        $reasons[] = $r;
    }
    $why = implode('; ', $reasons);
    return false;
}

/** Tries each way of sending in turn. Returns 'smtp', 'mail' or 'smtp-local' on success, '' on failure ($trail says why). */
function deliver($subject, $qpBody, &$trail)
{
    $trail = array();
    $note  = '';
    $login = load_login($note);
    if ($login !== null) {
        $why = '';
        if (smtp_deliver($login, $subject, $qpBody, $why)) {
            return 'smtp';
        }
        $trail[] = 'mailbox login: ' . $why;
    } else {
        $trail[] = $note;
    }

    if (function_exists('mail')) {
        $nl      = mail_line_break();
        $headers = implode($nl, array(
            'From: ' . FROM,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: quoted-printable',
        ));
        $body = str_replace("\n", $nl, str_replace("\r\n", "\n", $qpBody)); // body line endings match the headers
        if (function_exists('error_clear_last')) {
            error_clear_last();
        }
        $sent = @mail(TO, $subject, $body, $headers, '-f' . FROM);
        if (!$sent) {
            $sent = @mail(TO, $subject, $body, $headers); // some hosts refuse the -f option
        }
        if ($sent) {
            return 'mail';
        }
        $err = error_get_last();
        $sm  = trim((string) ini_get('sendmail_path'));
        $trail[] = 'mail() was refused' . ($err ? ' (' . $err['message'] . ')' : '') . ' [sendmail_path: ' . ($sm !== '' ? $sm : 'not set') . ']';
    } else {
        $trail[] = 'mail() is switched off on this server';
    }

    // Last resort: hand the message straight to this server's own mail service (no login, this server only).
    // It either takes the message, or says in its own words why not - which mail() never does.
    $why = '';
    if (smtp_deliver(array('user' => FROM, 'pass' => '', 'host' => 'localhost', 'port' => 25, 'verify' => true), $subject, $qpBody, $why)) {
        return 'smtp-local';
    }
    $trail[] = 'local mail server: ' . $why;
    return '';
}

function on_shutdown()
{
    $e = error_get_last();
    if ($e && in_array($e['type'], array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR), true) && !headers_sent()) {
        error_log('PFP enquiry form: fatal error: ' . safe_detail($e['message']));
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('ok' => false, 'error' => 'The email could not be sent.', 'code' => 'fatal', 'detail' => safe_detail($e['message'])));
    }
}

// ---- the request ------------------------------------------------------------
function main()
{
    @ini_set('display_errors', '0'); // never let a PHP warning leak into the reply
    register_shutdown_function(__NAMESPACE__ . '\\on_shutdown');

    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');

    $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
    if ($method !== 'POST') {
        $note = '';
        header('Allow: POST');
        respond(405, array(
            'ok'      => false,
            'error'   => 'This address only accepts the PFP website form.',
            'service' => 'pfp-enquiry',
            'build'   => BUILD,
            'php'     => PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION,
            'mail'    => function_exists('mail'),
            'login'   => load_login($note) !== null,
        ));
    }

    // only our own website may use this (a missing header is allowed: some privacy tools strip them)
    foreach (array('HTTP_ORIGIN', 'HTTP_REFERER') as $h) {
        if (!empty($_SERVER[$h])) {
            $host = parse_url((string) $_SERVER[$h], PHP_URL_HOST);
            if (is_string($host) && $host !== '' && !host_ok($_SERVER[$h])) {
                respond(403, array('ok' => false, 'error' => 'Not allowed.'));
            }
        }
    }

    $length = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
    if ($length > 20000) {
        respond(413, array('ok' => false, 'error' => 'Request too large.'));
    }

    $in = $_POST;
    if (!$in) {
        $raw = file_get_contents('php://input');
        if (is_string($raw) && $raw !== '' && strlen($raw) <= 20000) {
            $json = json_decode($raw, true);
            if (is_array($json)) {
                $in = $json;
            }
        }
    }
    if (!is_array($in) || !$in) {
        respond(400, array('ok' => false, 'error' => 'Nothing received.'));
    }

    // hidden field that only bots fill in: look successful, send nothing
    if (!empty($in['_honey'])) {
        respond(200, array('ok' => true));
    }

    $ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : 'unknown';
    if (too_many('visitor|' . $ip, PER_VISITOR, PER_VISITOR_SECS) || too_many('whole-site', PER_SITE, PER_SITE_SECS)) {
        respond(429, array('ok' => false, 'error' => 'Too many requests. Please try again shortly.'));
    }

    // ---- check the details --------------------------------------------------
    $name  = clean(isset($in['name'])    ? $in['name']    : '', 120);
    $phone = clean(isset($in['phone'])   ? $in['phone']   : '', 40);
    $pack  = clean(isset($in['package']) ? $in['package'] : '', 120);
    $age   = clean(isset($in['age'])     ? $in['age']     : '', 80);
    $page  = clean(isset($in['page'])    ? $in['page']    : '', 200);

    $digits = (string) preg_replace('/\D+/', '', $phone);
    $valid  = true;
    if (text_len($name) < 2 || text_len($name) > 80 || preg_match('~[<>]|https?:|www\.~i', $name)) {
        $valid = false;
    }
    if (!preg_match('/^[0-9+().\s-]+$/', $phone) || strlen($digits) < 9 || strlen($digits) > 15) {
        $valid = false;
    }
    if (!preg_match('/^Package [123]\b/', $pack) || preg_match('/[<>]/', $pack)) {
        $valid = false;
    }
    if (text_len($age) < 2 || text_len($age) > 40 || preg_match('/[<>]/', $age)) {
        $valid = false;
    }
    if (!$valid) {
        respond(422, array('ok' => false, 'error' => 'Please check your details.'));
    }
    $pageOut = (preg_match('~^https?://~i', $page) && host_ok($page)) ? $page : '';

    // ---- build the email ------------------------------------------------------
    $subject = mime_header('New callback request: ' . substr($pack, 0, 9) . ' - ' . $name);

    if (function_exists('date_default_timezone_set')) {
        date_default_timezone_set('Africa/Johannesburg');
    }
    $lines = array(
        'A visitor has asked for a callback on the PFP website.',
        '',
        'Name:      ' . $name,
        'Phone:     ' . $phone,
        'Package:   ' . $pack,
        'Age band:  ' . $age,
        '',
        'Received:  ' . date('D j M Y, H:i') . ' (SA time)',
    );
    if ($pageOut !== '') {
        $lines[] = 'Page:      ' . $pageOut;
    }
    $wa = whatsapp_number($digits);
    if ($wa !== '') {
        $lines[] = '';
        $lines[] = 'Reply on WhatsApp:  https://wa.me/' . $wa;
    }
    $lines[] = '';
    $lines[] = '--';
    $lines[] = 'Sent automatically by the PFP website form.';

    $body = quoted_printable_encode(implode("\r\n", $lines) . "\r\n");

    // ---- send it --------------------------------------------------------------
    $trail = array();
    $via   = deliver($subject, $body, $trail);
    if ($via === '') {
        $detail = safe_detail(implode('; ', $trail));
        error_log('PFP enquiry form: the email could not be sent: ' . $detail);
        respond(500, array('ok' => false, 'error' => 'The email could not be sent.', 'code' => 'send_failed', 'detail' => $detail));
    }
    respond(200, array('ok' => true, 'via' => $via));
}

if (!defined('PFP_NO_RUN')) { // (the developer tests define this to load the functions without running a request)
    try {
        main();
    } catch (\Throwable $e) {
        error_log('PFP enquiry form: ' . get_class($e) . ': ' . safe_detail($e->getMessage()));
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(array('ok' => false, 'error' => 'The email could not be sent.', 'code' => 'exception', 'detail' => safe_detail(get_class($e) . ': ' . $e->getMessage())));
    }
}
