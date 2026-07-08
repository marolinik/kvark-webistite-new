import type { Insight } from "./types";

export const euAiActAfterTheOmnibus: Insight = {
  slug: "eu-ai-act-after-the-omnibus",
  title:
    "The AI Act after the Omnibus: what moved to 2027 — and what still lands on 2 August 2026",
  category: "Regulation",
  dateISO: "2026-07-05",
  dateLabel: "July 2026",
  readingMinutes: 7,
  excerpt:
    "The Digital Omnibus deferred high-risk obligations to 2027–28 — but 2 August 2026 still switches on GPAI penalties, Article 50 transparency and national enforcement.",
  tldr: [
    "The Digital Omnibus is through: after the Council's final approval on 29 June 2026, high-risk obligations move to 2 December 2027 (Annex III) and 2 August 2028 (AI embedded in regulated products).",
    "2 August 2026 did not move: the Commission's GPAI penalty powers, Article 50 transparency duties and national market surveillance authorities all activate as originally scheduled.",
    "Customer-facing AI needs transparency notices and AI-content labelling in production by August 2026 — the Act's fining regime scales to €35 million or 7% of global turnover.",
    "Use the window to build compliance in, not bolt it on: classify the estate against Annex III, ship Article 50 first, and make evidence-grade logging an architectural property.",
    "Regulatory timing confusion stalls procurement more than regulation itself — fix the target dates and work backwards.",
  ],
  sections: [
    {
      paragraphs: [
        "On 29 June 2026 the Council gave its final approval to the Digital Omnibus on AI, clearing the way for publication in the Official Journal in July — days before the 2 August milestone the amendment was drafted to beat. The headlines wrote themselves: Europe delays the AI Act.",
        "They are half right. The Omnibus genuinely defers the Act's high-risk regime, and compliance programmes that spent 2025 racing toward an August 2026 conformity deadline can retarget December 2027. But the same 2 August 2026 date still activates three things that matter to any enterprise running AI in production in the EU: the Commission's power to penalise general-purpose AI providers, Article 50's transparency obligations, and national market surveillance authorities. Reading the Omnibus as a pause is the expensive misreading.",
      ],
    },
    {
      heading: "What the Omnibus actually changed",
      paragraphs: [
        "The deferral became law late. A provisional political agreement was reached on 7 May 2026, the European Parliament formally endorsed the package on 16 June, and the Council's green light followed on 29 June. Three changes matter for enterprise planning:",
        "For high-risk deployments, the practical effect is a longer runway for conformity assessment, technical documentation and quality-management work. That relief is real, and nobody should manufacture urgency around a deadline that no longer exists.",
      ],
      bullets: [
        "Stand-alone high-risk systems (Annex III) — the classification covering most enterprise AI that touches employment, essential services, credit or law enforcement — move from 2 August 2026 to 2 December 2027.",
        "AI embedded in regulated products (Annex I) — machinery, medical devices, vehicles — moves further, to 2 August 2028.",
        "The package couples the deferral with targeted simplification and a set of new prohibitions. It is an amendment, not a suspension: the Act's core obligations and penalty ceilings remain in place.",
      ],
    },
    {
      heading: "What 2 August 2026 still activates",
      paragraphs: [
        "Nothing in the Omnibus touched the general-purpose AI track. GPAI obligations have applied since 2 August 2025, with the July 2025 Code of Practice and the Commission's guidelines serving as the compliance baseline. What changes on 2 August 2026 is enforceability, on three fronts:",
        "The operational consequence is specific: any enterprise with customer-facing AI in the EU needs transparency notices and AI-content labelling in production by August 2026. That deadline did not move — and it applies regardless of whether a single system in your estate is high-risk.",
      ],
      bullets: [
        "The Commission's penalty powers over GPAI providers become exercisable. The Act's fining regime scales to €35 million or 7% of global turnover at the top of the range — figures that turn the Code of Practice from a courtesy into a liability boundary.",
        "Article 50 transparency obligations take effect: people must be told when they are interacting with an AI system, and AI-generated or AI-manipulated content — deepfakes included — must be disclosed.",
        "National market surveillance authorities take up their enforcement powers. Oversight stops being an abstraction in Brussels and becomes a regulator in your own member state.",
      ],
    },
    {
      heading: "What to do with the window",
      paragraphs: [
        "A deferral is only worth something if it is used. Procurement research through 2025 and 2026 found that regulatory timing confusion is itself a deal-staller — buyers delay platform decisions when they cannot tell which obligations bind when. The remedy is to fix the dates — August 2026 for transparency, December 2027 for Annex III and for the Cyber Resilience Act's SBOM duties, August 2028 for embedded AI — and work backwards:",
      ],
      bullets: [
        "Classify the estate now. Security questionnaires already ask vendors to state their own AI Act risk classification; run the same exercise across internal systems, so December 2027 starts with a map rather than an inventory project.",
        "Ship Article 50 first — it is the live deadline. Disclosure notices and content labelling are weeks of work on a platform that supports them, and an architecture problem on one that does not.",
        "Make logging an architectural property. High-risk obligations will demand records that support deployer duties: who ran what, with which prompt, which retrieved context, which model version, which tool calls, which output. Retrofitting that onto a platform that discards its own history is the bolt-on path, and it is the expensive one.",
        "Collect deployer documentation as you go — model documentation, human-oversight hooks, and the inputs a public-sector deployer will need for a fundamental rights impact assessment.",
        "Contract for mapping, not badges. Ask vendors to map platform capabilities to specific articles — transparency, logging, oversight, documentation — and treat a wall of compliance logos as the absence of an answer.",
      ],
    },
    {
      heading: "Built in, not bolted on",
      paragraphs: [
        "There is a reason the deferral should not defer platform decisions: the systems procured in 2026 are the systems that will be inspected in 2027 and 2028. Evidence-grade audit trails, human-oversight hooks, permission-aware retrieval and generated documentation are architectural properties. Platforms either have them by design, or acquire them later by surgery — at the exact moment the deadline pressure returns.",
        "The test for any platform chosen this year is simple: will December 2027 be a documentation exercise or a rebuild? Choosing infrastructure where logging, oversight and transparency are present from the first deployment turns the Omnibus window into an advantage. Bolting them on later turns it back into a countdown.",
      ],
      callout:
        "A deferred deadline changes when you must comply. It does not change what your architecture must be able to prove.",
    },
  ],
  sources: [
    {
      label:
        "Gibson Dunn — EU AI Act Omnibus agreement: postponed high-risk deadlines and other key changes",
      url: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/",
    },
    {
      label:
        "Covington, Inside Global Tech — EU AI Act update: timeline relief, targeted simplification and new prohibitions (May 2026)",
      url: "https://www.insideglobaltech.com/2026/05/28/eu-ai-act-update-timeline-relief-targeted-simplification-and-new-prohibitions/",
    },
    {
      label:
        "ComplianceHub — EU AI Act Article 50 transparency and the Digital Omnibus (2026)",
      url: "https://compliancehub.wiki/eu-ai-act-article-50-transparency-digital-omnibus-2026/",
    },
    {
      label: "European Commission — AI Act regulatory framework",
      url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },
    {
      label: "artificialintelligenceact.eu — Implementation timeline",
      url: "https://artificialintelligenceact.eu/implementation-timeline/",
    },
    {
      label:
        "Kennedys — The EU AI Act implementation timeline: understanding the next deadline for compliance",
      url: "https://www.kennedyslaw.com/en/thought-leadership/article/2026/the-eu-ai-act-implementation-timeline-understanding-the-next-deadline-for-compliance/",
    },
  ],
};
