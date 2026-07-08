import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Button from "@/components/common/Button";
import { CountryDropdown } from "@/components/common/CountryDropdown";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@phosphor-icons/react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone?: string;
  country: string;
  stateProvince?: string;
  comment?: string;
  requestBriefing?: boolean;
  acceptPrivacy: boolean;
};

const DemoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [briefingRequested, setBriefingRequested] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    companyName: z.string().min(1, "Company name is required"),
    phone: z
      .string()
      .regex(/^[0-9+\-() ]*$/, "Phone number must contain only numbers and +, -, (, ), or space")
      .optional(),
    country: z
      .string()
      .min(1, "Country is required")
      .refine((val) => val !== undefined && val !== "", {
        message: "Country is required",
      }),
    stateProvince: z.string().optional(),
    comment: z.string().optional(),
    requestBriefing: z.boolean().optional(),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: "You must accept the privacy policy",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Status messages persist until the next submit so users never lose
  // the confirmation or the fallback contact address mid-read.

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setBriefingRequested(Boolean(data.requestBriefing));
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          companyName: data.companyName,
          phone: data.phone ?? "",
          country: data.country,
          stateProvince: data.stateProvince ?? "",
          comment: `${
            data.requestBriefing ? "[Security briefing requested] " : ""
          }${data.comment ?? ""}`,
          acceptPrivacy: data.acceptPrivacy,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        (window as Window & { dataLayer?: object[] }).dataLayer?.push({
          event: "demo_form_submit",
          form_name: "demo_request",
        });
        setSubmitStatus({
          type: "success",
          message: "Thank you — we'll reply within one business day to schedule your demo.",
        });
        reset(); // Clear form
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error ||
            "Failed to send message. Please try again, or email us at hello@kvark.ai.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please try again later, or email us at hello@kvark.ai.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus.type === "success") {
    return (
      <div
        id="demo-request-form"
        role="status"
        aria-live="polite"
        className="bg-neutral-0 rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 flex flex-col items-center justify-center text-center gap-5 w-full h-full min-h-96"
      >
        <CheckCircleIcon size={56} weight="fill" className="text-primary-end" />
        <h3 className="text-2xl lg:text-3xl font-medium text-neutral-900">
          Request received
        </h3>
        <p className="text-sm lg:text-base text-neutral-600 leading-[160%] max-w-sm">
          {submitStatus.message}
        </p>
        <p className="text-xs lg:text-sm text-neutral-500 leading-[160%] max-w-sm">
          {briefingRequested
            ? "Next: a 30-minute intro call, a demo tailored to your workflows, and the security briefing pack for your compliance team."
            : "Next: a 30-minute intro call, then a demo tailored to your workflows. The security briefing is available on request."}
        </p>
      </div>
    );
  }

  return (
    <form
      id="demo-request-form"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-0 rounded-[24px] lg:rounded-[40px] p-6 lg:p-10 flex flex-col gap-6 w-full h-full"
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
          htmlFor="firstName"
        >
          Your Name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              id="firstName"
              aria-label="First name"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              autoComplete="given-name"
              placeholder="First Name"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.firstName ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <span id="firstName-error" className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              id="lastName"
              aria-label="Last name"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              autoComplete="family-name"
              placeholder="Last Name"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.lastName ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <span id="lastName-error" className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label
            className="text-neutral-900 text-sm lg:text-base leading-[100%] font-medium"
            htmlFor="email"
          >
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              placeholder="Enter your email"
              className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.email ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("email")}
            />
            {errors.email && (
              <span id="email-error" className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="phone"
          >
            Phone{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="tel"
              id="phone"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel"
              placeholder="Phone number"
              className={`h-full font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.phone ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("phone")}
            />
            {errors.phone && (
              <span id="phone-error" className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
          htmlFor="companyName"
        >
          Company Name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="companyName"
            aria-invalid={errors.companyName ? "true" : "false"}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            autoComplete="organization"
            placeholder="Enter your company name"
            className={`font-medium text-neutral-900 text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.companyName ? "border-red-500" : "border-neutral-100"
              }`}
            {...register("companyName")}
          />
          {errors.companyName && (
            <span id="companyName-error" className="text-red-500 text-xs">
              {errors.companyName.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-2">
        <div className="flex flex-col gap-2 w-full">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
            htmlFor="country"
          >
            Country
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountryDropdown
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  placeholder="Select your country"
                  error={!!errors.country}
                />
              )}
            />
            {errors.country && (
              <span id="country-error" className="text-red-500 text-xs">
                Country is required
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-base leading-[100%]"
          htmlFor="comment"
        >
          Additional Comments{" "}
          <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <div className="flex flex-col gap-1">
          <textarea
            id="comment"
            placeholder="Tell us more about your needs or questions..."
            rows={4}
            aria-invalid={errors.comment ? "true" : "false"}
            aria-describedby={errors.comment ? "comment-error" : undefined}
            className={`font-medium text-neutral-900 text-sm lg:text-base leading-[150%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input resize-none ${errors.comment ? "border-red-500" : "border-neutral-100"
              }`}
            {...register("comment")}
          />
          {errors.comment && (
            <span id="comment-error" className="text-red-500 text-xs">
              {errors.comment.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="requestBriefing"
          className="mt-0.5 w-4 h-4 rounded border border-neutral-300"
          {...register("requestBriefing")}
        />
        <label
          htmlFor="requestBriefing"
          className="text-neutral-900 text-sm lg:text-base leading-[150%]"
        >
          Also send me the security briefing pack{" "}
          <span className="text-neutral-400">
            (architecture, regulatory mapping, audit-trail specification)
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
          id="acceptPrivacy"
          aria-invalid={errors.acceptPrivacy ? "true" : "false"}
          aria-describedby={
            errors.acceptPrivacy ? "acceptPrivacy-error" : undefined
          }
            className={`mt-0.5 w-4 h-4 rounded border ${errors.acceptPrivacy ? "border-red-500" : "border-neutral-300"
              } text-primary-500 focus:ring-primary-500`}
            {...register("acceptPrivacy")}
          />
          <label
            htmlFor="acceptPrivacy"
            className="text-neutral-900 text-sm lg:text-base leading-[150%]"
          >
            I have read and accept the KVARK{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-500 hover:text-primary-600 underline"
              target="_blank"
            >
              Privacy Policy
            </Link>
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        {errors.acceptPrivacy && (
          <span id="acceptPrivacy-error" className="text-red-500 text-xs">
            {errors.acceptPrivacy.message}
          </span>
        )}
      </div>

      {submitStatus.type === "error" && (
        <div
          role="alert"
          className="p-3 text-xs lg:text-sm rounded-xl bg-red-50 text-red-800 border border-red-200"
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex justify-end mt-auto">
        <Button type="submit" variant="primary" size="medium" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request My Demo"}
        </Button>
      </div>
    </form>
  );
};

export default DemoForm;
