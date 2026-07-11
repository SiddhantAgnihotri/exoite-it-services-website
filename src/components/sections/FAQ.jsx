import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Do you build websites for small businesses?",
        answer:
            "Yes. We create responsive business websites for local businesses, institutes, startups, academies and professionals.",
    },
    {
        question: "Can you build custom software?",
        answer:
            "Yes. We build dashboards, portals, LMS, ERP, inventory systems, examination portals and other business automation tools.",
    },
    {
        question: "How can I contact Exoite IT Services?",
        answer:
            "You can directly contact us through WhatsApp using the contact buttons on this website.",
    },
    {
        question: "Do you provide support after launch?",
        answer:
            "Yes. We provide technical support, updates, maintenance and improvements after the project launch.",
    },
];

const FAQ = () => {
    return (
        <section className="section-soft px-5 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
                        FAQ
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                        Common Questions
                    </h2>

                    <p className="mt-5 text-slate-600">
                        Quick answers for businesses and institutes interested in working
                        with Exoite IT Services.
                    </p>
                </div>

                <div className="mt-12 grid gap-5">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="light-card rounded-3xl p-6">
                            <div className="relative z-10 flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <HelpCircle size={23} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-slate-950">
                                        {faq.question}
                                    </h3>
                                    <p className="mt-2 leading-7 text-slate-600">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;