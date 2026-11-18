export const aiCategory = "AI & Automation Solutions";
export const aiDisclosure = "These examples describe potential solutions, not confirmed completed client projects. Scope, integrations and performance must be assessed for your business.";

const approach = [
  ["Map the work", "Identify the trigger, current tools, exceptions and the people responsible for each decision."],
  ["Prototype safely", "Use approved sample data to compare a small workflow with agreed accuracy and cost criteria."],
  ["Connect & evaluate", "Implement scoped integrations, test permissions and failure paths, and review outputs with your team."],
  ["Operate with oversight", "Agree monitoring, approval rules, fallback procedures, ownership and ongoing support before rollout."],
];
export const aiIntegrations = [
  ["Model APIs", "OpenAI APIs or Google Gemini can support language and reasoning features. Provider selection depends on the task, data policy, evaluation results and available API capabilities."],
  ["Webhooks & application APIs", "Connect documented endpoints with authenticated requests, validated payloads and defined permissions. An API or supported export must exist; access and provider limits need review."],
  ["CRM & email workflows", "Assess lead records, draft messages and follow-up triggers using your tools' supported APIs. Require explicit approval for external messages and important record changes."],
  ["Workflow orchestration", "Coordinate scheduled jobs, human approvals, retries and audit events. Keep deterministic business rules outside model-generated decisions where appropriate."],
];
export const aiPrivacy = [
  ["Restrict data access", "Define who can see each record and which approved sources an assistant can retrieve. Use least-privilege access and enforce permissions in the application."],
  ["Minimise what is shared", "Agree which data may reach a model provider, retention requirements and deletion processes. Provider terms and data settings need project-specific review."],
  ["Keep people in control", "Provide human handoff, review queues and approval gates for sensitive actions. AI can produce incorrect or incomplete outputs; escalation and manual fallbacks are part of the design."],
  ["Protect the integration", "Keep private API credentials on the server, validate inputs, test prompt-injection scenarios, and agree logging without unnecessary personal data."],
];

export const aiServices = [
  {
    slug: "ai-automation", name: "AI Automation Systems", enquiry: "AI Automation Systems", family: "ai", visual: "workflow",
    title: "Automate Your Business with Intelligent AI Solutions.",
    description: "Build smarter workflows, automate repetitive tasks and connect your business tools with custom AI-powered solutions.",
    seoDescription: "Custom AI automation systems for lead routing, document processing, reporting and business workflows. Discuss a scoped solution with Exoite IT Services.",
    cta: "Discuss Your Automation Project", overviewHeading: "Less repetitive work. Clearer decisions.",
    overview: "Copying information between tools, sorting incoming requests and chasing updates can slow a team down. We assess where a combination of software rules, AI assistance and human review could make that work easier to manage.",
    challenges: ["Disconnected tools and repeated data entry", "Enquiries waiting for the right person", "Unstructured documents and time-consuming reporting"],
    audience: "Businesses with repeatable processes, clear task owners and suitable data sources. A practical first project starts with one workflow and measurable acceptance criteria.",
    useCases: [
      ["Lead qualification & routing", "Extract agreed information, suggest a lead category and route it to the right team for review."],
      ["Customer enquiry handling", "Prepare grounded responses to routine questions and escalate uncertain or sensitive requests."],
      ["Email & follow-up workflows", "Draft replies and prepare follow-up tasks, with approval before customer-facing messages are sent."],
      ["Document processing", "Extract candidate fields from supported documents and flag incomplete or inconsistent records for checking."],
      ["Reporting & summaries", "Turn approved records into draft summaries with source references and review before distribution."],
      ["Internal knowledge assistants", "Help staff find information in approved material while respecting access permissions."],
      ["CRM workflow automation", "Suggest updates, assign tasks and connect approved lead activity through your CRM's available API."],
    ],
    deliverablesHeading: "What AI automation can do.",
    approachHeading: "How we design custom workflows.",
    deliverables: ["A workflow map with triggers, actions and exceptions", "AI-assisted classification, extraction or drafting where suitable", "Human review and approval steps for consequential actions", "Scoped connections to approved business tools", "Evaluation cases, usage limits and operational handover"],
    approach,
    faqs: [
      ["Where should we start?", "Choose a repetitive task with a clear owner and available sample data. We can assess whether simple rules, an existing tool or a custom AI-assisted workflow is the best fit."],
      ["Will the workflow run without supervision?", "That depends on the action and its risks. Human approval should remain for sensitive decisions and external communications. We do not promise fully autonomous or error-free operation."],
      ["Can you connect our current tools?", "We first review API documentation, account permissions, provider limits and data-handling requirements. A named tool does not guarantee a feasible integration."],
      ["Do these examples show completed AI client projects?", "No. They illustrate potential solutions and original concept interfaces. They are not evidence of completed customer implementations or measured results."],
    ],
  },
  {
    slug: "ai-chatbots", name: "AI Chatbots & Virtual Assistants", enquiry: "AI Chatbots & Virtual Assistants", family: "ai", visual: "chatbot",
    title: "Helpful conversations. Grounded in your business.",
    description: "Custom website chatbots and business assistants, planned around approved knowledge, clear access limits and a useful handoff to your team.",
    cta: "Discuss Your Chatbot Project", overviewHeading: "An assistant with a defined job.",
    overview: "Customers and staff often ask the same questions, but an assistant should know the boundaries of its role. We scope the audience, approved information and escalation path before planning the conversation experience.",
    challenges: ["Repeated questions across customer channels", "Staff searching scattered internal guidance", "Incomplete enquiries that need a human follow-up"],
    audience: "Businesses considering a website assistant, knowledge-base experience or internal help tool with an identified human owner.",
    useCases: [
      ["Website AI chatbot", "Guide visitors through approved service information and offer a clear route to a person."],
      ["FAQ & knowledge-base assistant", "Retrieve relevant information from agreed sources and show references where possible."],
      ["Customer-support assistant", "Prepare support answers and escalate unresolved, sensitive or account-specific requests."],
      ["Internal business assistant", "Help authorised staff find policies or procedures within their permitted knowledge sources."],
      ["AI-enabled enquiry collection", "Collect agreed enquiry fields with a clear explanation of their use, then hand the conversation to your team."],
    ],
    deliverablesHeading: "A conversation shaped around your users.",
    deliverables: ["Conversation goals, tone and business-specific knowledge scope", "Approved-source retrieval and an update process", "Data-access restrictions enforced by the application", "Visible human handoff and manual contact alternatives", "Evaluation prompts, uncertain-answer behavior and review guidance"],
    approach,
    faqs: [
      ["What happens when the assistant cannot answer?", "It should say when it cannot establish an answer and offer a defined handoff, contact link or review queue. A live-agent handoff requires an available support system and agreed operating hours."],
      ["Can it see every document or customer record?", "No. The application should enforce the user's permissions and restrict retrieval to approved sources. Sensitive records need a specific access and data-handling design."],
      ["Can the tone and knowledge be customised?", "Yes. We can scope language, tone, content sources and business-specific journeys. Customisation still needs representative testing; it does not eliminate incorrect answers."],
    ],
  },
  {
    slug: "ai-workflow-integration", name: "AI Workflow Integration", enquiry: "AI Workflow Integration", family: "ai", visual: "integration",
    title: "Connect your tools. Keep the workflow in view.",
    description: "Add AI-assisted steps to existing business processes through supported APIs, webhooks and controlled workflow orchestration.",
    cta: "Discuss Your Integration Project", overviewHeading: "Connect the steps that belong together.",
    overview: "A useful integration handles permissions, exceptions and ownership as carefully as the successful path. We review your current systems and the available interfaces before confirming which steps can be connected.",
    challenges: ["Information copied across separate systems", "Missing context between incoming requests and follow-up", "Silent failures or unclear ownership in existing automations"],
    audience: "Teams with established business tools and documented processes that could benefit from a carefully scoped AI-assisted step.",
    useCases: [
      ["CRM enrichment & routing", "Prepare suggested fields and task assignments from approved inputs, with review before important changes."],
      ["Email-to-task workflows", "Classify incoming messages and prepare tasks or draft replies through supported email and task APIs."],
      ["Document-to-record pipelines", "Extract candidate information, validate it against rules and send exceptions to a review queue."],
      ["Scheduled reporting", "Collect permitted records and generate draft summaries for an accountable owner to approve."],
    ],
    deliverablesHeading: "A defined connection, not a black box.",
    deliverables: ["API and permission feasibility assessment", "Data mapping, validation and approved model input boundaries", "Scoped orchestration with retries and duplicate-event protection", "Human approval steps and a manual recovery path", "Operational logs, usage limits and integration documentation"],
    approach,
    faqs: [
      ["Can you integrate any platform?", "No. Feasibility depends on supported APIs or exports, account plans, permissions, provider restrictions and data requirements. These are reviewed before scope is confirmed."],
      ["Which AI providers can be considered?", "OpenAI APIs or Google Gemini may be suitable for scoped language features. We select an approach against the task, evaluation results, provider terms and your data requirements; no official partnership is implied."],
      ["How are failed or repeated events handled?", "We scope validation, bounded retries, duplicate-event protection and alerts. A named workflow owner needs a manual recovery path for unresolved exceptions."],
    ],
  },
  {
    slug: "ai-business-software", name: "AI-Powered Business Software", enquiry: "AI-Powered Business Software", family: "ai", visual: "dashboard",
    title: "Business software with useful intelligence built in.",
    description: "Plan custom dashboards, portals and operational tools with AI-assisted search, document features and reporting inside a controlled application.",
    cta: "Discuss Your AI Software Project", overviewHeading: "Put assistance where the work happens.",
    overview: "AI can be part of a practical business application rather than a separate destination. We start with the core workflow and assess where search, extraction or drafting can support users without weakening business rules or accountability.",
    challenges: ["Teams switching between tools to complete one task", "Time spent finding and interpreting business information", "AI outputs disconnected from approvals and operational records"],
    audience: "Businesses planning custom software or extending an existing application with a clearly defined AI-assisted capability.",
    useCases: [
      ["AI-assisted operational dashboards", "Present draft summaries beside source records, with status, review ownership and traceable actions."],
      ["Business knowledge search", "Help authorised users retrieve approved information within the application they already use."],
      ["Document-enabled portals", "Extract proposed fields from uploaded documents and let a reviewer confirm the final record."],
      ["Drafting within a workflow", "Prepare a response or report inside the relevant case, while keeping final approval with the user."],
    ],
    deliverablesHeading: "Solid software foundations. Scoped AI features.",
    deliverables: ["Roles, business rules and a manageable first-release scope", "Responsive application screens and data model", "Agreed AI features with source and review context", "Server-side provider calls, permissions and usage limits", "Representative evaluation, documentation and handover plan"],
    approach,
    faqs: [
      ["Does every feature need AI?", "No. Deterministic rules, filters and standard software may be more appropriate. We assess AI only where it can support a specific user task."],
      ["Can AI be added to existing software?", "Potentially. We need to review its architecture, code access, APIs, data model and permission system before confirming an approach."],
      ["Are provider fees and ongoing support included?", "Only when explicitly agreed. Model usage, hosting, third-party fees, monitoring and maintenance responsibilities should be clear in the proposal."],
    ],
  },
];
