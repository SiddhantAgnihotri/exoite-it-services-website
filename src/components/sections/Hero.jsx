import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectImages } from "../../data/projectImages";
const capabilities = [
  ["Website Development", "website-development"],
  ["Mobile App Development", "mobile-app-development"],
  ["Custom Software", "custom-software-development"],
  ["Digital Solutions", "school-institute-solutions"],
];
export default function Hero() {
  return (
    <section className="hero company-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Exoite IT Services
          </p>
          <h1>
            Building Digital Solutions for <span>Modern Businesses.</span>
          </h1>
          <p>
            From professional websites to custom software and mobile
            applications, Exoite IT Services helps businesses turn ideas into
            practical digital experiences.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/contact">
              Start Your Project <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" to="/services">
              Explore Our Services <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-footnote">
            Based in Kanpur. Building for India and beyond.
          </p>
        </div>
        <figure className="hero-interface-atlas">
          <div className="atlas-heading">
            <span>From an idea to an interface.</span>
            <span>01 / Digital experiences</span>
          </div>
          <div className="atlas-main">
            <img
              src={projectImages.examPortal.large}
              srcSet={
                projectImages.examPortal.small +
                " 640w, " +
                projectImages.examPortal.large +
                " 1280w"
              }
              sizes="(min-width: 951px) 50vw, 100vw"
              width={1280}
              height={853}
              fetchPriority="high"
              decoding="async"
              alt="Illustrative Examify examination portal concept"
            />
            <span className="atlas-label">Education / Web applications</span>
          </div>
          <div className="atlas-pair">
            {[
              ["inventory", "Business systems"],
              ["lms", "Cross-device experiences"],
            ].map(([key, label]) => (
              <div key={key}>
                <img
                  src={projectImages[key].large}
                  srcSet={
                    projectImages[key].small +
                    " 640w, " +
                    projectImages[key].large +
                    " 1280w"
                  }
                  sizes="(min-width: 951px) 24vw, 45vw"
                  width={1280}
                  height={853}
                  decoding="async"
                  alt={label + " illustrative interface concept"}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <figcaption>
            Illustrative interface concepts, not verified screenshots or project
            results.
          </figcaption>
        </figure>
      </div>
      <div
        className="container hero-service-rail"
        aria-label="Our core services"
      >
        <span>What we build</span>
        {capabilities.map(([title, slug]) => (
          <Link key={slug} to={"/services/" + slug}>
            {title}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
