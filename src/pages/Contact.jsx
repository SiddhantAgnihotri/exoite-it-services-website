import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    CheckCircle2,
    Loader2,
    MessageCircle,
    Clock,
    BriefcaseBusiness,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const services = [
    "Website Development",
    "Custom Software Development",
    "Mobile App Development",
    "School / Institute Software",
    "Digital Marketing",
    "IT Training",
    "Other",
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        budget: "",
        message: "",
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createWhatsAppMessage = () => {
        return `Hello Exoite IT Services,

I want to discuss a project.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service Required: ${formData.service}
Budget: ${formData.budget || "Not mentioned"}

Message:
${formData.message}`;
    };

    const whatsappFormLink = `https://wa.me/${siteConfig.whatsappNumber
        }?text=${encodeURIComponent(createWhatsAppMessage())}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus({
            loading: true,
            success: false,
            error: "",
        });

        try {
            const payload = {
                access_key: "4c23bf19-15ad-4cc1-9469-45e61eedd701",
                subject: "New Website Enquiry - Exoite IT Services",
                from_name: "Exoite IT Services Website",
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                service: formData.service,
                budget: formData.budget,
                message: formData.message,
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({
                    loading: false,
                    success: true,
                    error: "",
                });

                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    service: "",
                    budget: "",
                    message: "",
                });
            } else {
                throw new Error(result.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus({
                loading: false,
                success: false,
                error: "Message could not be sent. Please contact us on WhatsApp.",
            });
        }
    };

    return (
        <main>
            <PageHero
                label="Contact Us"
                title="Let’s Discuss Your Website, App or Software Requirement"
                description="Share your project details with Exoite IT Services. We will understand your requirement and suggest the right digital solution."
            />

            <section className="bg-slate-50 px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    {/* Top Contact Cards */}
                    <div className="mb-10 grid gap-5 md:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <Phone size={22} />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">
                                Call / WhatsApp
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                +{siteConfig.whatsappNumber}
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <Mail size={22} />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">Email</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                contact@exoiteitservices.com
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <MapPin size={22} />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-950">
                                Location
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Kanpur, Uttar Pradesh, India
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* Form */}
                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                            <div className="mb-8">
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                    Project Enquiry
                                </p>

                                <h2 className="mt-3 text-[28px] font-extrabold tracking-tight text-slate-950 md:text-[34px]">
                                    Tell us what you want to build
                                </h2>

                                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
                                    Fill this form and your enquiry will be sent to{" "}
                                    <span className="font-semibold text-slate-900">
                                        contact@exoiteitservices.com
                                    </span>
                                    .
                                </p>
                            </div>

                            {status.success && (
                                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                                    <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                                    <p className="text-sm font-semibold">
                                        Your message has been sent successfully. We will contact you
                                        soon.
                                    </p>
                                </div>
                            )}

                            {status.error && (
                                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                                    {status.error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-800">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-800">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-800">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-800">
                                            Service Required *
                                        </label>
                                        <select
                                            name="service"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        >
                                            <option value="">Select service</option>
                                            {services.map((service) => (
                                                <option key={service} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-800">
                                        Estimated Budget
                                    </label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="Example: ₹10,000 - ₹25,000"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-800">
                                        Project Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your website, app, software, training or digital requirement..."
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={status.loading}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {status.loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={17} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Enquiry
                                                <Send size={17} />
                                            </>
                                        )}
                                    </button>

                                    <a
                                        href={whatsappFormLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
                                    >
                                        <MessageCircle size={17} />
                                        Send via WhatsApp
                                    </a>
                                </div>
                            </form>
                        </div>

                        {/* Right Side */}
                        <div className="space-y-6">
                            <div className="rounded-[28px] bg-slate-950 p-7 text-white shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <MessageCircle size={23} />
                                </div>

                                <h3 className="mt-5 text-[26px] font-extrabold leading-tight">
                                    Prefer direct discussion?
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                    Contact us directly on WhatsApp for a quick project
                                    discussion and requirement understanding.
                                </p>

                                <a
                                    href={siteConfig.whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Chat on WhatsApp
                                    <MessageCircle size={17} />
                                </a>
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
                                <h3 className="text-[22px] font-extrabold text-slate-950">
                                    What happens after you submit?
                                </h3>

                                <div className="mt-6 space-y-5">
                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                Requirement Review
                                            </h4>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                We check your requirement and understand your business
                                                need.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                Discussion Call
                                            </h4>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                We connect with you to discuss features, timeline and
                                                budget.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                Project Plan
                                            </h4>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                We suggest the right solution and next steps for your
                                                project.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
                                <h3 className="text-[22px] font-extrabold text-slate-950">
                                    Services You Can Discuss
                                </h3>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {services.slice(0, 6).map((service) => (
                                        <span
                                            key={service}
                                            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 p-4">
                                    <Clock className="text-blue-600" size={20} />
                                    <p className="text-sm font-semibold text-slate-700">
                                        Response time: usually within 24 hours.
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                                    <BriefcaseBusiness className="text-blue-600" size={20} />
                                    <p className="text-sm font-semibold text-slate-700">
                                        Remote services available across India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;