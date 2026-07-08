import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";

const results = [
  {
    value: "80%",
    label: "less time spent finding the right information",
  },
  {
    value: "50–70%",
    label: "faster AML research and case preparation",
  },
  {
    value: "2×",
    label: "more qualified business opportunities identified",
  },
  {
    value: "6 mo → 2 wk",
    label: "ESG report preparation cycle, compressed",
  },
];

const scope = [
  "KVARK core platform — Search, Assistant, Draft",
  "3 custom KVARK agents",
  "1 liquid-cooled 4U8G GPU server",
];

const traction = [
  "3 implementations delivered in year one",
  "2 further implementations in progress",
  "European Tier-1 bank pilot underway",
  "Partner network across 4 regions",
];

function CaseStudySection() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    pushEvent({
      event: "cta_click",
      button_name: "request_demo",
      location: "case_study",
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
      id="proof"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24"
      style={{ backgroundColor: "#030E2F" }}
    >
      <div className="relative flex flex-col items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        <SectionHeading
          dark
          eyebrow="Proof"
          title="In production, in a regulated environment"
          subtitle="AOFI — the Export Credit Agency of the Republic of Serbia — provides financing, guarantees and insurance for exporters under strict regulatory and data-governance requirements. KVARK runs its AI, entirely on-premise."
        />

        {/* Results grid */}
        <div className="w-full flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {results.map((result) => (
            <div
              key={result.label}
              className="flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/5 p-6 lg:p-8 text-center"
            >
              <span className="text-3xl lg:text-4xl font-medium text-white leading-none">
                {result.value}
              </span>
              <span className="text-sm lg:text-base text-neutral-300 leading-[145%]">
                {result.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs lg:text-sm text-neutral-300 text-center">
          Outcomes reported by AOFI from the first year of production
          operation.
        </p>
        </div>

        {/* Scope + traction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 lg:p-8">
            <h3 className="text-lg lg:text-xl font-medium text-white">
              Project scope
            </h3>
            <ul className="flex flex-col gap-2.5">
              {scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm lg:text-base text-neutral-300 leading-[145%]"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1D57FF] shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm lg:text-base text-neutral-300 leading-[150%] pt-3 border-t border-white/10 mt-auto">
              Phase II expansion is already underway — extending the platform
              to additional business processes.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 lg:p-8">
            <h3 className="text-lg lg:text-xl font-medium text-white">
              And the platform is scaling
            </h3>
            <ul className="flex flex-col gap-2.5">
              {traction.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm lg:text-base text-neutral-300 leading-[145%]"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1D57FF] shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="primary" size="medium" onClick={handleDemoClick}>
          Request a Demo
        </Button>
      </div>
    </section>
  );
}

export default CaseStudySection;
