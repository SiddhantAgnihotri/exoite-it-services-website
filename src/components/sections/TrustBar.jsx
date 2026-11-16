import { ShieldCheck, MapPin, Code2, MessagesSquare } from "lucide-react";
const indicators = [
  [ShieldCheck, "MSME registered", "A growing IT services company"],
  [MapPin, "Kanpur based", "India & international clients"],
  [Code2, "Built around your needs", "Web, mobile & custom software"],
  [MessagesSquare, "Direct communication", "From first discussion to launch"],
];
export default function TrustBar() {
  return (
    <section className="trust-strip" aria-label="Company and capabilities">
      <div className="container trust-grid">
        {indicators.map(([Icon, title, description]) => (
          <div className="trust-item" key={title}>
            <Icon size={22} aria-hidden="true" />
            <div>
              <p>{title}</p>
              <span>{description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
