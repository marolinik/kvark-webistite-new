import { MagnifyingGlassIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useState, useRef, useEffect, useMemo } from "react";
import Section from "@/components/common/Section";
import gsap from "gsap";
import JobList from "@/components/JobList";
import Pagination from "@/components/common/Pagination";
import CornerDot from "@/components/common/CornerDot";
import FilledDot from "@/components/common/FilledDot";
import DashedLine from "@/components/common/DashedLine";
import { allJobs } from "@/data/jobsData";

function Careers() {
  const [workType, setWorkType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<SVGSVGElement>(null);

  const workTypes = ["All", "Remote", "Onsite", "Hybrid"];
  const jobsPerPage = 5;

  // Filter jobs based on search and work type
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesWorkType = workType === "All" || job.tags.includes(workType);

      return matchesSearch && matchesWorkType;
    });
  }, [searchQuery, workType]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Handler for search query change - resets pagination
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handler for work type change - resets pagination
  const handleWorkTypeChange = (option: string) => {
    setWorkType(option);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Handle click outside to close dropdown
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

  // Animate dropdown and caret
  useEffect(() => {
    if (isDropdownOpen) {
      // Rotate caret down
      gsap.to(caretRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate dropdown menu
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
      // Rotate caret back
      gsap.to(caretRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Hide dropdown menu
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

  return (
    <Section id="careers">
      <div className="relative h-full w-full pt-30 lg:pt-40 px-8 lg:px-20 pb-4">
        {/* Top solid border */}
        <div className="hidden lg:block lg:absolute top-30 lg:top-40 left-10 lg:left-20 right-10 lg:right-20 h-px bg-neutral-50" />

        {/* Top-left corner dot */}
        <CornerDot
          className="hidden lg:block lg:absolute left-10 lg:left-20 top-[calc(7.5rem-4.5px)] lg:top-[calc(10rem-4.5px)]"
          variant="light"
        />

        {/* Top-right corner dot */}
        <CornerDot
          className="hidden lg:block lg:absolute right-10 lg:right-20 top-[calc(7.5rem-4.5px)] lg:top-[calc(10rem-4.5px)]"
          variant="light"
        />

        {/* Filled dot in the middle of top border */}
        <FilledDot
          className="hidden lg:block lg:absolute left-1/2 -translate-x-1/2 top-[calc(7.5rem-4.5px)] lg:top-[calc(10rem-4.5px)]"
          color="bg-neutral-200"
        />

        {/* Left side full-height dashed line */}
        <DashedLine
          direction="vertical"
          className="hidden lg:block lg:absolute left-11 lg:left-21"
        />

        {/* Right side full-height dashed line */}
        <DashedLine
          direction="vertical"
          className="hidden lg:block lg:absolute right-11 lg:right-21"
        />

        <div className="flex flex-col gap-4 lg:gap-0">
          <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center p-0 lg:p-11 gap-4 lg:gap-0">
            {/* First row on mobile: Header + Dropdown side by side */}
            <div className="flex flex-row justify-between items-center lg:contents">
              <h2 className="text-[2rem] lg:text-[2.5rem] font-normal text-neutral-900">
                All Jobs{" "}
                <span className="text-sm lg:text-base text-neutral-400">
                  ({filteredJobs.length} jobs)
                </span>
              </h2>

              {/* Work Type Dropdown */}
              <div
                className="relative lg:ml-auto lg:mr-4 text-sm lg:text-base"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="min-w-32 appearance-none bg-white border border-neutral-100 rounded-full px-6 py-3 pr-10 text-neutral-900 focus:outline-none cursor-pointer text-left"
                >
                  {workType}
                </button>
                <CaretDownIcon
                  ref={caretRef}
                  size={16}
                  weight="bold"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-900 pointer-events-none"
                />

                {/* Custom Options Menu */}
                <div
                  ref={optionsRef}
                  className="min-w-32 absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-lg hidden z-10"
                >
                  {workTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleWorkTypeChange(type)}
                      className="cursor-pointer w-full px-6 py-3 text-left text-neutral-900 hover:text-primary-end transition-colors duration-200 bg-white hover:bg-primary-end/10"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Second row on mobile: Search alone / On desktop: in same row */}
            <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-md text-sm lg:text-base">
              <MagnifyingGlassIcon
                weight="regular"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 lg:w-5 lg:h-5"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search jobs"
                className="w-full bg-white border border-neutral-100 rounded-full pl-12 pr-6 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Jobs List */}
          <JobList jobs={currentJobs} />

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </Section>
  );
}

export default Careers;
