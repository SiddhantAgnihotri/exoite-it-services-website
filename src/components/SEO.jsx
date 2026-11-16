import { useLocation } from "react-router-dom";
import { origin, pages, structuredData } from "../data/seo";

export default function SEO() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = pages[path];
  const title = page?.title || "Page Not Found | Exoite IT Services";
  const description =
    page?.description ||
    "This page could not be found. Explore Exoite IT Services or contact us for help.";
  const url = origin + (page ? path : "/404");
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={page && !page.noindex ? "index,follow" : "noindex,follow"}
      />
      {page && <link rel="canonical" href={url} />}
      <meta
        property="og:type"
        content={page?.parent === "/insights" ? "article" : "website"}
      />
      <meta property="og:site_name" content="Exoite IT Services" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${origin}/social-card.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Exoite IT Services — Empowering Digital Future"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${origin}/social-card.png`} />
      <meta
        name="twitter:image:alt"
        content="Exoite IT Services — Empowering Digital Future"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(path)).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
