import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { LLMS_DOC_ROUTES, SITE_URL, STATIC_ROUTES, toAbsoluteUrl } from "./seo-config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

async function writeRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  await fs.writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
}

function buildSitemapXml() {
  const allRoutes = [...STATIC_ROUTES, ...LLMS_DOC_ROUTES];
  const urls = allRoutes.map((routePath) => {
    return `  <url>\n    <loc>${toAbsoluteUrl(routePath)}</loc>\n  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function writeSitemapXml() {
  const sitemapXml = buildSitemapXml();
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  await Promise.all([writeRobotsTxt(), writeSitemapXml()]);
  process.stdout.write("Generated robots.txt and sitemap.xml\n");
}

main().catch((error) => {
  process.stderr.write(`SEO file generation failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
