# Deployment checklist

Company enhancement: use the [current 22-route inventory](company-enhancement-report.md) for release checks, including nested refresh, article anchors, the optional timeline and all six service preselection links. Review legal drafts before adoption; keep their noindex flags until approved. Current build/lint and 61 tests pass; mobile/browser review and real provider delivery remain pending.

Redesign update: include `/products` alongside the six original routes in every route, metadata, responsive and refresh check below. Check the illustrative Calendar/Content switch, native service/FAQ expansion and clear In Development disclosures. Current automated results: build/lint pass, 25 tests pass. Browser visual review remains pending because browser access and the native Chrome fallback were unavailable/blocked. See [redesign report](redesign-report.md).

Status: local implementation and automated checks pass. Production release remains conditional on browser and Vercel verification. Nothing has been pushed or deployed. Obtain the owner's explicit approval before either action.

## Review and setup

- [ ] Review the local diff and the other three reports. Confirm business contact details, training availability/durations and solution concept wording.
- [ ] Use a supported Node version: local verification used Node 22.17.0; keep Vercel on Node 22 or a version supported by the installed Vite release.
- [ ] From a clean checkout run `npm ci`, `npm run build`, `npm run lint`, `npm test`, `npm audit`. Use `--cache .npm-cache` for npm install/audit when filesystem permissions require it. The output directory must be `dist`; build command must include prerendering (`npm run build`).
- [ ] Inspect generated `/`, `/about`, `/services`, `/portfolio`, `/training`, `/contact` HTML. Do not deploy the intermediate client shell or `.prerender/` directory.
- [ ] Confirm Vercel has both apex and www domains attached and a valid certificate; preferred domain is apex HTTPS. Preserve Search Console verification and existing domain/mail DNS records.
- [ ] Confirm Web3Forms recipient is `contact@exoiteitservices.com`, access key remains active, domain restrictions are set if supported by the account, and spam monitoring is enabled. The key in the client is a public identifier, not a server secret.
- [ ] Ensure preview deployments are protected or receive preview-only noindex headers. Production must stay indexable.

## Preview checks after owner approves push/deployment

- [ ] Open each of the six routes directly, then refresh, navigate with the menu, and use back/forward. Verify each serves its own content and metadata before JS, then hydrates without console errors.
- [ ] Check apex HTTP to HTTPS, www to apex, trailing-slash and `.html` redirects (including query retention), and index.html to `/`. Confirm no loops. Do not redirect preview hostnames to production.
- [ ] Confirm a random nonexistent path and a missing asset return real HTTP 404, with the helpful noindex page where appropriate. `npm run preview` is Vite's local static preview, not a Vercel routing emulator; use the hosted preview for status assertions.
- [ ] Verify assets, fonts, social image, robots and sitemap return correct content types/statuses. Inspect security headers and immutable caching only on hashed assets.
- [ ] Validate JSON-LD with Schema.org Validator and Rich Results Test. General Organization/Service markup need not produce a rich result. Check sharing previews.
- [ ] At 360, 390, 768, 1024 and 1440px inspect every page for horizontal scrolling, long email wrapping, sticky header overlap, CTA alignment, cards and floating WhatsApp overlap.
- [ ] Test mobile menu open/close and Escape focus return, scroll its contents on a short viewport, activate each link, and verify `aria-expanded` updates.
- [ ] Navigate using Tab/Shift+Tab: skip link, menu, cards, form, footer and WhatsApp. Verify focus visibility, associated labels, error/success announcements and contrast. Check OS reduced-motion mode.
- [ ] Follow every service/solution card to the enquiry form and each training card to WhatsApp; verify relevant context and correct phone number.
- [ ] Try required blanks, whitespace-only messages, malformed email, phone letters/too few/too many digits, plus international formats. Submit a clearly marked owner-approved test enquiry and confirm inbox delivery. Do not treat a client success notification alone as proof of delivery.
- [ ] Rapidly press submit and verify one request, loading state, clear success, and no duplicate lead. Simulate offline/provider failure; verify fields remain and fallback WhatsApp works. A timeout may leave delivery uncertain: check inbox before retrying.
- [ ] Confirm mailto/tel links and WhatsApp launch correctly on phone and desktop.
- [ ] Run Lighthouse mobile and desktop on representative pages, record real scores and LCP/CLS. Inspect long tasks; monitor field INP after release. Do not infer scores from asset sizes.

## Analytics and privacy

- [ ] Publish an approved privacy policy with processing, retention and enquiry-provider details. Decide consent requirements before adding analytics.
- [ ] If enabling GA4, supply the real ID, use one loader, implement consent, avoid personal data/query strings, and test page views and successful lead/WhatsApp/CTA events as described in `seo-implementation.md`.

## Release and rollback

- [ ] Owner explicitly approves production deployment after preview checks pass.
- [ ] Keep the previous successful Vercel deployment available for immediate rollback. Deploy the reviewed commit and lockfile together.
- [ ] Repeat route refresh, 404, form and canonical checks on production. Verify sitemap/robots and request Search Console inspection; monitor indexing, form spam/delivery and Core Web Vitals.
- [ ] If hydration, routing or enquiries regress, roll back to the prior known-good deployment and investigate locally.

Primary risks are changed static route handling, dependency updates, and unverified browser hydration/provider delivery. No private server credentials, fabricated business proof or new analytics scripts are required for this release.
