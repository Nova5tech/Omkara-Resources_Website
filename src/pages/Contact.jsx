import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import { company } from '../data/companyData';
import { submitEnquiry } from '../services/contactService';

/* ---------------------------------------------------------------
   EDITABLE SETTINGS
   --------------------------------------------------------------- */

// Set to false if the phone number should be optional.
const PHONE_REQUIRED = true;

const SERVICE_OPTIONS = [
  'Manpower Supplies',
  'Civil Constructions',
  'IT Services',
  'General Enquiry',
];

/* ---------------------------------------------------------------
   VALIDATION
   --------------------------------------------------------------- */

const FIELD_ORDER = ['name', 'email', 'phone', 'service', 'subject', 'message'];
const EMPTY = {
  name: '',
  email: '',
  phone: '',
  service: '',
  subject: '',
  message: '',
  website: '', // hidden spam-trap field: real visitors never fill it
};

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// Removes characters that can never be part of a valid value,
// as the person types or pastes.
function sanitizeInput(name, rawValue) {
  if (name === 'phone') {
    let digits = rawValue.replace(/\D/g, '');
    // Pasted "+91 98765 43210" -> drop the country code
    if (rawValue.trim().startsWith('+91') && digits.length > 10) {
      digits = digits.slice(2);
    }
    return digits.slice(0, 10); // digits only, max 10
  }

  if (name === 'email') {
    const cleaned = rawValue.replace(/[^A-Za-z0-9@._%+-]/g, '');
    const parts = cleaned.split('@');
    if (parts.length === 1) return parts[0];
    // Only ONE @ is allowed; after it: letters, digits, dots and hyphens only
    const domain = parts.slice(1).join('').replace(/[^A-Za-z0-9.-]/g, '');
    return `${parts[0]}@${domain}`;
  }

  return rawValue;
}

function validateField(name, raw) {
  const value = raw.trim();

  switch (name) {
    case 'name':
      if (!value) return 'Please enter your full name.';
      if (value.length < 2) return 'Your name looks too short.';
      return '';

    case 'email':
      if (!value) return 'Please enter your email address.';
      if (!EMAIL_RE.test(value) || value.includes('..')) {
        return 'Please enter a valid email, for example name@example.com.';
      }
      return '';

    case 'phone':
      if (!value) return PHONE_REQUIRED ? 'Please enter your phone number.' : '';
      if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit phone number.';
      return '';

    case 'service':
      if (!value) return 'Please choose a service.';
      if (!SERVICE_OPTIONS.includes(value)) return 'Please choose one of the listed services.';
      return '';

    case 'subject':
      if (!value) return 'Please enter a subject.';
      if (value.length < 3) return 'The subject looks too short.';
      return '';

    case 'message':
      if (!value) return 'Please write a message.';
      if (value.length < 10) return 'Please write at least 10 characters.';
      return '';

    default:
      return '';
  }
}

function validateAll(values) {
  const result = {};
  FIELD_ORDER.forEach((name) => {
    const message = validateField(name, values[name]);
    if (message) result[name] = message;
  });
  return result;
}

/* ---------------------------------------------------------------
   SMALL HELPERS
   --------------------------------------------------------------- */

const isPlaceholder = (text) => text.trim().startsWith('[');

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-page px-4 py-3 text-base text-ink placeholder:text-muted/70 transition focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
      : 'border-line focus:border-accent focus:ring-accent/30'
  }`;

function Field({ name, label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {(name !== 'phone' || PHONE_REQUIRED) && (
          <span className="ml-0.5 text-accent-text" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function messageForError(err) {
  switch (err?.code) {
    case 'NOT_CONFIGURED':
      return {
        message:
          'Your message was not sent because the enquiry form is not connected to an email service yet. Please contact us using the details on this page.',
        hint: import.meta.env.DEV
          ? 'Developer note: set VITE_CONTACT_ENDPOINT in .env and restart the dev server. See src/services/contactService.js.'
          : '',
      };
    case 'NETWORK':
      return {
        message: 'We could not reach the server. Please check your internet connection and try again.',
        hint: '',
      };
    default:
      return {
        message:
          'Something went wrong while sending your enquiry. Please try again, or contact us using the details on this page.',
        hint: '',
      };
  }
}

/* ---------------------------------------------------------------
   PAGE
   --------------------------------------------------------------- */

export default function Contact() {
  usePageMeta(
    'Contact Us',
    'Contact OMKARA RESOURCES to discuss your manpower, civil construction or IT service requirements.'
  );

  // "Enquire Now" on the Services page passes the chosen service here
  const location = useLocation();
  const preselected = SERVICE_OPTIONS.includes(location.state?.service)
    ? location.state.service
    : '';

  const [values, setValues] = useState({ ...EMPTY, service: preselected });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [notice, setNotice] = useState(null); // { message, hint } shown as an error banner

  const submitting = status === 'submitting';
  const { contact } = company;

  const handleChange = (e) => {
    const { name } = e.target;
    const value = sanitizeInput(name, e.target.value);
    setValues((v) => ({ ...v, [name]: value }));
    // Once a field shows an error, re-check it as the person types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setNotice(null);
    const found = validateAll(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      setNotice({ message: 'Please correct the highlighted fields and try again.', hint: '' });
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        service: values.service,
        subject: values.subject.trim(),
        message: values.message.trim(),
        website: values.website,
        submittedAt: new Date().toISOString(),
      });
      setValues(EMPTY);
      setErrors({});
      setStatus('success');
    } catch (err) {
      setNotice(messageForError(err));
      setStatus('idle'); // the visitor's text stays in the form
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: submitting,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: inputClass(Boolean(errors[name])),
  });

  const details = [
    { icon: Phone, label: 'Phone', value: contact.phone, href: (v) => `tel:${v.replace(/[^\d+]/g, '')}` },
    { icon: Mail, label: 'Email', value: contact.email, href: (v) => `mailto:${v}` },
    { icon: MapPin, label: 'Office address', value: contact.address },
    { icon: Clock, label: 'Business hours', value: contact.hours },
  ];

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Contact
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Connect with OMKARA RESOURCES to discuss your business requirements. Send us an
            enquiry and tell us what you need.
          </p>
        </div>
      </section>

      {/* Form + details */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Enquiry form */}
          <div className="theme-smooth rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:col-span-3">
            {status === 'success' ? (
              <div role="status" className="py-8 text-center">
                <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent">
                  <CheckCircle2 size={32} aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Enquiry sent</h2>
                <p className="mx-auto mt-3 max-w-md text-base text-muted">
                  Thank you for contacting OMKARA RESOURCES. Your message has been delivered and we
                  will get back to you.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-7 inline-flex items-center rounded-full border border-line bg-page px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-busy={submitting}>
                <h2 className="text-2xl font-extrabold text-ink">Send an Enquiry</h2>
                <p className="mt-2 text-sm text-muted">Fields marked * are required.</p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {/* Honeypot: hidden from people, bots tend to fill it in */}
                  <div
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </div>

                  <Field name="name" label="Full Name" error={errors.name}>
                    <input
                      {...fieldProps('name')}
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field name="email" label="Email Address" error={errors.email}>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      maxLength={100}
                      autoComplete="email"
                      placeholder="name@example.com"
                    />
                  </Field>

                  <Field name="phone" label="Phone Number" error={errors.phone}>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                    />
                  </Field>

                  <Field name="service" label="Service Interested In" error={errors.service}>
                    <div className="relative">
                      <select
                        {...fieldProps('service')}
                        className={`${inputClass(Boolean(errors.service))} appearance-none pr-11`}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                      />
                    </div>
                  </Field>

                  <Field name="subject" label="Subject" error={errors.subject} className="sm:col-span-2">
                    <input
                      {...fieldProps('subject')}
                      type="text"
                      placeholder="What is your enquiry about?"
                    />
                  </Field>

                  <Field name="message" label="Message" error={errors.message} className="sm:col-span-2">
                    <textarea
                      {...fieldProps('message')}
                      rows={5}
                      maxLength={2000}
                      placeholder="Tell us about your requirements"
                    />
                  </Field>
                </div>

                {notice && (
                  <div
                    role="alert"
                    className="mt-6 flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p>{notice.message}</p>
                      {notice.hint && <p className="mt-2 font-mono text-xs opacity-80">{notice.hint}</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Enquiry <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <aside className="space-y-6 lg:col-span-2" aria-label="Contact information">
            <div className="theme-smooth rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-ink">Contact Information</h2>
              <ul className="mt-6 space-y-5">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-widest text-accent-text">
                        {label}
                      </p>
                      {href && !isPlaceholder(value) ? (
                        <a
                          href={href(value)}
                          className="mt-1 block break-words text-base text-ink underline-offset-4 hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 break-words text-base text-muted">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Enquiry call to action (white card) */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="theme-smooth rounded-3xl border border-line bg-surface px-6 py-12 text-center sm:px-12 sm:py-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Not sure what you need yet?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Browse our three business divisions, then come back and tell us about your requirements.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Our Services <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}