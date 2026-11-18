import { serviceDetails } from "./serviceDetails.js";
import { projects } from "./projects.js";
import { insights } from "./insights.js";
import { legalDocuments } from "./legalDocuments.js";

export const origin = "https://exoiteitservices.com";

export const pages = {
  "/": {
    label: "Home",
    title:
      "Web, Software & AI Automation Company in Kanpur | Exoite",
    description:
      "Exoite IT Services offers websites, apps, custom software, AI automation and chatbots from Kanpur for businesses across India and internationally.",
  },
  "/about": {
    label: "About",
    title: "About Exoite IT Services | IT Company in Kanpur",
    description:
      "Meet Exoite IT Services, an MSME-registered company in Kanpur focused on practical web, app, software and training solutions for India and international clients.",
  },
  "/services": {
    label: "Services",
    title: "Web, Software, AI & Automation Services | Exoite IT Services",
    description:
      "Explore website and app development, custom software, AI automation, chatbots, business integrations, digital marketing and IT training with Exoite.",
  },
  "/products": {
    label: "Products",
    title: "Exoite Social Media Platform | In Development | Exoite IT Services",
    description:
      "Explore the direction of Exoite Social Media Platform, a social media management SaaS in development. View an illustrative concept and potential product areas.",
  },
  "/portfolio": {
    label: "Portfolio",
    title: "Software Demos & Solution Concepts | Exoite IT Services",
    description:
      "Explore Exoite solution concepts for examination portals, inventory management and learning platforms. Discuss a system tailored to your business.",
  },
  "/training": {
    label: "Training",
    title: "IT Training & Coding Workshops in Kanpur | Exoite IT Services",
    description:
      "Explore practical web development, Python, mobile app and robotics training. Enquire about coding workshops for students, schools, institutes and teams.",
  },
  "/contact": {
    label: "Contact",
    title: "Contact Exoite IT Services | Discuss Your Project",
    description:
      "Contact Exoite IT Services in Kanpur for websites, mobile apps, custom software or IT training. Send an enquiry or discuss your requirements on WhatsApp.",
  },
  "/insights": {
    label: "Insights",
    title: "Website & Software Planning Guides | Exoite Insights",
    description:
      "Practical guides to choosing a business website, planning a school website and deciding when custom software is appropriate.",
  },
  ...Object.fromEntries(
    serviceDetails.map((service) => [
      `/services/${service.slug}`,
      {
        label: service.name,
        title: `${service.name} Services | Exoite IT Services`,
        description: service.seoDescription || service.description,
        parent: "/services",
      },
    ]),
  ),
  ...Object.fromEntries(
    projects.map((project) => [
      `/portfolio/${project.slug}`,
      {
        label: project.title,
        title: `${project.title} | Illustrative Solution Study | Exoite`,
        description: project.overview,
        parent: "/portfolio",
      },
    ]),
  ),
  ...Object.fromEntries(
    insights.map((article) => [
      `/insights/${article.slug}`,
      {
        label: article.title,
        title: `${article.title} | Exoite Insights`,
        description: article.description,
        parent: "/insights",
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(legalDocuments).map(([slug, document]) => [
      `/${slug}`,
      {
        label: document.title,
        title: `${document.title} | Review Draft | Exoite IT Services`,
        description: document.description,
        noindex: true,
      },
    ]),
  ),
};

export const serviceNames = serviceDetails.map(service => service.name);

export function structuredData(path) {
  const business = {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Exoite IT Services",
    url: origin,
    slogan: "Empowering Digital Future",
    email: "contact@exoiteitservices.com",
    telephone: "+916394732841",
    areaServed: ["India", "Worldwide"],
    location: { "@type": "Place", name: "Kanpur, Uttar Pradesh, India" },
    logo: `${origin}/favicon.png`,
  };
  const graph = [
    business,
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: business.name,
      publisher: { "@id": business["@id"] },
    },
  ];
  if (path !== "/" && pages[path])
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
        ...(pages[path].parent
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: pages[pages[path].parent].label,
                item: origin + pages[path].parent,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: pages[path].parent ? 3 : 2,
          name: pages[path].label,
          item: origin + path,
        },
      ],
    });
  if (path === "/services")
    graph.push(
      ...serviceNames.map((name, index) => ({
        "@type": "Service",
        "@id": `${origin}/services#service-${index + 1}`,
        name,
        provider: { "@id": business["@id"] },
        areaServed: ["India", "Worldwide"],
      })),
    );
  const service = serviceDetails.find(
    (item) => path === `/services/${item.slug}`,
  );
  if (service)
    graph.push({
      "@type": "Service",
      "@id": `${origin}${path}#service`,
      name: service.name,
      description: service.overview,
      url: origin + path,
      provider: { "@id": business["@id"] },
      areaServed: ["India", "Worldwide"],
    });
  const article = insights.find((item) => path === `/insights/${item.slug}`);
  if (article)
    graph.push({
      "@type": "Article",
      "@id": `${origin}${path}#article`,
      headline: article.title,
      description: article.description,
      mainEntityOfPage: origin + path,
      author: { "@id": business["@id"] },
      publisher: { "@id": business["@id"] },
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
