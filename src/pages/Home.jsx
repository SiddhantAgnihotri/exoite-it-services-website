import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Services from "../components/sections/Services";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import Industries from "../components/sections/Industries";
import CompanyIntro from "../components/sections/CompanyIntro";
import ProductShowcase from "../components/sections/ProductShowcase";
import Process from "../components/sections/Process";
import FAQ from "../components/sections/FAQ";
import InsightsPreview from "../components/sections/InsightsPreview";
import CTA from "../components/sections/CTA";
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedSolutions />
      <Industries />
      <CompanyIntro />
      <ProductShowcase />
      <Process />
      <FAQ />
      <InsightsPreview />
      <CTA />
    </main>
  );
}
