export const SITE_URL = "https://kvark.ai";

export const STATIC_ROUTES = [
  "/",
  "/resources/faq",
  "/resources/technical",
  "/resources/deployment-options",
  "/resources/security-compliance",
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
