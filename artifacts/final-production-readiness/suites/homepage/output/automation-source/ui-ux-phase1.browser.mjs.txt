// Optional Playwright layout QA. Uses the isolated .qa-tools installation.
// Run against npm run preview -- --host 127.0.0.1 --port 4173.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const directory = 'artifacts/ui-ux-phase1';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
try {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/home-${width}-viewport.png`, animations: 'disabled' });
    const metrics = await page.evaluate(() => {
      const rect = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
      const visible = el => el.getBoundingClientRect().width > 0;
      return {
        width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        container: rect(document.querySelector('.hero-grid')),
        heroHeading: { rect: rect(document.querySelector('h1')), size: getComputedStyle(document.querySelector('h1')).fontSize },
        bodySize: getComputedStyle(document.querySelector('.hero-copy > p:not(.eyebrow)')).fontSize,
        sections: [...document.querySelectorAll('main > section')].map(el => ({ class: el.className, background: getComputedStyle(el).backgroundColor, padding: getComputedStyle(el).paddingBlockStart, rect: rect(el) })),
        cards: [...document.querySelectorAll('.home-service')].map(el => ({ rect: rect(el), title: rect(el.querySelector('.home-service-title')), copy: rect(el.querySelector('.home-service-copy')), visual: rect(el.querySelector('.service-sketch')) })),
        buttons: [...document.querySelectorAll('.hero .button')].map(el => ({ label: el.textContent, ...rect(el) })),
        navItems: [...document.querySelectorAll('.navbar > .brand, .desktop-navigation, .nav-cta, .menu-toggle')].filter(visible).map(rect),
        clippedText: [...document.querySelectorAll('main p, main h1, main h2, main h3')].filter(el => visible(el) && el.scrollWidth > el.clientWidth + 2).map(el => ({ text: el.textContent.slice(0, 90), scroll: el.scrollWidth, client: el.clientWidth })),
        fonts: { inter: document.fonts.check('16px Inter'), jakarta: document.fonts.check('600 36px "Plus Jakarta Sans"') },
      };
    });
    const checks = [];
    const check = (name, passed) => checks.push({ name, passed });
    check('No horizontal document or reading-text overflow', metrics.documentWidth <= width && metrics.clippedText.length === 0);
    check('Readable hero text and comfortable actions', parseFloat(metrics.bodySize) >= 16 && metrics.buttons.every(b => b.height >= 48));
    check('Bounded container and loaded existing fonts', metrics.container.width <= 1280 && metrics.fonts.inter && metrics.fonts.jakarta);
    check('Navbar items do not collide', metrics.navItems.every((item, i, items) => !i || item.x >= items[i - 1].right));
    if (width > 950) check('Desktop service rows align in columns', ['title', 'copy', 'visual'].every(key => Math.max(...metrics.cards.map(c => c[key].x)) - Math.min(...metrics.cards.map(c => c[key].x)) < 2));
    check('Navy AI feature is distinct', metrics.sections.find(s => s.class.includes('ai-feature')).background === 'rgb(20, 33, 61)');
    check('Services and Insights have distinct surfaces', metrics.sections.find(s => s.class.includes('insights-editorial')).background === 'rgb(255, 255, 255)' && metrics.sections.find(s => s.class.includes('services-editorial')).background === 'rgb(248, 250, 252)');
    if (width <= 950) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      check('Mobile menu opens with expanded semantics', await page.locator('#mobile-menu').isVisible() && await page.getByRole('button', { name: 'Close menu', exact: true }).getAttribute('aria-expanded') === 'true');
      await page.screenshot({ path: `${directory}/navigation-${width}.png`, animations: 'disabled' });
      await page.keyboard.press('Escape');
      check('Escape restores mobile toggle focus', !(await page.locator('#mobile-menu').isVisible()) && await page.locator('.menu-toggle').evaluate(el => el === document.activeElement));
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.mouse.click(2, 890);
      check('Outside pointer closes menu', !(await page.locator('#mobile-menu').isVisible()));
    } else {
      await page.locator('.nav-disclosure summary').focus();
      await page.keyboard.press('Enter');
      check('Services disclosure opens by keyboard', await page.locator('.nav-services-panel').isVisible());
      await page.screenshot({ path: `${directory}/navigation-${width}.png`, animations: 'disabled' });
      await page.keyboard.press('Escape');
      check('Escape closes Services and restores focus', !(await page.locator('.nav-services-panel').isVisible()) && await page.locator('.nav-disclosure summary').evaluate(el => el === document.activeElement));
    }
    await page.evaluate(() => scrollTo({ top: 600, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.site-header').dataset.scrolled === 'true');
    check('Sticky navigation gains scroll separation', await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().top === 0 && getComputedStyle(el).boxShadow !== 'none'));
    results.push({ width, metrics, checks });
    console.log(`${width}px: ${checks.filter(c => c.passed).length}/${checks.length} layout/navigation checks`);
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(`${directory}/layout-navigation.json`, JSON.stringify(results, null, 2));
}
assert.equal(results.length, 6);
assert.ok(results.every(r => r.checks.every(c => c.passed)), 'Inspect layout-navigation.json for failures');
