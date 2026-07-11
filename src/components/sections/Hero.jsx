import {
    ArrowRight,
    Code2,
    ShieldCheck,
    Play,
    BadgeCheck,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "../../data/siteConfig";

import heroDashboard from "../../assets/images/hero-dashboard.png";

const highlights = [
    "Business Websites",
    "Custom Software",
    "School & Institute Solutions",
];

const cards = [
    {
        title: "Website",
        desc: "Professional online presence",
    },
    {
        title: "Software",
        desc: "Custom digital systems",
    },
    {
        title: "Training",
        desc: "IT & coding programs",
    },
];

const Hero = () => {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-20"
        >
            <div className="absolute left-[-140px] top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute right-[-120px] top-28 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-2xl"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
                        <ShieldCheck size={16} />
                        MSME Registered IT Services Company
                    </div>

                    <h1 className="max-w-2xl text-[32px] font-extrabold leading-[1.14] tracking-tight text-slate-950 sm:text-[38px] lg:text-[44px] xl:text-[48px]">
                        Websites, Apps & Software for{" "}
                        <span className="text-[#2563EB]">Growing Businesses</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-[16px] leading-7 text-slate-600">
                        Exoite IT Services helps businesses, schools, coaching institutes
                        and startups build professional websites, mobile apps, dashboards,
                        LMS platforms and custom software systems.
                    </p>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                        <a
                            href={siteConfig.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] hover:shadow-md"
                        >
                            Discuss Your Project
                            <ArrowRight size={17} />
                        </a>

                        <a
                            href="#services"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#2563EB] hover:text-[#2563EB]"
                        >
                            <Play size={16} />
                            View Services
                        </a>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                            >
                                <CheckCircle2 size={15} className="text-[#2563EB]" />
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {cards.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <BadgeCheck className="mb-2 text-[#2563EB]" size={21} />
                                <h3 className="text-[15px] font-semibold text-slate-950">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/80">
                        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
                                <span className="h-3 w-3 rounded-full bg-red-400" />
                                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                                <span className="h-3 w-3 rounded-full bg-green-400" />
                                <span className="ml-3 text-xs font-medium text-slate-500">
                                    project-dashboard-preview
                                </span>
                            </div>

                            <div className="relative bg-slate-950">
                                <img
                                    src={heroDashboard}
                                    alt="Digital solution dashboard preview"
                                    className="h-[280px] w-full object-contain sm:h-[330px] lg:h-[360px] xl:h-[400px]"
                                />

                                <div className="absolute right-4 top-4 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl md:flex">
                                    <ShieldCheck className="text-[#2563EB]" size={19} />
                                    <span className="text-sm font-semibold text-slate-800">
                                        Secure & Scalable
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
                                <Code2 size={21} />
                            </div>

                            <div>
                                <h3 className="text-[15px] font-semibold text-slate-950">
                                    Custom Digital Solutions
                                </h3>
                                <p className="mt-1 text-[13px] leading-5 text-slate-600">
                                    Websites, dashboards, LMS, ERP and business automation tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;