# NotebookLM Source Pack — Sovereign AI / In-House Deployment

**How to use with your NotebookLM notebook** (https://notebooklm.google.com/notebook/324a43b4-f1a4-4e4e-b92c-e7bbbef80592):
NotebookLM has no public API, so these cannot be pushed automatically. To import: open the notebook -> Add source -> Website -> paste a URL (repeat per source; the "Copy from another notebook" and Discover features also help). Prioritize buckets 5 (EU regulation primary texts) and 1 (open-weight model cards) - they ground the most LinkedIn angles. Each entry has a one-line annotation so you can decide fast. Companion file: sovereign-ai-news-july-2026.md (dated July-2026 news digest, same folder).

---

# Resource Library: In-House / Self-Hosted Enterprise AI (Sovereign AI)

Curated 2026-07-07. Purpose: (a) grounding vendor blog articles, (b) NotebookLM source pack for LinkedIn content on sovereign AI.
Primary sources (official docs, papers, regulator texts) are preferred; entries marked *(secondary)* are credible industry analyses, useful for framing but should not be cited as authority.

---

## 1. Open-Weight Models for Enterprise

- **Llama 4 announcement (Meta AI)** — https://ai.meta.com/blog/llama-4-multimodal-intelligence/ — Official launch post for the Llama 4 herd (Scout, Maverick): natively multimodal MoE models, Scout with 10M-token context. Primary source for capabilities and the Llama Community License caveats (700M MAU cap; EU restrictions on multimodal use) that matter for enterprise legal review.

- **Llama 4 Scout model card (Hugging Face)** — https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct — Canonical model card with full license text, intended use, and hardware notes. Use this (not blog recaps) when citing what the Llama license actually permits.

- **Magistral announcement (Mistral AI)** — https://mistral.ai/news/magistral — Mistral's first reasoning models (June 2025): Magistral Small (24B) self-deployable under Apache 2.0, Magistral Medium proprietary. Verified primary source; good example of the open-small / closed-large split European vendors use.

- **Mistral models overview (official docs)** — https://docs.mistral.ai/getting-started/models/models_overview/ — Mistral's own table of which models ship open weights and under which license (Apache 2.0 vs Mistral Research/Commercial). The only European frontier-lab lineup, relevant for EU data-sovereignty positioning; per 2026 industry roundups, Mistral Large 3 and Small 4 now ship Apache 2.0 — verify on this page before citing.

- **Qwen3 release blog (Qwen team)** — https://qwenlm.github.io/blog/qwen3/ — Official Qwen3 announcement: dense + MoE family (0.6B-235B), hybrid thinking modes, Apache 2.0 across the family. The most-deployed permissively licensed family for self-hosting; successor releases (Qwen3.5/3.6) are indexed on the same blog.

- **Gemma 3 announcement (Google)** — https://blog.google/technology/developers/gemma-3/ — Official Gemma 3 launch: 1B-27B, multimodal, 128K context, single-GPU focus. Note Gemma ships under Google's custom Gemma Terms of Use (not Apache) — a concrete example for open-weight-vs-open-source license discussions; docs at https://ai.google.dev/gemma.

- **DeepSeek-V3 Technical Report** — https://arxiv.org/abs/2412.19437 — The paper behind the MoE architecture (671B total / 37B active, MLA, FP8 training) that reset expectations on frontier-model training cost. Weights MIT-licensed on Hugging Face (deepseek-ai).

- **DeepSeek-R1 paper** — https://arxiv.org/abs/2501.12948 — "Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"; also peer-reviewed in Nature (2025). Primary source for open-weight reasoning models and the distilled small variants enterprises actually run.

- **Introducing gpt-oss (OpenAI)** — https://openai.com/index/introducing-gpt-oss/ — OpenAI's return to open weights (Aug 2025): gpt-oss-120b (single 80GB GPU, ~o4-mini parity) and gpt-oss-20b (16GB devices), Apache 2.0. Model card: https://arxiv.org/abs/2508.10925. Strong "even OpenAI validates self-hosting" narrative anchor.

- **Apertus press release (ETH Zürich)** — https://ethz.ch/en/news-and-events/eth-news/news/2025/09/press-release-apertus-a-fully-open-transparent-multilingual-language-model.html — Swiss fully open LLM (8B/70B, Apache 2.0): open weights *and* open training data/recipes, built for EU AI Act transparency compliance. Model: https://huggingface.co/swiss-ai/Apertus-70B-2509. The flagship European sovereign-AI proof point.

- **Teuken-7B paper (OpenGPT-X)** — https://arxiv.org/abs/2410.03730 — "Towards European LLMs": German publicly funded model covering all 24 official EU languages, ~60% non-English training data. Commercial-license variant: https://huggingface.co/openGPT-X/Teuken-7B-instruct-commercial-v0.4.

- **EuroLLM-9B (UTTER project)** — https://huggingface.co/utter-project/EuroLLM-9B — EU-funded (Horizon Europe / EuroHPC) multilingual model for all EU languages; paper: https://arxiv.org/abs/2409.16235. Third leg of the EU public-model triad alongside Apertus and Teuken.

- **The Open Source AI Definition 1.0 (OSI)** — https://opensource.org/ai — The Open Source Initiative's authoritative definition (Oct 2024) of what counts as open-source AI (weights + data information + code under open terms). The canonical reference for why Llama/Gemma are "open-weight," not "open-source" — a distinction most vendor content gets wrong.

## 2. Self-Hosted Inference Stack

- **vLLM documentation** — https://docs.vllm.ai/ — Official docs for the de facto standard open-source serving engine (continuous batching, PagedAttention, tensor/pipeline parallelism, OpenAI-compatible API). The PagedAttention paper (SOSP 2023): https://arxiv.org/abs/2309.06180.

- **Text Generation Inference (Hugging Face)** — https://huggingface.co/docs/text-generation-inference — Official docs for HF's production inference server (Rust-based, quantization, guided decoding). The main vLLM alternative in enterprise stacks and the engine behind HF's own endpoints.

- **llama.cpp** — https://github.com/ggml-org/llama.cpp — The canonical CPU/GPU inference engine for GGUF-quantized models; the reference implementation for running LLMs on commodity and air-gapped hardware without CUDA lock-in.

- **Ollama documentation** — https://docs.ollama.com/ — Official docs for the most popular local model runner (wraps llama.cpp; model library, OpenAI-compatible API). Relevant as the on-ramp from laptop experiments to departmental self-hosting.

- **LiteLLM documentation** — https://docs.litellm.ai/ — Official docs for the open-source LLM gateway/proxy: one OpenAI-format API across 100+ backends, with budgets, rate limits, and audit logging — the standard pattern for governing mixed self-hosted + cloud model fleets.

- **NVIDIA NIM documentation** — https://docs.nvidia.com/nim/ — Official docs for NVIDIA's containerized inference microservices (prebuilt optimized engines, self-hostable on-prem with enterprise support). The commercial-supported route to self-hosted inference for risk-averse IT.

- **MLPerf Inference v6.0 results (MLCommons)** — https://mlcommons.org/2026/04/mlperf-inference-v6-0-results/ — The vendor-neutral industry benchmark round (Apr 2026), now including GPT-OSS-120B and DeepSeek-R1 reasoning tests; results dashboard at https://mlcommons.org/benchmarks/inference-datacenter/. The authoritative source for cross-vendor GPU inference performance claims.

- **LLM Inference Sizing and Performance Guidance (VMware/Broadcom)** — https://blogs.vmware.com/cloud-foundation/2024/09/25/llm-inference-sizing-and-performance-guidance/ — Concrete sizing methodology: VRAM = weights + KV cache math, concurrency and throughput estimation. One of the few vendor sizing guides that shows its formulas.

- **Mastering LLM Techniques: Inference Optimization (NVIDIA Developer)** — https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/ — NVIDIA's canonical technical primer on batching, KV caching, quantization, and parallelism trade-offs; the reference to cite for why quantization (FP8/INT4) roughly halves or quarters memory with modest quality cost.

## 3. Enterprise RAG & Retrieval

- **Reciprocal Rank Fusion paper (Cormack, Clarke & Buettcher, SIGIR 2009)** — https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf — The original RRF paper: the rank-fusion method underlying virtually every modern hybrid (BM25 + vector) search stack. The primary citation for hybrid retrieval.

- **Hybrid search scoring with RRF (Microsoft Learn, Azure AI Search)** — https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking — Authoritative vendor documentation of RRF in a production search engine — useful to show hybrid search is standard practice, not exotic.

- **pgvector** — https://github.com/pgvector/pgvector — The canonical Postgres vector extension (HNSW/IVFFlat, exact + approximate search). The default answer to "do we need a separate vector database?" for self-hosted RAG.

- **VectorChord** — https://github.com/tensorchord/VectorChord — High-performance successor to pgvecto.rs: disk-friendly quantized vector indexing in Postgres, benchmarked at large scale. Docs: https://docs.vectorchord.ai/. Evidence that Postgres scales for enterprise RAG workloads.

- **Permission-Aware RAG: IAM-Based Access Filtering (IEEE)** — https://ieeexplore.ieee.org/document/11224764/ — Peer-reviewed framework for enforcing resource-level access control in RAG by validating against native IAM endpoints at retrieval time. Primary literature for the permission-aware retrieval pattern.

- **Enterprise AI Must Enforce Participant-Aware Access Control** — https://arxiv.org/abs/2509.14608 — Research paper arguing (with attack demonstrations) that RAG/agent systems must check every involved user's permissions before content reaches the LLM. Good citation for the "unauthorized chunk leakage" risk.

- **Ragas paper — Automated Evaluation of RAG** — https://arxiv.org/abs/2309.15217 — EACL 2024 paper introducing reference-free RAG evaluation (faithfulness, answer relevancy, context precision/recall). Framework docs: https://docs.ragas.io/. The default open-source RAG eval harness.

- **RAG for LLMs: A Survey (Gao et al.)** — https://arxiv.org/abs/2312.10997 — The most-cited academic survey of RAG (naive → advanced → modular RAG taxonomy). Solid backbone citation for any "how enterprise RAG actually works" article.

- **Introducing Contextual Retrieval (Anthropic)** — https://www.anthropic.com/news/contextual-retrieval — Vendor engineering post with measured retrieval-failure reductions from contextual chunk enrichment + hybrid search + reranking. Practical, citable numbers for RAG-quality discussions.

## 4. Security & Governance of Self-Hosted AI

- **NIST AI Risk Management Framework (AI RMF 1.0)** — https://www.nist.gov/itl/ai-risk-management-framework — The US reference framework for AI risk (Govern/Map/Measure/Manage). Full text: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf. The governance skeleton most enterprise AI policies are built on.

- **NIST Generative AI Profile (NIST AI 600-1)** — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf — Companion profile mapping AI RMF actions to generative-AI-specific risks (confabulation, data leakage, provenance). The regulator-grade checklist for GenAI deployments.

- **ISO/IEC 42001:2023 — AI management systems** — https://www.iso.org/standard/81230.html — The certifiable AI management-system standard (the "ISO 27001 of AI"). What enterprises point to when boards ask "are we governed?"; pairs with EU AI Act conformity arguments. (iso.org blocks some scrapers; page title: "ISO/IEC 42001:2023 Information technology — Artificial intelligence — Management system".)

- **OWASP Top 10 for LLM Applications (2025)** — https://genai.owasp.org/llm-top-10/ — The standard application-security taxonomy for LLM apps (prompt injection, sensitive information disclosure, supply chain, etc.), maintained by the OWASP GenAI Security Project. The baseline security citation for any RAG/agent architecture article.

- **ENISA: Multilayer Framework for Good Cybersecurity Practices for AI** — https://www.enisa.europa.eu/publications/multilayer-framework-for-good-cybersecurity-practices-for-ai — The EU cybersecurity agency's three-layer framework (ICT foundations → AI-specific ML-lifecycle threats → sector-specific), explicitly aligned to NIS2 and the AI Act. The EU counterpart to NIST AI RMF.

- **BSI: Generative AI Models — Opportunities and Risks for Industry and Authorities** — https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/KI/Generative_AI_Models.pdf?__blob=publicationFile&v=6 — Germany's federal cyber agency's lifecycle guidance for planning, operating, and using generative AI (English PDF). BSI's AI hub (incl. the AIC4 AI cloud criteria catalogue): https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/kuenstliche-intelligenz_node.html.

- **MITRE ATLAS** — https://atlas.mitre.org/ — The adversarial threat matrix for AI systems (ATT&CK-style tactics/techniques + real-world case studies). The reference for threat-modeling self-hosted model endpoints and RAG pipelines.

- **CISA/NSA joint guidance: Deploying AI Systems Securely** — https://www.cisa.gov/resources-tools/resources/deploying-ai-systems-securely — Joint Five-Eyes guidance on hardening externally sourced models in your own environment (secure deployment environment, model integrity validation, isolation) — the closest thing to official air-gapped/on-prem AI deployment guidance.

## 5. EU Regulation: Primary Texts & Explainers

- **EU AI Act — Regulation (EU) 2024/1689 (EUR-Lex)** — https://eur-lex.europa.eu/eli/reg/2024/1689/oj — The full legal text, including GPAI obligations (Art. 51-56), transparency, and the staged application timeline (GPAI duties from Aug 2025; high-risk from Aug 2026). Always cite this, not summaries.

- **European Commission: AI Act policy page** — https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai — The Commission's official explainer of the risk-based framework, implementation timeline, and links to guidance and the AI Office.

- **General-Purpose AI Code of Practice (Commission)** — https://digital-strategy.ec.europa.eu/en/policies/ai-code-practice — Official page for the GPAI Code of Practice (July 2025): the compliance vehicle for model providers under AI Act Art. 53/55 — directly relevant to open-weight model providers and downstream deployers.

- **AI Act Explorer (Future of Life Institute)** — https://artificialintelligenceact.eu/ — The most-used navigable AI Act text + implementation timeline tracker. Secondary but widely trusted; good for linking readers to specific articles.

- **GDPR — Regulation (EU) 2016/679 (EUR-Lex)** — https://eur-lex.europa.eu/eli/reg/2016/679/oj — The primary text for personal-data arguments (Art. 44-50 international transfers underpin most data-residency reasoning for self-hosting).

- **EDPB Opinion 28/2024 on AI models** — https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf — The EU regulators' position on when models are anonymous, when legitimate interest covers AI training/deployment, and consequences of unlawfully trained models. The key GDPR-meets-LLM primary source.

- **NIS2 Directive — (EU) 2022/2555 (EUR-Lex)** — https://eur-lex.europa.eu/eli/dir/2022/2555/oj — Cybersecurity obligations (risk management, supply-chain security, incident reporting) for essential/important entities — the hook for arguing AI infrastructure is in scope of security law.

- **DORA — Regulation (EU) 2022/2554 (EUR-Lex)** — https://eur-lex.europa.eu/eli/reg/2022/2554/oj — Digital operational resilience for financial entities, incl. ICT third-party risk and concentration risk — the strongest regulatory argument for financial-sector on-prem/EU-controlled AI.

- **Cyber Resilience Act — Regulation (EU) 2024/2847 (EUR-Lex)** — https://eur-lex.europa.eu/eli/reg/2024/2847/oj — Security requirements for products with digital elements, incl. software; relevant to shipping AI-embedded products and to open-source stewardship provisions.

- **Data Act — Regulation (EU) 2023/2854 (EUR-Lex)** — https://eur-lex.europa.eu/eli/reg/2023/2854/oj — Cloud-switching, interoperability, and (Art. 32) protection against unlawful third-country government access to non-personal data — a direct EU legislative answer to extraterritorial access concerns.

- **CLOUD Act — H.R. 4943 (US Congress)** — https://www.congress.gov/bill/115th-congress/house-bill/4943 — The US statute letting US authorities compel data from US providers "regardless of where the data is located" — the legal core of the sovereignty argument against US hyperscaler dependence. Cite the statute, not paraphrases.

- **EDPB-EDPS Joint Response on the US CLOUD Act (2019)** — https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en — The EU data-protection authorities' own legal analysis of the CLOUD Act/GDPR conflict (verified live). The most authoritative EU-side source on the jurisdiction clash.

## 6. TCO & Build-vs-Buy Analyses

- **Lenovo Press: On-Premise vs Cloud — Generative AI TCO (2026 Edition)** — https://lenovopress.lenovo.com/lp2368-on-premise-vs-cloud-generative-ai-total-cost-of-ownership-2026-edition — Vendor whitepaper with a "token economics" model: breakeven in under 4 months at high utilization, up to 18x cost advantage per million tokens vs API over 5 years. Vendor-authored but the most detailed public TCO model; PDF: https://lenovopress.lenovo.com/lp2368.pdf. (2025 edition for methodology comparison: https://lenovopress.lenovo.com/lp2225-on-premise-vs-cloud-generative-ai-total-cost-of-ownership-2025-edition.)

- **A Cost-Benefit Analysis of On-Premise LLM Deployment (arXiv)** — https://arxiv.org/abs/2509.18101 — Academic break-even analysis of self-hosted vs commercial LLM APIs — the neutral counterweight to hardware-vendor TCO papers.

- **Dell/ESG: Understanding the Total Cost of Inferencing LLMs** — https://www.delltechnologies.com/asset/en-in/solutions/business-solutions/industry-market/esg-inferencing-on-premises-with-dell-technologies-analyst-paper.pdf — Analyst (ESG) paper finding on-prem inferencing 2.9x-4.1x more cost-effective than API services at scale. Second vendor datapoint; triangulates with Lenovo.

- **a16z: LLMflation — LLM inference cost is falling fast** — https://a16z.com/llmflation-llm-inference-cost/ — VC analysis documenting ~10x/year decline in cost per token at constant quality. Essential context: any TCO comparison must assume falling API prices; strengthens the "own the floor, rent the spikes" argument.

- **SemiAnalysis: AI Neocloud Playbook and Anatomy** — https://semianalysis.com/2024/10/03/ai-neocloud-playbook-and-anatomy/ — The reference industry analysis of GPU cloud economics: cluster capex, utilization, and rental margin structure. Best public source on why GPU utilization drives everything in AI infrastructure economics. *(secondary, but widely cited)*

- **Spheron: LLM Inference On-Premise vs GPU Cloud — 2026 Break-Even Analysis** — https://www.spheron.network/blog/llm-inference-on-premise-vs-cloud/ — 2026 utilization-threshold framing: cloud wins below ~70% GPU utilization, on-prem wins at 80%+ sustained over 3 years. *(secondary — use for framing, verify numbers against Lenovo/arXiv before quoting.)*

- **MLPerf results as TCO input (MLCommons)** — https://mlcommons.org/benchmarks/inference-datacenter/ — Cross-listed from bucket 2: tokens/sec per system from the neutral benchmark are the correct numerator for any cost-per-token calculation, replacing vendor marketing throughput claims.

---

### Cross-bucket notes for article/NotebookLM use

- Strongest narrative spine: CLOUD Act (statute) → EDPB-EDPS joint response → Data Act Art. 32 → self-hosting as the structural answer, grounded by Apertus/Teuken/EuroLLM as European capability proof.
- License hygiene: OSI OSAID 1.0 + model cards (Llama vs Apache-2.0 families) lets articles make the open-weight vs open-source distinction precisely — a differentiator vs typical vendor blog spam.
- Numbers discipline: take throughput from MLPerf, cost curves from a16z/Lenovo/arXiv 2509.18101, sizing math from VMware/NVIDIA — never from listicles.
