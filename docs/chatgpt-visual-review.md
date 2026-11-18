# Exoite IT Services — local browser visual review

**Reviewed:** 17 November 2026. **Overall design score: 6.4/10.** These are subjective design scores, not performance metrics.

## Executive summary

The homepage has a coherent white, navy and blue foundation, clear primary actions, well separated chapters and restrained motion. It renders successfully at every requested width. It looks like a competent agency website, but the proof of work, miniature interfaces and mobile information density keep it from feeling like a premium, established software studio.

The most important functional finding is a floating WhatsApp button covering part of the AI demonstration's **Next step** control at 768px and 1024px. The most important credibility finding is that the portfolio's illustrative promotional artwork contains usage and accuracy figures despite surrounding concept disclosures. These figures are not verified by this review. They should not become implied evidence of delivered projects.

**No application code was edited. Nothing was pushed or deployed.** Recommendations below remain unapplied. This is a homepage design audit, not a production release certification. The overlap should be resolved before sign-off, and the artwork claims and draft legal pages need owner review.

## Browser evidence and scope

- Started the latest source with `npm run dev -- --host 127.0.0.1 --port 4173 --strictPort`; inspected **http://127.0.0.1:4173/**, never the public deployment or an older build.
- Used installed **Google Chrome 157.0.8103.79**, controlled by Playwright 1.65.1. All six homepage loads returned HTTP 200.
- Viewports: **360, 390, 768, 1024, 1440 and 1920px**, each 900px high, device scale factor 1. These are browser viewport emulations, not physical device tests.
- Waited for fonts, decoded images and traversed the document. Captured six full pages, six opening viewports, and 72 section crops. Reviewed every chapter across all widths using paired review sheets and individual detail images.
- Still screenshots use reduced motion to provide settled, repeatable layouts. Normal motion, hover and touch were tested separately. Section crops come from actual Chrome full-page screenshots; they are not reconstructed mockups.
- No browser page errors, failed requests, broken images, document horizontal overflow or clipped main text were recorded in these captures. Both local font families loaded.
- Recorded **149 applicable interaction assertions, all passing**, plus two additional real Tab-focus observations. This does **not** mean the site has no interaction defects: separate geometric and hit-target tests confirmed the WhatsApp overlap. An initial six hover probes used touch-only contexts and were inapplicable; those raw results are preserved, excluded from the count and replaced with fine-pointer checks.
- axe-core Playwright 4.14.0 scans reported **zero automated violations** at all six widths. Contrast checks also returned manual-review nodes: 10/9/5/6/5/5 respectively. This is not a blanket WCAG or contrast certification. Tiny labels can be uncomfortable despite passing automated rules.
- No enquiries, emails, WhatsApp messages or live AI requests were sent. Contact destinations were visited without submitting a form. Real screen-reader software, production hosting, all secondary routes, production performance, build, lint and the repository test suite were not audited in this read-only homepage task.

[Open screenshot gallery](../artifacts/chatgpt-visual-review/index.html). Raw evidence: [browser measurements](../artifacts/chatgpt-visual-review/browser-observations.json), [interaction results](../artifacts/chatgpt-visual-review/interaction-observations.json), [overlap measurements](../artifacts/chatgpt-visual-review/overlap-observations.json), [keyboard and asset observations](../artifacts/chatgpt-visual-review/supplementary-observations.json). Source integrity is recorded in [source-integrity.json](../artifacts/chatgpt-visual-review/source-integrity.json).

## Visual scores

| Category | Score /10 | Reason |
|---|---:|---|
| Hero design | 7 | Balanced desktop split, useful actions and original layered composition; mobile scales the interface text into illegibility and retains too much visual detail. |
| Typography | 7 | Consistent font pairing and readable body text; tight headline tracking and many 5–11px secondary labels weaken refinement. |
| Layout quality | 7 | Shared container and alignment work well; tablet stacking and long mobile service/project sequences need editorial compression. |
| Section separation | 8 | White, pale blue and navy establish clear chapters without arbitrary decoration. Final CTA and footer are less distinct. |
| Images | 4 | No broken imagery or destructive cropping, but promotional concept posters are a poor substitute for genuine application evidence. |
| Spacing consistency | 6 | Tokens are regular; their cumulative effect is excessive on mobile, especially services, portfolio and footer. |
| Interactivity | 7 | Workflow, menus, tabs, accordions and motion respond well. A floating control obscures an action, and service-row lift overstates the clickable area. |
| Mobile experience | 6 | Primary actions and text fit, menus work and no horizontal overflow was found; the document is 15,655–16,186px long and previews become miniature desktop UI. |
| Brand identity | 6 | Recognisable palette and logo; generic promises and repeated interface motifs lack a distinctive Exoite point of view. |
| Professional credibility | 6 | Honest concept and in-development disclosures are valuable; unverified figures inside artwork and visible legal drafts undermine confidence. |

Arithmetic mean: **64 / 10 categories = 6.4/10**. Stronger evidence and selective refinement would improve this more than additional animation.

## Responsive results and measured scale

| Width | Document height | Layout observations | Full-page evidence |
|---|---:|---|---|
| 360px | 16,186px | Narrowest typography and three-column product preview are strained; floating WhatsApp hidden. | [360 full page](../artifacts/chatgpt-visual-review/home-360-full.png) |
| 390px | 15,655px | Comfortable primary copy; services 2,452px, portfolio 2,673px, footer 1,448px. | [390 full page](../artifacts/chatgpt-visual-review/home-390-full.png) |
| 768px | 12,137px | Hero stacks to 1,238px high; AI control overlap and final CTA email wrapping observed. | [768 full page](../artifacts/chatgpt-visual-review/home-768-full.png) |
| 1024px | 9,976px | Desktop navigation and split hero; narrow two-column AI composition; same control overlap. | [1024 full page](../artifacts/chatgpt-visual-review/home-1024-full.png) |
| 1440px | 10,012px | Best overall composition; container 1,280px wide with 80px side gutters. | [1440 full page](../artifacts/chatgpt-visual-review/home-1440-full.png) |
| 1920px | 10,012px | Container remains 1,280px with 320px side gutters; intentional containment, not a broken layout. | [1920 full page](../artifacts/chatgpt-visual-review/home-1920-full.png) |

Main section vertical padding is generally **96px desktop, 72px tablet and 56px mobile**. Mobile content width is 328px at 360 and 358px at 390; tablet content width is 704px at 768. The 390px page spans roughly 17.4 viewport heights at this test height. The issue is cumulative repetition and oversized component internals, not a universal need to remove whitespace. Gray gutters in the comparison sheets are review-sheet backgrounds, not gaps on the website.

## Section-by-section analysis

### 1. Navbar

The white header, restrained logo scale and navy project CTA look professional. Header height is 77px mobile/tablet and 89px desktop. Mobile navigation is easy to open and Escape restores focus; desktop Services disclosure opens with Enter and closes with Escape. Sticky navigation remains accessible while scrolling. Desktop naming mixes “Work” and “Company” with destination vocabulary such as “Solution studies” and “About”; standardising these would improve orientation. Avoid adding more top-level items. The menu screenshots document the actual open states: [390px](../artifacts/chatgpt-visual-review/interactions/menu-390.png), [1440px](../artifacts/chatgpt-visual-review/interactions/menu-1440.png).

### 2. Hero

The blue emphasis, clear project/services buttons and location line establish the offer quickly. At 1440 the columns are approximately 597px and 627px with a 56px gap. The H1 computes to 61.2px/67.32px, weight 600; at 390 it is 37.05px/41.496px. The headline's -0.05em tracking makes adjacent words visually tight. No clipping was detected.

The layered illustration is original code-native interface art, explicitly not client screenshots. Its phone covers part of the website layer, including meaningful-looking content. Website-panel paragraph text falls to 5.37px at 390 and 4.92px at 360, versus 9.404px at 1440. This is decorative art, not a claim that primary page copy is 5px, but the details stop communicating. The 768 stacked hero is particularly tall. Keep the strong primary CTA hierarchy and simplify the mobile art. [Desktop hero](../artifacts/chatgpt-visual-review/sections/hero-1440.png), [mobile hero](../artifacts/chatgpt-visual-review/sections/hero-390.png).

### 3. Company introduction

The white transition, two-column text and four facts are clean. The large introductory statement balances the heading and regular paragraph; mobile stacking remains aligned. However “Technology with purpose. People at the centre.” and the following text repeat broad agency promises rather than explaining a distinctive approach. The section lacks genuine human or working-process evidence. A supplied team/workshop image could help, but do not add stock people presented as employees. MSME registration is displayed; registration evidence was not independently verified. [Company section](../artifacts/chatgpt-visual-review/sections/company-1440.png).

### 4. Core services

Editorial rows are a welcome alternative to a wall of cards. Desktop alignment is controlled: the first row is approximately 252px high, with 36px vertical padding, 40px gaps and three columns. Subtle lift and border feedback are restrained. On mobile, the artwork sits between title and explanation, increasing travel before the useful description. At 390 the first row is about 397px and the complete section 2,452px. The small browser, boxes and phone sketches look like preliminary wireframes rather than crafted feature visuals. Uppercase benefit labels compute to 9px. Only the title and Explore link navigate, although the whole row lifts. [1440 services](../artifacts/chatgpt-visual-review/sections/services-1440.png), [390 services](../artifacts/chatgpt-visual-review/sections/services-390.png), [actual hover](../artifacts/chatgpt-visual-review/interactions/service-hover-1440.png).

### 5. AI automation workflow

The navy background creates the strongest chapter transition. Capabilities are scannable, the workflow is useful, and the potential-solution, synthetic-data and human-review explanations are appropriately cautious. All four stages and Next/Restart respond; a single stage is selected and the component height stays stable across states. It is an interactive illustration, not a live integration.

The 390 demo is 358×791px within a 1,563px chapter. Its 340px detail panel and 90px-high step tiles leave substantial blank space in the initial state. At 1440 the demo is 699×676px with a 280px detail panel. The 1024 two-column layout makes the demo tall relative to its copy. More serious: WhatsApp intercepts part of Next step at 768 and 1024. [AI desktop](../artifacts/chatgpt-visual-review/sections/ai-automation-1440.png), [AI mobile](../artifacts/chatgpt-visual-review/sections/ai-automation-390.png), [stage four](../artifacts/chatgpt-visual-review/interactions/workflow-four-390.png).

### 6. Featured projects

Alternating image/text creates good desktop rhythm. Labels clearly disclose illustrative concepts and the images use contain sizing, preserving the full composition. However the artwork consists of promotional posters with embedded marketing copy, rendered interface props and implied proof. Inventory artwork includes “500+” items, “1000+” transactions and “99% Accuracy”; Examify includes “100+” exams, “500+” students, “99% Exam Accuracy” and “24/7 Availability”. These are not substantiated results of this audit. Small captions outside the image do not neutralise the visual impression.

On mobile each project has description, tags, two actions, a full-size illustration link and a disclaimer, making the chapter 2,673px at 390. The repetitive blue poster language weakens differentiation among projects. Prioritise genuine, approved screenshots or simpler neutral concept illustrations without figures. [Portfolio](../artifacts/chatgpt-visual-review/sections/portfolio-1440.png), [390 portfolio](../artifacts/chatgpt-visual-review/sections/portfolio-390.png), [full-size Inventory artwork](../artifacts/chatgpt-visual-review/asset-references/portfolio-inventory-1280.webp), [full-size Examify artwork](../artifacts/chatgpt-visual-review/asset-references/portfolio-exam-portal-1280.webp).

### 7. Industries

The pale background and accordion format are calm and readable. Tap and Enter open the rows. The education quotation block repeats the already open education row, so the emphasis feels disproportionate before visitors reach other sectors. At 390 the chapter is 1,225px; at 360 it is 1,344px. The “potential use cases” disclosure is responsible and should remain. Streamline the repeated education introduction instead of adding more decorative cards. [Industries mobile](../artifacts/chatgpt-visual-review/sections/industries-390.png).

### 8. Development process and FAQs

The six-step line is well ordered on desktop and wraps to readable mobile columns. The FAQs work with touch and keyboard and their plus/minus state is clear. The chapter combines six process explanations and five FAQs, reaching 1,574px at 390. Step names are conventional; adding concise deliverable examples would be more persuasive than more motion. Keep scope, cost and post-launch answers easy to find. The question about the upcoming product is useful but contributes to the repeated product messaging elsewhere. [Process desktop](../artifacts/chatgpt-visual-review/sections/process-1440.png), [process mobile](../artifacts/chatgpt-visual-review/sections/process-390.png).

### 9. Products

The in-development badge and explicit feature uncertainty are honest. Calendar/Content changes the example display; it does not operate a real SaaS workspace. Desktop composition is balanced, but the three miniature posts remain in columns on mobile. The poster signature is 5px, workspace overline 8px at 390, and miniature poster headings approximately 12px. The visual is technically crisp yet difficult to read. A deliberately simplified mobile preview would convey the idea better. [360 product](../artifacts/chatgpt-visual-review/sections/products-360.png), [product interaction](../artifacts/chatgpt-visual-review/interactions/product-390.png).

### 10. Insights

The editorial illustration is crisp and relevant, clearly labelled original. One large illustrated article competes with two relatively bare titles; at 1440 the grid uses approximately 630px and 570px columns with an 80px gap. The long lead title and school article title wrap heavily on mobile. The chapter is 1,240px at 390. Give secondary stories comparable editorial weight or make all three entries intentionally concise. Hover/focus actions remain discoverable; no extra animation is needed. [Insights desktop](../artifacts/chatgpt-visual-review/sections/insights-1440.png), [mobile](../artifacts/chatgpt-visual-review/sections/insights-390.png).

### 11. Final CTA

The project action, email and inline WhatsApp make contact easy and remain present without hover. Copy is clear but generic. At 768, the email sits in a 204.875px column at 16px/28px and wraps the final “om” onto a second line. It looks accidental even though the link works. Reflow the action group sooner, rather than shrinking the address excessively. The CTA and footer share navy, so their boundary is visually weak. [Tablet CTA](../artifacts/chatgpt-visual-review/sections/final-cta-768.png).

### 12. Footer

Desktop groups are aligned and practical. At 390 the single-column footer is 1,448px high, after a 476px CTA; together they take more than two 900px screens. Contact methods repeat immediately after the CTA. The tagline “Empowering Digital Future” needs an article or a rewrite. Visible “Privacy Policy (draft)” and “Terms of Service (draft)” are honest but make the site feel unfinished; obtain approved documents before treating these as final. [390 footer](../artifacts/chatgpt-visual-review/sections/footer-390.png), [desktop footer](../artifacts/chatgpt-visual-review/sections/footer-1440.png).

## Interaction results

| Interaction actually exercised | Result and design observation |
|---|---|
| Service rows / portfolio images | Fine-pointer hover at 768, 1024, 1440: row lift 3px with 220ms transition; portfolio scale 1.025, contained within its stage. Blank service-row click stays on homepage despite row-wide lift. |
| Hero illustration | Fine-pointer layer movement of 4px; restrained, no excessive glow or continuous distracting background. |
| Navigation | Opened mobile menus at 360/390/768; desktop Services at 1024/1440/1920; Escape closes and restores focus. |
| Keyboard | Skip link is first target and moves to main. Actual Tab from main reaches hero CTA; 3px blue focus-visible outline recorded at 390 and 1440. Native disclosure and workflow controls respond to Enter. |
| AI workflow | All four stage buttons, selected semantics and Next/Restart work at six widths. State changes preserve height. WhatsApp overlay remains a separate hit-target defect. |
| Industry / FAQ accordions | Open/close through taps and keyboard. Content is not dependent on hover. |
| Product preview | Calendar/Content changes examples at every width. It is disclosed as a concept, not a working production application. |
| Primary destinations | Clicked hero Contact, AI service, Examify study, Products, lead article and final Contact destinations across six widths; expected local routes opened. No submission was attempted. |
| Scroll reveal | Observed a normal-motion reveal with 420ms duration and 12px translation, with content opacity remaining visible. Focusing inside cancels the reveal. |
| Reduced motion | Hover transforms and transitions disabled; no running reveal animations in tested reduced-motion state. Core content remains understandable without animation. |
| WhatsApp | Fixed control is hidden at 360/390 and absent on Contact; inline links remain. At attainable homepage scroll positions it overlaps Next step at 768/1024. Outbound message sending was not tested. |

[Real keyboard focus](../artifacts/chatgpt-visual-review/interactions/keyboard-tab-focus-1440.png). Pointer checks are not substitutes for physical touch hardware or a screen-reader audit.

## Top 15 improvements, in priority order

Each entry separates observed evidence from a proposed correction. Pixel targets below are design starting points, not changes already made.

### 1. High — Uncover the workflow action at tablet and laptop widths

- **Section/problem:** Homepage AI workflow. At 768×900, Next step is x622/y829.656, 93×44px; WhatsApp is x698/y830, 48×48px. Their intersection is **17×43.656px**. At 1024 the overlap is **17×43.828px**. Hit testing returns `.whatsapp-button` in the intersection.
- **Why it looks unfinished:** A persistent sales control sits over a real interaction and can send a tap to the wrong destination.
- **Correction:** Move WhatsApp into the normal CTA flow at these widths, or hide the float until the outer gutter can accommodate 48px plus clearance. Preserve existing inline WhatsApp access and a comfortable 44–48px target. Check all workflow states and scroll positions.
- **Expected impact:** Removes a confirmed obstruction and makes demonstration actions reliable. At 1440 this specific overlap was not present.
- **Evidence:** [768 overlap](../artifacts/chatgpt-visual-review/interactions/problem-whatsapp-overlap-768.png), [1024 overlap](../artifacts/chatgpt-visual-review/interactions/problem-whatsapp-overlap-1024.png).

### 2. High — Replace portfolio posters containing unverified performance figures

- **Section/problem:** Portfolio imagery uses mock application scenes and quantitative claims, including “99% Accuracy”, while nearby captions state these are concepts.
- **Why it looks unprofessional:** Visually prominent numerical proof conflicts with the cautious description and can be mistaken for real results.
- **Correction:** Use owner-approved screenshots of real interfaces, sanitised of private data. If unavailable, use neutral concept diagrams with no usage, reliability or outcome claims; label the chapter “Software concepts” until genuine work can be evidenced.
- **Expected impact:** Better trust and clearer distinction between capability and delivered work.
- **Evidence:** [Portfolio desktop](../artifacts/chatgpt-visual-review/sections/portfolio-1440.png), [Inventory source artwork](../artifacts/chatgpt-visual-review/asset-references/portfolio-inventory-1280.webp).

### 3. High — Design a readable mobile product preview

- **Section/problem:** Three narrow social posts remain side by side at 360/390. Poster signatures are 5px; overline is 8px at 390.
- **Why it looks unprofessional:** It reads as a shrunk desktop mockup rather than a mobile composition, so users cannot judge the proposed product.
- **Correction:** Show one representative post and a compact scheduling list on mobile, retaining the Calendar/Content switch and in-development explanation. Use approximately 12–14px useful interface text and remove purely ornamental microcopy.
- **Expected impact:** Makes the concept legible without implying unavailable functionality.
- **Evidence:** [360 products](../artifacts/chatgpt-visual-review/sections/products-360.png).

### 4. High — Compress mobile core services through editing and arrangement

- **Section/problem:** Services occupy 2,452px at 390 and 2,557px at 360; the first 390 row is about 397px high.
- **Why it looks unprofessional:** Visitors repeatedly scroll past title, decorative sketch, strapline, paragraph, tags and action before seeing the next offer.
- **Correction:** Put title, one outcome sentence and action together; shrink or move the sketch beside this group. Keep all services discoverable. Explore a chapter around 1,600–1,900px at 390, then validate readability instead of imposing a hard height.
- **Expected impact:** Faster comprehension and a shorter route to AI, work and contact content.
- **Evidence:** [390 services](../artifacts/chatgpt-visual-review/sections/services-390.png).

### 5. High — Simplify the hero's mobile illustration

- **Section/problem:** The website paragraph scales to 4.92px at 360 and 5.37px at 390, and the phone covers meaningful-looking text/action content.
- **Why it looks unprofessional:** Excess detail gives an attractive silhouette but little readable information; overlap seems accidental rather than purposeful.
- **Correction:** Use a mobile-specific two-layer composition with clear 14–16px capability labels and fewer faux controls. Keep the full layered treatment on desktop, but avoid covering the website's main message. Retain the concept disclosure.
- **Expected impact:** A clearer first impression, more credible craft and less vertical weight at tablet sizes.
- **Evidence:** [390 hero](../artifacts/chatgpt-visual-review/sections/hero-390.png), [768 hero](../artifacts/chatgpt-visual-review/sections/hero-768.png).

### 6. Medium — Reorganise the long mobile footer

- **Section/problem:** Footer height is 1,448px at 390, with a 1,196px internal grid and 32px gaps; the preceding CTA adds 476px.
- **Why it looks unprofessional:** Repeated contact methods and tall single-column lists make the ending feel administrative and disproportionate.
- **Correction:** Try two compact link groups, with a separate full-width contact block and readable labels. Aim initially for an 800–950px footer, preserving 44px interactive rows, legal access and text size. Add a subtle CTA/footer boundary.
- **Expected impact:** A more deliberate ending with less repeated scrolling.
- **Evidence:** [390 footer](../artifacts/chatgpt-visual-review/sections/footer-390.png).

### 7. Medium — Reduce empty space inside the AI demonstration

- **Section/problem:** Demo is 358×791px at 390; four tiles are 90px high and the detail panel is 340px high even in the sparse first state.
- **Why it looks unprofessional:** The demonstration's shell dominates its useful explanation and makes the feature chapter feel padded.
- **Correction:** Use more compact, approximately 56–64px stage controls where labels fit and size the reserved detail area against the tallest real state. Keep stable height across transitions and retain human-review/disclosure copy.
- **Expected impact:** Better balance and less mobile travel without layout jumps.
- **Evidence:** [390 AI](../artifacts/chatgpt-visual-review/sections/ai-automation-390.png), [fourth state](../artifacts/chatgpt-visual-review/interactions/workflow-four-390.png).

### 8. Medium — Establish a practical secondary-text minimum

- **Section/problem:** Service straplines are 9px; several workflow/disclosure labels are 10–11px; product and decorative UI go lower.
- **Why it looks unprofessional:** Important caveats and useful context look like production footnotes rather than part of the designed reading hierarchy.
- **Correction:** Use 12px as a starting minimum for useful labels and 13–14px for disclosures, adjusting composition to fit. Remove decorative microtext rather than enlarging every faux UI detail. Recheck actual contrast on every background.
- **Expected impact:** Improved comfort and visibility of the website's honest qualifications. This is a readability recommendation, not a claim that WCAG mandates a universal minimum font size.
- **Evidence:** [Services](../artifacts/chatgpt-visual-review/sections/services-1440.png), [AI](../artifacts/chatgpt-visual-review/sections/ai-automation-390.png).

### 9. Medium — Relax display tracking and tune headline wrapping

- **Section/problem:** H1 tracking is -0.05em and shared homepage H2 tracking -0.045em. Multiword headings look compressed, particularly the long services and insights titles on mobile.
- **Why it looks unprofessional:** Tight letter spacing reduces the calm editorial quality and visually collapses word separation.
- **Correction:** Test approximately -0.03em for H1 and -0.02em for H2; tune max-width and shorter homepage card titles at the same time. Preserve natural wrapping and inspect all six widths.
- **Expected impact:** Cleaner reading rhythm without changing the font family or brand palette.
- **Evidence:** [1440 hero](../artifacts/chatgpt-visual-review/sections/hero-1440.png), [390 insights](../artifacts/chatgpt-visual-review/sections/insights-390.png).

### 10. Medium — Finish the service illustration system

- **Section/problem:** The four sketches use basic boxes, a blank browser, a shallow dashboard and rotated phones; their containers are 160px high desktop and 110px mobile.
- **Why it looks unprofessional:** They resemble layout placeholders beside polished typography and do not explain an actual service distinction.
- **Correction:** Create a consistent original vector set showing one specific capability per service. Use roughly 280×180 logical compositions or responsive SVG, with consistent line weight, perspective and detail. Avoid adding generic stock technology art.
- **Expected impact:** More distinctive craft and faster service recognition.
- **Evidence:** [Desktop services](../artifacts/chatgpt-visual-review/sections/services-1440.png).

### 11. Medium — Align service hover with the clickable surface

- **Section/problem:** Entire service articles lift 3px on hover, but clicking a blank part of the row leaves the URL unchanged; only explicit links navigate.
- **Why it looks unprofessional:** Feedback implies a larger target than the implementation provides.
- **Correction:** Either limit lift/arrow feedback to the real links, or deliberately make the primary row a single accessible link without nested interactive elements. Give keyboard focus the same clear affordance.
- **Expected impact:** More predictable pointer and keyboard behaviour.
- **Evidence:** [Service hover](../artifacts/chatgpt-visual-review/interactions/service-hover-1440.png), interaction JSON notes record the blank-area click.

### 12. Medium — Remove repeated education messaging in Industries

- **Section/problem:** Introduction, education pullquote and the initially expanded education item repeat the same sector emphasis; chapter height is 1,225px at 390.
- **Why it looks unprofessional:** A supposedly broad industry section feels padded and disproportionately focused on one audience.
- **Correction:** Keep one brief introduction and let each accordion supply a distinct workflow example. Remove or replace the redundant pullquote, keeping the potential-use-case qualification. Choose a deliberate default accordion state.
- **Expected impact:** More concise positioning and more equal visibility for other sectors.
- **Evidence:** [Industries 390](../artifacts/chatgpt-visual-review/sections/industries-390.png).

### 13. Medium — Balance the three Insights entries

- **Section/problem:** One large illustrated article and two bare secondary titles have uneven visual weight; the lead's 13-word title wraps heavily on mobile. The 390 section is 1,240px high.
- **Why it looks unprofessional:** The secondary material looks unfinished next to the lead, while long titles slow scanning.
- **Correction:** Use concise homepage titles and either balanced editorial rows or comparable restrained thumbnail treatment. Keep full article headings and SEO titles where appropriate; do not fill the difference with arbitrary decoration.
- **Expected impact:** A more intentional editorial rhythm and clearer article choice.
- **Evidence:** [1440 insights](../artifacts/chatgpt-visual-review/sections/insights-1440.png), [390 insights](../artifacts/chatgpt-visual-review/sections/insights-390.png).

### 14. Medium — Prevent the orphaned email ending at tablet width

- **Section/problem:** At 768, the final CTA email's computed width is 204.875px with 16px text and 28px line-height; the final “om” wraps to a second line.
- **Why it looks unprofessional:** The split looks accidental in an otherwise sparse CTA and weakens the contact hierarchy.
- **Correction:** Stack the action group at this breakpoint or allocate enough width for the complete address. Avoid shrinking essential contact text or forcing an unbreakable address into a too-small column.
- **Expected impact:** Cleaner contact presentation and easier visual recognition.
- **Evidence:** [768 CTA](../artifacts/chatgpt-visual-review/sections/final-cta-768.png).

### 15. Medium — Replace generic filler and finalise public-facing footer copy

- **Section/problem:** “Technology with purpose”, “A better way forward” and similar phrases recur; footer grammar and visible legal drafts feel unfinished.
- **Why it looks unprofessional:** Many agencies could use the same words, and visitors see signals that public content is still provisional.
- **Correction:** Use specific, supportable scope and collaboration statements; change the footer tagline to “Empowering your digital future” or a more concrete approved alternative. Obtain approved legal content before removing draft labels. Never invent project counts, testimonials or service guarantees.
- **Expected impact:** Stronger positioning and owner confidence in the website's public claims.
- **Evidence:** [Company](../artifacts/chatgpt-visual-review/sections/company-1440.png), [footer](../artifacts/chatgpt-visual-review/sections/footer-390.png).

## Content quality and suggested copy

The English is generally professional and British spelling is broadly consistent. Main paragraphs fit the layouts; excessive total repetition is more of a problem than individual paragraph length. “Considered”, “clear”, “practical”, “digital” and “the way you work” repeatedly stand in for concrete explanation. Recommended edits below are proposals for owner review, not newly verified business facts.

| Current wording | Suggested direction |
|---|---|
| Hero: “From intelligent AI automation to professional websites… powerful digital solutions.” | “We design websites, custom software, mobile apps and AI-assisted workflows around your business needs.” |
| Company: “Technology with purpose. People at the centre.” | “Websites, software and automation, planned with your team.” Retain only if this accurately describes the engagement model. |
| Services: “The right expertise. A better way forward.” | “Choose the right solution for your next business challenge.” |
| Mobile: “Considered mobile experiences…” | “Mobile apps for customer tasks and internal team workflows.” Keep supported platform scope in the description. |
| Work: “Featured software projects” / “Ideas, brought into focus.” | “Software concepts” / “Explore possible solutions for your business” until genuine delivered work is documented. |
| Process: “Build in considered, reviewable steps.” | Describe the actual review deliverable, for example “Review working features at agreed checkpoints”, only after confirming that practice. |
| Article: “Choosing a business website: start with the job it needs to do” | Homepage card: “Plan a website around your business goals.” Keep the full article title on the article if preferred. |
| Product: “A place for the work behind your content.” | “A social content workspace, in development.” More explicit, less atmospheric. |
| Footer: “Empowering Digital Future” | “Empowering your digital future.” |

AI copy does not promise zero errors or fully autonomous performance. It explicitly describes potential solutions, human review and no live integrations in the demo. Preserve these qualifications. Do not strengthen “AI categorization” into a claim of guaranteed correct routing. Actual integrations, security guarantees, platform partnerships and completed client results were not established here. Verify MSME and other business assertions with the owner rather than treating visual presence as proof.

## Image and asset review

| Asset | What was observed | Recommended supply / format |
|---|---|---|
| Hero | Original HTML/CSS interface artwork, not a real application screenshot. Responsive but tiny text and overlapping layers. | Prefer a simplified code-native mobile variant. If raster artwork is required, supply an original 1600×1000 (16:10) composition with a separate mobile crop. |
| Four service sketches | Original code-native mini illustrations; crisp, but generic and low-information. | Consistent SVG compositions around 280×180 logical units, or 560×360 WebP at 2×; meaningful labels outside decorative art. |
| Examify, Inventory, LMS | Three different existing promotional concept images; repeated visual style, not the same file repeated. No genuine screenshot provenance established. | Approved captures at 1600×1000 or 1600×900, with private data removed, ownership confirmed and captions stating real versus demo status. Keep full-size viewing for detailed interfaces. |
| Product preview | Original illustrative DOM interface and functioning display switches; not a released product. | Approved real product screens when available. Until then retain prominent concept/in-development labels and simplify mobile. |
| Insights art | Original code-native browser/planning illustration; sharp and correctly disclosed. | If adding more art, use distinct editorial subjects at 1200×675 (16:9), rather than recycling the same dashboard motif. |
| Company / people | No genuine team/process photograph appears in this chapter. | Optional owner-supplied team or workshop image at approximately 1600×1200, with permission. Do not substitute stock people as employees. |

The sampled portfolio images use WebP and `object-fit: contain`; no essential UI was cropped away. Their display stages are approximately 16:10 while the source promotional art is 3:2, so contain sizing leaves some internal space. That is preferable to clipping, but genuine screenshots could fit the stage more deliberately. At 1440 the image boxes are about 592×361px; selected browser-reported natural widths were 960px for Examify and 599px for Inventory/LMS. The originals were also inspected at full size. There was no obvious bitmap pixelation at tested DPR 1; **embedded tiny text and poster composition**, rather than a proven resolution failure, are the main weaknesses. Retina/2× sharpness was not tested.

No licensing or provenance documents were independently audited. Existing assets should be confirmed as owned or properly licensed before release. No replacement imagery was generated or downloaded during this task; copies of existing full-size concept assets are included only as audit references.

## Performance observations and limitations

The restrained hover/reveal system felt responsive in local browser automation, with no observed horizontal shift or workflow height change during tested states. Portfolio images decoded and reserved image stages held their space. This is qualitative evidence, not a measured CLS result. Motion uses existing CSS/browser animation capabilities; no animation-heavy background was seen.

No Lighthouse run, throttled network measurement, CPU profiling, Core Web Vitals field data or production bundle audit was performed. Vite development timings do not establish production performance. Likewise, zero axe violations does not prove all contrast, focus, screen-reader or touch-target requirements are satisfied. The screenshot baseline uses reduced motion, while separate tests establish normal-motion behaviour.

## Final recommendations and handoff

1. Resolve the confirmed WhatsApp/Next-step obstruction and the tablet email wrap first.
2. Obtain genuine project evidence or remove unverified numerical claims from concept artwork before owner approval.
3. Simplify the mobile hero/product illustrations and shorten services, portfolio and footer through deliberate content arrangement.
4. Refine secondary type, display tracking and article hierarchy while preserving the effective white/navy/blue chapters and working interactions.
5. Have the owner approve business statements, legal documents, asset permissions and the product roadmap wording. Then re-run visual and functional regression checks against the changed version before release.

**Ready for owner review as an audit package: yes. Ready to declare the homepage production-final: no.** One confirmed UI obstruction and unresolved public-facing content/asset issues remain. This task intentionally leaves application code untouched.

## Package contents

- `docs/chatgpt-visual-review.md` — this report.
- `artifacts/chatgpt-visual-review/index.html` — organised screenshot gallery.
- `home-*-full.png` / `home-*-viewport.png` — actual full-page and initial-viewport screenshots at all six sizes.
- `sections/` — 12 region crops for each width, including hero, services, AI, portfolio and problematic sections.
- `interactions/` — menus, workflow states, product states, hover, keyboard focus and overlap evidence.
- `sheets/` — paired comparison sheets used for review, with review-only gray gutters.
- `asset-references/` — existing concept artwork inspected at full size.
- JSON evidence and `automation-source/` — measurements, assertions, integrity record and archived QA scripts.
- `artifacts/exoite-visual-review.zip` — report and evidence using workspace-relative paths so report/gallery links survive extraction. Open the extracted gallery in a browser.
