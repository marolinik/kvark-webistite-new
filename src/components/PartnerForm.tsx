import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { CountryDropdown } from "@/components/common/CountryDropdown";
import { StateProvinceDropdown } from "@/components/common/StateProvinceDropdown";
import { hasStatesProvinces } from "@/utils/stateProvinceData";
import { Link } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  country: string;
  stateProvince?: string;
  comment?: string;
  acceptPrivacy: boolean;
};

const PartnerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      .min(1, "Phone number is required")
      .regex(/^[0-9+\-() ]+$/, "Phone number must contain only numbers and +, -, (, ), or space"),
    country: z
      .string()
      .min(1, "Country is required")
      .refine((val) => val !== undefined && val !== "", {
        message: "Country is required",
      }),
    stateProvince: z.string().optional(),
    comment: z.string().optional(),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: "You must accept the privacy policy",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedCountry = watch("country");
  const acceptPrivacy = watch("acceptPrivacy");

  // Clear state/province when country changes to one without states
  useEffect(() => {
    if (selectedCountry && !hasStatesProvinces(selectedCountry)) {
      setValue("stateProvince", "");
    }
  }, [selectedCountry, setValue]);

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
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          type: "partnership", // Add type to distinguish from demo requests
        }),
      });

      const result = await response.json();

      if (response.ok) {
        (window as Window & { dataLayer?: object[] }).dataLayer?.push({
          event: "partner_form_submit",
          form_name: "partner_request",
        });
        setSubmitStatus({
          type: "success",
          message: "Partnership request sent successfully! We'll be in touch soon.",
        });
        reset(); // Clear form
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="partner-request-form"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-0 rounded-[24px] lg:rounded-[40px] p-6 lg:p-10 flex flex-col gap-6 w-full h-full"
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
          htmlFor="firstName"
        >
          Your Name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className={`font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.firstName ? "border-red-500" : "border-neutral-100"
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
              placeholder="Last Name"
              className={`font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.lastName ? "border-red-500" : "border-neutral-100"
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
            className="text-neutral-900 text-sm lg:text-[15px] leading-[100%] font-medium"
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
              className={`font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.email ? "border-red-500" : "border-neutral-100"
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
            className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
            htmlFor="phone"
          >
            Phone Number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              className={`h-full font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input ${errors.phone ? "border-red-500" : "border-neutral-100"
                }`}
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
          htmlFor="companyName"
        >
            Company Name
            <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="companyName"
            placeholder="Enter your company name"
            className={`font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full h-full shadow-form-input ${errors.companyName ? "border-red-500" : "border-neutral-100"
              }`}
            {...register("companyName")}
          />
          {errors.companyName && (
            <span className="text-red-500 text-xs">
              {errors.companyName.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2">
        <div className="flex flex-col gap-2 w-full min-w-0">
          <label
            className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
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
                  placeholder="Select your country"
                  error={!!errors.country}
                />
              )}
            />
            {errors.country && (
              <span className="text-red-500 text-xs">
                Country is required
              </span>
            )}
          </div>
        </div>
        <div
          className={`flex flex-col gap-2 w-full transition-opacity ${selectedCountry && !hasStatesProvinces(selectedCountry)
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
            } min-w-0`}
        >
          <label
            className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
            htmlFor="stateProvince"
          >
            State/Province
          </label>
          <div className="flex flex-col gap-1">
            <Controller
              name="stateProvince"
              control={control}
              render={({ field }) => (
                <StateProvinceDropdown
                  countryCode={selectedCountry}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Select your state/province"
                  error={!!errors.stateProvince}
                />
              )}
            />
            {errors.stateProvince && (
              <span className="text-red-500 text-xs">
                {errors.stateProvince.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-neutral-900 text-sm lg:text-[15px] leading-[100%]"
          htmlFor="comment"
        >
          Additional Comments
        </label>
        <div className="flex flex-col gap-1">
          <textarea
            id="comment"
            placeholder="Tell us more about your partnership interest..."
            rows={4}
            className={`font-medium text-neutral-900 text-sm lg:text-[15px] leading-[150%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input resize-none ${errors.comment ? "border-red-500" : "border-neutral-100"
              }`}
            {...register("comment")}
          />
          {errors.comment && (
            <span className="text-red-500 text-xs">
              {errors.comment.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="acceptPrivacy"
            className={`mt-0.5 w-4 h-4 rounded border ${errors.acceptPrivacy ? "border-red-500" : "border-neutral-300"
              } text-primary-500 focus:ring-primary-500`}
            {...register("acceptPrivacy")}
          />
          <label
            htmlFor="acceptPrivacy"
            className="text-neutral-900 text-sm lg:text-[15px] leading-[150%]"
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
          <span className="text-red-500 text-xs">
            {errors.acceptPrivacy.message}
          </span>
        )}
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
          disabled={isSubmitting || !acceptPrivacy}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};

export default PartnerForm;
