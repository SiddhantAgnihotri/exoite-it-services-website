import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { services } from "../data/services";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";
export default function ServicesPage() {
  return (
    <main className="services-index-page">
      <PageHero
        label="Our services"
        title="Practical technology. Purposeful outcomes."
        description="Website, app and custom software development, digital marketing and IT training. Planned around your business, your audience and the way you work."
      />
      <section className="section">
        <div className="container service-detail-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-detail" key={service.title}>
                <Icon
                  className="service-detail-icon"
                  size={27}
                  aria-hidden="true"
                />
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <div className="tag-list">
                  {service.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
                <p className="service-outcome">{service.outcome}</p>
                <Link
                  className="text-link service-read-more"
                  to={"/services/" + service.slug}
                >
                  Explore this service <ArrowRight size={16} />
                </Link>
                <Link
                  className="text-link"
                  to={"/contact?service=" + encodeURIComponent(service.title)}
                >
                  Enquire about this service <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <Process />
      <CTA />
    </main>
  );
}
