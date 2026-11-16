import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import WorkFeature from "../ui/WorkFeature";
import { projects } from "../../data/projects";
export default function FeaturedSolutions({ detailed = false }) {
  return (
    <section className="section work-section" id="solutions">
      <div className="container">
        {!detailed && (
          <SectionHeading
            eyebrow="02 / Solution studies"
            title="Software, in context."
            description="Explore the problem, the possible workflow and the interface. These are illustrative concepts, not completed client projects."
          >
            <Link to="/portfolio" className="text-link">
              All solution studies <ArrowUpRight size={17} />
            </Link>
          </SectionHeading>
        )}
        <div
          className={
            detailed ? "work-editorial work-editorial-full" : "work-editorial"
          }
        >
          {projects.map((project, index) => (
            <WorkFeature
              key={project.slug}
              project={project}
              index={index}
              featured={index === 0}
              detailed={detailed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
