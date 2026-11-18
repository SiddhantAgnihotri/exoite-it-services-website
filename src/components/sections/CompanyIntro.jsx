import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, MapPin, MessagesSquare, ShieldCheck } from "lucide-react";
const facts = [
  [ShieldCheck, "MSME registered", "An independent IT services company"],
  [MapPin, "Kanpur, India", "Working remotely, across borders"],
  [Code2, "Built around your needs", "The right tools for the task"],
  [MessagesSquare, "Direct collaboration", "Clear scope. Shared decisions."],
];
export default function CompanyIntro() {
  return (
    <section className="section home-introduction" id="company">
      <div className="container">
        <div className="home-intro-layout">
          <div><p className="eyebrow">01 / Meet Exoite</p><h2>Built around your work.<br /><span>Planned with your team.</span></h2></div>
          <div className="home-intro-copy"><p>Your business goals. A clear project scope.</p><p>Websites, business tools and automation, planned with your team.</p><Link className="text-link" to="/about">Get to know Exoite <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
        <div className="home-company-facts">
          {facts.map(([Icon, title, text]) => <div key={title}><Icon size={21} aria-hidden="true" /><div><strong>{title}</strong><span>{text}</span></div></div>)}
        </div>
      </div>
    </section>
  );
}
