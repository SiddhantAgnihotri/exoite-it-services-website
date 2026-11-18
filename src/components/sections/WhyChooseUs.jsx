import { ArrowUpRight, Compass, PanelsTopLeft, MessagesSquare, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
const valueIcons = [Compass, PanelsTopLeft, MessagesSquare, LifeBuoy];
const values = [
  [
    "Clarity before code",
    "Agree the workflow and direction before development.",
  ],
  [
    "A considered user experience",
    "Clear interfaces for real tasks, across devices.",
  ],
  [
    "Communication throughout",
    "Keep requirements and decisions visible.",
  ],
  [
    "A plan beyond launch",
    "Agree maintenance and support within your scope.",
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
            Design, development and clear working agreements.
          </p>
          <Link className="text-link" to="/about">
            Get to know Exoite <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="value-list">
          {values.map(([title, description], index) => { const Icon = valueIcons[index]; return (
            <article key={title}>
              <Icon className="value-icon" size={26} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ); })}
        </div>
      </div>
    </section>
  );
}
