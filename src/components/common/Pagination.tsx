import Button from "./Button";
import CornerDot from "./CornerDot";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  cornerDotPosition?: {
    left?: string;
    right?: string;
  };
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  cornerDotPosition = { left: "left-0", right: "right-0" },
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="relative flex w-full justify-center items-center gap-2 lg:gap-5 p-4 lg:p-11 lg:border-y border-neutral-50">
      {/* Top-left corner dot */}
      <CornerDot
        className={`hidden lg:block absolute ${cornerDotPosition.left} -top-[4.5px]`}
        variant="light"
      />

      {/* Top-right corner dot */}
      <CornerDot
        className={`hidden lg:block absolute ${cornerDotPosition.right} -top-[4.5px]`}
        variant="light"
      />

      {/* Bottom-left corner dot */}
      <CornerDot
        className={`hidden lg:block absolute ${cornerDotPosition.left} -bottom-[4.5px]`}
        variant="light"
      />

      {/* Bottom-right corner dot */}
      <CornerDot
        className={`hidden lg:block absolute ${cornerDotPosition.right} -bottom-[4.5px]`}
        variant="light"
      />

      <Button
        variant="outline"
        size="medium"
        className="text-neutral-500 bg-neutral-0 border border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 shadow-md lg:min-w-28 px-3 lg:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="hidden lg:inline">Previous</span>
      </Button>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="text-neutral-400 px-1">
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "outline"}
            size="medium"
            className={`rounded-full px-0 py-0 h-10 lg:h-14 w-10 lg:w-14 shrink-0 text-sm lg:text-base ${currentPage === page
              ? ""
              : "text-neutral-500 bg-neutral-0 border border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 shadow-md"
              }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="medium"
        className="text-neutral-500 bg-neutral-0 border border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 shadow-md lg:min-w-28 px-3 lg:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="hidden lg:inline">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
