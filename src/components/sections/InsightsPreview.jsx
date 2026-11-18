import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { insights } from "../../data/insights";
import EditorialVisual from "../ui/EditorialVisual";
export default function InsightsPreview() {
  return (
    <section className="section insights-editorial">
      <div className="container">
        <div className="insights-heading">
          <p className="eyebrow">08 / Insights</p>
          <Link to="/insights" className="text-link">
            All insights <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="curated-insights">
          <article className="insight-lead">
            <EditorialVisual slug={insights[0].slug} />
            <span className="article-category">{insights[0].category}</span>
            <h2>
              <Link to={"/insights/" + insights[0].slug}>
                Plan a website around your business goals
              </Link>
            </h2>
            <p>Plan around your visitors, content and ongoing costs.</p>
            <Link className="text-link" to={"/insights/" + insights[0].slug}>
              Read the guide <ArrowUpRight size={17} />
            </Link>
          </article>
          <div className="insight-secondary">
            {insights.slice(1).map((article, index) => (
              <article key={article.slug}>
                <span className="article-category">
                  0{index + 2} / {article.category}
                </span>
                <h3>
                  <Link to={"/insights/" + article.slug}>{index === 0 ? "A clearer plan for your school website" : "When is custom software the right fit?"}</Link>
                </h3>
                <p>{index === 0 ? "Make school information and access easier to navigate." : "Consider your workflows before choosing a custom build."}</p>
                <Link className="text-link" to={"/insights/" + article.slug}>
                  Read the guide <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
