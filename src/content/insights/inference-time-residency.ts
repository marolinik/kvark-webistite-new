import type { Insight } from "./types";

export const inferenceTimeResidency: Insight = {
  slug: "inference-time-residency",
  title:
    "Inference-time residency: why storage residency is a 2019 answer to a 2026 question",
  category: "Guides",
  dateISO: "2026-06-19",
  dateLabel: "June 2026",
  readingMinutes: 8,
  excerpt:
    "Jurisdiction follows the entity, not the datacenter — and AI moved the sensitive moment to inference. A field guide to the question that now decides sovereignty.",
  tldr: [
    "The US CLOUD Act attaches to the operating legal entity, not the datacenter — an EU region of a US cloud remains reachable by US legal process.",
    "Generative AI moved the sensitive moment from storage to inference: prompts, retrieved context and outputs exist in plaintext wherever the model runs.",
    "Buyers now classify vendors in three tiers — EU region of a US cloud, EU entity on EU infrastructure, air-gapped — and route workloads by sensitivity rather than forcing one tier.",
    "The AWS European Sovereign Cloud (GA January 2026) is the strongest hyperscaler answer yet — and the debate over whether it changes the entity question is legal, not technical.",
    "The proposed Cloud and AI Development Act would write four sovereignty assurance levels into EU public procurement; the Commission's €180M framework in April 2026 already scored tenders on sovereignty.",
  ],
  sections: [
    {
      paragraphs: [
        "For a decade, data sovereignty had a standard question and a standard answer. The question: \"Where is our data stored?\" The answer: \"In Frankfurt.\" Procurement ticked the residency box, the DPO filed the data-flow diagram, and the matter was closed. In 2026 that exchange fails on two independent grounds — one legal, one architectural.",
        "The legal ground is that jurisdiction follows the operating entity, not the building. The architectural ground is that generative AI moved the sensitive moment from storage to inference. Together they explain why \"inference-time residency\" has become the precision term in sovereignty procurement — and why storage residency is a 2019 answer to a 2026 question.",
      ],
    },
    {
      heading: "Jurisdiction attaches to entities, not buildings",
      paragraphs: [
        "The US CLOUD Act — and equivalent extraterritorial statutes elsewhere — attaches obligations to the legal entity that operates a service, wherever its servers stand. A datacenter in Frankfurt operated by a US-headquartered provider remains reachable by US legal process; the geography of the racks is not a defence the operator can rely on. This is why \"isn't the EU region of AWS or Azure enough?\" — the most common objection in EU procurement conversations — now has a standard rebuttal: legal entity structure, not datacenter location, determines CLOUD Act exposure.",
        "Mature buyers have stopped debating this and started documenting it. Procurement checklists now open with the entity questions: where is the vendor incorporated, does a non-EU parent sit above the operating company, and has the vendor's legal team put its own analysis of foreign-disclosure exposure in writing. Vendors serious about sovereignty have that analysis written down.",
      ],
    },
    {
      heading: "Inference is where the data actually works",
      paragraphs: [
        "Storage residency describes data at rest. But a generative AI transaction barely touches rest: the prompt, the context retrieved to answer it — often the most sensitive documents an organisation holds, surfaced by retrieval precisely because they are relevant — and the generated output all exist, in plaintext, at the point of inference. If the forward pass executes on infrastructure operated by a foreign-jurisdiction entity, it does not matter where the source documents sleep.",
        "Inference-time residency is therefore a bundle of four questions, and they are now standard items on EU procurement checklists: where do the model weights live; where does inference physically execute; which legal entity operates that compute; and what telemetry — logs, usage data, prompts — leaves the deployment afterwards. A vendor answer that describes storage and skips execution has answered a different question.",
      ],
    },
    {
      heading: "The three tiers",
      paragraphs: [
        "Through 2025 and 2026, EU buyers converged on a three-tier classification for sorting sovereignty claims:",
        "The corollary matters as much as the tiers: route workloads by sensitivity instead of forcing the whole estate to the most restrictive tier. Air-gap what must be air-gapped, run the regulated core at tier two, and let low-sensitivity workloads follow economics.",
      ],
      bullets: [
        "Tier 1 — an EU region of a US cloud. Fails the strict sovereignty test: the CLOUD Act applies to the operating entity regardless of region. Acceptable where extraterritorial exposure is a tolerated risk; not where it is disqualifying.",
        "Tier 2 — an EU legal entity operating EU infrastructure. Meets most regulatory requirements and balances compliance with cost; this is where most regulated-industry workloads land.",
        "Tier 3 — air-gapped or on-premises. Required for defence, classified and the most sensitive workloads; highest total cost of ownership, and an architecture rather than a configuration flag.",
      ],
    },
    {
      heading: "The AWS European Sovereign Cloud test case",
      paragraphs: [
        "The tier model got its first serious stress test in January 2026, when the AWS European Sovereign Cloud reached general availability: a region in Brandenburg, Germany, operated by a German GmbH with EU-resident staff and EU-citizen leadership under managing director Stéphane Israël, backed by €7.8 billion of investment, with expansion announced to Belgium, the Netherlands and Portugal. It is the most substantial hyperscaler sovereignty offer built to date, and it deliberately targets the entity question rather than just the geography.",
        "The debate it opened is the right one. Analysts — KuppingerCole among them — continue to ask how far operational separation insulates customers from the jurisdiction of a US parent. Framed in tier terms: is a locally incorporated subsidiary of a US hyperscaler a genuine move toward tier two, or the strongest possible version of tier one? That is a legal determination, not a technical one — and for workloads where CLOUD Act exposure is disqualifying, it is the determination that decides the procurement. What the launch has unambiguously done is raise the baseline: \"sovereign\" now requires an entity story, not just a region on a map.",
      ],
    },
    {
      heading: "Procurement is writing the tiers into law",
      paragraphs: [
        "The tier logic is moving from buyer heuristic to statute. On 3 June 2026 the European Commission adopted its technological sovereignty package, including the proposed Cloud and AI Development Act — which would establish a four-tier cloud sovereignty framework for EU public-sector procurement, with assurance levels graded by the sensitivity of the workload, up to public order, national security, defence and justice. Two months earlier, the Commission had awarded its first framework contract scored on explicit sovereignty criteria: €180 million over six years, to four European provider groups — with the inclusion of S3NS, the Thales–Google joint venture, immediately reopening the tier-boundary argument in public.",
        "The direction of travel matches the money. Gartner puts European sovereign cloud IaaS spending at $12.6 billion in 2026, up 83% year over year, and its survey work found 61% of Western European CIOs expect geopolitics to increase their reliance on local and regional providers. For a buyer, the practical programme is short: obtain the vendor's inference-time residency answer in writing, map your workloads to tiers before vendors map them for you, and verify the telemetry claim with a network capture during the proof of concept.",
        "None of this requires abandoning pragmatism; it requires asking the question at the right layer. Platforms built EU-entity-first, deployable on EU infrastructure or fully air-gapped, with no telemetry leaving the perimeter, exist precisely because inference-time residency cannot be added to an architecture after the fact — KVARK is one of them, and the category is growing. Whatever stack you choose, make the vendor answer for the moment of inference. Everything else is 2019.",
      ],
      callout:
        "Storage residency tells you where data sleeps. Inference-time residency tells you where it is read, reasoned over and answered — and that is the point the law attaches to.",
    },
  ],
  sources: [
    {
      label:
        "AWS — AWS launches the European Sovereign Cloud and announces expansion across Europe (Jan 2026)",
      url: "https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe",
    },
    {
      label: "KuppingerCole — AWS EU Sovereign Cloud announcement, January 2026",
      url: "https://www.kuppingercole.com/blog/small/aws-eu-sovereign-cloud-announcement-january-2026",
    },
    {
      label:
        "Knowlee — Sovereign agentic AI platforms 2026: the EU enterprise procurement guide",
      url: "https://www.knowlee.ai/blog/sovereign-agentic-ai-platforms-2026",
    },
    {
      label: "Lawfare — The EU Cloud and AI Development Act",
      url: "https://www.lawfaremedia.org/article/the-eu-cloud-and-ai-development-act",
    },
    {
      label:
        "European Commission — Strengthening Europe's tech sovereignty (3 June 2026)",
      url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1187",
    },
    {
      label:
        "The Register — Europe picks four providers for €180M sovereign cloud framework (April 2026)",
      url: "https://www.theregister.com/2026/04/20/europe_picks_4_sovereign_cloud/",
    },
    {
      label:
        "Gartner — Worldwide sovereign cloud IaaS spending to total $80 billion in 2026 (Feb 2026)",
      url: "https://www.gartner.com/en/newsroom/press-releases/2026-02-09-gartner-says-worldwide-sovereign-cloud-iaas-spending-will-total-us-dollars-80-billion-in-2026",
    },
  ],
};
