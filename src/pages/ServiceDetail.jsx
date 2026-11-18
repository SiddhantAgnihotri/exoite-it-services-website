import { serviceContent } from "../data/visualContent";
import ContentHighlights from "../components/ui/ContentHighlights";
import ServiceVisual from "../components/ui/ServiceVisual";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Plus, Inbox, FileText, MessageSquare, Mail, Database, BookOpen, ChartNoAxesCombined, Globe2 } from "lucide-react";
import { serviceDetails } from "../data/serviceDetails";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import NotFound from "./NotFound";
import AIServiceVisual from "../components/ui/AIServiceVisual";
import AIServiceConsiderations from "../components/sections/AIServiceConsiderations";
import { aiDisclosure } from "../data/aiServices";

const iconForUseCase = title => /lead|enquiry|enquiries/i.test(title) ? Inbox : /email/i.test(title) ? Mail : /document/i.test(title) ? FileText : /report|summar/i.test(title) ? ChartNoAxesCombined : /knowledge|learning|course/i.test(title) ? BookOpen : /CRM|record|inventory/i.test(title) ? Database : /customer|support/i.test(title) ? MessageSquare : Globe2;

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceDetails.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const content = serviceContent[service.slug];
  const enquiry = `/contact?service=${encodeURIComponent(service.enquiry)}`;
  const family = service.family || (["school-institute-solutions", "it-training"].includes(
    service.slug,
  )
    ? "education"
    : service.slug === "digital-marketing"
      ? "advisory"
      : "engineering");
  return (
    <main className={"service-detail-page service-family-" + family}>
      <Breadcrumbs />
      <PageHero
        variant={family}
        visual={
          family === "ai" ? <AIServiceVisual variant={service.visual} /> : <ServiceVisual slug={service.slug} />
        }
        label={service.name}
        title={service.title}
        description={content.intro}
      >
        <Link className="button button-primary" to={enquiry}>
          {service.cta || "Enquire Now"} <ArrowRight size={16} aria-hidden="true" />
        </Link>
        {family === "ai" && <p className="ai-hero-disclosure">Potential solutions. No completed AI client projects are implied.</p>}
      </PageHero>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">{family === "ai" ? "Business challenges" : "Service overview"}</p>
            <h2>{service.overviewHeading || "A clear starting point for your project."}</h2>
            <ContentHighlights items={service.challenges || content.points} />
          </div>
          <div className="service-scope-summary">
            <p className="content-lead">{content.summary}</p>
            <h3 className="content-subheading">Who this is for</h3>
            <ul className="scope-chips">{content.audience.map(item => <li key={item}>{item}</li>)}</ul>
            <details className="content-detail"><summary>Scope &amp; audience details</summary><p>{service.overview}</p><p>{service.audience}</p></details>
          </div>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container">
          <SectionHeading
            eyebrow="Common use cases"
            title="Where this service can help."
          />
          {family === "ai" && <p className="ai-disclosure">{aiDisclosure}</p>}
          <div className="use-case-grid">
            {service.useCases.map(([title, description]) => { const Icon = iconForUseCase(title); return (
              <article key={title}>
                <Icon className="use-case-icon" size={27} aria-hidden="true" /><span className="use-case-number">
                  0{service.useCases.findIndex((item) => item[0] === title) + 1}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ); })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Features & deliverables</p>
            {service.deliverablesHeading ? <h2>{service.deliverablesHeading}</h2> : <h2>
              Define the work.
              <br />
              Agree the responsibilities.
            </h2>}
            <p className="section-description">
              Scope is agreed in your proposal, not a fixed package.
            </p>
          </div>
          <ul className="deliverable-list">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container">
          <SectionHeading
            eyebrow="Our approach"
            title={service.approachHeading || "A plan suited to this work."}
          />
          <ol className="service-process">
            {service.approach.map(([title, description], index) => (
              <li key={title}>
                <span className="process-step">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {family === "ai" && <AIServiceConsiderations slug={service.slug} />}
      <section className="section">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Before you enquire</p>
            <h2>
              Questions about
              <br />
              {service.name.toLowerCase()}.
            </h2>
          </div>
          <div className="faq-list">
            {service.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  <h3>{question}</h3>
                  <Plus
                    size={19}
                    className="accordion-plus"
                    aria-hidden="true"
                  />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section service-final-cta">
        <div className="container cta-layout">
          <div>
            <p className="eyebrow">Discuss your requirements</p>
            <h2>Let's find a practical way forward.</h2>
            <p>
              Share your goal. Your service will be preselected.
            </p>
          </div>
          <Link className="button button-primary" to={enquiry}>
            {service.cta || "Enquire Now"} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
