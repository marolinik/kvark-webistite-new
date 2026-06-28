import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface CarouselProps {
  images: { src: string; alt: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto max-h-[75vh] object-cover rounded-2xl select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-white hover:text-neutral-900 transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="Previous image"
          >
            <CaretLeftIcon size={18} weight="bold" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-white hover:text-neutral-900 transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="Next image"
          >
            <CaretRightIcon size={18} weight="bold" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === selectedIndex
                  ? "w-3 h-3 bg-primary-end"
                  : "w-2 h-2 bg-neutral-200 hover:bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
