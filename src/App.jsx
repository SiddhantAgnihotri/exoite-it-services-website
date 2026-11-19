import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useSectionReveals from "./hooks/useSectionReveals";
import SEO from "./components/SEO";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import Analytics from "./components/Analytics";

import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import Portfolio from "./pages/Portfolio";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudy from "./pages/CaseStudy";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import LegalPage from "./pages/LegalPage";

function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  useSectionReveals(pathname);
  return (
    <>
      <SEO />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />

      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route
            path="/privacy-policy"
            element={<LegalPage documentKey="privacy-policy" />}
          />
          <Route
            path="/terms-of-service"
            element={<LegalPage documentKey="terms-of-service" />}
          />
          <Route path="/training" element={<Training />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <WhatsAppButton />
      <Analytics />
    </>
  );
}

export default App;
