import http from "node:http";
import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { STATIC_ROUTES } from "./seo-config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const host = "127.0.0.1";
const port = 4173;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolvePublicPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  if (cleanPath === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, cleanPath.replace(/^\/+/, ""));
}

async function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const requestPath = req.url ?? "/";
      const filePath = resolvePublicPath(requestPath);

      try {
        let stat = await fs.stat(filePath);
        let actualPath = filePath;

        if (stat.isDirectory()) {
          actualPath = path.join(filePath, "index.html");
          stat = await fs.stat(actualPath);
        }

        const ext = path.extname(actualPath).toLowerCase();
        const contentType = mimeTypes[ext] ?? "application/octet-stream";

        res.statusCode = 200;
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Length", String(stat.size));
        const fileBuffer = await fs.readFile(actualPath);
        res.end(fileBuffer);
      } catch {
        const fallbackPath = path.join(distDir, "index.html");
        const fallbackContent = await fs.readFile(fallbackPath);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fallbackContent);
      }
    });

    server.on("error", reject);
    server.listen(port, host, () => resolve(server));
  });
}

function outputPathForRoute(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, routePath.replace(/^\/+/, ""), "index.html");
}

async function prerenderRoutes() {
  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 60_000,
  });

  try {
    const page = await browser.newPage();

    for (const routePath of STATIC_ROUTES) {
      const url = `http://${host}:${port}${routePath}`;
      await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
      await page.waitForNetworkIdle({ idleTime: 800, timeout: 30_000 });
      const html = await page.content();
      const outputPath = outputPathForRoute(routePath);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, `${html}\n`, "utf8");
      process.stdout.write(`Prerendered ${routePath}\n`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve(undefined))));
  }
}

prerenderRoutes().catch((error) => {
  process.stderr.write(`Prerender failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
