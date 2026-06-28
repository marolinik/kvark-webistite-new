const HorizontalSeparator = ({ className }: { className?: string }) => {
  return (
    <div className={`w-px h-4 bg-neutral-200 shrink-0 ${className}`}></div>
  );
};

export default HorizontalSeparator;
