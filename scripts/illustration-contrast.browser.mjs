// Verify actual computed colors against every flat layer underneath illustrative text.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const directory = 'artifacts/final-premium-review';
await mkdir(directory, { recursive: true });
const rgb = value => value.startsWith('#')
  ? value.slice(1).match(/../g).map(channel => parseInt(channel, 16))
  : value.match(/[\d.]+/g).slice(0, 3).map(Number);
const luminance = color => rgb(color).map(channel => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => a - b);
  return (values[1] + 0.05) / (values[0] + 0.05);
};
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const path of ['/products', '/insights']) {
    await page.goto('http://127.0.0.1:4173' + path);
    await page.evaluate(() => document.fonts.ready);
    const samples = await page.evaluate(() => {
      const posters = [...document.querySelectorAll('.preview-art')].map(element => ({
        type: 'poster', text: element.querySelector('strong').textContent,
        color: getComputedStyle(element).color,
        background: getComputedStyle(element).backgroundColor,
        decoration: getComputedStyle(element.querySelector('.poster-orbit')).borderColor,
        decorative: element.getAttribute('aria-hidden'),
      }));
      const drawings = [...document.querySelectorAll('.editorial-visual text')].map(element => ({
        type: 'svg', text: element.textContent, color: getComputedStyle(element).fill,
        // The SVG panel is white; workflow groups paint their own flat rect first.
        background: element.closest('g')?.querySelector('rect')?.getAttribute('fill') || '#ffffff',
        accessibleImage: element.closest('svg').getAttribute('aria-label'),
      }));
      return [...posters, ...drawings];
    });
    results.push({ path, samples: samples.map(sample => ({
      ...sample, backgroundRatio: contrast(sample.color, sample.background),
      decorationRatio: sample.decoration ? contrast(sample.color, sample.decoration) : null,
    })) });
  }
  await context.close();
} finally {
  await browser.close();
  await writeFile(`${directory}/illustration-contrast.json`, JSON.stringify(results, null, 2));
}
assert.equal(results.flatMap(result => result.samples).length, 9);
assert.ok(results.every(result => result.samples.every(sample =>
  sample.backgroundRatio >= 4.5 && (sample.decorationRatio === null || sample.decorationRatio >= 4.5))));
console.log('Illustration contrast: 9/9 text samples pass on all flat background layers.');
