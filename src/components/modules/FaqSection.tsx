import { useState } from "react";
import FAQItem from "@/components/common/FAQItem";
import SectionHeading from "@/components/common/SectionHeading";

const faqs = [
  {
    question: "Do we need frontier cloud models for enterprise use cases?",
    answer:
      "For most document, knowledge and workflow use cases — no. KVARK is model-agnostic: it ships ready to run local open-weight LLMs inside your perimeter, and where policy allows, an LLM gateway can route selected workloads to proprietary cloud models. You choose per use case; the governance layer applies either way.",
  },
  {
    question: "Is on-premise AI more expensive than cloud?",
    answer:
      "Usually the opposite at enterprise scale. In our reference configuration (750 concurrent users, one 8×H200 server), five-year total cost of ownership is 86% lower than equivalent cloud consumption — and it is fixed and predictable, with no per-token pricing.",
  },
  {
    question: "Can KVARK really run fully air-gapped?",
    answer:
      "Yes. Language models, embeddings, OCR and document processing all run inside your environment on your GPUs. In air-gapped mode there is no external dependency at inference time — nothing calls home.",
  },
  {
    question: "How does KVARK respect our existing permissions?",
    answer:
      "Connectors mirror the access controls of your source systems — per user and per role, fail-closed. Users only ever retrieve what they are already cleared to see. Authentication integrates with Microsoft Entra and Okta (OAuth2/OIDC), with RBAC and AD/LDAP group resolution.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "The installation itself is fast — Docker Compose on a single host or Helm on Kubernetes, typically stood up in days. A first production use case usually follows within weeks, and a full multi-workflow rollout within a few months, depending on scope. The four-phase methodology keeps every step controlled and measurable; three client implementations reached production within the platform's first year.",
  },
  {
    question: "Who operates and maintains the platform?",
    answer:
      "A structured four-phase delivery methodology takes you from business analysis to production, and multi-level support (L1–L3) covers operations afterwards — updates, backups, monitoring and continuous improvement. Your team stays in control; ours keeps it healthy.",
  },
  {
    question: "What security certifications do you hold?",
    answer:
      "We answer security questionnaires directly and provide full documentation under NDA — architecture, audit-log specification, SBOM and regulatory mapping. The platform is engineered to CRA-aligned practices: software bill of materials, dependency scanning, secrets management and complete audit logging. Ask us about the current status of formal certifications during your demo — we would rather give you a precise, honest answer than a badge.",
  },
  {
    question: "How do we avoid vendor lock-in?",
    answer:
      "KVARK runs on a fully documented open-source substrate — PostgreSQL, NATS, MinIO, MLflow, OnlyOffice and open-weight models — deployed in your infrastructure, with your data in standard formats. Exit strategy support is built into the delivery model, in line with DORA requirements.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full px-4 lg:px-20 py-16 lg:py-24">
      <div className="relative flex flex-col items-center gap-10 lg:gap-14 max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Questions"
          title="What security and procurement teams ask us"
          subtitle="The direct answers to the questions that decide sovereign AI deals."
        />
        <div className="flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
