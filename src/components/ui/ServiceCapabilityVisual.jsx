import { ArrowDown, Check, FileText, Globe2, Smartphone, Sparkles, BookOpen, GraduationCap, Search, Code2, MessageSquare, UserRound, GitBranch, Mail, Database } from "lucide-react";

// Original capability illustrations, never screenshots or delivered-project evidence.
export default function ServiceCapabilityVisual({ kind }) {
  return <div className={`capability-art capability-${kind}`} aria-hidden="true">
    {kind === "automation" ? <>
      <div className="capability-heading"><Sparkles size={18} /> Enquiry workflow</div>
      <div className="capability-node"><FileText size={17} /><span>Capture context</span></div>
      <ArrowDown className="capability-connector" size={15} />
      <div className="capability-node"><Check size={17} /><span>Human review</span></div>
    </> : kind === "website" ? <>
      <div className="capability-heading"><Globe2 size={18} /> Your business online</div>
      <div className="capability-site"><span>YOUR BUSINESS</span><strong>A clear offer.<br />An easy next step.</strong><span className="capability-action">Get in touch ↗</span></div>
    </> : kind === "software" ? <>
      <div className="capability-heading"><FileText size={18} /> Approval workspace</div>
      <div className="capability-record capability-record-label"><span>Request</span><span>Status</span></div>
      <div className="capability-record"><strong>Stock update</strong><span>Review</span></div>
      <div className="capability-record"><strong>Item record</strong><span><Check size={13} /> Approved</span></div>
      <p className="capability-footnote">Access by role</p>
    </> : kind === "mobile" ? <>
      <div className="capability-heading"><Smartphone size={18} /> Work on the move</div>
      <div className="capability-app"><strong>Your daily tasks</strong><span><Check size={15} /> Review a request</span><span><FileText size={15} /> Add a field note</span><span className="capability-action">Open workspace ↗</span></div>
    </> : kind === "education" ? <>
      <div className="capability-heading"><GraduationCap size={20} /> Learning workspace</div>
      <div className="capability-learning"><span><BookOpen size={22} /> Course materials</span><span><FileText size={22} /> Assignments</span><span><MessageSquare size={22} /> Teacher feedback</span></div>
      <p className="capability-footnote">Learner · Teacher · Administration</p>
    </> : kind === "marketing" ? <>
      <div className="capability-heading"><Search size={20} /> Make your offer discoverable</div>
      <div className="capability-search"><Search size={18} /><span>Find the right service</span></div>
      <div className="capability-search-result"><strong>Your business. A clear offer.</strong><span>Useful content → Website → Enquiry</span></div>
      <div className="capability-topic-row"><span>Search</span><span>Content</span><span>Brand</span></div>
    </> : kind === "training" ? <>
      <div className="capability-heading"><Code2 size={20} /> Learn through practice</div>
      <div className="capability-code"><span>WORKSHOP / EXAMPLE</span><code>learn();<br />build();<br />review();</code></div>
      <div className="capability-topic-row"><span>Guided tasks</span><span>Project feedback</span></div>
    </> : kind === "chatbot" ? <>
      <div className="capability-heading"><MessageSquare size={20} /> Business assistant</div>
      <div className="capability-chat">Can you help me find a service?</div>
      <div className="capability-chat answer">Use approved information.<br />Offer a human handoff.</div>
      <p className="capability-footnote"><UserRound size={16} /> Your team stays in control</p>
    </> : kind === "integration" ? <>
      <div className="capability-heading"><GitBranch size={20} /> Connected tools</div>
      <div className="capability-connections"><span><Mail size={22} /> Email</span><span><GitBranch size={22} /> API / review</span><span><Database size={22} /> CRM</span></div>
      <p className="capability-footnote">Validate → Approve → Connect</p>
    </> : kind === "dashboard" ? <>
      <div className="capability-heading"><Sparkles size={20} /> AI inside your workspace</div>
      <div className="capability-node"><FileText size={19} /><span>Draft a summary</span></div>
      <div className="capability-node"><Search size={19} /><span>Find approved knowledge</span></div>
      <div className="capability-node"><UserRound size={19} /><span>Review before action</span></div>
    </> : <>
      <div className="capability-heading"><UserRound size={20} /> A shared project workspace</div>
      <div className="capability-connections"><span><MessageSquare size={22} /> Your goals</span><span><Code2 size={22} /> A prototype</span><span><Check size={22} /> Team review</span></div>
      <p className="capability-footnote">Clear scope · Visible progress · Handover</p>
    </>}
  </div>;
}
