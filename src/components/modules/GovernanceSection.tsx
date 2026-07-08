import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";
import useCaseBackground from "@/assets/backgrounds/use-case-background.svg";

const regulations = [
  {
    abbr: "GDPR",
    name: "General Data Protection Regulation",
    capabilities: [
      "Permission-aware retrieval per user and role",
      "Data-source lineage on every answer",
      "Complete audit logging",
    ],
    citation: "Supports Art. 5, 30 & 32 obligations",
  },
  {
    abbr: "EU AI Act",
    name: "Artificial Intelligence Act",
    capabilities: [
      "Deterministic AI guardrails",
      "Model lifecycle management",
      "AI monitoring and evaluation",
    ],
    citation: "Supports Art. 12 record-keeping & Art. 14 oversight",
  },
  {
    abbr: "NIS2",
    name: "Network & Information Security Directive",
    capabilities: [
      "Activity logging in real time",
      "Security and access management",
      "Incident monitoring",
    ],
    citation: "Supports Art. 21 risk-management measures",
  },
  {
    abbr: "DORA",
    name: "Digital Operational Resilience Act",
    capabilities: [
      "Resilient pipelines — dead-letter queues, circuit breakers",
      "Updates and backups",
      "Multi-level support (L1–L3) and exit strategy",
    ],
    citation: "Supports ICT resilience & Art. 28 exit strategies",
  },
  {
    abbr: "CRA",
    name: "Cyber Resilience Act",
    capabilities: [
      "Secrets management",
      "Dependency scanning",
      "Software bill of materials (SBOM)",
      "Controlled update and backup delivery",
    ],
    citation: "Supports Annex I security requirements",
  },
];

const auditTrailSteps = [
  { label: "User & role", detail: "authenticated via your SSO" },
  { label: "Prompt", detail: "recorded verbatim" },
  { label: "Retrieved sources", detail: "with permissions checked" },
  { label: "Model & version", detail: "pinned and logged" },
  { label: "Tool calls", detail: "arguments and results" },
  { label: "Response", detail: "timestamped, traceable" },
];

function GovernanceSection() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    pushEvent({
      event: "cta_click",
      button_name: "request_demo",
      location: "governance",
    });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  return (
    <section
      id="governance"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24"
      style={{
        backgroundImage: `url(${useCaseBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#030E2F",
      }}
    >
      <div className="relative flex flex-col items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        <SectionHeading
          dark
          eyebrow="Governance"
          title="Compliance you can defend"
          subtitle="KVARK doesn't replace your DPO, CISO, or legal team — it equips them. Every capability below maps to a specific regulatory obligation, so sovereign AI becomes defensible and implementation-ready."
        />

        {/* Permission-aware banner */}
        <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/5 px-6 py-6 lg:px-10 lg:py-7 text-center">
          <p className="text-lg lg:text-2xl text-white leading-[140%]">
            Permissions enforced on every answer — fail-closed.
          </p>
          <p className="mt-2 text-sm lg:text-base text-neutral-300 leading-[150%]">
            KVARK mirrors your source-system access controls per user and per
            role, with SSO via Microsoft Entra and Okta, RBAC, and AD/LDAP
            group resolution.
          </p>
        </div>

        {/* Regulation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {regulations.map((reg) => (
            <div
              key={reg.abbr}
              className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 lg:p-7 transition-colors duration-300 hover:border-white/30"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-xl lg:text-2xl font-medium text-white">
                  {reg.abbr}
                </h3>
                <p className="text-xs lg:text-sm text-neutral-300">
                  {reg.name}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {reg.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-sm lg:text-base text-neutral-200 leading-[145%]"
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1D57FF] shrink-0"
                      aria-hidden="true"
                    />
                    {cap}
                  </li>
                ))}
              </ul>
              <p className="text-[0.7rem] lg:text-xs text-neutral-300 pt-3 border-t border-white/10 mt-auto">
                {reg.citation}
              </p>
            </div>
          ))}

          {/* Audit trail card */}
          <div className="flex flex-col gap-4 rounded-3xl border border-[#1D57FF]/50 bg-[linear-gradient(180deg,rgba(29,87,255,0.15)_0%,rgba(255,255,255,0.04)_100%)] p-6 lg:p-7">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl lg:text-2xl font-medium text-white">
                Evidence-grade audit trail
              </h3>
              <p className="text-xs lg:text-sm text-neutral-300">
                Recorded for every single agent run
              </p>
            </div>
            <ol className="flex flex-col">
              {auditTrailSteps.map((step, index) => (
                <li key={step.label} className="flex items-stretch gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-[#1D57FF] shrink-0 mt-1.5" />
                    {index < auditTrailSteps.length - 1 && (
                      <span className="w-px flex-1 bg-white/20" />
                    )}
                  </div>
                  <p className="pb-2.5 text-sm lg:text-base text-neutral-200 leading-[145%]">
                    <span className="text-white font-medium">
                      {step.label}
                    </span>{" "}
                    <span className="text-neutral-300">— {step.detail}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" size="medium" onClick={handleDemoClick}>
            Request a Demo
          </Button>
          <p className="text-xs lg:text-sm text-neutral-300">
            Full security documentation available under NDA with your demo.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GovernanceSection;
