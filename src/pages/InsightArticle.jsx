import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { insightSummaries } from "../data/visualContent";
import { insights } from "../data/insights";
import { serviceDetails } from "../data/serviceDetails";
import PageHero from "../components/ui/PageHero";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import NotFound from "./NotFound";

export default function InsightArticle() {
  const { slug } = useParams();
  const article = insights.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  const service = serviceDetails.find(
    (item) => item.slug === article.relatedService,
  );
  return (
    <main>
      <Breadcrumbs />
      <PageHero
        label={article.category}
        title={article.title}
        description={insightSummaries[insights.indexOf(article)]}
      />
      <article className="container reading-layout">
        <p className="article-intro">{article.intro}</p>
        <nav className="article-contents" aria-label="In this guide">
          <p className="eyebrow">In this guide</p>
          <ol>
            {article.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        {article.sections.map((section, index) => (
          <section
            id={`section-${index + 1}`}
            className="reading-section"
            key={section.title}
          >
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <aside
          className="related-reading"
          aria-labelledby="related-reading-title"
        >
          <p className="eyebrow">Continue reading</p>
          <h2 id="related-reading-title">Another useful perspective.</h2>
          {insights
            .filter((item) => item.slug !== article.slug)
            .map((item) => (
              <Link key={item.slug} to={"/insights/" + item.slug}>
                {item.title}
                <ArrowRight size={16} />
              </Link>
            ))}
        </aside>
        <aside className="article-next">
          <p className="eyebrow">Put the guide into practice</p>
          <h2>Start with your own requirements.</h2>
          <p>
            Explore our {service.name.toLowerCase()} service, or send a brief to
            discuss your situation.
          </p>
          <div className="button-row">
            <Link
              className="button button-primary"
              to={`/contact?service=${encodeURIComponent(service.enquiry)}`}
            >
              {article.cta} <ArrowRight size={16} />
            </Link>
            <Link className="text-link" to={`/services/${service.slug}`}>
              Explore the service
            </Link>
          </div>
        </aside>
      </article>
    </main>
  );
}
