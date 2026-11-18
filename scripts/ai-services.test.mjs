import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { aiServices, aiCategory, aiDisclosure } from '../src/data/aiServices.js';
import { serviceDetails } from '../src/data/serviceDetails.js';
import { pages, origin } from '../src/data/seo.js';
import { enquiryServices, enquiryContext, validateEnquiry } from '../src/data/enquiry.js';
const read = path => readFileSync(path, 'utf8');

test('AI category has four collision-free routes and preserves the existing route inventory', () => {
  assert.equal(aiServices.length, 4);
  assert.deepEqual(aiServices.map(s => s.slug), ['ai-automation', 'ai-chatbots', 'ai-workflow-integration', 'ai-business-software']);
  assert.equal(new Set(serviceDetails.map(s => s.slug)).size, 10);
  assert.equal(Object.keys(pages).length, 26);
  for (const slug of ['website-development', 'custom-software-development', 'mobile-app-development', 'school-institute-solutions', 'digital-marketing', 'it-training']) assert.ok(pages['/services/' + slug]);
});

test('AI pages disclose illustrative status, scope and privacy boundaries in crawlable HTML', () => {
  for (const service of aiServices) {
    const html = read(`dist/services/${service.slug}.html`);
    assert.ok(html.includes(aiDisclosure));
    for (const text of ['Not a completed client implementation.', 'Business challenges', 'Supported integration approaches', 'Security &amp; privacy considerations', 'human handoff', 'OpenAI APIs', 'Google Gemini', service.cta]) assert.ok(html.toLowerCase().includes(text.toLowerCase()), `${service.slug}: ${text}`);
    assert.ok(!/partner-badge|100% accurate|zero errors|guaranteed savings/i.test(html));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@graph'].find(s => s['@type'] === 'Service').url, origin + '/services/' + service.slug);
  }
});

test('AI enquiry options resolve by slug and display name and validate without special bypasses', () => {
  const valid = { name: 'Synthetic Test', email: 'qa@example.com', phone: '+91 98765 43210', message: 'Potential AI project scope', budget: '', timeline: '' };
  assert.ok(enquiryServices.includes(aiCategory));
  assert.equal(validateEnquiry({ ...valid, service: aiCategory }), '');
  for (const service of aiServices) {
    assert.ok(enquiryServices.includes(service.enquiry));
    assert.equal(enquiryContext('?service=' + service.slug).service, service.enquiry);
    assert.equal(enquiryContext('?service=' + encodeURIComponent(service.enquiry)).service, service.enquiry);
    assert.equal(validateEnquiry({ ...valid, service: service.enquiry }), '');
  }
});

test('AI homepage feature is standalone after primary services and links to the automation page', () => {
  const html = read('dist/index.html');
  const feature = html.match(/<section class="section ai-feature"[\s\S]*?<\/section>/)?.[0];
  assert.ok(feature);
  assert.ok(html.indexOf('services-editorial') < html.indexOf('section ai-feature'));
  assert.ok(html.indexOf('section ai-feature') < html.indexOf('work-section'));
  assert.ok(feature.includes('href="/services/ai-automation"'));
  assert.ok(feature.includes('not claims of completed AI client projects'));
  assert.equal((feature.match(/<li[\s>]/g) || []).length, 7); // Three concise capabilities and four workflow steps (steps carry data-state).
  for (const stage of ['Customer enquiry', 'AI categorization', 'CRM record', 'Follow-up suggestion']) assert.ok(feature.includes(stage));
  assert.ok(feature.includes('Illustrative workflow'));
  assert.ok(feature.includes('No live tools connected or messages sent.'));
});

test('AI services are discoverable through category, navigation and related links', () => {
  const html = read('dist/services.html');
  assert.ok(html.includes('id="ai-automation-solutions"'));
  for (const service of aiServices) {
    assert.ok(html.includes('href="/services/' + service.slug + '"'));
    const detail = read(`dist/services/${service.slug}.html`);
    for (const related of aiServices.filter(s => s !== service)) assert.ok(detail.includes('href="/services/' + related.slug + '"'));
  }
});
