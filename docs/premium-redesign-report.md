# Reference-driven premium redesign report

Implemented locally on 16 November 2026. This phase changes presentation and visitor flow, not the route/content feature set. No GitHub push or Vercel deployment was performed.

## References and creative direction

The [reference analysis and pre-implementation plan](reference-design-analysis.md) records all 14 requested official websites, useful patterns, Exoite adaptations and exclusions. Official homepage content was retrieved for every reference. Browser inventory reported the browser host unavailable, so no reference page was visually inspected. The user's supplied visual observations informed typography, spacing and composition; text retrieval confirmed content/navigation patterns where available.

The main influences are Netguru's capability/work hierarchy, Simform's clear engineering positioning, Thoughtworks' editorial composition, thoughtbot's contextual project storytelling and EPAM's emphasis on visual narrative. Industry/navigation/conversion patterns from the other nine references are documented individually. No external branding, logos, screenshots, imagery, client proof or design assets were copied.

Exoite's direction is **engineering, presented editorially**: a clear navy/white identity, precise blue highlights, deliberate asymmetry, useful interface artwork and a distinction between primary engineering services and supporting expertise.

## Major visual changes

### Shared system and navigation

- Consolidated successive CSS overrides into `design.css`, `sections.css`, `pages.css` and `responsive.css`, imported through the existing Tailwind/Vite stylesheet entry. Tokens, type, spacing and responsive behaviour now have defined owners.
- Introduced Plus Jakarta Sans for headings and retained Inter for body copy, using selected weights, existing Google Fonts preconnects, `display=swap` and system fallbacks. The soft surface is now the requested `#F5F7FA`; white/navy/blue remain the shared UI colours.
- Standardised the 1240px container, 32px desktop/20px phone gutters, moderate fluid headings, 4–10px corner treatment, restrained image-plane shadows and readable long-form widths.
- Reduced desktop navigation to a native Services disclosure plus Work, Products, Company and Insights, with a clear project CTA. All six service details are in the disclosure; the eight original top-level destinations remain in the mobile menu/footer. Home remains available through the logo. Native disclosure controls and Escape handling are retained.
- Footer styling is quieter and consistent with the closing navy section; services, product status, company, Insights, legal drafts and all contact routes remain accessible.

### Homepage

- Replaced the code-workspace hero with a contained interface composition using the existing Examify, Inventory and LMS artwork. The hero represents web, mobile and software services, never the upcoming social platform. Its images are explicitly illustrative. Primary and secondary project/service CTAs are unchanged in purpose.
- Established service hierarchy: a larger navy website-development panel, two complementary software/mobile panels, and a quieter row for education, marketing and training. This replaces six equally weighted accordion rows. Each service retains detail and enquiry paths.
- Replaced the equal work-card grid with an editorial lead study and two complementary stories. A reusable `WorkFeature` composes imagery, context, features and actions from existing project data.
- Changed industries from a wall of icon cards to an education-focused introduction and native disclosure rows. The text continues to describe potential use cases rather than prior clients.
- Consolidated the company introduction, credibility facts and a compact technology reference into one section. Removed the separate Why Choose Us and Technologies sections from the homepage composition; their components/content remain available on internal pages. Homepage section count is reduced from 13 to 11.
- Kept the product section lower on the page. Its preview now uses original code-native typographic content artwork in complementary blue, warm and lavender colours rather than neutral skeleton bars. Calendar/Content controls and illustrative/In Development disclosures remain. These are concept visuals, not product screenshots or claims of completed functionality.
- Reworked the process into Discover → Plan → Design → Develop → Test → Launch. Support is described as part of handover planning.
- Curated Insights as one lead guide and two supporting links, rather than another identical card grid.
- Created one final navy invitation, “Have a Project in Mind?”, with project enquiry, email and WhatsApp actions. No popup, autoplay carousel or intrusive sales flow was added.

### Internal pages

- `PageHero` supports an image slot and presentation variants. Engineering detail pages use relevant existing interface/workspace illustrations; school/training pages use an education-oriented treatment; digital marketing uses a text-led navy opening. Use-case layouts vary between columns, an education lead panel and editorial rows.
- Service detail text, deliverables, FAQs and enquiry values remain intact. Their closing invitation is a light inline composition, avoiding a large navy CTA on every service route.
- About uses a more balanced narrative/image split, stronger heading/body hierarchy, cleaner mission/vision sections and the original labelled workspace illustration.
- Portfolio uses the reusable editorial work composition and full-colour uncropped illustrations. Individual studies gain the same larger shared image/narrative treatment through shared styles and `ProjectVisual`.
- Products gains the refined colourful concept preview and more deliberate typography without changing its launch status, potential-capability wording or enquiry action.
- Training has an image-led opening, a featured Web Development program and compact secondary program presentation. Existing topics, learning focus and program-specific WhatsApp actions are retained.
- Contact gains a clearer form/aside balance, neutral field grouping, readable controls and smaller supporting details. Its state, provider identifier, submission module, validation, optional budget/timeline and fallback actions were not changed in this phase.
- Insights/articles have a 760px reading column, clearer long-form typography, functional contents links, related reading and the existing relevant service/enquiry actions.
- Legal review drafts inherit the type/reading improvements; they remain noindex and unapproved.

## Images and evidence

No new raster image was generated or downloaded. Existing optimized 640/1280 WebP assets are reused in their natural colours. There are no grayscale, zero-saturation or blend-mode restrictions in the design system. `object-fit: contain` and stable dimensions preserve complete project artwork.

| Visual | Current classification / use |
| --- | --- |
| Examify / examination portal | Existing promotional illustration; hero, work and education services |
| Inventory management | Existing promotional illustration; hero, work and custom software services |
| Learning management system | Existing promotional illustration; hero, work and cross-device service context |
| Web development workspace | Existing illustration; website service opening |
| IT training | Existing illustration; training and training-service openings |
| Team workspace | Existing illustration; About, explicitly not an office/team photograph |
| Social platform interface | Code-native illustrative concept; not a captured or launched product |

Genuine application screenshots, verified implementation/technology details and approved live/demo URLs for the three portfolio concepts remain missing. No client outcomes or project stacks were invented. `ProjectVisual`/`WorkFeature` can accept a future `project.visual` object with responsive assets, dimensions, alt text, caption and `kind: 'screenshot'`; that input must only be used after the underlying evidence is supplied. The current projects still use illustrative captions.

## Preserved technical coverage

- All **22 content routes** plus the noindex 404 remain prerendered. No route was removed or added.
- Unique metadata, canonicals, Open Graph/Twitter tags, Organization/Service/Article/Breadcrumb schema, robots instructions and Vercel configuration are retained.
- The **20 indexable routes** remain in the sitemap; privacy and terms drafts remain noindex and excluded pending approval.
- Service and solution enquiry context, required fields, phone/email validation, optional budget/timeline, spam honeypot, duplicate guard, timeout, loading/error/success states and WhatsApp fallback remain covered by tests.
- No production form submission, external message, dependency addition, framework migration, Git push or deployment occurred.

## Verification results

| Check | Result |
| --- | --- |
| Production client build | Pass |
| SSR build and static prerender | Pass: 22 pages plus 404 |
| ESLint | Pass |
| Automated regression suite | **62 pass**, zero failures |
| Metadata, canonical, one H1/main landmark, JSON-LD | Pass across generated routes |
| Internal routes, fragments, assets and full-size image links | Pass |
| Sitemap/robots and legal draft exclusion | Pass |
| Contact validation/provider responses and six service preselection values | Pass using mocks; no live enquiries sent |
| New presentation checks | Three primary services, service families, six process stages, one homepage closing CTA, labelled visuals and native menu/disclosures |
| Direct local HTTP requests | All 22 content routes return 200 with the corresponding canonical and robots metadata |
| Compiled stylesheet request | 200 from local preview |
| Whitespace diff check | Pass |
| Browser/mobile screenshots | Unavailable; not claimed |

Existing layout-specific tests were adapted to the intentional redesign: main landmarks allow class attributes, tokens are read from the new modular CSS, the surface colour matches the new brief, and service hierarchy replaces the previous six-accordion assumption. Functional, SEO and enquiry checks were retained. One additional presentation regression check brings the suite from 61 to 62.

Final client JavaScript is **375.70 kB / 115.61 kB gzip**; CSS is **52.73 kB / 10.92 kB gzip**. Compared with the preceding implementation, the compressed differences are approximately **+0.97 kB JS** and **+1.39 kB CSS**. Font and image transfer depends on the browser and pixel density; those values are not a Lighthouse/Core Web Vitals result. Shared interface imagery is reused across sections, allowing the browser cache to reuse the same assets.

## Responsive verification and remaining blockers

The browser host remained unavailable. The earlier native Chrome path had been blocked by the tool's inability to verify the browser URL; it was not retried as an alternate automation path. Reference pages and the redesigned Exoite pages were not rendered for visual inspection. **No 390px, 768px or 1440px screenshots or visual pass are available.** CSS/source/build checks do not establish pixel-level quality, lack of overflow, visual contrast or browser interaction correctness.

Responsive rules cover desktop, tablet and phone hierarchy: navigation switches to the labelled mobile menu, primary panels stack, work becomes image-first, paired sections become one column, the product sidebar collapses on small phones, the form fields stack and use 16px mobile inputs, and the footer reflows. There is no global horizontal-overflow hiding. These rules require actual browser review at the three requested widths before production.

Specific pending checks:

1. Inspect hero artwork legibility, heading wrapping and paired study images at 390/768/1440px.
2. Test Services disclosure, Escape focus, outside-menu expectations, mobile menu scrolling and route navigation with pointer and keyboard.
3. Check service-family use-case layouts, featured training row, product poster wrapping and full-colour work proportions.
4. Verify form feedback, service preselection, optional fields and WhatsApp handoff in-browser; send an owner-approved enquiry to confirm actual inbox delivery.
5. Confirm legal drafts and missing project evidence before adopting stronger claims. Verify Vercel redirects/statuses and measure actual Lighthouse/field performance only after an approved preview/release.

## Changed components and files

New:

- `docs/reference-design-analysis.md`
- `docs/premium-redesign-report.md`
- `src/styles/design.css`, `sections.css`, `pages.css`, `responsive.css`
- `src/components/ui/WorkFeature.jsx`
- `src/components/ui/ServiceVisual.jsx`

Updated:

- `index.html`, `src/index.css`
- `src/components/layout/Navbar.jsx`
- `src/components/ui/PageHero.jsx`, `ProjectVisual.jsx`, `SoftwarePreview.jsx`
- `src/components/sections/Hero.jsx`, `Services.jsx`, `FeaturedSolutions.jsx`, `Industries.jsx`, `CompanyIntro.jsx`, `ProductShowcase.jsx`, `Process.jsx`, `InsightsPreview.jsx`, `CTA.jsx`
- `src/pages/Home.jsx`, `About.jsx`, `ServicesPage.jsx`, `ServiceDetail.jsx`, `Portfolio.jsx`, `CaseStudy.jsx`, `Products.jsx`, `Training.jsx`, `Contact.jsx`, `InsightArticle.jsx`
- `scripts/site.test.mjs`
- `README.md`, `docs/performance-report.md`

Footer, trust strip, FAQ, reading/legal/index pages and other internal components receive the shared system without replacing their functional code. The form provider module/identifier, content/SEO route records, package manifest/lockfile, sitemap/robots, original assets and Vercel settings were not altered for this visual phase.

The implementation and automated verification are complete. Rendered design approval and the checks above remain outstanding; no production-ready visual certification is implied.
