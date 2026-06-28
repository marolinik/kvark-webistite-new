import { useState, useEffect, useRef } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

function ImageWithPlaceholder({
  src,
  alt,
  className = "",
  placeholderClassName = ""
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full ${className}`}
    >
      {/* Placeholder - shown while loading */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-linear-to-br from-neutral-100 via-neutral-50 to-neutral-100 animate-pulse ${placeholderClassName}`}
          style={{
            backgroundSize: "200% 200%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Actual Image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}

      {/* Inline shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default ImageWithPlaceholder;
