import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroMotionVisual from "../ui/HeroMotionVisual";
import "../../styles/hero-motion.css";
const capabilities = [
  ["AI Automation", "ai-automation"],
  ["Website Development", "website-development"],
  ["Custom Software", "custom-software-development"],
  ["Mobile Applications", "mobile-app-development"],
];
export default function Hero() {
  return (
    <section className="hero company-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />IT solutions. Human possibilities.</p>
          <h1>Building Digital Solutions for <span>Modern Businesses.</span></h1>
          <p>Websites, apps and AI workflows for your business.</p>
          <div className="button-row">
            <Link className="button button-primary" to="/contact">Start Your Project <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="button button-secondary" to="/services">Explore Our Services <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <p className="hero-footnote">Based in Kanpur. Building for India and beyond.</p>
        </div>
        <HeroMotionVisual />
      </div>
      <nav className="container hero-service-rail" aria-label="Our core services">
        <span>From idea to everyday impact</span>
        {capabilities.map(([title, slug]) => <Link key={slug} to={"/services/" + slug}>{title}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
      </nav>
    </section>
  );
}
