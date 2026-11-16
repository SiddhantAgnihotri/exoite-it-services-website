import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { insights } from "../data/insights";
import PageHero from "../components/ui/PageHero";

export default function Insights() {
  return (
    <main>
      <PageHero
        label="Insights"
        title="Better questions. More useful digital decisions."
        description="Practical planning guides for businesses and institutions considering websites, software and education technology."
      />
      <section className="section">
        <div className="container insight-list">
          {insights.map((article) => (
            <article key={article.slug}>
              <p className="eyebrow">{article.category}</p>
              <h2>
                <Link to={`/insights/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
              <Link className="text-link" to={`/insights/${article.slug}`}>
                Read the guide <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
