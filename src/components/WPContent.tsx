import { useEffect, useRef, useMemo } from "react";
import Carousel from "@/components/common/Carousel";

interface WPContentProps {
  html: string;
  className?: string;
}

interface ContentBlock {
  type: "html" | "carousel";
  html?: string;
  images?: { src: string; alt: string }[];
}

function parseContent(html: string): ContentBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: ContentBlock[] = [];
  let currentHtml = "";

  for (const node of Array.from(doc.body.childNodes)) {
    const el = node as HTMLElement;
    const isCarousel =
      el.nodeType === Node.ELEMENT_NODE &&
      el.classList?.contains("wp-block-gallery") &&
      el.classList?.contains("is-style-carousel");

    if (isCarousel) {
      if (currentHtml.trim()) {
        blocks.push({ type: "html", html: currentHtml });
        currentHtml = "";
      }

      const images = Array.from(el.querySelectorAll("img")).map((img) => ({
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "",
      }));

      blocks.push({ type: "carousel", images });
    } else {
      currentHtml += (node as HTMLElement).outerHTML || node.textContent || "";
    }
  }

  if (currentHtml.trim()) {
    blocks.push({ type: "html", html: currentHtml });
  }

  return blocks;
}

export default function WPContent({ html, className = "" }: WPContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocks = useMemo(() => parseContent(html), [html]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current
      .querySelectorAll<HTMLAnchorElement>("a[href]")
      .forEach((a) => {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
  }, [html]);

  return (
    <div ref={containerRef} className={className}>
      {blocks.map((block, i) =>
        block.type === "carousel" ? (
          <div key={i} className="my-8">
            <Carousel images={block.images!} />
          </div>
        ) : (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: block.html! }}
          />
        ),
      )}
    </div>
  );
}
