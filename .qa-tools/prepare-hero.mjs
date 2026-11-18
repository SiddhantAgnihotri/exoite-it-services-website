import sharp from 'sharp';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
const source='C:/Users/ROBOTICS/.codex/generated_images/01a1e3cb-db93-7861-bccd-3ded5ed9ef0e/exec-2bbc3969-7ac5-4d7c-8011-64ba7740a1af.png';
const dir='artifacts/hero-visual-upgrade/source';
await mkdir(dir,{recursive:true});
await copyFile(source,dir+'/workspace-original.png');
const variants=[];
for(const width of [480,960,1440]){
 const path=`src/assets/images/optimized/hero-workspace-${width}.webp`;
 const result=await sharp(source).resize({width,height:width*3/4,fit:'contain'}).webp({quality:82,effort:6}).toFile(path);
 variants.push({path,...result});
}
await writeFile(dir+'/optimized-assets.json',JSON.stringify(variants,null,2));
console.log(JSON.stringify(variants));
