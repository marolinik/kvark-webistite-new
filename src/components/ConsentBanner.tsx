import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "kvark-analytics-consent";

/** Dispatched from the footer "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = "kvark-open-consent";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    loadKvarkAnalytics?: () => void;
  }
}

function readStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Minimal analytics consent banner. GTM is never loaded until the visitor
 * explicitly accepts, consistent with the sovereignty positioning of the site.
 */
function ConsentBanner() {
  const [visible, setVisible] = useState<boolean>(
    () => readStoredConsent() === null
  );

  // Allow reopening from anywhere (footer "Cookie settings") so consent
  // withdrawal stays as easy as granting it (GDPR Art. 7(3)).
  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen);
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Storage unavailable, so treat the answer as a session-only choice.
    }
    if (choice === "granted") {
      window.loadKvarkAnalytics?.();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      aria-describedby="analytics-consent-description"
      className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-auto sm:max-w-md z-999 rounded-2xl border border-neutral-100 bg-white shadow-navbar p-3 sm:p-4 flex flex-col gap-3"
    >
      <p
        id="analytics-consent-description"
        className="text-xs sm:text-sm text-neutral-700 leading-[145%]"
      >
        We use Google Tag Manager for site analytics. It stays off until you
        allow it.{" "}
        <Link
          to="/privacy-policy"
          className="text-primary-end underline underline-offset-2"
        >
          Privacy Policy
        </Link>
      </p>
      <div className="flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => handleChoice("granted")}
          className="cursor-pointer flex-1 h-9 rounded-full text-xs sm:text-sm text-white border border-button-primary bg-linear-to-b from-primary-start to-primary-end hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-end"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => handleChoice("denied")}
          className="cursor-pointer flex-1 h-9 rounded-full text-xs sm:text-sm text-neutral-700 border border-neutral-200 bg-neutral-25 hover:bg-neutral-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-end"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default ConsentBanner;
