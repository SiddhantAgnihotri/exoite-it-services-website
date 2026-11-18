# Phase 3 — imagery and interaction polish

Completed locally on 17 November 2026. The 26 routes, Phase 1 design system, Phase 2 AI services, SEO, contact privacy protections and integrations remain intact. No push or deployment was performed.

## Interaction improvements

- Service/program cards lift 4px; portfolio and article compositions lift 3px. Buttons/CTAs lift 3px, with small arrow movement, gentle shadows and border/background feedback. Product previews lift 4px; industry disclosures gain a soft background. Hover transitions are 180–280ms and apply to fine pointers, with no content or controls hidden behind hover.
- Keyboard targets have clear three-pixel focus rings. Card groups receive a focus-within outline, with appropriate light focus colors on dark surfaces. Native links, controls and details/summary semantics remain; no synthetic clickable cards or extra tab stops were introduced.
- A single IntersectionObserver enhances major section containers with a 12px upward settle over 420ms. Each target is unobserved on entry. Paragraphs are not animated individually. Text remains at full opacity and contrast throughout, and prerendered HTML is visible before JavaScript. Forms and long-form reading are excluded.
- Focus cancels a moving section immediately. Route changes and motion-preference changes clean up observers/animations. Missing observer/animation APIs leave the site functional. Reduced motion removes transition movement, image zoom, hero entrance and section reveals.
- The hero gains layered frame shadows, a finite 6px/500ms entrance on larger screens and small independent hover movement in its software panels. There is no continuous floating loop, parallax, scroll-jacking, canvas/WebGL background or persistent will-change layer.

Framer Motion was **not installed** in this checkout. Native browser APIs meet this scope without adding a production animation dependency. Section colors, whitespace and varied compositions established in Phase 1 remain; new article artwork supplies a meaningful visual transition rather than random decoration.

## Asset audit and image improvements

The [machine-readable audit](../artifacts/interaction-polish/image-audit.json) inventories **68 on-disk image assets**, dimensions, bytes, hashes and source references. The new inline editorial SVGs are reviewed separately in browser captures.

| Finding | Action |
| --- | --- |
| Twelve large source PNGs total 22.54MB | Retained as source masters; they are not imported into the website. Runtime illustrations use WebP. |
| Portfolio concepts were repeated in three service heroes | Custom software, mobile app and school/institute pages now use their existing dedicated repository illustrations, with truthful illustrative captions and updated alt text. |
| No article artwork | Added original, lightweight SVG planning illustrations: website structure, institutional information and a capture/review/action workflow. Used on the Insights index and the lead homepage article; supporting articles retain an editorial text arrangement. |
| A 500px/59,691-byte logo was used at 42px | Added 84px and 168px WebP variants. The 84px mark is **7,318 bytes**, about **87.7% smaller**, while branding text remains live HTML. Header and footer share responsive variants. |
| Coarse two-size portfolio source sets | Added 320/960px WebP variants alongside 640/1280px, using the same quality-82 pipeline. Responsive descriptors are checked against real file dimensions. |
| Image ratio/cropping inconsistency | Hero remains approximately 16:10; portfolio stages now use 16:10 with reserved inset space and `object-fit: contain`; service illustrations use 4:3; editorial SVGs use 16:9. Zoom is 1.025 and stays inside the padded stage, preserving essential UI details. |
| Loading priorities | Main hero remains high priority. Service hero images are eager; below-fold portfolio images remain lazy. Width/height attributes and CSS aspect ratios reserve space. |
| External font dependency failed in this environment | Self-hosted the same Inter and Plus Jakarta Sans Latin variable faces, preloaded from fingerprinted Vite assets. Both fonts now load with **zero external resource requests** in the sampled delivery checks. |

The font files total **75,604 bytes** and come from Fontsource packages version **5.3.0** under SIL OFL 1.1. Complete [Inter](../public/font-licenses/Inter-OFL.txt) and [Plus Jakarta Sans](../public/font-licenses/Plus-Jakarta-Sans-OFL.txt) notices are included. New editorial artwork is original code-native SVG. No external stock photography or other companies' screenshots were copied.

The audit identifies the original logo and public favicon as identical source bytes; the favicon remains unchanged, including its existing role as the organisation logo URL. `public/icons.svg` is an unused dimensionless symbol sprite: Sharp cannot raster-inspect its header, so that metadata limitation is recorded rather than represented as a broken fetched image.

### Genuine assets still required

| Asset to supply | What is needed |
| --- | --- |
| Examify, Inventory and LMS | Approved screenshots from the actual applications, preferably 1920px-wide 16:10/16:9 captures, with private records anonymised; confirmed implementation scope and a real demo URL where available. Current artwork remains labelled as concepts. |
| Company/team imagery | Approved actual office/team photography if Exoite wants to replace the current disclosed workspace illustration. |
| Future AI case studies | Evidence and approved captures from a real implementation before any concept can be presented as client delivery. Current AI examples remain illustrative. |

Small baked-in UI lettering and sample figures in supplied illustrations are not verified application evidence. Compression or animation cannot replace missing genuine captures; no client work was fabricated to fill that gap.

## Actual verification

Chrome **157.0.8103.78**, Playwright **1.65.1**, axe Playwright **4.14.0**, local production preview. The route matrix uses 900px height and device scale factor 1. Separate touch contexts use device scale factor 2, touch input and mobile emulation.

| Check | Actual result |
| --- | --- |
| Production build/prerender | PASS — 26 content routes plus separate 404 HTML |
| Lint | PASS — no errors or warnings |
| Automated tests | **80/80 PASS**, including all previous regressions and a new check that every rendered srcset descriptor matches the decoded asset width |
| Browser route matrix | **156/156 route/layout checks PASS** — 26 routes at 360/390/768/1024/1440/1920px |
| Axe | **Zero violations** across 156 WCAG 2/2.1/2.2 A/AA scans |
| Runtime/layout | Zero page/console errors, broken displayed images, horizontal document overflow or out-of-viewport elements |
| Focused interaction suite | **41/41 PASS** — hover bounds/durations, image containment, focus outlines, keyboard cards/disclosures, product controls, section reveal/cancellation, reduced motion, touch, no-JavaScript visibility and missing-observer fallback |
| Touch checks | Menu, navigation, FAQ, service CTA/preselection and unobscured Contact controls pass at **360/390/768px** |
| Existing interaction suite | **36/36 PASS** — all ten service enquiries, validation, honeypot, duplicate guard, provider success/failure handling, WhatsApp handoff, navigation, tabs, skip link and reduced motion |
| Hydrated metadata | **26/26 PASS** — one correct title, description, canonical, robots tag and JSON-LD block each |
| Initial SEO/link checks | PASS — metadata, sitemap, internal links/assets/fragments and Vercel targets across generated HTML |
| Font/image delivery probe | Both actual font faces report `loaded` at 360/390/768/1440px, with no failed or external requests in those fresh contexts |
| Local layout stability | Measured non-input layout-shift sum **0** on the sampled local homepage interaction run; not a field Core Web Vitals certification |
| Whitespace | `git diff --check` PASS |

There were **seven `net::ERR_ABORTED` responsive WebP candidate requests** in the final matrix. Their raw records are retained. All displayed images decoded successfully; a fresh HTTP check returned **200** for each of the three affected asset URLs, and Sharp decoded every returned WebP. The shared QA validator now classifies only these proven local-image cancellations separately; **zero unresolved network failures remain**. Other request errors are not exempted.

The first pass exposed blocked Google Fonts requests and an image-stage sizing error. Both were corrected before the final results. Initial result JSON is retained alongside the final evidence. No accessibility or contrast threshold was weakened to obtain a pass.

### Performance scope

Final built JavaScript is **404.46kB** and CSS **78.40kB**, before compression, compared with Phase 2's 399.02kB/72.48kB. No production package manifest/lockfile changes or animation library were needed. The largest imported WebP is approximately 122.4kB. Responsive delivery selected the 8.4kB/320px hero image on 360/390px DPR-1 viewports, the 43.0kB/960px version at 768px and the 23.9kB/640px version at 1440px. These are measured local source selections, not claims about every device or real-world LCP.

Manual visual spot checks covered the final desktop hero/focus/hover state, the Insights index at 390px and the portfolio at 1440px. All other route captures received structural/accessibility automation; they were not all manually reviewed. All test submissions and WhatsApp destinations in the regression suite were intercepted, with no real enquiries/messages sent.

## Files changed in Phase 3

- `src/hooks/useSectionReveals.js`, `src/App.jsx` — lightweight reveal lifecycle and cleanup.
- `src/styles/interactions.css`, `fonts.css`, `src/index.css`, `index.html` — interaction rules, image stages, font faces and local preloads.
- `src/components/sections/Hero.jsx`, `InsightsPreview.jsx`, `src/pages/Insights.jsx` — hero asset selection and editorial presentation.
- `src/components/ui/ProjectVisual.jsx`, `ServiceVisual.jsx`, `EditorialVisual.jsx`, `src/data/projectImages.js` — reserved image frames, responsive sources, distinct service illustrations and original artwork.
- `src/components/layout/Navbar.jsx`, `Footer.jsx` — responsive brand-mark delivery.
- `src/assets/images/optimized/` — new 320/960px variants and brand marks; existing 640/1280px variants remain reproducible through the optimiser.
- `src/assets/fonts/`, `public/font-licenses/` — two local variable fonts and complete notices.
- `scripts/optimize-images.mjs`, `audit-images.mjs`, `responsive-images.test.mjs`, `interaction-polish.browser.mjs`, `browser-network.mjs`, `production-routes.browser.mjs` — asset generation/audit, regressions and explicit request-cancellation validation.
- This report and `artifacts/interaction-polish/` evidence. Earlier Phase 1/2 worktree changes were preserved.

## Evidence and limits

- [Screenshot gallery — all 26 routes at six widths](../artifacts/interaction-polish/index.html)
- [Hero hover/focus](../artifacts/interaction-polish/hero-hover-1440.png), [Insights mobile](../artifacts/interaction-polish/insights-390.png), [portfolio](../artifacts/interaction-polish/portfolio-1440.png), [touch Contact](../artifacts/interaction-polish/touch-contact-390.png)
- [Final route matrix and validated cancellations](../artifacts/interaction-polish/browser-results.json)
- [41 interaction checks](../artifacts/interaction-polish/interaction-results.json), [36 existing regressions](../artifacts/interaction-polish/existing-interactions.json), [26 metadata checks](../artifacts/interaction-polish/hydrated-metadata.json)
- [Asset inventory](../artifacts/interaction-polish/image-audit.json), [font and responsive-image delivery](../artifacts/interaction-polish/image-font-delivery.json)

Browser QA sources are archived under `artifacts/interaction-polish/automation-source/`. To repeat focused checks, install isolated Playwright/axe dependencies in `.qa-tools`, start production preview on port 4173, then run `node scripts/interaction-polish.browser.mjs`. `node scripts/audit-images.mjs` repeats the asset inventory. Temporary QA tools are removed and the owned preview server is stopped after verification.

No confirmed functional blocker remains in the tested Phase 3 scope. Missing genuine imagery is documented above. Safari/Firefox, physical devices, manual screen-reader usability, real enquiry delivery/WhatsApp account behavior, deployed Vercel responses and field performance remain unverified. No production push or deployment was attempted.
