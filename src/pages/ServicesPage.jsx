import PageHero from "../components/ui/PageHero";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import CTA from "../components/sections/CTA";

const ServicesPage = () => {
    return (
        <main>
            <PageHero
                label="Our Services"
                title="Websites, Apps, Software and Digital Solutions"
                description="Explore our complete range of IT services built for businesses, schools, institutes, startups and professionals."
            />

            <Services />
            <Process />
            <CTA />
        </main>
    );
};

export default ServicesPage;