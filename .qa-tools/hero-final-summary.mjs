import {readFile} from 'node:fs/promises';
import sharp from 'sharp';
const r=JSON.parse(await readFile('artifacts/hero-visual-upgrade/browser-results.json','utf8'));
console.log(JSON.stringify({source:await sharp('artifacts/hero-visual-upgrade/source/workspace-original.png').metadata(),contrast:r.layouts.map(x=>({width:x.width,nodes:x.textContrast.length,min:Math.min(...x.textContrast.map(c=>c.ratio)),caption:x.textContrast.find(c=>c.text.startsWith('AI-generated'))})),heldImage:r.imageSpace,summary:{checks:r.checks.length,failures:r.failures.length,errors:r.errors.length}}));
