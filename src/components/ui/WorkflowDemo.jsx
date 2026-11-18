import { Fragment, useId, useState } from "react";
import "../../styles/workflow-polish.css";
import { ArrowRight, Check, Database, Mail, MessageSquare, RotateCcw, Sparkles } from "lucide-react";
const stages = [
  { title: "Customer enquiry", Icon: MessageSquare, label: "01 / CAPTURE", heading: "A useful starting point.", description: "Capture the request and its business context.", sample: "“We’d like to discuss automating our sales enquiries.”", note: "Synthetic example. No customer data is collected." },
  { title: "AI categorization", Icon: Sparkles, label: "02 / UNDERSTAND", heading: "Make the next step clearer.", description: "Suggest a category using your rules. Queue uncertain requests for review.", sample: "Suggested category: Automation project", note: "AI suggestions need evaluation and human oversight." },
  { title: "CRM record", Icon: Database, label: "03 / CONNECT", heading: "Bring the context together.", description: "Keep the enquiry and suggested category together, subject to permissions.", sample: "Example record · New project · Needs review", note: "Illustration only. No CRM is connected to this demo." },
  { title: "Follow-up suggestion", Icon: Mail, label: "04 / ASSIST", heading: "Keep people in control.", description: "Your team reviews the draft. Nothing is sent automatically.", sample: "Draft: Let’s discuss your workflow and priorities.", note: "Human approval before customer-facing messages." },
];
export default function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const id = useId();
  const stage = stages[active];
  return (
    <figure className="workflow-demo ai-concept">
      <div className="workflow-topbar"><span><Sparkles size={17} aria-hidden="true" />Enquiry → next step</span><span>Interactive example</span></div>
      <div className="workflow-demo-body">
        <noscript><p className="workflow-instruction">Enable JavaScript to explore each step. This static example outlines an enquiry, AI categorization, a CRM record and a human-reviewed follow-up.</p></noscript>
        <p className="workflow-instruction">Select a step to explore the workflow.</p>
        <div className="workflow-progress" aria-hidden="true" style={{ "--workflow-progress": (active + 1) / stages.length }}><span /></div>
        <ol className="workflow-steps" aria-label="Example workflow steps">
          {stages.map(({ title, Icon }, index) => <li key={title} data-state={index < active ? "done" : index === active ? "current" : "upcoming"}><button type="button" aria-pressed={active === index} aria-controls={id + '-detail'} onClick={() => setActive(index)}><span className="workflow-step-icon">{index < active ? <Check size={19} aria-hidden="true" /> : <Icon size={19} aria-hidden="true" />}</span><span>{title}</span><small>0{index + 1}</small></button></li>)}
        </ol>
        <div className="workflow-detail" id={id + '-detail'} aria-live="polite" aria-atomic="true">
          {/* Keyed fragment remounts the content (restarting its CSS entrance) without adding a wrapper. */}
          <Fragment key={active}><span className="workflow-detail-label">{stage.label}</span><h3>{stage.heading}</h3><p>{stage.description}</p><div className="workflow-sample">{stage.sample}</div><p className="workflow-caution">{stage.note}</p></Fragment>
        </div>
        <div className="workflow-demo-actions"><span><Check size={14} aria-hidden="true" /> Human review included</span><button type="button" onClick={() => setActive(active === stages.length - 1 ? 0 : active + 1)}>{active === stages.length - 1 ? <>Restart example <RotateCcw size={15} aria-hidden="true" /></> : <>Next step <ArrowRight size={15} aria-hidden="true" /></>}</button></div>
      </div>
      <figcaption>Illustrative workflow. No live tools connected or messages sent.</figcaption>
    </figure>
  );
}
