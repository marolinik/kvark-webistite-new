import { useId, type ReactNode } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { pushEvent } from "@/utils/gtm";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentId = useId();

  const handleToggle = () => {
    if (!isOpen) {
      pushEvent({ event: "faq_item_click", question });
    }
    onToggle();
  };

  return (
    <div className="p-1 border border-neutral-50 rounded-3xl w-full">
      <div
        className={`hover:bg-neutral-25 flex flex-col rounded-3xl border border-neutral-100 p-6 text-neutral-900 font-normal text-sm lg:text-base transition-all duration-300 ${
          isOpen ? "bg-neutral-25 gap-3" : "gap-0"
        }`}
      >
        <h3 className="w-full">
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className={`group flex w-full items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-end ${
              isOpen ? "bg-neutral-25" : ""
            }`}
          >
            <span className="min-w-0">{question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 rounded-full border border-neutral-100 p-4 bg-neutral-0 transition-colors group-hover:bg-white"
            >
              <CaretDownIcon
                size={12}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
        </h3>

        <div
          id={contentId}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="text-neutral-600 font-normal text-sm lg:text-base leading-[150%]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
