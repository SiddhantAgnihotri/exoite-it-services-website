import PageHero from "../components/ui/PageHero";
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    Code2,
    GraduationCap,
    Laptop,
    Layers,
    Rocket,
    School,
    Smartphone,
    Users,
    Wrench,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";

import itTraining from "../assets/images/it-training.png";

const courses = [
    {
        icon: Code2,
        title: "Web Development",
        duration: "3–6 Months",
        desc: "HTML, CSS, JavaScript, React, Tailwind CSS and project-based website development.",
        skills: ["HTML/CSS", "JavaScript", "React", "Projects"],
    },
    {
        icon: Layers,
        title: "MERN Stack Development",
        duration: "6–12 Months",
        desc: "Full-stack development with MongoDB, Express.js, React and Node.js.",
        skills: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
        icon: BookOpen,
        title: "Python Programming",
        duration: "2–5 Months",
        desc: "Python basics, logic building, file handling, OOP and practical programming.",
        skills: ["Basics", "OOP", "Files", "Projects"],
    },
    {
        icon: Smartphone,
        title: "Flutter App Development",
        duration: "4–6 Months",
        desc: "Mobile app development using Flutter, Dart, Firebase and real-world app projects.",
        skills: ["Flutter", "Dart", "Firebase", "Apps"],
    },
    {
        icon: Wrench,
        title: "Robotics & Coding",
        duration: "Workshops",
        desc: "Robotics, sensors, Arduino-style logic, automation projects and school workshops.",
        skills: ["Robotics", "Sensors", "Logic", "Projects"],
    },
    {
        icon: Laptop,
        title: "Corporate IT Training",
        duration: "Custom",
        desc: "Practical training programs for teams, institutions and organizations.",
        skills: ["Custom Plan", "Hands-on", "Upskilling", "Support"],
    },
];

const audiences = [
    {
        icon: School,
        title: "Schools",
        desc: "Coding, robotics and technology workshops for students.",
    },
    {
        icon: GraduationCap,
        title: "Students",
        desc: "Career-focused programming and development training.",
    },
    {
        icon: Users,
        title: "Institutes",
        desc: "Structured training programs for coaching and skill centers.",
    },
    {
        icon: Rocket,
        title: "Professionals",
        desc: "Upskilling in web, app and software development.",
    },
];

const steps = [
    {
        title: "Choose Program",
        desc: "Select the course or training format based on your goal.",
    },
    {
        title: "Learn Practically",
        desc: "Understand concepts through examples, tasks and exercises.",
    },
    {
        title: "Build Projects",
        desc: "Create real projects that improve confidence and portfolio.",
    },
    {
        title: "Get Guidance",
        desc: "Receive support, feedback and direction for improvement.",
    },
];

const Training = () => {
    return (
        <main>
            <PageHero
                label="IT Training"
                title="Practical Coding, Web Development and Technology Training"
                description="We provide hands-on IT training for students, schools, institutes, professionals and organizations with a strong focus on real projects."
            />

            {/* Main Intro */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Learn By Building
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            Training programs designed for real-world skills.
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-slate-600">
                            Our training approach focuses on practical learning, logic
                            building, hands-on coding and project development. Whether you are
                            a student, school, institute or working professional, we can create
                            a training plan based on your goals.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {[
                                "Project-based learning",
                                "Beginner-friendly teaching",
                                "Practical assignments",
                                "Career-focused skills",
                            ].map((point) => (
                                <div
                                    key={point}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <BadgeCheck className="shrink-0 text-blue-600" size={20} />
                                    <p className="text-sm font-semibold text-slate-800">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <a
                            href={siteConfig.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Discuss Training Requirement
                            <ArrowRight size={17} />
                        </a>
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/80">
                        <img
                            src={itTraining}
                            alt="IT training and coding workshop"
                            className="h-[320px] w-full rounded-[22px] object-cover md:h-[440px]"
                        />
                    </div>
                </div>
            </section>

            {/* Course Cards */}
            <section className="bg-slate-50 px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Programs
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            Training Programs We Offer
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-slate-600">
                            Choose from structured programs or request a custom training plan
                            for your school, institute or organization.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => {
                            const Icon = course.icon;

                            return (
                                <div
                                    key={course.title}
                                    className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                            <Icon size={26} />
                                        </div>

                                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                                            {course.duration}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 text-[21px] font-bold text-slate-950">
                                        {course.title}
                                    </h3>

                                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                                        {course.desc}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {course.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={siteConfig.whatsappLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3 hover:text-blue-700"
                                    >
                                        Enquire Now
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Who Can Join */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                                Who Can Join
                            </p>

                            <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                                Training for students, schools, institutes and professionals.
                            </h2>

                            <p className="mt-5 text-[16px] leading-7 text-slate-600">
                                We can deliver short workshops, long-term courses, skill
                                programs and customized training modules based on your audience
                                and learning goal.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {audiences.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                            <Icon size={23} />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold text-slate-950">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Process */}
            <section className="bg-slate-50 px-5 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                            Learning Process
                        </p>

                        <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-slate-950 md:text-[40px]">
                            A simple path from learning to project building.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                    {index + 1}
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-950">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white px-5 py-16 md:py-20">
                <div className="mx-auto max-w-5xl rounded-[32px] bg-slate-950 p-8 text-center shadow-xl md:p-12">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
                        Start Learning
                    </p>

                    <h2 className="mt-4 text-[30px] font-extrabold tracking-tight text-white md:text-[40px]">
                        Need a custom training program?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-slate-300">
                        Tell us your requirement and we will suggest the right course,
                        workshop or training plan.
                    </p>

                    <a
                        href={siteConfig.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Contact on WhatsApp
                        <ArrowRight size={17} />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Training;