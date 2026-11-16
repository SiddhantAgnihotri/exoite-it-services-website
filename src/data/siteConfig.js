export const siteConfig = {
    companyName: "Exoite IT Services",
    tagline: "Empowering Digital Future",
    email: "contact@exoiteitservices.com",
    phone: "6394732841",
    location: "Kanpur, Uttar Pradesh, India",

    whatsappNumber: "916394732841",

    get whatsappLink() {
        const message =
            "Hello Exoite IT Services, I want to discuss a project.";
        return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
            message
        )}`;
    },
};
export function whatsappLinkFor(context) {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Exoite IT Services, I would like to enquire about ${context}.`)}`;
}
