import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectSummaries } from "../data/visualContent";
import { projects, projectStatus } from "../data/projects";
import { projectImages } from "../data/projectImages";
import PageHero from "../components/ui/PageHero";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ProjectVisual from "../components/ui/ProjectVisual";
import NotFound from "./NotFound";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  return (
    <main className="case-study-page">
      <Breadcrumbs />
      <PageHero
        label={`${project.category} / Solution study`}
        title={project.title}
        description={projectSummaries[project.imageKey]}
      >
        <span className="status-badge">{projectStatus.type}</span>
      </PageHero>
      <section className="section">
        <div className="container case-layout">
          <ProjectVisual project={project} large />
          <div className="case-summary">
            <p className="small-note">
              This is a concept study, not a delivered-client case study.
              Interface details illustrate possible workflows, not verified functionality.
            </p>
            <a
              className="text-link"
              href={projectImages[project.imageKey].large}
              target="_blank"
              rel="noreferrer"
            >
              View full-size illustration <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">The problem being addressed</p>
            <h2>A workflow worth understanding.</h2>
          </div>
          <div className="prose">
            <p>{project.problem}</p>
            <h3 className="content-subheading">Potential workflow</h3>
            <ol className="deliverable-list workflow-path">
              {project.workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Features & implementation</p>
            <h2>
              Concept scope,
              <br />
              with evidence kept clear.
            </h2>
            <p className="section-description">Illustrative scope, with no verified client delivery.</p><details className="content-detail"><summary>Implementation status</summary><p>{projectStatus.implementation}</p></details>
          </div>
          <div>
            <ul className="deliverable-list">
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="content-subheading">Questions before a build</h3>
            <ul className="deliverable-list">
              {project.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section-neutral">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Technologies & project evidence</p>
            <h2>Verified detail comes first.</h2>
          </div>
          <div className="prose">
            <ul className="scope-chips"><li>Concept interface</li><li>Stack unverified</li><li>Demo not supplied</li></ul><details className="content-detail"><summary>Evidence requirements</summary><p>{projectStatus.technologies}</p><p>{projectStatus.evidence}</p></details>
            <p>
              No client outcome or live-demo claim is made.
            </p>
          </div>
        </div>
      </section>
      <section className="contact-cta">
        <div className="container cta-layout">
          <div>
            <p className="eyebrow">Have a similar requirement?</p>
            <h2>Discuss the workflow you need.</h2>
            <p>We can explore scope and requirements for your organisation.</p>
          </div>
          <Link
            className="button button-primary"
            to={`/contact?solution=${encodeURIComponent(project.title)}`}
          >
            Discuss this solution <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
