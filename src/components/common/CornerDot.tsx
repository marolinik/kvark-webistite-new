interface CornerDotProps {
  className?: string;
  variant?: "light" | "dark";
}

function CornerDot({ className, variant = "light" }: CornerDotProps) {
  const variantClasses =
    variant === "light"
      ? "bg-white border-neutral-200 shadow-sm"
      : "bg-[#010F35] border-white/16";

  return (
    <div
      className={`absolute z-10 w-[9px] h-[9px] rounded-[3px] border ${variantClasses} ${className}`}
    />
  );
}

export default CornerDot;
