import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { getConsent, setConsent, subscribeConsent, trackPageView, trackEvent, linkEventFor, initialiseIfConsented } from "../analytics";
import "../styles/analytics-consent.css";

export const OPEN_SETTINGS_EVENT = "exoite:analytics-settings";

export default function Analytics() {
  const { pathname } = useLocation();
  // "pending" on the server and during hydration, so prerendered HTML matches.
  const consent = useSyncExternalStore(subscribeConsent, () => getConsent() || "unset", () => "pending");
  const [reopened, setReopened] = useState(false);
  const open = reopened || consent === "unset";

  useEffect(() => {
    initialiseIfConsented();
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  useEffect(() => { trackPageView(pathname); }, [pathname, consent]);

  useEffect(() => {
    const onClick = (event) => {
      const name = linkEventFor(event.target.closest?.("a[href]")?.getAttribute("href") || "");
      if (name) trackEvent(name, { link_location: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const choose = (value) => { setConsent(value); setReopened(false); };
  if (!open) return null;
  return (
    <section className="analytics-consent" role="region" aria-label="Analytics preference">
      <p>
        We use Google Analytics to count visits and enquiry clicks. It only runs if you accept, and no advertising features are used.{" "}
        <Link to="/privacy-policy">Privacy policy</Link>
      </p>
      <div>
        <button type="button" onClick={() => choose("denied")}>Decline</button>
        <button type="button" data-primary onClick={() => choose("granted")}>Accept analytics</button>
      </div>
    </section>
  );
}
