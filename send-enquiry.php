<?php
/**
 * PFP Premium Funeral Planning - "Request a Callback" mailer
 * ===========================================================================
 * The website form posts to this file. It emails the request straight to the
 * PFP enquiries mailbox using this hosting account's own mail system, so there
 * is no third-party service and nothing to activate.
 *
 *   - Keep it next to index.html (the web root of the site).
 *   - To change where enquiries go, edit TO and FROM below. Nothing else.
 *   - If the site ever moves to another web address, add it to SITE_HOSTS.
 *   - If a request ever fails, the website falls back to its backup route and
 *     then to WhatsApp / email buttons, so a visitor is never left stuck.
 *
 * Protections: it only accepts the website's own form (origin check), a hidden
 * honeypot field catches bots, and there is a cap on how often one visitor,
 * and the site as a whole, can send. Visitor details are emailed to PFP and
 * are not stored by this script.
 *
 * Quick check: open https://www.premiumfuneralplanning.co.za/send-enquiry.php
 * in a browser. A short line of text starting {"ok":false ... is correct.
 */
namespace PFP;

// ---- settings ---------------------------------------------------------------
const TO               = 'inquires@premiumfuneralplanning.co.za'; // where every request is emailed
const FROM             = 'inquires@premiumfuneralplanning.co.za'; // sender: must be an address on your own domain
const SITE_HOSTS       = 'www.premiumfuneralplanning.co.za,premiumfuneralplanning.co.za';
const PER_VISITOR      = 5;     // requests one visitor may send ...
const PER_VISITOR_SECS = 600;   // ... in any 10 minutes
const PER_SITE         = 60;    // requests the whole site may send ...
const PER_SITE_SECS    = 3600;  // ... in any hour

// ---- helpers ----------------------------------------------------------------
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

/** Email header text: plain ASCII as is, anything else as RFC 2047 encoded words. */
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
    return implode("\r\n ", $words);
}

// ---- request ----------------------------------------------------------------
@ini_set('display_errors', '0'); // never let a PHP warning leak into the reply

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
if ($method !== 'POST') {
    header('Allow: POST');
    respond(405, array(
        'ok'      => false,
        'error'   => 'This address only accepts the PFP website form.',
        'service' => 'pfp-enquiry',
        'php'     => PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION,
        'mail'    => function_exists('mail'),
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

// ---- check the details ------------------------------------------------------
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

// ---- build and send the email -----------------------------------------------
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

$body = str_replace("\r\n", "\n", quoted_printable_encode(implode("\r\n", $lines) . "\r\n"));
$headers = implode("\n", array(
    'From: PFP Website <' . FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable',
    'X-Mailer: PFP website form',
));

$sent = @mail(TO, $subject, $body, $headers, '-f' . FROM);
if (!$sent) {
    $sent = @mail(TO, $subject, $body, $headers); // some hosts refuse the -f option
}
if (!$sent) {
    error_log('PFP enquiry form: the server refused to send the email.');
    respond(500, array('ok' => false, 'error' => 'The email could not be sent.'));
}
respond(200, array('ok' => true));
