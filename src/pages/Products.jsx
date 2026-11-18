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
import ContentHighlights from "../components/ui/ContentHighlights";
import PageHero from "../components/ui/PageHero";
import SoftwarePreview from "../components/ui/SoftwarePreview";
import SectionHeading from "../components/ui/SectionHeading";

const areas = [
  [
    Send,
    "Social publishing",
    "Prepare social posts.",
  ],
  [
    CalendarDays,
    "Content scheduling",
    "Plan ahead, together.",
  ],
  [
    LayoutGrid,
    "Content calendar",
    "See upcoming content.",
  ],
  [
    FolderOpen,
    "Media library",
    "Organise creative assets.",
  ],
  [
    Sparkles,
    "AI-assisted content",
    "Explore assisted drafting.",
  ],
  [
    ChartNoAxesCombined,
    "Analytics",
    "Review content performance.",
  ],
  [
    FileText,
    "Reports",
    "Share useful summaries.",
  ],
  [
    Inbox,
    "Unified inbox",
    "Organise team conversations.",
  ],
];

export default function Products() {
  return (
    <main className="products-page">
      <PageHero
        label="Our products"
        title="Exoite Social Media Platform"
        description="A social content workspace, currently in development."
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
            <p>One concept for ideas, assets, schedules and conversations.</p>
            <ContentHighlights items={["Illustrative interface only", "Channels and integrations unconfirmed", "No release date or pricing promised"]} />
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
