import { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { serviceDetails } from "../../data/serviceDetails";
import logo from "../../assets/logo.png";
const mobileLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["Portfolio", "/portfolio"],
  ["Training", "/training"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
];
const primaryLinks = [
  ["Work", "/portfolio"],
  ["Products", "/products"],
  ["Company", "/about"],
  ["Insights", "/insights"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const servicesRef = useRef(null);
  const { pathname } = useLocation();
  const closeMenus = () => {
    setOpen(false);
    if (servicesRef.current) servicesRef.current.open = false;
  };
  const escape = (event) => {
    if (event.key === "Escape") {
      if (servicesRef.current?.open) {
        servicesRef.current.open = false;
        servicesRef.current.querySelector("summary")?.focus();
      } else {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
  };
  return (
    <header className="site-header" onKeyDown={escape}>
      <nav className="container navbar" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenus}>
          <img
            src={logo}
            width={42}
            height={42}
            alt="Exoite IT Services logo"
          />
          <span>
            <strong>Exoite</strong>
            <span>IT Services</span>
          </span>
        </Link>
        <div className="desktop-navigation">
          <details className="nav-disclosure" ref={servicesRef}>
            <summary
              className={
                pathname.startsWith("/services") || pathname === "/training"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Services <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <div className="nav-services-panel">
              <div>
                <p className="eyebrow">What we build</p>
                {serviceDetails.slice(0, 3).map((service) => (
                  <Link
                    key={service.slug}
                    to={"/services/" + service.slug}
                    onClick={closeMenus}
                  >
                    {service.name}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
              <div>
                <p className="eyebrow">More ways to work with us</p>
                {serviceDetails.slice(3).map((service) => (
                  <Link
                    key={service.slug}
                    to={"/services/" + service.slug}
                    onClick={closeMenus}
                  >
                    {service.name}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
                <Link to="/services" onClick={closeMenus}>
                  Explore all services
                </Link>
              </div>
            </div>
          </details>
          {primaryLinks.map(([label, path]) => (
            <NavLink
              key={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={path}
              onClick={closeMenus}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <Link className="nav-cta" to="/contact" onClick={closeMenus}>
          Start a project <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className="mobile-navigation" id="mobile-menu" hidden={!open}>
        {mobileLinks.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          className="button button-primary"
          onClick={closeMenus}
        >
          Start Your Project <ArrowUpRight size={16} />
        </Link>
      </div>
    </header>
  );
}
