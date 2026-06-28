import EventCard from "@/components/common/EventCard";
import CornerDot from "./common/CornerDot";
import DashedLine from "./common/DashedLine";
import { useRelatedPosts } from "@/hooks/useWordPress";

interface RelatedNewsProps {
  currentItemSlug: string;
  itemType: "Events" | "News";
}

function RelatedNews({ currentItemSlug }: RelatedNewsProps) {
  const { items: relatedItems, loading } = useRelatedPosts(currentItemSlug, 3);

  if (!loading && relatedItems.length === 0) return null;

  return (
    <section className="relative lg:px-40 px-8 py-16 lg:py-24 bg-neutral-0">
      <DashedLine
        direction="vertical"
        className="hidden lg:block left-18 bottom-12 top-0"
      />
      <DashedLine
        direction="vertical"
        className="hidden lg:block right-18 bottom-12 top-0"
      />
      <DashedLine
        direction="horizontal"
        className="hidden lg:block right-18 left-18 bottom-12"
      />
      <CornerDot
        className="hidden lg:block bottom-11 left-17"
        variant="light"
      />
      <CornerDot
        className="hidden lg:block bottom-11 right-17"
        variant="light"
      />
      <h2 className="text-[2rem] lg:text-[2.5rem] font-normal text-neutral-900 mb-8 lg:mb-12 max-w-4xl">
        Related News:
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-6 w-full animate-pulse">
              <div className="w-full h-[383px] rounded-4xl bg-neutral-100" />
              <div className="flex flex-col gap-4 px-2">
                <div className="h-4 w-1/3 bg-neutral-100 rounded" />
                <div className="h-6 w-3/4 bg-neutral-100 rounded" />
                <div className="h-4 w-full bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {relatedItems.map((item) => (
            <EventCard
              key={item.slug}
              slug={item.slug}
              type={item.type}
              title={item.title}
              description={item.description}
              authorName={item.authorName}
              authorTitle={item.authorTitle}
              authorImage={item.authorImage}
              dateLabel={item.dateLabel}
              image={item.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedNews;
