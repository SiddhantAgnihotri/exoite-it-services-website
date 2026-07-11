import {
    School,
    Store,
    Dumbbell,
    Building2,
    GraduationCap,
    BriefcaseBusiness,
} from "lucide-react";

const industries = [
    {
        icon: School,
        title: "Schools",
        desc: "School websites, ERP, examination portals and student management systems.",
    },
    {
        icon: GraduationCap,
        title: "Coaching Institutes",
        desc: "LMS, admission forms, batch management and online learning portals.",
    },
    {
        icon: Store,
        title: "Local Businesses",
        desc: "Business websites, Google presence, enquiry systems and digital branding.",
    },
    {
        icon: Dumbbell,
        title: "Gyms & Academies",
        desc: "Membership management, attendance, fee tracking and promotional websites.",
    },
    {
        icon: Building2,
        title: "Startups",
        desc: "MVP development, landing pages, dashboards and scalable software systems.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Professionals",
        desc: "Portfolio websites, personal branding, appointment pages and service landing pages.",
    },
];

const Industries = () => {
    return (
        <section id="industries" className="section-soft px-5 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
                        Industries
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                        We Serve Different Business Needs
                    </h2>

                    <p className="mt-5 text-slate-600">
                        Our services are useful for education, local business, startups,
                        academies and professional service providers.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {industries.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="light-card group rounded-3xl p-7 transition hover:-translate-y-2"
                            >
                                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon size={28} />
                                </div>

                                <h3 className="relative z-10 text-xl font-black text-slate-950">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 mt-3 leading-7 text-slate-600">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Industries;