// GA4 helpers. The Google tag is loaded only after the visitor accepts analytics.
// Event parameters never include names, emails, phone numbers, messages or URLs with queries.
export const GA_MEASUREMENT_ID = "G-FER0ZN1GJZ";
const KEY = "exoite-analytics-consent";
let loaded = false;
let lastPath = null;

export const getConsent = () => {
  try { return window.localStorage.getItem(KEY); } catch { return null; }
};
const listeners = new Set();
export const subscribeConsent = (callback) => { listeners.add(callback); return () => listeners.delete(callback); };
export const setConsent = (value) => {
  try { window.localStorage.setItem(KEY, value); } catch { /* unavailable storage: choice lasts for this page only */ }
  if (value === "granted") loadAnalytics();
  else disableAnalytics();
  listeners.forEach((callback) => callback());
};

function loadAnalytics() {
  if (typeof window === "undefined") return;
  if (loaded) { // re-accepting after a withdrawal in the same visit
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  loaded = true;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  window.gtag("js", new Date());
  // page_view is sent manually per route (see trackPageView), so the config call must not send one.
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function disableAnalytics() {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  lastPath = null;
}

const active = () => typeof window !== "undefined" && loaded && getConsent() === "granted";

export function trackEvent(name, params = {}) {
  if (active()) window.gtag("event", name, params);
}

// Path only: query strings and hashes (e.g. ?service=) are never sent.
export function trackPageView(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (!active() || path === lastPath) return;
  lastPath = path;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}

export const trackLead = () => trackEvent("generate_lead", { form_name: "contact" });

export function linkEventFor(href = "") {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\b/i.test(href)) return "whatsapp_click";
  if (/^tel:/i.test(href)) return "phone_click";
  if (/^mailto:/i.test(href)) return "email_click";
  return null;
}
export const initialiseIfConsented = () => { if (getConsent() === "granted") loadAnalytics(); };
