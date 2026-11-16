import { serviceDetails } from "./serviceDetails.js";

export const enquiryServices = [
  "Website Development",
  "Custom Software Development",
  "Mobile App Development",
  "School / Institute Software",
  "Digital Marketing",
  "IT Training",
  "Other",
];

export function validateEnquiry(data) {
  if (!data.name.trim() || !data.message.trim())
    return "Please enter your name and project message.";
  if (
    data.name.length > 100 ||
    data.email.length > 254 ||
    data.message.length > 5000 ||
    data.budget.length > 100 ||
    (data.timeline || "").length > 120
  )
    return "Please shorten your enquiry to fit the field limits.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    return "Please enter a valid email address.";
  const digits = data.phone.replace(/\D/g, "");
  if (
    !/^\+?[\d\s().-]+$/.test(data.phone) ||
    digits.length < 7 ||
    digits.length > 15
  )
    return "Please enter a phone number with 7–15 digits, including your country code where needed.";
  if (!enquiryServices.includes(data.service))
    return "Please select a service.";
  return "";
}

export async function submitEnquiry(data, fetcher = fetch) {
  const response = await fetcher("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      // Web3Forms access keys are public form identifiers, not server credentials.
      access_key: "4c23bf19-15ad-4cc1-9469-45e61eedd701",
      subject: "New Website Enquiry - Exoite IT Services",
      from_name: "Exoite IT Services Website",
      ...Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.trim()]),
      ),
      botcheck: "",
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.success)
    throw new Error("Enquiry delivery was not confirmed.");
}

export function enquiryContext(search) {
  const params = new URLSearchParams(search);
  const requested = params.get("service") || "";
  const mapping = {
    "School & Institute Solutions": "School / Institute Software",
    "Digital Presence & Marketing": "Digital Marketing",
    "IT Training & Workshops": "IT Training",
  };
  const service =
    serviceDetails.find(
      (item) => item.slug === requested || item.name === requested,
    )?.enquiry ||
    mapping[requested] ||
    requested;
  const solution = (params.get("solution") || "").slice(0, 150);
  return {
    service: enquiryServices.includes(service)
      ? service
      : solution
        ? "Custom Software Development"
        : "",
    message: solution ? `I would like to discuss the ${solution} concept.` : "",
  };
}
