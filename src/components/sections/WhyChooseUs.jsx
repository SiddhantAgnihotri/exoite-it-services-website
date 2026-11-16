import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
const values = [
  [
    "Clarity before code",
    "We ask questions, understand the workflow and agree on a practical direction before development begins.",
  ],
  [
    "A considered user experience",
    "Clean interfaces and responsive layouts help people understand what to do and get on with their work.",
  ],
  [
    "Communication throughout",
    "Direct conversations and requirement reviews keep the work connected to your business goals.",
  ],
  [
    "A plan beyond launch",
    "Discuss maintenance, updates and ongoing support as part of a clear project scope.",
  ],
];
export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container why-layout">
        <div>
          <p className="eyebrow">Why Exoite</p>
          <h2>
            A practical partner.
            <br />A shared direction.
          </h2>
          <p className="section-description">
            Good software begins with understanding. We bring design,
            development and a straightforward working approach together.
          </p>
          <Link className="text-link" to="/about">
            Get to know Exoite <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="value-list">
          {values.map(([title, description], index) => (
            <article key={title}>
              <span className="list-number">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
