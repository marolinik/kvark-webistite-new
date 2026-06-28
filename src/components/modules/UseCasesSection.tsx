import { useState } from "react";
import CategoryNavigation, {
  type Category,
} from "@/components/CategoryNavigation";
import CategoryContent from "@/components/CategoryContent";
import CornerDot from "@/components/common/CornerDot";
import DashedLine from "@/components/common/DashedLine";

import useCaseBackground from "@/assets/backgrounds/use-case-background.svg";

const UseCaseBackground = () => {
  return (
    <>
      <CornerDot
        variant="dark"
        className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <CornerDot
        variant="dark"
        className="top-0 right-0 translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <CornerDot
        variant="dark"
        className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 hidden lg:block"
      />
      <CornerDot
        variant="dark"
        className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 hidden lg:block"
      />
      <CornerDot
        variant="dark"
        className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden lg:block"
      />
      <DashedLine
        direction="horizontal"
        className="top-0 left-0 right-0 hidden lg:block"
        color="#FFFFFF20"
      />
      <DashedLine
        direction="horizontal"
        className="bottom-0 left-0 right-0 hidden lg:block"
        color="#FFFFFF20"
      />
      <DashedLine
        className="top-0 left-0 bottom-0 hidden lg:block"
        color="#FFFFFF20"
      />
      <DashedLine
        className="top-0 right-0 bottom-0 hidden lg:block"
        color="#FFFFFF20"
      />
    </>
  );
};

function UseCasesSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Marketing");

  return (
    <section
      id="use-cases"
      className="relative h-auto lg:h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8 pt-14 lg:pt-20"
      style={{
        backgroundImage: `url(${useCaseBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Use Cases Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-neutral-0 gap-8">
        <UseCaseBackground />
        {/* Use Cases Header */}
        <div className="flex flex-col gap-5 text-center relative">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal leading-[100%]">
            Turning AI Strategy into Execution
          </h2>
          <p className="text-sm lg:text-base font-normal leading-[150%]">
            Explore practical implementations of AI agents transforming workflows across complex systems.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-12">
          <CategoryNavigation
            defaultCategory="Marketing"
            selectedCategory={selectedCategory}
            onSelectedCategoryChange={setSelectedCategory}
          />
          <CategoryContent category={selectedCategory} />
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
