import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import { projectImages } from "../../data/projectImages";

export default function WorkFeature({
  project,
  index = 0,
  featured = false,
  detailed = false,
}) {
  const image = project.visual || projectImages[project.imageKey];
  const isScreenshot = project.visual?.kind === "screenshot";
  return (
    <article
      className={`work-feature ${featured ? "work-feature-main" : ""} ${detailed ? "work-feature-detailed" : ""}`}
    >
      <div className="work-image">
        <ProjectVisual project={project} large={featured || detailed} />
      </div>
      <div className="work-story">
        <div className="work-meta">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.category}
          </span>
          <span>
            {isScreenshot ? "Project screenshot" : "Illustrative concept"}
          </span>
        </div>
        <h3>
          <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.overview}</p>
        <ul className="work-features" aria-label="Concept feature highlights">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        {detailed && !isScreenshot && (
          <p className="solution-disclosure">
            Figures and interface details in the artwork are illustrative, not
            verified project results.
          </p>
        )}
        <div className="work-actions">
          <Link className="text-link" to={`/portfolio/${project.slug}`}>
            Read the solution study <ArrowUpRight size={17} />
          </Link>
          <Link
            className="work-enquiry"
            to={`/contact?solution=${encodeURIComponent(project.title)}`}
          >
            Discuss this solution <ArrowRight size={15} />
          </Link>
          <a
            className="solution-image-link"
            href={image.large}
            target="_blank"
            rel="noreferrer"
          >
            {isScreenshot
              ? "View full-size screenshot"
              : "View full-size illustration"}
          </a>
        </div>
      </div>
    </article>
  );
}
