# Phase 1 — design system and layout refinement

Completed locally on 17 November 2026. The existing React/Vite/Tailwind architecture, all 22 routes, content, SEO data, prerendering and integrations are preserved. No push or deployment was performed.

## Design changes

The [audit](ui-ux-phase1-audit.md) identified undersized reading text, competing spacing rules, dense panels and weak transitions. The implementation retains the existing compositions and imagery while applying a consistent presentation system:

- Navy `#14213D`, blue `#2563EB` and white remain. Soft surfaces now use `#F8FAFC`, primary text `#0F172A`, muted text `#5F6F85` and dark-surface supporting text `#CBD5E1`. All tested text pairings satisfy normal-text AA contrast.
- Existing Plus Jakarta Sans and Inter remain; no new font requests or image dependencies were added. Hero headings range from 36px on narrow phones to 64px on wide screens. Hero descriptions use 16px mobile/18px tablet and desktop. Reading copy, labels, actions and metadata have clearer roles; compact illustrative dashboard typography intentionally stays separate.
- Content is bounded at 1280px. Horizontal gutters are 16–20px on phones, 32px on tablet/smaller desktop and 48px on desktop; wide displays center the bounded container. Shared section spacing is 64px mobile, 80px tablet and 104px desktop. Heading gaps are 32/40/48px. Cards use 24–32px internal padding, 12px radii and consistent grid gutters; buttons use an 8px radius and at least 50px height.
- Homepage rhythm: white hero, soft trust strip, white capabilities, soft solution studies, white industries, navy company feature, white product feature, soft process, white FAQ, soft Insights and navy CTA/footer. Composition and whitespace distinguish sections without enclosing every section in a card.
- Service panels have 24px separation, aligned actions and readable supporting content. Work studies retain their lead-and-supporting editorial structure. Product illustrations retain their additional colors. Image wrappers use consistent aspect ratios without cropping away illustrative content.
- Navbar links and CTA are larger, with clearer active states. The sticky header gains a subtle shadow after scrolling. Existing Services disclosure and mobile menu retain keyboard/Escape semantics; outside clicks dismiss open menus. The mobile panel scrolls within the available viewport and overlays the page without pushing its layout.
- Contact fields use consistent 16px input text, 14px labels, generous gaps and a single-column tablet layout. Disabled-until-hydrated POST privacy safeguards are unchanged. Contact continues to omit the floating WhatsApp control; phones at 700px and below also avoid floating overlays on other pages, with existing inline CTA/footer WhatsApp links available.
- About, service outcomes, program descriptions, article navigation, footer and legal notices receive the same reading scale. About's adjacent toolkit/process sections now have different backgrounds. No routes, content sections or features were added or removed.

## Actual verification

The production build was rendered in installed Chrome **157.0.8103.78** using Playwright **1.65.1** and axe Playwright **4.14.0**, against local Vite production preview. Every viewport was 900px high at device scale factor 1.

| Viewport width | Routes rendered | Layout/navigation | Hero H1 | Hero body | Main section padding | Container width |
| --- | --- | --- | --- | --- | --- | --- |
| 360px | 22/22 | 10/10 | 36px | 16px | 64px | 328px |
| 390px | 22/22 | 10/10 | 36px | 16px | 64px | 358px |
| 768px | 22/22 | 10/10 | 56px | 18px | 80px | 704px |
| 1024px | 22/22 | 10/10 | 52px | 18px | 104px | 960px |
| 1440px | 22/22 | 10/10 | 60.48px | 18px | 104px | 1280px |
| 1920px | 22/22 | 10/10 | 64px | 18px | 104px | 1280px |

- `npm run build`: **PASS**, 22 prerendered routes plus separate 404 HTML. Final built assets measure 376.57 kB JavaScript and 66.04 kB CSS, before compression.
- `npm run lint`: **PASS**, no warnings or errors.
- `npm test`: **66/66 PASS**, including initial HTML SEO, sitemap, internal links/assets/fragments, form privacy, label naming, text contrast and Vercel route-target checks. Palette assertions were updated to the requested tokens; contrast thresholds were preserved and extended to primary/dark supporting text.
- Route matrix: **132/132 PASS**. All 22 routes returned HTTP 200, expected titles/canonicals/robots and one H1 at every width. Zero broken images, horizontal document overflow, out-of-viewport elements, browser console/page errors or failed network requests.
- Axe WCAG 2/2.1/2.2 A/AA: **zero violations** across all 132 scans, including contrast and label-in-name. Computed token contrasts: muted/white **5.12:1**, muted/soft surface **4.90:1**, white/navy **15.97:1**, white/blue **5.17:1**, blue/soft surface **4.94:1**. Automated results do not certify full WCAG compliance.
- Layout/navigation: **60/60 PASS**. Checks include readable hero copy, button heights, bounded containers, loaded fonts, clipped reading text, navbar collisions, equal desktop service-panel heights, distinct section surfaces, mobile expanded state, outside-click dismissal, keyboard Services disclosure, Escape/focus return and sticky scroll shadow.
- Blocker regressions: **132/132 PASS** across all six widths. No-JavaScript controls remain disabled with a visible explanation. Clicking a disabled submit cannot navigate. Forced native submission uses POST with no URL query; disabled fields are omitted. Simulated script failure after enabling controls still keeps synthetic personal fields in the intercepted body. Training native names include the visible text and course purpose, with keyboard focus intact. Contact has no floating overlap and both inline WhatsApp actions retain comfortable touch targets.
- Existing interaction suite: **32/32 PASS**. Navigation, tabs, FAQ, all service-to-contact selections, validation, honeypot, loading, duplicate-submit prevention, success and failure states, WhatsApp handoff, skip link and reduced motion remain functional. Provider requests and popup destinations were mocked; no real enquiries or WhatsApp messages were sent.
- Hydrated metadata: **22/22 PASS**, one correct title, description, canonical, robots tag and JSON-LD block each. Indexable sitemap count remains 20; both legal drafts remain noindex and excluded.
- `git diff --check`: **PASS**. Hosting configuration and sitemap were not modified.

Homepage viewport captures were visually inspected at **all six widths**. Full homepage captures at 1440px and 390px were reviewed during iteration for section rhythm and density; the final matrix recaptured all pages after the follow-up typography refinements. The 390px mobile navigation and Contact viewport were also visually reviewed. Other route captures received structural and accessibility automation; they were not all manually reviewed.

## Files changed

| File | Purpose |
| --- | --- |
| `src/styles/design.css` | Shared palette, type, spacing, radius, container and control tokens |
| `src/styles/refinements.css` | Scoped component and responsive presentation after legacy responsive rules |
| `src/index.css` | Import the refinement layer |
| `src/components/layout/Navbar.jsx` | Scroll separation and outside-click dismissal with listener cleanup |
| `scripts/site.test.mjs` | Approved palette and expanded numerical contrast assertions |
| `scripts/ui-ux-phase1.browser.mjs` | Repeatable six-width layout/navigation checks and captures |
| `docs/ui-ux-phase1-audit.md` | Concise design audit |
| `docs/ui-ux-phase1-report.md` | This report |
| `artifacts/ui-ux-phase1/` | Browser screenshots, JSON evidence and automation source snapshots |

## Evidence

- [Screenshot gallery — all 22 routes at six widths](../artifacts/ui-ux-phase1/index.html)
- [Homepage 390px](../artifacts/ui-ux-phase1/home-390-viewport.png), [768px](../artifacts/ui-ux-phase1/home-768-viewport.png), [1440px](../artifacts/ui-ux-phase1/home-1440-viewport.png), [1920px](../artifacts/ui-ux-phase1/home-1920-viewport.png)
- [Full homepage](../artifacts/ui-ux-phase1/home-1440.png), [mobile navigation](../artifacts/ui-ux-phase1/navigation-390.png), [Contact](../artifacts/ui-ux-phase1/contact-390-viewport.png)
- [132 route scans and 32 interactions](../artifacts/ui-ux-phase1/browser-results.json)
- [60 layout/navigation checks and computed geometry](../artifacts/ui-ux-phase1/layout-navigation.json)
- [132 privacy, contrast, Training-name and overlap checks](../artifacts/ui-ux-phase1/blocker-regressions.json)
- [22 hydrated metadata checks](../artifacts/ui-ux-phase1/hydrated-metadata.json)

The optional browser tools were installed under `.qa-tools` without changing application manifests or lockfiles. Source snapshots for the six-width matrix, blocker suite, interactions and metadata checks are saved in `artifacts/ui-ux-phase1/automation-source/`. The permanent layout suite is `scripts/ui-ux-phase1.browser.mjs`. Install the same isolated Playwright/axe tools and start production preview on port 4173 to repeat these checks. Temporary QA dependencies and the preview server are removed/stopped after verification.

## Remaining limits and visual considerations

No confirmed overflow, clipped reading text, contrast, navigation-collision or Contact-overlap issue remains in the tested scope. The homepage deliberately retains its existing eleven sections and is still a long page. Illustrative dashboards and baked-in image lettering are concept visuals, not readable production application interfaces on a small phone; disclosures and full-size illustration links remain. The scoped refinement layer avoids rebuilding established page components; legacy style consolidation can be considered separately.

Chrome desktop emulation is not a real-device or Safari/Firefox test. No manual screen-reader session, formal CLS benchmark, load test, live enquiry delivery or real WhatsApp application/account verification was performed. Vercel runtime behavior, DNS/TLS, hosted redirects/headers/caching and deployed 404 responses remain unverified because deployment is out of scope. Existing legal drafts and illustrative portfolio evidence still require business review independently of Phase 1. No production readiness claim beyond these local checks is made.
