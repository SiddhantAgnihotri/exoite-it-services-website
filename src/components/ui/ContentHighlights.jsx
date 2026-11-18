import { Check } from "lucide-react";

export default function ContentHighlights({ items }) {
  return <ul className="content-highlights">{items.map(item => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}
