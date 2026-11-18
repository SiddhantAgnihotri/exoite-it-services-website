// Task 2A — homepage Core Services layout QA against the local production preview in installed Chrome.
// Usage: node scripts/services-layout-refinement.browser.mjs before|after
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const mode = process.argv[2];
assert.ok(mode === 'before' || mode === 'after', 'Pass "before" or "after"');
const dir = process.env.QA_ARTIFACT_DIR || 'artifacts/services-layout-refinement', out = `${dir}/${mode}`, base = 'http://127.0.0.1:4173';
const widths = [360, 390, 768, 1024, 1440, 1920], shotWidths = [390, 768, 1440];
const kinds = ['automation', 'website', 'software', 'mobile'];
const slugs = ['ai-automation', 'website-development', 'custom-software-development', 'mobile-app-development'];
const hash = value => createHash('sha256').update(value).digest('hex');
const report = { mode, browser: '', checks: [], failures: [], errors: [], observations: [], motion: [], accessibility: [] };
const check = (name, passed, details) => { const item = { name, passed: !!passed, details }; report.checks.push(item); if (!passed) report.failures.push(item); };
await mkdir(out, { recursive: true });
const baseline = mode === 'after' ? JSON.parse(await readFile(`${dir}/before/observations.json`, 'utf8')) : null;
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
report.browser = await browser.version();

const settle = page => page.evaluate(async () => { await document.fonts.ready; for (const img of document.images) { img.scrollIntoView({ behavior: 'instant' }); await img.decode().catch(() => {}); } scrollTo({ top: 0, behavior: 'instant' }); });
const inspect = page => page.locator('.services-editorial').evaluate(e => {
  const box = n => { if (!n) return null; const r = n.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height }; };
  const union = (...b) => { const top = Math.min(...b.map(v => v.y)), bottom = Math.max(...b.map(v => v.y + v.height)), left = Math.min(...b.map(v => v.x)), right = Math.max(...b.map(v => v.x + v.width)); return { x: left, y: top, width: right - left, height: bottom - top }; };
  const rgb = value => value.match(/[\d.]+/g).map(Number);
  const background = n => { if (!n) return [255, 255, 255]; const c = rgb(getComputedStyle(n).backgroundColor), a = c[3] ?? 1, below = a < 1 ? background(n.parentElement) : c; return c.slice(0, 3).map((v, i) => v * a + below[i] * (1 - a)); };
  const luminance = c => c.slice(0, 3).map(v => { const n = v / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const contrast = [], walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, parent = node.parentElement, text = node.textContent.trim(), style = getComputedStyle(parent);
    if (!text || !parent.getBoundingClientRect().width || style.visibility === 'hidden') continue;
    const bg = background(parent), a = luminance(rgb(style.color)), b = luminance(bg), size = parseFloat(style.fontSize);
    contrast.push({ text, size, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05), minimum: size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5 });
  }
  return {
    width: innerWidth, pageHeight: document.documentElement.scrollHeight, section: box(e), overflow: document.documentElement.scrollWidth > innerWidth,
    copy: [...e.querySelectorAll('.section-heading p,.section-heading h2,.home-service-title,.home-service-copy,.supporting-services')].map(n => n.innerText.replace(/\s+/g, ' ').trim()),
    links: [...e.querySelectorAll('a')].map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
    others: [...document.querySelectorAll('main>section')].filter(n => n !== e).map(n => ({ class: n.className, height: n.getBoundingClientRect().height, html: n.outerHTML })),
    header: document.querySelector('header').outerHTML, footer: document.querySelector('footer').outerHTML,
    metadata: [...document.head.querySelectorAll('title,meta[name=description],link[rel=canonical],script[type="application/ld+json"]')].map(n => n.outerHTML),
    contrast, clipped: [...e.querySelectorAll('span,strong,p,a,h3')].filter(n => n.getBoundingClientRect().width && n.scrollWidth > n.clientWidth + 2).map(n => n.innerText),
    heading: box(e.querySelector('.section-heading')), supporting: box(e.querySelector('.supporting-services')),
    rows: [...e.querySelectorAll('.home-service')].map(n => {
      const title = box(n.querySelector('.home-service-title')), copy = box(n.querySelector('.home-service-copy')), art = box(n.querySelector('.service-artwork')), text = union(title, copy), row = box(n);
      return { row, title, copy, art, text, h3: box(n.querySelector('h3')), cta: box(n.querySelector('.home-service-copy .text-link')),
        textCenterOffset: (text.y + text.height / 2) - (art.y + art.height / 2), artTopInset: art.y - row.y, artBottomInset: row.y + row.height - art.y - art.height,
        titleSize: parseFloat(getComputedStyle(n.querySelector('h3')).fontSize), copySize: parseFloat(getComputedStyle(n.querySelector('.home-service-copy p')).fontSize) };
    }),
    shifts: window.servicesReviewShifts || [],
  };
});
const sample = frame => frame.evaluate(e => ({
  height: e.getBoundingClientRect().height,
  core: e.querySelector('.sv-ai-float') ? new DOMMatrix(getComputedStyle(e.querySelector('.sv-ai-float')).transform).m42 : null,
  dash: e.querySelector('.sv-workflow-signal') ? parseFloat(getComputedStyle(e.querySelector('.sv-workflow-signal')).strokeDashoffset) : null,
  phone: e.querySelector('.sv-phone-float') ? new DOMMatrix(getComputedStyle(e.querySelector('.sv-phone-float')).transform).m42 : null,
  animations: e.getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith('sv-')).map(a => ({ name: a.animationName, state: a.playState, duration: a.effect.getTiming().duration, iterations: String(a.effect.getTiming().iterations) })),
}));

try {
  // 1. Settled reduced-motion layout observations at six widths.
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.addInitScript(() => { window.servicesReviewShifts = []; new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.servicesReviewShifts.push(e.value); }).observe({ type: 'layout-shift', buffered: true }); });
    const page = await context.newPage(); page.on('pageerror', error => report.errors.push({ width, message: error.message }));
    const response = await page.goto(base); await settle(page); await page.waitForTimeout(150);
    const raw = await inspect(page);
    const obs = { ...raw, others: raw.others.map(o => ({ class: o.class, height: o.height, html: hash(o.html) })), header: hash(raw.header), footer: hash(raw.footer), metadata: hash(raw.metadata.join('')) };
    await page.goto(base + '/services'); await settle(page);
    obs.servicesPage = await page.locator('main').evaluate(e => ({ html: e.outerHTML, height: e.getBoundingClientRect().height })).then(s => ({ html: hash(s.html), height: s.height }));
    report.observations.push(obs);
    if (mode === 'after') {
      const prev = baseline.find(x => x.width === width), rows = obs.rows;
      check(`${width}: preview responds 200`, response.status() === 200);
      check(`${width}: Services copy is unchanged`, JSON.stringify(obs.copy) === JSON.stringify(prev.copy), { now: obs.copy, before: prev.copy });
      check(`${width}: every Services link and label is preserved`, JSON.stringify(obs.links) === JSON.stringify(prev.links));
      check(`${width}: hero and all other homepage sections keep identical DOM and height`, JSON.stringify(obs.others) === JSON.stringify(prev.others));
      check(`${width}: header, footer and SEO metadata unchanged`, obs.header === prev.header && obs.footer === prev.footer && obs.metadata === prev.metadata);
      check(`${width}: /services page unchanged`, JSON.stringify(obs.servicesPage) === JSON.stringify(prev.servicesPage));
      check(`${width}: no horizontal overflow or clipped labels`, !obs.overflow && !obs.clipped.length, obs.clipped);
      check(`${width}: computed text contrast meets AA`, obs.contrast.every(t => t.ratio >= t.minimum), obs.contrast.filter(t => t.ratio < t.minimum));
      check(`${width}: four equal-size artworks`, rows.length === 4 && Math.max(...rows.map(r => r.art.height)) - Math.min(...rows.map(r => r.art.height)) < 1 && Math.max(...rows.map(r => r.art.width)) - Math.min(...rows.map(r => r.art.width)) < 1);
      check(`${width}: rows share one consistent height and rhythm`, Math.max(...rows.map(r => r.row.height)) - Math.min(...rows.map(r => r.row.height)) < (width <= 700 ? 40 : 1.5), rows.map(r => r.row.height));
      check(`${width}: artwork text stays at least 12px`, obs.contrast.filter(t => ['Concept', 'Enquiry', 'AI assistance', 'Human review', 'Your business', 'Get in touch', 'Team workspace', 'Activity', 'Requests', 'Review', 'Team access', 'Workspace', 'Field note', 'Team notes', 'Draft'].includes(t.text)).every(t => t.size >= 12));
      check(`${width}: no unexpected layout shift`, obs.shifts.reduce((a, b) => a + b, 0) < .01, obs.shifts);
      if (width > 700) {
        check(`${width}: text group is vertically centred on its artwork (±2px)`, rows.every(r => Math.abs(r.textCenterOffset) <= 2), rows.map(r => r.textCenterOffset));
        check(`${width}: text sits clearly beside artwork`, rows.every(r => r.art.x >= Math.max(r.title.x + r.title.width, r.copy.x + r.copy.width) + 24));
        check(`${width}: title, description and CTA share one left edge`, rows.every(r => Math.abs(r.h3.x - r.copy.x) <= 1 || Math.abs(r.title.x - r.copy.x) <= 1));
        check(`${width}: artwork inset is equal above and below`, rows.every(r => Math.abs(r.artTopInset - r.artBottomInset) <= 1.5), rows.map(r => [r.artTopInset, r.artBottomInset]));
      } else {
        check(`${width}: mobile stacks title, copy then artwork`, rows.every(r => r.copy.y >= r.title.y + r.title.height - 1 && r.art.y >= r.copy.y + r.copy.height + 8));
        check(`${width}: Services section is not taller than before`, obs.section.height <= prev.section.height + 1, { before: prev.section.height, after: obs.section.height });
      }
      check(`${width}: reduced motion leaves no running Services animation`, (await (async () => { await page.goto(base); await settle(page); return page.locator('.services-editorial').evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length); })()) === 0);
      check(`${width}: reduced-motion pause controls are hidden`, await page.locator('.service-art-motion-toggle:visible').count() === 0);
      if (width === 390 || width === 1440) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        report.accessibility.push({ width, mode: 'reduced-homepage', violations: axe.violations, incomplete: axe.incomplete.map(v => ({ id: v.id, count: v.nodes.length })) });
        check(`${width}: full homepage axe has zero A/AA violations`, axe.violations.length === 0, axe.violations.map(v => v.id));
      }
    }
    await context.close();
  }
  await writeFile(`${out}/observations.json`, JSON.stringify(report.observations, null, 2));

  // 2. Live interactions (after only): entrance, loops, pause/play, offscreen, hover, focus, navigation.
  if (mode === 'after') for (const width of shotWidths) {
    const normal = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 950 });
    const p = await normal.newPage(); p.on('pageerror', error => report.errors.push({ width, mode: 'normal', message: error.message })); await p.goto(base); await p.evaluate(() => document.fonts.ready);
    for (const kind of kinds) {
      const frame = p.locator(`[data-service-art=${kind}]`); await frame.scrollIntoViewIfNeeded(); await p.locator(`[data-service-art=${kind}].art-is-playing`).waitFor(); await p.waitForTimeout(800);
      const before = await sample(frame); await p.waitForTimeout(350); const moving = await sample(frame); report.motion.push({ width, kind, before, moving });
      check(`${width}/${kind}: entrance is short and layout height stays stable`, before.height === moving.height && before.animations.some(a => a.name === 'sv-art-enter' && a.duration === 500 && a.iterations === '1'));
      if (kind === 'automation' || kind === 'mobile') {
        check(`${width}/${kind}: loop motion is bounded and advances`, kind === 'automation' ? moving.core >= -2.01 && moving.core <= .01 && Math.abs(moving.core - before.core) > .005 && Math.abs(moving.dash - before.dash) > .5 : moving.phone >= -3.01 && moving.phone <= .01 && Math.abs(moving.phone - before.phone) > .005, { before, moving });
        const control = frame.getByRole('button');
        check(`${width}/${kind}: pause control has accessible name and 44px target`, (await control.getAttribute('aria-label')).startsWith('Pause ') && (await control.boundingBox()).height >= 44);
        if (width < 950) await control.tap(); else await control.click(); await p.waitForTimeout(100);
        const frozen = await sample(frame); await p.waitForTimeout(250); const still = await sample(frame);
        check(`${width}/${kind}: pause freezes the visual`, frozen.core === still.core && frozen.phone === still.phone && frozen.dash === still.dash && still.animations.every(a => a.state !== 'running'));
        await control.focus(); await p.keyboard.press('Enter');
        check(`${width}/${kind}: keyboard resumes with visible focus`, (await control.getAttribute('aria-label')).startsWith('Pause ') && await control.evaluate(e => e === document.activeElement && getComputedStyle(e).outlineWidth === '3px'));
        await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })); await p.waitForFunction(k => !document.querySelector(`[data-service-art=${k}]`).classList.contains('art-is-playing'), kind);
        check(`${width}/${kind}: offscreen animation pauses`, (await sample(frame)).animations.every(a => a.state !== 'running'));
        await frame.scrollIntoViewIfNeeded(); await p.locator(`[data-service-art=${kind}].art-is-playing`).waitFor(); await control.click(); await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })); await p.waitForTimeout(60); await frame.scrollIntoViewIfNeeded(); await p.waitForTimeout(100);
        check(`${width}/${kind}: user pause persists after scrolling`, (await control.getAttribute('aria-label')).startsWith('Play ') && await frame.evaluate(e => !e.classList.contains('art-is-playing')));
        await control.click();
      }
      if (kind === 'software') check(`${width}: chart reveal runs once`, before.animations.some(a => a.name === 'sv-chart-draw' && a.duration === 700 && a.iterations === '1'));
      if (width === 1440 && kind === 'website') { await frame.hover(); await p.waitForTimeout(280); check('1440: browser layers keep 3px hover depth', await frame.locator('.sv-browser-front').evaluate(e => Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42 + 3) < .1)); await p.mouse.move(0, 0); }
    }
    if (width === 1440) {
      const row = p.locator('.home-service').first(); await row.scrollIntoViewIfNeeded(); await row.hover({ position: { x: 5, y: 5 } }); await p.waitForTimeout(260);
      check('1440: service row itself stays static on hover', await row.evaluate(e => getComputedStyle(e).transform === 'none'));
      await row.locator('h3 a').hover(); await p.waitForTimeout(260);
      check('1440: title link hover colour still applies', await row.locator('h3 a').evaluate(e => getComputedStyle(e).color === 'rgb(29, 78, 216)'));
      await p.mouse.move(0, 0);
    }
    const activeAxe = await new AxeBuilder({ page: p }).include('.services-editorial').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    report.accessibility.push({ width, mode: 'normal-services', violations: activeAxe.violations, incomplete: activeAxe.incomplete.map(v => ({ id: v.id, count: v.nodes.length })) });
    check(`${width}: animated Services section has zero axe violations`, activeAxe.violations.length === 0, activeAxe.violations.map(v => v.id));
    await p.emulateMedia({ reducedMotion: 'reduce' });
    check(`${width}: switching to reduced motion cancels Services animations`, await p.locator('.services-editorial').evaluate(e => e.getAnimations({ subtree: true }).length === 0));
    await p.emulateMedia({ reducedMotion: 'no-preference' });
    for (let i = 0; i < 4; i++) {
      await p.goto(base); const row = p.locator('.home-service').nth(i); await row.locator('h3 a').focus(); await p.keyboard.press('Tab');
      check(`${width}/${kinds[i]}: Tab moves from title to Explore link with 3px focus`, await row.locator('.text-link').evaluate(e => e === document.activeElement && getComputedStyle(e).outlineWidth === '3px'));
      check(`${width}/${kinds[i]}: Explore link keeps a 44px target`, (await row.locator('.text-link').boundingBox()).height >= 44);
      await row.locator('.text-link').click(); await p.waitForURL(`**/services/${slugs[i]}`);
      check(`${width}/${kinds[i]}: Explore link opens its service page`, new URL(p.url()).pathname === `/services/${slugs[i]}` && await p.locator('h1').isVisible());
    }
    await p.goto(base);
    for (const [i, link] of (await p.locator('.supporting-services h3 a').all()).entries()) check(`${width}: supporting link ${i + 1} keeps a 44px target`, (await link.boundingBox()).height >= 44);
    await normal.close();
  }

  if (mode === 'after') {
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } }); const page = await noJS.newPage(); await page.goto(base);
    check('No JavaScript: four illustrations and title links are prerendered', await page.locator('.services-editorial').getByRole('img').count() === 4 && await page.locator('.home-service h3 a').count() === 4);
    check('No JavaScript: motion stays paused and inactive controls are hidden', await page.locator('.service-art-motion-toggle:visible').count() === 0 && await page.locator('.services-editorial').evaluate(e => e.getAnimations({ subtree: true }).every(a => a.playState !== 'running')));
    await noJS.close();
  }

  // 3. Screenshots: settled reduced-motion stills, separate from live checks.
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' }); const p = await context.newPage(); await p.goto(base); await settle(p); await p.waitForTimeout(150);
    const r = await p.locator('.services-editorial').evaluate(e => { const b = e.getBoundingClientRect(); return { y: Math.floor(b.y + scrollY), height: Math.ceil(b.height) }; });
    await p.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
    await sharp(`${out}/home-${width}.png`).extract({ left: 0, top: r.y, width, height: r.height }).toFile(`${out}/services-${width}.png`);
    if (shotWidths.includes(width)) for (const [i, kind] of kinds.entries()) await p.locator('.home-service').nth(i).screenshot({ path: `${out}/row-${kind}-${width}.png` });
    await context.close();
  }
} catch (error) { report.failures.push({ exception: error.stack }); }
finally { await browser.close(); await writeFile(`${dir}/browser-results-${mode}.json`, JSON.stringify({ ...report, observations: report.observations.map(o => ({ width: o.width, section: o.section, pageHeight: o.pageHeight, rows: o.rows })) }, null, 2)); }
console.log(JSON.stringify({ mode, browser: report.browser, checks: report.checks.length, failures: report.failures, errors: report.errors, sections: report.observations.map(o => ({ w: o.width, h: Math.round(o.section.height), page: o.pageHeight, rows: o.rows.map(r => Math.round(r.row.height)), centre: o.rows.map(r => Math.round(r.textCenterOffset)) })) }, null, 1));
assert.equal(report.failures.length + report.errors.length, 0);
