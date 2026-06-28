interface DashedLineProps {
  className?: string;
  direction?: "vertical" | "horizontal";
  color?: string;
  dashSize?: number;
  gapSize?: number;
}

function DashedLine({
  className = "",
  direction = "vertical",
  color = "#E2E8F0",
  dashSize = 6,
  gapSize = 6,
}: DashedLineProps) {
  const totalSize = dashSize + gapSize;

  const gradientDirection = direction === "vertical" ? "to bottom" : "to right";
  const sizeClass = direction === "vertical" ? "w-px" : "h-px";

  // Only add default positioning if not provided in className
  const hasVerticalPos =
    className.includes("top-") || className.includes("bottom-");
  const hasHorizontalPos =
    className.includes("left-") || className.includes("right-");

  const defaultVerticalPos =
    direction === "vertical" && !hasVerticalPos ? "top-0 bottom-0" : "";
  const defaultHorizontalPos =
    direction === "horizontal" && !hasHorizontalPos ? "left-0 right-0" : "";

  return (
    <div
      className={`absolute ${defaultVerticalPos} ${defaultHorizontalPos} ${sizeClass} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(${gradientDirection}, ${color} 0px, ${color} ${dashSize}px, transparent ${dashSize}px, transparent ${totalSize}px)`,
      }}
    />
  );
}

export default DashedLine;
