import workspaceSmall from "../../assets/images/optimized/hero-workspace-480.webp";
import workspaceMedium from "../../assets/images/optimized/hero-workspace-960.webp";
import workspaceLarge from "../../assets/images/optimized/hero-workspace-1440.webp";

export default function HeroPhotoVisual() {
  return (
    <figure className="hero-photo">
      <img
        src={workspaceLarge}
        srcSet={`${workspaceSmall} 480w, ${workspaceMedium} 960w, ${workspaceLarge} 1440w`}
        sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 950px) min(680px, calc(100vw - 64px)), (max-width: 1100px) calc((100vw - 96px) * 0.5122), (max-width: 1344px) calc((100vw - 120px) * 0.5122), 627px"
        width={1440}
        height={1080}
        alt="Laptop with a code editor and a smartphone on a sunlit wooden desk."
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <figcaption>AI-generated workspace concept. Not an Exoite office or client project.</figcaption>
    </figure>
  );
}
