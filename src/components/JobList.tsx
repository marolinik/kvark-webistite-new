import JobItem from "@/components/common/JobItem";
import CornerDot from "@/components/common/CornerDot";
import DashedLine from "@/components/common/DashedLine";

interface Job {
  id: number;
  title: string;
  tags: string[];
  location: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
  if (jobs.length === 0) {
    return (
      <div className="relative flex flex-col gap-10 p-0 lg:p-11">
        {/* Top dashed border */}
        <DashedLine
          direction="horizontal"
          className="hidden lg:block lg:absolute top-0"
        />

        {/* Top-left corner dot */}
        <CornerDot
          className="hidden lg:block lg:absolute left-0 -top-[4.5px]"
          variant="light"
        />

        {/* Top-right corner dot */}
        <CornerDot
          className="hidden lg:block lg:absolute right-0 -top-[4.5px]"
          variant="light"
        />

        <div className="text-center py-10 text-neutral-400 text-lg">
          No jobs found matching your criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-10 p-0 lg:p-11">
      {/* Top dashed border */}
      <DashedLine
        direction="horizontal"
        className="hidden lg:block lg:absolute top-0"
      />

      {/* Top-left corner dot */}
      <CornerDot
        className="hidden lg:block lg:absolute left-0 -top-[4.5px]"
        variant="light"
      />

      {/* Top-right corner dot */}
      <CornerDot
        className="hidden lg:block lg:absolute right-0 -top-[4.5px]"
        variant="light"
      />

      {jobs.map((job) => (
        <JobItem
          key={job.id}
          title={job.title}
          tags={job.tags}
          location={job.location}
        />
      ))}
    </div>
  );
};

export default JobList;
