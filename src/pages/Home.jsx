import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Services from "../components/sections/Services";
import FeaturedSolutions from "../components/sections/FeaturedSolutions";
import Industries from "../components/sections/Industries";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Technologies from "../components/sections/Technologies";
import Process from "../components/sections/Process";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";

const Home = () => {
    return (
        <main>
            <Hero />
            <TrustBar />
            <Services />
            <FeaturedSolutions />
            <Industries />
            <WhyChooseUs />
            <Technologies />
            <Process />
            <FAQ />
            <CTA />
        </main>
    );
};

export default Home;