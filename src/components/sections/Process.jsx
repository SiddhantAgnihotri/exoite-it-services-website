import { MessageSquare, PenTool, Code2, Rocket, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        icon: MessageSquare,
        title: "Discuss",
        desc: "We understand your business, problems, goals and required features.",
    },
    {
        icon: PenTool,
        title: "Plan & Design",
        desc: "We create the structure, design direction and development roadmap.",
    },
    {
        icon: Code2,
        title: "Develop",
        desc: "We build responsive, fast and scalable software using modern technologies.",
    },
    {
        icon: Rocket,
        title: "Launch",
        desc: "We test everything properly and deploy your website or software.",
    },
    {
        icon: Headphones,
        title: "Support",
        desc: "We provide updates, maintenance and technical support after launch.",
    },
];

const Process = () => {
    return (
        <section className="section-blue-soft px-5 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
                        Our Process
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                        From Idea to Launch
                    </h2>

                    <p className="mt-5 text-slate-600">
                        A simple and clear development process to convert your idea into a
                        working digital solution.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="light-card relative rounded-3xl p-6 text-center transition hover:-translate-y-2"
                            >
                                <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <Icon size={30} />
                                </div>

                                <span className="relative z-10 mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                                    Step {index + 1}
                                </span>

                                <h3 className="relative z-10 text-xl font-black text-slate-950">
                                    {step.title}
                                </h3>

                                <p className="relative z-10 mt-3 text-sm leading-6 text-slate-600">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Process;