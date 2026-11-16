import { Link, useParams } from "react-router-dom";
import { legalDocuments } from "../data/legalDocuments";
import PageHero from "../components/ui/PageHero";
import NotFound from "./NotFound";

export default function LegalPage({ documentKey }) {
  const { legalSlug } = useParams();
  const document = legalDocuments[documentKey || legalSlug];
  if (!document) return <NotFound />;
  return (
    <main>
      <PageHero
        label="Business information / Review draft"
        title={document.title}
        description={document.description}
      />
      <article className="container reading-layout">
        <div className="review-notice">
          <strong>Draft — business and legal review required</strong>
          <p>{document.introduction}</p>
          <p>
            No effective date has been assigned. This draft is excluded from
            search indexing while awaiting approval.
          </p>
        </div>
        {document.sections.map(([title, text]) => (
          <section className="reading-section" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <section className="reading-section">
          <h2>Approval checklist</h2>
          <ul>
            {document.approvals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {document.sources.length > 0 && (
          <section className="reading-section">
            <h2>References for review</h2>
            <ul>
              {document.sources.map(([label, url]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              These sources do not establish Exoite's account settings or legal
              compliance. Verify the applicable obligations and final provider
              arrangements before adopting the policy.
            </p>
          </section>
        )}
        <div className="article-next">
          <p>
            Contact{" "}
            <a href="mailto:contact@exoiteitservices.com">
              contact@exoiteitservices.com
            </a>{" "}
            with questions, or <Link to="/contact">send an enquiry</Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
