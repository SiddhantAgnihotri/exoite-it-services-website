import {
  CalendarDays,
  Send,
  FolderOpen,
  Sparkles,
  ChartNoAxesCombined,
  FileText,
  Inbox,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SoftwarePreview from "../components/ui/SoftwarePreview";
import SectionHeading from "../components/ui/SectionHeading";

const areas = [
  [
    Send,
    "Social publishing",
    "A potential workflow for preparing and publishing social content.",
  ],
  [
    CalendarDays,
    "Content scheduling",
    "Explore planning posts ahead of time in a shared schedule.",
  ],
  [
    LayoutGrid,
    "Content calendar",
    "A possible calendar view of upcoming content and campaigns.",
  ],
  [
    FolderOpen,
    "Media library",
    "Explore keeping reusable creative assets in one place.",
  ],
  [
    Sparkles,
    "AI-assisted content",
    "Ideas for supporting content drafting and refinement.",
  ],
  [
    ChartNoAxesCombined,
    "Analytics",
    "Explore ways to understand content performance.",
  ],
  [
    FileText,
    "Reports",
    "Potential tools for organising and sharing performance summaries.",
  ],
  [
    Inbox,
    "Unified inbox",
    "Explore bringing social conversations into a shared workflow.",
  ],
];

export default function Products() {
  return (
    <main className="products-page">
      <PageHero
        label="Our products"
        title="Exoite Social Media Platform"
        description="A social media management SaaS in development at Exoite. A considered approach to organising content, teams and everyday social workflows."
      >
        <span className="status-badge">
          <span className="status-dot" />
          In Development
        </span>
        <p className="small-note">
          Not publicly launched. Availability, supported channels and final
          scope are not yet confirmed.
        </p>
      </PageHero>
      <section className="section product-preview-section">
        <div className="container">
          <SoftwarePreview />
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container">
          <SectionHeading
            eyebrow="Product direction"
            title="The possibilities we're exploring."
            description="These are potential product areas. They describe our direction, not completed or available features."
          />
          <div className="product-areas">
            {areas.map(([Icon, title, description]) => (
              <article className="product-area" key={title}>
                <Icon size={23} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="small-note">Under consideration</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Built with purpose</p>
            <h2>
              From a daily challenge
              <br />
              to a product direction.
            </h2>
          </div>
          <div className="prose">
            <p>
              Social media work often means moving between content ideas,
              assets, schedules and conversations. Our aim is to explore how
              these tasks could fit together in a more focused workspace.
            </p>
            <p>
              We're still developing the platform. The preview above is an
              illustration, not a screenshot of a released application. No
              release date, pricing or integration availability is being
              promised.
            </p>
            <Link
              className="text-link"
              to="/contact?solution=Exoite%20Social%20Media%20Platform"
            >
              Enquire about the product <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
