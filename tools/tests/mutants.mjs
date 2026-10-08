// Proves the PHP tests can actually fail: breaks send-enquiry.php in many deliberate ways (one at a time) and checks
// that php-mailer.test.mjs notices every one. A mutant that slips through means a test is missing.
//   node mutants.mjs
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { ROOT } from './lib.mjs';

const src = fs.readFileSync(ROOT + '/send-enquiry.php', 'utf8');
const mutants = {
  'THE BOUNCE BUG: extra headers joined with a bare LF': ["$nl      = mail_line_break();", "$nl      = \"\\n\";"],
  'body line endings differ from the headers': ["$body = str_replace(\"\\n\", $nl, str_replace(\"\\r\\n\", \"\\n\", $qpBody));", "$body = str_replace(\"\\r\\n\", \"\\n\", $qpBody);"],
  'ignores a host that switched PHP to LF (mail.mixed_lf_and_crlf)': ["if ($mixed !== false && in_array(strtolower(trim((string) $mixed)), array('1', 'on', 'true', 'yes'), true)) {\n        return \"\\n\";\n    }\n    return \"\\r\\n\";", "return \"\\r\\n\";"],
  'PHP 7 hosts get CRLF as well': ["    if (PHP_VERSION_ID < 80000) {\n        return \"\\n\";\n    }\n    $mixed", "    $mixed", '7.4'], // only matters on PHP 7
  'sender with a display name (host wants the bare address)': ["            'From: ' . FROM,\n            'MIME-Version: 1.0',", "            'From: PFP Website <' . FROM . '>',\n            'MIME-Version: 1.0',"],
  'subject words joined with CRLF folds again': ["return implode(' ', $words);", "return implode(\"\\r\\n \", $words);"],
  'login: user name left out of AUTH PLAIN': ["base64_encode(\"\\0\" . $login['user'] . \"\\0\" . $login['pass'])", "base64_encode(\"\\0\" . $login['pass'])"],
  'login: no SMTP dot-stuffing': ["$message = (string) preg_replace('/^\\./m', '..', $message);", "$message = (string) $message;"],
  'login: password sent over an unencrypted remote connection': ["        } elseif ($needLogin && !$implicit && !$local) {\n            $step = 'encryption';", "        } elseif (false) {\n            $step = 'encryption';"],
  'login: refused recipient ignored': ["        if ($code !== 250 && $code !== 251) {\n            break;\n        }\n        $step = 'message';", "        $step = 'message';"],
  'login: multi-line server replies cut short': ["if (preg_match('/^(\\d{3})([ -]|\\r?\\n|$)/', $line, $m) && $m[2] !== '-') {", "if (preg_match('/^(\\d{3})([ -]|\\r?\\n|$)/', $line, $m)) {"],
  'no safety net for exceptions': ["    } catch (\\Throwable $e) {\n        error_log('PFP enquiry form: ' . get_class($e)", "    } catch (\\InvalidArgumentException $e) {\n        error_log('PFP enquiry form: ' . get_class($e)"],
  'no safety net for crashes': ["    register_shutdown_function(__NAMESPACE__ . '\\\\on_shutdown');\n", ""],
  'reply leaks folder names': ["$text = (string) preg_replace('~/home\\d*/[^\\s\\'\":;,)\\]]*~', '[home]', (string) $text);", "$text = (string) $text;"],
  'last resort (the server\'s own mail service) skipped': ["if (smtp_deliver(array('user' => FROM, 'pass' => '', 'host' => 'localhost', 'port' => 25, 'verify' => true), $subject, $qpBody, $why)) {", "if (false) {"],
  'last resort tries to log in with an empty password': ["$needLogin = ($login['pass'] !== '');", "$needLogin = true;"],
  'bot trap removed': ["if (!empty($in['_honey'])) {", "if (false) {"],
  'foreign websites allowed': ["if (is_string($host) && $host !== '' && !host_ok($_SERVER[$h])) {", "if (false) {"],
  'per-visitor limit removed': ["const PER_VISITOR      = 10; ", "const PER_VISITOR      = 100000;"],
};

fs.mkdirSync('/tmp/pfp-mutants', { recursive: true });
let slipped = 0, i = 0;
for (const [name, [from, to, version = '8.3']] of Object.entries(mutants)) {
  if (!src.includes(from)) { console.log(`?? cannot build mutant (code changed?): ${name}`); slipped++; continue; }
  const file = `/tmp/pfp-mutants/m${++i}.php`;
  fs.writeFileSync(file, src.replace(from, to));
  const r = spawnSync('node', ['php-mailer.test.mjs', version], { env: { ...process.env, SCRIPT_PATH: file }, encoding: 'utf8', timeout: 120000 });
  const m = (r.stdout || '').match(/PHP checks: (\d+), failed: (\d+)/);
  const failed = m ? Number(m[2]) : -1;
  const caught = failed > 0 || (r.stdout || '').match(/email decode checks: \d+, failed: [1-9]/);
  if (!caught) slipped++;
  console.log(`${caught ? 'caught ' : 'SLIPPED'}  (${String(failed).padStart(2)} failing checks)  ${name}`);
}
console.log(slipped ? `\n${slipped} mutant(s) slipped through` : `\nall ${Object.keys(mutants).length} deliberately broken versions were caught`);
process.exit(slipped ? 1 : 0);
