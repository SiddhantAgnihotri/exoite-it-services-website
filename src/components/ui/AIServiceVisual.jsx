import { ArrowDown, Check, FileText, GitBranch, Inbox, Mail, Database, MessageSquare, ShieldCheck, Sparkles, UserRound } from "lucide-react";

const pipeline = [
  [Inbox, "01", "New enquiry", "Capture agreed fields", "Received", "blue"],
  [Sparkles, "02", "AI-assisted review", "Classify against your rules", "Draft", "violet"],
  [UserRound, "03", "Human approval", "Check context and exceptions", "Review", "amber"],
  [GitBranch, "04", "Connected action", "Create the approved CRM task", "Approved", "green"],
];

export default function AIServiceVisual({ variant = "workflow" }) {
  const chatbot = variant === "chatbot";
  const dashboard = variant === "dashboard";
  const title = chatbot ? "Your business assistant" : dashboard ? "Operations workspace" : variant === "integration" ? "Connected workflow" : "From enquiry to action";
  return (
    <figure className={"ai-concept ai-concept-" + variant}>
      <div className="ai-concept-bar">
        <span className="ai-concept-mark"><Sparkles size={17} aria-hidden="true" /></span>
        <span>{title}<small>Exoite / illustrative concept</small></span>
        <span className="ai-concept-label">Preview</span>
      </div>
      <div className="ai-concept-body">
        {chatbot ? (
          <div className="ai-conversation">
            <p className="ai-knowledge"><ShieldCheck size={15} aria-hidden="true" /> Approved knowledge only</p>
            <div className="ai-chat-message ai-chat-user"><span>Visitor</span><p>Can I arrange a product demo?</p></div>
            <div className="ai-chat-message"><span>Business assistant · example response</span><p>Here is the approved information. For pricing or availability, I can connect you with the team.</p><small>Source: example product FAQ</small></div>
            <p className="ai-human-handoff"><UserRound size={16} aria-hidden="true" /> Human handoff available</p>
          </div>
        ) : variant === "integration" ? (
          <div className="ai-connected-tools"><p className="ai-board-label">Supported APIs · scoped permissions</p><div className="tool-source"><Mail size={28} aria-hidden="true" /><strong>Email or web form</strong><span>Agreed input</span></div><ArrowDown size={22} className="tool-connector" aria-hidden="true" /><div className="tool-review"><GitBranch size={28} aria-hidden="true" /><strong>Validate + AI assist</strong><span>Review exceptions</span></div><ArrowDown size={22} className="tool-connector" aria-hidden="true" /><div className="tool-destination"><Database size={28} aria-hidden="true" /><strong>CRM or business tool</strong><span>Approved action</span></div><p className="ai-knowledge"><ShieldCheck size={16} aria-hidden="true" /> Permissions checked at each handoff</p></div>
        ) : dashboard ? (
          <div className="ai-dashboard">
            <p className="ai-board-label">Sample review queue</p>
            <h3>Assistance, with oversight.</h3>
            <ul>
              {[[FileText, "Document summary", "Needs review"], [MessageSquare, "Customer response", "Draft prepared"], [GitBranch, "CRM record update", "Awaiting approval"]].map(([Icon, label, status]) => (
                <li key={label}><Icon size={19} aria-hidden="true" /><div><strong>{label}</strong><span>{status}</span></div><ArrowDown size={15} aria-hidden="true" /></li>
              ))}
            </ul>
            <p className="ai-knowledge"><ShieldCheck size={15} aria-hidden="true" /> Role-based access · approval history</p>
          </div>
        ) : (
          <>
            <div className="ai-flow-heading"><p className="ai-board-label">Example automation pipeline</p><span><span className="status-dot" /> Human review included</span></div>
            <ol className="ai-pipeline">
              {pipeline.map(([Icon, step, label, description, status, color]) => (
                <li key={step}>
                  <span className={"ai-node-icon ai-node-" + color}><Icon size={20} aria-hidden="true" /></span>
                  <div><strong>{label}</strong><p>{description}</p></div>
                  <span className={"ai-node-status ai-node-" + color}>{status}</span>
                </li>
              ))}
            </ol>
            <div className="ai-flow-footer"><span><Check size={15} aria-hidden="true" /> Defined permissions</span><span><Check size={15} aria-hidden="true" /> Traceable actions</span></div>
          </>
        )}
      </div>
      <figcaption>Illustrative concept. Not a completed client implementation.</figcaption>
    </figure>
  );
}
