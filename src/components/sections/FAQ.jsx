import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
const faqs = [
  [
    "What kind of businesses do you work with?",
    "We work on websites and digital systems for businesses, startups, schools, institutes and service providers. Based in Kanpur, we serve India and international clients remotely.",
  ],
  [
    "Can you develop software around our existing workflow?",
    "Yes. We begin by understanding your process, users and required features, then discuss a suitable scope for dashboards, portals or custom business software.",
  ],
  [
    "How are project timelines and costs decided?",
    "Scope, features, integrations and design requirements affect the estimate. Share your requirements so we can discuss a plan, timeline and budget.",
  ],
  [
    "Do you provide support after launch?",
    "Maintenance, updates and ongoing improvements can be discussed as part of the project. We agree on the support scope and arrangements with you.",
  ],
  [
    "Is Exoite Social Media Platform available now?",
    "No. It is in development. The interface shown on this website is an illustrative concept; features, supported channels, pricing and availability are not confirmed.",
  ],
];
export default function FAQ() {
  return (
    <section className="section">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">A few answers</p>
          <h2>
            Before we
            <br />
            get started.
          </h2>
          <p className="section-description">Have something else in mind?</p>
          <Link to="/contact" className="text-link">
            Talk to us
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                <h3>{question}</h3>
                <Plus size={19} className="accordion-plus" aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
