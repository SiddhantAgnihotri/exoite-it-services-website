import ServiceVisual from "../components/ui/ServiceVisual";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { serviceDetails } from "../data/serviceDetails";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceDetails.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const enquiry = `/contact?service=${encodeURIComponent(service.enquiry)}`;
  const family = ["school-institute-solutions", "it-training"].includes(
    service.slug,
  )
    ? "education"
    : service.slug === "digital-marketing"
      ? "advisory"
      : "engineering";
  return (
    <main className={"service-detail-page service-family-" + family}>
      <Breadcrumbs />
      <PageHero
        variant={family}
        visual={
          family !== "advisory" ? <ServiceVisual slug={service.slug} /> : null
        }
        label={service.name}
        title={service.title}
        description={service.description}
      >
        <Link className="button button-primary" to={enquiry}>
          Enquire Now <ArrowRight size={16} />
        </Link>
      </PageHero>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Service overview</p>
            <h2>A clear starting point for your project.</h2>
          </div>
          <div className="prose">
            <p>{service.overview}</p>
            <h3 className="content-subheading">Who this is for</h3>
            <p>{service.audience}</p>
          </div>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container">
          <SectionHeading
            eyebrow="Common use cases"
            title="Where this service can help."
          />
          <div className="use-case-grid">
            {service.useCases.map(([title, description]) => (
              <article key={title}>
                <span className="use-case-number">
                  0{service.useCases.findIndex((item) => item[0] === title) + 1}
                </span>
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
            <p className="eyebrow">Features & deliverables</p>
            <h2>
              Define the work.
              <br />
              Agree the responsibilities.
            </h2>
            <p className="section-description">
              The final scope is set in your proposal. These are the areas we
              can discuss, rather than a fixed package or price.
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
            title="A plan suited to this work."
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
              Share your goals, budget range and timing, if known. Your service
              will be selected in the enquiry form.
            </p>
          </div>
          <Link className="button button-primary" to={enquiry}>
            Enquire Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
