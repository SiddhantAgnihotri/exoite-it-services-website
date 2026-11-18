import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aiCategory, aiServices, aiDisclosure } from "../../data/aiServices";
import { serviceContent } from "../../data/visualContent";
import ServiceCapabilityVisual from "../ui/ServiceCapabilityVisual";
import SectionHeading from "../ui/SectionHeading";

export default function AIServicesCategory() {
  return (
    <section className="section section-neutral ai-services-category" id="ai-automation-solutions">
      <div className="container">
        <SectionHeading eyebrow="Custom AI-powered development" title={aiCategory} description="Automation, assistants and connected business tools." />
        <p className="ai-disclosure">{aiDisclosure}</p>
        <div className="ai-services-grid">
          {aiServices.map(service => (
            <article key={service.slug}>
              <span className="ai-board-label">AI & automation</span>
              <h3><Link to={"/services/" + service.slug}>{service.name}</Link></h3>
              <ServiceCapabilityVisual kind={serviceContent[service.slug].kind} /><p>{serviceContent[service.slug].intro}</p>
              <Link className="text-link" to={"/services/" + service.slug}>Explore {service.name} <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link className="quiet-link" to={"/contact?service=" + encodeURIComponent(service.enquiry)}>Discuss this service</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
