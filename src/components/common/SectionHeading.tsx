interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 max-w-4xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs lg:text-sm font-medium tracking-[0.2em] uppercase ${
            dark ? "text-neutral-300" : "text-primary-end"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-[2.5rem] lg:text-[3.5rem] font-normal leading-[112%] ${
          dark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm lg:text-base font-normal leading-[150%] ${
            dark ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
