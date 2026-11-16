import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SoftwarePreview from "../ui/SoftwarePreview";

export default function ProductShowcase() {
  return (
    <section
      className="section product-editorial"
      aria-labelledby="product-showcase-title"
    >
      <div className="container product-showcase">
        <div className="product-showcase-copy">
          <p className="eyebrow">05 / Building at Exoite</p>
          <span className="status-badge">
            <span className="status-dot" />
            In Development
          </span>
          <h2 id="product-showcase-title">
            A place for the work
            <br />
            behind your content.
          </h2>
          <p>
            Meet Exoite Social Media Platform, our upcoming social media
            management SaaS. We're exploring a more organised way to plan,
            manage and understand social content.
          </p>
          <p className="small-note">
            Publishing, scheduling and reporting are potential product areas,
            not confirmed available features.
          </p>
          <Link to="/products" className="text-link">
            Explore the product direction <ArrowRight size={17} />
          </Link>
        </div>
        <SoftwarePreview compact />
      </div>
    </section>
  );
}
