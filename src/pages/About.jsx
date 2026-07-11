import PageHero from "../components/ui/PageHero";
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle2,
    Code2,
    GraduationCap,
    Lightbulb,
    Rocket,
    ShieldCheck,
    Target,
    Users,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";

import teamWorkspace from "../assets/images/team-workspace.png";

const stats = [
    {
        value: "6+",
        label: "Service Categories",
    },
    {
        value: "10+",
        label: "Technologies",
    },
    {
        value: "5+",
        label: "Demo Solutions",
    },
    {
        value: "100%",
        label: "Custom Approach",
    },
];

const values = [
    {
        icon: Target,
        title: "Business-Focused",
        desc: "We build solutions according to real business requirements, not just design trends.",
    },
    {
        icon: Code2,
        title: "Clean Development",
        desc: "We focus on clean UI, responsive layouts and scalable development practices.",
    },
    {
        icon: Users,
        title: "Clear Communication",
        desc: "We keep the process simple with direct communication and requirement clarity.",
    },
    {
        icon: ShieldCheck,
        title: "Reliable Support",
        desc: "We support clients after launch with updates, improvements and maintenance.",
    },
];

const expertise = [
    "Website Development",
    "Custom Software Development",
    "Mobile App Development",
    "School & Institute Software",
    "Learning Management Systems",
    "Examination Portals",
    "Digital Marketing",
    "IT Training & Workshops",
];

const journey = [
    {
        year: "Step 01",
        title: "Understand Requirement",
        desc: "We first understand your business, audience, goals and required features.",
    },
    {
        year: "Step 02",
        title: "Plan the Solution",
        desc: "We prepare the structure, pages, features and technology direction.",
    },
    {
        year: "Step 03",
        title: "Design & Develop",
        desc: "We build a responsive, professional and practical digital solution.",
    },
    {
        year: "Step 04",
        title: "Launch & Support",
        desc: "We deploy the project and provide support for future improvements.",
    },
];

const About = () => {
    return (
        <main>
            <PageHero
                label="About Exoite"
                title="A Practical IT Services Company for Modern Businesses"
                description="Exoite IT Services helps businesses, schools, institutes and startups build websites, software systems, mobile apps and digital solutions."
            />

            {/* Intro Section */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Who We Are
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            We create digital solutions that help businesses work smarter.
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-slate-600">
                            Exoite IT Services is focused on building professional websites,
                            custom software, mobile apps, education technology platforms and
                            digital systems. Our goal is to help businesses and institutions
                            become more organized, modern and digitally ready.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {[
                                "MSME Registered IT Services Company",
                                "Based in Kanpur, serving remotely",
                                "Web, app and software development",
                                "Education and training expertise",
                            ].map((point) => (
                                <div
                                    key={point}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <CheckCircle2 className="shrink-0 text-blue-600" size={20} />
                                    <p className="text-sm font-semibold text-slate-800">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <a
                            href={siteConfig.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Discuss Your Project
                            <ArrowRight size={17} />
                        </a>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/80">
                            <img
                                src={teamWorkspace}
                                alt="Exoite IT Services team workspace"
                                className="h-[320px] w-full rounded-[22px] object-cover md:h-[440px]"
                            />
                        </div>

                        <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                    <Building2 size={23} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-950">
                                        Built for Practical Business Growth
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        We combine design, development and training experience to
                                        create useful digital products.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-slate-50 px-5 py-16">
                <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-[24px] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <h3 className="text-[34px] font-extrabold text-blue-600">
                                {stat.value}
                            </h3>
                            <p className="mt-2 text-sm font-semibold text-slate-600">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Vision */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Lightbulb size={26} />
                        </div>

                        <h3 className="mt-6 text-[24px] font-extrabold text-slate-950">
                            Our Mission
                        </h3>

                        <p className="mt-3 text-[15px] leading-7 text-slate-600">
                            To provide practical, affordable and scalable digital solutions
                            that help businesses, schools, institutes and startups improve
                            their digital presence and operations.
                        </p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Rocket size={26} />
                        </div>

                        <h3 className="mt-6 text-[24px] font-extrabold text-slate-950">
                            Our Vision
                        </h3>

                        <p className="mt-3 text-[15px] leading-7 text-slate-600">
                            To become a trusted technology partner for growing businesses and
                            educational institutions by delivering reliable software, websites,
                            apps and training solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-slate-50 px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Our Values
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            What makes our work different
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-slate-600">
                            We focus on clarity, reliability and practical results so that
                            every project becomes useful for the client.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon size={25} />
                                    </div>

                                    <h3 className="mt-6 text-[19px] font-bold text-slate-950">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {value.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Expertise */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            What We Do
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            Services and solutions we specialize in
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-slate-600">
                            Our work covers business websites, custom dashboards, portals,
                            education software, mobile apps and practical IT training.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {expertise.map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <BadgeCheck className="shrink-0 text-blue-600" size={20} />
                                <p className="text-sm font-semibold text-slate-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className="bg-slate-50 px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Our Approach
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            How we work with clients
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {journey.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <p className="text-sm font-bold text-blue-600">{item.year}</p>
                                <h3 className="mt-3 text-lg font-bold text-slate-950">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder / Trust */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-center shadow-xl md:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                        <GraduationCap size={30} />
                    </div>

                    <h2 className="mt-6 text-[28px] font-extrabold tracking-tight text-white md:text-[38px]">
                        Built with software, education and training experience.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-slate-300">
                        Exoite IT Services combines software development skills with
                        education and training experience, making us especially strong for
                        school, institute and business software projects.
                    </p>

                    <a
                        href={siteConfig.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Start a Project Discussion
                        <ArrowRight size={17} />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default About;