import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Technologies from "../components/sections/Technologies";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";
import workspace from "../assets/images/optimized/team-workspace-1280.webp";
import workspaceSmall from "../assets/images/optimized/team-workspace-640.webp";
export default function About() {
  return (
    <main className="about-page">
      <PageHero
        label="About Exoite"
        title="A growing company. A practical outlook."
        description="Exoite IT Services is an MSME-registered IT services company based in Kanpur, Uttar Pradesh. We build digital solutions for businesses and institutions across India and internationally."
      />
      <section className="section">
        <div className="container split-layout">
          <div className="about-intro">
            <p className="eyebrow">Empowering Digital Future</p>
            <h2>Technology is useful when it makes work simpler.</h2>
            <p>
              Our work combines website, app and custom software development
              with education technology and IT training experience. Our
              approach is straightforward: understand the need, plan carefully
              and build something useful.
            </p>
            <p>
              Alongside client services, we're developing our own social media
              management SaaS and offering practical IT training and coding
              workshops.
            </p>
            <p>
              We work remotely with clients and keep the process centred on
              clear requirements, agreed responsibilities and reviewable
              development steps. Project scope, timing, ownership and support
              are discussed before commitment.
            </p>
            <Link className="text-link" to="/services">
              Explore our expertise <ArrowRight size={16} />
            </Link>
          </div>
          <figure className="about-image">
            <img
              src={workspace}
              srcSet={workspaceSmall + " 640w, " + workspace + " 1280w"}
              sizes="(min-width: 701px) 45vw, 100vw"
              width={1280}
              height={853}
              loading="lazy"
              decoding="async"
              alt="Illustration of a collaborative technology workspace"
            />
            <figcaption>
              Illustrative workspace, not a photograph of our office or team.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container mission-layout">
          <article>
            <p className="eyebrow">Our mission</p>
            <h2>Make digital progress practical.</h2>
            <p>
              To help businesses and educational institutions use well-planned
              websites, software and training to improve their everyday work and
              digital presence.
            </p>
          </article>
          <article>
            <p className="eyebrow">Our vision</p>
            <h2>Grow through useful, thoughtful work.</h2>
            <p>
              To become a trusted technology partner by building clear user
              experiences, reliable systems and lasting working relationships.
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
