import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir='artifacts/hero-motion-refinement';
const before=JSON.parse(await readFile(dir+'/source-before.json','utf8'));
const files=['package.json','package-lock.json','index.html','vercel.json'];
async function walk(root){for(const e of await readdir(root,{withFileTypes:true})){const p=root+'/'+e.name;if(e.isDirectory())await walk(p);else files.push(p);}}
for(const root of ['src','public','scripts'])await walk(root);
const after={};for(const f of files)after[f]=createHash('sha256').update(await readFile(f)).digest('hex');
const modified=Object.keys(before).filter(f=>before[f]!==after[f]);
const added=files.filter(f=>!before[f]);
const allowed=['src/components/sections/Hero.jsx','scripts/site.test.mjs','scripts/interaction-polish.browser.mjs','scripts/premium-visual-refinement.browser.mjs'];
const unexpected=modified.filter(f=>!allowed.includes(f));
const result={modified,added,unexpected,unchangedExistingFiles:Object.keys(before).filter(f=>before[f]===after[f]).length,allExistingFiles:Object.keys(before).length};
await writeFile(dir+'/source-scope-verification.json',JSON.stringify(result,null,2));
const r=JSON.parse(await readFile(dir+'/browser-results.json','utf8'));
const b=JSON.parse(await readFile(dir+'/before/observations.json','utf8'));
console.log(JSON.stringify({scope:result,layouts:r.layouts.map(x=>({width:x.width,oldHeroHeight:b.find(z=>z.width===x.width).hero.height,newHeroHeight:x.hero.height,image:x.image,currentSrc:x.imageData.currentSrc,observedLayoutShifts:x.observedLayoutShifts,axeIncomplete:r.accessibility.find(a=>a.width===x.width).incomplete})),asset:await stat(dir+'/source/workspace-original.png').then(x=>x.size)}));

