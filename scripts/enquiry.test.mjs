import test from 'node:test';
import assert from 'node:assert/strict';
import { enquiryContext, submitEnquiry, validateEnquiry } from '../src/data/enquiry.js';
import { serviceDetails } from '../src/data/serviceDetails.js';

const valid = { name: 'Alex Example', phone: '+91 98765 43210', email: 'alex@example.com', service: 'Website Development', budget: '', message: 'Please discuss a business website.' };
test('accepts international phone formats and optional budgets', () => {
  for (const phone of ['+91 98765 43210', '+1 (212) 555-0123', '6394732841']) assert.equal(validateEnquiry({ ...valid, phone }), '');
});

test('accepts an optional timeline, rejects oversized values and unsupported services', () => {
  assert.equal(validateEnquiry({ ...valid, timeline: '' }), '');
  assert.equal(validateEnquiry({ ...valid, timeline: 'Next quarter; flexible' }), '');
  assert.ok(validateEnquiry({ ...valid, timeline: 'x'.repeat(121) }));
  assert.ok(validateEnquiry({ ...valid, service: 'unsupported' }));
  for (const service of serviceDetails) {
    assert.equal(enquiryContext(`?service=${encodeURIComponent(service.enquiry)}`).service, service.enquiry);
    assert.equal(enquiryContext(`?service=${service.slug}`).service, service.enquiry);
  }
});
test('rejects blank content, invalid email and invalid phone numbers', () => {
  for (const changes of [{ name: '   ' }, { message: '\n ' }, { email: 'invalid@' }, { phone: '123' }, { phone: '1234567890123456' }, { phone: '+91 abcdefg' }, { service: '' }, { message: 'x'.repeat(5001) }]) assert.ok(validateEnquiry({ ...valid, ...changes }));
});
test('maps service and solution links and rejects unsupported selections', () => {
  assert.equal(enquiryContext('?service=School+%26+Institute+Solutions').service, 'School / Institute Software');
  assert.equal(enquiryContext('?service=IT+Training+%26+Workshops').service, 'IT Training');
  assert.equal(enquiryContext('?service=unknown').service, '');
  assert.equal(enquiryContext('?solution=Inventory+Management+System').message, 'I would like to discuss the Inventory Management System concept.');
});
test('submission preserves provider and public identifier and trims data', async () => {
  await submitEnquiry({ ...valid, name: ' Alex Example ', timeline: ' Flexible ' }, async (url, options) => {
    assert.equal(url, 'https://api.web3forms.com/submit');
    const payload = JSON.parse(options.body);
    assert.equal(payload.name, 'Alex Example');
    assert.equal(payload.timeline, 'Flexible');
    assert.equal(payload.botcheck, '');
    assert.ok(payload.access_key);
    assert.equal(options.method, 'POST');
    assert.ok(options.signal instanceof AbortSignal);
    return { ok: true, json: async () => ({ success: true }) };
  });
});
test('HTTP errors, provider rejections, invalid responses and network failures remain failures', async () => {
  for (const fetcher of [async () => ({ ok: false, json: async () => ({ success: true }) }), async () => ({ ok: true, json: async () => ({ success: false }) }), async () => ({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } }), async () => { throw new TypeError('Network unavailable'); }]) await assert.rejects(submitEnquiry(valid, fetcher));
});
