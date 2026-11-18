import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serviceContent } from "../data/visualContent";
import ServiceCapabilityVisual from "../components/ui/ServiceCapabilityVisual";
import PageHero from "../components/ui/PageHero";
import { services } from "../data/services";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";
import AIServicesCategory from "../components/sections/AIServicesCategory";
export default function ServicesPage() {
  return (
    <main className="services-index-page">
      <PageHero
        label="Our services"
        title="Practical technology. Purposeful outcomes."
        description="Websites, software, AI workflows and practical training."
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
                <ServiceCapabilityVisual kind={serviceContent[service.slug].kind} /><p>{serviceContent[service.slug].summary}</p>
                <div className="tag-list">
                  {service.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>

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
      <AIServicesCategory />
      <Process />
      <CTA />
    </main>
  );
}
