// Homepage behavior, accessibility and responsive composition against the built preview.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const directory = 'artifacts/homepage-premium';
await mkdir(directory, { recursive: true });
const report = { checks: [], failures: [], layouts: [], workflow: [], accessibility: [], requests: [] };
const check = (name, passed, details) => { const item = { name, passed, details }; report.checks.push(item); if (!passed) report.failures.push(item); };
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const base = 'http://127.0.0.1:4173';
try {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: true });
    const page = await context.newPage();
    page.on('request', request => { if (!request.url().startsWith(base)) report.requests.push({ width, url: request.url() }); });
    await page.goto(base); await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => ({
      width: innerWidth, documentWidth: document.documentElement.scrollWidth, height: document.body.scrollHeight,
      chapters: [...document.querySelectorAll('main > section')].map(e => e.className),
      clipped: [...document.querySelectorAll('main h1, main h2, main h3, main p, main button')].filter(e => !e.closest('[aria-hidden="true"]') && e.getBoundingClientRect().width > 0 && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent),
      heroActions: [...document.querySelectorAll('.hero .button')].map(e => ({ height: e.getBoundingClientRect().height, href: e.getAttribute('href') })),
      // The image itself is the framed card (the stage only adds a transparent zoom inset), so measure the rendered image.
      stage: [...document.querySelectorAll('.image-stage img')].map(i => ({ ratio: i.clientWidth / i.clientHeight, fit: getComputedStyle(i).objectFit })),
    }));
    report.layouts.push(layout);
    check(`${width}: ten ordered chapters`, layout.chapters.length === 10 && ['hero','home-introduction','services-editorial','ai-feature','work-section','industries-editorial','home-process','product-editorial','insights-editorial','contact-cta'].every((name,index) => layout.chapters[index].includes(name)), layout.chapters);
    check(`${width}: readable, bounded composition`, layout.documentWidth <= width && !layout.clipped.length, layout.clipped);
    check(`${width}: comfortable hero actions and preserved destinations`, layout.heroActions.length === 2 && layout.heroActions.every(a => a.height >= 50) && layout.heroActions[0].href === '/contact' && layout.heroActions[1].href === '/services');
    check(`${width}: uncropped project illustrations`, layout.stage.length === 3 && layout.stage.every(s => s.fit === 'contain' && Math.abs(s.ratio - 1.6) < .03), layout.stage);
    const demo = page.locator('.workflow-demo');
    const heights = [];
    const headings = ['A useful starting point.', 'Make the next step clearer.', 'Bring the context together.', 'Keep people in control.'];
    for (let index = 0; index < 4; index++) {
      const button = demo.locator('.workflow-steps button').nth(index);
      await button.focus(); await page.keyboard.press('Enter');
      await demo.getByRole('heading', { name: headings[index], exact: true }).waitFor();
      const geometry = await demo.boundingBox(); heights.push(geometry.height);
      const state = { width, step: index + 1, height: geometry.height, selected: await button.getAttribute('aria-pressed'), heading: await demo.locator('h3').textContent() };
      report.workflow.push(state);
      check(`${width}: workflow step ${index + 1} keyboard and state`, state.selected === 'true' && await demo.locator('[aria-pressed="true"]').count() === 1 && await button.evaluate(e => e === document.activeElement && getComputedStyle(e).outlineWidth === '3px'), state);
      const axe = await new AxeBuilder({ page }).include('.ai-feature').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
      report.accessibility.push({ width, step: index + 1, violations: axe.violations });
      if (axe.violations.length) report.failures.push({ name: `${width}: workflow axe step ${index + 1}`, violations: axe.violations });
    }
    check(`${width}: workflow reserves height across all steps`, Math.max(...heights) - Math.min(...heights) <= 1, heights);
    await demo.getByRole('button', { name: 'Restart example' }).tap();
    check(`${width}: example restarts on touch`, await demo.locator('.workflow-steps button').first().getAttribute('aria-pressed') === 'true');
    await demo.getByRole('button', { name: 'Next step' }).tap();
    check(`${width}: example advances on touch`, await demo.locator('.workflow-steps button').nth(1).getAttribute('aria-pressed') === 'true');
    await demo.locator('.workflow-steps button').nth(3).tap();
    await page.screenshot({ path: `${directory}/workflow-last-step-${width}.png`, animations: 'disabled' });
    check(`${width}: demo makes no request or navigation`, page.url() === base + '/' && report.requests.length === 0, report.requests);
    await page.locator('.ai-feature-copy .button').click(); await page.waitForURL('**/services/ai-automation');
    await page.getByRole('heading', { level: 1, name: 'Automate Your Business with Intelligent AI Solutions.', exact: true }).waitFor();
    check(`${width}: AI feature leads to existing service`, await page.locator('h1').textContent() === 'Automate Your Business with Intelligent AI Solutions.');
    await page.goto(base); await page.locator('.hero .button-primary').click(); await page.waitForURL('**/contact');
    check(`${width}: project CTA reaches enabled privacy-safe form`, await page.locator('.enquiry-controls').isEnabled() && await page.locator('form').getAttribute('method') === 'post' && await page.locator('.whatsapp-button').count() === 0);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage(); await page.goto(base); await page.evaluate(() => document.fonts.ready);
  const service = page.locator('.home-service').first(); await service.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await service.hover(); await page.waitForTimeout(280);
  check('Service row stays static while explicit links remain interactive', await service.evaluate(e => getComputedStyle(e).transform === 'none'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check('Reduced motion removes service hover and active reveals', await service.evaluate(e => getComputedStyle(e).transform === 'none' && getComputedStyle(e).transitionDuration === '0s') && await page.evaluate(() => document.getAnimations().every(a => a.playState !== 'running')));
  await context.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const staticPage = await noJS.newPage(); await staticPage.goto(base);
  check('No-JS hero and workflow explanation are present', await staticPage.getByRole('heading', { level: 1 }).isVisible() && await staticPage.locator('.workflow-demo noscript .workflow-instruction').isVisible());
  await noJS.close();
} catch (error) { report.failures.push({ error: error.stack }); }
finally { await browser.close(); await writeFile(`${directory}/homepage-checks.json`, JSON.stringify(report, null, 2)); }
console.log(JSON.stringify({ checks: report.checks.length, workflowScans: report.accessibility.length, failures: report.failures }, null, 2));
assert.equal(report.failures.length, 0);
