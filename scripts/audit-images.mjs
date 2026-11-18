import sharp from 'sharp';
import { readdir, readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const walk = async path => (await Promise.all((await readdir(path, { withFileTypes: true })).map(entry => entry.isDirectory() ? walk(`${path}/${entry.name}`) : `${path}/${entry.name}`))).flat();
const files = [...await walk('src/assets'), ...await walk('public')].filter(path => /\.(png|webp|svg|avif)$/i.test(path));
const sourceFiles = (await walk('src')).filter(path => /\.(jsx?|css)$/.test(path));
const sources = await Promise.all(sourceFiles.map(async path => ({ path, text: await readFile(path, 'utf8') })));
const assets = await Promise.all(files.map(async path => {
  const bytes = await readFile(path);
  let metadata = {}, inspectionError;
  try { metadata = await sharp(bytes).metadata(); }
  catch (error) { inspectionError = error.message; }
  const name = path.split('/').at(-1);
  return { path, bytes: (await stat(path)).size, width: metadata.width, height: metadata.height, format: metadata.format, inspectionError, sha256: createHash('sha256').update(bytes).digest('hex'), references: sources.filter(source => source.text.includes(name)).map(source => source.path) };
}));
const directory = 'artifacts/interaction-polish';
await mkdir(directory, { recursive: true });
const groups = new Map();
for (const asset of assets) { const list = groups.get(asset.sha256) || []; list.push(asset.path); groups.set(asset.sha256, list); }
const report = { assets, duplicateFiles: [...groups.values()].filter(paths => paths.length > 1), rawSourcePngBytes: assets.filter(a => a.path.startsWith('src/assets/images/') && a.format === 'png').reduce((sum, a) => sum + a.bytes, 0) };
await writeFile(`${directory}/image-audit.json`, JSON.stringify(report, null, 2));
console.log(`Audited ${assets.length} image assets; ${report.rawSourcePngBytes} bytes of source PNGs (not automatically shipped).`);
console.log(assets.filter(a => a.path.includes('brand-mark')).map(({ path, bytes, width }) => ({ path, bytes, width })));
console.log('Metadata inspection limits:', assets.filter(a => a.inspectionError).map(({ path, references }) => ({ path, references })));
