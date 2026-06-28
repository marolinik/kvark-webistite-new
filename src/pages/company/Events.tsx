import { MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import Section from "@/components/common/Section";
import Pagination from "@/components/common/Pagination";
import CornerDot from "@/components/common/CornerDot";
import FilledDot from "@/components/common/FilledDot";
import DashedLine from "@/components/common/DashedLine";
import EventCard from "@/components/common/EventCard";
import FeaturedNewsCard from "@/components/common/FeaturedNewsCard";
import DemoSectionWhite from "@/components/DemoSectionWhite";
import { useAllPosts } from "@/hooks/useWordPress";

function Events() {
  const { items: allItems, loading, error } = useAllPosts();
  const location = useLocation();

  const [filter, setFilter] = useState<"All" | "Events" | "News">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const locationState = location.state as { page?: number; scrollY?: number } | null;
  const [currentPage, setCurrentPage] = useState<number>(locationState?.page ?? 1);
  const restoreScrollY = useRef<number | null>(locationState?.scrollY ?? null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<SVGSVGElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const filterOptions: ("All" | "Events" | "News")[] = [
    "All",
    "Events",
    "News",
  ];
  const itemsPerPage = 6;

  const featuredItem = useMemo(
    () => allItems.find((item) => item.isFeatured) ?? allItems[0] ?? null,
    [allItems],
  );

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesFilter = filter === "All" || item.type === filter;
      const loweredQuery = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(loweredQuery) ||
        item.description.toLowerCase().includes(loweredQuery) ||
        item.authorName.toLowerCase().includes(loweredQuery);

      return matchesFilter && matchesSearch;
    });
  }, [allItems, filter, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (option: "All" | "Events" | "News") => {
    setFilter(option);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.to(caretRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        optionsRef.current,
        {
          opacity: 0,
          y: -10,
          display: "none",
        },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(caretRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(optionsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(optionsRef.current, { display: "none" });
        },
      });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (restoreScrollY.current != null) {
      const target = restoreScrollY.current;
      requestAnimationFrame(() => {
        window.scrollTo({ top: target, behavior: "instant" });
      });
    }
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) return;
    listSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-lg text-neutral-500">
          Unable to load posts. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-auto lg:h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8 flex items-center">
        <DashedLine
          direction="vertical"
          className="hidden lg:block left-18"
        />
        <DashedLine
          direction="vertical"
          className="hidden lg:block right-18"
        />

        {/* Featured News/Event */}
        <div className="w-full pt-32 lg:pt-20 lg:px-8">
          {loading ? (
            <div className="w-full h-[692px] rounded-4xl bg-neutral-100 animate-pulse" />
          ) : featuredItem ? (
            <FeaturedNewsCard
              slug={featuredItem.slug}
              type={featuredItem.type}
              title={featuredItem.title}
              description={featuredItem.description}
              dateLabel={featuredItem.dateLabel}
              image={featuredItem.image}
            />
          ) : (
            <div className="w-full h-[692px] rounded-4xl bg-neutral-50 border border-dashed border-neutral-200 flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 rounded-full bg-white border border-neutral-100 flex items-center justify-center mb-6">
                <MagnifyingGlassIcon className="w-9 h-9 text-neutral-300" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-3">
                No News & Events Yet
              </h3>
              <p className="text-base lg:text-lg text-neutral-500 max-w-lg">
                Stay tuned — new posts will appear here soon.
              </p>
            </div>
          )}
        </div>
      </section>
      {(loading || allItems.length > 0) && (
        <Section id="events">
          <div className="relative h-full w-full px-8 lg:px-20 pb-4">
            <DashedLine
              direction="horizontal"
              className="hidden lg:block top-0 left-18 right-18"
            />
            <DashedLine
              direction="vertical"
              className="hidden lg:block left-18 top-0 bottom-2"
            />
            <DashedLine
              direction="vertical"
              className="hidden lg:block right-18 top-0 bottom-2"
            />
            <CornerDot className="hidden lg:block left-17 -top-1" />
            <CornerDot className="hidden lg:block right-17 -top-1" />
            <FilledDot className="hidden lg:block left-1/2 -translate-x-1/2 -top-1" />

            <div ref={listSectionRef} className="flex flex-col gap-4 lg:gap-0">
              <div className="relative flex flex-col lg:flex-row w-full lg:justify-between lg:items-center p-0 lg:p-11 gap-4 lg:gap-0">
                <DashedLine
                  direction="horizontal"
                  className="hidden lg:block bottom-0 -left-3 -right-3"
                />
                <CornerDot className="hidden lg:block -left-3 -bottom-1" />
                <CornerDot className="hidden lg:block -right-3 -bottom-1" />
                <div className="flex flex-row justify-between items-center lg:contents">
                  <h2 className="text-[2rem] lg:text-[2.5rem] font-normal text-neutral-900 leading-[110%]">
                    All Latest News
                    <br className="hidden lg:block" /> & Events{" "}
                  </h2>

                  <div
                    className="relative lg:ml-auto lg:mr-4 text-sm lg:text-base"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="min-w-32 appearance-none bg-white border border-neutral-100 rounded-full px-6 py-3 pr-10 text-neutral-900 focus:outline-none cursor-pointer text-left"
                    >
                      {filter}
                    </button>
                    <CaretDownIcon
                      ref={caretRef}
                      size={16}
                      weight="bold"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-900 pointer-events-none"
                    />

                    <div
                      ref={optionsRef}
                      className="min-w-32 absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-lg hidden z-10"
                    >
                      {filterOptions.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleFilterChange(type)}
                          className="cursor-pointer w-full px-6 py-3 text-left text-neutral-900 hover:text-primary-end transition-colors duration-200 bg-white hover:bg-primary-end/10"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-md text-sm lg:text-base">
                  <MagnifyingGlassIcon
                    weight="regular"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 lg:w-5 lg:h-5"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search news or events"
                    className="w-full bg-white border border-neutral-100 rounded-full pl-12 pr-6 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 p-0 lg:p-11">
                  {Array.from({ length: 6 }).map((_, i) => (
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
              ) : currentItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 lg:py-32 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6">
                    <MagnifyingGlassIcon className="w-7 h-7 text-neutral-300" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-normal text-neutral-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-base text-neutral-500 max-w-md mb-6">
                    {searchQuery
                      ? `We couldn't find anything matching "${searchQuery}".`
                      : `There are no ${filter === "All" ? "posts" : filter.toLowerCase()} available right now.`}
                  </p>
                  {(searchQuery || filter !== "All") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setFilter("All");
                        setCurrentPage(1);
                      }}
                      className="text-sm font-medium text-primary-end hover:text-primary-start transition-colors duration-200 cursor-pointer border-b border-primary-end/30 hover:border-primary-start/30 pb-px"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 p-0 lg:p-11">
                  {currentItems.map((item) => (
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
                      page={currentPage}
                    />
                  ))}
                </div>
              )}

              {filteredItems.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  cornerDotPosition={{ left: "-left-3", right: "-right-3" }}
                />
              )}
            </div>
          </div>
        </Section>
      )}
      <DemoSectionWhite />
    </>
  );
}

export default Events;
