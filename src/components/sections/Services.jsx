import {
    Globe,
    Smartphone,
    Settings,
    GraduationCap,
    Megaphone,
    Code,
} from "lucide-react";
import { motion } from "framer-motion";

import webDevelopment from "../../assets/images/web-development.png";
import mobileApp from "../../assets/images/mobile-app.png";
import customSoftware from "../../assets/images/custom-software.png";
import schoolSoftware from "../../assets/images/school-software.png";
import digitalMarketing from "../../assets/images/digital-marketing.png";
import itTraining from "../../assets/images/it-training.png";

const services = [
    {
        icon: Globe,
        title: "Website Development",
        image: webDevelopment,
        desc: "Professional, responsive and SEO-friendly websites for companies, schools, institutes and service providers.",
    },
    {
        icon: Settings,
        title: "Custom Software Development",
        image: customSoftware,
        desc: "Dashboards, portals, ERP, inventory systems and automation tools built around your business workflow.",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        image: mobileApp,
        desc: "Modern Android and cross-platform mobile apps for businesses, education, operations and customer engagement.",
    },
    {
        icon: GraduationCap,
        title: "School & Institute Solutions",
        image: schoolSoftware,
        desc: "LMS, examination portals, student dashboards, admission systems and digital learning platforms.",
    },
    {
        icon: Megaphone,
        title: "Digital Presence & Marketing",
        image: digitalMarketing,
        desc: "Brand presence, Google Business setup, social media support and digital growth solutions.",
    },
    {
        icon: Code,
        title: "IT Training & Workshops",
        image: itTraining,
        desc: "Training in web development, Python, app development, robotics, coding and corporate IT skills.",
    },
];

const Services = () => {
    return (
        <section id="services" className="bg-slate-50 px-5 py-20 md:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                        Services
                    </p>

                    <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                        Technology Services Built for Real Business Needs
                    </h2>

                    <p className="mt-5 text-[16px] leading-7 text-slate-600">
                        We design and develop practical digital solutions that help you
                        improve operations, generate enquiries and grow with technology.
                    </p>
                </div>

                <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="relative h-52 overflow-hidden bg-slate-100">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

                                    <div className="absolute bottom-5 left-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                                        <Icon size={26} />
                                    </div>
                                </div>

                                <div className="p-7">
                                    <h3 className="text-[20px] font-bold text-slate-950">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                                        {service.desc}
                                    </p>

                                    <a
                                        href="#contact"
                                        className="mt-6 inline-flex text-sm font-bold text-blue-600 transition hover:text-blue-700"
                                    >
                                        Request Consultation →
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;