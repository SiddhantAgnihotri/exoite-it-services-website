import { projectImages } from "../../data/projectImages";

export default function ProjectVisual({ project, large = false }) {
  // A future verified capture can supply its own responsive image and caption.
  const image = project.visual || projectImages[project.imageKey];
  const isScreenshot = project.visual?.kind === "screenshot";
  return (
    <figure className="solution-visual">
      <img
        src={image.large}
        srcSet={`${image.small} 640w, ${image.large} 1280w`}
        sizes={
          large
            ? "(min-width: 951px) 800px, 100vw"
            : "(min-width: 701px) 50vw, 100vw"
        }
        width={image.width || 1280}
        height={image.height || 853}
        loading="lazy"
        decoding="async"
        alt={
          image.alt ||
          `${project.title} - ${isScreenshot ? "application screenshot" : "illustrative demo concept"}`
        }
      />
      <figcaption>
        {image.caption ||
          (isScreenshot
            ? "Application screenshot supplied for this project."
            : "Illustrative concept, not a verified application screenshot.")}
      </figcaption>
    </figure>
  );
}
