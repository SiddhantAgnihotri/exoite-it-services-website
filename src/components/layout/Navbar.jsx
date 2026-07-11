import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

import logo from "../../assets/logo.png";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Training", path: "/training" },
    { label: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `text-[14px] font-semibold transition ${isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
        }`;

    return (
        <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    onClick={() => setOpen(false)}
                >
                    <img
                        src={logo}
                        alt="Exoite IT Services Logo"
                        className="h-11 w-11 rounded-xl object-contain"
                    />

                    <div>
                        <h1 className="text-lg font-black leading-none tracking-tight text-slate-950">
                            Exoite
                        </h1>
                        <p className="text-xs font-semibold tracking-wide text-slate-500">
                            IT Services
                        </p>
                    </div>
                </Link>

                <div className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <NavLink key={link.path} to={link.path} className={linkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] hover:shadow-md lg:flex"
                >
                    Contact on WhatsApp
                    <ArrowRight size={16} />
                </a>

                <button
                    onClick={() => setOpen(!open)}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-sm lg:hidden"
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        <a
                            href={siteConfig.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                        >
                            Contact on WhatsApp
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;