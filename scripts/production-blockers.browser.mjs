// Optional real-browser regression suite. Install QA-only dependencies first:
// npm install --prefix .qa-tools --no-save --package-lock=false playwright @axe-core/playwright
// Start npm run preview -- --host 127.0.0.1 --port 4173, then run this file.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const directory = 'artifacts/production-fixes';
await mkdir(directory, { recursive: true });
const base = 'http://127.0.0.1:4173';
const report = { checks: [], failures: [], privacy: [], training: [], overlap: [], contrast: [] };
const check = (name, passed, details) => {
  report.checks.push({ name, passed, details });
  if (!passed) report.failures.push({ name, details });
};
const browser = await chromium.launch({ executablePath: process.env.QA_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const goto = (page, path) => page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
try {
  for (const width of [360, 390, 768, 1440]) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    const page = await context.newPage();
    const submissions = [];
    await context.route('https://api.web3forms.com/**', route => route.abort());
    await context.route(base + '/contact', route => {
      const request = route.request();
      if (request.method() === 'GET') return route.continue();
      submissions.push({ method: request.method(), query: new URL(request.url()).search, fields: [...new URLSearchParams(request.postData() || '').keys()] });
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<p>Intercepted test submission. Nothing sent.</p>' });
    });
    await goto(page, '/contact');
    check(`${width}: no-JS explanation visible`, await page.getByText(/JavaScript is required to send this form securely/).isVisible());
    check(`${width}: no-JS fields and submit are disabled`, await page.locator('#enquiry-name').isDisabled() && await page.getByRole('button', { name: 'Send enquiry', exact: true }).isDisabled());
    check(`${width}: no-JS direct contact remains accessible`, await page.locator('main').getByRole('link', { name: 'Chat on WhatsApp', exact: false }).isVisible() && await page.locator('a[href^="mailto:"]').count() > 0);
    await page.evaluate(() => {
      document.querySelector('#enquiry-name').value = 'Synthetic Privacy Test';
      document.querySelector('#enquiry-email').value = 'qa@example.com';
      document.querySelector('#enquiry-phone').value = '+91 98765 43210';
      document.querySelector('#enquiry-message').value = 'Synthetic enquiry, never delivered.';
      document.querySelector('button[type=submit]').click();
    });
    check(`${width}: disabled submit cannot navigate or send data`, page.url() === base + '/contact' && submissions.length === 0);
    await page.screenshot({ path: `${directory}/contact-no-javascript-${width}.png`, fullPage: true });
    // Stronger defense check: even forced native submission must be POST,
    // without query data; disabled controls must not become successful controls.
    await Promise.all([page.waitForNavigation(), page.evaluate(() => document.querySelector('form').requestSubmit())]);
    check(`${width}: forced native submit uses POST with no query or personal fields`, submissions.length === 1 && submissions[0].method === 'POST' && submissions[0].query === '' && submissions[0].fields.length === 0);
    await goto(page, '/contact');
    // Simulate script failure after controls have been enabled. Native fallback
    // still must send a body, never personal data in the navigation URL.
    await page.evaluate(() => {
      document.querySelector('fieldset').disabled = false;
      for (const [name, value] of Object.entries({ name: 'Synthetic Privacy Test', email: 'qa@example.com', phone: '+91 98765 43210', service: 'Website Development', message: 'Synthetic enquiry, never delivered.' })) {
        document.querySelector(`[name="${name}"]`).value = value;
      }
    });
    await Promise.all([page.waitForNavigation(), page.evaluate(() => document.querySelector('form').requestSubmit())]);
    check(`${width}: enabled native fallback keeps personal data out of URL`, submissions.length === 2 && submissions[1].method === 'POST' && submissions[1].query === '' && ['name', 'email', 'phone', 'message'].every(name => submissions[1].fields.includes(name)) && new URL(page.url()).search === '');
    report.privacy.push({ width, submissions });
    await context.close();

    const live = await browser.newContext({ viewport: { width, height: 900 } });
    await live.route('https://api.web3forms.com/**', route => route.abort());
    const rendered = await live.newPage();
    await goto(rendered, '/contact');
    await rendered.locator('#enquiry-name').waitFor();
    await rendered.waitForFunction(() => !document.querySelector('#enquiry-name').disabled && !document.querySelector('fieldset').disabled);
    check(`${width}: hydration enables form`, await rendered.locator('#enquiry-name').isEnabled());
    const overlap = await rendered.evaluate(() => ({
      floatCount: document.querySelectorAll('.whatsapp-button').length,
      documentWidth: document.documentElement.scrollWidth,
      inlineActions: [...document.querySelectorAll('main a[href^="https://wa.me/"]')].map(a => ({ name: a.textContent.trim(), width: a.getBoundingClientRect().width, height: a.getBoundingClientRect().height })),
    }));
    check(`${width}: no floating control can overlap Contact`, overlap.floatCount === 0 && overlap.documentWidth <= width);
    check(`${width}: inline WhatsApp touch targets are comfortable`, overlap.inlineActions.length === 2 && overlap.inlineActions.every(a => a.height >= 44 && a.width >= 44));
    report.overlap.push({ width, ...overlap });
    await rendered.screenshot({ path: `${directory}/contact-${width}-viewport.png`, animations: 'disabled' });
    await goto(rendered, '/training');
    const links = rendered.locator('.course-card a.text-link');
    check(`${width}: six Training enquiry links`, await links.count() === 6);
    for (const link of await links.all()) {
      await link.focus();
      const semantics = await link.ariaSnapshot();
      const visible = await link.innerText();
      const course = await link.locator('span').textContent().then(text => text.slice(2));
      await rendered.keyboard.press('Tab');
      await rendered.keyboard.press('Shift+Tab');
      check(`${width}: Training link native name and keyboard focus`, semantics.includes('Enquire about this program') && semantics.includes(course) && decodeURIComponent(await link.getAttribute('href')).includes(course) && visible.includes('Enquire about this program') && await link.getAttribute('aria-label') === null && await link.evaluate(el => el === document.activeElement), { semantics });
      report.training.push({ width, semantics });
    }
    const axe = await new AxeBuilder({ page: rendered }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    check(`${width}: Training accessibility scan`, axe.violations.length === 0, axe.violations);
    const colors = await rendered.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      const tokens = Object.fromEntries(['muted', 'white', 'surface', 'navy', 'blue'].map(name => [name, style.getPropertyValue('--' + name).trim()]));
      const samples = ['.section-neutral .course-card > p', '.button-primary', '.site-footer h2'].map(selector => {
        const el = document.querySelector(selector); if (!el) return { selector, found: false };
        let surface = el;
        while (surface.parentElement && getComputedStyle(surface).backgroundColor === 'rgba(0, 0, 0, 0)') surface = surface.parentElement;
        return { selector, color: getComputedStyle(el).color, background: getComputedStyle(surface).backgroundColor };
      });
      return { tokens, samples };
    });
    const luminance = hex => {
      const expanded = hex.length === 4 ? '#' + [...hex.slice(1)].map(c => c + c).join('') : hex;
      return expanded.slice(1).match(/../g).map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
    };
    for (const [foreground, background] of [['muted','white'],['muted','surface'],['white','navy'],['white','blue'],['blue','surface']]) {
      const values = [luminance(colors.tokens[foreground]), luminance(colors.tokens[background])].sort((a,b)=>a-b);
      const ratio = (values[1] + .05) / (values[0] + .05);
      check(`${width}: computed token contrast ${foreground}/${background}`, ratio >= 4.5, ratio);
      report.contrast.push({ width, foreground, background, ratio, ...colors });
    }
    await live.close();
  }
} catch (error) {
  report.failures.push({ error: error.stack });
} finally {
  await browser.close();
  await writeFile(`${directory}/blocker-regressions.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }, null, 2));
assert.equal(report.failures.length, 0, 'Browser blocker regression failure; inspect saved JSON');
