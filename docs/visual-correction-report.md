# Visual design correction

Implemented locally on 16 November 2026. No push or deployment.

## Corrections

- Removed both `filter: grayscale(1)` rules: portfolio artwork and the About workspace illustration now retain their original colours. No saturation, blend-mode or image overlay restriction remains in the active source.
- Confirmed `scripts/optimize-images.mjs` only resizes and converts to WebP; it does not convert to monochrome or recolour screenshots. Existing PNG originals and responsive WebP variants were preserved without pixel edits.
- Replaced the product-specific homepage hero with the requested company headline and description, Start Your Project / Explore Our Services CTAs, and a development-workspace illustration. Four compact capability panels cover websites, mobile apps, custom software and digital solutions. No company performance figures, customer logos or testimonials were added.
- The hero uses the existing full-colour web-development illustration, not the dashboard artwork containing prominent invented company metrics. It is explicitly labelled as an illustration. High-priority responsive WebP sources are approximately 32.50 kB at 640px and 90.44 kB at 1280px.
- Moved the social media product section below the software concepts and technologies. Product previews use the full working name, Exoite Social Media Platform. In Development and illustrative-preview disclosures remain intact on the homepage and `/products`.
- Increased portfolio image prominence, preserved the native 3:2 aspect ratio with `object-fit: contain`, added full-size image links, retained enquiry links and displayed concept feature highlights on all cards. Images have no artificial colour treatment or cropping.
- Added restrained navy-tinted shadows to image frames and course cards, improving depth while keeping the UI palette and section backgrounds consistent. The hero has one short entrance movement, disabled by the existing reduced-motion rule.
- Source review covered all seven routes. About benefits from restored colour; shared card styling improves Training. Services, Products, Contact, navigation, accessibility, form validation and enquiry integrations remain in place.

## Asset provenance and missing screenshots

The repository asset inventory was searched and original files were visually inspected. Filenames and marketing text do not establish that an image is a captured application screen.

| Portfolio item | Available visual | Classification | Still missing |
| --- | --- | --- | --- |
| Online Examination Portal / Examify | `src/assets/images/portfolio-exam-portal.png`, responsive WebP derivatives | Composed promotional illustration showing a laptop, floating panels and example figures; not a verified screenshot | Genuine application screenshot and verified demo/project URL |
| Inventory Management System | `src/assets/images/portfolio-inventory.png`, responsive WebP derivatives | Promotional inventory illustration with rendered objects and sample interface/figures; not a verified screenshot | Genuine application screenshot and verified demo/project URL |
| Learning Management System | `src/assets/images/portfolio-lms.png`, responsive WebP derivatives | Composed laptop/phone illustration with promotional text and sample figures; not a verified screenshot | Genuine application screenshot and verified demo/project URL |

No genuine application screenshots or working product/demo URLs were found in the project. No new completed-product interfaces or demo links were invented. Existing illustrations remain visible in full colour and are explicitly captioned as illustrations. Detailed portfolio cards also explain that artwork figures are not verified project results. The full-size links open the largest shipped illustration, not a live demo.

For final replacement, supply actual screen captures and confirmed URLs for each project. Preserve their native colours, remove personal data from real captures, generate responsive variants and update the associated visual classification. Current artwork should not be described as evidence of delivery or real results.

## Verification

- `npm run build`: passed; seven public pages plus 404 prerendered.
- `npm run lint`: passed.
- `npm test`: all 26 tests pass. Coverage includes metadata, schema, route targets, sitemap, internal/asset links, form validation/provider responses, native disclosures, development status and the service-led hero.
- Original images were visually inspected; optimized variants were checked for distinct RGB colour channels. Source search found no remaining grayscale, zero-saturation or blend-mode restriction.
- All seven public routes returned their corresponding HTML/title from local preview. This does not emulate all Vercel headers/status rules.
- Final JS: 320.80 kB / 99.96 kB gzip. CSS: 43.89 kB / 9.36 kB gzip. No package or new runtime dependency was added.
- Browser access still reports `The browser access host is unavailable`. The native Chrome fallback was previously blocked by the tool's inability to verify the browser URL. No rendered page screenshots, browser-responsive pass or Lighthouse measurements are claimed. Homepage/portfolio screenshots could not be captured through the available browser tools.

Before release, visually review all seven routes at 360, 390, 768, 1024 and 1440px, especially hero balance, portfolio captions/image sharpness, product wordmark wrapping, mobile menus and contact form feedback. Confirm actual enquiry delivery and approved Vercel preview routing. Production release remains conditional on those checks.

## Changed files

- `src/components/sections/Hero.jsx`
- `src/components/sections/FeaturedSolutions.jsx`
- `src/components/ui/SoftwarePreview.jsx`
- `src/pages/Home.jsx`
- `src/index.css`
- `scripts/site.test.mjs`
- `README.md`
- `docs/redesign-report.md`
- `docs/performance-report.md`
- `docs/visual-correction-report.md`

The original image assets, SEO architecture, canonical URLs, structured data, sitemap, robots, Vercel routing and contact submission module were not replaced.
