interface FilledDotProps {
  className?: string;
  color?: string;
}

function FilledDot({ className, color = "bg-neutral-200" }: FilledDotProps) {
  return (
    <div
      className={`absolute w-[9px] h-[9px] rounded-[3px] ${color} ${className}`}
    />
  );
}

export default FilledDot;
