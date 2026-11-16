# Performance and verification report

Reference-driven visual phase: JS is **375.70 kB / 115.61 kB gzip**, CSS **52.73 kB / 10.92 kB gzip**. All 22 routes plus 404 build; lint and 62 tests pass. No runtime dependency was added. The UI now uses Plus Jakarta Sans headings and Inter body text; existing optimized images are reused. Browser screenshots and measured Core Web Vitals remain unavailable. See [premium redesign report](premium-redesign-report.md).

Company enhancement: 22 content documents plus 404 now build; all **61 tests** and lint pass. Final JS is **371.52 kB / 114.64 kB gzip**, CSS **45.97 kB / 9.53 kB gzip**. No runtime dependency was added. The content expansion adds approximately 14.68 kB gzipped JS. Browser/Lighthouse measurements remain unavailable; see [company enhancement report](company-enhancement-report.md).

Visual-correction update: the company hero now uses a responsive full-colour WebP (32.50 / 90.44 kB); no illustration assets were recoloured. Current JS is **320.80 kB / 99.96 kB gzip**, CSS **43.89 kB / 9.36 kB gzip**. Build, lint and **26 tests** pass. See [visual correction report](visual-correction-report.md) for image provenance and browser limitations.

Redesign update: final client JS is **319.17 kB / 99.52 kB gzip**, and CSS is **39.88 kB / 8.71 kB gzip**. Seven public routes plus 404 now prerender; lint and all **25 tests** pass. Direct local HTTP checks returned each of the seven corresponding page titles. Browser visual inspection was attempted but blocked by the computer-use tool's URL-verification failure. The original measurements below are retained as the audit baseline; see [redesign report](redesign-report.md) for current changes and limits.

Date: 16 November 2026. Measurements are local production artifacts, decimal kB. They are not Lighthouse or field performance scores.

## Measured changes

| Artifact | Baseline | Updated | Interpretation |
| --- | --- | --- | --- |
| Client JavaScript | 424.04 kB | 341.66 kB | About 19.5% less uncompressed JS |
| Client JavaScript gzip | 129.45 kB | 101.68 kB | About 21.5% less compressed JS |
| CSS | 38.56 kB / 7.76 kB gzip | 39.76 kB / 8.10 kB gzip | Small increase for accessibility and layout safeguards |
| Hero illustration, largest source | 1,742,630 bytes PNG | 89,028 bytes WebP | 94.9% smaller; 640px source is 32,150 bytes |
| Eleven referenced illustrations | 20,805,361 bytes PNG | 1,064,368 bytes at 1280px | 94.9% reduction; total 640px variants are 398,420 bytes |
| Initial page content | Empty React root | Rendered page HTML | Text and links can display before JavaScript loads |

Image totals compare corresponding source variants, not network transfers. A browser chooses sources using viewport, slot size and device pixel ratio; lazy images may never be requested. Both WebP variants are build assets. Original PNGs stay in source but are no longer imported into the production application. An unreferenced contact-support image was also converted for future reuse; it is not part of the eleven-image comparison.

## Implemented optimizations

- Generate WebP with sharp at quality 82 and widths 640/1280. Set `srcSet`, `sizes`, width/height and async decoding. Dimensions match the 1280×853 illustration outputs.
- Hero uses `fetchPriority="high"`; card/secondary illustrations use lazy loading. Logo dimensions reserve its slot. Existing fixed-height illustration containers remain to avoid layout shifts.
- Remove Framer Motion from simple entrances and from dependencies; retain responsive design and CSS hover transitions. No hidden-on-load marketing content and no animation-dependent rendering. Reduced-motion CSS disables smooth scrolling and decorative motion.
- Retain Google Fonts preconnect and Inter `display=swap`. Font self-hosting is an optional follow-up, requiring real font assets and license review.
- Vercel configuration caches content-hashed `/assets/` files for a year with `immutable`; HTML is not assigned immutable caching.
- Build-time rendering serves static documents; there is no per-request rendering server or hydration package added. Route splitting was considered but deferred to avoid fallback-only output with synchronous rendering; revisit if this marketing app grows.

## Checks executed

| Check | Result |
| --- | --- |
| Existing baseline build | Passed; recorded baseline JS/CSS/PNG sizes |
| Existing baseline lint | Failed: unused catch variable in Contact |
| Dependency installation/update | Completed successfully with workspace-local npm cache |
| Updated client + SSR + prerender build | Passed; six public routes plus 404 |
| ESLint | Passed |
| Node regression suite | 20 passing tests, no failures |
| Full npm dependency audit | Zero vulnerabilities after compatible updates |
| Internal routes, fragments and local assets | All checked references resolve in output |
| Initial HTML SEO | Six unique titles/descriptions/canonicals, one H1 each, sharing metadata and parseable JSON-LD |
| Sitemap and robots | Exactly six public canonicals; crawl allowed |
| Form tests | Valid/invalid input, context mapping and mocked success, HTTP/provider rejection, malformed JSON and network error |
| Whitespace diff check | Passed |

The dependency updater reported Windows locks while cleaning old native-module temporary directories. Installation completed and subsequent builds passed; these ignored local files are not production artifacts. npm initially could not use its default cache outside the writable workspace, so subsequent operations use `--cache .npm-cache`. The image social-card conversion reported unwritable external Fontconfig caches but produced a valid 1200×630 PNG.

## Unverified performance and behavior

The browser access host was unavailable. No Lighthouse score, LCP, INP, CLS, responsive screenshot result, browser console/hydration result or screen-reader pass is claimed here. Automated source/artifact checks do not establish WCAG conformance. Test the five specified widths in an approved preview. Use real user field data over time for INP and Core Web Vitals.

Actual Web3Forms delivery and WhatsApp handoff were not exercised; tests mock network submission to avoid sending enquiries. Dependency scans indicate known registry advisories only and do not guarantee application security. Vercel redirects, cache/security headers, direct-refresh status codes and domain/certificate settings require hosting verification. A read-only HTTP request confirmed the existing apex HTTP URL redirects to HTTPS with 308; Windows curl could not inspect HTTPS because its Schannel credentials were unavailable. No certificate validation was bypassed.

## Reproduce

```text
npm ci --cache .npm-cache
npm run build
npm run lint
npm test
npm audit --cache .npm-cache
```

Run `npm run images:optimize` only after changing original image sources; generated variants are checked in, so ordinary deployment builds do not need image conversion. Tests inspect `dist`; always build before `npm test`.
