import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { pages } from '../src/data/seo.js';

test('all rendered responsive image descriptors match real image dimensions', async () => {
  const candidates = new Map();
  for (const path of Object.keys(pages)) {
    const html = readFileSync(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
    for (const [, set] of html.matchAll(/srcSet="([^"]+)"/g)) {
      for (const candidate of set.split(',')) {
        const [, url, width] = candidate.trim().match(/^(\S+) (\d+)w$/) || [];
        assert.ok(url && width, `Invalid responsive descriptor: ${candidate}`);
        candidates.set(url, Number(width));
      }
    }
  }
  assert.ok(candidates.size > 0, 'The site must retain responsive raster images');
  for (const name of ['examify', 'inventory', 'learning', 'examify-mobile', 'inventory-mobile', 'learning-mobile']) {
    const svg = readFileSync(`src/assets/images/concepts/${name}.svg`, 'utf8');
    const metadata = await sharp(Buffer.from(svg)).metadata();
    assert.equal(metadata.width / metadata.height, 1.6);
    assert.ok(!/\d+%|\d+\+|24\/7|Accuracy|availability/i.test(svg), 'Concept art cannot contain unverified metrics');
  }
  for (const [url, width] of candidates) {
    const metadata = await sharp(`dist${url}`).metadata();
    assert.equal(metadata.width, width, url);
    assert.ok(metadata.height > 0);
  }
});
