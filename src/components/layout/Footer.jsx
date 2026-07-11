import { siteConfig } from "../../data/siteConfig";

const Footer = () => {
    return (
        <footer className="bg-slate-950 px-5 py-14 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 font-black text-white">
                            E
                        </div>

                        <div>
                            <h2 className="text-xl font-black">{siteConfig.companyName}</h2>
                            <p className="text-sm text-slate-400">{siteConfig.tagline}</p>
                        </div>
                    </div>

                    <p className="mt-5 max-w-md leading-7 text-slate-400">
                        Building websites, mobile apps, custom software, LMS, ERP and
                        digital solutions for businesses, schools, institutes and startups.
                    </p>
                </div>

                <div>
                    <h3 className="font-black text-white">Services</h3>
                    <div className="mt-4 space-y-3 text-sm text-slate-400">
                        <p>Website Development</p>
                        <p>Custom Software</p>
                        <p>Mobile Apps</p>
                        <p>IT Training</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-black text-white">Contact</h3>
                    <div className="mt-4 space-y-3 text-sm text-slate-400">
                        <p>{siteConfig.location}</p>
                        <p>{siteConfig.email}</p>
                        <p>+{siteConfig.whatsappNumber}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} {siteConfig.companyName}. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;