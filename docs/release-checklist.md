# Exoite IT Services: release checklist

Prepared 18 November 2026. **Nothing has been committed, pushed or deployed.** Vercel DNS, domains and hostname redirects are unchanged.

## Status: ready for Preview deployment. Production waits on owner approvals.

There are no technical blockers. The open items below are business and legal decisions.

## Pre-deployment fixes made in this pass

| Item | Fix |
|---|---|
| Hero label "From idea to everyday impact" was 11px on phones | Now 12px (one mobile rule in `src/styles/homepage.css`). Hero layout, animation and components are unchanged. |
| Portfolio concept labels were ~7px on phones and tablets | Added phone/tablet versions of the three concept SVGs: the same composition and colours at 600×375 (still 8:5), with every label ≥22px. They are served through `<picture>` at ≤1100px. Smallest rendered label is now ~12px at 360px (13px at 390px; 17–19px at 1024px); desktop is unchanged. On phones, where there is no hover zoom, the art uses the full width. |

## Content verification

**Portfolio is clearly illustrative and makes no invented results.**
- Every visual has the caption "Illustrative concept, not a verified application screenshot" (3 on the homepage, 3 on Portfolio, 1 per case study).
- Each SVG title/description reads "Not a client screenshot or a performance claim"; the "UI concept" tag is visible in the art.
- Section copy reads "Not completed client projects".
- A scan found no percentages, user counts or client/result phrases. The only numeric hits were URL encoding (`%20`).
- The unit test now also checks the new phone SVGs for metrics and the 8:5 ratio.

**Social platform status is accurate.**
- "In Development" appears on the homepage (2×), Products (5×), About and Portfolio/footer.
- Every price/availability phrase found was a disclaimer ("Not publicly launched", "pricing and availability are not confirmed", "No release date or pricing promised").

**Legal pages are not treated as approved.**
- `/privacy-policy` and `/terms-of-service` show "Draft — business and legal review required".
- They have no effective date, contain inline "Approval needed" items, carry `noindex,follow`, are excluded from the sitemap, and are labelled "(draft)" in the footer.

## Company details: consistent, but owner confirmation needed

| Detail | Where | Status |
|---|---|---|
| Email `contact@exoiteitservices.com` | Footer, Contact, legal pages, structured data | Consistent |
| Phone / WhatsApp `+91 6394732841` | Footer, Contact, WhatsApp links, structured data (all from `siteConfig`) | Consistent. **Confirm the number.** It is displayed unspaced (`+916394732841`); consider `+91 63947 32841`. |
| Location: Kanpur, Uttar Pradesh, India | Hero, About, Contact, FAQ, footer, SEO, structured data | Consistent (short form "Kanpur, India" on some pages) |
| **"MSME registered"** | Company intro, footer, homepage SEO description | **Confirm the registration** (no Udyam number is shown, which is fine; the claim itself must be true) |
| Tagline | "Empowering Digital Future" (meta and structured data) vs "Empowering your digital future" (footer and About) | **Choose one wording.** Minor inconsistency. |
| "Working remotely across India and internationally" | Contact, About, FAQ, SEO | Confirm it is accurate |
| Web3Forms `access_key` in `src/data/enquiry.js` | Contact form | A public client key by design; already in the committed history. Not a secret, and left unchanged. |

## Files ready for release

All tracked modifications plus the untracked site source. The diff contains no secrets, no `.env` files and no unrelated changes.
- **Modified (45):** pages, sections, layout, data, styles, `index.html`, `public/sitemap.xml` (+4 AI service routes), `vercel.json` (the same 4 routes added to the existing route lists; the committed www → root rule is untouched), and test scripts.
- **New site source:**
  - `src/components/**` (AI feature, workflow, hero motion, service art, etc.)
  - `src/data/aiServices.js`, `src/data/visualContent.js`
  - `src/hooks/useSectionReveals.js`
  - `src/styles/*.css` (11 new stylesheets)
  - `src/assets/fonts/*.woff2` and `public/font-licenses/*` (OFL licences)
  - `src/assets/images/concepts/*.svg`, `src/assets/images/optimized/*.webp`
- **New tests and docs:** `scripts/*.test.mjs`, `scripts/*.browser.mjs`, `scripts/audit-images.mjs`, `scripts/browser-network.mjs`, `scripts/final-readiness.capture.mjs`, `docs/*.md`.

**Do not commit:**
- `artifacts/`: 569 MB of QA screenshots and ZIPs.
- `.qa-tools/`: local Playwright install and scratch scripts.

Neither is ignored yet, so do not use `git add .` or `git add -A`.

## Verification (this pass)

| Check | Result |
|---|---|
| `npm run build` | Passed (26 routes prerendered + 404) |
| `npm run lint` | Passed |
| `npm test` | **82 / 82** |
| Mobile art and label check (360/390/768/1024/1440 × home, Portfolio, case study) | 15 / 15: correct source per width, 8:5 kept, labels ~12px or more, hero label ≥12px |
| Critical regressions (360–1920, menu, WhatsApp float, form privacy, tablet email) | **129 / 129** |
| All routes × 360/390/768/1440 | 104 renders, **0 axe violations**, 0 console errors, 0 network failures |
| Homepage suite | **87 / 87** |
| Interactions and touch | **41 / 41** (one rerun after a navigation-timing flake in an unchanged Contact step) |

Test updates in this pass, with the intent of each check unchanged:
- `responsive-images.test.mjs` also covers the phone SVGs.
- `interaction-polish.browser.mjs` measures zoom against the stage via `closest('.image-stage')`, because the image now sits inside a `<picture>`.

## Outstanding owner approvals (before Production)

1. Privacy Policy and Terms of Service: approve final legal text and an effective date, or explicitly accept launching with the visible draft labels.
2. Confirm the MSME registration, phone number, remote/international service statement and preferred tagline.
3. Confirm the "In Development" positioning of the Exoite Social Media Platform.
4. Accept that the portfolio shows illustrative concepts, or supply genuine screenshots or demo URLs.
5. Give visual sign-off on the Preview deployment.

## Blockers

None technical. Production release is blocked only by owner approvals 1–5.

## Git commands (run when approved)

```bash
# 1. Work on a release branch, not main
git switch -c release/premium-website

# 2. Optional but recommended: stop QA output from ever being committed
printf '\n# Local QA evidence and tooling\nartifacts/\n.qa-tools/\n' >> .gitignore

# 3. Stage only site source, tests and docs (never artifacts/ or .qa-tools/)
git add .gitignore index.html vercel.json public src scripts docs
git status --short            # confirm no artifacts/ or .qa-tools/ entries are staged

# 4. Commit
git commit -m "Premium website redesign, AI services, accessibility and production QA" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

# 5. Push the branch (creates a Vercel Preview if the GitHub integration is connected)
git push -u origin release/premium-website
```

The "LF will be replaced by CRLF" warnings are Windows line-ending notices and are harmless.

## Recommended Vercel Preview procedure

1. Push the release branch (above). With the Git integration, Vercel builds a **Preview** deployment for the branch. Production (`main` → exoiteitservices.com) is untouched. If the integration isn't connected, run `npx vercel` (not `--prod`) from the repo instead.
2. In the Vercel dashboard, confirm the Preview build ran `npm run build` and output `dist`, as configured in `vercel.json`.
3. On the Preview URL, check:
   - All 26 routes load on direct visit and refresh. Trailing-slash and `.html` URLs 308 to the clean path; an unknown URL shows the 404 page.
   - Mobile (real phone): menu, hero, Core Services, AI workflow, portfolio art legibility, WhatsApp float, Contact.
   - Contact form: send **one** real test enquiry and confirm it arrives in the Web3Forms inbox. Check the WhatsApp handoff.
   - `/privacy-policy` and `/terms-of-service` show the draft banners, if launching with drafts.
   - View source: canonical URLs point to `https://exoiteitservices.com/…`. Preview hosts are not indexed by Vercel by default.
4. Do **not** change domains, DNS or hostname redirects. The root domain stays connected directly to Production (the fix for the earlier redirect loop). The committed www → root rule in `vercel.json` is unchanged.
5. After owner approval: open a PR from `release/premium-website` into `main` and merge it, which triggers the Production deployment. Then verify `https://exoiteitservices.com` and `https://www.exoiteitservices.com` (expect a single 308 to the root, with no loop), one live contact enquiry, and the sitemap at `/sitemap.xml`.
6. Rollback: use Vercel's **Instant Rollback** to the previous Production deployment if anything regresses.
