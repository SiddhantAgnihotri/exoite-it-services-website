import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  enquiryContext,
  validateEnquiry,
  submitEnquiry,
  enquiryServices,
} from "../data/enquiry";
import { siteConfig } from "../data/siteConfig";
import PageHero from "../components/ui/PageHero";
const services = enquiryServices;

const Contact = () => {
  const { search } = useLocation();
  const submitting = useRef(false);
  const feedbackRef = useRef(null);
  const [formReady, setFormReady] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  useEffect(() => {
    // Keep native controls inert until the submission handler is attached.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormReady(true);
    // Synchronize enquiry links after hydration; static HTML has no query string.
    setFormData((prev) => ({ ...prev, ...enquiryContext(search) }));
  }, [search]);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createWhatsAppMessage = () => {
    return `Hello Exoite IT Services,

I want to discuss a project.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service Required: ${formData.service}
Budget: ${formData.budget || "Not mentioned"}
Timeline: ${formData.timeline || "Not mentioned"}

Message:
${formData.message}`;
  };

  const whatsappFormLink = `https://wa.me/${
    siteConfig.whatsappNumber
  }?text=${encodeURIComponent(createWhatsAppMessage())}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting.current || new FormData(e.currentTarget).get("botcheck"))
      return;
    const validationError = validateEnquiry(formData);
    if (validationError) {
      setStatus({ loading: false, success: false, error: validationError });
      feedbackRef.current?.focus();
      return;
    }
    submitting.current = true;
    setStatus({
      loading: true,
      success: false,
      error: "",
    });

    try {
      await submitEnquiry(formData);

      setStatus({
        loading: false,
        success: true,
        error: "",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Message could not be sent. Please contact us on WhatsApp.",
      });
    } finally {
      submitting.current = false;
      feedbackRef.current?.focus();
    }
  };

  return (
    <main className="contact-page">
      <PageHero
        label="Contact Exoite"
        title="A good project starts with a conversation."
        description="Tell us what you need to build or improve."
      />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-form-panel">
            <p className="eyebrow">Project enquiry</p>
            <h2>What do you have in mind?</h2>
            <p>
              Fields marked * are required.
            </p>
            <div
              className="form-feedback"
              ref={feedbackRef}
              tabIndex={-1}
              aria-live="polite"
              aria-atomic="true"
            >
              {status.success && (
                <>
                  <strong>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    Enquiry sent
                  </strong>
                  <p>
                    Thank you for sharing your requirements. We will contact you
                    using the details provided.
                  </p>
                </>
              )}
              {status.error && (
                <>
                  <strong>We couldn't send your enquiry</strong>
                  <p>{status.error}</p>
                </>
              )}
            </div>
            <form
              className="enquiry-form"
              method="post"
              action="/contact"
              onSubmit={handleSubmit}
              aria-busy={status.loading}
            >
              <noscript>
                <p className="form-notice">
                  JavaScript is required to send this form securely. The form
                  is disabled. Please use the email, phone or Chat on WhatsApp
                  options below to contact us.
                </p>
              </noscript>
              <fieldset className="enquiry-controls" disabled={!formReady}>
              <div hidden aria-hidden="true">
                <label htmlFor="botcheck">Leave this field empty</label>
                <input
                  type="checkbox"
                  id="botcheck"
                  name="botcheck"
                  tabIndex={-1}
                />
              </div>
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="enquiry-name">Full name *</label>
                  <input
                    id="enquiry-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-email">Email address *</label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-phone">Phone number *</label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={25}
                    pattern="[+0-9\(\) .\-]{7,25}"
                    title="Enter 7 to 15 digits. Spaces, brackets and a leading + are allowed."
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Include your country code"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-service">Interested in *</label>
                  <select
                    id="enquiry-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-budget">
                    Estimated budget{" "}
                    <span className="small-note">(optional)</span>
                  </label>
                  <input
                    id="enquiry-budget"
                    name="budget"
                    type="text"
                    maxLength={100}
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Approximate range, if known"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-timeline">
                    Preferred timeline{" "}
                    <span className="small-note">(optional)</span>
                  </label>
                  <input
                    id="enquiry-timeline"
                    name="timeline"
                    type="text"
                    maxLength={120}
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="Target date or flexible"
                  />
                </div>
                <div className="form-field full">
                  <label htmlFor="enquiry-message">About your project *</label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={5}
                    maxLength={5000}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your goal, key features and constraints..."
                  />
                </div>
              </div>
              <p className="form-notice">
                Your details are used to respond to your enquiry and sent
                through Web3Forms. Please do not include passwords or sensitive
                information.{" "}
                <Link to="/privacy-policy">Read the privacy policy draft</Link>.
              </p>
              <div className="form-actions">
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={status.loading}
                >
                  {status.loading ? "Sending your enquiry..." : "Send enquiry"}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <a
                  className="button button-secondary"
                  href={whatsappFormLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Send via WhatsApp
                </a>
              </div>
              </fieldset>
            </form>
          </div>
          <aside className="contact-sidebar">
            <p className="eyebrow">Prefer a direct conversation?</p>
            <h2>We're here to understand.</h2>
            <p>
              Kanpur, India. Working remotely across India and internationally.
            </p>
            <div className="contact-method">
              <Mail size={20} aria-hidden="true" />
              <div>
                <h3>Email us</h3>
                <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
              </div>
            </div>
            <div className="contact-method">
              <Phone size={20} aria-hidden="true" />
              <div>
                <h3>Call or WhatsApp</h3>
                <a href={"tel:+" + siteConfig.whatsappNumber}>
                  +{siteConfig.whatsappNumber}
                </a>
              </div>
            </div>
            <div className="contact-method">
              <MapPin size={20} aria-hidden="true" />
              <div>
                <h3>Our location</h3>
                <p>{siteConfig.location}</p>
              </div>
            </div>
            <a
              className="button button-secondary"
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp <ArrowRight size={15} />
            </a>
            <div className="contact-next">
              <h3>What happens next?</h3>
              <ol>
                <li>
                  <span>01</span>We review your requirements.
                </li>
                <li>
                  <span>02</span>We discuss the details together.
                </li>
                <li>
                  <span>03</span>We suggest a scope and next steps.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
export default Contact;
