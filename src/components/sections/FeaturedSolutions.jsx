import { ArrowRight, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

import examPortal from "../../assets/images/portfolio-exam-portal.png";
import inventory from "../../assets/images/portfolio-inventory.png";
import lms from "../../assets/images/portfolio-lms.png";

const solutions = [
    {
        title: "Online Examination Portal",
        type: "Education Software",
        image: examPortal,
        desc: "A complete examination platform for schools and institutes with teacher dashboard, student login, question management and result tracking.",
        features: ["Teacher Dashboard", "Student Login", "Result Management"],
    },
    {
        title: "Inventory Management System",
        type: "Business Software",
        image: inventory,
        desc: "A simple and powerful stock management system for shops, schools and organizations to manage items, issues and balance stock.",
        features: ["Stock Tracking", "Custom Columns", "Reports"],
    },
    {
        title: "Learning Management System",
        type: "EdTech Platform",
        image: lms,
        desc: "A digital learning platform for courses, students, assignments, live classes, progress tracking and certificates.",
        features: ["Course Management", "Student Progress", "Certificates"],
    },
];

const FeaturedSolutions = () => {
    return (
        <section id="solutions" className="bg-white px-5 py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Solutions
                        </p>

                        <h2 className="mt-4 max-w-2xl text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            Ready-to-Customize Software Solutions
                        </h2>
                    </div>

                    <p className="max-w-xl text-[16px] leading-7 text-slate-600">
                        These solutions can be customized for schools, institutes,
                        startups, shops and service-based businesses.
                    </p>
                </div>

                <div className="grid gap-7 lg:grid-cols-3">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden bg-slate-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

                                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-lg">
                                    {item.type}
                                </span>
                            </div>

                            <div className="p-7">
                                <h3 className="text-[22px] font-bold text-slate-950">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-[15px] leading-7 text-slate-600">
                                    {item.desc}
                                </p>

                                <div className="mt-6 space-y-3">
                                    {item.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <BadgeCheck size={18} className="text-blue-600" />
                                            <span className="text-sm font-semibold text-slate-700">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="#contact"
                                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 hover:text-blue-700"
                                >
                                    Discuss This Solution <ArrowRight size={17} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSolutions;