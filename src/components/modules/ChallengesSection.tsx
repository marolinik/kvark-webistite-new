import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ScalesIcon,
  SealCheckIcon,
  LockKeyIcon,
  ChartLineUpIcon,
} from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";

const challenges = [
  {
    icon: ShieldCheckIcon,
    title: "Data sovereignty",
    risk: "Loss of control over your most sensitive data",
    approach:
      "All data and AI processing stay inside your infrastructure — nothing ever leaves your perimeter.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Information discovery",
    risk: "Knowledge scattered across systems and teams",
    approach:
      "Hybrid retrieval surfaces the right information for the right person at the right time.",
  },
  {
    icon: ScalesIcon,
    title: "Regulatory compliance",
    risk: "Exposure under the EU AI Act, GDPR, NIS2 and DORA",
    approach:
      "Governance, auditability and policy controls are enforced by design, not bolted on.",
  },
  {
    icon: SealCheckIcon,
    title: "Trust in AI outputs",
    risk: "Hallucinated answers erode confidence",
    approach:
      "Responses are grounded in your verified sources with full traceability to the original document.",
  },
  {
    icon: LockKeyIcon,
    title: "Access governance",
    risk: "AI that leaks documents users shouldn't see",
    approach:
      "Permission-aware AI mirrors your existing roles and access policies — fail-closed.",
  },
  {
    icon: ChartLineUpIcon,
    title: "AI cost predictability",
    risk: "Per-token pricing makes ROI a guess",
    approach:
      "Fixed, predictable infrastructure costs with maximum utilization of your own hardware.",
  },
];

const ChallengesBackground = () => {
  return (
    <>
      <DashedLine className="left-3 lg:left-18 top-0 bottom-0 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 bottom-0 hidden lg:block" />
      <CornerDot className="top-4 lg:top-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="top-4 lg:top-8 right-2 lg:right-17 hidden lg:block" />
    </>
  );
};

function ChallengesSection() {
  return (
    <section
      id="why-sovereign"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24"
    >
      <ChallengesBackground />
      <div className="relative flex flex-col items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why sovereign"
          title="Public AI fails the sovereignty test"
          subtitle="Your teams are already pasting sensitive data into public chatbots. The question is no longer whether your organization uses AI — it's whether you control it."
        />

        {/* Challenge cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {challenges.map((challenge) => (
            <div
              key={challenge.title}
              className="p-1 border border-neutral-50 rounded-3xl"
            >
              <div className="h-full flex flex-col gap-4 rounded-[1.25rem] border border-neutral-100 bg-neutral-25 p-6 lg:p-7 transition-colors duration-300 hover:border-primary-end/30 hover:bg-white">
                <div className="w-11 h-11 rounded-xl border border-neutral-100 bg-white flex items-center justify-center">
                  <challenge.icon
                    size={22}
                    weight="duotone"
                    className="text-primary-end"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg lg:text-xl font-medium text-neutral-900">
                    {challenge.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-400 leading-[150%]">
                    {challenge.risk}
                  </p>
                  <p className="text-sm lg:text-base text-neutral-600 leading-[150%]">
                    {challenge.approach}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sovereignty wedge */}
        <div className="w-full max-w-4xl p-1 border border-neutral-50 rounded-3xl">
          <blockquote className="rounded-[1.25rem] border border-neutral-100 bg-[linear-gradient(to_bottom_right,rgba(29,87,255,0.05)_0%,rgba(255,255,255,1)_100%)] px-6 py-8 lg:px-12 lg:py-10 text-center">
            <p className="text-lg lg:text-2xl text-neutral-900 leading-[150%] font-normal">
              An “EU region” of a foreign cloud is not sovereignty.
              Jurisdiction follows the entity, not the datacenter.
            </p>
            <p className="mt-3 text-sm lg:text-base text-neutral-500 leading-[150%]">
              KVARK runs where you run — inference-time residency, not just
              storage residency.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default ChallengesSection;
