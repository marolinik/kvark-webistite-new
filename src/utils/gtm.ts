type DataLayerEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem("kvark-analytics-consent") === "granted";
  } catch {
    return false;
  }
}

/**
 * Pushes an event to the GTM dataLayer — but only after the visitor has
 * granted analytics consent. Pre-consent interactions are never queued,
 * so they cannot be replayed to Google after a later opt-in.
 */
export function pushEvent(data: DataLayerEvent) {
  if (!hasAnalyticsConsent()) return;
  (window as Window & { dataLayer?: object[] }).dataLayer?.push(data);
}
