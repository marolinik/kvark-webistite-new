import type { Insight } from "./types";

export const onPremiseAiTco: Insight = {
  slug: "on-premise-ai-tco",
  title:
    "The TCO of on-premise AI: when owned GPUs beat per-token pricing",
  category: "Infrastructure",
  dateISO: "2026-06-05",
  dateLabel: "June 2026",
  readingMinutes: 8,
  excerpt:
    "Per-token pricing rounds to free at pilot scale and compounds in production. Where the ownership breakeven really sits — and how to run the numbers honestly.",
  tldr: [
    "Utilization decides the build-vs-rent question: published break-even analyses put the crossover around 70–80% sustained GPU utilization — rent below it, own above it.",
    "Lenovo's 2026 TCO study — a hardware vendor's study — finds breakeven in under four months at high utilization and per-token advantages of roughly 8x vs cloud GPUs and up to 18x vs frontier APIs; Dell-commissioned analyst work triangulates at 2.9–4.1x.",
    "The gap is driven by what scales with success: agentic token growth, per-seat pricing and egress. On-prem cost is a step function; cloud cost is a slope.",
    "The cloud keeps winning burst capacity, experimentation and frontier access — and API prices fall roughly 10x a year at constant quality, so the model must include that curve.",
    "An honest calculation prices power, cooling and people on the owned side, token growth on the rented side, and takes throughput from MLPerf rather than vendor slides.",
  ],
  sections: [
    {
      paragraphs: [
        "Every enterprise AI rollout starts with the same seductive number: a per-token price with three zeros after the decimal point. At pilot scale it rounds to free. Then the pilot works. Usage compounds, agent workflows multiply the model calls behind every user request, and the finance team discovers that per-token pricing is a meter that never stops running — and that it is calibrated to someone else's margin.",
        "Whether to buy GPUs instead is not an ideological question, and in 2026 it is not even a poorly documented one. Hardware-vendor TCO models, analyst papers and academic break-even studies disagree on magnitude and agree on structure. The variable that decides the answer is utilization.",
      ],
    },
    {
      heading: "Utilization decides everything",
      paragraphs: [
        "A rented GPU carries the provider's capital cost, power, datacenter overhead and margin whether or not you use it; an owned GPU carries yours. That is the entire comparison, and it means the shape of your workload — steady versus spiky, high versus low duty cycle — matters more than any list price.",
        "The published break-even estimates cluster tightly. Spheron's 2026 analysis puts the line at roughly 70% sustained utilization, below which cloud rental wins, with ownership winning above 80% sustained over a three-year horizon — a GPU marketplace's numbers, so read them directionally. Lenovo's 2026 TCO study, the most detailed public token-economics model and openly a hardware vendor's, lands on breakeven in under four months at high utilization, with a per-million-token cost advantage of roughly 8x against renting cloud GPU instances and up to 18x against frontier model-as-a-service APIs over five years.",
        "Vendor numbers deserve triangulation, and it exists. Analyst work commissioned by Dell found on-prem inference 2.9x to 4.1x more cost-effective than API services at scale, and an independent academic cost-benefit analysis reaches the same structural conclusion for sustained enterprise volumes. The magnitude moves between studies; the direction has stopped moving.",
      ],
    },
    {
      heading: "What actually drives the gap",
      paragraphs: [
        "Three cost lines scale with success in the cloud model. Token growth is the steepest: agentic systems fan a single user request into retrieval, tool calls and multiple model invocations, so token consumption grows much faster than user count. Per-seat pricing stacks a second, linear meter on top. And data egress quietly taxes any architecture that moves documents to the model rather than the model to the documents.",
        "Against those slopes, owned hardware is a step function. One European vendor's published reference configuration illustrates the shape: 750 concurrent users served from a single 8× NVIDIA H200 server, with five-year cumulative costs of €448,000 on-premise against €3,154,000 for the comparable cloud consumption — an 86% difference. Reference configurations are built to flatter the seller, but the mechanism they illustrate is real: the on-prem line flattens after the capital step, while the cloud line keeps following usage.",
        "The counterweights belong in the model too. Enterprises buying GPUs face price premiums around 4x and lead times near nine months compared with hyperscalers holding priority supply agreements. That is a real drag on the ownership case — a reason to model procurement timing honestly, not a reason to skip the exercise.",
      ],
    },
    {
      heading: "What the cloud still wins",
      paragraphs: [
        "The rental model earns its keep in two places. Burst capacity: workloads that spike — quarterly closes, seasonal peaks, one-off backfills — would strand owned capacity the rest of the year. And experimentation: evaluating a dozen candidate models, prototyping a new use case, or fine-tuning at irregular intervals is exactly the low-duty-cycle work the utilization math assigns to rented hardware.",
        "There is also a price curve to respect. a16z has documented inference costs falling roughly 10x per year at constant quality — \"LLMflation\" — which means a naive five-year capex plan competes against an API that keeps getting cheaper. Two things blunt the risk without erasing it: much of that decline comes from software-side efficiency gains — quantization, better serving engines — that owned hardware inherits for free, and the models most enterprise use cases actually need have stopped being the expensive frontier ones. The pragmatic posture is hybrid: own the floor of steady, sovereignty-constrained demand; rent the spikes and the experiments where data classification allows.",
      ],
    },
    {
      heading: "How to run the calculation honestly",
      paragraphs: [
        "Most TCO comparisons flatter whichever side built the spreadsheet. A defensible one includes:",
      ],
      bullets: [
        "The full owned-side cost: server capital, power and cooling at your actual energy prices, rack space, hardware support contracts, and people — a realistic fraction of platform-engineering time for patching, model lifecycle and monitoring, not zero.",
        "Neutral throughput numbers. Tokens per second is the numerator of every cost-per-token claim; take it from MLPerf's vendor-neutral inference benchmarks — which now include reasoning-model workloads — rather than marketing decks.",
        "Both curves, not one: token consumption growing with agent adoption on the cloud side, and API prices falling on the other. Run it as a sensitivity analysis across utilization scenarios, not a single point estimate.",
        "A truthful utilization profile. If the cluster idles nights and weekends, either say so in the model or fill the troughs with batch workloads — embeddings, evaluations, fine-tuning — that raise the duty cycle.",
        "A three-to-five-year horizon with explicit assumptions about hardware refresh, rather than a payback slide that stops at the breakeven month.",
      ],
      callout:
        "Per-token pricing converts your AI adoption into your vendor's revenue line. Owned hardware converts it into utilization. The spreadsheet's only job is to find the crossover — honestly.",
    },
    {
      paragraphs: [
        "Run honestly, the calculation does not always land on ownership — low, spiky utilization genuinely belongs in the cloud. But for regulated European enterprises whose sensitive workloads cannot leave the perimeter anyway, sovereignty has already made the deployment decision, and the TCO math merely determines how fast the hardware pays for itself. That intersection — compliance-driven on-premise that is also dramatically cheaper at sustained scale — is where European vendors such as KVARK publish their reference configurations, and it is why the per-token meter is becoming harder to defend in front of a CFO.",
      ],
    },
  ],
  sources: [
    {
      label:
        "Lenovo Press — On-Premise vs Cloud: Generative AI Total Cost of Ownership (2026 Edition)",
      url: "https://lenovopress.lenovo.com/lp2368-on-premise-vs-cloud-generative-ai-total-cost-of-ownership-2026-edition",
    },
    {
      label:
        "Dell / ESG — Understanding the Total Cost of Inferencing LLMs (analyst paper)",
      url: "https://www.delltechnologies.com/asset/en-in/solutions/business-solutions/industry-market/esg-inferencing-on-premises-with-dell-technologies-analyst-paper.pdf",
    },
    {
      label:
        "arXiv — A Cost-Benefit Analysis of On-Premise LLM Deployment",
      url: "https://arxiv.org/abs/2509.18101",
    },
    {
      label: "a16z — LLMflation: LLM inference cost is falling fast",
      url: "https://a16z.com/llmflation-llm-inference-cost/",
    },
    {
      label:
        "Spheron — LLM inference on-premise vs GPU cloud: 2026 break-even analysis",
      url: "https://www.spheron.network/blog/llm-inference-on-premise-vs-cloud/",
    },
    {
      label: "Spheron — AI inference cost economics 2026 (GPU FinOps)",
      url: "https://www.spheron.network/blog/ai-inference-cost-economics-2026/",
    },
    {
      label: "MLCommons — MLPerf Inference datacenter benchmark results",
      url: "https://mlcommons.org/benchmarks/inference-datacenter/",
    },
  ],
};
