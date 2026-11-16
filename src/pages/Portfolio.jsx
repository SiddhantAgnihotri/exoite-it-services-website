import PageHero from "../components/ui/PageHero";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import CTA from "../components/sections/CTA";
export default function Portfolio() {
  return (
    <main className="portfolio-page">
      <PageHero
        label="Portfolio & concepts"
        title="Ideas that solve everyday challenges."
        description="Explore demonstration concepts for education and business software. These illustrative previews show possible directions, not completed client projects."
      />
      <FeaturedSolutions detailed />
      <CTA />
    </main>
  );
}
