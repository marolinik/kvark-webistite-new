import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full flex justify-center ${className || ""}`}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}

export default Section;
