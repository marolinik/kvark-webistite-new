import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFaqStructuredData, getSeoMeta, globalSeo } from "@/seo/routeMeta";

function upsertMetaTag(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function upsertJsonLdScript(id: string, payload: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.text = JSON.stringify(payload);
}

function removeJsonLdScript(id: string) {
  document.head.querySelector(`script#${id}`)?.remove();
}

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = getSeoMeta(location.pathname);
    const canonicalUrl = `${globalSeo.siteUrl}${meta.path || location.pathname}`;

    document.title = meta.title;

    upsertCanonical(canonicalUrl);
    upsertMetaTag("name", "description", meta.description);
    upsertMetaTag("name", "robots", "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");

    upsertMetaTag("property", "og:title", meta.title);
    upsertMetaTag("property", "og:description", meta.description);
    upsertMetaTag("property", "og:url", canonicalUrl);
    upsertMetaTag("property", "og:type", meta.type ?? "website");
    upsertMetaTag("property", "og:site_name", globalSeo.siteName);
    upsertMetaTag("property", "og:image", globalSeo.defaultOgImage);
    upsertMetaTag("property", "og:image:alt", "KVARK — Sovereign Enterprise AI");

    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", meta.title);
    upsertMetaTag("name", "twitter:description", meta.description);
    upsertMetaTag("name", "twitter:image", globalSeo.defaultOgImage);

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "KVARK",
      url: globalSeo.siteUrl,
      logo: `${globalSeo.siteUrl}/favico.svg`,
      description: globalSeo.defaultDescription,
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "KVARK",
      url: globalSeo.siteUrl,
      inLanguage: "en",
      description: globalSeo.defaultDescription,
      publisher: {
        "@type": "Organization",
        name: "KVARK",
      },
    };

    upsertJsonLdScript("kvark-org-schema", organizationSchema);
    upsertJsonLdScript("kvark-website-schema", websiteSchema);

    const faqSchema = getFaqStructuredData(location.pathname);
    if (faqSchema) {
      upsertJsonLdScript("kvark-faq-schema", faqSchema);
    } else {
      removeJsonLdScript("kvark-faq-schema");
    }
  }, [location.pathname]);

  return null;
}
