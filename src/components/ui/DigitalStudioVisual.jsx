import { ArrowDown, ArrowUpRight, Braces, Check, Globe2, LayoutDashboard, MessageSquare, Smartphone, Sparkles } from "lucide-react";

// Original interface artwork. These are capabilities, not client applications.
export default function DigitalStudioVisual() {
  return (
    <figure className="digital-studio">
      <div className="studio-canvas" aria-hidden="true">
        <div className="studio-window">
          <div className="studio-window-bar"><span className="studio-mark">e.</span><span>Connected by design.</span><span className="studio-window-dots">•••</span></div>
          <div className="studio-window-body">
            <div className="studio-sidebar"><LayoutDashboard /><Sparkles /><MessageSquare /><Braces /></div>
            <div className="studio-system">
              <span className="studio-overline">YOUR BUSINESS, CONNECTED</span>
              <strong>Less repetition.<br />More possibility.</strong>
              <div className="studio-flow-node"><MessageSquare /><div><b>New enquiry</b><span>Website → workspace</span></div><Check /></div>
              <ArrowDown className="studio-connector" />
              <div className="studio-flow-node studio-node-violet"><Sparkles /><div><b>AI-assisted review</b><span>Understand. Organise.</span></div><Check /></div>
              <ArrowDown className="studio-connector" />
              <div className="studio-flow-node studio-node-green"><Check /><div><b>Ready for your team</b><span>A clear next step</span></div></div>
            </div>
          </div>
        </div>
        <div className="studio-website">
          <div className="studio-browser-bar"><span>•••</span><Globe2 size={12} /> Website experience</div>
          <div className="studio-site-content"><span>BUILT AROUND YOU</span><strong>A clearer<br />digital presence.</strong><p>A website that moves<br />your business forward.</p><span className="studio-site-action">Let’s build it <ArrowUpRight size={12} /></span></div>
          <div className="studio-site-bottom"><span /><span /><span /></div>
        </div>
        <div className="studio-mobile">
          <div className="studio-phone-camera" />
          <div className="studio-mobile-heading"><Smartphone size={14} /><span>On the move.</span></div>
          <strong>Your work.<br />Within reach.</strong>
          <div className="studio-mobile-tile"><span><Check size={13} /> Tasks</span><b>Ready to review</b></div>
          <div className="studio-mobile-lines"><i /><i /><i /></div>
          <div className="studio-mobile-nav"><LayoutDashboard /><MessageSquare /><Sparkles /></div>
        </div>
        <div className="studio-caption-chip"><Braces size={17} /><span>Custom software.<br /><b>One connected experience.</b></span></div>
      </div>
      <div className="studio-mobile-composition" aria-hidden="true">
        <div className="studio-mobile-bar"><span className="brand-square">e.</span> A connected workspace <Braces size={20} /></div>
        <div className="studio-mobile-content">
          <span className="studio-mobile-label">FROM ENQUIRY TO ACTION</span>
          <strong>Less repetition.<br />More room for your team.</strong>
          <div className="studio-mobile-step"><MessageSquare /><div><b>Capture an enquiry</b><span>Keep the context together</span></div></div>
          <div className="studio-mobile-step violet"><Sparkles /><div><b>AI-assisted review</b><span>Your rules. Human oversight.</span></div></div>
          <div className="studio-mobile-step green"><Check /><div><b>Ready for your team</b><span>Review the next step</span></div></div>
          <div className="studio-mobile-capabilities"><span><Globe2 size={17} /> Websites</span><span><Smartphone size={17} /> Mobile apps</span></div>
        </div>
      </div>
      <figcaption>Original interface concepts. Not client screenshots.</figcaption>
    </figure>
  );
}
