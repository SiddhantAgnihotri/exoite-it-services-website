import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Flutter",
  "React Native",
  "Cloudinary",
  "Vercel",
];
export default function Technologies() {
  return (
    <section className="section section-neutral">
      <div className="container expertise-layout">
        <div>
          <p className="eyebrow">Our toolkit</p>
          <h2>
            Good choices.
            <br />
            Solid foundations.
          </h2>
          <p className="section-description">
            We choose technologies around the requirements, the people using
            your product and how it needs to grow.
          </p>
          <Link to="/services" className="text-link">
            Explore our expertise <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="technology-list" aria-label="Technologies we use">
          {technologies.map((tech, index) => (
            <li key={tech}>
              <span className="tech-initial" aria-hidden="true">
                {tech.slice(0, 2)}
              </span>
              {tech}
              <span className="tech-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
