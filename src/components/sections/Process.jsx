import SectionHeading from "../ui/SectionHeading";
const steps = [
  ["Discover", "Understand the people, the problem and the purpose."],
  ["Plan", "Agree priorities, scope and a practical path forward."],
  ["Design", "Make the structure and experience clear."],
  ["Develop", "Build in considered, reviewable steps."],
  ["Test", "Check the details against real tasks."],
  ["Launch", "Prepare handover and discuss ongoing support."],
];
export default function Process() {
  return (
    <section className="section process-editorial" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="06 / Working together"
          title="A clear path from
first conversation to launch."
          description="Shared decisions and useful checkpoints. A process that keeps the work understandable."
        />
        <ol className="process-list">
          {steps.map(([title, description], index) => (
            <li key={title}>
              <span className="process-step">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
