import PageHero from "../components/ui/PageHero";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import CTA from "../components/sections/CTA";
export default function Portfolio() {
  return (
    <main className="portfolio-page">
      <PageHero
        label="Portfolio & concepts"
        title="Ideas that solve everyday challenges."
        description="Illustrative software concepts. Not completed client projects."
      />
      <FeaturedSolutions detailed />
      <CTA />
    </main>
  );
}
