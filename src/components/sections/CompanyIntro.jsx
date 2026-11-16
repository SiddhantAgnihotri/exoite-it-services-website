import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const toolkit = ["React", "Node.js", "Flutter", "Python", "MongoDB", "MySQL"];
export default function CompanyIntro() {
  return (
    <section className="section company-editorial">
      <div className="container company-editorial-layout">
        <div>
          <p className="eyebrow">04 / The company behind the work</p>
          <h2>Small enough to listen. Focused on what matters.</h2>
          <Link className="text-link" to="/about">
            Meet Exoite <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="company-story">
          <p className="company-lead">
            Exoite IT Services brings software engineering and education
            technology experience to practical business challenges.
          </p>
          <p>
            We are an MSME-registered business based in Kanpur, working remotely
            with clients across India and internationally. We start with the
            requirements, agree the scope and keep the work connected to the
            people who will use it.
          </p>
          <div className="company-facts">
            <span>MSME registered</span>
            <span>Kanpur, India</span>
            <span>Remote collaboration</span>
          </div>
          <div className="company-toolkit">
            <span>Tools, chosen for the task</span>
            <p>{toolkit.join(" / ")}</p>
            <Link to="/services" className="quiet-link">
              Explore our approach to development
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
