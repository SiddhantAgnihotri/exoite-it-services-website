import ServiceVisual from "../components/ui/ServiceVisual";
import {
  Code2,
  Layers,
  BookOpen,
  Smartphone,
  Wrench,
  Laptop,
  ArrowUpRight,
  Check,
} from "lucide-react";
import ContentHighlights from "../components/ui/ContentHighlights";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import CTA from "../components/sections/CTA";
import { whatsappLinkFor } from "../data/siteConfig";
const courses = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Learn how modern websites are structured, styled and brought to life.",
    topics: ["HTML & CSS", "JavaScript", "React", "Tailwind CSS"],
    outcome: "Practice building responsive pages and interactive web projects.",
  },
  {
    icon: Layers,
    title: "MERN Stack Development",
    description:
      "Connect the frontend and backend through practical full-stack development.",
    topics: ["MongoDB", "Express.js", "React", "Node.js"],
    outcome: "Explore building a web application with APIs and a database.",
  },
  {
    icon: BookOpen,
    title: "Python Programming",
    description:
      "Build programming fundamentals through guided exercises and examples.",
    topics: ["Logic building", "OOP", "File handling", "Projects"],
    outcome: "Practice solving problems and writing small Python programs.",
  },
  {
    icon: Smartphone,
    title: "Flutter App Development",
    description:
      "Explore mobile application development with Flutter and Dart.",
    topics: ["Flutter", "Dart", "Firebase", "App projects"],
    outcome: "Practice creating mobile screens and connecting app features.",
  },
  {
    icon: Wrench,
    title: "Robotics & Coding",
    description:
      "Hands-on technology workshops for schools, students and institutes.",
    topics: ["Sensors", "Coding logic", "Automation", "Arduino-style projects"],
    outcome: "Explore how code, sensors and physical components work together.",
  },
  {
    icon: Laptop,
    title: "Corporate IT Training",
    description:
      "A learning plan shaped around your team and its technical goals.",
    topics: [
      "Custom curriculum",
      "Practical sessions",
      "Team exercises",
      "Guidance",
    ],
    outcome:
      "Work through relevant technical tasks with a tailored training plan.",
  },
];
export default function Training() {
  return (
    <main className="training-page">
      <PageHero
        variant="education"
        visual={<ServiceVisual slug="it-training" />}
        label="IT training & workshops"
        title="Learn by doing. Build with understanding."
        description="Hands-on coding for learners, schools and teams."
      >
        <div className="training-intro">
          {[
            "Hands-on practice",
            "Project-based learning",
            "Custom workshop formats",
          ].map((item) => (
            <span key={item}>
              <Check size={14} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </PageHero>
      <section className="section section-neutral">
        <div className="container">
          <SectionHeading
            eyebrow="Find your direction"
            title="Programs for the next step."
            description="Confirm prerequisites, format and availability before enrolling."
          />
          <div className="course-grid">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <article className="course-card" key={course.title}>
                  <Icon size={25} aria-hidden="true" />
                  <h3>{course.title}</h3>

                  <div className="tag-list">
                    {course.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                  <div className="course-outcome">
                    <strong>Learning focus</strong>
                    <p>{course.outcome}</p>
                  </div>
                  <a
                    href={whatsappLinkFor(course.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    Enquire about this program
                    <span className="sr-only">{": " + course.title}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">For your institution or team</p>
            <h2>
              A learning plan
              <br />
              that fits your audience.
            </h2>
          </div>
          <div className="prose">
            <ContentHighlights items={["Share your learners' starting level", "Choose topics and delivery requirements", "Agree the format, scope and schedule"]} />
            <p>No placements or certification outcomes are promised.</p>
            <a
              className="text-link"
              href={whatsappLinkFor("a custom training program")}
              target="_blank"
              rel="noreferrer"
            >
              Discuss a custom program <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
