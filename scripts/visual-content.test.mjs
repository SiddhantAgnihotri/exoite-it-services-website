import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {serviceDetails} from '../src/data/serviceDetails.js';
import {serviceContent} from '../src/data/visualContent.js';
const text = html => html.replace(/<[^>]+>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replace(/\s+/g,' ');
test('visual service summaries preserve complete scope and audience in crawlable disclosures',()=>{
  for(const service of serviceDetails){
    assert.ok(serviceContent[service.slug]);
    const html=readFileSync(`dist/services/${service.slug}.html`,'utf8');
    const rendered=text(html);
    assert.ok(rendered.includes(service.overview),service.slug+' overview');
    assert.ok(rendered.includes(service.audience),service.slug+' audience');
    assert.ok(html.includes('Scope &amp; audience details'));
    assert.ok(serviceContent[service.slug].intro.length<=60);
  }
});
test('new concepts have no invented metrics and service detail heroes carry a visual',()=>{
  for(const service of serviceDetails){
    const html=readFileSync(`dist/services/${service.slug}.html`,'utf8');
    assert.ok(html.includes('page-hero-with-visual'),service.slug);
    assert.ok(!/99%|500\+|1000\+|24\/7 Availability/.test(html));
  }
});
