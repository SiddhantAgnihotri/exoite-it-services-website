import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { pages, origin } from '../src/data/seo.js';
import { serviceDetails } from '../src/data/serviceDetails.js';
import { enquiryContext } from '../src/data/enquiry.js';
import { insights } from '../src/data/insights.js';
import { projects } from '../src/data/projects.js';

const read = path => readFileSync(path, 'utf8');
const output = path => path === '/' ? 'dist/index.html' : `dist${path}.html`;
const decode = value => value.replaceAll('&amp;', '&');
const titles = new Set();
const descriptions = new Set();
for (const [path, page] of Object.entries(pages)) {
  test(`${path}: initial HTML includes unique metadata, content and factual JSON-LD`, () => {
    const html = read(output(path));
    const head = html.split('</head>')[0];
    assert.equal((head.match(/<title>/g) || []).length, 1);
    assert.equal((head.match(/name="description"/g) || []).length, 1);
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(head.includes(`href="${origin}${path}"`));
    assert.ok(head.includes(`content="${page.noindex ? 'noindex' : 'index'},follow"`));
    for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card']) assert.ok(head.includes(key));
    assert.ok(!titles.has(page.title)); titles.add(page.title);
    assert.ok(!descriptions.has(page.description)); descriptions.add(page.description);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /<main(?:\s[^>]*)?>/);
    assert.ok(!html.includes('opacity:0'));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@context'], 'https://schema.org');
    assert.ok(!/aggregateRating|reviewCount|openingHours|foundingDate|streetAddress/.test(JSON.stringify(schema)));
    assert.ok(schema['@graph'].some(node => node['@type'] === 'Organization'));
    if (path === '/services') assert.equal(schema['@graph'].filter(node => node['@type'] === 'Service').length, serviceDetails.length);
  });
  test(`${path}: internal links, fragments and assets resolve in build output`, () => {
    const html = read(output(path));
    for (const match of html.matchAll(/<(a|img|script|link)\b[^>]*(?:href|src)="([^"]+)"[^>]*>/g)) {
      const value = decode(match[2]);
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const url = new URL(value, origin + path);
      if (match[1] === 'a') {
        if (url.pathname.startsWith('/assets/')) {
          assert.ok(existsSync(`dist${url.pathname}`), `Missing full-size visual ${value}`);
          continue;
        }
        assert.ok(pages[url.pathname], `Unknown route ${value}`);
        if (url.hash) assert.ok(read(output(url.pathname)).includes(`id="${url.hash.slice(1)}"`), `Missing fragment ${value}`);
      } else assert.ok(existsSync(`dist${url.pathname}`), `Missing asset ${value}`);
    }
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag, /alt="[^"]*"/);
    for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /rel="[^"]*(?:noreferrer|noopener)/);
  });
}
test('sitemap lists indexable canonical routes and excludes legal review drafts', () => {
  const locs = [...read('dist/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locs.sort(), Object.keys(pages).filter(path => !pages[path].noindex).map(path => origin + path).sort());
  assert.equal(read('public/sitemap.xml'), read('dist/sitemap.xml'));
  assert.match(read('dist/robots.txt'), /Allow: \/[\s\S]*Sitemap: https:\/\/exoiteitservices.com\/sitemap.xml/);
});

test('product previews state development status and do not advertise a released product', () => {
  const html = read('dist/products.html');
  assert.match(html, /In Development/);
  assert.match(html, /Not publicly launched/);
  assert.match(html, /Illustrative interface only/);
  assert.match(html, /not completed or available features/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-pressed="false"/);
  assert.ok(!/Start free trial|Buy now|Join thousands|Product schema/i.test(html));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.ok(schema['@graph'].some(node => node['@type'] === 'BreadcrumbList'));
  assert.ok(!schema['@graph'].some(node => ['Product', 'Offer'].includes(node['@type'])));
});

test('homepage prioritises four services and keeps keyboard-operable FAQ/industry disclosures', () => {
  const html = read('dist/index.html');
  assert.equal((html.match(/class="home-service home-service-/g) || []).length, 4);
  for (const slug of ['ai-automation', 'website-development', 'custom-software-development', 'mobile-app-development']) assert.ok(html.includes(`href="/services/${slug}"`));
  assert.match(html, /class="supporting-services"/);
  assert.ok((html.match(/<details\b/g) || []).length >= 11);
  assert.equal((html.match(/<details\b/g) || []).length, (html.match(/<summary\b/g) || []).length);
  assert.ok(html.includes('href="/products"'));
  assert.ok(html.includes('aria-controls="mobile-menu"'));
});

test('shared UI tokens keep the approved palette without restricting visual colours', () => {
  const css = ['design', 'sections', 'pages', 'responsive', 'refinements'].map(name => read(`src/styles/${name}.css`)).join('\n');
  const tokens = css.match(/:root\s*\{([\s\S]*?)\}/)[1];
  const colors = [...tokens.matchAll(/#[0-9a-f]{3,8}\b/gi)].map(match => match[0].toUpperCase());
  const allowed = new Set(['#FFFFFF', '#14213D', '#2563EB', '#F8FAFC', '#0F172A', '#5F6F85', '#CBD5E1', '#E2E8F0', '#15803D']);
  for (const color of colors) assert.ok(allowed.has(color), `Unapproved UI color: ${color}`);
  assert.ok(!/linear-gradient|radial-gradient|backdrop-filter/.test(css));
  assert.ok(!/grayscale\s*\(|saturate\s*\(\s*0\s*\)|mix-blend-mode/.test(css));
});

test('shared text pairings meet normal-text AA contrast on light, navy and blue surfaces', () => {
  const css = read('src/styles/design.css');
  const token = name => css.match(new RegExp(`--${name}: (#[0-9a-f]{6})`, 'i'))[1];
  const luminance = hex => {
    const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
      .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const [text, background] of [['muted', 'white'], ['muted', 'surface'], ['navy', 'white'], ['navy', 'surface'], ['text', 'white'], ['text', 'surface'], ['on-dark-muted', 'navy'], ['blue', 'white'], ['blue', 'surface'], ['white', 'navy'], ['white', 'blue']]) {
    const values = [luminance(token(text)), luminance(token(background))].sort((a,b) => a-b);
    assert.ok((values[1] + 0.05) / (values[0] + 0.05) >= 4.5, `${text} on ${background}`);
  }
});

test('editorial layout preserves service families, six process stages and contextual enquiries', () => {
  const home = read('dist/index.html');
  for (const stage of ['Discover', 'Plan', 'Design', 'Develop', 'Test', 'Launch']) assert.ok(home.includes(`<h3>${stage}</h3>`));
  assert.equal((home.match(/class="work-feature /g) || []).length, 3);
  assert.equal((home.match(/class="contact-cta"/g) || []).length, 1);
  for (const service of serviceDetails) {
    const html = read(output(`/services/${service.slug}`));
    const family = service.family || (['school-institute-solutions', 'it-training'].includes(service.slug) ? 'education' : service.slug === 'digital-marketing' ? 'advisory' : 'engineering');
    assert.ok(html.includes(`service-family-${family}`));
    assert.ok(html.includes(`page-hero-${family}`));
  }
  assert.ok(home.includes('aria-controls="mobile-menu"'));
  assert.ok(home.includes('class="nav-disclosure"'));
});

test('company hero is service-led and original portfolio visuals remain clearly illustrative', () => {
  const home = read('dist/index.html');
  const hero = home.match(/<section class="hero company-hero">([\s\S]*?)<\/section>/)[1];
  assert.match(hero, /Building Digital Solutions for/);
  assert.match(hero, /Start Your Project/);
  assert.ok(!hero.includes('Exoite Social'));
  for (const service of ['AI Automation', 'Website Development', 'Mobile Applications', 'Custom Software']) assert.ok(hero.includes(service));
  assert.match(hero, /class="hero-motion-visual"/);
  assert.match(hero, /Original workflow concept\. Not client software\./);
  assert.match(hero, /role="img" aria-label="Illustrative workflow connecting websites and apps to AI-assisted organisation and a human review step\."/);
  assert.match(hero, /class="hero-motion-toggle" type="button" disabled=""/);
  assert.match(hero, /Pause motion/);
  assert.ok(!hero.includes('<img'), 'The vector hero needs no photographic image request');
  const portfolio = read('dist/portfolio.html');
  assert.equal((portfolio.match(/View full-size illustration/g) || []).length, 3);
  assert.equal((portfolio.match(/not a verified application screenshot/g) || []).length, 3);
  assert.ok(portfolio.includes('Interface details are illustrative'));
  assert.ok(!/portfolio-(exam-portal|inventory|lms)-\d+/.test(portfolio), 'Old promotional posters must not return');
});
test('404 output is noindex and Vercel uses explicit routes with real 404 fallback', () => {
  assert.match(read('dist/404.html'), /content="noindex,follow"/);
  assert.ok(!read('dist/404.html').includes('rel="canonical"'));
  const config = JSON.parse(read('vercel.json'));
  assert.equal(config.routes.at(-1).status, 404);
  for (const path of Object.keys(pages)) {
    const route = config.routes.find(route => route.dest && new RegExp(`^${route.src}$`).test(path));
    const target = path.replace(new RegExp(`^${route.src}$`), route.dest);
    assert.ok(existsSync(`dist${target}`), `${path} direct request target missing`);
  }
});
test('form fields have associated labels, required flags and duplicate submission guard', () => {
  const html = read('dist/contact.html');
  for (const name of ['name', 'phone', 'email', 'service', 'budget', 'timeline', 'message']) {
    assert.ok(html.includes(`for="enquiry-${name}"`));
    assert.ok(html.includes(`id="enquiry-${name}"`));
  }
  assert.ok(html.includes('aria-live="polite"'));
  const pattern = html.match(/pattern="([^"]+)"/)[1];
  const phonePattern = new RegExp(`^(?:${pattern})$`, 'v');
  assert.ok(phonePattern.test('+1 (212) 555-0123'));
  assert.ok(!phonePattern.test('abcdefg'));
  const component = read('src/pages/Contact.jsx');
  assert.match(component, /if \(submitting.current/);
  assert.match(component, /finally[\s\S]*submitting.current = false/);
});

test('prerendered contact form cannot fall back to a GET with personal data', () => {
  const html = read('dist/contact.html');
  const form = html.match(/<form\b([^>]*)>([\s\S]*?)<\/form>/);
  assert.ok(form);
  assert.match(form[1], /method="post"/);
  assert.match(form[1], /action="\/contact"/);
  const controls = form[2].match(/<fieldset\b([^>]*)>([\s\S]*?)<\/fieldset>/);
  assert.ok(controls);
  assert.match(controls[1], /disabled=""/);
  for (const name of ['name', 'email', 'phone', 'service', 'budget', 'timeline', 'message']) {
    assert.match(controls[2], new RegExp(`name="${name}"`));
  }
  assert.match(controls[2], /type="submit"/);
  assert.match(form[2], /<noscript>[\s\S]*JavaScript is required[\s\S]*form is disabled[\s\S]*<\/noscript>/);
  assert.ok(html.includes('mailto:'));
  assert.ok(html.includes('Chat on WhatsApp'));
});

test('all six Training enquiries use visible text in their native accessible names', () => {
  const html = read('dist/training.html');
  const links = [...html.matchAll(/<a\b([^>]*)>(Enquire about this program[\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 6);
  const names = new Set();
  for (const [, attributes, content] of links) {
    assert.ok(!attributes.includes('aria-label='));
    assert.match(attributes, /href="https:\/\/wa.me\//);
    assert.match(content, /class="sr-only">: /);
    names.add(content);
  }
  assert.equal(names.size, 6);
});

test('Contact keeps inline WhatsApp access without a floating form obstruction', () => {
  const contact = read('dist/contact.html');
  assert.ok(!contact.includes('class="whatsapp-button"'));
  assert.ok(contact.includes('Send via WhatsApp'));
  assert.ok(contact.includes('Chat on WhatsApp'));
  assert.ok(read('dist/index.html').includes('class="whatsapp-button"'));
});

test('all service pages carry correct enquiry preselection and specific content', () => {
  assert.equal(serviceDetails.length, 10);
  const overviews = new Set();
  for (const service of serviceDetails) {
    const html = read(output(`/services/${service.slug}`));
    assert.ok(!overviews.has(service.overview)); overviews.add(service.overview);
    assert.ok(html.includes('Common use cases'));
    assert.ok(html.includes('Features &amp; deliverables'));
    assert.ok(html.includes('Who this is for'));
    assert.ok(html.includes(service.cta || 'Enquire Now'));
    for (const [,href] of html.matchAll(/href="(\/contact\?service=[^"]+)"/g)) {
      const url = new URL(decode(href), origin);
      assert.equal(enquiryContext(url.search).service, service.enquiry);
    }
    assert.equal(enquiryContext(`?service=${service.slug}`).service, service.enquiry);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.equal(graph.filter(node => node['@type'] === 'Service').length, 1);
    assert.equal(graph.find(node => node['@type'] === 'BreadcrumbList').itemListElement.length, 3);
  }
});

test('solution studies disclose missing implementation evidence and do not invent a stack', () => {
  for (const project of projects) {
    const html = read(output(`/portfolio/${project.slug}`));
    assert.ok(html.includes('Implemented features have not been verified'));
    assert.ok(html.includes('application technology stack has not been verified'));
    assert.ok(html.includes('not a delivered-client case study'));
    assert.ok(html.includes('Genuine application screenshots'));
  }
});

test('Insights articles are prerendered with Article schema and actionable related-service links', () => {
  assert.equal(insights.length, 3);
  for (const article of insights) {
    const html = read(output(`/insights/${article.slug}`));
    assert.ok(html.includes(`href="/services/${article.relatedService}"`));
    for (let index = 0; index < article.sections.length; index++) assert.ok(html.includes(`id="section-${index+1}"`));
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const node = graph.find(item => item['@type'] === 'Article');
    assert.equal(node.headline, article.title);
    assert.ok(!node.datePublished);
  }
});

test('legal pages are labelled as review drafts and excluded from indexing', () => {
  for (const path of ['/privacy-policy', '/terms-of-service']) {
    const html = read(output(path));
    assert.ok(html.includes('business and legal review required'));
    assert.ok(html.includes('Approval checklist'));
    assert.ok(html.includes('content="noindex,follow"'));
  }
});
