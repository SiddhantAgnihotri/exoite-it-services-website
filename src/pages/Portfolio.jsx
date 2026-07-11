import PageHero from "../components/ui/PageHero";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import CTA from "../components/sections/CTA";

const Portfolio = () => {
    return (
        <main>
            <PageHero
                label="Portfolio"
                title="Demo Projects and Ready-to-Customize Solutions"
                description="Here are some internal products, demo projects and software solution concepts that can be customized for your business."
            />

            <FeaturedSolutions />
            <CTA />
        </main>
    );
};

export default Portfolio;