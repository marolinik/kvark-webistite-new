import type { Insight } from "./types";

export const sovereignAiBriefingJuly2026: Insight = {
  slug: "sovereign-ai-briefing-july-2026",
  title: "Sovereign AI briefing — July 2026",
  category: "Briefing",
  dateISO: "2026-07-07",
  dateLabel: "July 2026",
  readingMinutes: 9,
  excerpt:
    "The Digital Omnibus lands, sovereignty enters EU procurement law, Germany's BSI moves into active NIS2 auditing, and Gartner puts hard numbers on the sovereign cloud shift.",
  tldr: [
    "Digital Omnibus is final: Annex III high-risk obligations move to 2 December 2027 and embedded-product AI to August 2028 — but the 2 August 2026 transparency and GPAI-enforcement date did not move.",
    "The Cloud and AI Development Act (3 June) writes a four-tier sovereignty framework into EU public procurement; the Commission's €180M April framework was the first sovereignty-scored EU tender.",
    "NIS2 moved into active enforcement in Germany — obligations live since December 2025, registration closed 6 March, BSI audits underway — while DORA's register cycle closed on 31 March.",
    "Gartner: sovereign cloud IaaS spending reaches $80 billion in 2026, with Europe growing 83% year over year and on track to triple by 2027.",
    "Mistral Medium 3.5, DeepSeek's MIT-licensed V4 and Apertus-in-production widened the self-hosting menu; OpenEuroLLM's first models are due this month.",
  ],
  sections: [
    {
      paragraphs: [
        "This is the July edition of our monthly briefing: the developments from the past quarter that change decisions for security, privacy and platform leaders in regulated European organisations — each one dated, sourced and read through a buyer's eyes. The quarter's pattern is hard to miss: sovereignty stopped being a narrative and became mechanism. Rules were finalised, budgets were published, the first fines landed, and the first sovereignty-scored tender was awarded.",
      ],
    },
    {
      heading: "Digital Omnibus approved: what moved — and what didn't",
      paragraphs: [
        "The AI Act's Digital Omnibus completed its passage: the European Parliament formally endorsed it on 16 June 2026, the Council gave its final green light on 29 June, and publication in the Official Journal is expected this month. The substance: obligations for stand-alone high-risk systems (Annex III) move from August 2026 to 2 December 2027, and AI embedded in regulated products (Annex I) to 2 August 2028, alongside targeted simplification and some new prohibitions.",
        "What did not move matters more for the next four weeks. On 2 August 2026, as originally scheduled, the Commission's enforcement powers over general-purpose AI models activate, Article 50 transparency obligations take effect — users must be told they are interacting with AI, and AI-generated content must be disclosed — and national market surveillance authorities take up their roles. GPAI model rules themselves have applied since August 2025.",
        "For a deployer, the reading is: re-baseline high-risk conformity programmes to December 2027, but ship transparency notices and content labelling now. Treating the Omnibus as a blanket delay is the quarter's most expensive available misreading — our [full timeline analysis](/resources/insights/eu-ai-act-after-the-omnibus) walks through what still lands on 2 August 2026.",
      ],
      callout:
        "The high-risk clock moved to December 2027. The transparency clock did not move at all — it runs out on 2 August 2026.",
    },
    {
      heading: "Sovereignty becomes procurement law",
      paragraphs: [
        "On 3 June 2026 the Commission adopted its European technological sovereignty package, headlined by the proposed Cloud and AI Development Act — which, for the first time, writes sovereignty criteria into EU procurement law as a four-tier cloud sovereignty framework for public-sector purchases, alongside measures on semiconductors, AI and open source.",
        "The tiers arrived with a precedent already set. In April, the Commission awarded a €180 million, six-year sovereign cloud framework contract to four European provider groups — the first EU procurement to apply explicit sovereignty criteria to cloud services. Scaleway confirmed its place among the winners; the inclusion of S3NS, the Thales–Google joint venture, drew immediate criticism over whether a Google-technology stack can meaningfully be called sovereign.",
        "For vendors and buyers alike the implication is the same: sovereignty claims are becoming scoreable. Expect national and sectoral buyers to copy the criteria, and expect \"which tier are you, and can you evidence it?\" to appear in tenders well beyond the public sector.",
      ],
    },
    {
      heading: "Enforcement gets real: NIS2 audits and DORA registers",
      paragraphs: [
        "Germany's NIS2 implementation act has applied with immediate effect since 6 December 2025; the BSI registration window closed on 6 March 2026, and the federal cyber agency has moved into active auditing, with fines reaching €10 million or 2% of global turnover for severe breaches. The obligations bite first at the infrastructure and supply-chain layer — the providers other organisations depend on.",
        "On the financial-services side, DORA entered its first genuinely supervisory cycle: the second Register of Information submissions were due to the European supervisory authorities by 31 March 2026, and supervisors have flagged persistent register deficiencies and incident-reporting failures as enforcement priorities.",
        "The combined signal: third-party and cloud dependency mapping is now an audited artifact, not an internal spreadsheet. If a vendor's sovereignty and resilience claims cannot be evidenced in the format your register requires, that gap is no longer theoretical. We unpack what this means for AI platforms specifically in [NIS2 and DORA stopped being theoretical](/resources/insights/nis2-dora-enterprise-ai).",
      ],
    },
    {
      heading: "Sovereign cloud spending: Gartner's numbers",
      paragraphs: [
        "Gartner's February forecast put hard numbers under the shift: worldwide sovereign cloud IaaS spending reaches $80 billion in 2026, up 35.6% year over year. Europe grows fastest of the mature Western regions — from $6.9 billion in 2025 to $12.6 billion in 2026, an 83% jump — and is on track to triple between 2025 and 2027.",
        "Governments are the lead buyers, followed by regulated industries and critical infrastructure — a sequencing that matches the procurement developments above. It also matches stated intent: Gartner's late-2025 survey found 61% of Western European CIOs expecting geopolitics to increase their reliance on local and regional providers.",
        "The buyer's takeaway is less about the totals than the composition: when a category grows 83% in a year, vendor claims inflate faster than vendor capabilities. Diligence questions about legal entity, inference location and key custody earn their keep precisely now.",
      ],
    },
    {
      heading: "The open-weight menu widened",
      paragraphs: [
        "Mistral had the busiest half-year of any European lab: its Forge platform — enterprise training of frontier-grade models on proprietary data — debuted on 17 March at NVIDIA GTC with early adopters including Ericsson, ESA and ASML, and Mistral Medium 3.5 followed on 29 April as the price-performance option alongside the Apache 2.0-licensed Large 3 and Small 4.",
        "The European public tier produced something rarer than a release: production evidence. Apertus — the fully open Swiss model from EPFL, ETH Zurich and CSCS — went into production use in the canton of Ticino in March, and a medical variant has been under testing at Lausanne University Hospital since May. OpenEuroLLM's first models are expected this month; a year into a three-year programme and candidly compute-constrained, they will be useful rather than frontier-scale.",
        "Add DeepSeek's MIT-licensed V4 line and Qwen's Apache 2.0 family, and the menu of frontier-class, permissively licensed, self-hostable models is the widest it has ever been — with licence class (MIT and Apache 2.0 versus custom terms) now the first sorting question, before any benchmark. Our [practitioner's map of the open-weight menu](/resources/insights/open-weight-models-mid-2026) covers the selection criteria in depth.",
      ],
    },
    {
      heading: "Gigafactories: the EU compute buildout gets its legal basis",
      paragraphs: [
        "On 16 January 2026 the Council amended the EuroHPC Joint Undertaking regulation to explicitly cover AI gigafactories — facilities in the 100,000-GPU class — with the roughly €20 billion InvestAI fund earmarked for up to five of them. On 28 April, EuroHPC launched a call for proposals to strengthen the European AI ecosystem around the buildout.",
        "Beneath the gigafactory tier, 19 AI Factories plus 13 antennas are in deployment or ramp-up through 2026. For an enterprise buyer the relevance is concrete rather than geopolitical: EU-subsidised GPU capacity is emerging as an alternative to US cloud GPU for training and fine-tuning regulated workloads — worth a line in any 2027 capacity plan.",
      ],
    },
    {
      paragraphs: [
        "Six developments, one direction: the sovereignty conversation has moved from whitepapers into statutes, fines, tenders and budget lines. The organisations that navigate the coming quarter best will be the ones whose answers — which entity, which jurisdiction, which tier, which evidence — were written down before the tender asked.",
        "We publish this briefing monthly. It exists because KVARK operates in this market — building sovereign AI infrastructure for regulated European enterprises — and the discipline of reading the primary sources every month is one worth sharing.",
      ],
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
        "European Commission — European technological sovereignty package, incl. the Cloud and AI Development Act (June 2026)",
      url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1187",
    },
    {
      label:
        "The Register — Europe picks four providers for first sovereignty-scored cloud framework (April 2026)",
      url: "https://www.theregister.com/2026/04/20/europe_picks_4_sovereign_cloud/",
    },
    {
      label:
        "ComplianceHub — DORA and NIS2 in 2026: EU financial and cyber-resilience enforcement",
      url: "https://compliancehub.wiki/dora-nis2-2026-enforcement-eu-financial-cyber-resilience-compliance/",
    },
    {
      label:
        "Gartner — Worldwide sovereign cloud IaaS spending to total $80 billion in 2026 (Feb 2026)",
      url: "https://www.gartner.com/en/newsroom/press-releases/2026-02-09-gartner-says-worldwide-sovereign-cloud-iaas-spending-will-total-us-dollars-80-billion-in-2026",
    },
    {
      label: "Mistral AI — Mistral 3 announcement",
      url: "https://mistral.ai/news/mistral-3/",
    },
    {
      label:
        "Council of the EU — Council paves the way for the creation of AI gigafactories (Jan 2026)",
      url: "https://www.consilium.europa.eu/en/press/press-releases/2026/01/16/artificial-intelligence-council-paves-the-way-for-the-creation-of-ai-gigafactories/",
    },
  ],
};
