import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { pushEvent } from "@/utils/gtm";

type SubscribeState = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email capture for the monthly sovereign-AI briefing. Reuses the existing
 * send-email backend; the subscription is flagged in the comment field so
 * the team can add the address to the briefing list.
 */
function BriefingSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setValidationError("Please enter a valid work email address.");
      return;
    }
    setValidationError(null);
    setState("submitting");
    try {
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Briefing",
          lastName: "Subscriber",
          email,
          companyName: "—",
          phone: "",
          country: "—",
          stateProvince: "",
          comment:
            "[Sovereign AI briefing subscription] Please add this address to the monthly briefing list.",
          acceptPrivacy: true,
        }),
      });
      if (response.ok) {
        pushEvent({ event: "briefing_subscribe", location: "insights_hub" });
        setState("success");
        setEmail("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="text-sm lg:text-base text-neutral-700 leading-[150%] text-center"
      >
        You're on the list — the next monthly briefing will land in your inbox.
        Unsubscribe with one click, any time.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-2.5"
      aria-label="Subscribe to the monthly sovereign AI briefing"
    >
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          aria-label="Work email"
          required
          className={`flex-1 font-medium text-neutral-900 text-sm lg:text-base placeholder:text-neutral-400 px-4 py-3 rounded-full border shadow-form-input bg-white ${
            validationError ? "border-red-400" : "border-neutral-200"
          }`}
        />
        <Button
          type="submit"
          variant="primary"
          size="small"
          disabled={state === "submitting"}
          className="!h-12 px-6"
        >
          {state === "submitting" ? "Subscribing…" : "Get the briefing"}
        </Button>
      </div>
      {validationError && (
        <p role="alert" className="text-xs text-red-600">
          {validationError}
        </p>
      )}
      {state === "error" && (
        <p role="alert" className="text-xs text-red-600">
          Something went wrong — please try again, or email hello@kvark.ai.
        </p>
      )}
      <p className="text-xs text-neutral-500 leading-[150%] text-center sm:text-left">
        One email per month, only the briefing. Consent is yours to withdraw —
        see the{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        . Prefer a feed?{" "}
        <a
          href="/insights-feed.xml"
          className="underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
        </a>
        .
      </p>
    </form>
  );
}

export default BriefingSubscribe;
