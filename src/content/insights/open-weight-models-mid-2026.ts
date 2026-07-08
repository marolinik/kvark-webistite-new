import type { Insight } from "./types";

export const openWeightModelsMid2026: Insight = {
  slug: "open-weight-models-mid-2026",
  title:
    "The open-weight menu in mid-2026: what enterprises can actually self-host",
  category: "Open Models",
  dateISO: "2026-07-01",
  dateLabel: "July 2026",
  readingMinutes: 8,
  excerpt:
    "Frontier-class weights under MIT and Apache 2.0, European models in real production — a practitioner's map of the mid-2026 self-hosting menu.",
  tldr: [
    "Frontier-class weights now ship under MIT and Apache 2.0: Mistral's Apache-licensed line, DeepSeek's V4 under MIT, Qwen's Apache 2.0 family and OpenAI's own gpt-oss.",
    "Open-weight is not open-source. Llama's community licence and Gemma's custom terms carry restrictions that belong in legal review — licence review precedes benchmark review.",
    "European models crossed into production: Apertus runs in Swiss cantonal government and hospital testing; OpenEuroLLM's first models are due July 2026 — useful, not frontier-scale.",
    "Choose by task fit on your own data, licence class, memory arithmetic and multilingual coverage — not leaderboard rank.",
    "Roughly 80% of enterprise use cases run well on open models; with a model-agnostic platform the frontier gap is a routing decision, not an architecture decision.",
  ],
  sections: [
    {
      paragraphs: [
        "For most of the past three years, the case against self-hosting was quality: the models you could run yourself trailed the frontier by too much to matter. In mid-2026 that case has collapsed. Frontier-class weights now ship under MIT and Apache 2.0 licences, a European lab publishes permissively licensed models strong enough for production, and publicly funded European models are running in government and hospital deployments. The menu is real. The problem has shifted from scarcity to selection.",
        "This is a practitioner's map of that menu: what is actually available for enterprise self-hosting, what the licences genuinely permit, and how to choose — starting from the observation that most selection mistakes happen because teams read leaderboards before they read licences.",
      ],
    },
    {
      heading: "What is actually on the menu",
      paragraphs: [
        "Four families dominate serious enterprise self-hosting conversations in mid-2026, joined by a European tier that has crossed from research into production.",
      ],
      bullets: [
        "Mistral (France). Mistral Large 3 and Small 4 ship under Apache 2.0, joined in April 2026 by Mistral Medium 3.5 as the price-performance option in the line-up. Mistral remains the only European frontier lab shipping permissively licensed weights, which makes it the default model story in most European sovereign-AI architectures.",
        "DeepSeek (China). The V4 family ships under MIT — the most permissive licence in the tier — continuing the mixture-of-experts design line that reset expectations for frontier training costs with V3 and R1. The distilled reasoning variants are what enterprises most often actually run.",
        "Qwen (Alibaba). Apache 2.0 across the entire family, from sub-1B models to the 235B-parameter MoE flagship, with hybrid reasoning modes. The most widely deployed permissively licensed family for self-hosting.",
        "gpt-oss (OpenAI). OpenAI's return to open weights in August 2025: gpt-oss-120b runs on a single 80 GB GPU, gpt-oss-20b on 16 GB devices, both Apache 2.0. Whatever else it signals, it is the strongest available evidence that self-hosting is now a deployment model even closed-model labs validate.",
        "Llama 4 and Gemma (Meta, Google). Capable multimodal families — but both ship under custom licences rather than open ones, which is exactly where the next section begins.",
      ],
    },
    {
      heading: "Open-weight is not open-source",
      paragraphs: [
        "The Open Source Initiative settled the definitional argument in October 2024: open-source AI requires weights, information about training data, and code, all under open terms. Most models marketed as \"open\" do not meet that bar. They are open-weight — you can download and run them — under licences that range from genuinely open to conditionally tolerant.",
        "The distinction is not pedantry; it determines what your legal team signs off. Three licence classes matter in practice:",
      ],
      bullets: [
        "Apache 2.0 and MIT (Mistral's open line, Qwen, DeepSeek, gpt-oss, Apertus): unconditional commercial use, modification and redistribution. These are the clean picks for regulated procurement — no usage thresholds, no revocable terms.",
        "Llama Community License (Llama 4): free until you are large — the licence carves out companies above 700 million monthly active users — and the model card carries EU-specific restrictions on multimodal use. Cite the model card in legal review, not a blog recap of it.",
        "Gemma Terms of Use (Gemma): Google's own terms, not a standard open licence, including usage restrictions the vendor controls. Manageable, but it is a vendor agreement, not a commons.",
      ],
      callout:
        "The operational rule is simple: licence review precedes benchmark review. A model that wins your evaluation but fails legal review has wasted the evaluation.",
    },
    {
      heading: "The European lineup crossed into production",
      paragraphs: [
        "The most significant European development of the past year is not a new model — it is deployment evidence. Apertus, the fully open model built by EPFL, ETH Zurich and CSCS (Apache 2.0, 8B and 70B, with open training data and recipes, and training data spanning more than 1,800 languages), moved into real public-sector use: the canton of Ticino put it into production for government work in March 2026, and a medical variant built on it has been under testing at Lausanne University Hospital since May 2026. Fully open, European-governed models are now demonstrably viable for regulated workloads.",
        "The rest of the public European tier is more modest, and should be described honestly. Teuken-7B, from Germany's OpenGPT-X project, covers all 24 official EU languages with roughly 60% non-English training data; EuroLLM-9B is its EU-funded sibling. OpenEuroLLM — the EU's flagship model programme — is expected to publish its first models in July 2026, one year into a three-year effort, and those first releases will not be frontier-scale; the programme has been candid about compute constraints. The right frame: European public models are production-ready for targeted multilingual and domain use cases, not frontier replacements. For frontier-class self-hosting, the permissive tier above is where the capability lives.",
      ],
    },
    {
      heading: "How to choose: task fit over leaderboards",
      paragraphs: [
        "Leaderboard-driven selection is the most common failure pattern in self-hosting projects: a team picks the highest-scoring model that fits its GPUs, then discovers the score measured nothing it needed. The criteria that survive contact with production:",
      ],
      bullets: [
        "Licence first. As above — it is a gate, not a criterion.",
        "Task fit, measured on your data. Build a small evaluation set from your actual documents and workflows before comparing models. A mid-sized model that has seen text like yours routinely beats a larger one that has not.",
        "Memory arithmetic. VRAM demand is weights plus KV cache, and it is calculable before procurement. Quantisation (FP8, INT4) roughly halves or quarters memory for modest quality cost — which frequently moves a model from \"needs a cluster\" to \"fits the hardware we have\".",
        "Context length you will actually use. Long context windows are priced in memory. If retrieval feeds the model focused, permission-checked chunks, a 128K window is usually generous.",
        "Multilingual coverage. For EU deployments, non-English performance is a requirement, not a bonus — and it is where the European public models and Qwen's family are disproportionately strong, and where some US-centric models quietly underperform.",
        "Provenance. Self-hosted weights run inside your perimeter regardless of where they were trained — but some sectors' governance policies treat lab origin (Chinese, US, European) as a selection criterion. Decide deliberately, not by default.",
      ],
    },
    {
      heading: "The 80% argument",
      paragraphs: [
        "The residual objection is the frontier gap: open-weight models trail the closed frontier on benchmarks by a few months. That is true, and largely irrelevant, because roughly 80% of enterprise use cases — summarisation, extraction, drafting, internal search, structured transformation over retrieved context — run well on current open models. The gap is concentrated in the hardest 20%: novel reasoning, frontier coding, the workloads where the newest closed models genuinely earn their premium. For throughput and cost planning on the rest, take numbers from vendor-neutral benchmarks such as the MLPerf inference rounds, which now include open-weight and reasoning workloads, rather than from vendor marketing.",
        "The architectural conclusion follows: if your platform is model-agnostic, the frontier gap is a routing decision, not an architecture decision. Run the 80% on open weights inside your perimeter; route the residual workloads deliberately, with eyes open about jurisdiction and data flows — or wait a quarter, because the menu keeps improving.",
        "That logic — open weights by default, models as swappable components, routing under your control — is the selection discipline this piece argues for, and it is the assumption KVARK is built on: when next quarter's menu is better than this one, swapping the model should be a configuration change, not a migration.",
      ],
      callout:
        "The question is no longer whether an open-weight model is good enough. It is which 20% of your workload genuinely needs anything more — and what you are willing to trade for it.",
    },
  ],
  sources: [
    {
      label: "Mistral AI — Mistral 3: Large 3 and Small 4 under Apache 2.0",
      url: "https://mistral.ai/news/mistral-3/",
    },
    {
      label: "Open Source Initiative — The Open Source AI Definition 1.0",
      url: "https://opensource.org/ai",
    },
    {
      label:
        "Meta — Llama 4 Scout model card and community licence (Hugging Face)",
      url: "https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct",
    },
    {
      label:
        "ETH Zürich — Apertus: a fully open, transparent, multilingual language model",
      url: "https://ethz.ch/en/news-and-events/eth-news/news/2025/09/press-release-apertus-a-fully-open-transparent-multilingual-language-model.html",
    },
    {
      label: "Qwen team — Qwen3 release: Apache 2.0 across the family",
      url: "https://qwenlm.github.io/blog/qwen3/",
    },
    {
      label: "OpenAI — Introducing gpt-oss",
      url: "https://openai.com/index/introducing-gpt-oss/",
    },
    {
      label:
        "Michael Hannecke — Your enterprise AI doesn't need a frontier model",
      url: "https://medium.com/@michael.hannecke/your-enterprise-ai-doesnt-need-a-frontier-model-139ce39c2936",
    },
  ],
};
