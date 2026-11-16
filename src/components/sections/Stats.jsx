
const stats = [
    {
        value: "6",
        label: "Service Categories",
    },
    {
        value: "10+",
        label: "Technologies",
    },
    {
        value: "3",
        label: "Demo Solutions",
    },
    {
        value: "Tailored",
        label: "Custom Approach",
    },
];

const Stats = () => {
    return (
        <section className="section-dark px-5 py-10">
            <div className="mx-auto grid max-w-7xl gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}

                        className="pro-card rounded-2xl p-6 text-center"
                    >
                        <h3 className="relative z-10 text-4xl font-black text-cyan-300">
                            {stat.value}
                        </h3>
                        <p className="relative z-10 mt-2 text-sm font-medium text-slate-400">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;