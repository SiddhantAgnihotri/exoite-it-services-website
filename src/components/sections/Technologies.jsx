const technologies = [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Firebase",
    "Flutter",
    "React Native",
    "Cloudinary",
    "Vercel",
    
];

const Technologies = () => {
    return (
        <section id="technologies" className="bg-white px-5 py-20 md:py-24">
            <div className="mx-auto max-w-7xl text-center">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                    Technologies
                </p>

                <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                    Technologies We Use
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-slate-600">
                    We use modern and reliable technologies to build responsive websites,
                    scalable web applications, mobile apps, APIs and cloud-based software
                    solutions.
                </p>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {technologies.map((tech) => (
                        <div
                            key={tech}
                            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                        >
                            <span className="text-[15px] font-bold text-slate-800">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Technologies;