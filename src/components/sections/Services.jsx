import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Braces, Globe2, Smartphone, Sparkles } from "lucide-react";
import { services } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";
import HomepageServiceArt from "../ui/HomepageServiceArt";
import "../../styles/services-motion.css";
const core = [
  { title: "AI Automation", slug: "ai-automation", Icon: Sparkles, label: "CONNECT & SIMPLIFY", description: "Connected tasks, AI assistance and human review.", tags: ["Intelligent workflows", "Chatbots", "Business integrations"], kind: "automation" },
  { title: "Website Development", slug: "website-development", Icon: Globe2, label: "MAKE YOUR FIRST IMPRESSION COUNT", description: "Explain your offer. Turn visits into enquiries.", tags: ["Business websites", "Web applications", "Customer journeys"], kind: "website" },
  { title: "Custom Software", slug: "custom-software-development", Icon: Braces, label: "BUILD AROUND THE WAY YOU WORK", description: "Your workflows, records and team tools, connected.", tags: ["Business systems", "Dashboards & portals", "Connected tools"], kind: "software" },
  { title: "Mobile Applications", slug: "mobile-app-development", Icon: Smartphone, label: "PUT POSSIBILITY IN YOUR HANDS", description: "Customer and team tasks, made for mobile.", tags: ["Cross-platform apps", "Customer experiences", "Internal tools"], kind: "mobile" },
];
export default function Services() {
  const sectionRef = useRef(null);
  const [artViews, setArtViews] = useState({});
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const artworks = [...sectionRef.current.querySelectorAll("[data-service-art]")];
    const update = entries => setArtViews(current => {
      const next = { ...current };
      for (const entry of entries) {
        const kind = entry.target.dataset.serviceArt;
        next[kind] = { visible: entry.isIntersecting, entered: entry.isIntersecting || !!current[kind]?.entered };
      }
      return next;
    });
    let observer;
    let frame;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(update, { threshold: 0.12 });
      artworks.forEach(art => observer.observe(art));
    } else {
      frame = requestAnimationFrame(() => update(artworks.map(target => ({ target, isIntersecting: true }))));
    }
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
  return (
    <section ref={sectionRef} className="section services-editorial" id="services">
      <div className="container">
        <SectionHeading eyebrow="02 / Our core services" title={"Websites, software\nand connected workflows."} description="Choose a service. Connect it to your business goals.">
          <Link to="/services" className="text-link">Explore all services <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </SectionHeading>
        <div className="home-service-list">
          {core.map(({ title, slug, Icon, description, kind }, index) => <article className={"home-service home-service-" + kind} key={slug}>
            <div className="home-service-title"><span className="home-service-index">0{index + 1}</span><Icon size={24} aria-hidden="true" /><h3><Link to={"/services/" + slug}>{title}</Link></h3></div>
            <div className="home-service-copy"><p>{description}</p><Link className="text-link" to={"/services/" + slug}>Explore service <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            <HomepageServiceArt kind={kind} title={title} entered={!!artViews[kind]?.entered} visible={!!artViews[kind]?.visible && pageVisible} />
          </article>)}
        </div>
        <div className="supporting-services"><p className="supporting-services-label">More ways we can help.</p>{services.filter(service => ["school-institute-solutions", "digital-marketing", "it-training"].includes(service.slug)).map(service => <article key={service.slug}><h3><Link to={"/services/" + service.slug}>{service.title}<ArrowUpRight size={16} aria-hidden="true" /></Link></h3><p>{service.short}</p></article>)}</div>
      </div>
    </section>
  );
}
