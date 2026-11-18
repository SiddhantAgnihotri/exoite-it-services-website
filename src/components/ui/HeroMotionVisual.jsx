import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Code2, MessageSquare, Pause, Play, Sparkles } from "lucide-react";

// Original capability illustration. It does not depict a shipped client product.
export default function HeroMotionVisual() {
  const visualRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = visualRef.current;
    const reveal = visible => {
      setInView(visible);
      if (visible) setEntered(true);
    };
    let observer;
    let frame;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(([entry]) => reveal(entry.isIntersecting), { threshold: 0.08 });
      observer.observe(element);
    } else {
      frame = requestAnimationFrame(() => reveal(true));
    }
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const playing = inView && pageVisible && !paused;
  return (
    <figure ref={visualRef} className={`hero-motion-visual${entered ? " has-entered" : ""}${playing ? " is-playing" : ""}`}>
      <div className="hero-motion-stage" role="img" aria-label="Illustrative workflow connecting websites and apps to AI-assisted organisation and a human review step.">
        <div className="hero-art-heading" aria-hidden="true">
          <span className="hero-art-kicker">SOFTWARE + AI AUTOMATION</span>
          <strong>Your tools. One flow.</strong>
        </div>
        <div className="hero-art-diagram" aria-hidden="true">
          <svg className="hero-art-wires hero-art-wires-wide" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
            <path className="hero-wire-base" d="M230 84H390 M450 150V180Q450 194 436 194H314Q300 194 300 208V232" />
            <path className="hero-wire-signal" d="M230 84H390 M450 150V180Q450 194 436 194H314Q300 194 300 208V232" />
          </svg>
          <svg className="hero-art-wires hero-art-wires-mobile" viewBox="0 0 320 336" preserveAspectRatio="none" aria-hidden="true">
            <path className="hero-wire-base" d="M160 78V116 M160 210V254" />
            <path className="hero-wire-signal" d="M160 78V116 M160 210V254" />
          </svg>
          <div className="hero-art-source">
            <div className="hero-art-source-title"><Code2 size={20} /><span>Websites &amp; apps</span></div>
            <div className="hero-art-enquiry"><MessageSquare size={18} /><strong>New enquiry</strong><span className="hero-art-status" /></div>
            <div className="hero-art-context"><i /><i /></div>
          </div>
          <div className="hero-art-core">
            <span className="hero-art-ai-icon"><Sparkles size={26} /></span>
            <div><strong>AI-assisted workflows</strong><span>Your rules. Clear context.</span></div>
          </div>
          <div className="hero-art-handoff">
            <span className="hero-art-check"><Check size={22} /></span>
            <div><strong>Your team, in control.</strong><span>Review before the next step.</span></div>
            <ArrowUpRight className="hero-art-handoff-arrow" size={22} />
          </div>
        </div>
        <div className="hero-art-foundation" aria-hidden="true"><span />Built around your business<span /></div>
      </div>
      <figcaption>
        <p>Original workflow concept. Not client software.</p>
        <button className="hero-motion-toggle" type="button" disabled={!entered} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </figcaption>
    </figure>
  );
}
