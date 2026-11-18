// Local installed-Chrome QA. Playwright/axe live in isolated .qa-tools dependencies.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import assert from 'node:assert/strict';

const dir = 'artifacts/hero-motion-refinement';
const baseline = JSON.parse(await readFile(`${dir}/before/observations.json`, 'utf8'));
const base = 'http://127.0.0.1:4173';
await mkdir(`${dir}/after`, { recursive: true });
const report = { browser: '', url: base, checks: [], failures: [], errors: [], layouts: [], motion: [], accessibility: [], requests: [] };
const check = (name, passed, details) => {
  const item = { name, passed, details }; report.checks.push(item);
  if (!passed) report.failures.push(item);
};
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
report.browser = await browser.version();
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  for (const image of document.images) { image.scrollIntoView({ behavior: 'instant' }); await image.decode().catch(() => {}); }
  scrollTo({ top: 0, behavior: 'instant' });
});
const inspect = page => page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const art = hero.querySelector('.hero-motion-visual');
  const box = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height }; };
  const rgb = value => value.match(/[\d.]+/g).map(Number);
  const background = e => {
    if (!e) return [255, 255, 255];
    const c = rgb(getComputedStyle(e).backgroundColor), a = c[3] ?? 1, behind = a < 1 ? background(e.parentElement) : c;
    return c.slice(0, 3).map((channel, i) => channel * a + behind[i] * (1 - a));
  };
  const luminance = color => color.slice(0, 3).map(v => { const c = v / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const textContrast = [], walker = document.createTreeWalker(hero, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode, e = n.parentElement, text = n.textContent.trim(), s = getComputedStyle(e);
    if (!text || s.visibility === 'hidden' || !e.getBoundingClientRect().width) continue;
    const bg = background(e), a = luminance(rgb(s.color)), b = luminance(bg), size = parseFloat(s.fontSize);
    textContrast.push({ text, size, color: s.color, background: bg, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05), minimum: size >= 24 || (size >= 18.66 && parseInt(s.fontWeight) >= 700) ? 3 : 4.5 });
  }
  const cards = [...art.querySelectorAll('.hero-art-source,.hero-art-core,.hero-art-handoff')].map(e => ({ class: e.className, ...box(e) }));
  return {
    width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth,
    hero: box(hero), copy: box(hero.querySelector('.hero-copy')), art: box(art), stage: box(art.querySelector('.hero-motion-stage')), cards,
    headline: hero.querySelector('h1').innerText,
    description: hero.querySelector('.hero-copy > p:not(.eyebrow):not(.hero-footnote)').innerText,
    buttons: [...hero.querySelectorAll('.button')].map(e => ({ href: e.getAttribute('href'), ...box(e) })),
    otherSections: [...document.querySelectorAll('main>section')].slice(1).map(e => ({ class: e.className, height: e.getBoundingClientRect().height, html: e.outerHTML })),
    footer: document.querySelector('footer').outerHTML,
    metadata: [...document.head.querySelectorAll('title,meta[name=description],link[rel=canonical]')].map(e => e.outerHTML),
    textContrast,
    clipped: [...hero.querySelectorAll('strong,p,button,span')].filter(e => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden' && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent),
    shifts: window.heroMotionShifts || [],
  };
});
const sample = page => page.locator('.hero-motion-visual').evaluate(e => ({
  height: e.closest('section').getBoundingClientRect().height,
  source: new DOMMatrix(getComputedStyle(e.querySelector('.hero-art-source')).transform).m42,
  core: new DOMMatrix(getComputedStyle(e.querySelector('.hero-art-core')).transform).m42,
  dash: parseFloat(getComputedStyle([...e.querySelectorAll('.hero-wire-signal')].find(path => path.closest('svg').getBoundingClientRect().width > 0)).strokeDashoffset),
  animations: e.getAnimations({ subtree: true }).map(a => ({ name: a.animationName, state: a.playState, duration: a.effect.getTiming().duration })),
}));
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      window.heroMotionShifts = [];
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.heroMotionShifts.push(e.value); }).observe({ type: 'layout-shift', buffered: true });
    });
    const page = await context.newPage();
    page.on('pageerror', e => report.errors.push({ width, message: e.message }));
    page.on('request', r => report.requests.push({ width, url: r.url() }));
    const response = await page.goto(base); await settle(page);
    const layout = await inspect(page); report.layouts.push(layout);
    const previous = baseline.find(x => x.width === width);
    check(`${width}: production preview returns HTTP 200`, response.status() === 200);
    check(`${width}: headline and supporting copy preserved`, layout.headline === previous.headline && layout.description === previous.description);
    check(`${width}: all subsequent sections retain identical DOM and heights`, JSON.stringify(layout.otherSections) === JSON.stringify(previous.otherSections));
    check(`${width}: footer and SEO metadata unchanged`, layout.footer === previous.footer && JSON.stringify(layout.metadata) === JSON.stringify(previous.metadata));
    check(`${width}: no horizontal overflow or clipped hero labels`, !layout.overflow && layout.clipped.length === 0, layout.clipped);
    check(`${width}: text and illustration do not overlap`, width > 950 ? layout.art.x >= layout.copy.x + layout.copy.width + 24 : layout.art.y >= layout.copy.y + layout.copy.height + 24);
    const stage = layout.stage;
    check(`${width}: every card stays inside its illustration`, layout.cards.every(c => c.x > stage.x && c.y > stage.y && c.x + c.width < stage.x + stage.width && c.y + c.height < stage.y + stage.height));
    const overlap = (a, b) => Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
    check(`${width}: workflow cards do not overlap`, layout.cards.every((c, i) => layout.cards.slice(i + 1).every(other => overlap(c, other) === 0)));
    check(`${width}: both CTAs retain correct destinations and 52px targets`, layout.buttons.length === 2 && layout.buttons.every(b => b.height >= 52) && layout.buttons[0].href === '/contact' && layout.buttons[1].href === '/services');
    check(`${width}: illustration labels are at least 12px`, layout.textContrast.filter(t => ['SOFTWARE + AI AUTOMATION', 'Your tools. One flow.', 'Websites & apps', 'New enquiry', 'AI-assisted workflows', 'Your rules. Clear context.', 'Your team, in control.', 'Review before the next step.', 'Built around your business'].includes(t.text)).every(t => t.size >= 12));
    check(`${width}: computed hero text contrast meets AA`, layout.textContrast.every(t => t.ratio >= t.minimum), layout.textContrast);
    check(`${width}: reduced motion stops all hero animations`, (await sample(page)).animations.every(a => a.state !== 'running'));
    check(`${width}: reduced-motion users have no unnecessary pause control`, !(await page.getByRole('button', { name: 'Pause motion', exact: true }).isVisible()));
    await page.screenshot({ path: `${dir}/after/reduced-home-${width}.png`, fullPage: true, animations: 'disabled' });
    await sharp(`${dir}/after/reduced-home-${width}.png`).extract({ left: 0, top: Math.floor(layout.hero.y), width, height: Math.ceil(layout.hero.height) }).toFile(`${dir}/after/reduced-hero-${width}.png`);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    report.accessibility.push({ width, mode: 'reduce', violations: axe.violations, incomplete: axe.incomplete.map(x => ({ id: x.id, targets: x.nodes.map(n => n.target) })) });
    check(`${width}: reduced-motion homepage axe has zero A/AA violations`, axe.violations.length === 0);
    await context.close();

    const normal = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 950 });
    const p = await normal.newPage(); p.on('pageerror', e => report.errors.push({ width, mode: 'normal', message: e.message }));
    await p.goto(base); await settle(p); await p.locator('.hero-motion-visual.is-playing').waitFor(); await p.waitForTimeout(850);
    const normalLayout = await inspect(p);
    check(`${width}: normal motion adds no overflow or text clipping`, !normalLayout.overflow && !normalLayout.clipped.length, normalLayout.clipped);
    await p.locator('.hero-motion-visual').scrollIntoViewIfNeeded(); await p.locator('.hero-motion-visual.is-playing').waitFor();
    const before = await sample(p); await p.waitForTimeout(400); const moving = await sample(p);
    report.motion.push({ width, before, moving });
    check(`${width}: two card layers actually move within 2px and 4px`, moving.source >= -2.01 && moving.source <= .01 && moving.core >= -4.01 && moving.core <= .01 && Math.abs(moving.core - before.core) > .02, { before, moving });
    check(`${width}: connector signal actually advances`, Math.abs(moving.dash - before.dash) > 1);
    check(`${width}: motion causes no layout shift in hero height`, before.height === moving.height);
    const pause = p.getByRole('button', { name: 'Pause motion', exact: true });
    check(`${width}: motion control has a 44px touch target`, (await pause.boundingBox()).height >= 44);
    if (width < 950) await pause.tap(); else await pause.click();
    await p.getByRole('button', { name: 'Play motion', exact: true }).waitFor();
    const frozen = await sample(p); await p.waitForTimeout(250); const still = await sample(p);
    check(`${width}: pause stops floating and connector animation`, frozen.core === still.core && frozen.source === still.source && frozen.dash === still.dash && still.animations.every(a => a.state !== 'running'), { frozen, still });
    const play = p.getByRole('button', { name: 'Play motion', exact: true }); await play.focus(); await p.keyboard.press('Enter');
    check(`${width}: keyboard resumes motion with a visible focus outline`, await p.getByRole('button', { name: 'Pause motion', exact: true }).evaluate(e => e === document.activeElement && getComputedStyle(e).outlineWidth === '3px'));
    await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await p.waitForFunction(() => !document.querySelector('.hero-motion-visual').classList.contains('is-playing'));
    check(`${width}: offscreen hero animations pause`, (await sample(p)).animations.filter(a => a.name?.startsWith('hero-')).every(a => a.state !== 'running'));
    await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.locator('.hero-motion-visual.is-playing').waitFor();
    await p.getByRole('button', { name: 'Pause motion', exact: true }).click();
    await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })); await p.waitForTimeout(60);
    await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(100);
    check(`${width}: user pause choice survives scrolling away and back`, await p.getByRole('button', { name: 'Play motion', exact: true }).isVisible() && await p.locator('.hero-motion-visual').evaluate(e => !e.classList.contains('is-playing')));
    await p.getByRole('button', { name: 'Play motion', exact: true }).click();
    const controlAxe = await new AxeBuilder({ page: p }).include('.hero').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    report.accessibility.push({ width, mode: 'normal-hero', violations: controlAxe.violations, incomplete: controlAxe.incomplete.map(x => ({ id: x.id, targets: x.nodes.map(n => n.target) })) });
    check(`${width}: animated hero and pause control have zero axe violations`, controlAxe.violations.length === 0);
    await p.emulateMedia({ reducedMotion: 'reduce' });
    check(`${width}: changing motion preference cancels hero animations`, (await sample(p)).animations.length === 0);
    await p.goto(base); await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); await p.keyboard.press('Tab');
    check(`${width}: primary CTA follows the skip link with visible keyboard focus`, await p.locator('.hero .button-primary').evaluate(e => e === document.activeElement && e.matches(':focus-visible') && getComputedStyle(e).outlineWidth === '3px'));
    await p.locator('.hero .button-primary').click(); await p.waitForURL('**/contact');
    check(`${width}: primary CTA navigates to Contact`, new URL(p.url()).pathname === '/contact');
    await p.goto(base); await p.locator('.hero .button-secondary').click(); await p.waitForURL('**/services');
    check(`${width}: secondary CTA navigates to Services`, new URL(p.url()).pathname === '/services');
    await normal.close();
  }
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await desktop.newPage(); await p.goto(base); await p.evaluate(() => document.fonts.ready);
  await p.locator('.hero .button-primary').hover(); await p.waitForTimeout(300);
  check('Desktop CTA hover uses 3px lift and 3px arrow travel', await p.locator('.hero .button-primary').evaluate(e => Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42 + 3) < .1 && Math.abs(new DOMMatrix(getComputedStyle(e.querySelector('svg')).transform).m41 - 3) < .1));
  await p.screenshot({ path: `${dir}/after/hover-1440.png`, animations: 'disabled' }); await desktop.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const n = await noJS.newPage(); await n.goto(base);
  check('No JS: original vector content and links are rendered in HTML', await n.getByRole('img', { name: /Illustrative workflow/ }).isVisible() && await n.locator('.hero .button-primary').getAttribute('href') === '/contact');
  check('No JS: inactive motion controls are hidden and disabled', !(await n.locator('.hero-motion-toggle').isVisible()) && await n.locator('.hero-motion-toggle').isDisabled() && (await sample(n)).animations.every(a => a.state !== 'running'));
  await n.screenshot({ path: `${dir}/after/no-javascript-390.png`, fullPage: true, animations: 'disabled' }); await noJS.close();
  const fallback = await browser.newContext(); await fallback.addInitScript(() => { window.IntersectionObserver = undefined; });
  const f = await fallback.newPage(); await f.goto(base); await f.locator('.hero-motion-visual.is-playing').waitFor();
  check('Missing IntersectionObserver leaves hero and pause control functional', await f.getByRole('button', { name: 'Pause motion', exact: true }).isEnabled()); await fallback.close();
  // Captures use separate contexts: full-page capture can perturb viewport-based
  // observers, and animation disabling overrides later CSS pause states via WAAPI.
  for (const width of [390, 768, 1440]) {
    const capture = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await capture.newPage(); await page.goto(base); await settle(page);
    await page.locator('.hero-motion-visual.is-playing').waitFor(); await page.waitForTimeout(700);
    const layout = await inspect(page);
    await page.screenshot({ path: `${dir}/after/viewport-${width}.png`, animations: 'allow' });
    await page.screenshot({ path: `${dir}/after/home-${width}.png`, fullPage: true, animations: 'allow' });
    await sharp(`${dir}/after/home-${width}.png`).extract({ left: 0, top: Math.floor(layout.hero.y), width, height: Math.ceil(layout.hero.height) }).toFile(`${dir}/after/hero-${width}.png`);
    await capture.close();
  }
  check('Hero makes no photographic asset or external image request', report.requests.every(r => !r.url.includes('hero-workspace') && r.url.startsWith(base)));
} catch (error) { report.failures.push({ exception: error.stack }); }
finally { await browser.close(); await writeFile(`${dir}/browser-results.json`, JSON.stringify(report, null, 2)); }
console.log(JSON.stringify({ browser: report.browser, checks: report.checks.length, failures: report.failures, errors: report.errors, accessibility: report.accessibility.map(a => ({ width: a.width, mode: a.mode, violations: a.violations.length })) }));
assert.equal(report.failures.length + report.errors.length, 0);
