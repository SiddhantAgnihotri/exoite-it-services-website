import {readFile,writeFile,readdir} from 'node:fs/promises';import{createHash}from'node:crypto';
const dir='artifacts/hero-motion-refinement',before=JSON.parse(await readFile(dir+'/source-before.json','utf8'));
const files=['package.json','package-lock.json','index.html','vercel.json'];async function walk(root){for(const e of await readdir(root,{withFileTypes:true})){const p=root+'/'+e.name;if(e.isDirectory())await walk(p);else files.push(p);}}for(const r of['src','public','scripts'])await walk(r);
const after={};for(const f of files)after[f]=createHash('sha256').update(await readFile(f)).digest('hex');
const modified=Object.keys(before).filter(f=>before[f]!==after[f]);const allowed=['src/components/sections/Hero.jsx','scripts/site.test.mjs','scripts/interaction-polish.browser.mjs','scripts/premium-visual-refinement.browser.mjs'];
const report={modified,added:files.filter(f=>!before[f]),unexpected:modified.filter(f=>!allowed.includes(f)),unchangedExistingFiles:Object.keys(before).filter(f=>before[f]===after[f]).length,allExistingFiles:Object.keys(before).length};
await writeFile(dir+'/source-scope-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
