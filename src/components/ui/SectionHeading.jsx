export default function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-aside">
        {description && <p>{description}</p>}
        {children}
      </div>
    </div>
  );
}
