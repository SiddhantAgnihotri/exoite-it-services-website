import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { insights } from "../../data/insights";
export default function InsightsPreview() {
  return (
    <section className="section insights-editorial">
      <div className="container">
        <div className="insights-heading">
          <p className="eyebrow">08 / Useful perspectives</p>
          <Link to="/insights" className="text-link">
            All insights <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="curated-insights">
          <article className="insight-lead">
            <span className="article-category">{insights[0].category}</span>
            <h2>
              <Link to={"/insights/" + insights[0].slug}>
                {insights[0].title}
              </Link>
            </h2>
            <p>{insights[0].description}</p>
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
                  <Link to={"/insights/" + article.slug}>{article.title}</Link>
                </h3>
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
