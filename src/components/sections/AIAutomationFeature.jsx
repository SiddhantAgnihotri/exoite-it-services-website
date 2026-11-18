import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import WorkflowDemo from "../ui/WorkflowDemo";
export default function AIAutomationFeature() {
  return (
    <section className="section ai-feature" aria-labelledby="ai-feature-title">
      <div className="container ai-feature-layout">
        <div className="ai-feature-copy">
          <p className="eyebrow">03 / AI & automation</p>
          <h2 id="ai-feature-title">Automate Your Business with Intelligent AI.</h2>
          <p>Connect repetitive tasks with AI assistance and human review.</p>
          <ul className="ai-capabilities">{["Lead and enquiry routing", "Human-reviewed replies", "CRM and document workflows"].map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
          <div className="button-row"><Link className="button button-white" to="/services/ai-automation">Explore AI Automation <ArrowRight size={17} aria-hidden="true" /></Link></div>
          <p className="small-note">Potential solutions, not claims of completed AI client projects.</p>
        </div>
        <WorkflowDemo />
      </div>
    </section>
  );
}
