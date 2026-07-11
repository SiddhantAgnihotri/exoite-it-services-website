import { CheckCircle2 } from "lucide-react";

const points = [
    "Clear communication from project discussion to launch",
    "Clean, responsive and professional user interface",
    "Solutions planned according to your business workflow",
    "Experience in education, software and training domains",
    "Affordable starting options for small businesses",
    "Ongoing support, updates and future improvements",
];

const WhyChooseUs = () => {
    return (
        <section id="why-us" className="bg-slate-50 px-5 py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
                        Why Choose Us
                    </p>

                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                        A Practical Technology Partner for Your Business
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        We focus on building useful digital solutions, not just attractive
                        screens. Every project is planned with your business goal, users and
                        future growth in mind.
                    </p>
                </div>

                <div className="grid gap-4">
                    {points.map((point) => (
                        <div
                            key={point}
                            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <CheckCircle2 className="shrink-0 text-blue-600" />
                            <p className="font-bold text-slate-800">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;