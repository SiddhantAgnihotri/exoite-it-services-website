import { aiServices } from "./aiServices.js";

export const serviceDetails = [
  {
    slug: "website-development",
    name: "Website Development",
    enquiry: "Website Development",
    title: "A website that makes your business easier to understand.",
    description:
      "Website development for businesses, startups and institutions in Kanpur, across India and remotely worldwide. Plan a clear, responsive site around real enquiries.",
    overview:
      "Your website should explain what you do, answer the questions that matter and give visitors a clear next step. We start with your audience and content, then plan the structure, design and functionality together.",
    audience:
      "Business owners, professional service providers, startups and institutions that need a focused website or want to improve an existing one.",
    useCases: [
      [
        "Business websites",
        "Introduce your company, services and contact details with a clear page structure.",
      ],
      [
        "Campaign landing pages",
        "Give a specific offer or audience a focused destination and enquiry path.",
      ],
      [
        "Content-led websites",
        "Organise useful guides, service information and frequently asked questions.",
      ],
    ],
    deliverables: [
      "Page structure and content requirements",
      "Responsive layouts for agreed pages",
      "Accessible navigation and labelled enquiry forms",
      "Page-specific metadata and crawlable content",
      "Launch checks and an agreed handover",
    ],
    approach: [
      [
        "Discover",
        "Identify visitor goals, existing content and the action each page should support.",
      ],
      [
        "Design",
        "Review structure and layouts before refining the visual details.",
      ],
      [
        "Build & review",
        "Develop agreed pages and check forms, links and mobile behaviour.",
      ],
      ["Launch", "Coordinate domain, hosting and handover responsibilities."],
    ],
    faqs: [
      [
        "Can you improve our current website?",
        "Yes. Share the site and its current challenges. We can discuss a focused improvement scope before considering a larger rebuild.",
      ],
      [
        "Will the website work on phones?",
        "Responsive design is part of the proposed approach. We agree the pages and test scope, including important mobile interactions.",
      ],
      [
        "Are content, hosting and ongoing updates included?",
        "These depend on the proposal. We clarify content ownership, hosting, domain access and maintenance responsibilities before work begins.",
      ],
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    enquiry: "Custom Software Development",
    title: "Software planned around your everyday work.",
    description:
      "Discuss custom dashboards, portals and workflow software with Exoite IT Services. Turn business requirements into a practical development scope.",
    overview:
      "When spreadsheets and disconnected tools make work difficult, a tailored system may help. We map the current process, identify what needs to change and separate essential workflows from later ideas before proposing a solution.",
    audience:
      "Teams and organisations with a repeatable process, clear users and a need that existing tools do not adequately address.",
    useCases: [
      [
        "Operational dashboards",
        "Bring agreed records and actions into a useful working view.",
      ],
      [
        "Internal portals",
        "Give staff defined access to information and routine tasks.",
      ],
      [
        "Workflow automation",
        "Reduce repeated entry and connect steps that currently rely on manual coordination.",
      ],
    ],
    deliverables: [
      "Workflow and user-role specification",
      "Agreed screens, data model and business rules",
      "Scoped integrations and import/export requirements",
      "Testing against representative tasks",
      "Documentation and deployment/handover plan",
    ],
    approach: [
      [
        "Map the process",
        "Understand current tools, exceptions and the people responsible for each step.",
      ],
      [
        "Prioritise",
        "Choose a useful first release and define acceptance criteria.",
      ],
      [
        "Build iteratively",
        "Review working increments using realistic sample tasks.",
      ],
      [
        "Prepare operations",
        "Agree hosting, backups, access ownership and support scope.",
      ],
    ],
    faqs: [
      [
        "Should we buy existing software first?",
        "Often that is worth evaluating. Custom development makes sense when a significant workflow gap justifies its build and maintenance cost.",
      ],
      [
        "Can an existing system be integrated?",
        "Potentially. We need API documentation, access permissions and any provider restrictions before confirming feasibility.",
      ],
      [
        "Can you migrate existing data?",
        "We can assess sample data and discuss mapping, cleaning, validation and a rollback plan. Migration is scoped separately where required.",
      ],
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    enquiry: "Mobile App Development",
    title: "Useful mobile experiences, designed around your users.",
    description:
      "Plan Android or cross-platform app development for customers, students or internal teams with Exoite IT Services in Kanpur.",
    overview:
      "An app needs a clear reason to be on someone's phone. We discuss who will use it, the core tasks and device requirements, then shape a manageable first version rather than adding features without a user need.",
    audience:
      "Businesses and institutions with repeat mobile tasks, customer interactions or operational workflows that benefit from an app.",
    useCases: [
      [
        "Customer applications",
        "Provide repeat access to agreed services, account information or requests.",
      ],
      [
        "Education apps",
        "Plan learner access to content and institutional interactions.",
      ],
      [
        "Field and internal tools",
        "Support staff tasks away from a desktop, with connectivity requirements considered early.",
      ],
    ],
    deliverables: [
      "User journeys and screen scope",
      "Mobile interface and interaction design",
      "Agreed app/backend integration",
      "Device and permission testing plan",
      "Release preparation and ownership handover",
    ],
    approach: [
      [
        "Define the need",
        "Confirm why an app is appropriate and which devices matter.",
      ],
      [
        "Prototype journeys",
        "Review key screens and the steps users need to complete.",
      ],
      [
        "Develop & test",
        "Build the agreed scope and test on representative devices.",
      ],
      [
        "Prepare release",
        "Clarify store accounts, review requirements and support arrangements.",
      ],
    ],
    faqs: [
      [
        "Do we need separate Android and iOS apps?",
        "That depends on users, required device features and budget. We can discuss cross-platform options before selecting an approach.",
      ],
      [
        "Is app-store approval guaranteed?",
        "No. Stores make their own review decisions and may require changes. Submission responsibilities and possible follow-up work should be agreed in advance.",
      ],
      [
        "Can the app work offline?",
        "Offline behaviour requires specific data, sync and conflict-handling decisions. It should be explicitly included in the requirements.",
      ],
    ],
  },
  {
    slug: "school-institute-solutions",
    name: "School and Institute Solutions",
    enquiry: "School / Institute Software",
    title: "Education systems that fit the institution behind them.",
    description:
      "Explore school and institute software, LMS development and examination portal planning with Exoite IT Services. Discuss your education workflows.",
    overview:
      "School and institute software must work for administrators, teachers, learners and families. Our education technology and IT training experience informs a practical discussion of roles, everyday processes and the information each group actually needs.",
    audience:
      "Schools, coaching centres, training institutes and education organisations exploring a website, learning platform or administrative system.",
    useCases: [
      [
        "Institution websites & admissions",
        "Explain programs and organise enquiry or admission information.",
      ],
      [
        "Learning platforms",
        "Plan course organisation, learner access and assignment workflows.",
      ],
      [
        "Examination & administration",
        "Discuss assessments, results and operational records within an agreed scope.",
      ],
    ],
    deliverables: [
      "Stakeholder and role mapping",
      "Agreed modules and institutional workflows",
      "Data minimisation and access requirements",
      "Representative teacher/admin review sessions",
      "Training and handover requirements",
    ],
    approach: [
      [
        "Listen to each role",
        "Map tasks and information needs before choosing modules.",
      ],
      [
        "Set priorities",
        "Start with the workflows that are most useful to the institution.",
      ],
      [
        "Review with users",
        "Use sample data to check navigation and routine tasks.",
      ],
      [
        "Prepare adoption",
        "Agree data handling, staff guidance and support responsibilities.",
      ],
    ],
    faqs: [
      [
        "Can we start with one module?",
        "Yes. A focused first phase can be discussed, with future modules considered in the underlying plan.",
      ],
      [
        "How will student data be handled?",
        "Access, data collection, retention and any consent requirements need institution-specific review. Avoid sharing actual student records in an initial enquiry.",
      ],
      [
        "Do your illustrations show deployed school systems?",
        "No. The current portfolio visuals are labelled concepts. They are not proof of a client deployment or completed features.",
      ],
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    enquiry: "Digital Marketing",
    title: "A clearer presence, built around your audience.",
    description:
      "Discuss search visibility, website content and social media support with Exoite IT Services. Plan practical digital marketing around your business goals.",
    overview:
      "A useful marketing plan starts with the audience, the offer and how an enquiry is handled. We discuss your current website, content and channels before agreeing what to improve and how progress should be reviewed.",
    audience:
      "Businesses and professional services that need more consistent messaging, useful content and an organised digital presence.",
    useCases: [
      [
        "Search presence",
        "Improve service information, page structure and technical discoverability.",
      ],
      [
        "Social content support",
        "Plan themes, formats and a manageable publishing workflow.",
      ],
      [
        "Campaign preparation",
        "Align landing pages, enquiry forms and agreed tracking needs.",
      ],
    ],
    deliverables: [
      "Current-presence and audience review",
      "Channel and content priorities",
      "Scoped website/content improvements",
      "Agreed reporting measures",
      "Account access and ownership plan",
    ],
    approach: [
      [
        "Understand the offer",
        "Clarify the audience, proposition and enquiry process.",
      ],
      [
        "Choose priorities",
        "Focus effort on relevant channels and useful content.",
      ],
      [
        "Prepare & publish",
        "Review materials and permissions before work goes live.",
      ],
      ["Review evidence", "Assess agreed measures and refine the next steps."],
    ],
    faqs: [
      [
        "Can you guarantee rankings or leads?",
        "No. Search rankings, platform reach and enquiry outcomes depend on many factors. We can agree deliverables and reporting without guaranteeing results.",
      ],
      [
        "Is advertising spend included?",
        "Only if specifically agreed. Provider fees, campaign budgets and management work should be distinguished in the proposal.",
      ],
      [
        "Will you own our social and advertising accounts?",
        "Account ownership and permissions should remain clear. We discuss the access needed for the agreed work and its removal when that work ends.",
      ],
    ],
  },
  {
    slug: "it-training",
    name: "IT Training",
    enquiry: "IT Training",
    title: "Practical learning, with a clear starting point.",
    description:
      "Explore IT training and coding workshops for students, schools, institutes and teams. Discuss topics, prerequisites and learning goals with Exoite.",
    overview:
      "Training is more useful when content matches the learners. We discuss their starting knowledge, available time and goals, then plan guided exercises and projects around a realistic learning scope.",
    audience:
      "Students, schools, coaching and training institutes, professionals and teams looking for hands-on technology learning.",
    useCases: [
      [
        "Programming foundations",
        "Practice logic, coding basics and small guided projects.",
      ],
      [
        "Development programs",
        "Explore web, Python or app development with a structured topic plan.",
      ],
      [
        "Institution & team workshops",
        "Agree a practical format suited to the audience and available equipment.",
      ],
    ],
    deliverables: [
      "Learning goals and prerequisite review",
      "Agreed topics, format and schedule",
      "Guided exercises and project tasks",
      "Feedback and learning checkpoints",
      "Access/material arrangements as agreed",
    ],
    approach: [
      [
        "Assess the group",
        "Discuss prior knowledge, goals and learning constraints.",
      ],
      ["Plan sessions", "Agree topics, equipment and practice activities."],
      [
        "Learn by doing",
        "Use exercises and explanations to build understanding.",
      ],
      ["Review progress", "Identify next steps and further practice needs."],
    ],
    faqs: [
      [
        "Which programs can we enquire about?",
        "The training page outlines web development, MERN, Python, Flutter, robotics/coding and corporate IT training. Availability and scope must be confirmed.",
      ],
      [
        "Are placements or certificates guaranteed?",
        "No placement or certification outcome is promised on this website. Any assessment or completion-document arrangements must be explicitly agreed.",
      ],
      [
        "Can the training be customised?",
        "Yes. Share the learner profile, topics, group size and preferred format. We can discuss a suitable plan and schedule.",
      ],
    ],
  },
  ...aiServices,
];

export const servicePath = (service) => `/services/${service.slug}`;
