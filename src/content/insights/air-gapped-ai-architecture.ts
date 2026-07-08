import type { Insight } from "./types";

export const airGappedAiArchitecture: Insight = {
  slug: "air-gapped-ai-architecture",
  title:
    "Air-gap is an architecture, not a checkbox: what a fully disconnected AI stack actually requires",
  category: "Infrastructure",
  dateISO: "2026-06-12",
  dateLabel: "June 2026",
  readingMinutes: 8,
  excerpt:
    "Most air-gap claims mean a firewall rule. A real disconnected LLM stack is eight subsystems and a supply chain — the parts list, and the one test that proves it.",
  tldr: [
    "A real air gap replaces every external dependency inside the perimeter: models, embeddings, OCR, vector store, container and OS registries, observability, PKI. Miss one and the gap is decorative.",
    "Inference is the easy part. The hard part is the supply chain: signed model artifacts, verified offline update bundles, and provenance checks that work without a vendor callback.",
    "Air-gap is a tier-three requirement — defense, classified government, the most sensitive critical infrastructure. Most regulated enterprises need verifiable on-prem, not full disconnection.",
    "Hyperscalers now advertise disconnected modes too, so the claim itself is worthless without verification.",
    "The verification costs one afternoon: a network capture across the full PoC lifecycle. Zero egress — including DNS — or the claim fails.",
  ],
  sections: [
    {
      paragraphs: [
        "\"Air-gapped\" has become the premium tier of sovereignty marketing. It appears on vendor datasheets next to a checkbox, usually meaning something far weaker: a private VPC, a firewall rule, an inference endpoint that promises not to phone home. For the buyers who actually need disconnection — defense, classified government, operators of critical infrastructure — the difference between the checkbox and the architecture is the difference between passing and failing an accreditation.",
        "A genuinely air-gapped LLM deployment runs with no route to the public internet. Not at install time, not at inference time, not during updates. That single constraint propagates through the entire stack, because a modern AI platform is a web of quiet external dependencies: model downloads, embedding APIs, container registries, package mirrors, telemetry endpoints, certificate authorities. Disconnection means replacing every one of them inside your perimeter.",
      ],
    },
    {
      heading: "What a disconnected stack actually contains",
      paragraphs: [
        "Engineers who deploy LLM platforms into classified and highly regulated environments describe air-gap as \"an architecture, not a configuration flag\". Work backwards from the constraint of zero egress and the parts list writes itself:",
      ],
      bullets: [
        "Local open-weight models, held in an internal registry with signed, versioned artifacts. Licensing has stopped being the blocker: Mistral's current models, OpenAI's gpt-oss and Qwen ship Apache 2.0, DeepSeek is MIT-licensed, and fully open European models such as Apertus are already running in Swiss public-sector production.",
        "Local embeddings and OCR. Document ingestion fails quietly if it depends on a cloud OCR or embedding API — retrieval quality collapses and nobody sees an error. Both run inside the enclave, versioned alongside the LLMs.",
        "A local vector store. Managed vector databases are SaaS; the index that encodes the semantics of your most sensitive documents must live on your hardware, whether as a dedicated store or a Postgres extension such as pgvector.",
        "Mirrored container and OS registries. Every image, driver and package the platform pulls must resolve inside the perimeter — a full mirror of the software supply chain, staged through a controlled transfer process.",
        "Offline updates. Model refreshes, security patches and platform versions arrive as signed bundles over removable media or one-way transfer devices, verified at the boundary before import.",
        "On-prem observability. GPU utilization, traces, quality metrics and audit logs remain mandatory — shipping them to a SaaS monitoring service breaks the gap, so the observability stack deploys inside it.",
        "Internal PKI. Public certificate authorities and revocation endpoints are unreachable, so TLS inside the enclave rides on certificates your own CA issues and rotates.",
        "A hardened gateway. mTLS, role-based access control, rate limiting and audit logging at the API gateway are what turn a raw inference engine into a system an accreditor will sign off.",
      ],
    },
    {
      heading: "The supply chain is the hard part",
      paragraphs: [
        "Running inference without internet access is a solved problem — modern serving engines have no architectural need for connectivity. What separates a real air-gap vendor from a hopeful one is everything around the model file: how weights move from the public internet into the enclave without becoming the attack vector. The CISA and NSA joint guidance on deploying AI systems securely is explicit on this point — validate the integrity of externally sourced models, harden the deployment environment, isolate — advice that reads like an air-gap specification.",
        "The threat is not hypothetical. Supply-chain compromise sits in the OWASP Top 10 for LLM applications, and MITRE ATLAS catalogues real adversarial techniques against model pipelines. A serious vendor can show you the mechanics: cryptographic signatures on every artifact, hash verification at the transfer boundary, a documented and tested offline update cadence. An air-gapped stack that gets patched \"whenever someone visits the site with a USB drive\" is not a security architecture; it is a liability with good intentions.",
      ],
    },
    {
      heading: "Who needs tier three — and who doesn't",
      paragraphs: [
        "European buyers increasingly classify sovereignty in tiers: an EU region of a US hyperscaler, an EU legal entity operating EU infrastructure, and fully air-gapped deployment. The European Commission's proposed Cloud and AI Development Act, adopted as part of the technological sovereignty package in early June, applies the same graded logic to public procurement — the more sensitive the workload, the higher the required assurance level.",
        "Full disconnection is the top tier for a reason: it is the requirement for defense, classified government workloads and the most sensitive critical-infrastructure operations, and it carries the highest cost of ownership. Most regulated enterprises do not need it. A bank under DORA or a hospital under GDPR typically needs the middle tier done properly — on-premise or EU-operated deployment, customer-held keys, zero external telemetry, all verifiable. The mature pattern is per-workload topology: air-gap the workloads that genuinely require it, run the rest connected but sovereign, and never force the whole estate into the most restrictive tier.",
        "Meanwhile the term is being diluted from above. Microsoft has announced a fully disconnected mode for its sovereign product line and Google sells air-gapped cloud regions — evidence that the requirement is real, and a guarantee that every vendor deck you see this year will contain the word. Which moves the burden from marketing to verification.",
      ],
    },
    {
      heading: "How to verify the claim",
      paragraphs: [
        "The verification is unusually cheap for how much it proves. During the proof of concept, put a network capture on the deployment — a mirrored switch port, or a capture appliance at the perimeter — and leave it running through the entire lifecycle: installation, model loading, document ingestion, inference under load, an update cycle, an error condition. The correct result is zero packets leaving the enclave. Remember that DNS lookups are egress: a stack that resolves external hostnames \"just to check\" has already told you it was not built for this.",
        "Pair the capture with questions the architecture either answers or doesn't. Where do model weights come from, and who signs them? Show us an offline update bundle and its verification step. What happens when a license check cannot reach a server? How are certificates rotated without a public CA? Vendors who built the architecture answer from their runbooks. Vendors who built the checkbox improvise.",
        "Air-gap will always be a minority requirement, but it is the sharpest available test of how a platform was designed. A stack that runs with the cable cut — local models, local retrieval, signed offline updates, observability inside the perimeter — degrades gracefully into every less demanding deployment. That is the design logic behind European platforms such as KVARK, which treat the fully disconnected case as the baseline architecture rather than the exotic edge — and it is why the network capture, not the datasheet, should decide who makes your shortlist.",
      ],
      callout:
        "An air-gap claim is the only sovereignty promise you can test for the cost of an afternoon: capture every packet during the PoC. Zero egress, or the claim fails.",
    },
  ],
  sources: [
    {
      label:
        "TrueFoundry — Air-gapped AI: deploying enterprise LLMs in highly regulated industries",
      url: "https://www.truefoundry.com/blog/air-gapped-ai-deploying-enterprise-llms-in-highly-regulated-industries",
    },
    {
      label: "CISA & NSA — Deploying AI Systems Securely (joint guidance)",
      url: "https://www.cisa.gov/resources-tools/resources/deploying-ai-systems-securely",
    },
    {
      label: "OWASP GenAI Security Project — Top 10 for LLM Applications",
      url: "https://genai.owasp.org/llm-top-10/",
    },
    {
      label: "MITRE ATLAS — Adversarial threat landscape for AI systems",
      url: "https://atlas.mitre.org/",
    },
    {
      label:
        "European Commission — European technological sovereignty package, incl. the Cloud and AI Development Act (June 2026)",
      url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1187",
    },
    {
      label:
        "ETH Zürich — Apertus: a fully open, transparent, multilingual language model",
      url: "https://ethz.ch/en/news-and-events/eth-news/news/2025/09/press-release-apertus-a-fully-open-transparent-multilingual-language-model.html",
    },
    {
      label:
        "Knowlee — Sovereign agentic AI platforms 2026: the EU enterprise procurement guide",
      url: "https://www.knowlee.ai/blog/sovereign-agentic-ai-platforms-2026",
    },
  ],
};
