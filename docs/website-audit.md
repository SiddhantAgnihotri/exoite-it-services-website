# Exoite IT Services website audit

Follow-up: the [premium minimal redesign](redesign-report.md) adds `/products` and updates all active layouts. This document retains the original audit baseline; the redesign report gives the current file inventory, seven-route verification and browser limitations.

Audit date: 16 November 2026. Scope: the existing local React/Vite application, all six pages, every section/layout component, configuration, public assets, dependencies and enquiry integration. No push or deployment was performed.

## Baseline architecture

- React 19, React Router 7, Vite 8, Tailwind 4 through the Vite plugin, Lucide icons and Framer Motion. No backend, test suite, analytics or route metadata layer existed.
- `App.jsx` eagerly imported six marketing pages inside BrowserRouter. `main.jsx` mounted an empty root. `index.html` had one generic title and Inter with `display=swap`.
- Shared layout: fixed navigation, footer, floating WhatsApp button. Home already contained hero, services, solutions, industries, process, technologies, FAQ and CTA. About already had mission, vision and approach; Training already had program cards.
- Web3Forms JSON endpoint and a public access key were already in use. WhatsApp number: +916394732841. Both are preserved.
- `robots.txt` allowed crawling and the existing sitemap already listed all six pages. The Vercel catch-all returned the homepage shell for all paths, including nonexistent pages.
- Eleven referenced PNG illustrations totalled 20,805,361 bytes. Baseline JS: 424.04 kB / 129.45 kB gzip; CSS: 38.56 kB / 7.76 kB gzip.

## Findings and disposition

### Critical

No confirmed critical vulnerability, exposed private server credential, or completely broken production form was established. Live inbox delivery was not tested. This is a source review and dependency scan, not a penetration test.

### High priority

| Location | Finding and impact | Fix / disposition |
| --- | --- | --- |
| `index.html`, `src/main.jsx`, `src/App.jsx` | Initial responses contained no business content, headings or internal links; all pages shared a generic title. Crawlers and social scrapers had to rely on JavaScript. | Build-time rendering for all six pages; hydration retains interactions. Unique metadata and JSON-LD are present in actual output HTML. |
| `vercel.json`, routing | Unrestricted SPA rewrite produced empty/soft 404 responses with no helpful unknown-route page. | Explicit marketing-route targets, static-file handling, noindex 404 document and HTTP 404 fallback; add React wildcard page. Hosting behavior still requires a Vercel preview check. |
| Dependency lockfile | Initial production audit reported eight high-severity package findings, including React Router, Vite and source-map/PostCSS chains. Build tooling was included among production dependencies. | Compatible updates within existing version ranges. Final full `npm audit`: zero findings. No forced major migration. |
| `Contact.jsx` | Form labels were not associated; phone and whitespace-only content lacked meaningful validation; rapid requests had no synchronous duplicate guard. | Associate IDs/labels, autocomplete, limits, phone/email/content checks, loading state, ref guard, honeypot, timeout, HTTP/provider checks, focusable live feedback. |
| `src/assets/images`, image consumers | Referenced illustrations were 1.4–2.3 MB each without responsive sources or lazy loading. Large image payloads competed with useful content. | Generate 640/1280 WebP versions, responsive sources, dimensions, lazy below-fold loading and high-priority hero. Originals preserved. |
| `Navbar.jsx` | Branding introduced a second H1; mobile toggle lacked expanded/control state and Escape handling. | Brand text is a paragraph, toggle exposes state and controls, Escape returns focus, mobile panel has bounded scrolling. |

### Medium priority

| Location | Finding and impact | Fix / disposition |
| --- | --- | --- |
| Service/solution cards | `#contact` scrolled to a generic WhatsApp CTA rather than a service-specific enquiry. | Link to `/contact?service=…` or `?solution=…`, select relevant service and prefill solution message after hydration. |
| `Training.jsx` | All program enquiries used a generic WhatsApp message. | Course-specific WhatsApp context, preserving the existing number. |
| `FeaturedSolutions.jsx`, `Portfolio.jsx`, `About.jsx`, unused `Stats.jsx` | Concepts could appear to be delivered products; five demo solutions were claimed although only three are shown. | Clearly label concepts as demonstrations, avoid completed-client claims, reflect three concepts and six service categories, replace percentage claim with “Tailored.” |
| Unused `Testimonials.jsx` | Placeholder “Demo Client” quotes could accidentally be published later. | Retain a documented null component; fabricated quotes removed. No reviews added. |
| `Contact.jsx` | Unverified “usually within 24 hours” expectation. | Replace with a factual description of enquiry review. |
| Motion components, `index.css` | Content started invisible; entrances added JS and CSS animations ignored reduced-motion preferences. | Remove simple Framer Motion entrances and package. Keep CSS hover polish; disable animations/transitions and smooth scrolling for reduced motion. |
| Layout/CSS | No skip link; narrow flex/grid children and long email could overflow; cyan/white and green/white controls needed stronger contrast. | Skip link, grid/flex minimum-width safeguards, email wrapping, darker primary gradient/text and WhatsApp background, existing focus ring retained. Visual contrast audit remains manual. |
| Footer/contact cards | Contact and service text were not actionable. | Add mailto, tel and internal service/training links. Add an enquiry CTA alongside WhatsApp. |
| `.gitignore` | Generic `.env` files were not explicitly protected. | Ignore environment files, retain optional example exception; ignore npm cache and temporary SSR build. No private credential was added. |
| `vercel.json` | Canonical host/slash policy and baseline response security headers were unspecified. | www, trailing slash and public `.html` redirects; security headers and immutable hashed-asset cache policy. Vercel manages HTTPS; verify domain settings manually. |
| `Contact.jsx`, lint | Existing unused catch binding failed lint. | Resolve binding and run the full lint check successfully. |

### Optional improvements / remaining work

- Browser host reported unavailable. No verified screenshots, hydration-console inspection, keyboard walkthrough, contrast measurements or responsive results at 360, 390, 768, 1024 and 1440px are claimed. Run the deployment checklist before production.
- Lighthouse and field LCP/INP/CLS were not measured; byte reductions do not establish Core Web Vitals scores.
- Route code splitting was considered. The remaining shared client is approximately 341 kB uncompressed. Keep synchronous rendering for this small static marketing site for now; naive `React.lazy` plus `renderToString` would produce fallback content. Consider streaming/static-aware splitting if future features grow the bundle.
- Keep original PNGs as editable sources; generated WebP files are committed build inputs. Consider self-hosting licensed Inter font files later to remove the external font request.
- Confirm course durations, availability and delivery arrangements before promoting a course. Existing durations were retained; no price or new schedule was invented.
- Obtain approved real product screenshots, detailed case studies and customer testimonials before publishing claims. The workspace illustration is now explicitly described as an illustration.
- Provider-side domain restrictions and spam monitoring remain account setup. A client honeypot and validation cannot prevent direct API abuse. Add a provider-supported challenge if actual abuse warrants it.
- Publish a reviewed privacy policy describing enquiry retention, providers and any future analytics. The contact form currently explains enquiry use and Web3Forms processing.
- GA4 is absent; implementation and consent plan is in `seo-implementation.md`. No measurement ID or tracking script was invented.

## Implemented file inventory

- Routing/rendering: `src/App.jsx`, `src/main.jsx`, new `src/entry-server.jsx`, `src/pages/NotFound.jsx`, `scripts/prerender.mjs`, `index.html`, `vercel.json`.
- SEO: new `src/data/seo.js`, `src/components/SEO.jsx`, `public/social-card.png`; build generates a sitemap from the route metadata. Existing `public/robots.txt` and source sitemap retained.
- Enquiries: `src/pages/Contact.jsx`, new `src/data/enquiry.js`, `src/data/siteConfig.js`.
- Layout/conversion: `Navbar.jsx`, `Footer.jsx`, `WhatsAppButton.jsx`, `CTA.jsx`, `Services.jsx`, `FeaturedSolutions.jsx`, `Hero.jsx`, `Process.jsx`, `Stats.jsx`, `Testimonials.jsx`, `About.jsx`, `Portfolio.jsx`, `Training.jsx`, `src/index.css`.
- Assets/tooling: new `src/assets/images/optimized/*`, `scripts/optimize-images.mjs`, `scripts/enquiry.test.mjs`, `scripts/site.test.mjs`; `package.json`, `package-lock.json`, `.gitignore`, `eslint.config.js`, project README and these four reports.
- Existing logo, favicon, primary blue/navy palette, six routes, content structure and provider integrations remain in use. No project source files deleted.

## Verification and release assessment

Production client build, SSR build and seven generated documents succeed. Lint passes. All 20 Node tests pass: metadata/content/schema for six pages, link/asset/fragment checks, sitemap/robots, routing targets, labels, validation and mocked provider outcomes. Full dependency audit reports zero vulnerabilities.

Submission tests use an injected mock fetch and do not send email. Actual Web3Forms inbox delivery, WhatsApp handoff, browser hydration and Vercel HTTP redirects/statuses remain unverified. The changes are ready for review and a controlled Vercel preview after approval; production readiness is conditional on completing those checks. No push or deployment has occurred.
