# Exoite — visual content refinement

Completed locally on 18 November 2026. The existing website structure, routes and brand palette are preserved. Copy is shorter, service visuals are more consistent, and detailed scope is easier to explore without filling the initial view with paragraphs.

**Build, lint and all 82 tests pass.** Browser verification rendered all 26 routes at six widths without route/layout failures or automated accessibility violations. Nothing was pushed or deployed.

[Open the screenshot gallery](../artifacts/visual-content-refinement/index.html). Before screenshots are fresh local production-preview renders from the start of this task. Final screenshots, section crops, comparison measurements and test evidence are in `artifacts/visual-content-refinement/`.

## Text reduction and hierarchy

The figures below measure **visible paragraph words inside main content at 1440px**, excluding decorative/hidden content and closed disclosures. They do not count headings, lists, chips or footer text, and do not imply that all detailed content was deleted. Source measurements are in [content-comparison.json](../artifacts/visual-content-refinement/content-comparison.json).

| Page | Before | After | Reduction |
|---|---:|---:|---:|
| Homepage | 489 | 335 | 31.5% |
| About | 320 | 157 | 50.9% |
| Services index | 377 | 167 | 55.7% |
| AI Automation | 557 | 334 | 40.0% |
| AI Chatbots | 537 | 313 | 41.7% |
| Products | 191 | 88 | 53.9% |
| Portfolio | 117 | 67 | 42.7% |
| Training | 227 | 99 | 56.4% |
| Contact | 86 | 60 | 30.2% |

Across the 24 indexable routes, this measure falls from **6,585 to 4,102 words**, approximately **38% less visible paragraph text**. The guide articles retain their substantive bodies; their hero/listing summaries are shorter. The legal drafts retain their full content.

Hero descriptions fit within two rendered lines on all reviewed marketing/article pages at 390px and 1440px. All ten service heroes also passed the two-line check at 360px, 768px and 1440px. Titles, status disclosures and form privacy instructions are separate from this description-line limit; they were not clipped to force a shorter layout.

## Homepage, section by section

| Section | Refinement |
|---|---|
| Hero | One short description: “Websites, apps and AI workflows for your business.” Existing headline, layered desktop artwork, readable mobile composition and CTA hierarchy remain. |
| Company introduction | Replaced repeated explanations with two short statements. Existing location, registration and collaboration facts remain visible. |
| Core services | Short outcome sentences sit beside the original capability graphics. Removed redundant marketing language rather than reducing useful type sizes. |
| AI automation | Three concise capabilities replace five overlapping labels. The four-stage interactive example keeps its controls, sample data, human-review guidance and explicit no-live-tools/no-message explanation. Shorter stage text is supported by icons and a connected desktop step treatment. |
| Projects | Compact summaries lead with the possible workflow. Existing neutral UI concepts and illustrative captions remain; no result statistics were introduced. |
| Industries | Sector icons replace index numbers. All six native disclosures and their relevant service links remain. |
| Process | Six purpose-specific icons and a static connecting line make the steps more visual. Descriptions are short task/outcome phrases. |
| Products | Shorter concept introduction and retained Calendar/Content preview. Mobile still shows one prominent post and a compact overview, with In Development and illustrative status intact. |
| Insights | One-line preview copy and existing editorial artwork support the shorter homepage titles. Full article content and SEO remain. |
| Final CTA | One direct sentence replaces the longer service list. Contact, email and WhatsApp destinations remain. |
| Footer | Compact registration/location/service summary. Navigation, legal draft links, phone, email and WhatsApp remain available. |

[Mobile hero](../artifacts/visual-content-refinement/after/sections/hero-390.png), [AI workflow](../artifacts/visual-content-refinement/after/sections/ai-automation-390.png), [industry icons](../artifacts/visual-content-refinement/after/sections/industries-1440.png), [process timeline](../artifacts/visual-content-refinement/after/sections/process-1440.png).

The homepage remains ten ordered sections. Its rendered height decreases from **14,268px to 13,755px at 390px**, and from **10,016px to 9,858px at 1440px**. Smaller text was not used to manufacture this reduction.

## New and refined original visuals

All new visual work is efficient HTML/CSS with existing Lucide icons. No external stock imagery, generated client screenshots, fake metrics, canvas, WebGL or new application dependencies were added.

| Service / subject | Graphic treatment |
|---|---|
| AI automation | Enquiry capture and human review, plus the existing four-stage interactive demonstration. |
| Website development | A focused business-page concept with a clear offer and enquiry action. |
| Custom software | A role-based approval workspace with example records and review states. |
| Mobile development | A readable mobile task workspace. |
| School/institute software | Course materials, assignments and teacher-feedback blocks. |
| Digital marketing | Search-intent field, business-result concept and Search/Content/Brand chips. No rankings or performance figures. |
| IT training | A code-editor-style workshop concept and practice/feedback labels. No placement or certification guarantees. |
| AI chatbots | Conversation concept showing approved information and human handoff; new compact assistant tile for discovery cards. |
| AI integrations | A distinct Email/Web form → Validate + AI assist → CRM/business tool diagram, with permissions and exception review. |
| AI business software | Review-queue and approved-knowledge assistance concepts. |
| Company collaboration | Goals → Prototype → Team review illustration replaces the generic workspace image. Its caption explicitly says it is not an office/team photograph. |

The seven main service categories now share one visual language, with distinct compositions and consistent line weight, readable labels and restrained blue/violet/green/warm accents. These accents extend the existing illustration palette while preserving the white/navy/blue interface system.

Selected detail captures: [marketing desktop](../artifacts/visual-content-refinement/details/services--digital-marketing-section-1-top-1440.png), [education mobile](../artifacts/visual-content-refinement/details/services--school-institute-solutions-section-1-top-390.png), [training desktop](../artifacts/visual-content-refinement/details/services--it-training-section-1-top-1440.png), [chatbot desktop](../artifacts/visual-content-refinement/details/services--ai-chatbots-section-1-top-1440.png), [connected tools mobile](../artifacts/visual-content-refinement/details/services--ai-workflow-integration-section-1-top-390.png).

The previous service WebP workspace illustrations are no longer imported by the shared service-hero component. Their source files were not destructively deleted. Existing project SVG studies and the product preview remain clearly labelled concepts.

## Internal pages improved

- **Services index:** visual examples for every main service, shorter summaries and retained topic chips/enquiry paths. AI discovery cards now have distinct workflow, chatbot, integration and workspace concepts.
- **All ten service detail pages:** short display intros, icon-led use cases, scope highlights and audience chips. Original overview and audience text remain in native “Scope & audience details” disclosures, present in prerendered HTML.
- **Four AI service pages:** concise integration/security cards lead with the business constraint. “Technical scope” disclosures retain the full API, permission, retention, human review and integration-protection guidance. Their accessible names include the card title.
- **About:** three long introduction paragraphs become a short explanation, three working principles and a concise product/status note. Mission, vision and reasons-to-work-together copy is shorter; an original collaboration diagram supports the introduction.
- **Portfolio and three solution studies:** short workflow summaries and structured evidence/status information. Detailed implementation/evidence qualifications remain available through native disclosures. No verified project delivery or stack is invented.
- **Products:** shorter hero and purpose statements; eight potential areas use concise labels and short descriptions. Global development/availability qualifications remain explicit.
- **Training:** removed general descriptions that repeated learning outcomes. Course titles, topic chips, practice outcomes and six accessible enquiry links remain. Custom-format requirements are a checklist, with no outcome guarantee.
- **Contact:** short invitation, concise required-field guidance, shorter direct-contact introduction and clearer budget/project placeholders. Form labels, validation, privacy explanation, integration handling and no-JavaScript safeguards remain.
- **Insights:** shorter index/article-hero summaries. The article bodies, section anchors, related services and Article structured data remain.

## Content simplified and retained

Removed repeated general promises, duplicate course descriptions, repeated service outcome paragraphs, long CTA lists and redundant introductory language. Replaced appropriate prose with checklists, chips, icon-supported examples and concise summaries.

Detailed scoping content was **reorganised rather than discarded**. Native disclosures work with keyboard and without JavaScript; their full text remains in the initial HTML. Important caveats remain visible: illustrative work, possible AI solutions, human oversight, provider feasibility, product development status and draft legal documents.

Canonical SEO descriptions and page-title data were not rewritten to match the shorter display copy. Route metadata comparison found no title or canonical changes. The source checksum manifest confirms that SEO/service/AI data, route definitions, sitemap, Vercel config, prerender script, legal data, enquiry module and package manifests are unchanged.

## Verification

| Check | Actual result |
|---|---|
| Production build | Passed. Client, SSR bundle, 26 prerendered routes and 404 output. |
| Lint | Passed with no errors. |
| Repository tests | **82 passed, 0 failed, 0 skipped.** Two added regressions verify preserved scope/audience HTML and metric-free, visual service heroes. Existing metadata, links, privacy, Training names and Vercel checks remain. |
| All-route browser checks | **156 successful route/viewport renders:** 26 routes at 360, 390, 768, 1024, 1440 and 1920px. No route/layout failures, page/console errors, failed requests or missing-image failures. |
| axe | **Zero automated violations** in 52 full-route scans at 360/1440, six whole-homepage scans and 24 workflow-state scans. Other route widths received layout/metadata checks. |
| Critical interactions | **131 checks passed:** workflow state/touch/keyboard, stable height, actual hit targets, WhatsApp non-overlap, product views, menu, focus, footer targets and no-JavaScript form privacy. |
| Disclosure accessibility | **126 checks passed:** service scope and technical details open by keyboard, display their retained content and keep focus styling; service hero descriptions fit the tested line limit. |
| Homepage / workflow suite | **87 checks passed**, including the 24 workflow axe scans above. |
| Hover, focus, touch and motion | **41 checks passed**, including reduced-motion and observer fallback. Observed local non-input layout-shift sum was 0; this is not field performance data. |
| Contact flow | **36 checks passed**, with the form provider and WhatsApp handoff mocked: validation, service selection, duplicate guard, loading/success/failure and fallback. No real enquiries or messages were sent. |
| Computed contrast | **463 actual text/background samples passed 4.5:1**, minimum approximately **4.90:1**, including new visual labels, scope chips and disclosure summaries. |
| Metadata | All before/after route title and canonical comparisons matched. Sitemap and structured-data regressions pass. |

Chrome **157.0.8103.79**, Playwright **1.65.1**, axe Playwright **4.14.0**. Screenshots show the latest local production preview at `http://127.0.0.1:4173/`, not the public deployment. Full-page captures use DPR 1, 900px viewport height and reduced motion for settled stills; interaction/motion checks run separately.

Automated axe retains some manual-review contrast nodes around illustration text. Computed samples supplement those results but do not establish a complete WCAG certification. Physical devices, other browser engines, live provider delivery and Vercel custom-domain behaviour were not tested. No application-level redirect was added.

A 360px workflow height variation found during testing was corrected while retaining readable text and all four states. One existing test's obsolete “five capabilities” expectation was updated to the new three-label summary, preserving four workflow steps and explicit illustrative/no-live-tools assertions.

## Remaining weak areas and owner review

- The Services index is more graphic-rich but longer: at 390px it grows from approximately **8,413px to 10,022px**. AI Automation grows from approximately **10,830px to 11,179px**, while visible paragraph text falls 40%. Graphics, icon groups and readable disclosure controls reserve space. The change improves scanning rather than uniformly shortening every document.
- AI pages still contain substantial use-case, security and FAQ material. That detail is relevant to scope and responsible use; removing it solely to produce a shorter page would under-explain the service.
- Project previews remain illustrative concepts. Genuine screenshots, approved demo URLs and implementation evidence are still required to present delivered client work.
- The social platform remains In Development, with no confirmed release date, pricing or channel availability. Business/registration details and legal drafts still require owner verification/approval.
- Illustrations explain capability; they are not proof of experience or customer outcomes. No testimonials, client counts, partnerships or achievement claims were added.

## Files and evidence

The task changed **33 existing source/test files** and added four: `src/data/visualContent.js`, `src/components/ui/ContentHighlights.jsx`, `src/styles/visual-content.css` and `scripts/visual-content.test.mjs`. The existing checkout already contained earlier phase edits; this count comes from this task's starting checksums, not the cumulative Git diff. See [change-manifest.json](../artifacts/visual-content-refinement/change-manifest.json).

Main changes cover homepage/shared sections, display summaries in the internal pages, `ServiceCapabilityVisual`, `ServiceVisual`, `AIServiceVisual`, and scoped content styles imported last in `src/index.css`. No dependency manifest changes were needed.

Evidence includes:

- `before/` — 18 fresh baseline screenshots at 390/1440.
- `pages/` — full final screenshots of 24 indexable routes at 390/1440.
- `details/` — readable top-of-section crops; these are explicitly partial crops, with full pages available alongside them.
- `after/` — homepage full captures, 72 section crops and comparison sheets across six widths.
- `baseline.json`, `content-comparison.json`, `routes/browser-results.json`, `contrast.json`, disclosure and interaction results — actual measurements.
- Build, lint and test logs; `automation-source/` — archived isolated QA scripts.

The refinement is ready for owner review. Nothing was pushed to GitHub or deployed to Vercel.
