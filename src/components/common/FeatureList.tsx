interface FeatureListItem {
  label: string;
  desc: string;
}

interface FeatureListProps {
  title: string;
  description: string;
  items: FeatureListItem[];
  variant?: "dark" | "light";
  className?: string;
}

export default function FeatureList({ title, description, items, variant = "dark", className = "" }: FeatureListProps) {
  const textColor = variant === "light" ? "text-neutral-900" : "text-neutral-0";
  const dividerColor = variant === "light" ? "bg-neutral-900/40" : "bg-neutral-0/40";
  const borderColor = variant === "light" ? "border-neutral-900/20" : "border-neutral-0/20";

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <h2 className={`text-[2.5rem] lg:text-[3.5rem] font-normal ${textColor} leading-[110%]`}>
        {title}
      </h2>

      <p className={`text-base lg:text-lg ${textColor} font-normal`}>
        {description}
      </p>

      <div className={`flex flex-col ${textColor}`}>
        {items.map(({ label, desc }) => (
          <div key={label} className={`flex flex-col lg:flex-row lg:items-stretch gap-2 lg:gap-4 py-5 border-b lg:border-b-0 last:border-b-0 ${borderColor}`}>
            <div className="break-mobile lg:break-desktop lg:w-2/7 flex items-center font-semibold text-base lg:text-lg">{label}</div>
            <div className={`hidden lg:block w-px ${dividerColor} shrink-0`} />
            <div className="flex-1 text-base lg:text-lg flex items-center">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
