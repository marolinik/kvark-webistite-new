import { useSearchParams, useNavigate } from "react-router-dom";
import Section from "@/components/common/Section";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import { allJobs } from "@/data/jobsData";
import HorizontalSeparator from "@/components/common/HorizontalSeparator";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";

const CareersDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobTitle = searchParams.get("job") || "Position";

  // Find job by title
  const jobDetails = allJobs.find((job) => job.title === jobTitle) || {
    id: 0,
    title: jobTitle,
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "Join our team and help us build the future of enterprise AI.",
    keyResponsibilities: ["Details coming soon"],
    requirements: ["Details coming soon"],
    whatWeOffer: ["Details coming soon"],
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Job Details Section */}
      <Section id="job-details" className="pb-8">
        <div className="relative w-full min-h-screen px-8 lg:px-30 py-30 lg:py-40">
          {/* Back button */}
          <DashedLine
            direction="vertical"
            className="hidden lg:block lg:absolute left-30"
          />
          <DashedLine
            direction="vertical"
            className="hidden lg:block lg:absolute right-30"
          />
          <DashedLine
            direction="horizontal"
            className="hidden lg:block lg:absolute bottom-0 left-30 right-30"
          />
          <CornerDot
            className="hidden lg:block lg:absolute left-29 -bottom-[4.5px]"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block lg:absolute right-29 -bottom-[4.5px]"
            variant="light"
          />

          <div className="lg:ml-10 mb-8 lg:mb-12">
            <Button
              variant="outline"
              onClick={() => navigate("/company/careers")}
              className="text-neutral-900! border border-neutral-900! bg-white! hover:bg-neutral-25! h-10! lg:h-13! text-sm lg:text-base"
            >
              Back
            </Button>
          </div>

          {/* Job Header */}
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 lg:px-10 lg:py-5">
            <DashedLine
              direction="horizontal"
              className="hidden lg:block lg:absolute top-0"
            />
            <DashedLine
              direction="horizontal"
              className="hidden lg:block lg:absolute bottom-0"
            />
            <CornerDot
              className="hidden lg:block lg:absolute -left-1 -top-[4.5px]"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block lg:absolute -right-1 -top-[4.5px]"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block lg:absolute -left-1 -bottom-[4.5px]"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block lg:absolute -right-1 -bottom-[4.5px]"
              variant="light"
            />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
              <div className="flex flex-col gap-6">
                <h1 className="text-[2rem] lg:text-[2.5rem] font-normal text-neutral-900">
                  {jobDetails.title}
                </h1>
                <div className="text-sm lg:text-base flex flex-wrap items-center gap-2 lg:gap-4">
                  {jobDetails.tags.map((tag) => (
                    <>
                      <Tag key={tag} text={tag} />
                      <HorizontalSeparator />
                    </>
                  ))}
                  <span className="text-sm lg:text-base text-neutral-600">
                    {jobDetails.location}
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={scrollToForm}
                className="lg:hidden shrink-0 text-sm w-full h-10! lg:h-13!"
              >
                Apply Now
              </Button>
            </div>
          </div>

          {/* Job Content and Form */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:px-10">
            {/* Left Column - Job Content */}
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-6">
                  Role Overview
                </h2>
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                  {jobDetails.roleOverview}
                </p>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-6">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {jobDetails.keyResponsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="text-base lg:text-lg text-neutral-700 leading-relaxed flex gap-3"
                    >
                      <span className="text-primary-start mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-6">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {jobDetails.requirements.map((item, index) => (
                    <li
                      key={index}
                      className="text-base lg:text-lg text-neutral-700 leading-relaxed flex gap-3"
                    >
                      <span className="text-primary-start mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have - Optional Section */}
              {jobDetails.niceToHave && jobDetails.niceToHave.length > 0 && (
                <div>
                  <h2 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-6">
                    Nice to Have
                  </h2>
                  <ul className="space-y-3">
                    {jobDetails.niceToHave.map((item, index) => (
                      <li
                        key={index}
                        className="text-base lg:text-lg text-neutral-700 leading-relaxed flex gap-3"
                      >
                        <span className="text-primary-start mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Offer */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-normal text-neutral-900 mb-6">
                  What We Offer
                </h2>
                <ul className="space-y-3">
                  {jobDetails.whatWeOffer.map((item, index) => (
                    <li
                      key={index}
                      className="text-base lg:text-lg text-neutral-700 leading-relaxed flex gap-3"
                    >
                      <span className="text-primary-start mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Application Form (Sticky) */}
            <div className="lg:w-140 lg:shrink-0" id="application-form">
              <div className="lg:sticky lg:top-32 bg-white rounded-[24px] lg:rounded-[32px] shadow-lg p-6 lg:p-8">
                <CareerApplicationForm jobTitle={jobTitle} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default CareersDetails;
