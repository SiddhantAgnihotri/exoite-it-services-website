import development from "../../assets/images/optimized/web-development-1280.webp";
import developmentSmall from "../../assets/images/optimized/web-development-640.webp";
import software from "../../assets/images/optimized/portfolio-inventory-1280.webp";
import softwareSmall from "../../assets/images/optimized/portfolio-inventory-640.webp";
import mobile from "../../assets/images/optimized/portfolio-lms-1280.webp";
import mobileSmall from "../../assets/images/optimized/portfolio-lms-640.webp";
import education from "../../assets/images/optimized/portfolio-exam-portal-1280.webp";
import educationSmall from "../../assets/images/optimized/portfolio-exam-portal-640.webp";
import training from "../../assets/images/optimized/it-training-1280.webp";
import trainingSmall from "../../assets/images/optimized/it-training-640.webp";

const visuals = {
  "website-development": [
    development,
    developmentSmall,
    "Illustrative web development workspace",
  ],
  "custom-software-development": [
    software,
    softwareSmall,
    "Illustrative inventory software concept",
  ],
  "mobile-app-development": [
    mobile,
    mobileSmall,
    "Illustrative cross-device learning platform concept",
  ],
  "school-institute-solutions": [
    education,
    educationSmall,
    "Illustrative examination portal concept",
  ],
  "it-training": [
    training,
    trainingSmall,
    "Illustrative coding and technology workshop",
  ],
};

export default function ServiceVisual({ slug }) {
  const visual = visuals[slug];
  if (!visual) return null;
  return (
    <figure className="service-visual">
      <img
        src={visual[0]}
        srcSet={`${visual[1]} 640w, ${visual[0]} 1280w`}
        sizes="(min-width: 951px) 45vw, 100vw"
        width={1280}
        height={853}
        loading="lazy"
        decoding="async"
        alt={visual[2]}
      />
      <figcaption>
        Illustrative visual. No client delivery, implementation or results are
        implied.
      </figcaption>
    </figure>
  );
}
