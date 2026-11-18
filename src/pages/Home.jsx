import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import AIAutomationFeature from "../components/sections/AIAutomationFeature";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import Industries from "../components/sections/Industries";
import CompanyIntro from "../components/sections/CompanyIntro";
import ProductShowcase from "../components/sections/ProductShowcase";
import HomeProcess from "../components/sections/HomeProcess";
import InsightsPreview from "../components/sections/InsightsPreview";
import CTA from "../components/sections/CTA";
export default function Home() {
  return (
    <main className="homepage">
      <Hero />
      <CompanyIntro />
      <Services />
      <AIAutomationFeature />
      <FeaturedSolutions />
      <Industries />
      <HomeProcess />
      <ProductShowcase />
      <InsightsPreview />
      <CTA />
    </main>
  );
}
