export const projects = [
  {
    slug: "examify",
    title: "Online Examination Portal / Examify",
    category: "Education Software",
    imageKey: "examPortal",
    overview:
      "An illustrative examination portal concept for schools and institutes, centred on preparing assessments, learner access and reviewing results.",
    problem:
      "Assessment work can involve disconnected question files, learner lists and result records. This concept explores how those steps could fit within a role-based portal.",
    features: ["Teacher Dashboard", "Student Login", "Result Management"],
    workflow: [
      "Prepare assessment details and questions",
      "Provide learner access to an agreed test",
      "Review results in an organised interface",
    ],
    considerations: [
      "Question formats and marking rules",
      "Access controls and assessment integrity",
      "Connectivity, time limits and accessibility",
    ],
  },
  {
    slug: "inventory-management",
    title: "Inventory Management System",
    category: "Business Software",
    imageKey: "inventory",
    overview:
      "An illustrative inventory system concept for organising items, recording stock changes and reviewing information relevant to day-to-day operations.",
    problem:
      "When item records are maintained across separate files, it can be difficult to trace stock changes or agree which record is current. This concept explores a more structured workflow.",
    features: ["Stock Tracking", "Custom Columns", "Reports"],
    workflow: [
      "Organise item records and relevant categories",
      "Record agreed stock movements",
      "Review balances and movement summaries",
    ],
    considerations: [
      "Opening data and units of measure",
      "Permissions for adjustments and approvals",
      "Audit history, exports and reconciliation",
    ],
  },
  {
    slug: "learning-management-system",
    title: "Learning Management System",
    category: "EdTech Platform",
    imageKey: "lms",
    overview:
      "An illustrative learning platform concept for organising courses, learner access, assignments and progress-related information.",
    problem:
      "Learning resources and learner communication can become scattered across tools. This concept explores a coherent space for agreed teaching and learning tasks.",
    features: ["Course Management", "Student Progress", "Certificates"],
    workflow: [
      "Organise course resources and activities",
      "Provide learners access to relevant materials",
      "Review submitted work and progress information",
    ],
    considerations: [
      "Content ownership and accessible formats",
      "Learner roles and data collection",
      "Assessment and completion-document rules",
    ],
  },
];

export const projectStatus = {
  type: "Illustrative solution concept",
  implementation:
    "Implemented features have not been verified from application source or a live demo. The highlights below describe the concept scope, not confirmed completed functionality.",
  technologies:
    "The application technology stack has not been verified. The React/Vite stack of this company website does not establish the stack used by this concept.",
  evidence:
    "Genuine application screenshots and a verified project/demo URL are not currently available in this repository.",
};
