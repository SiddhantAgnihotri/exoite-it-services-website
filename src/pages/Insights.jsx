import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { insightSummaries } from "../data/visualContent";
import { insights } from "../data/insights";
import PageHero from "../components/ui/PageHero";
import EditorialVisual from "../components/ui/EditorialVisual";

export default function Insights() {
  return (
    <main>
      <PageHero
        label="Insights"
        title="Better questions. More useful digital decisions."
        description="Practical guides to websites, software and learning tools."
      />
      <section className="section">
        <div className="container insight-list">
          {insights.map((article, index) => (
            <article className="insight-item" key={article.slug}>
              <div className="insight-item-copy">
              <p className="eyebrow">{article.category}</p>
              <h2>
                <Link to={`/insights/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{insightSummaries[index]}</p>
              <Link className="text-link" to={`/insights/${article.slug}`}>
                Read the guide <ArrowRight size={16} />
              </Link>
              </div>
              <EditorialVisual slug={article.slug} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
