// Run against the built preview on port 4173; dependencies remain QA-only.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const directory = 'artifacts/final-premium-review';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
const selector = '.quiet-link, .work-enquiry, .solution-image-link, .industry-pullquote a, .contact-method a';
try {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const path of ['/', '/services', '/portfolio', '/contact']) {
      await page.goto('http://127.0.0.1:4173' + path);
      await page.evaluate(() => document.fonts.ready);
      for (const link of await page.locator(selector).all()) {
        await link.focus();
        const result = await link.evaluate(element => {
          const rect = element.getBoundingClientRect();
          return {
            text: element.textContent.trim(), href: element.getAttribute('href'),
            width: rect.width, height: rect.height,
            focused: element === document.activeElement,
            inViewport: rect.left >= 0 && rect.right <= innerWidth,
          };
        });
        results.push({ path, viewport: width, ...result, passed: result.height >= 44 && result.width >= 44 && result.focused && result.inViewport && Boolean(result.href) });
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(`${directory}/refinement-regressions.json`, JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ checks: results.length, failures: results.filter(result => !result.passed) }));
assert.ok(results.length > 0 && results.every(result => result.passed));
