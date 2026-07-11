import { Building2, MapPin, ShieldCheck, Headphones } from "lucide-react";

const items = [
    {
        icon: ShieldCheck,
        title: "MSME Registered",
        desc: "Recognized IT service enterprise",
    },
    {
        icon: MapPin,
        title: "Kanpur Based",
        desc: "Serving clients remotely",
    },
    {
        icon: Building2,
        title: "Business Focused",
        desc: "Websites, apps & software",
    },
    {
        icon: Headphones,
        title: "Direct Support",
        desc: "WhatsApp-first communication",
    },
];

const TrustBar = () => {
    return (
        <section className="section-white px-5 py-10">
            <div className="mx-auto grid max-w-7xl gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:grid-cols-4">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-5"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <Icon size={24} />
                            </div>

                            <div>
                                <h3 className="font-black text-slate-950">{item.title}</h3>
                                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TrustBar;