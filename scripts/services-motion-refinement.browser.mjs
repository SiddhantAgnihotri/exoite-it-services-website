// Homepage-only Services QA against the local production preview in installed Chrome.
import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const dir = 'artifacts/services-motion-refinement', base = 'http://127.0.0.1:4173';
const baseline = JSON.parse(await readFile(`${dir}/before/observations.json`, 'utf8'));
const kinds = ['automation', 'website', 'software', 'mobile'];
const slugs = ['ai-automation', 'website-development', 'custom-software-development', 'mobile-app-development'];
const report = { browser: '', checks: [], failures: [], errors: [], layouts: [], motion: [], accessibility: [] };
await mkdir(`${dir}/after`, { recursive: true });
const check = (name, passed, details) => { const item = { name, passed, details }; report.checks.push(item); if (!passed) report.failures.push(item); };
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
report.browser = await browser.version();
const settle = page => page.evaluate(async () => { await document.fonts.ready; for (const img of document.images) { img.scrollIntoView({ behavior: 'instant' }); await img.decode().catch(() => {}); } scrollTo({ top: 0, behavior: 'instant' }); });
const inspect = page => page.locator('.services-editorial').evaluate(e => {
  const box = n => { const r = n.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height }; };
  const rgb = value => value.match(/[\d.]+/g).map(Number);
  const background = n => { if (!n) return [255,255,255]; const c = rgb(getComputedStyle(n).backgroundColor), a = c[3] ?? 1, below = a < 1 ? background(n.parentElement) : c; return c.slice(0,3).map((v,i) => v*a + below[i]*(1-a)); };
  const luminance = c => c.slice(0,3).map(v => { const n = v/255; return n <= .04045 ? n/12.92 : ((n+.055)/1.055)**2.4; }).reduce((sum,v,i) => sum + v*[.2126,.7152,.0722][i],0);
  const contrast = [], walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, parent = node.parentElement, text = node.textContent.trim(), style = getComputedStyle(parent);
    if (!text || !parent.getBoundingClientRect().width || style.visibility === 'hidden') continue;
    const bg = background(parent), a = luminance(rgb(style.color)), b = luminance(bg), size = parseFloat(style.fontSize);
    contrast.push({ text, size, color: style.color, background: bg, ratio: (Math.max(a,b)+.05)/(Math.min(a,b)+.05), minimum: size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5 });
  }
  return {
    width: innerWidth, section: box(e), overflow: document.documentElement.scrollWidth > innerWidth,
    copy: [...e.querySelectorAll('.section-heading p,.section-heading h2,.home-service-title,.home-service-copy,.supporting-services')].map(n => n.innerText),
    links: [...e.querySelectorAll('a')].map(a => ({ text: a.innerText, href: a.getAttribute('href') })),
    others: [...document.querySelectorAll('main>section')].filter(n => n!==e).map(n => ({ class:n.className,height:n.getBoundingClientRect().height,html:n.outerHTML })),
    header: document.querySelector('header').outerHTML, footer: document.querySelector('footer').outerHTML,
    metadata: [...document.head.querySelectorAll('title,meta[name=description],link[rel=canonical]')].map(n=>n.outerHTML),
    contrast, clipped: [...e.querySelectorAll('span,strong,p,a,h3')].filter(n => n.getBoundingClientRect().width && n.scrollWidth > n.clientWidth+2).map(n => n.innerText),
    rows: [...e.querySelectorAll('.home-service')].map(n => ({ height:box(n).height, art:box(n.querySelector('.service-artwork')), title:box(n.querySelector('.home-service-title')),copy:box(n.querySelector('.home-service-copy')) })),
    shifts: window.servicesReviewShifts || [],
  };
});
const sample = frame => frame.evaluate(e => ({
  height: e.getBoundingClientRect().height,
  core: e.querySelector('.sv-ai-float') ? new DOMMatrix(getComputedStyle(e.querySelector('.sv-ai-float')).transform).m42 : null,
  dash: e.querySelector('.sv-workflow-signal') ? parseFloat(getComputedStyle(e.querySelector('.sv-workflow-signal')).strokeDashoffset) : null,
  phone: e.querySelector('.sv-phone-float') ? new DOMMatrix(getComputedStyle(e.querySelector('.sv-phone-float')).transform).m42 : null,
  animations: e.getAnimations({ subtree:true }).filter(a => a.animationName?.startsWith('sv-')).map(a => ({ name:a.animationName,state:a.playState,duration:a.effect.getTiming().duration,iterations:String(a.effect.getTiming().iterations),frames:a.effect.getKeyframes() })),
}));
try {
  for (const width of [390,768,1440]) {
    const context = await browser.newContext({ viewport:{width,height:900}, reducedMotion:'reduce' });
    await context.addInitScript(() => { window.servicesReviewShifts=[]; new PerformanceObserver(list => { for (const e of list.getEntries()) if(!e.hadRecentInput) window.servicesReviewShifts.push(e.value); }).observe({type:'layout-shift',buffered:true}); });
    const page = await context.newPage(); page.on('pageerror',error => report.errors.push({width,message:error.message}));
    const response = await page.goto(base); await settle(page); await page.waitForTimeout(120);
    const layout = await inspect(page), previous = baseline.find(x=>x.width===width); report.layouts.push(layout);
    check(`${width}: local production preview is HTTP 200`,response.status()===200);
    check(`${width}: all existing marketing copy remains identical`,JSON.stringify(layout.copy)===JSON.stringify(previous.copy));
    check(`${width}: every existing Services link and label is preserved`,JSON.stringify(layout.links)===JSON.stringify(previous.links));
    check(`${width}: hero and all other homepage sections retain exact DOM and heights`,JSON.stringify(layout.others)===JSON.stringify(previous.others));
    check(`${width}: header, footer and SEO metadata remain identical`,layout.header===previous.header&&layout.footer===previous.footer&&JSON.stringify(layout.metadata)===JSON.stringify(previous.metadata));
    check(`${width}: no horizontal overflow or clipped labels`,!layout.overflow&&!layout.clipped.length,layout.clipped);
    check(`${width}: four equal-size visual stages`,layout.rows.length===4&&Math.max(...layout.rows.map(r=>r.art.height))-Math.min(...layout.rows.map(r=>r.art.height))<1);
    check(`${width}: mobile stacks and larger layouts separate text from art`,layout.rows.every(r=>width<=700?r.art.y>=r.copy.y+r.copy.height+10:r.art.x>=r.copy.x+r.copy.width+20));
    check(`${width}: artwork text stays at least 12px`,layout.contrast.filter(t=>['Concept','Enquiry','AI assistance','Human review','Your business','A clear offer.','Get in touch','Team workspace','Activity','Requests','Review','Team access','Workspace','Field note','Team notes','Draft'].includes(t.text)).every(t=>t.size>=12));
    check(`${width}: actual computed text colors meet AA`,layout.contrast.every(t=>t.ratio>=t.minimum),layout.contrast);
    check(`${width}: four illustrations have meaningful accessible descriptions`,await page.locator('.services-editorial').getByRole('img').count()===4&&await page.locator('.services-editorial [role=img]').evaluateAll(es=>es.every(e=>e.getAttribute('aria-label').length>65)));
    check(`${width}: mockups contain no numeric client metrics`,await page.locator('.sv-composition').evaluateAll(es=>es.every(e=>!/\d+%|\d+\+|[$₹]\d/.test(e.innerText))));
    const review = await page.locator('.sv-review-tag').boundingBox(), panel = await page.locator('.sv-dashboard-requests').boundingBox(), footer = await page.locator('.sv-dashboard-access').boundingBox();
    check(`${width}: review badge stays inside its panel and clear of footer`,review.y+review.height<=panel.y+panel.height+1&&review.y+review.height<footer.y, {review,panel,footer});
    check(`${width}: reduced motion cancels all service animation`,(await page.locator('.services-editorial').evaluate(e=>e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length))===0);
    check(`${width}: reduced-motion controls are hidden`,await page.locator('.service-art-motion-toggle:visible').count()===0);
    const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    report.accessibility.push({width,mode:'reduced-homepage',violations:axe.violations,incomplete:axe.incomplete.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))});
    check(`${width}: full homepage axe has zero A/AA violations`,axe.violations.length===0);
    await page.goto(base+'/services'); await page.evaluate(()=>document.fonts.ready);
    const servicesPage = await page.locator('main').evaluate(e=>({html:e.outerHTML,height:e.getBoundingClientRect().height}));
    check(`${width}: separate Services page is unchanged`,JSON.stringify(servicesPage)===JSON.stringify(previous.servicesPage)); await context.close();

    const normal = await browser.newContext({viewport:{width,height:900},hasTouch:width<950});
    const p = await normal.newPage(); p.on('pageerror',error=>report.errors.push({width,mode:'normal',message:error.message})); await p.goto(base); await p.evaluate(()=>document.fonts.ready);
    for (const kind of kinds) {
      const frame = p.locator(`[data-service-art=${kind}]`); await frame.scrollIntoViewIfNeeded(); await p.locator(`[data-service-art=${kind}].art-is-playing`).waitFor(); await p.waitForTimeout(800);
      const before = await sample(frame); await p.waitForTimeout(350); const moving = await sample(frame); report.motion.push({width,kind,before,moving});
      check(`${width}/${kind}: entrance is short and keeps layout height stable`,before.height===moving.height&&before.animations.some(a=>a.name==='sv-art-enter'&&a.duration===500&&a.iterations==='1'));
      if (kind==='automation'||kind==='mobile') {
        check(`${width}/${kind}: actual motion is bounded and advances`,kind==='automation'?moving.core>=-2.01&&moving.core<=.01&&Math.abs(moving.core-before.core)>.005&&Math.abs(moving.dash-before.dash)>.5:moving.phone>=-3.01&&moving.phone<=.01&&Math.abs(moving.phone-before.phone)>.005,{before,moving});
        const control = frame.getByRole('button'); check(`${width}/${kind}: pause control has accessible name and 44px target`,(await control.getAttribute('aria-label')).startsWith('Pause ')&&(await control.boundingBox()).height>=44);
        if(width<950)await control.tap();else await control.click(); await p.waitForTimeout(100);
        const frozen=await sample(frame);await p.waitForTimeout(250);const still=await sample(frame);
        check(`${width}/${kind}: tap/click pause freezes the visual and connector`,frozen.core===still.core&&frozen.phone===still.phone&&frozen.dash===still.dash&&still.animations.every(a=>a.state!=='running'));
        await control.focus();await p.keyboard.press('Enter');
        check(`${width}/${kind}: keyboard resumes with clear focus`,(await control.getAttribute('aria-label')).startsWith('Pause ')&&await control.evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineWidth==='3px'));
        await p.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await p.waitForFunction(kind=>!document.querySelector(`[data-service-art=${kind}]`).classList.contains('art-is-playing'),kind);
        check(`${width}/${kind}: offscreen animation is paused`,(await sample(frame)).animations.every(a=>a.state!=='running'));
        await frame.scrollIntoViewIfNeeded();await p.locator(`[data-service-art=${kind}].art-is-playing`).waitFor();await control.click();await p.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await p.waitForTimeout(60);await frame.scrollIntoViewIfNeeded();await p.waitForTimeout(100);
        check(`${width}/${kind}: user pause persists after scrolling`,(await control.getAttribute('aria-label')).startsWith('Play ')&&await frame.evaluate(e=>!e.classList.contains('art-is-playing')));
        await control.click();
      }
      if(kind==='software')check(`${width}: chart reveal runs once and invents no metric labels`,before.animations.some(a=>a.name==='sv-chart-draw'&&a.duration===700&&a.iterations==='1'));
      if(width===1440&&kind==='website'){await frame.hover();await p.waitForTimeout(280);check('Desktop browser layers have restrained 3px hover depth',await frame.locator('.sv-browser-front').evaluate(e=>Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42+3)<.1));await p.mouse.move(0,0);}
    }
    const activeAxe=await new AxeBuilder({page:p}).include('.services-editorial').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();report.accessibility.push({width,mode:'normal-services',violations:activeAxe.violations,incomplete:activeAxe.incomplete.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))});check(`${width}: animated artwork and controls have zero axe violations`,activeAxe.violations.length===0);
    await p.emulateMedia({reducedMotion:'reduce'});check(`${width}: changing motion preference cancels service animations`,await p.locator('.services-editorial').evaluate(e=>e.getAnimations({subtree:true}).length===0));
    for (let i=0;i<4;i++) { await p.goto(base);const row=p.locator('.home-service').nth(i);await row.locator('h3 a').focus();await p.keyboard.press('Tab');check(`${width}/${kinds[i]}: keyboard order reaches the explicit Explore link`,await row.locator('.text-link').evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineWidth==='3px'));await row.locator('.text-link').click();await p.waitForURL(`**/services/${slugs[i]}`);check(`${width}/${kinds[i]}: existing service link opens its dedicated page`,new URL(p.url()).pathname===`/services/${slugs[i]}`&&await p.locator('h1').isVisible()); }
    await normal.close();
  }
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const page=await noJS.newPage();await page.goto(base);
  check('No JavaScript: all four illustrations and links are prerendered',await page.locator('.services-editorial').getByRole('img').count()===4&&await page.locator('.home-service h3 a').count()===4);
  check('No JavaScript: motion remains paused and inactive controls are hidden',await page.locator('.service-art-motion-toggle:visible').count()===0&&await page.locator('.services-editorial').evaluate(e=>e.getAnimations({subtree:true}).every(a=>a.playState!=='running')));await noJS.close();
  // Keep screenshots separate from live motion checks: capture can alter observer state.
  for(const width of[390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:900}});const p=await context.newPage();await p.goto(base);await p.evaluate(()=>document.fonts.ready);
    for(const kind of kinds){const f=p.locator(`[data-service-art=${kind}]`);await f.scrollIntoViewIfNeeded();await p.waitForTimeout(850);await f.screenshot({path:`${dir}/after/${kind}-${width}.png`,animations:'allow'});}
    await p.evaluate(async()=>{for(const img of document.images)await img.decode().catch(()=>{});scrollTo({top:0,behavior:'instant'});});await p.waitForTimeout(120);const r=await p.locator('.services-editorial').evaluate(e=>{const b=e.getBoundingClientRect();return{y:Math.floor(b.y+scrollY),height:Math.ceil(b.height)};});await p.screenshot({path:`${dir}/after/home-${width}.png`,fullPage:true,animations:'allow'});await sharp(`${dir}/after/home-${width}.png`).extract({left:0,top:r.y,width,height:r.height}).toFile(`${dir}/after/services-${width}.png`);await context.close();
  }
}catch(error){report.failures.push({exception:error.stack});}finally{await browser.close();await writeFile(`${dir}/browser-results.json`,JSON.stringify(report,null,2));}
console.log(JSON.stringify({browser:report.browser,checks:report.checks.length,failures:report.failures,errors:report.errors,axe:report.accessibility.map(a=>({width:a.width,mode:a.mode,violations:a.violations.length}))}));
assert.equal(report.failures.length+report.errors.length,0);
