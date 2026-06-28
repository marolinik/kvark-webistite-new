const SITE_URL = "https://kvark.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

type FaqEntry = {
  question: string;
  answer: string;
};

const routeMetaMap: Record<string, SeoMeta> = {
  "/": {
    title: "KVARK — Sovereign Enterprise AI",
    description:
      "KVARK is a sovereign enterprise AI platform that enables organizations to deploy and operate AI entirely within their own infrastructure.",
    path: "/",
    type: "website",
  },
  "/resources/faq": {
    title: "FAQ — KVARK",
    description:
      "Frequently asked questions about KVARK, including deployment, integration, compliance, infrastructure, and support.",
    path: "/resources/faq",
    type: "website",
  },
  "/resources/technical": {
    title: "Technical Overview — KVARK",
    description:
      "Explore KVARK technical architecture, integration options, performance characteristics, and enterprise deployment details.",
    path: "/resources/technical",
  },
  "/resources/deployment-options": {
    title: "Deployment Options — KVARK",
    description:
      "Review KVARK deployment options for on-premises, private cloud, air-gapped, and hybrid enterprise infrastructure.",
    path: "/resources/deployment-options",
  },
  "/resources/security-compliance": {
    title: "Security & Compliance — KVARK",
    description:
      "Understand KVARK security controls, data sovereignty model, and compliance support across regulated enterprise environments.",
    path: "/resources/security-compliance",
  },
  "/company/about": {
    title: "About KVARK",
    description:
      "Learn about KVARK and our mission to deliver sovereign enterprise AI with full data control and operational reliability.",
    path: "/company/about",
  },
  "/company/careers": {
    title: "Careers — KVARK",
    description:
      "Join KVARK and help build sovereign enterprise AI products for security-first, regulation-ready organizations.",
    path: "/company/careers",
  },
  "/company/careers/apply": {
    title: "Apply — KVARK Careers",
    description:
      "Apply for open roles at KVARK and become part of a team building sovereign AI infrastructure for enterprises.",
    path: "/company/careers/apply",
  },
  "/company/events": {
    title: "Events & News — KVARK",
    description:
      "Read KVARK events and news updates, including product milestones, appearances, and announcements.",
    path: "/company/events",
    type: "website",
  },
  "/company/partner": {
    title: "Partner With KVARK",
    description:
      "Discover partnership opportunities with KVARK for joint enterprise AI delivery, integrations, and go-to-market collaboration.",
    path: "/company/partner",
  },
  "/privacy-policy": {
    title: "Privacy Policy — KVARK",
    description:
      "Read KVARK privacy policy covering data processing, handling practices, and user privacy rights.",
    path: "/privacy-policy",
  },
  "/terms-of-service": {
    title: "Terms of Service — KVARK",
    description:
      "Review the terms of service governing access and use of KVARK website and related services.",
    path: "/terms-of-service",
  },
};

const faqEntries: FaqEntry[] = [
  {
    question: "Why choose on-premise AI over cloud AI?",
    answer:
      "KVARK avoids variable token pricing and external cloud dependencies by running entirely in your own infrastructure with predictable costs and full control.",
  },
  {
    question: "How does KVARK handle security and access?",
    answer:
      "KVARK supports inherited enterprise permissions, can be deployed in air-gapped environments, and keeps customer data inaccessible to external parties.",
  },
  {
    question: "How is regulatory compliance handled?",
    answer:
      "KVARK keeps data in your jurisdiction, provides explainability and audit trails, and supports compliance programs such as GDPR, NIS2, DORA, and HIPAA requirements.",
  },
  {
    question: "What are the infrastructure requirements?",
    answer:
      "KVARK runs on enterprise Linux servers with standard data center GPU options and supports bare metal, private cloud, and Kubernetes deployment models.",
  },
];

export const globalSeo = {
  siteUrl: SITE_URL,
  siteName: "KVARK",
  defaultOgImage: DEFAULT_OG_IMAGE,
  defaultTitle: routeMetaMap["/"].title,
  defaultDescription: routeMetaMap["/"].description,
};

export function getSeoMeta(pathname: string): SeoMeta {
  if (routeMetaMap[pathname]) {
    return routeMetaMap[pathname];
  }

  if (pathname.startsWith("/company/events/")) {
    return {
      title: "Event Details — KVARK",
      description:
        "Read details about KVARK events, announcements, and enterprise AI updates.",
      path: pathname,
      type: "article",
    };
  }

  return {
    title: globalSeo.defaultTitle,
    description: globalSeo.defaultDescription,
    path: pathname,
    type: "website",
  };
}

export function getFaqStructuredData(pathname: string) {
  if (pathname !== "/resources/faq") {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}
