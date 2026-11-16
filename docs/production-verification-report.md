# Production verification — four blocker fixes

Verified 17 November 2026. **All four confirmed production blockers are fixed. All requested local production checks pass.** No remaining blocker was found within the tested scope. The website is ready for deployment review; live hosting and delivery checks remain separate, unverified steps. No push or deployment was performed.

## Changes and regression evidence

| Issue | Fix | Actual verification |
| --- | --- | --- |
| Contact form privacy | The prerendered form uses POST with an explicit `/contact` action. A disabled fieldset keeps controls and submission inert until hydration attaches the existing JavaScript handler. A visible no-JavaScript explanation points to email, phone and inline WhatsApp options. | At all four widths, fields and submit are disabled without JavaScript; clicking the disabled button cannot navigate or submit. Forced native submissions use POST with an empty query string and omit disabled controls. A second test simulates script failure after controls are enabled: synthetic personal fields travel only in the intercepted POST body, never the URL. No enquiry is sent. |
| Text contrast | Shared muted text changed minimally from `#64748b` to `#5f6f85`; white, navy and blue tokens remain unchanged. | Chrome computed colors: muted/white **5.12:1**, muted/light gray **4.77:1**, white/navy **15.97:1**, white/blue **5.17:1**. All exceed 4.5:1. All 88 route/viewport axe scans report zero contrast violations. |
| Training link names | Removed the overriding `aria-label`. Each of six native links retains its visible “Enquire about this program” text and adds the course title in visually hidden text. Decorative arrows are hidden from accessibility APIs. | All six links at all four widths contain the complete visible text and course title in Chrome's accessibility tree. Native keyboard focus and Tab/Shift+Tab work. WhatsApp destinations retain the correct course context. No label-in-name violations. |
| Mobile WhatsApp overlap | The floating control is omitted on Contact, including query-based enquiries. The existing two inline WhatsApp actions remain. Other pages retain their existing floating control. | No floating control exists on Contact at 360, 390, 768 or 1440px, so it cannot cover any form input, label or action at any scroll position. Both inline actions measure **48px high**, with widths at least 156px. No horizontal overflow. |

The form's provider integration, validation, feedback, submitting guard and WhatsApp handoff remain intact. No credentials were added or changed. Personal information is not placed in the website's navigation URL by form submission. The intentional user-selected WhatsApp handoff still encodes enquiry context for WhatsApp, as before.

## Results

| Check | Result |
| --- | --- |
| `npm run build` | PASS — 22 prerendered routes plus separate 404 HTML |
| `npm run lint` | PASS — zero errors and warnings |
| `npm test` | PASS — **66/66** repository tests, including four new regression tests |
| Browser route matrix | PASS — **88/88 renders**, 22 routes × four widths |
| Focused blocker regression suite | PASS — **88/88 checks**, all four widths |
| Existing browser interactions | PASS — **32/32 checks** |
| Axe WCAG 2/2.1/2.2 A/AA scan | **0 violations** across all 88 renders; incomplete/manual checks retained in JSON |
| Hydrated SEO metadata | PASS — **22/22**, exactly one correct title, description, canonical, robots tag and JSON-LD block |
| Initial SEO HTML, sitemap, internal links/assets/fragments | PASS — repository tests; all 20 indexable routes in sitemap, two legal draft routes noindex and excluded |
| Broken images / horizontal document overflow | **0 / 0** across all 88 renders |
| Browser page/console errors / failed network requests | **0 / 0** during route matrix |
| `git diff --check` | PASS; Git emits existing LF/CRLF normalization advisories |

Chrome **157.0.8103.78**, Playwright **1.65.1**, axe Playwright **4.14.0** rendered the actual production build at `127.0.0.1:4173`. Viewports: **360×900, 390×900, 768×900, 1440×900**, device scale factor 1. Screenshots are real browser captures. There are **88 full-page route screenshots**, plus four Contact viewport and four no-JavaScript screenshots.

Manual visual spot checks covered Contact at 390px, the no-JavaScript Contact page at 360px, and Training at 390px. The remaining captures were checked structurally and by automation; they were not all individually visually reviewed. No page redesign was performed. The fieldset has reset border, padding and margin to preserve the existing layout.

The 32 interaction checks cover menu/disclosure focus behavior, navigation, product tabs, FAQ, all six service enquiry selections, empty/invalid/whitespace/phone validation, honeypot, loading and duplicate-submit protection, success resets, HTTP/provider/malformed-response/network failure handling, WhatsApp handoff, skip link and reduced motion. All provider calls and the WhatsApp popup were intercepted; no real enquiries or messages were sent.

## Files changed in this task

- `src/pages/Contact.jsx` — POST safeguard, hydration gate and no-JavaScript explanation.
- `src/components/layout/WhatsAppButton.jsx` — omit the floating control on Contact.
- `src/pages/Training.jsx` — native link names with hidden course context.
- `src/styles/design.css` — compliant muted token; fieldset reset and visually hidden utility.
- `scripts/site.test.mjs` — update approved token assertion; add contrast, prerendered privacy, Training-name and inline-WhatsApp regressions.
- `scripts/production-blockers.browser.mjs` — repeatable focused browser regressions.
- `scripts/production-routes.browser.mjs` — repeatable 22-route/four-width browser and accessibility matrix.
- `docs/production-verification-report.md` — this updated report.

Evidence was added under `artifacts/production-fixes/`. No root package manifest/lockfile, routing, SEO data, sitemap, provider configuration or Vercel configuration was changed by this task. Other worktree changes predate this task.

## Screenshots and raw evidence

- [All 22 routes at all four widths — screenshot gallery](../artifacts/production-fixes/index.html)
- [Contact at 390px — original overlap location](../artifacts/production-fixes/contact-390-viewport.png)
- [Contact without JavaScript at 360px](../artifacts/production-fixes/contact-no-javascript-360.png)
- [Training at 390px](../artifacts/production-fixes/training-390.png)
- [88 route scans and 32 interaction results](../artifacts/production-fixes/browser-results.json)
- [88 focused blocker checks](../artifacts/production-fixes/blocker-regressions.json)
- [Actual computed foreground/background contrast](../artifacts/production-fixes/computed-contrast.json)
- [All 22 hydrated metadata results](../artifacts/production-fixes/hydrated-metadata.json)

The initial focused harness incorrectly assumed six-digit CSS hex values and exact punctuation whitespace in accessibility names. Its raw results are preserved as `initial-harness-results.json`. The corrected harness accepts browser-normalized `#fff`, checks the visible label and course context, and passes all 88 checks. The initial unit run also caught the old palette whitelist, which was updated together with a numerical contrast regression. No application defect was waived to obtain a passing result.

## Repeating the browser regressions

Install isolated QA dependencies (no application dependency changes):

```powershell
npm.cmd install --prefix .qa-tools --no-save --package-lock=false playwright @axe-core/playwright --cache .npm-cache
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

In another terminal, from the project directory:

```powershell
node scripts/production-routes.browser.mjs
node scripts/production-blockers.browser.mjs
npm.cmd test
npm.cmd run lint
```

The focused suite supports `QA_CHROME_PATH`; the default is the installed Windows Chrome path used here. The route suite uses the same installed Chrome path. Temporary `.qa-tools` dependencies were removed after this verification. Screenshots and JSON remain available.

## Remaining verification limits

No remaining issue among the four confirmed blockers. Live Vercel build/runtime behavior, DNS/TLS, HTTPS/www redirects, deployed caching/headers, deep links and actual 404 responses were not tested because deployment was not authorized. Static build-output and Vercel route-target checks pass; hosting configuration is unchanged. Vite preview's unknown-route homepage fallback differs from Vercel's configured `/404.html` status-404 rule, as recorded in the earlier verification.

Live Web3Forms delivery and inbox receipt, the real WhatsApp application/account, Safari/Firefox, real mobile devices and assistive-technology sessions remain unverified. Accessibility-tree and automated axe checks are not a screen-reader usability audit or full WCAG certification. No performance/load benchmark or formal CLS measurement was performed. Existing legal pages remain labelled review drafts and noindex; business/legal approval and genuine portfolio evidence are content-review items outside these four fixes.
