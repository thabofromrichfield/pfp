// One-time setup for the headless browser in this sandbox: unpack the system libraries that
// @sparticuz/chromium ships (it needs libnspr4.so etc.). Output goes to /tmp/al2023.
//   export AWS_EXECUTION_ENV=AWS_Lambda_nodejs22.x LD_LIBRARY_PATH=/tmp/al2023/lib
import fs from 'node:fs';
import zlib from 'node:zlib';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const br = fs.readFileSync(here + 'node_modules/@sparticuz/chromium/bin/al2023.tar.br');
fs.writeFileSync('/tmp/al2023.tar', zlib.brotliDecompressSync(br));
fs.mkdirSync('/tmp/al2023', { recursive: true });
execSync('tar -xf /tmp/al2023.tar -C /tmp/al2023');
console.log('libraries unpacked to /tmp/al2023/lib:', fs.readdirSync('/tmp/al2023/lib').length, 'files');
