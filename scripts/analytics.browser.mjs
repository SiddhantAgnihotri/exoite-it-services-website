// Local check: GA tag is stubbed (no data reaches Google). Inspects dataLayer calls.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [], ok = (n, c, d) => { results.push([c ? 'PASS' : 'FAIL', n, c ? '' : JSON.stringify(d)]); };
const calls = page => page.evaluate(() => (window.dataLayer || []).map(a => Array.from(a)));
const events = async page => (await calls(page)).filter(c => c[0] === 'event');
async function fresh(consent) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const requests = []; await ctx.route(/googletagmanager\.com|google-analytics\.com/, r => { requests.push(r.request().url()); r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }); });
  if (consent) await ctx.addInitScript(v => localStorage.setItem('exoite-analytics-consent', v), consent);
  return { ctx, requests, page: await ctx.newPage() };
}
try {
  // 1. No consent: nothing loads, banner shown.
  let { ctx, requests, page } = await fresh();
  await page.goto(base + '/'); await page.waitForTimeout(500);
  ok('Banner shown, no tag request before consent', await page.locator('.analytics-consent').isVisible() && requests.length === 0 && (await calls(page)).length === 0, requests);
  await page.getByRole('button', { name: 'Decline' }).click(); await page.waitForTimeout(200);
  await page.goto(base + '/about'); await page.waitForTimeout(400);
  ok('Declined: banner gone after reload, still no tag', !(await page.locator('.analytics-consent').count()) && requests.length === 0);
  await page.getByRole('button', { name: 'Analytics settings' }).click();
  ok('Footer Analytics settings reopens the choice', await page.locator('.analytics-consent').isVisible());
  await page.getByRole('button', { name: 'Accept analytics' }).click(); await page.waitForTimeout(400);
  ok('Accepting later loads the tag and sends the current page view', requests.some(u => u.includes('id=G-FER0ZN1GJZ')) && (await events(page)).filter(e => e[1] === 'page_view' && e[2].page_path === '/about').length === 1, await calls(page));
  await ctx.close();

  // 2. Consented: one page_view per route, query/hash stripped, link events, no PII.
  ({ ctx, requests, page } = await fresh('granted'));
  await page.goto(base + '/'); await page.waitForTimeout(600);
  const config = (await calls(page)).find(c => c[0] === 'config');
  ok('Single GA4 config with send_page_view disabled', config?.[1] === 'G-FER0ZN1GJZ' && config[2].send_page_view === false && requests.filter(u => u.includes('gtag/js')).length === 1, config);
  ok('No GTM container loaded', !requests.some(u => /gtm\.js|GTM-/.test(u)));
  await page.getByRole('link', { name: 'Work', exact: true }).first().click(); await page.waitForTimeout(400);
  await page.goto(base + '/contact?service=Website%20Development'); await page.waitForTimeout(500);
  const views = (await events(page)).filter(e => e[1] === 'page_view');
  ok('Direct load of /contact?service= sends exactly one view with path only', views.length === 1 && views[0][2].page_path === '/contact' && !JSON.stringify(views).includes('service='), views);
  await page.goto(base + '/'); await page.waitForTimeout(300);
  await page.getByRole('link', { name: 'Work', exact: true }).first().click(); await page.waitForTimeout(300);
  await page.goBack(); await page.waitForTimeout(300);
  const paths = (await events(page)).filter(e => e[1] === 'page_view').map(e => e[2].page_path);
  ok('Client-side navigation and back each send one page_view', paths.join() === '/,/portfolio,/', paths);

  // Link clicks: prevent real navigation.
  await page.goto(base + '/contact'); await page.waitForTimeout(300);
  await page.evaluate(() => document.addEventListener('click', e => { if (e.target.closest('a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"]')) e.preventDefault(); }, true));
  for (const sel of ['a[href^="tel:"]', 'a[href^="mailto:"]', 'a[href*="wa.me"]']) await page.locator(sel).first().click();
  const names = (await events(page)).map(e => e[1]);
  ok('phone_click, email_click and whatsapp_click each fire once', ['phone_click', 'email_click', 'whatsapp_click'].every(n => names.filter(x => x === n).length === 1), names);

  // 3. generate_lead only on confirmed success.
  const fill = async () => { await page.fill('#enquiry-name', 'Test Person'); await page.fill('#enquiry-phone', '9876543210'); await page.fill('#enquiry-email', 'test.person@example.com'); await page.selectOption('#enquiry-service', { index: 1 }); await page.fill('#enquiry-message', 'This is a test enquiry message only for local verification.'); };
  await page.route('https://api.web3forms.com/**', r => r.fulfill({ status: 500, contentType: 'application/json', body: '{"success":false}' }));
  await page.reload(); await page.waitForTimeout(300); await fill(); await page.getByRole('button', { name: 'Send enquiry' }).click(); await page.waitForTimeout(800);
  ok('Failed submission sends no generate_lead', !(await events(page)).some(e => e[1] === 'generate_lead'));
  await page.unroute('https://api.web3forms.com/**');
  await page.route('https://api.web3forms.com/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }));
  await page.getByRole('button', { name: 'Send enquiry' }).click().catch(() => {}); await page.waitForTimeout(800);
  const lead = (await events(page)).filter(e => e[1] === 'generate_lead');
  ok('Confirmed submission sends one generate_lead without personal data', lead.length === 1 && !/Test Person|9876543210|example\.com|test enquiry/i.test(JSON.stringify(await calls(page))), lead);
  await ctx.close();
} catch (e) { results.push(['FAIL', 'exception', e.stack]); }
await browser.close();
for (const r of results) console.log(...r);
assert.ok(results.every(r => r[0] === 'PASS'));
