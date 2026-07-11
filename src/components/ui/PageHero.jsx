const PageHero = ({ label, title, description }) => {
    return (
        <section className="bg-gradient-to-b from-white via-slate-50 to-white px-5 pb-16 pt-32">
            <div className="mx-auto max-w-7xl text-center">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                    {label}
                </p>

                <h1 className="mx-auto mt-4 max-w-3xl text-[34px] font-extrabold leading-tight tracking-tight text-slate-950 md:text-[44px]">
                    {title}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-slate-600">
                    {description}
                </p>
            </div>
        </section>
    );
};

export default PageHero;