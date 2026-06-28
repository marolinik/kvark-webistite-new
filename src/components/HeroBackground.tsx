import CornerDot from "@/components/common/CornerDot";
import DashedLine from "@/components/common/DashedLine";
import FilledDot from "@/components/common/FilledDot";

const HeroBackground = () => {
  return (
    <>
      <DashedLine className="left-3 lg:left-18 top-0 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine className="left-1/2 -translate-x-1/2 top-0 bottom-8 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine
        direction="horizontal"
        color="#F1F5F9"
        gapSize={0}
        dashSize={1}
        className="bottom-4 lg:bottom-9 left-3 lg:left-18 right-3 lg:right-18 hidden lg:block"
      />
      <CornerDot className="bottom-4 lg:bottom-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="bottom-4 lg:bottom-8 right-2 lg:right-17 hidden lg:block" />
      <FilledDot className="bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden lg:block" />
    </>
  );
};

export default HeroBackground;
