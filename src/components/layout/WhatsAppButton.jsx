import { MessageCircle } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const WhatsAppButton = () => {
    return (
        <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="pulse-whatsapp fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition duration-300 hover:scale-110 hover:bg-green-400 md:h-16 md:w-16"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
};

export default WhatsAppButton;