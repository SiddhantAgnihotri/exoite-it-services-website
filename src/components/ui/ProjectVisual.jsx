import { projectImages, projectImageSrcSet } from "../../data/projectImages";
import "../../styles/portfolio-polish.css";

export default function ProjectVisual({ project, large = false }) {
  // A future verified capture can supply its own responsive image and caption.
  const image = project.visual || projectImages[project.imageKey];
  const isScreenshot = project.visual?.kind === "screenshot";
  return (
    <figure className="solution-visual">
      <div className="image-stage"><picture>{/* Up to 1100px the art renders under ~560px wide, where the 960px composition's labels drop below 12px. */}
        {image.mobile && <source media="(max-width: 1100px)" srcSet={`${image.mobile} 600w`} sizes="(min-width: 701px) 50vw, calc(100vw - 32px)" />}<img
        src={image.large}
        srcSet={projectImageSrcSet(image)}
        sizes={
          large
            ? "(min-width: 1376px) 960px, (min-width: 951px) 58vw, calc(100vw - 64px)"
            : "(min-width: 1376px) 600px, (min-width: 701px) 45vw, calc(100vw - 64px)"
        }
        width={image.width || 1280}
        height={image.height || 853}
        loading="lazy"
        decoding="async"
        alt={
          image.alt ||
          `${project.title} - ${isScreenshot ? "application screenshot" : "illustrative demo concept"}`
        }
      /></picture></div>
      <figcaption>
        {image.caption ||
          (isScreenshot
            ? "Application screenshot supplied for this project."
            : "Illustrative concept, not a verified application screenshot.")}
      </figcaption>
    </figure>
  );
}
