import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { render } from "../.prerender/entry-server.js";
import { pages } from "../src/data/seo.js";

const template = await readFile("dist/index.html", "utf8");
for (const path of [...Object.keys(pages), "/404"]) {
  const rendered = render(path);
  // React 19 hoists document metadata; move it into the actual document head.
  const head = [];
  const body = rendered.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g,
    (tag) => {
      head.push(tag);
      return "";
    },
  );
  const html = template
    .replace("</head>", `${head.join("\n")}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const destination = path === "/" ? "dist/index.html" : `dist${path}.html`;
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
  console.log(`Prerendered ${path}`);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(
    pages,
  )
    .filter((path) => !pages[path].noindex)
    .map(
      (path) => `  <url><loc>https://exoiteitservices.com${path}</loc></url>`,
    )
    .join("\n")}\n</urlset>\n`,
);
