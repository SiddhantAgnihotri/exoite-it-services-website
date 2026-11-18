// Original SVG artwork for the planning guides, not an application capture.
export default function EditorialVisual({ slug }) {
  const education = slug === "school-website-development-considerations";
  const software = slug === "when-a-business-needs-custom-software";
  const label = education ? "School website planning: information, access and responsibilities" : software ? "Business workflow: capture, review and action" : "Website planning: a clear structure and primary action";
  return (
    <figure className="editorial-visual">
      <svg viewBox="0 0 960 540" width="960" height="540" role="img" aria-label={label}>
        <rect width="960" height="540" rx="20" fill="#eff6ff" />
        <rect x="76" y="64" width="808" height="414" rx="16" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M76 120h808" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="106" cy="92" r="5" fill="#2563eb" /><circle cx="126" cy="92" r="5" fill="#94a3b8" /><circle cx="146" cy="92" r="5" fill="#cbd5e1" />
        <rect x="112" y="156" width="108" height="286" rx="10" fill="#14213d" />
        {[184, 228, 272, 316].map((y, i) => <rect key={y} x="132" y={y} width={i === 0 ? 68 : 48} height="10" rx="5" fill={i === 0 ? "#93c5fd" : "#cbd5e1"} />)}
        <text x="260" y="184" fill="#14213d" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="600">{education ? "Information, with purpose." : software ? "A clearer way to work." : "Start with a clear plan."}</text>
        <rect x="260" y="206" width="316" height="8" rx="4" fill="#cbd5e1" />
        {software ? (
          <>
            <path d="M400 320h60m140 0h60" stroke="#2563eb" strokeWidth="3" />
            {[['Capture', 260, '#eff6ff'], ['Review', 460, '#fef3c7'], ['Action', 660, '#dcfce7']].map(([name, x, color]) => <g key={name}><rect x={x} y="268" width="156" height="112" rx="12" fill={color} stroke="#cbd5e1" /><circle cx={x + 30} cy="298" r="8" fill="#2563eb" /><text x={x + 20} y="346" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#14213d">{name}</text></g>)}
            <path d="M280 416h440" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          </>
        ) : education ? (
          <>
            {[[260, '#eff6ff'], [460, '#e0f2fe'], [660, '#dcfce7']].map(([x, color]) => <g key={x}><rect x={x} y="250" width="156" height="172" rx="12" fill={color} /><rect x={x + 20} y="276" width="38" height="38" rx="8" fill="#2563eb" /><path d={`M${x + 20} 342h110m-110 22h80m-80 22h96`} stroke="#5f6f85" strokeWidth="6" strokeLinecap="round" /></g>)}
          </>
        ) : (
          <>
            <rect x="260" y="250" width="556" height="100" rx="12" fill="#eff6ff" />
            <rect x="284" y="274" width="248" height="12" rx="6" fill="#14213d" /><rect x="284" y="300" width="180" height="8" rx="4" fill="#94a3b8" />
            <rect x="648" y="276" width="136" height="44" rx="8" fill="#2563eb" /><path d="M680 298h65m-12-9 12 9-12 9" stroke="#fff" strokeWidth="3" fill="none" />
            {[260, 452, 644].map(x => <g key={x}><rect x={x} y="374" width="172" height="54" rx="8" fill="#f8fafc" stroke="#e2e8f0" /><rect x={x + 16} y="394" width="112" height="8" rx="4" fill="#cbd5e1" /></g>)}
          </>
        )}
      </svg>
      <figcaption className="sr-only">Original editorial illustration.</figcaption>
    </figure>
  );
}
