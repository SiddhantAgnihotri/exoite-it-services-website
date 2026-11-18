import { useId, useState } from "react";
import {
  CalendarDays,
  Columns3,
  Image,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Send,
} from "lucide-react";

const views = ["Calendar", "Content"];
const items = [
  {
    day: "MON",
    date: "12",
    title: "A new perspective",
    type: "Brand story",
    status: "Draft",
  },
  {
    day: "WED",
    date: "14",
    title: "Behind the work",
    type: "Team update",
    status: "In review",
  },
  {
    day: "FRI",
    date: "16",
    title: "Ideas worth sharing",
    type: "Product story",
    status: "Draft",
  },
];

export default function SoftwarePreview({ compact = false }) {
  const [view, setView] = useState("Calendar");
  const id = useId();
  return (
    <figure
      className={`software-preview ${compact ? "preview-compact" : ""}`}
      aria-labelledby={`${id}-caption`}
    >
      <div className="preview-topbar">
        <span className="preview-wordmark">
          <span className="brand-square">e.</span> Exoite Social Media Platform
        </span>
        <span className="preview-label">Concept preview</span>
        <MoreHorizontal size={18} aria-hidden="true" />
      </div>
      <div className="preview-workspace">
        <div className="preview-sidebar" aria-hidden="true">
          <span className="preview-sidebar-icon">
            <LayoutDashboard size={17} />
          </span>
          <span className="preview-sidebar-icon selected">
            <CalendarDays size={17} />
          </span>
          <span className="preview-sidebar-icon">
            <Image size={17} />
          </span>
          <span className="preview-sidebar-icon">
            <MessageSquare size={17} />
          </span>
          <span className="preview-sidebar-bottom">
            <PanelLeft size={17} />
          </span>
        </div>
        <div className="preview-main">
          <div className="preview-page-title">
            <div>
              <p className="preview-label">YOUR WORKSPACE</p>
              <p className="preview-title">Your content, in perspective.</p>
            </div>
            <span className="preview-add" aria-hidden="true">
              <Plus size={15} />
            </span>
          </div>
          <div className="preview-toolbar">
            <div
              className="view-switch"
              role="group"
              aria-label="Illustrative preview view"
            >
              {views.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={view === item}
                  aria-controls={`${id}-view`}
                  onClick={() => setView(item)}
                >
                  {item === "Calendar" ? (
                    <CalendarDays size={13} />
                  ) : (
                    <Columns3 size={13} />
                  )}
                  {item}
                </button>
              ))}
            </div>
            <span className="preview-label">Example content</span>
          </div>
          <div
            id={`${id}-view`}
            className={`preview-posts ${view === "Content" ? "content-view" : ""}`}
          >
            {items.map((item, index) => (
              <div className="preview-post" key={item.title}>
                <div className="preview-date">
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                </div>
                <div
                  className={`preview-art preview-art-${index + 1}`}
                  aria-hidden="true"
                >
                  <span className="poster-orbit" />
                  <strong>
                    {
                      [
                        "Ideas, made useful.",
                        "A look behind the work.",
                        "Create a little clarity.",
                      ][index]
                    }
                  </strong>
                  <span className="poster-signature">
                    EXOITE / STUDIO NOTES
                  </span>
                </div>
                <div className="preview-post-copy">
                  <span className="preview-label">{item.type}</span>
                  <p>{item.title}</p>
                  <div className="preview-post-status">
                    <span>{item.status}</span>
                    <Send size={12} aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="preview-schedule" role="group" aria-label="Illustrative content overview">
            <p>{view === "Calendar" ? "UP NEXT" : "CONTENT OVERVIEW"}</p>
            {items.slice(1).map(item => <div key={item.title}><span>{view === "Calendar" ? `${item.day} ${item.date}` : item.type}</span><strong>{item.title}</strong><span>{item.status}</span></div>)}
          </div>
          <div className="preview-bottom-note">
            <span className="status-dot" />A considered space for your content
            workflow
          </div>
        </div>
      </div>
      <figcaption id={`${id}-caption`}>
        Illustrative interface only. Product in development; features and design
        may change.
      </figcaption>
    </figure>
  );
}
