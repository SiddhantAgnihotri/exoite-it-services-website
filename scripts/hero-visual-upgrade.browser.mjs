// Install Playwright and @axe-core/playwright into .qa-tools for local QA only.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const directory = 'artifacts/hero-visual-upgrade';
const baseline = JSON.parse(await readFile(`${directory}/before/observations.json`, 'utf8'));
await mkdir(`${directory}/after`, { recursive: true });
const report = { url: 'http://127.0.0.1:4173/', browser: '', checks: [], failures: [], layouts: [], accessibility: [], errors: [], imageSpace: [] };
const check = (name, passed, details) => {
  const result = { name, passed, details };
  report.checks.push(result);
  if (!passed) report.failures.push(result);
};
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
report.browser = await browser.version();
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: width < 1000 });
    await context.addInitScript(() => {
      window.heroReviewShifts = [];
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.heroReviewShifts.push(entry.value);
      }).observe({ type: 'layout-shift', buffered: true });
    });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ width, message: error.message }));
    const response = await page.goto(report.url);
    check(`${width}: local production preview returns HTTP 200`, response.status() === 200);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const image of document.images) { image.scrollIntoView({ behavior: 'instant' }); await image.decode().catch(() => {}); }
      scrollTo({ top: 0, behavior: 'instant' });
    });
    const layout = await page.evaluate(() => {
      const box = element => {
        const r = element.getBoundingClientRect();
        return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height };
      };
      const hero = document.querySelector('.hero');
      const photo = hero.querySelector('.hero-photo');
      const image = photo.querySelector('img');
      const rgb = value => value.match(/[\d.]+/g).map(Number);
      const background = element => {
        if (!element) return [255, 255, 255];
        const color = rgb(getComputedStyle(element).backgroundColor);
        const alpha = color[3] ?? 1;
        const behind = alpha < 1 ? background(element.parentElement) : color;
        return color.slice(0, 3).map((channel, i) => channel * alpha + behind[i] * (1 - alpha));
      };
      const luminance = color => color.slice(0, 3).map(v => {
        const c = v / 255;
        return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
      }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
      const textContrast = [];
      const walker = document.createTreeWalker(hero, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode, text = node.textContent.trim();
        if (!text) continue;
        const style = getComputedStyle(node.parentElement);
        const foreground = rgb(style.color), behind = background(node.parentElement);
        const l1 = luminance(foreground), l2 = luminance(behind);
        textContrast.push({ text, color: style.color, background: behind, size: style.fontSize, weight: style.fontWeight, ratio: (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05), minimum: parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5 });
      }
      return {
        width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth,
        hero: box(hero), copy: box(hero.querySelector('.hero-copy')), photo: box(photo), image: box(image),
        headline: document.querySelector('h1').innerText,
        description: document.querySelector('.hero-copy > p:not(.eyebrow):not(.hero-footnote)').innerText,
        caption: { text: photo.querySelector('figcaption').innerText, size: getComputedStyle(photo.querySelector('figcaption')).fontSize },
        imageData: { currentSrc: image.currentSrc, loaded: image.complete && image.naturalWidth > 0, width: image.getAttribute('width'), height: image.getAttribute('height'), alt: image.alt, loading: image.loading, priority: image.fetchPriority },
        buttons: [...hero.querySelectorAll('.button')].map(e => ({ text: e.innerText, href: e.getAttribute('href'), ...box(e) })),
        otherSections: [...document.querySelectorAll('main>section')].slice(1).map(e => ({ class: e.className, height: e.getBoundingClientRect().height, html: e.outerHTML })),
        footer: document.querySelector('footer').outerHTML,
        metadata: [...document.head.querySelectorAll('title,meta[name=description],link[rel=canonical]')].map(e => e.outerHTML),
        textContrast,
        heroAnimations: document.getAnimations().filter(a => hero.contains(a.effect?.target)).map(a => a.playState),
        observedLayoutShifts: window.heroReviewShifts,
      };
    });
    report.layouts.push(layout);
    const previous = baseline.find(item => item.width === width);
    check(`${width}: existing headline and supporting description preserved`, layout.headline === previous.headline && layout.description === previous.description);
    check(`${width}: every subsequent section has identical DOM and height`, JSON.stringify(layout.otherSections) === JSON.stringify(previous.otherSections));
    check(`${width}: footer and SEO metadata unchanged`, layout.footer === previous.footer && JSON.stringify(layout.metadata) === JSON.stringify(previous.metadata));
    check(`${width}: no horizontal overflow`, !layout.overflow);
    check(`${width}: image is loaded locally with useful alternative text`, layout.imageData.loaded && layout.imageData.currentSrc.startsWith(report.url) && layout.imageData.alt.length > 30, layout.imageData);
    check(`${width}: uncropped 4:3 image reserves intrinsic space`, Math.abs(layout.image.width / layout.image.height - 4 / 3) < .01 && layout.imageData.width === '1440' && layout.imageData.height === '1080');
    check(`${width}: hero image is eager and high priority`, layout.imageData.loading === 'eager' && layout.imageData.priority === 'high');
    check(`${width}: concept disclosure is readable`, parseFloat(layout.caption.size) >= 13 && layout.caption.text.includes('AI-generated') && layout.caption.text.includes('Not an Exoite office or client project'));
    check(`${width}: copy and photo do not overlap`, width > 950 ? layout.photo.x >= layout.copy.x + layout.copy.width + 24 : layout.photo.y >= layout.copy.y + layout.copy.height + 24);
    check(`${width}: both CTAs retain comfortable touch targets`, layout.buttons.length === 2 && layout.buttons.every(item => item.height >= 44 && item.width >= 44));
    check(`${width}: reduced-motion hero has no running animation`, layout.heroAnimations.every(state => state !== 'running'));
    const full = `${directory}/after/home-${width}.png`;
    await page.screenshot({ path: full, fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: `${directory}/after/viewport-${width}.png`, animations: 'disabled' });
    await sharp(full).extract({ left: 0, top: Math.floor(layout.hero.y), width, height: Math.ceil(layout.hero.height) }).png().toFile(`${directory}/after/hero-${width}.png`);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    report.accessibility.push({ width, violations: axe.violations, passes: axe.passes.length, incomplete: axe.incomplete.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })) });
    check(`${width}: full homepage axe WCAG A/AA has zero violations`, axe.violations.length === 0);
    check(`${width}: all hero text meets AA using computed foreground and background colors`, layout.textContrast.every(item => item.ratio >= item.minimum), layout.textContrast);
    await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); await page.keyboard.press('Tab');
    check(`${width}: primary CTA has real keyboard focus and clear outline`, await page.locator('.hero .button-primary').evaluate(e => e === document.activeElement && e.matches(':focus-visible') && getComputedStyle(e).outlineWidth === '3px'));
    if (width < 1000) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
      check(`${width}: mobile menu remains accessible by touch`, await page.locator('#mobile-menu').isVisible());
      await page.keyboard.press('Escape');
    }
    await page.locator('.hero .button-primary').click();
    await page.waitForURL('**/contact');
    check(`${width}: primary CTA opens the Contact page`, new URL(page.url()).pathname === '/contact');
    await page.goto(report.url);
    await page.locator('.hero .button-secondary').click();
    await page.waitForURL('**/services');
    check(`${width}: secondary CTA opens Services`, new URL(page.url()).pathname === '/services');
    await context.close();
  }
  // Hold only the hero download to measure the reserved layout before and after decoding.
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    let release;
    const hold = new Promise(resolve => { release = resolve; });
    await context.route('**/*hero-workspace*', async route => { await hold; await route.continue(); });
    const page = await context.newPage();
    await page.goto(report.url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const geometry = () => page.locator('.hero-photo').evaluate(e => {
      const image = e.querySelector('img').getBoundingClientRect();
      return { width: image.width, height: image.height, captionY: e.querySelector('figcaption').getBoundingClientRect().y, heroHeight: e.closest('section').getBoundingClientRect().height };
    });
    const before = await geometry();
    release();
    await page.locator('.hero-photo img').evaluate(image => image.decode());
    const after = await geometry();
    report.imageSpace.push({ width, before, after });
    check(`${width}: delayed hero image causes no layout movement`, JSON.stringify(before) === JSON.stringify(after), { before, after });
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage(); await page.goto(report.url);
  await page.locator('.hero-photo img').evaluate(image => image.decode());
  await page.locator('.hero-photo').hover();
  check('Normal motion: photo has no hover distortion or continuous animation', await page.locator('.hero-photo img').evaluate(e => getComputedStyle(e).transform === 'none' && e.getAnimations().length === 0));
  await page.locator('.hero .button-primary').hover(); await page.waitForTimeout(300);
  check('Normal motion: existing CTA feedback remains subtle', await page.locator('.hero .button-primary').evaluate(e => Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42 + 3) < .2));
  await context.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const p = await noJS.newPage(); await p.goto(report.url);
  check('No JavaScript: hero image, disclosure and links work from prerendered HTML', await p.locator('.hero-photo img').evaluate(e => e.complete && e.naturalWidth > 0) && await p.locator('.hero-photo figcaption').isVisible() && await p.locator('.hero .button-primary').getAttribute('href') === '/contact');
  await noJS.close();
} catch (error) {
  report.failures.push({ exception: error.stack });
} finally {
  await browser.close();
  await writeFile(`${directory}/browser-results.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ browser: report.browser, checks: report.checks.length, failures: report.failures, errors: report.errors, axe: report.accessibility.map(item => ({ width: item.width, violations: item.violations.length })) }));
assert.equal(report.failures.length + report.errors.length, 0);
