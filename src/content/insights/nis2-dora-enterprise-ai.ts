import type { Insight } from "./types";

export const nis2DoraEnterpriseAi: Insight = {
  slug: "nis2-dora-enterprise-ai",
  title:
    "NIS2 and DORA stopped being theoretical: what live enforcement means for enterprise AI",
  category: "Regulation",
  dateISO: "2026-06-26",
  dateLabel: "June 2026",
  readingMinutes: 7,
  excerpt:
    "Germany's NIS2 regime is live and BSI audits have begun; DORA's register cycle closed in March. What that means for AI platforms: logging, incident reporting, exit strategies.",
  tldr: [
    "Enforcement has started: Germany's NIS2 implementation has applied since 6 December 2025, the BSI registration deadline passed on 6 March 2026, audits are underway — and fines reach €10 million or 2% of global turnover.",
    "DORA's second Register of Information cycle closed on 31 March 2026; supervisors flag persistent register deficiencies and incident-reporting failures as enforcement priorities.",
    "AI platforms inherit scope through what they do: agents automating critical processes fall under NIS2, and for financial entities DORA treats the AI stack as audited ICT third-party risk.",
    "Regulators expect AI inside existing ICT governance — BaFin's position — not a parallel regime: model monitoring, access controls and resilience testing included.",
    "Four capabilities to verify now: evidence-grade logging per agent run, incident-reporting readiness, register-grade third-party transparency, and a documented exit strategy.",
  ],
  sections: [
    {
      paragraphs: [
        "The theoretical phase of EU security regulation is over. Germany's NIS2 implementation act has applied with immediate effect since 6 December 2025; the BSI registration window for in-scope entities closed on 6 March 2026; and the federal cyber agency has moved into active auditing, with fines that reach €10 million or 2% of global turnover for severe breaches. On the financial side, DORA's second Register of Information cycle — submissions were due to the European Supervisory Authorities by 31 March 2026 — has given supervisors a continent-wide map of ICT dependencies, along with a stated list of enforcement priorities: persistent register deficiencies and incident-reporting failures.",
        "Two details in this enforcement posture deserve attention. The obligations bite at the infrastructure and supply-chain layer — the providers other organisations depend on — not only at the end user. And the bar being audited is foundational: risk management, registration, incident response, not exotic technical controls. Both facts point the same way for anyone operating AI platforms inside a regulated enterprise: the basics must be done provably.",
      ],
    },
    {
      heading: "Enforcement has a shape",
      paragraphs: [
        "NIS2 transposition remains uneven across member states — ECSO maintains a tracker for exactly that reason — but where national law is in force, so are the penalties. Germany is the bellwether: registration first, audits next, and NIS2's explicit supply-chain security duties mean cloud and ICT service providers — the entities whose failures cascade into everyone else's risk registers — are squarely in scope. For CISOs this inverts the usual question. It is no longer only \"are we compliant?\" but \"can every critical third party in our stack — including the AI platform — survive the same inspection?\"",
        "DORA is further along. The Register of Information turns every ICT third-party relationship of an EU financial entity into a reported, auditable artifact: who the provider is, which functions it supports, where the data sits, what the exit path is. An AI platform that touches critical or important functions is an entry in that register, and its hosting arrangement, subprocessors and model suppliers travel with it.",
      ],
    },
    {
      heading: "Why the AI stack is in scope",
      paragraphs: [
        "Neither regulation names artificial intelligence in its operative provisions, and that is precisely the point: AI platforms fall into scope through what they do, not what they are. Under NIS2, supply-chain security and incident-reporting duties attach the moment an AI system automates part of a critical process — the platform running the agents becomes part of the process it automates. Under DORA, which supersedes NIS2 for EU financial entities and is considerably more prescriptive, the AI stack is ICT third-party risk with contractual consequences: data-location guarantees, audit and access rights, termination rights and a documented exit strategy.",
        "German supervision has made the logic explicit. BaFin's position is that AI and LLM systems are not a separate regime — they must be fully embedded in existing ICT governance, testing and third-party risk frameworks, including model monitoring, access controls and resilience testing. Waiting for an \"AI-specific\" supervisory framework is waiting for something that has already arrived under a different name.",
      ],
    },
    {
      heading: "Four capabilities to verify now",
      paragraphs: [
        "Translated into platform requirements, the enforcement wave reduces to four capabilities. They are worth verifying against any AI platform in production or in procurement — the same items now appear in vendor security questionnaires with dedicated AI governance modules covering model provenance, training-data rights, subprocessor transparency and ISO 42001 or NIST AI RMF alignment:",
      ],
      bullets: [
        "Evidence-grade logging. Incident reporting is a reconstruction exercise: for every agent run, the record needs user identity, the exact prompt, retrieved context, model and version, every tool call, the output and timestamps — exportable for a supervisor, not merely viewable in a dashboard.",
        "Incident-reporting readiness. Supervisors flagged incident-reporting failures as an enforcement priority in the same breath as register deficiencies. The platform must surface anomalies quickly enough, and in enough forensic detail, to feed statutory reporting timelines.",
        "Register-grade third-party transparency. Data location, subprocessors, hosting entities and concentration risk must be answerable in writing, because they now go into a regulatory filing — a vendor's vague answers become your register deficiencies.",
        "A documented exit strategy. DORA makes exit planning mandatory, not aspirational: can you terminate, take your data, your embeddings and your audit logs, and swap models or vendors without rebuilding the stack? A platform with no credible exit path is a concentration-risk finding waiting to be written.",
      ],
    },
    {
      heading: "The agent problem arrives next",
      paragraphs: [
        "The forward-looking risk is agents. IDC projects 1.2 billion AI agents in operation by 2029 and reports that most European organisations lack visibility into the non-human agents already active in their environments; European security leaders are responding by directing 16.7% of planned AI security investment to agent security and governance. Every ungoverned agent is a NIS2 supply-chain question and a DORA register entry that nobody has filed yet.",
        "The practical conclusion is unglamorous: the platforms that pass this era of enforcement are the ones where logging, permissioning, incident evidence and exit are architecture rather than roadmap. That is the design philosophy behind European sovereign platforms like KVARK — but whichever platform sits in your stack, the question to ask it is the supervisor's question: show me the record.",
      ],
      callout:
        "DORA turned cloud dependency from an architecture diagram into an audited artifact. The AI platform is a line in that register — and supervisors are already reading it.",
    },
  ],
  sources: [
    {
      label:
        "Morrison Foerster — Flipping the NIS2 switch: what Germany's implementation means for 2026 compliance",
      url: "https://www.mofo.com/resources/insights/251208-flipping-the-nis2-switch-what-germanys-implementation",
    },
    {
      label:
        "K&L Gates — Germany's NIS2 registration requirement expired 6 March 2026",
      url: "https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026",
    },
    {
      label:
        "Reed Smith — Germany implements NIS2: immediate effect, broad scope",
      url: "https://www.reedsmith.com/articles/germany-implements-nis2-immediate-effect-broad-scope-near-term-registration/",
    },
    {
      label: "ECSO — NIS2 Directive transposition tracker",
      url: "https://ecs-org.eu/policy/nis2-directive-transposition-tracker/",
    },
    {
      label: "Neotas — DORA compliance for third-party risk management (2026)",
      url: "https://www.neotas.com/dora-compliance-for-third-party-risk-management/",
    },
    {
      label: "Clarysec — DORA ICT exit strategies with ISO 27001 controls",
      url: "https://blog.clarysec.com/posts/dora-ict-exit-strategies-iso-27001-controls/",
    },
    {
      label: "Brandefense — NIS2 and DORA: third-party risk requirements",
      url: "https://brandefense.io/blog/nis2-dora-third-party-risk-management/",
    },
    {
      label:
        "DeepInspect — The AI vendor security questionnaire: DORA and AI third-party risk",
      url: "https://www.deepinspect.ai/blog/dora-ai-third-party-risk",
    },
    {
      label:
        "IDC — European CISO priorities in 2026: AI agents, platformization and sovereignty",
      url: "https://www.idc.com/resource-center/blog/european-ciso-priorities-in-2026-ai-agents-platformization-and-sovereignty/",
    },
  ],
};
