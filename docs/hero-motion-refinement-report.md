# Homepage hero motion refinement — Task 1B

Reviewed locally on 18 November 2026. **Complete for owner review.** No push or deployment was performed.

## What changed

The homepage hero now uses an original vector composition instead of the photographic workspace. A website/app enquiry panel connects to a navy AI workflow card and a clearly separate human-review card. The illustration uses Exoite's existing navy, blue, white and gray, with a restrained green review indicator. It contains no dashboard metrics, invented client results or claims of autonomous AI performance.

The existing headline, supporting sentence, CTA labels/destinations, location line and service links are preserved. The desktop columns remain approximately 1:1.05 with a 56px gap. Tablet and mobile stack naturally, with 36px and 28px gaps respectively. The illustration rearranges its cards vertically on mobile; text is rendered at its intended size instead of shrinking a desktop screenshot.

Hero-only spacing and buttons were refined: 24px between heading and description on desktop, 22px on mobile, 52px minimum CTA height, a clearer secondary border and restrained primary shadow. No section outside the hero was redesigned.

## Motion

| Effect | Implementation |
| --- | --- |
| Entrance | One 600ms, 10px upward settle; content is visible before JavaScript runs |
| Source layer | 2px vertical float over 7 seconds |
| AI layer | 4px vertical float over 6.4 seconds |
| Connectors | A quiet blue dash signal advances over 5 seconds |
| CTA hover | 3px lift and 3px arrow movement; existing 220ms transition timing |
| User control | Native 44px “Pause motion” / “Play motion” button, operable by tap and keyboard |
| Reduced motion | All hero animation and transitions stop; the unnecessary motion control is hidden |
| Offscreen/background | IntersectionObserver and page visibility pause the loops; a user's pause choice persists |

No animation dependency was added. The artwork uses local JSX/CSS, inline SVG connection paths and the existing ISC-licensed Lucide icons. No image download, external asset, canvas or pointer-driven render loop is required. The visible disclosure is “Original workflow concept. Not client software.” The illustration has a concise accessible description.

## Actual verification results

Tests ran against the local production build at `http://127.0.0.1:4173`, using installed **Google Chrome 157.0.8103.79**, headless through Playwright. These were real browser renders, subsequently inspected as screenshots.

| Check | Result |
| --- | --- |
| `npm run build` | Passed, including SSR build and prerendering |
| `npm run lint` | Passed |
| `npm test` | **82 passed; 0 failed** |
| Focused hero browser suite | **89 checks passed; 0 failed; 0 page errors** |
| Existing interaction suite | **41 checks passed; 0 failed** |
| Existing critical regressions | **129 checks passed; 0 failed; 0 console errors** |
| Axe | Zero WCAG A/AA violations in three full-homepage reduced-motion scans and three animated-hero scans |
| Computed text contrast | 66 text checks across the three widths passed; lowest ratio **4.73:1** |
| Motion stability | Hero height remains identical while cards/connector animate; pause freezes their actual positions |
| Local layout shifts | No entries in the three initial-layout observations; existing interaction suite measured a sum of 0 |
| No JavaScript | Illustration, description and CTA links render from HTML; animation stays paused and inactive control is hidden/disabled |
| Navigation | Both hero CTAs navigate to their existing Contact and Services destinations |

The focused suite samples changing card transforms and connector offsets, then verifies frozen values after pausing. It also tests keyboard resume, live changes to reduced motion, offscreen pausing, persistence of a user's pause choice and the IntersectionObserver fallback. Existing regressions additionally cover 360px, 1024px and 1920px layouts and prior contact-form privacy protections. No real enquiry was sent.

Axe marked some contrast checks incomplete, including illustration headings during motion and existing workflow/SVG content elsewhere. Hero text was checked separately using actual computed foreground/background colors; all passed. This is a scoped hero review, not a claim of complete manual WCAG certification for the website.

Early QA captures exposed test-tool interference: disabling animation in Playwright can restart CSS animations through its animation API, and full-page capture can perturb viewport observers. Final live-motion checks run independently from screenshot contexts. The final passing results are in `browser-results.json`; earlier diagnostic runs are retained separately for transparency.

## Responsive review and comparison

| Width | Result |
| --- | --- |
| 390px | Full-width CTAs; readable vertical card flow; no card, label or text/image overlap; no horizontal overflow |
| 768px | Spacious stacked layout; two-card flow plus full-width review step; no clipping |
| 1440px | Balanced two-column layout; restrained floating depth; readable labels and clear CTA hierarchy |

The source snapshot proves **178 of 182 existing application/config/test files were unchanged**. Only the hero entry component and three affected test files were modified; the vector component, scoped stylesheet and focused browser suite were added. At each requested width, every subsequent homepage section has identical rendered DOM and height, and the footer and title/description/canonical metadata are unchanged. Contact code, service data, other pages, sitemap, package files and Vercel configuration were not edited.

## Changed files

- `src/components/sections/Hero.jsx` — selects the new visual and hero-only stylesheet.
- `src/components/ui/HeroMotionVisual.jsx` — original vector composition and accessible motion controls.
- `src/styles/hero-motion.css` — scoped layout, depth, buttons and motion rules.
- `scripts/site.test.mjs` — updates the superseded photo expectation to the new prerendered vector and disclosure.
- `scripts/interaction-polish.browser.mjs` — checks the new bounded core motion.
- `scripts/premium-visual-refinement.browser.mjs` — checks the new mobile vector semantics and readable labels.
- `scripts/hero-motion-refinement.browser.mjs` — focused responsive, motion, accessibility and scope verification.
- This report and generated evidence under `artifacts/hero-motion-refinement/`.

Previous artwork source files are retained, but the photo component and its images are no longer imported or requested by the hero. The old photographic browser audit is historical; the new focused suite verifies Task 1B.

## Screenshots and evidence

[Open the organized before/after gallery](../artifacts/hero-motion-refinement/index.html).

| View | Previous hero | Final vector hero | Reduced motion |
| --- | --- | --- | --- |
| 390px | [Before](../artifacts/hero-motion-refinement/before/hero-390.png) | [After](../artifacts/hero-motion-refinement/after/hero-390.png) | [Static](../artifacts/hero-motion-refinement/after/reduced-hero-390.png) |
| 768px | [Before](../artifacts/hero-motion-refinement/before/hero-768.png) | [After](../artifacts/hero-motion-refinement/after/hero-768.png) | [Static](../artifacts/hero-motion-refinement/after/reduced-hero-768.png) |
| 1440px | [Before](../artifacts/hero-motion-refinement/before/hero-1440.png) | [After](../artifacts/hero-motion-refinement/after/hero-1440.png) | [Static](../artifacts/hero-motion-refinement/after/reduced-hero-1440.png) |

Opening viewports, full-homepage renders, a desktop hover capture and a no-JavaScript capture are included. PNGs show actual rendered frames; animation behavior is evidenced by the sampled browser results rather than by static screenshots alone.

Evidence: [browser results](../artifacts/hero-motion-refinement/browser-results.json), [source scope](../artifacts/hero-motion-refinement/source-scope-verification.json), [build log](../artifacts/hero-motion-refinement/build.log), [lint log](../artifacts/hero-motion-refinement/lint.log), [test log](../artifacts/hero-motion-refinement/tests.log), [interaction regressions](../artifacts/hero-motion-refinement/regressions/interactions/interaction-results.json), [critical regressions](../artifacts/hero-motion-refinement/regressions/critical/critical-regressions.json).

No hero blocker remains in the performed checks. Owner approval of the visual direction and motion is the next step; release remains unapproved. Work stops here for review.
