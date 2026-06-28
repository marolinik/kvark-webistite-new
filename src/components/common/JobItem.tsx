import { useNavigate } from "react-router-dom";
import HorizontalSeparator from "@/components/common/HorizontalSeparator";
import Tag from "@/components/common/Tag";
import Button from "@/components/common/Button";
import { pushEvent } from "@/utils/gtm";

const JobItem = ({
  title,
  tags,
  location,
}: {
  title: string;
  tags: string[];
  location: string;
}) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    pushEvent({ event: "job_details_click", job_title: title });
    navigate(`/company/careers/apply?job=${encodeURIComponent(title)}`);
  };

  return (
    <div className="w-full p-1 border border-neutral-50 rounded-3xl">
      <div className="w-full py-4 px-5 lg:p-8 border border-neutral-100 rounded-[1.25rem]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
          <div className="flex flex-col gap-4 w-full">
            <h3 className="text-[1.375rem] lg:text-2xl font-normal text-neutral-900">
              {title}
            </h3>
            <div className="flex flex-row gap-2 lg:gap-4 items-center justify-between w-max">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 lg:gap-4">
                  <Tag text={tag} />
                  <HorizontalSeparator />
                </div>
              ))}
              <span className="text-[.75rem] lg:text-base text-neutral-600">
                {location}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="medium"
            onClick={handleApplyClick}
            className="shrink-0 ml-auto lg:ml-0 text-xs lg:text-base text-neutral-500 bg-neutral-0 border border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 shadow-md h-10! lg:h-13!"
          >
            Show Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
