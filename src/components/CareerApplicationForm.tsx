import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  linkedIn?: string;
  portfolio?: string;
  resume: FileList;
};

interface CareerApplicationFormProps {
  jobTitle: string;
}

const SafeFileList =
  typeof FileList !== "undefined" ? FileList : (Object as unknown as typeof FileList);

const CareerApplicationForm = ({ jobTitle }: CareerApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[0-9+\-() ]+$/, "Phone number is invalid"),
    linkedIn: z.string().optional(),
    portfolio: z.string().optional(),
    resume: z
      .instanceof(SafeFileList)
      .refine(
        (files) => files.length > 0,
        "Resume is required"
      )
      .refine(
        (files) => files[0]?.size <= 5000000,
        "Resume size is too large"
      )
      .refine(
        (files) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(files[0]?.type),
        "Resume type is invalid"
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Convert resume file to base64
      let resumeData = "";
      let resumeFilename = "";

      if (data.resume && data.resume[0]) {
        const file = data.resume[0];
        resumeFilename = file.name;

        // Read file as base64
        const reader = new FileReader();
        resumeData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = (reader.result as string).split(",")[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // Prepare JSON payload
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        jobTitle: jobTitle,
        type: "career-application",
        linkedIn: data.linkedIn || "",
        portfolio: data.portfolio || "",
        resumeData,
        resumeFilename,
      };

      const response = await fetch("/api/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        (window as Window & { dataLayer?: object[] }).dataLayer?.push({
          event: "career_form_submit",
          form_name: "career_application",
          job_title: jobTitle,
        });
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully",
        });
        reset(); // Clear form
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "An error occurred while submitting the application",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred while submitting the application",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="career-application-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full h-full"
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
          htmlFor="firstName"
        >
          Your name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.firstName ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.lastName ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="email"
          >
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.email ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="phoneNumber"
          >
            Phone number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.phoneNumber ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="linkedIn"
          >
            LinkedIn profile
            <span className="text-neutral-400 text-xs">
              (optional)
            </span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="url"
              id="linkedIn"
              placeholder="Enter your LinkedIn URL"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.linkedIn ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("linkedIn")}
            />
            {errors.linkedIn && (
              <span className="text-red-500 text-xs">
                {errors.linkedIn.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="portfolio"
          >
            Portfolio/Website
            <span className="text-neutral-400 text-xs">
              (optional)
            </span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="url"
              id="portfolio"
              placeholder="Enter your portfolio URL"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.portfolio ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("portfolio")}
            />
            {errors.portfolio && (
              <span className="text-red-500 text-xs">
                {errors.portfolio.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
          htmlFor="resume"
        >
          Resume/CV
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-start file:text-white hover:file:bg-primary-end cursor-pointer ${errors.resume ? "border-red-500" : "border-neutral-100"
              }`}
            {...register("resume")}
          />
          {errors.resume && (
            <span className="text-red-500 text-xs">
              {errors.resume.message}
            </span>
          )}
        </div>
      </div>

      {submitStatus.type && (
        <div
          className={`p-2 text-xs rounded-xl ${submitStatus.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
            }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex justify-end mt-auto">
        <Button
          type="submit"
          variant="primary"
          size="medium"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit application"}
        </Button>
      </div>
    </form>
  );
};

export default CareerApplicationForm;
