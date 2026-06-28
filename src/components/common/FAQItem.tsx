import { CaretDownIcon } from "@phosphor-icons/react";
import { pushEvent } from "@/utils/gtm";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {

  const handleToggle = () => {
    if (!isOpen) {
      pushEvent({ event: "faq_item_click", question });
    }
    onToggle();
  };

  return (
    <div
      className="p-1 border border-neutral-50 rounded-3xl min-w-96 w-full"
      onClick={handleToggle}
    >
      <div
        className={`hover:bg-neutral-25 flex flex-col cursor-pointer rounded-3xl border border-neutral-100 p-6 text-neutral-900 font-normal text-sm lg:text-base transition-all duration-300 ${
          isOpen ? "bg-neutral-25 gap-3" : "gap-0"
        }`}
      >
        <div
          className={`flex gap-12 justify-between items-center w-full ${
            isOpen ? "bg-neutral-25" : ""
          }`}
        >
          <h3>{question}</h3>

          <button className="cursor-pointer rounded-full border border-neutral-100 p-4 bg-neutral-0">
            <CaretDownIcon
              size={12}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div
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
