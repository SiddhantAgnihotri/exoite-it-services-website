import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
const industries = [
  [
    "Schools and educational institutions",
    "Institution websites, admissions information, assessment portals and administrative workflows.",
    "school-institute-solutions",
  ],
  [
    "Coaching and training institutes",
    "Course information, batch-related workflows, learner access and learning platforms.",
    "school-institute-solutions",
  ],
  [
    "Retail and e-commerce businesses",
    "Product information, catalogue planning, inventory workflows and customer enquiries.",
    "custom-software-development",
  ],
  [
    "Healthcare and clinics",
    "Public service information, appointment enquiries and scoped administrative tools. Patient-data workflows need a separate privacy and access review.",
    "website-development",
  ],
  [
    "Restaurants and hospitality",
    "Menus, property or venue information, booking enquiries and operational workflows.",
    "website-development",
  ],
  [
    "Startups and professional services",
    "Business websites, product prototypes, client portals and purpose-built internal tools.",
    "custom-software-development",
  ],
];
export default function Industries() {
  return (
    <section className="section industries-editorial" id="industries">
      <div className="container industries-layout">
        <div className="industry-introduction">
          <p className="eyebrow">03 / Relevant to your world</p>
          <h2>Different contexts. The same care for the details.</h2>
          <p>
            Education, commerce and everyday services each have their own
            people, processes and constraints.
          </p>
          <div className="industry-pullquote">
            <span>Education technology</span>
            <p>Built around learners. Considered for the people behind them.</p>
            <Link to="/services/school-institute-solutions">
              Explore education solutions <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="small-note">
            Potential use cases, not a claim of prior client work in these
            sectors.
          </p>
        </div>
        <div className="industry-rows">
          {industries.map(([title, description, slug], index) => (
            <details key={title} open={index === 0}>
              <summary>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <Plus size={17} className="accordion-plus" aria-hidden="true" />
              </summary>
              <p>{description}</p>
              <Link to={"/services/" + slug} className="text-link">
                Explore a relevant service <ArrowUpRight size={15} />
              </Link>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
