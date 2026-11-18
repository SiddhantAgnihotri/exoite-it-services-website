import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ContentHighlights from "../components/ui/ContentHighlights";
import ServiceCapabilityVisual from "../components/ui/ServiceCapabilityVisual";
import PageHero from "../components/ui/PageHero";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Technologies from "../components/sections/Technologies";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";


export default function About() {
  return (
    <main className="about-page">
      <PageHero
        label="About Exoite"
        title="A growing company. A practical outlook."
        description="An IT services company in Kanpur, working remotely."
      />
      <section className="section">
        <div className="container split-layout">
          <div className="about-intro">
            <p className="eyebrow">Empowering your digital future</p>
            <h2>Technology is useful when it makes work simpler.</h2>
            <p>Websites, software, AI workflows and practical training for businesses and institutions.</p>
            <ContentHighlights items={["Clear scope and responsibilities", "Reviewable development steps", "Support agreed before commitment"]} />
            <p>Our social content platform is in development. We work remotely across India and internationally.</p>
            <Link className="text-link" to="/services">
              Explore our expertise <ArrowRight size={16} />
            </Link>
          </div>
          <figure className="about-image about-concept"><ServiceCapabilityVisual kind="collaboration" /><figcaption>Original project-workflow concept, not an office or team photograph.</figcaption></figure>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container mission-layout">
          <article>
            <p className="eyebrow">Our mission</p>
            <h2>Make digital progress practical.</h2>
            <p>
              Help businesses and institutions make everyday work simpler with technology.
            </p>
          </article>
          <article>
            <p className="eyebrow">Our vision</p>
            <h2>Grow through useful, thoughtful work.</h2>
            <p>
              Grow through useful software, clear experiences and lasting working relationships.
            </p>
          </article>
        </div>
      </section>
      <WhyChooseUs />
      <Technologies />
      <Process />
      <CTA />
    </main>
  );
}
