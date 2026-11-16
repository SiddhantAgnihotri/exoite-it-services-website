# SEO implementation

Company enhancement: 22 content routes now prerender, including nested services, solution studies and Insights. Service and Article schema plus three-level breadcrumbs are included. The 20 indexable routes appear in the sitemap; privacy/terms review drafts carry noindex and are excluded pending approval. See [company enhancement report](company-enhancement-report.md) for the route list and current validation.

Redesign update: `/products` is now the seventh public marketing route, with unique title/description, canonical, sharing metadata, breadcrumb schema, prerendered HTML and sitemap/Vercel mappings. The in-development SaaS is explicitly labelled; no Product/Offer or availability claims were added. See [redesign report](redesign-report.md). References below to the original six-page build describe the pre-redesign implementation.

Date: 16 November 2026.

## Rendering and metadata

The original empty-root client application now produces static HTML at build time using Vite's SSR build and React `renderToString`. There is no production Node server and no framework migration. React Router's StaticRouter renders the same App used by BrowserRouter. The browser hydrates the existing markup; dev mode still uses `createRoot` for an empty shell.

`npm run build` runs the client build, builds `src/entry-server.jsx` into ignored `.prerender/`, then writes `dist/index.html`, five route HTML files and `dist/404.html`. `scripts/prerender.mjs` moves React 19's hoisted metadata/resource hints into the real document head. JSON-LD remains in the body, which is valid for JSON-LD. All marketing text, headings, navigation and schema are available without executing JavaScript. Client-side query context is applied after hydration to avoid server/client disagreement.

The shared `src/data/seo.js` owns the public route list, unique titles and descriptions. `SEO.jsx` emits title, description, canonical, robots, Open Graph and Twitter metadata using React 19's document metadata support. A 1200×630 social card supplies an absolute sharing-image URL without fictitious reviews or results. Client navigation renders metadata from the same source. Unknown pages are noindex and have no canonical.

| Public URL | Focus |
| --- | --- |
| `/` | Website/software development company in Kanpur; India and international service |
| `/about` | Company identity, MSME registration and approach |
| `/services` | Websites, mobile apps, custom software, school systems, LMS and marketing |
| `/portfolio` | Clearly identified software demonstration concepts |
| `/training` | IT training, coding and robotics workshops |
| `/contact` | Project enquiry and contact intent |

## Canonicals, discovery and status codes

- Preferred origin: `https://exoiteitservices.com`; homepage has `/`, other public canonicals omit trailing slashes. Enquiry query parameters are excluded from canonical URLs.
- Vercel maps known paths to their own HTML; avoids the previous catch-all homepage response. Unknown paths receive `404.html` with status 404.
- www, trailing slash, index.html and known `.html` aliases redirect permanently using 308. The www domain must be attached to the project with a valid certificate. HTTPS enforcement is a Vercel/domain setting, not inferred from source configuration.
- Existing robots instructions allow crawling and point to the preferred sitemap. The build regenerates sitemap.xml from the same public-route metadata. The 404 page is excluded. No invented last-modified dates.
- Service/solution enquiry links, footer links and navigation provide crawlable internal anchors. Regression checks resolve local links and hash targets against actual output files.

## Structured data

Every page has Organization and WebSite nodes; interior pages add BreadcrumbList; Services adds six Service nodes tied to the organization. Values are restricted to provided or existing business facts: company, tagline, canonical URL, public phone/email, Kanpur location and service area. No physical office address, business hours, reviews, rating, founding date, price, social profile or award was added.

ProfessionalService/LocalBusiness markup was evaluated but omitted: the confirmed locality does not establish a walk-in office or sufficient address details for local-business rich-result requirements. General Organization/Service markup avoids suggesting otherwise. No rich-result eligibility or ranking guarantee is claimed. JSON parsing and expected nodes are tested; use Schema.org Validator and Google's Rich Results Test on the approved preview for external validation.

## Analytics and privacy readiness

No existing GA4 script, gtag, GTM or measurement ID was found. No tracking script was added.

1. Owner creates/chooses one GA4 property and provides the real measurement ID. Choose either direct gtag or GTM, with one owner and a duplication check.
2. Decide applicable consent requirements and publish a privacy policy covering provider processing, purpose and retention. Where required, default analytics storage to denied and load/enable analytics only after consent. A plain environment flag is not a consent mechanism.
3. Track `generate_lead` only after confirmed Web3Forms success. Include service category and form location; exclude name, email, phone, budget, free-text message and full enquiry/WhatsApp URLs.
4. Track `whatsapp_click` and `cta_click` using a limited service/placement allowlist. Never send WhatsApp message query contents to analytics.
5. SPA page views: emit one on initial load and one per pathname change. Disable overlapping automatic history tracking if sending manual page views. Strip query strings; `?solution=` can contain arbitrary user text.
6. Use DebugView to verify one event per action, consent behavior and no personal information in payloads. Confirm failed/duplicate submissions never emit a lead event.
7. Retain existing Search Console ownership, resubmit `/sitemap.xml` after approved deployment, inspect all six URLs' live/rendered HTML and canonical selection, and monitor Page Indexing and Core Web Vitals. No Google Business Profile is asserted.

## Maintenance and sources

When adding a page, update the route table and SEO record, add the Vercel public-route mapping/alias redirect, and run build plus tests. Keep preview deployments noindex through Vercel's preview protection/header settings; do not ship a production-wide noindex directive.

Implementation references: [Vite SSR](https://vite.dev/guide/ssr), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Web3Forms public access keys](https://docs.web3forms.com/getting-started/faq), [Web3Forms installation and honeypot](https://docs.web3forms.com/getting-started/installation). External documentation informs configuration; actual output checks are recorded separately from unperformed browser/hosting validation.
