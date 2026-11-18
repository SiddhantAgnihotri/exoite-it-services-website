import ServiceCapabilityVisual from "./ServiceCapabilityVisual";
import { serviceContent } from "../../data/visualContent";
export default function ServiceVisual({ slug }) {
  const content = serviceContent[slug];
  if (!content) return null;
  return <figure className="service-visual service-concept-visual"><ServiceCapabilityVisual kind={content.kind} /><figcaption>Original service concept. No client implementation or results implied.</figcaption></figure>;
}
