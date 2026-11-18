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
          <p className="eyebrow">07 / Upcoming products</p>
          <span className="status-badge">
            <span className="status-dot" />
            In Development
          </span>
          <h2 id="product-showcase-title">
            Your social content,<br />in one workspace.
          </h2>
          <p>
            Plan, organise and review social content. A product concept in development.
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
