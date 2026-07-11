import { ArrowRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const CTA = () => {
    return (
        <section id="contact" className="bg-white px-5 py-24">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-blue-600 p-8 text-center shadow-2xl shadow-blue-600/20 md:p-14">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-100">
                    Start Your Project
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                    Need a Website, App or Custom Software?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50">
                    Share your idea with us. We will understand your requirement and
                    suggest the right digital solution for your business.
                </p>

                <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-blue-600 shadow-xl transition hover:-translate-y-1 hover:bg-slate-50"
                >
                    Contact on WhatsApp
                    <ArrowRight size={18} />
                </a>
            </div>
        </section>
    );
};

export default CTA;