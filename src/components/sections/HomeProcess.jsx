import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Process from "./Process";
import FAQ from "./FAQ";
export default function HomeProcess() {
  return (
    <section className="section home-process" id="how-we-work">
      <div className="container">
        <div className="home-process-intro"><div><p className="eyebrow">06 / How we work</p><h2>A clear process.<br />A shared direction.</h2></div><div><p>Agree the scope. Review progress. Plan the handover.</p><Link className="text-link" to="/contact">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
        <Process embedded />
        <FAQ embedded />
      </div>
    </section>
  );
}
