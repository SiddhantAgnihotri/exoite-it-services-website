import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  // Contact already provides inline WhatsApp actions beside the enquiry form.
  if (pathname.replace(/\/$/, "") === "/contact") return null;
  return (
    <a
      className="whatsapp-button"
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Exoite on WhatsApp"
    >
      <MessageCircle size={25} aria-hidden="true" />
    </a>
  );
}
