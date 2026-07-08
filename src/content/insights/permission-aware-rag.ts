import type { Insight } from "./types";

export const permissionAwareRag: Insight = {
  slug: "permission-aware-rag",
  title:
    "Permission-aware retrieval: fixing the AI failure mode your DPO fears most",
  category: "Guides",
  dateISO: "2026-06-08",
  dateLabel: "June 2026",
  readingMinutes: 8,
  excerpt:
    "One prompt, one document the employee was never cleared to see. Why post-hoc filtering fails, and what retrieval-layer permission enforcement looks like.",
  tldr: [
    "The canonical AI failure in regulated enterprises: an employee retrieves, via the assistant, a document they were never cleared to see. The pipeline worked as built — it was built wrong.",
    "Post-hoc filtering fails structurally: once an unauthorised chunk reaches the context window the leak has already happened, filters fail open, and they produce no evidence.",
    "Enforce ACLs in the retrieval layer: per-user, per-query, fail-closed, filtered inside the index before anything reaches the model.",
    "Mirror source-system permissions from SharePoint, Drive and the DMS — sync ACLs as rigorously as content, and treat revocation as the urgent path.",
    "GDPR records-of-processing and breach duties apply today; AI Act logging obligations assume per-interaction records. Evidence-grade means exportable proof of who was entitled to see what.",
  ],
  sections: [
    {
      paragraphs: [
        "The scenario every DPO can narrate without notes: an employee asks the internal AI assistant a routine question — \"what is the plan for the Lyon site?\" — and the answer arrives with fluent confidence, synthesised from a restructuring memo that employee was never cleared to read. No exploit, no breach in the classical sense. The retrieval pipeline worked exactly as built. It was built wrong.",
        "By 2026 this failure mode has a name in procurement documents — permission-aware retrieval, or rather its absence — and it is one of the first capabilities security reviews check. This guide covers why retrieval-augmented systems break permission models by default, why filtering after the fact does not work, what enforcement in the retrieval layer actually requires, and what an evidence-grade record of a retrieval looks like.",
      ],
    },
    {
      heading: "Why RAG breaks your permission model by default",
      paragraphs: [
        "A retrieval-augmented generation pipeline ingests documents, splits them into chunks, embeds the chunks and stores them in a vector index. That index is, functionally, a second copy of your document estate — and by default it has no memory of the access controls that governed the originals. A query is a nearest-neighbour search across everything the index holds. The moment ingestion outruns access control, every user's question searches every document.",
        "This is not a theoretical concern. Researchers have demonstrated concrete attacks in which retrieval-augmented and agentic systems surface content to participants who lack authorisation for it, and argue that access control must be enforced for every involved user before content ever reaches the model. OWASP's Top 10 for LLM applications ranks sensitive information disclosure among the primary risks for exactly this class of system.",
      ],
    },
    {
      heading: "Why post-hoc filtering fails",
      paragraphs: [
        "The tempting fix is to retrieve freely and filter afterwards — scan the model's answer for content the user should not see. It fails structurally, not incidentally:",
      ],
      bullets: [
        "The leak precedes the filter. Once an unauthorised chunk enters the context window, the model has processed it. A paraphrase, a summary, an inference drawn from the restricted text — none of these will string-match against the source document, and all of them disclose it.",
        "It fails open. When the output filter errors, times out or meets a novel phrasing, the default path is disclosure. Security controls for regulated data need the opposite default.",
        "It produces no evidence. An output filter cannot tell an auditor which documents the user was entitled to see — only what it deleted from an answer. When a regulator asks you to prove non-access, a redaction log is not an access-control record.",
      ],
      callout:
        "The pattern that works inverts the order: decide what the user may see first, and let the model see only that.",
    },
    {
      heading: "Enforcement belongs in the retrieval layer",
      paragraphs: [
        "Permission-aware retrieval attaches each chunk's source-document ACL as metadata at ingestion, resolves the requesting user's identity at query time, and applies the permission filter inside the index — before candidate passages are ranked, and before anything reaches the model. Peer-reviewed work formalises the strongest variant: validating entitlements against the source system's native IAM endpoints at retrieval time, so the check reflects permissions as they are now, not as they were at ingestion.",
      ],
      bullets: [
        "Per-user and per-role, per query. Retrieval runs as the authenticated requester — identity resolved from your identity provider, not trust inherited from the application tier.",
        "Fail-closed. If the permission service is unreachable, or a document has no ACL mapping, the document is excluded. Missing metadata is a denial, not a pass.",
        "Pre-filtering, not re-ranking. The ACL filter constrains the search space itself; a permission check applied after ranking is post-hoc filtering wearing a badge.",
      ],
    },
    {
      heading: "Mirror the permissions you already have",
      paragraphs: [
        "Enterprises do not need a new permission model — they need the one they already maintain, mirrored faithfully. The ground truth lives in SharePoint, Google Drive, Confluence, the DMS: years of accumulated ACLs, groups and inheritance rules. The retrieval layer's job is fidelity to that truth, and the hard parts are operational:",
      ],
      bullets: [
        "Sync permissions with the same rigour as content. An index that refreshes documents nightly but ACLs weekly has a week-long exposure window.",
        "Expand groups correctly. Most real-world access is granted through nested groups; resolve membership at query time, or cache it with a short, deliberate TTL.",
        "Treat revocation as the urgent path. When access is withdrawn — an offboarding, a project close-out, a legal hold — propagation delay is measurable risk.",
        "Deletions must reach the embeddings. A document deleted at source but alive in the vector index is a retention violation waiting for a query.",
      ],
    },
    {
      heading: "What an evidence-grade retrieval record looks like",
      paragraphs: [
        "The test is simple to state: when your DPO is asked \"prove that this user was entitled to everything the assistant showed them on 14 May\", the answer should be an export, not an investigation. Per retrieval, the record needs:",
      ],
      bullets: [
        "The authenticated user identity and the exact query text, timestamped.",
        "Every candidate document evaluated, with its permission decision — allowed or denied — and the ACL version the decision used.",
        "The chunks actually passed to the model, traceable to their source documents.",
        "The model and model version that generated the answer, and the answer itself.",
        "Export in a form a regulator, auditor or court will accept — searchable, tamper-evident, retained on a defined schedule.",
      ],
      callout:
        "A redaction log says what you removed from an answer. An access-control record proves what the user was entitled to see. Regulators ask for the second.",
    },
    {
      heading: "The regulatory hooks",
      paragraphs: [
        "None of this waits for future law. Under the GDPR, retrieval pipelines that process personal data belong in your records of processing activities (Article 30), and an assistant that discloses personal data to an employee with no authorisation to see it is a security-of-processing failure that can qualify as a personal data breach — with the notification clocks that follow. That is current law, enforced today.",
        "The AI Act adds the forward obligations: transparency duties take effect on 2 August 2026, and the logging and traceability requirements for high-risk systems — deferred to December 2027 by the Digital Omnibus — assume exactly the kind of per-interaction records described above. The direction of travel is visible in budgets too: IDC finds European organisations directing 16.7% of AI security investment to agent security and governance, against a projection of 1.2 billion AI agents in operation by 2029. And as one CSO Online headline put it, \"sovereign cloud won't fix your AI risk — identity governance will\": a sovereign boundary with permission-blind retrieval inside it is a sovereign leak.",
        "This is why permission-aware retrieval sits alongside the audit trail as the pair of capabilities regulated buyers now check first — and why platforms built for those buyers, KVARK among them, enforce ACLs in the retrieval layer, fail closed, and write the evidence record as a side effect of normal operation rather than as a feature you enable later.",
      ],
    },
  ],
  sources: [
    {
      label:
        "IEEE — Permission-Aware RAG: IAM-based access filtering at retrieval time",
      url: "https://ieeexplore.ieee.org/document/11224764/",
    },
    {
      label:
        "arXiv — Enterprise AI must enforce participant-aware access control",
      url: "https://arxiv.org/abs/2509.14608",
    },
    {
      label: "Pinecone — RAG with access control",
      url: "https://www.pinecone.io/learn/rag-access-control/",
    },
    {
      label: "Lasso Security — RAG security: risks and mitigation",
      url: "https://www.lasso.security/blog/rag-security",
    },
    {
      label: "OWASP — Top 10 for LLM applications",
      url: "https://genai.owasp.org/llm-top-10/",
    },
    {
      label:
        "IDC — European CISO priorities in 2026: AI agents, platformization and sovereignty",
      url: "https://www.idc.com/resource-center/blog/european-ciso-priorities-in-2026-ai-agents-platformization-and-sovereignty/",
    },
    {
      label:
        "CSO Online — Sovereign cloud won't fix your AI risk — identity governance will",
      url: "https://www.csoonline.com/article/4184634/sovereign-cloud-wont-fix-your-ai-risk-identity-governance-will.html",
    },
  ],
};
