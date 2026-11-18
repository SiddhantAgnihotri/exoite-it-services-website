# Homepage Core Services — layout refinement (Task 2A)

Completed locally on 18 November 2026. **Ready for owner review.** Nothing was committed, pushed or deployed. Existing uncommitted work was preserved; no files were reset or reverted.

## What changed

Only the homepage Core Services section changed. Copy, links, artwork, motion and the supporting "More ways we can help" links are the same as before; this is a layout change.

### Desktop and tablet (above 700px)

The previous desktop row was a three-column grid: **title | description + CTA | artwork**. At 1440px the title column was ~330px wide but held only a small index, an icon and a title, which left a large empty band on the left and separated each heading from its own description.

Each row is now **one text group beside the artwork**:

| Property | Before (1440px) | After (1440px) |
|---|---|---|
| Columns | `.9fr 1fr 1.5fr` (three) | `1fr 1.15fr` (two) |
| Column gap | 32px | `clamp(48px, 7vw, 104px)` — 101px at 1440 |
| Text group | Title and description in separate columns | Icon chip + index, title, description and CTA stacked on one left edge |
| Vertical alignment | Each column centred separately | Whole text group centred on the artwork, measured at **0.0px offset** for all four rows |
| Artwork | 536 × 280px | 631 × 280px (height cap unchanged) |
| Title size | 28px | 30px |
| Description width | 34ch | 38ch |
| Row padding | 32px | 28px |
| Row height | 345px | 337px |
| Section height | 1,892px | 1,860px (−32px) |

The centring uses the existing CSS grid: `grid-template-rows: 1fr auto auto 1fr` with named areas `". art" "title art" "copy art" ". art"`. The two `1fr` spacer rows share the leftover height equally, so the text group is centred whatever the description length. No wrapper element, flexbox layout or new layout system was introduced.

**Service icons** now sit in a 40px chip tinted to match each artwork: navy for AI Automation, blue-grey for Website, green for Custom Software and lavender for Mobile. This keeps the four services visually distinct before the artwork is seen. The icons remain `aria-hidden`.

**Responsive steps:**
- **1100px:** `1fr 1.2fr`, 48px gap, 27px titles. The old three-column override was replaced.
- **950px:** `.85fr 1.15fr`, 32px gap, 25px titles, 36px chip.
- Old per-element `grid-column`/`grid-row` placements in the 950px and 700px blocks were removed, because they would have overridden the grid areas.

### Mobile (700px and below)

The stacking order is unchanged: title, then description and CTA, then artwork. The title line is now **[icon chip] Title ··· 01**, with the index moved to the right edge and a 32px chip, which the previous mobile layout hid. **The section height is identical** to before: 2,347px at 390px and 2,272px at 360px.

### Code tidy-up

`Services.jsx`: the React hooks import was at the bottom of the file. It is now at the top with the other imports. There is no behaviour change.

## Section heights (reduced-motion settled render, 900px viewport)

| Width | Services before | Services after | Homepage before | Homepage after |
|---|---:|---:|---:|---:|
| 360 | 2,272 | 2,272 | 14,503 | 14,503 |
| 390 | 2,347 | 2,347 | 14,328 | 14,328 |
| 768 | 1,764 | 1,726 | 11,450 | 11,412 |
| 1024 | 1,744 | 1,855 | 9,939 | 10,050 |
| 1440 | 1,892 | 1,860 | 10,144 | 10,112 |
| 1920 | 1,892 | 1,860 | 10,144 | 10,112 |

At 1024px the section is 111px taller. In the old three-column grid, the artwork was squeezed to 391 × 244px. It now gets 497 × 280px, the same height as on desktop. This is a deliberate trade-off for legibility, not a spacing regression.

## Verification

Tests ran against the local production build at `http://127.0.0.1:4173`, in installed Google Chrome driven by Playwright from `.qa-tools`.

| Check | Result |
|---|---|
| `npm run build` | Passed: client, SSR and 26 prerendered routes plus 404 |
| `npm run lint` | Passed |
| `npm test` | **82 passed, 0 failed** |
| New focused suite `scripts/services-layout-refinement.browser.mjs after` | **213 checks passed, 0 failed, 0 page errors** |
| Critical regressions (`premium-visual-refinement.browser.mjs`) | **129 checks passed, 0 console errors** |
| Interaction regressions (`interaction-polish.browser.mjs`) | **41 checks passed**, local layout-shift sum 0 |
| Hero files | SHA-256 unchanged and identical to the values in the hero report |
| Source scope | 2 modified, 1 added, 186 other files unchanged |

The focused suite checks the following at 360, 390, 768, 1024, 1440 and 1920px:
- Services copy and links are identical to the before baseline.
- The hero and every other homepage section keep identical DOM and height, and the header, footer, SEO metadata and the `/services` page are unchanged.
- There is no horizontal overflow or clipped text, and computed text contrast passes AA.
- All four artworks are the same size, and rows share one height.
- Above 700px, the text group is centred on its artwork to within 2px (measured at 0.0px), and the artwork inset is equal above and below.
- On mobile, the stacking order is correct and the section is no taller than before.
- With reduced motion, no animation runs and the pause controls are hidden.
- Full-homepage axe scans at 390 and 1440px report zero A/AA violations.

With normal motion at 390, 768 and 1440px:
- **Animation:** the 500ms entrance runs once without layout change. The AI-node and phone floats stay bounded and advance. The chart reveal runs once.
- **Pause controls:** pause works by tap and click, and freezes the artwork. Keyboard Enter resumes it, with a 3px focus ring. Animation stops offscreen, and a user's pause persists after scrolling.
- **Hover and focus:** the 3px browser-layer hover on desktop still works. Rows stay static on hover, and the title link's hover colour still applies.
- **Links:** Tab moves from the title to Explore with a visible focus ring. Each Explore link is at least 44px tall and opens its service page. The supporting links are at least 44px tall.
- **Other checks:** the animated section has zero axe violations, and switching to reduced motion cancels all animation. Without JavaScript, all four illustrations and links are prerendered, nothing animates, and the pause controls are hidden.

The regression suites wrote their evidence into this task's folder so earlier evidence was not overwritten. The hero-only suite writes only to the hero evidence folder, so it was not rerun. Instead, the hero is covered by file hashes and by the identical-DOM-and-height check above.

Not tested: physical devices, Safari/Firefox, screen-reader software, and the public deployment.

## Remaining visual weaknesses

1. **Gap between text and artwork at 1440px and wider.** The text group is ~400px wide inside a 548px column, so roughly 250px of space sits before the artwork. It reads as intentional spacing, but a slightly wider artwork column would close it at the cost of taller artwork.
2. **1024px is taller (+111px)**, as explained above.
3. **The AI Automation artwork is visually heavier** than the other three because of its navy background. The navy chip echoes it, but it remains the strongest row. This is by design from the earlier artwork pass.
4. **The supporting-services row** ("More ways we can help") was left unchanged at desktop width. Its label column doesn't line up with the new two-column grid above it.
5. **Mobile rows** are still about 410–440px each, mostly from 16:10 artwork. Shorter artwork would clip the phone and workflow compositions, so it was left as is.

## Files

- `src/components/sections/Services.jsx` — import order only.
- `src/styles/services-motion.css` — row grid, text group, icon chips and responsive blocks. Artwork and motion rules are unchanged.
- `scripts/services-layout-refinement.browser.mjs` — new before/after layout and interaction suite.
- `artifacts/services-layout-refinement/`:
  - `before/`, `after/` — full homepage, Services crop and 1440/768/390 row crops, plus `observations.json`.
  - `browser-results-after.json`, `browser-after.log`, `regressions/`.
  - `build.log`, `lint.log`, `tests.log`.
  - `source-before.sha256`, `source-after.sha256`, `source-scope-verification.json`.

To rerun: `npm run build`, start `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`, then run `node scripts/services-layout-refinement.browser.mjs after`.

---

# Task 2B — final layout polish (18 November 2026)

Two corrections only. Nothing was committed, pushed or deployed. Evidence is in `artifacts/services-layout-polish/`, and the review ZIP is `exoite-services-layout-polish.zip` (Services section before/after at 390 and 1440px).

## 1. Gap between text and artwork (above 1100px)

Measured from the actual end of the text to the artwork, the gap was **317–340px at 1440px**, larger than the ~250px estimated in 2A. The text content is only ~330px wide inside a 548px column.

| 1440px | Before | After |
|---|---|---|
| Columns / gap | `1fr 1.15fr` / 101px | `5fr 7fr` / `clamp(56px, 5vw, 72px)` = 72px |
| Visual text-to-art gap | 317–340px | **154–225px** |
| Artwork | 631 × 280 (2.25:1) | 705 × 300 (2.35:1); proportions kept, not cramped |
| Title / description | 30px / 16px, 38ch | 32px / 17px, 40ch |
| Row height | 337px | 357px |

The two longer descriptions (AI Automation, Custom Software) now fill one line, which narrows their gap to about 155px. Website and Mobile have shorter text, so their gap stays near 225px. 1024px and below keep the 2A proportions.

The rows and the supporting row read the same `--svc-cols` / `--svc-gap` variables, so they stay aligned at every breakpoint.

## 2. "More ways we can help" row (951px and above)

- The label sits in the text column as a 20px navy heading, aligned with the service titles above.
- The three links form a list in the artwork column, separated by hairlines that echo the service row dividers.
- Above 1100px, each item shows the title link (18px, 44px target, arrow beside the text) next to its description (14px, muted). From 951–1100px, the description sits under the title.
- The three links, their text and their destinations are unchanged.
- 950px and below (tablet and mobile) is unchanged.

## Heights

| Width | Services before | After |
|---|---:|---:|
| 360 / 390 | 2,272 / 2,347 | unchanged |
| 768 | 1,726 | unchanged |
| 1024 | 1,855 | 1,973 (+118, supporting list) |
| 1440 / 1920 | 1,860 | 2,021 (+161: +80 rows, +93 supporting list) |

## Verification

- Build passed and lint passed. `npm test`: **82 / 82**.
- Focused suite (`QA_ARTIFACT_DIR=artifacts/services-layout-polish node scripts/services-layout-refinement.browser.mjs after`): **213 / 213**. It covers 360–1920px, including 390, 768, 1024 and 1440. The checks are the same as in 2A, compared against a fresh 2B baseline, including identical copy and links.
- Critical regressions: **129 / 129**, 0 console errors. Interactions: **41 / 41**, layout shift 0.
- Source hashes since 2A: only `src/styles/services-motion.css` and the suite (which now accepts an output folder) changed. The hero hashes are unchanged.

## Remaining weaknesses

- The desktop section is 161px taller than after 2A, from the larger artwork and the three-line list.
- Website and Mobile still have a ~225px gap because their text is short. Closing it further would need a wider artwork (and taller rows) or longer copy.
- The space below the label in the left column is intentionally empty.
