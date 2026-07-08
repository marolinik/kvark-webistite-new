import type { Insight } from "./types";

export const theSovereigntyTest: Insight = {
  slug: "the-sovereignty-test",
  title:
    "The sovereignty test: ten questions that separate sovereign AI from sovereign-washing",
  category: "Guides",
  dateISO: "2026-07-07",
  dateLabel: "July 2026",
  readingMinutes: 8,
  featured: true,
  excerpt:
    "Every vendor claims sovereignty in 2026. Most claims collapse under ten questions a procurement team can ask in the first meeting. Here they are — with the answers that actually pass.",
  tldr: [
    "Jurisdiction follows the legal entity, not the datacenter — an \"EU region\" of a foreign cloud fails the test the moment an extraterritorial request arrives.",
    "Ask where inference executes, who holds the keys, and what telemetry leaves the deployment. Vague answers are answers.",
    "Buyers now classify vendors in tiers: EU region of a US cloud, EU entity on EU infrastructure, and fully air-gapped — most \"sovereign\" offerings stop at tier one.",
    "An evidence-grade audit trail and permission-aware retrieval are the two capabilities security reviews check first.",
    "61% of Western European CIOs say geopolitics is pushing them toward local providers — the questions below are how that intent becomes procurement reality.",
  ],
  sections: [
    {
      paragraphs: [
        "\"Sovereign\" became the most abused word in enterprise AI sometime in 2025. Hyperscalers launched sovereign regions, SaaS vendors added sovereignty pages, and model providers discovered that European buyers respond to flags. The result is a market where the word signals intent but guarantees almost nothing.",
        "Underneath the branding, sovereignty is a set of verifiable properties: who has legal authority over the system, where computation physically happens, who can be compelled to hand over data, and what leaves your perimeter without you noticing. Those properties can be tested. This is the test.",
      ],
    },
    {
      heading: "The jurisdiction questions",
      paragraphs: [
        "The first three questions establish whose law governs your data. They matter because extraterritorial statutes — most famously the US CLOUD Act — attach to the operating entity, not to the location of the server. A datacenter in Frankfurt operated by a US-headquartered provider remains reachable by US legal process.",
      ],
      bullets: [
        "1. Which legal entity operates the platform, and where is it incorporated? If the answer is a subsidiary of a non-EU parent, the parent's obligations follow the data.",
        "2. Can any foreign legal process compel disclosure of our data — and has your legal team published an analysis? Vendors serious about sovereignty have this answer written down.",
        "3. Where does inference execute — not where is data stored? Storage residency is a 2019 answer. Prompts, retrieved context and outputs exist at the point of inference; that point must sit inside your jurisdiction. Ask for \"inference-time residency\", not just storage residency — we unpack the distinction in [a dedicated field guide](/resources/insights/inference-time-residency).",
      ],
    },
    {
      heading: "The control questions",
      paragraphs: [
        "The next four questions establish who actually operates the system. Sovereignty claims frequently dissolve here: the marketing says \"your environment\", the architecture says \"our control plane, our telemetry, our update pipeline\".",
      ],
      bullets: [
        "4. Who holds the encryption keys — and can the platform function if the vendor disappears tomorrow? Key custody plus a documented exit strategy is what DORA calls resilience; everything else is dependency.",
        "5. What telemetry, logs or usage data leave the deployment? The correct answer for a regulated workload is \"none, and here is how to verify it\". Run a network capture during the proof of concept.",
        "6. Can it run fully air-gapped — models, embeddings, OCR and all? Air-gap is an architecture, not a configuration flag: local models, local vector store, mirrored registries, offline updates. Vendors who support it can describe that supply chain in detail.",
        "7. Which models can we run, and can we swap them? Model-agnosticism is the anti-lock-in property: open-weight models by default, with routing you control. If the platform only works with one provider's API, you have bought a dependency with extra steps.",
      ],
    },
    {
      heading: "The governance questions",
      paragraphs: [
        "The final three questions are the ones your CISO and DPO will ask anyway — better to ask them in the first meeting than in week six of the security review, where deals stall.",
      ],
      bullets: [
        "8. Does retrieval respect our existing permissions — per user, per role, fail-closed? The canonical failure: an employee asks the assistant a question and receives content from a document they were never cleared to read. Access control must be enforced in the retrieval layer, not filtered afterwards — [our guide to permission-aware retrieval](/resources/insights/permission-aware-rag) shows what that means in practice.",
        "9. Show us the audit trail for one agent run. Evidence-grade means: user identity, exact prompt, every document retrieved (with its permission check), model and version, every tool call with arguments and results, timestamped end to end — exportable for a regulator or a court.",
        "10. Map your capabilities to our obligations. GDPR records of processing, AI Act logging and human oversight, NIS2 risk-management measures, DORA exit strategies, CRA software bills of materials. A vendor that answers with specific articles has done the work; a vendor that answers with a badge wall has done the marketing.",
      ],
    },
    {
      heading: "Why this matters now",
      paragraphs: [
        "The market is moving from intent to procurement. Gartner's survey of Western European CIOs found 61% expect geopolitics to increase their reliance on local and regional providers, and sovereign cloud infrastructure spending in Europe is growing 83% year over year. Procurement frameworks are catching up: the proposed EU Cloud and AI Development Act would introduce graded sovereignty assurance levels for sensitive public-sector workloads.",
        "In that world, the ten questions above stop being due diligence and become the qualification round. Vendors built sovereign-by-architecture answer them in one meeting. Vendors built sovereign-by-press-release ask for a follow-up call.",
      ],
      callout:
        "Sovereignty is not a deployment option you add later. It is the set of properties you either designed in — or didn't.",
    },
  ],
  sources: [
    {
      label:
        "Gartner — Geopolitics will drive 61% of Western European CIOs to increase reliance on local cloud providers (Nov 2025)",
      url: "https://www.gartner.com/en/newsroom/press-releases/2025-11-12-gartner-survey-reveals-geopolitics-will-drive-61-percent-of-cios-and-information-technology-leaders-in-western-europe-to-increase-reliance-on-local-cloud-providers",
    },
    {
      label:
        "Gartner — Worldwide sovereign cloud IaaS spending to total $80 billion in 2026 (Feb 2026)",
      url: "https://www.gartner.com/en/newsroom/press-releases/2026-02-09-gartner-says-worldwide-sovereign-cloud-iaas-spending-will-total-us-dollars-80-billion-in-2026",
    },
    {
      label: "European Commission — AI Act regulatory framework",
      url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },
    {
      label:
        "TrueFoundry — Air-gapped AI: deploying enterprise LLMs in highly regulated industries",
      url: "https://www.truefoundry.com/blog/air-gapped-ai-deploying-enterprise-llms-in-highly-regulated-industries",
    },
    {
      label:
        "Lawfare — The EU Cloud and AI Development Act and sovereignty assurance levels",
      url: "https://www.lawfaremedia.org/article/the-eu-cloud-and-ai-development-act",
    },
    {
      label: "IDC — European CISO priorities in 2026",
      url: "https://www.idc.com/resource-center/blog/european-ciso-priorities-in-2026-ai-agents-platformization-and-sovereignty/",
    },
  ],
};
