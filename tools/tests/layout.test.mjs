// Layout check for the Package 3 wording ("Total Package Value: MORE THAN R50,000") at desktop and phone widths.
// Screenshots go to /tmp/pfp-layout-<width>.png (not into the repo).
//   export AWS_EXECUTION_ENV=AWS_Lambda_nodejs22.x LD_LIBRARY_PATH=/tmp/al2023/lib ; node layout.test.mjs
import http from 'node:http';
import { sleep, staticFile, recorder, launch } from './lib.mjs';

const PORT = 8124;
const R = recorder();
const server = http.createServer((req, res) => {
  const f = staticFile(new URL(req.url, 'http://x').pathname);
  if (!f) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': f.type, 'Cache-Control': 'no-store' });
  res.end(f.body);
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const WANT = 'Total Package Value: MORE THAN R50,000';
for (const [width, height, mobile] of [[1440, 900, false], [1280, 900, false], [1024, 800, false], [768, 900, false], [414, 860, true], [390, 844, true], [360, 780, true], [320, 700, true]]) {
  const browser = await launch({ width, height, mobile });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (rq) => { new URL(rq.url()).hostname === 'localhost' ? rq.continue() : rq.abort(); });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });
  await page.addStyleTag({ content: '#nav{display:none!important} .package-card{opacity:1!important;transform:none!important;transition:none!important}' });

  const info = await page.evaluate((want) => {
    const card = Array.from(document.querySelectorAll('.package-card')).find((c) => /PACKAGE 3/i.test(c.textContent));
    const fromHeader = card.querySelector('.pc-value span');
    const fromPricing = card.querySelector('.pricing-label');
    const box = (el) => { const r = el.getBoundingClientRect(); const c = card.getBoundingClientRect(); return { text: el.textContent.trim(), clipped: el.scrollWidth > el.clientWidth + 1, insideCard: r.left >= c.left - 0.5 && r.right <= c.right + 0.5, lines: Math.round(r.height / parseFloat(getComputedStyle(el).lineHeight || '14') ) , h: Math.round(r.height), w: Math.round(r.width) }; };
    return {
      header: box(fromHeader), pricing: box(fromPricing),
      pageOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      oldLeft: /Total Package Value: R30,000/.test(document.body.textContent),
      count: (document.body.textContent.match(new RegExp(want.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length,
    };
  }, WANT);
  const tag = `${width}px`;
  R.check(`${tag}: both labels read exactly "${WANT}"`, info.header.text === WANT && info.pricing.text === WANT, JSON.stringify([info.header.text, info.pricing.text]));
  R.check(`${tag}: no "Total Package Value: R30,000" left anywhere`, !info.oldLeft && info.count === 2, `left=${info.oldLeft} count=${info.count}`);
  R.check(`${tag}: the whole page does not scroll sideways`, !info.pageOverflow);
  R.check(`${tag}: header label is not clipped and stays inside the card`, !info.header.clipped && info.header.insideCard, JSON.stringify(info.header));
  R.check(`${tag}: pricing label is not clipped and stays inside the card`, !info.pricing.clipped && info.pricing.insideCard, JSON.stringify(info.pricing));
  console.log(`  ${tag}: header label ${info.header.w}px wide, ${info.header.h}px high | pricing label ${info.pricing.w}px wide, ${info.pricing.h}px high`);

  const card = await page.evaluateHandle(() => Array.from(document.querySelectorAll('.package-card')).find((c) => /PACKAGE 3/i.test(c.textContent)));
  await card.asElement().evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await sleep(400);
  await card.asElement().screenshot({ path: `/tmp/pfp-layout-${width}.png` });
  await browser.close();
}
server.close();
console.log(`\nlayout checks: ${R.total}, failed: ${R.failed}`);
for (const f of R.failures) console.log('  FAIL', f);
process.exit(R.failed ? 1 : 0);
