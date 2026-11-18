// Final production-readiness screenshot capture (settled, reduced-motion stills) from the local preview.
// Usage: node scripts/final-readiness.capture.mjs <outDir> [widths=390,1440] [scope=all|home|sections|pages]
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const [out = 'artifacts/final-production-readiness/capture', widthArg = '390,1440', scope = 'all'] = process.argv.slice(2);
const widths = widthArg.split(',').map(Number), base = 'http://127.0.0.1:4173';
const sections = { 'ai-automation': '.ai-feature', 'core-services': '.services-editorial', portfolio: '.work-section', products: '.product-editorial' };
const pages = ['/', '/about', '/services', '/services/ai-automation', '/services/website-development', '/products', '/portfolio', '/portfolio/examify', '/training', '/contact', '/insights', '/insights/choosing-a-business-website'];
const name = path => path === '/' ? 'home' : path.slice(1).replaceAll('/', '--');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const summary = [];
const settle = page => page.evaluate(async () => { await document.fonts.ready; for (const img of document.images) { img.loading = 'eager'; await img.decode().catch(() => {}); } scrollTo({ top: 0, behavior: 'instant' }); });
try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    const targets = scope === 'sections' ? ['/'] : scope === 'home' ? ['/'] : pages;
    for (const path of targets) {
      await page.goto(base + path); await settle(page); await page.waitForTimeout(150);
      const file = `${out}/${name(path)}-${width}.png`;
      if (scope !== 'sections') await page.screenshot({ path: file, fullPage: true });
      const info = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth }));
      summary.push({ path, width, ...info, errors: [...errors] }); errors.length = 0;
      if (path === '/' && scope !== 'pages') {
        const full = `${out}/.home-full-${width}.png`; await page.screenshot({ path: full, fullPage: true });
        for (const [key, selector] of Object.entries(sections)) {
          const box = await page.locator(selector).first().evaluate(e => { const r = e.getBoundingClientRect(); return { y: Math.floor(r.y + scrollY), h: Math.ceil(r.height) }; });
          await sharp(full).extract({ left: 0, top: box.y, width, height: box.h }).toFile(`${out}/section-${key}-${width}.png`);
          summary.push({ section: key, width, height: box.h });
        }
      }
    }
    await context.close();
  }
} finally { await browser.close(); await writeFile(`${out}/capture-summary.json`, JSON.stringify(summary, null, 2)); }
console.log(JSON.stringify(summary.filter(s => s.section || s.overflow || s.errors?.length || s.path === '/')));
