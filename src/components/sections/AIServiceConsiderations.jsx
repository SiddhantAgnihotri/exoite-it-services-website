import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, GitBranch, Mail, Workflow, LockKeyhole, Database, UserRound, ShieldCheck } from "lucide-react";
import { aiIntegrations, aiPrivacy, aiServices } from "../../data/aiServices";
import SectionHeading from "../ui/SectionHeading";
const integrationIcons = [Sparkles, GitBranch, Mail, Workflow];
const integrationSummaries = ["Choose a model for the task and data policy.", "Connect supported endpoints with defined permissions.", "Prepare records and drafts with approval gates.", "Coordinate triggers, retries and human review."];
const privacyIcons = [LockKeyhole, Database, UserRound, ShieldCheck];
const privacySummaries = ["Limit access to approved sources and user roles.", "Agree provider access, retention and deletion.", "AI can be wrong. Keep review and fallback paths.", "Protect credentials and validate inputs."];
function ConsiderationCards({ items, icons, summaries }) {
  return <div className="ai-consideration-grid">{items.map(([title, body], index) => { const Icon = icons[index]; return <article key={title}><Icon className="consideration-icon" size={25} aria-hidden="true" /><h3>{title}</h3><p>{summaries[index]}</p><details className="content-detail"><summary>Technical scope<span className="sr-only">: {title}</span></summary><p>{body}</p></details></article>; })}</div>;
}
export default function AIServiceConsiderations({ slug }) {
  return <>
    <section className="section ai-integration-section"><div className="container">
      <SectionHeading eyebrow="Supported integration approaches" title="The right connection for the job." description="Feasibility depends on API access, permissions and provider terms." />
      <ConsiderationCards items={aiIntegrations} icons={integrationIcons} summaries={integrationSummaries} />
    </div></section>
    <section className="section section-neutral"><div className="container">
      <SectionHeading eyebrow="Security & privacy considerations" title="Control is part of the design." description="Set data boundaries, review responsibilities and operating limits." />
      <ConsiderationCards items={aiPrivacy} icons={privacyIcons} summaries={privacySummaries} />
    </div></section>
    <section className="section ai-related-services"><div className="container"><p className="eyebrow">Explore AI & automation</p><h2>A focused service for your next step.</h2><ul>{aiServices.filter(service => service.slug !== slug).map(service => <li key={service.slug}><Link className="text-link" to={"/services/" + service.slug}>{service.name}<ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul></div></section>
  </>;
}
