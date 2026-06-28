import Card from "@/components/common/Card";
import FilledDot from "@/components/common/FilledDot";
import CornerDot from "@/components/common/CornerDot";
import DashedLine from "@/components/common/DashedLine";

import costImage from "@/assets/advantages/cost.png";
import complianceImage from "@/assets/advantages/compliance.png";
import controlImage from "@/assets/advantages/control.png";

const AdvantagesBackground = () => {
  return (
    <>
      <DashedLine className="left-3 lg:left-18 top-0 lg:top-10 bottom-4 lg:bottom-13 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 lg:top-10 bottom-4 lg:bottom-13 hidden lg:block" />

      <DashedLine
        direction="horizontal"
        gapSize={0}
        dashSize={1}
        color="#F1F5F9"
        className="top-4 lg:top-9 left-3 lg:left-18 right-3 lg:right-18 hidden lg:block"
      />
      <CornerDot className="top-4 lg:top-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="top-4 lg:top-8 right-2 lg:right-17 hidden lg:block" />
      <FilledDot className="top-4 lg:top-8 left-1/2 -translate-x-1/2 hidden lg:block" />
    </>
  );
};

const AdvantagesCardsBackground = () => {
  return (
    <>
      <DashedLine className="left-1/3 hidden lg:block" />
      <DashedLine className="left-2/3 hidden lg:block" />
      <DashedLine
        direction="horizontal"
        className="-top-3 -right-1 -left-1 hidden lg:block"
      />
      <DashedLine
        gapSize={0}
        dashSize={1}
        color="#F1F5F9"
        direction="horizontal"
        className="-bottom-3 -right-1 -left-1 hidden lg:block"
      />
      <FilledDot className="-bottom-4 left-1/3 -translate-x-1/2 hidden lg:block" />
      <FilledDot className="-bottom-4 left-2/3 -translate-x-1/2 hidden lg:block" />
      <FilledDot className="-top-4 left-1/3 -translate-x-1/2 hidden lg:block" />
      <FilledDot className="-top-4 left-2/3 -translate-x-1/2 hidden lg:block" />
      <CornerDot className="-bottom-4 -left-2 -translate-x-1/2 hidden lg:block" />
      <CornerDot className="-bottom-4 -right-4 -translate-x-1/2 hidden lg:block" />
      <CornerDot className="-top-4 -left-2 -translate-x-1/2 hidden lg:block" />
      <CornerDot className="-top-4 -right-4 -translate-x-1/2 hidden lg:block" />
    </>
  );
};

function CostComplianceControlSection() {
  return (
    <section
      id="advantages"
      className="relative h-auto lg:h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8 pt-14 lg:pt-20"
    >
      {/* Advantages Container */}
      <AdvantagesBackground />
      <div className="relative h-full flex flex-col items-center justify-center gap-10 lg:gap-20">
        {/* Advantages Header */}
        <div className="h-auto relative flex flex-col items-center gap-5">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] text-neutral-900 text-center leading-[100%]">
            Security and Governance
          </h2>
          <p className="text-sm lg:text-base text-neutral-500 text-center">
            Confidently scale agent adoption across the enterprise with a platform engineered for trust, control, and regulatory assurance.
          </p>
        </div>

        {/* Advantages Cards */}
        <div className="relative w-full h-auto grid grid-cols-1 lg:grid-cols-3 p-2 gap-8 lg:gap-0">
          <AdvantagesCardsBackground />
          {/* Cards */}
          <Card
            image={controlImage}
            title="Control"
            description="Your data never leaves. You own the model. No black box."
            backDescription={"KVARK ensures your data never leaves your environment, and your models remain entirely under your ownership.\nEvery decision path is transparent-no black boxes, no external dependencies, and no loss of control over critical intelligence assets."}
          />
          <Card
            image={complianceImage}
            title="Compliance"
            description="Built for the world's most demanding regulatory environments."
            backDescription={"Air-gapped deployment and strict isolation make compliance straightforward, whether you operate under GDPR, HIPAA, or emerging regulatory frameworks.\nKVARK enforces governance by design, keeping all AI activity within your trusted perimeter."}
          />
          <Card
            image={costImage}
            title="Consistency"
            description="Permission inheritance from your systems"
            backDescription="KVARK respects and extends your existing access models, inheriting permissions directly from systems so governance remains consistent, auditable, and under your full control."
          />
        </div>
      </div>
    </section>
  );
}

export default CostComplianceControlSection;
