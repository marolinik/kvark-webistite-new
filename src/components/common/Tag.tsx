const Tag = ({ text }: { text: string }) => {
  return (
    <span className="text-sm lg:text-base text-neutral-600 py-1 px-2 border border-neutral-50 rounded-xl flex items-center gap-2">
      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-neutral-100 rounded-full"></div>
      {text}
    </span>
  );
};

export default Tag;
