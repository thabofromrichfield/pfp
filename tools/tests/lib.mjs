// Shared helpers for the developer tests (not part of the website package).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..', '..'); // the website folder
export const PROD_ORIGIN = 'https://www.premiumfuneralplanning.co.za';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.php': 'text/plain',
};

/** Static file for a URL path inside the website folder, or null. */
export function staticFile(urlPath) {
  const file = path.join(ROOT, decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return null;
  return { body: fs.readFileSync(file), type: TYPES[path.extname(file)] || 'application/octet-stream' };
}

/** A tiny pass/fail recorder. */
export function recorder() {
  const r = { total: 0, failed: 0, failures: [] };
  r.check = (label, cond, detail = '') => { r.total++; if (!cond) { r.failed++; r.failures.push(`${label} ${detail}`.trim()); } };
  return r;
}

/** Headless Chromium (needs: export AWS_EXECUTION_ENV=AWS_Lambda_nodejs22.x LD_LIBRARY_PATH=/tmp/al2023/lib; node inflate-libs.mjs). */
export async function launch({ width = 1280, height = 900, mobile = false } = {}) {
  const { default: chromium } = await import('@sparticuz/chromium');
  const { default: puppeteer } = await import('puppeteer-core');
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: 'shell',
    defaultViewport: { width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile },
  });
}

/** A fresh PHP (php-wasm) instance of the given version. */
let pid = 400;
export async function newPhp(version) {
  const { PHP } = await import('@php-wasm/universal');
  const { loadNodeRuntime } = await import('@php-wasm/node');
  return new PHP(await loadNodeRuntime(version, { emscriptenOptions: { processId: ++pid } }));
}
