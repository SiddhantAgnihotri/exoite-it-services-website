import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Demo Client",
        role: "School / Institute",
        text: "Exoite IT Services understands education software needs and creates practical digital systems for institutions.",
    },
    {
        name: "Demo Client",
        role: "Local Business",
        text: "The website approach is modern, responsive and focused on generating real enquiries for businesses.",
    },
    {
        name: "Demo Client",
        role: "Training Partner",
        text: "The team has strong knowledge of coding, robotics, web development and IT training solutions.",
    },
];

const Testimonials = () => {
    return (
        <section className="section-blue px-5 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                        Testimonials
                    </p>

                    <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
                        What Clients Can Expect
                    </h2>

                    <p className="mt-5 text-slate-400">
                        Replace these demo testimonials with real client reviews after your
                        first few projects.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="pro-card rounded-3xl p-7"
                        >
                            <Quote className="relative z-10 text-cyan-300" size={34} />

                            <p className="relative z-10 mt-6 leading-8 text-slate-300">
                                "{item.text}"
                            </p>

                            <div className="relative z-10 mt-7 border-t border-white/10 pt-5">
                                <h3 className="font-bold text-white">{item.name}</h3>
                                <p className="mt-1 text-sm text-slate-400">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;