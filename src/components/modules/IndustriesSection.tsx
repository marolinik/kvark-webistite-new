import { useState } from "react";
import {
  BankIcon,
  BuildingsIcon,
  HeartbeatIcon,
  LightningIcon,
} from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";

type IndustryKey = "public" | "financial" | "healthcare" | "infrastructure";

interface Industry {
  key: IndustryKey;
  icon: typeof BankIcon;
  tab: string;
  audience: string;
  pain: string;
  workflows: string[];
  complianceNote: string;
}

const industries: Industry[] = [
  {
    key: "public",
    icon: BuildingsIcon,
    tab: "Public Sector & National Security",
    audience:
      "Government ministries · Defense organizations · Law enforcement · Tax authorities",
    pain: "Classified and citizen data cannot touch a foreign cloud — yet the pressure to modernize with AI has never been higher.",
    workflows: [
      "Draft policy documents and case files with classification-aware access control",
      "Process claims and cases with a complete, evidence-grade audit trail",
      "Monitor compliance and prepare evidence packs automatically",
    ],
    complianceNote:
      "Fully air-gapped deployment with local open-weight models — no external dependency at inference time.",
  },
  {
    key: "financial",
    icon: BankIcon,
    tab: "Financial Services",
    audience: "Banks · Insurance · Payments & fintech · Investments & trading",
    pain: "AML, related-party screening and regulatory reporting drown analysts in manual research across scattered systems.",
    workflows: [
      "Accelerate AML research and case preparation — 50–70% faster in production",
      "Review and redline contracts with risk flags and clause comparison",
      "Draft RFP and tender responses with automated compliance checks",
    ],
    complianceNote:
      "DORA-aligned operational resilience: backups, circuit breakers, multi-level support and a documented exit strategy.",
  },
  {
    key: "healthcare",
    icon: HeartbeatIcon,
    tab: "Healthcare & Life Sciences",
    audience: "Hospitals · Pharma companies · Research institutes · Biotech firms",
    pain: "Patient records and research IP are the highest-cost data to leak — and the hardest to unlock for AI.",
    workflows: [
      "Search decades of research archives and clinical documentation semantically",
      "Draft regulatory submissions grounded in your verified internal sources",
      "Automate document-heavy processes with a human in the loop",
    ],
    complianceNote:
      "GDPR-first architecture: permission-aware retrieval, data lineage and audit logging on every interaction.",
  },
  {
    key: "infrastructure",
    icon: LightningIcon,
    tab: "Critical Infrastructure",
    audience:
      "Energy operators · Telecom operators · Transport operators · Cloud & trust service providers",
    pain: "NIS2 puts AI systems inside your security perimeter — public AI tools put them outside it.",
    workflows: [
      "Triage and route incidents and tickets with urgency detection",
      "Source and compare procurement offers with compliance checks",
      "Monitor operations and detect policy breaches in real time",
    ],
    complianceNote:
      "Runs entirely inside your perimeter — incident monitoring, activity logging and access management built in.",
  },
];

function IndustriesSection() {
  const [activeKey, setActiveKey] = useState<IndustryKey>("public");
  const active = industries.find((industry) => industry.key === activeKey)!;

  return (
    <section
      id="industries"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24"
    >
      <div className="relative flex flex-col items-center gap-10 lg:gap-14 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Industries"
          title="Built for the most regulated environments"
          subtitle="KVARK serves the industries where data security rules are strictest and the cost of leakage is highest — the environments public AI cannot enter."
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Industries"
          className="flex flex-wrap justify-center gap-3 w-full"
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            const currentIndex = industries.findIndex(
              (industry) => industry.key === activeKey
            );
            const offset = event.key === "ArrowRight" ? 1 : -1;
            const nextIndex =
              (currentIndex + offset + industries.length) % industries.length;
            setActiveKey(industries[nextIndex].key);
            (
              event.currentTarget.children[nextIndex] as HTMLElement | undefined
            )?.focus();
          }}
        >
          {industries.map((industry) => {
            const isActive = industry.key === activeKey;
            return (
              <button
                key={industry.key}
                id={`industry-tab-${industry.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`industry-panel-${industry.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveKey(industry.key)}
                className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-full border text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-primary-end bg-[linear-gradient(180deg,rgba(29,87,255,0.10)_0%,rgba(255,255,255,1)_100%)] text-primary-end font-medium"
                    : "border-neutral-100 bg-neutral-25 text-neutral-600 hover:border-neutral-200 hover:bg-white"
                }`}
              >
                <industry.icon size={18} weight="duotone" />
                {industry.tab}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={active.key}
          id={`industry-panel-${active.key}`}
          role="tabpanel"
          aria-labelledby={`industry-tab-${active.key}`}
          className="w-full p-1 border border-neutral-50 rounded-3xl animate-[fadeIn_0.35s_ease]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 rounded-[1.25rem] border border-neutral-100 bg-neutral-25 p-6 lg:p-12">
            <div className="flex flex-col gap-4">
              <span className="text-xs lg:text-sm font-medium tracking-[0.12em] uppercase text-neutral-400">
                {active.audience}
              </span>
              <h3 className="text-xl lg:text-3xl font-normal text-neutral-900 leading-[130%]">
                {active.pain}
              </h3>
              <p className="text-sm lg:text-base text-primary-end leading-[150%] mt-auto pt-4 border-t border-neutral-100">
                {active.complianceNote}
              </p>
            </div>
            <ul className="flex flex-col gap-4 justify-center">
              {active.workflows.map((workflow) => (
                <li
                  key={workflow}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white px-5 py-4 text-sm lg:text-base text-neutral-700 leading-[150%]"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #031B77 0%, #0526AA 100%)",
                    }}
                    aria-hidden="true"
                  />
                  {workflow}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
