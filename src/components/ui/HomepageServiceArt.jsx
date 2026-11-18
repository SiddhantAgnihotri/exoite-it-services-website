import { useState } from "react";
import { ArrowUpRight, Check, Code2, Database, FileText, Grid2X2, Mail, MessageSquare, Pause, Play, Sparkles, Users, UserRound } from "lucide-react";

const descriptions = {
  automation: "Concept workflow connecting an enquiry, AI assistance and human review, with email and business data connections.",
  website: "Illustrative responsive business website, with layered browser windows, a clear offer and an enquiry action.",
  software: "Concept business dashboard with a schematic activity chart, request review and team access. No real business data is shown.",
  mobile: "Illustrative mobile workspace with review tasks, field notes and a connected team note. Not a client application.",
};

function AutomationArt() {
  return <div className="sv-flow-map">
    <svg className="sv-flow-wires" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
      <path className="sv-flow-track" d="M80 150H520" />
      <path className="sv-workflow-signal" d="M80 150H520" />
      <path className="sv-flow-branches" d="M300 30V110 M300 190V270" />
    </svg>
    <div className="sv-flow-tool sv-flow-mail"><Mail size={18} /></div>
    <div className="sv-flow-tool sv-flow-data"><Database size={18} /></div>
    <div className="sv-flow-node"><span className="sv-flow-symbol"><FileText size={25} /></span><strong>Enquiry</strong></div>
    <div className="sv-flow-node sv-flow-ai sv-ai-float"><span className="sv-chip-symbol"><Sparkles size={28} /></span><strong>AI assistance</strong></div>
    <div className="sv-flow-node"><span className="sv-flow-symbol sv-flow-review"><Check size={25} /></span><strong>Human review</strong></div>
  </div>;
}

function WebsiteArt() {
  return <>
    <div className="sv-browser sv-browser-back sv-hover-layer"><div className="sv-browser-chrome"><i /><i /><i /><span /></div><div className="sv-browser-wireframe"><i /><i /><i /></div></div>
    <div className="sv-browser sv-browser-front sv-hover-layer">
      <div className="sv-browser-chrome"><i /><i /><i /><span /></div>
      <div className="sv-web-page">
        <div className="sv-web-copy"><span>Your business</span><strong>A clear offer.</strong><div className="sv-web-lines"><i /><i /></div><span className="sv-web-action">Get in touch <ArrowUpRight size={14} /></span></div>
        <div className="sv-web-poster"><span /><i /><b /></div>
      </div>
    </div>
    <div className="sv-web-responsive sv-hover-layer"><span /><i /><b /><i /></div>
  </>;
}

function SoftwareArt() {
  return <div className="sv-dashboard">
    <div className="sv-dashboard-header"><span><Code2 size={17} />Team workspace</span><i /><i /></div>
    <div className="sv-dashboard-body">
      <div className="sv-dashboard-sidebar"><Grid2X2 size={17} /><FileText size={17} /><Users size={17} /></div>
      <div className="sv-dashboard-main">
        <div className="sv-dashboard-chart"><strong>Activity</strong>
          <svg viewBox="0 0 180 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="sv-chart-grid" d="M4 20H176 M4 50H176 M4 80H176" />
            <path className="sv-chart-area" d="M4 68C16 68 18 46 32 50S52 76 66 54S90 26 105 40S131 67 146 42S162 50 176 36V96H4Z" />
            <path className="sv-chart-line" pathLength="1" strokeDasharray="1" strokeDashoffset="0" d="M4 68C16 68 18 46 32 50S52 76 66 54S90 26 105 40S131 67 146 42S162 50 176 36" />
          </svg>
        </div>
        <div className="sv-dashboard-requests"><strong>Requests</strong><div><i /><span /></div><div><i /><span /></div><span className="sv-review-tag sv-hover-layer"><Check size={13} />Review</span></div>
        <div className="sv-dashboard-access"><Users size={15} /><span>Team access</span><i /><i /><i /></div>
      </div>
    </div>
  </div>;
}

function MobileArt() {
  return <>
    <svg className="sv-app-connector" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true"><path d="M280 140H400Q416 140 416 156V170H480" /></svg>
    <div className="sv-phone-back"><span /><i /><i /><b /></div>
    <div className="sv-phone-float"><div className="sv-phone sv-hover-layer">
      <span className="sv-phone-notch" />
      <div className="sv-phone-screen"><strong>Workspace</strong><div className="sv-phone-preview"><span /><i /><i /></div><div className="sv-phone-task"><Check size={14} /><span>Review</span></div><div className="sv-phone-task"><FileText size={14} /><span>Field note</span></div><div className="sv-phone-nav"><Grid2X2 size={16} /><MessageSquare size={16} /><UserRound size={16} /></div></div>
    </div></div>
    <div className="sv-app-note sv-hover-layer"><strong><MessageSquare size={16} />Team notes</strong><div><i /><i /><i /></div><span><i />Draft</span></div>
  </>;
}

// Dedicated homepage artwork: no shared service-page graphics or client evidence.
export default function HomepageServiceArt({ kind, title, entered, visible }) {
  const [paused, setPaused] = useState(false);
  const canLoop = kind === "automation" || kind === "mobile";
  return <figure data-service-art={kind} className={`service-artwork-frame${entered ? " has-art-entered" : ""}${visible && !paused ? " art-is-playing" : ""}`}>
    <div className={`service-artwork sv-art-${kind}`} role="img" aria-label={descriptions[kind]}>
      <div className="sv-composition" aria-hidden="true">
        <span className="sv-concept-label">Concept</span>
        {kind === "automation" ? <AutomationArt /> : kind === "website" ? <WebsiteArt /> : kind === "software" ? <SoftwareArt /> : <MobileArt />}
      </div>
    </div>
    {canLoop && <button className="service-art-motion-toggle" type="button" aria-label={`${paused ? "Play" : "Pause"} ${title} animation`} disabled={!entered} onClick={() => setPaused(value => !value)}>{paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>}
  </figure>;
}
