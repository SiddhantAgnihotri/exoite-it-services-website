# Phase 2 — AI & Automation Solutions

Completed locally on 17 November 2026. Four dedicated services extend the existing shared service-route architecture and Phase 1 design system. The original 22 URLs are preserved; the site now has **26 content routes**, of which **24 are indexable**, plus separate 404 HTML. No push or deployment was performed.

## Services and discovery

| Service | Canonical path | Preselected enquiry |
| --- | --- | --- |
| AI Automation Systems | `/services/ai-automation` | AI Automation Systems |
| AI Chatbots & Virtual Assistants | `/services/ai-chatbots` | AI Chatbots & Virtual Assistants |
| AI Workflow Integration | `/services/ai-workflow-integration` | AI Workflow Integration |
| AI-Powered Business Software | `/services/ai-business-software` | AI-Powered Business Software |

The main **AI & Automation Solutions** category is discoverable at `/services#ai-automation-solutions`, with four service links and contextual enquiry links. The existing Services dropdown gains a dedicated third group; the top-level desktop navbar remains unchanged. Mobile navigation includes an AI & Automation entry, and the footer links to the category. Every new page links to the other AI services.

A standalone split homepage feature follows the primary services and precedes the solution studies. It uses a soft blue background, three capabilities, an AI Automation CTA and an original workflow concept. A restrained 4px hover lift is disabled for reduced motion.

## Content and visuals

The automation hero uses the requested headline, description and “Discuss Your Automation Project” CTA. Its content covers business challenges; seven potential use cases (lead qualification, enquiries, email follow-up, documents, reporting, internal knowledge and CRM); deliverables; custom workflow design; integration approaches; security/privacy; FAQs; and enquiry.

The chatbot page covers website, FAQ/knowledge-base, support, internal and enquiry-collection assistants, with human handoff, approved data sources and business-specific customisation. Integration and business-software pages explain API feasibility, permissions, deterministic rules, retry/recovery design, review responsibilities and provider costs without promising autonomous or error-free operation.

Every AI page labels examples as **potential solutions, not confirmed completed client projects**. There are no partnership badges, invented AI case studies, client logos, performance figures or delivery claims. Existing portfolio content remains unchanged.

The workflow pipeline, connected-workflow preview, chatbot conversation and business review dashboard are original **React/HTML/CSS with decorative SVG icons from the existing Lucide library**. Captions explicitly identify concepts. Their meaningful labels and ordered steps remain readable in prerendered HTML without JavaScript. There are no fake functional chat inputs or live model calls. These code-native visuals scale responsively without raster downloads or compression artifacts; WebP/AVIF conversion and image `srcset` are unnecessary for them. Existing raster asset optimisation remains unchanged.

Platform examples were checked against primary documentation: [OpenAI tools](https://developers.openai.com/api/docs/guides/tools), [OpenAI retrieval](https://developers.openai.com/api/docs/guides/retrieval) and [Gemini function calling](https://ai.google.dev/gemini-api/docs/function-calling). These support the technical examples, not a claim that any customer integration has been delivered. Project-specific provider terms, access, data settings and feasibility still determine scope.

## SEO, hosting and enquiry handling

- Page-specific metadata and canonical URLs derive from the existing SEO registry. Automation has a concise SEO description separate from its requested visible hero description. Homepage and service-index metadata now include AI services.
- Each new route has prerendered H1/content, Organization/WebSite/Service/BreadcrumbList JSON-LD, internal links and a sitemap entry. The service index exposes ten Service entries. Legal draft pages remain noindex and excluded.
- Both the public sitemap and generated sitemap agree. Vercel's explicit route rewrites and HTML-alias redirects include all four new URLs while preserving anchored matching, existing routes and the real-404 fallback.
- Contact options include the general category and all four specific services. Slugs and display names resolve correctly. All AI enquiry buttons preselect their service. Existing validation, POST safeguards, disabled-before-hydration privacy protection, duplicate-submit guard and provider/WhatsApp integration remain intact. No private AI credentials or SDKs were added.

## Verification results

**User story:** homepage/category/navigation → AI service page → selected service in Contact → mocked Web3Forms POST → success feedback and reset. This phase adds service information and illustrative interfaces; the only submission boundary is the existing contact integration.

| Check | Actual result |
| --- | --- |
| Production build and prerender | PASS — 26 routes plus 404 document |
| Lint | PASS — no errors or warnings |
| Automated tests | **79/79 PASS** — includes all existing regressions, eight added route checks and five AI-specific tests |
| Production browser matrix | **156/156 PASS** — all 26 routes at 360, 390, 768, 1024, 1440 and 1920px |
| Accessibility scans | **Zero axe violations** across 156 scans, using WCAG 2/2.1/2.2 A/AA tags |
| Layout/assets/runtime | Zero horizontal overflow, out-of-viewport elements, broken images, page/console errors or failed requests during the route matrix |
| AI journey suite | **102/102 PASS** — discovery, category links, keyboard FAQs, correct service preselection, mocked POST/success/reset, reduced-motion defaults and concept fit |
| Mocked AI enquiries | **24 intercepted POST submissions** — four services at six widths, all carrying the expected service; no real delivery |
| Existing interaction suite | **36/36 PASS** — now includes all ten service enquiries; validation, honeypot, duplicate prevention, provider failure paths, WhatsApp handoff, navigation, tabs, skip link and reduced motion |
| Prior blocker suite | **88/88 PASS** — no-JavaScript privacy, Training link names/keyboard semantics, computed contrast and no Contact floating overlap at 360/390/768/1440px |
| Hydrated metadata | **26/26 PASS** — exactly one expected title, description, canonical, robots tag and JSON-LD block |
| Initial SEO, sitemap, links, assets and fragments | PASS — repository tests inspect all generated documents and resolve internal targets |
| Vercel static route targets | PASS — all 26 direct targets exist; alias/unknown-route protections remain configured |
| Hover/reduced motion | Chrome reports `translateY(-4px)` on hover at 1024/1440/1920px; reduced motion reports `transform: none`, `transition-duration: 0s` |
| Whitespace check | `git diff --check` PASS |

Chrome **157.0.8103.78**, Playwright **1.65.1**, axe Playwright **4.14.0**, local production preview on port 4173. Route scans use 900px height and device scale factor 1. Screenshots were captured from actual rendered pages. Mobile section-detail screenshots use a taller viewport to show the complete feature; the six-width full-page route matrix retains the 900px benchmark.

Manual visual spot checks covered the automation page at 1440px, chatbot page at 390px, homepage feature at 1440px and 390px, and grouped Services menu at 1024px. Other captures received automated layout/accessibility checks, not individual manual review. React review found static, deterministic rendering with stable keys, no new effects/data-fetching state, no new runtime dependencies and no raw HTML injection.

## Files changed in Phase 2

- `src/data/aiServices.js` — four services, category, disclosure, integration and privacy content.
- `src/data/serviceDetails.js`, `src/data/enquiry.js`, `src/data/seo.js` — route/content registration, approved enquiry choices and SEO/schema integration.
- `src/components/ui/AIServiceVisual.jsx` — original responsive concept interfaces.
- `src/components/sections/AIAutomationFeature.jsx`, `AIServicesCategory.jsx`, `AIServiceConsiderations.jsx` — homepage feature, category and detailed content sections.
- `src/pages/Home.jsx`, `ServicesPage.jsx`, `ServiceDetail.jsx` — integrate the new content with existing templates.
- `src/components/layout/Navbar.jsx`, `Footer.jsx` — grouped discovery links.
- `src/styles/ai-services.css`, `src/index.css` — scoped presentation and import; Phase 1 foundations retained.
- `public/sitemap.xml`, `vercel.json` — four route additions.
- `scripts/ai-services.test.mjs`, `ai-services.browser.mjs`, `site.test.mjs`, `production-routes.browser.mjs` — AI regressions, dynamic service expectations and accurate route-count logging.
- This report and `artifacts/ai-services/` evidence. Existing Phase 1 worktree changes were retained separately; no root package manifest or lockfile changes were needed.

## Evidence and remaining limits

- [Screenshot gallery — 26 routes at six widths](../artifacts/ai-services/index.html)
- [Homepage AI feature, desktop](../artifacts/ai-services/home-ai-1440.png) and [mobile](../artifacts/ai-services/home-ai-390.png)
- [Automation page](../artifacts/ai-services/services--ai-automation-1440.png), [chatbot page](../artifacts/ai-services/services--ai-chatbots-390.png), [grouped navigation](../artifacts/ai-services/navigation-1024.png)
- [156 route scans and 36 interactions](../artifacts/ai-services/browser-results.json)
- [102 AI-flow checks](../artifacts/ai-services/ai-flows.json), [88 blocker regressions](../artifacts/ai-services/blocker-regressions.json), [26 hydrated metadata checks](../artifacts/ai-services/hydrated-metadata.json), [hover measurements](../artifacts/ai-services/visual-interactions.json)

Browser source snapshots are saved under `artifacts/ai-services/automation-source/`. Install isolated Playwright/axe dependencies in `.qa-tools`, start the production preview on port 4173, and run `scripts/ai-services.browser.mjs` to repeat the focused journey. Temporary QA tools were removed after testing and the owned preview server was stopped.

No confirmed blocker remains in the tested Phase 2 scope. Real provider delivery, real WhatsApp account/app behavior, live model integrations, Safari/Firefox, physical mobile devices and manual screen-reader use are unverified. Automated axe results are not a WCAG certification. Vercel runtime, DNS/TLS, deployed redirects/headers/caching and real hosted 404 responses require an authorised deployment check. None was performed.
