# Reference design analysis and implementation plan

Prepared 16 November 2026, before the visual implementation changes in this phase.

## Research method and limits

All 14 requested official homepages were opened through web retrieval. Their page text, navigation and linked content were available. Browser inventory again reported `The browser access host is unavailable`; no rendered reference page, typography measurement, screenshot, animation, hover behaviour or mobile layout was visually inspected. The visual principles below start from the user's supplied verified observations. Text retrieval supplies additional evidence of content structure, not a substitute for rendered design inspection.

No reference assets, logos, brand colours, claims, client names or interface screenshots are to be downloaded or reused. This is a principles-based adaptation for Exoite's much smaller, factual content set.

| Reference | Useful pattern / evidence basis | Application to Exoite | Must not copy |
| --- | --- | --- | --- |
| [Netguru](https://www.netguru.com/) | Supplied: clean hierarchy and prominent project stories. Retrieved navigation separates capabilities, technologies and case studies. | Prioritise web/software/mobile, then connect the service to relevant concept studies. | Mega-menu scale, client names, delivery proof, assets or brand treatment. |
| [Simform](https://www.simform.com/) | Supplied: engineering positioning and organised services. Retrieved services and engineering-focused company positioning. | State what Exoite builds before presenting supporting capabilities. | Partnerships, scale, AI delivery claims or an enterprise-sized taxonomy. |
| [Thoughtworks](https://www.thoughtworks.com/) | Supplied: editorial typography and concise consulting messaging. Official content retrieved. | Strong heading/body contrast, left-aligned editorial introductions and readable narrative. | Brand typography compositions, consultancy claims or proprietary language. |
| [thoughtbot](https://thoughtbot.com/) | Supplied: genuine project storytelling and direct consultation. Retrieved featured case study before service detail and a consultation path. | Large concept imagery with problem/scope/status and clear enquiry links. | Their client outcomes, longevity claims, artwork or visual identity. |
| [EPAM](https://www.epam.com/) | Supplied: bold engineering-led visual storytelling. Retrieved extensive engineering/capability navigation. | Use a purposeful image-led opening and a visually coherent work section. | Huge navigation, immersive effects, stock assets or large-company proof. |
| [Globant](https://www.globant.com/) | Supplied: personality and product/platform narratives. Retrieved a distinct product-platform narrative. | Give Exoite a recognisable typographic rhythm and distinguish its upcoming product from services. | Their platform names, AI claims, partnerships or loud brand effects. |
| [10Clouds](https://www.10clouds.com/) | Supplied: industry-oriented services. Retrieved industry-specific positioning. | Group potential education, business and service-sector needs in a concise editorial section. | Specialisations or customer evidence not verified for Exoite. |
| [BairesDev](https://www.bairesdev.com/) | Supplied: discoverable services and contextual work. Official content retrieved. | Make the three commercial priorities immediately discoverable with detail/enquiry paths. | Talent scale, customer lists, staffing promises or social proof. |
| [ScienceSoft](https://www.scnsoft.com/) | Supplied: practical buyer guidance and delivery detail. Retrieved a deep service information architecture. | Preserve useful service/FAQ content with better presentation and contextual next steps. | Large-catalogue density, certifications, numbers or service guarantees. |
| [N-iX](https://www.n-ix.com/) | Supplied: organised capabilities and industry context. Retrieved capabilities, industries, stories and Insights categories. | Distinguish services, industries, work and guides without mixing them into one card grid. | Sector experience, client names, partner badges or engineering scale. |
| [Intellectsoft](https://www.intellectsoft.net/) | Supplied: accessible offerings and contact routes. Retrieved grouped software offerings and a direct project-discussion path. | Clear service links, visible contact action and short, contextual enquiry copy. | Meeting availability, claims, client work or copied navigation panels. |
| [Nerdery](https://www.nerdery.com/) | Supplied: clear work/company/Insights navigation. Retrieved that separation and direct contact links. | Give primary navigation fewer competing items, with support links still discoverable. | Award badges, partnerships, slogans or language about capabilities not established here. |
| [Endava](https://www.endava.com/) | Supplied: concise opening, industry narrative, case studies. Retrieved the sequence from positioning to industries/capabilities and work. | Move from understandable services to concrete concepts, then relevant industries and approach. | Their headline, sector expertise, history or branded imagery. |
| [Toptal](https://www.toptal.com/) | Supplied: clear discovery and conversion. Retrieved detailed service/talent navigation and skip links. | Help visitors choose a service and keep a single, accessible primary enquiry route. | Screening/quality percentages, talent-marketplace claims or membership proof. |

## Existing design problems found in source

1. Thirteen homepage sections create repeated pitches: company intro, reasons to choose, capabilities and technology copy compete for attention.
2. Services are six equally weighted accordion rows, so web/software/mobile do not have a clear commercial hierarchy.
3. Three equal work thumbnails understate the most useful visual material. Repeated tags and three-link stacks make each item feel like a catalogue card.
4. The hero combines a code-workspace photograph-like illustration with four small bordered capability containers; the visual does not explain the software concepts as directly as the available interface artwork can.
5. Industry and article grids repeat the same item rhythm. There are too many borders and icon containers for the amount of content.
6. The upcoming product preview is a neutral skeleton rather than a considered concept interface. Its illustrative status must remain explicit.
7. All six service detail pages have the same section order and visual weight. Existing useful text should remain, with presentation varied by service family.
8. CSS has accumulated successive overrides. Consolidation into one shared system is preferable to another layer of conflicting visual patches.

## Concrete Exoite direction

**Engineering, presented editorially.** A navy/white company identity, a precise blue accent, generous but purposeful spacing, full-colour interface artwork and a visible hierarchy between primary and supporting services. No reference website is reproduced pixel-for-pixel.

### System specification

- Palette: white `#FFFFFF`, navy `#14213D`, blue `#2563EB`, soft background `#F5F7FA`, secondary text `#64748B`, subtle border `#E2E8F0`. Natural colours are allowed within assets and illustrative software content; no grayscale enforcement.
- Headings: Plus Jakarta Sans, 500–700 weights. Body: Inter, 400–600 weights. Both use `display=swap`, existing preconnects and system fallbacks. Body 15–16px; reading copy 16–17px. Desktop hero at most 56px; fluid smaller sizes on phones. Text widths constrain wrapping rather than making type enormous.
- Layout: 1240px container, 32px desktop/20px phone gutters, narrow 760px reading column, 8/16/24/32/48/64/88px spacing scale. Sections use 64–88px desktop and 44–56px mobile according to purpose, not empty spacer blocks.
- Shape: 4–12px corner scale. Borders separate useful groups; individual items do not all need boxes. Shadows belong to image/product planes, not every text block.
- Typography signature: short eyebrow labels, modest numerical section markers, expressive but readable headings, left-aligned copy and deliberate asymmetry. No excessive uppercase tracking or pill collections.
- Interaction: native FAQ/service disclosures where useful, links with visible focus, a deliberate mobile menu and labelled concept-view controls. No autoplay, parallax or simultaneous entrance animations. Reduced motion remains respected.
- Image system: `ProjectVisual` and a reusable work feature present the same truthful project data. Responsive full-colour WebP, stable ratio, contain rather than crop, explicit illustrative caption. Genuine application captures can be substituted later after evidence is supplied.

### Homepage composition

1. Confident company hero: a clear headline and two CTAs; right-side interface composition using existing labelled education/business/software illustrations rather than the social platform or unrelated code photography.
2. Compact trust strip: MSME, Kanpur/remote and business focus, without fabricated proof.
3. Three unequal featured service panels for website/software/mobile; three supporting capability summaries for education, marketing and training.
4. Editorial work: one large featured Examify study, followed by two complementary stories. Keep concept status and feature context; no invented stack/demo.
5. Industry editorial: education-focused introduction and concise audience/use-case rows rather than six cards.
6. Company plus engineering toolkit: consolidate credibility and technology information rather than repeating several pitches.
7. Product section lower down: a colourful illustrative content-workflow preview, full working name and In Development status.
8. Discover → Plan → Design → Develop → Test → Launch, followed by concise FAQ, a curated guide preview and one final navy project CTA.

### Internal-page variation

- Development services: an image-led opening with an appropriate existing concept or workspace visual, then scope/use-case columns.
- Education/training: a learner/institution-oriented composition with a different use-case rhythm and the existing relevant illustration.
- Digital marketing: an editorial text-led opening and numbered deliverables; no fake results dashboard.
- About: narrative plus full-colour workspace illustration, restrained mission/vision layout and less repeated marketing copy.
- Portfolio/studies: shared large-image treatment and readable narrative/evidence distinctions.
- Products: treat the labelled concept as a product landing page; no launched-product conversion controls.
- Training: one featured learning route followed by clear program summaries, with topics/outcomes/enquiries preserved.
- Contact: stronger form/aside proportion and field grouping. Preserve provider/credentials, all validations, context, timeline, privacy disclosure and WhatsApp fallback.
- Insights: narrower reading column, clearer section rhythm, functional contents and related reading instead of more generic promotion.

## Components planned to change

Shared CSS, font link, Navbar, Footer, PageHero, SectionHeading, ProjectVisual; Hero, TrustBar, Services, FeaturedSolutions, Industries, CompanyIntro, ProductShowcase, SoftwarePreview, Process, InsightsPreview, FAQ/CTA presentation; Home composition, About, ServicesPage/ServiceDetail, Portfolio/CaseStudy presentation, Products, Training, Contact styling and Insights article related reading.

Routing, SEO records, prerendering, sitemap/robots, Vercel policies, business facts and enquiry provider identifiers are preserved. Tests that encode the superseded six-accordion service layout or old surface colour must be updated to assert the new accessible presentation, not deleted to hide failures.

## Ordered implementation and validation plan

1. Consolidate tokens, type and reusable components; then navigation.
2. Implement hero, prioritised services and reusable editorial work.
3. Refine the product preview and supporting/company/industry/process sections.
4. Apply service-family variations and internal-page hierarchy, then footer/contact/reading polish.
5. Build all 22 routes plus 404, lint, run existing and updated regression tests, inspect metadata/sitemap/links, verify enquiry mocks and preselection, and request local routes over HTTP.
6. Capture 390/768/1440 screenshots only if a browser connection becomes available. If it does not, explicitly record that responsive CSS/source checks do not establish rendered visual quality.
