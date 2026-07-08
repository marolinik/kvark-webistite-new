export const SITE_URL = "https://kvark.ai";

export const INSIGHT_SLUGS = [
  "sovereign-ai-briefing-july-2026",
  "the-sovereignty-test",
  "eu-ai-act-after-the-omnibus",
  "open-weight-models-mid-2026",
  "nis2-dora-enterprise-ai",
  "inference-time-residency",
  "air-gapped-ai-architecture",
  "permission-aware-rag",
  "on-premise-ai-tco",
];

export const STATIC_ROUTES = [
  "/",
  "/resources/faq",
  "/resources/technical",
  "/resources/deployment-options",
  "/resources/security-compliance",
  "/resources/insights",
  ...INSIGHT_SLUGS.map((slug) => `/resources/insights/${slug}`),
  "/company/about",
  "/company/careers",
  "/company/careers/apply",
  "/company/events",
  "/company/partner",
  "/privacy-policy",
  "/terms-of-service",
];

export const LLMS_DOC_ROUTES = [
  "/llms.txt",
  "/llm.txt",
  "/llms/home.md",
  "/llms/insights.md",
  "/llms/about.md",
  "/llms/careers.md",
  "/llms/careers-apply.md",
  "/llms/events.md",
  "/llms/events-detail.md",
  "/llms/partner.md",
  "/llms/technical.md",
  "/llms/deployment-options.md",
  "/llms/security-compliance.md",
  "/llms/faq.md",
  "/llms/privacy-policy.md",
  "/llms/terms-of-service.md",
];

export function toAbsoluteUrl(routePath) {
  const normalizedPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${SITE_URL}${normalizedPath}`;
}
