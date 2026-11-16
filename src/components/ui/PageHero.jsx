export default function PageHero({
  label,
  title,
  description,
  children,
  visual,
  variant = "default",
}) {
  return (
    <section
      className={
        "page-hero page-hero-" +
        variant +
        (visual ? " page-hero-with-visual" : "")
      }
    >
      <div className="container page-hero-layout">
        <div className="page-hero-copy">
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className="page-hero-description">{description}</p>
          {children && <div className="page-hero-extra">{children}</div>}
        </div>
        {visual && <div className="page-hero-visual">{visual}</div>}
      </div>
    </section>
  );
}
