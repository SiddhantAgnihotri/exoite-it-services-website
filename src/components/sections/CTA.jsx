import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
export default function CTA() {
  return (
    <section className="contact-cta" id="contact">
      <div className="container cta-layout">
        <div>
          <p className="eyebrow">Let's talk about it</p>
          <h2>Have a Project in Mind?</h2>
          <p>
            A website, an app or a system that makes work simpler. Tell us where
            you want to go.
          </p>
        </div>
        <div className="cta-actions">
          <Link className="button button-white" to="/contact">
            Start Your Project <ArrowUpRight size={17} />
          </Link>
          <a href={"mailto:" + siteConfig.email} className="cta-email">
            {siteConfig.email}
          </a>
          <a
            className="cta-secondary"
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Or talk to us on WhatsApp <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
