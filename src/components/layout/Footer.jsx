import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { serviceDetails } from "../../data/serviceDetails";
import logo from "../../assets/images/optimized/brand-mark-84.webp";
import logoLarge from "../../assets/images/optimized/brand-mark-168.webp";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid company-footer-grid">
        <div className="footer-intro">
          <Link className="brand" to="/">
            <img
              src={logo}
              srcSet={`${logo} 84w, ${logoLarge} 168w`}
              sizes="42px"
              width={40}
              height={40}
              alt="Exoite IT Services logo"
            />
            <span>
              <strong>Exoite</strong>
              <span>IT Services</span>
            </span>
          </Link>
          <p>Empowering your digital future</p>
          <p>
            MSME-registered in Kanpur. Websites, software, AI workflows and training for India and beyond.
          </p>
        </div>
        <div className="footer-services">
          <h2>Services</h2>
          <div className="footer-links">
            {serviceDetails.filter(service => service.family !== "ai").map((service) => (
              <Link to={"/services/" + service.slug} key={service.slug}>
                {{ "website-development": "Websites", "custom-software-development": "Custom software", "mobile-app-development": "Mobile apps", "school-institute-solutions": "School & institute tools" }[service.slug] || service.name}
              </Link>
            ))}
            <Link to="/services#ai-automation-solutions">AI & automation</Link>
          </div>
        </div>
        <div className="footer-explore">
          <h2>Explore Exoite</h2>
          <div className="footer-links">
            <Link to="/about">About the company</Link>
            <Link to="/portfolio">Solution studies</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/training">Training programs</Link>
            <Link to="/products">
              Upcoming product <ArrowUpRight size={13} />
            </Link>
            <span className="footer-product-status">
              Exoite Social Media Platform
              <br />
              In Development
            </span>
          </div>
        </div>
        <div className="footer-contact">
          <h2>Start a conversation</h2>
          <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
          <a href={"tel:+" + siteConfig.whatsappNumber}>
            +{siteConfig.whatsappNumber}
          </a>
          <a href={siteConfig.whatsappLink} target="_blank" rel="noreferrer">
            Chat on WhatsApp <ArrowUpRight size={14} />
          </a>
          <p>{siteConfig.location}</p>
          <Link to="/contact" className="footer-enquiry">
            Send an enquiry <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Exoite IT Services. All rights
          reserved.
        </p>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy (draft)</Link>
          <Link to="/terms-of-service">Terms of Service (draft)</Link>
          <button type="button" className="footer-analytics-settings" onClick={() => window.dispatchEvent(new Event("exoite:analytics-settings"))}>Analytics settings</button>
        </div>
      </div>
    </footer>
  );
}
