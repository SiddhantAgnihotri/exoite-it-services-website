import { Search, ListChecks, PanelsTopLeft, Code2, ClipboardCheck, Rocket } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
const stepIcons = [Search, ListChecks, PanelsTopLeft, Code2, ClipboardCheck, Rocket];
const steps = [
  ["Discover", "Audience, goals and constraints."],
  ["Plan", "Scope, priorities and responsibilities."],
  ["Design", "Structure, screens and journeys."],
  ["Develop", "Working features, reviewed together."],
  ["Test", "Real tasks and agreed checks."],
  ["Launch", "Handover and support planning."],
];
export default function Process({ embedded = false }) {
  const Wrapper = embedded ? "div" : "section";
  return (
    <Wrapper className={embedded ? "home-process-steps" : "section process-editorial"} id="process">
      <div className={embedded ? undefined : "container"}>
        {!embedded && <SectionHeading
          eyebrow="06 / Working together"
          title="A clear path from
first conversation to launch."
          description="Six steps, with review at each stage."
        />}
        <ol className="process-list">
          {steps.map(([title, description], index) => { const Icon = stepIcons[index]; return (
            <li key={title}>
              <Icon className="process-icon" size={24} aria-hidden="true" /><span className="process-step">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ); })}
        </ol>
      </div>
    </Wrapper>
  );
}
