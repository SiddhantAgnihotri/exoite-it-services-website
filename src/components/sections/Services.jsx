import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";
const order = [
  "website-development",
  "custom-software-development",
  "mobile-app-development",
];
export default function Services() {
  return (
    <section className="section services-editorial" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="01 / Capabilities"
          title="Built around the work
you need to do."
          description="A clear website. A useful application. A better way to run a process. We bring design and development together around your priorities."
        >
          <Link to="/services" className="text-link">
            Explore all services <ArrowUpRight size={17} />
          </Link>
        </SectionHeading>
        <div className="primary-service-composition">
          {order.map((slug, index) => {
            const service = services.find((item) => item.slug === slug);
            return (
              <article
                className={"primary-service primary-service-" + index}
                key={slug}
              >
                <span className="service-number">0{index + 1}</span>
                <h3>
                  <Link to={"/services/" + slug}>{service.title}</Link>
                </h3>
                <p>{service.description}</p>
                <ul>
                  {service.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <div className="service-actions">
                  <Link className="text-link" to={"/services/" + slug}>
                    Explore service <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    className="quiet-link"
                    to={"/contact?service=" + encodeURIComponent(service.title)}
                  >
                    Discuss your requirements
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="supporting-services">
          <p className="supporting-services-label">
            And the expertise
            <br />
            around it.
          </p>
          {services
            .filter((service) => !order.includes(service.slug))
            .map((service) => (
              <article key={service.slug}>
                <h3>
                  <Link to={"/services/" + service.slug}>
                    {service.title}
                    <ArrowUpRight size={15} />
                  </Link>
                </h3>
                <p>{service.short}</p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
