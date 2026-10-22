"use client";

import { useState } from "react";
import { Check, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { SITE } from "@/config/site";

/* ===================== Store contact data ===================== */

// Inline social icons avoid relying on icon names that may vary between library versions.
const SOCIALS = [
  {
    label: SITE.socialLinks.facebook.label,
    href: SITE.socialLinks.facebook.href,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: SITE.socialLinks.x.label,
    href: SITE.socialLinks.x.href,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.2 22H2l7.7-8.8L1.5 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.8L7.2 3.9H5.3L17.7 20z" />
      </svg>
    ),
  },
  {
    label: SITE.socialLinks.instagram.label,
    href: SITE.socialLinks.instagram.href,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

/* ===================== Section ===================== */

/** Displays store contact details and a validated message form. */
export default function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failed">("idle");

  const setField = (field: FieldName, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status === "failed") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Bots often fill hidden fields; ignore those submissions without revealing the filter.
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      // TODO: Replace this delay with a request to your contact endpoint or form provider.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate scroll-mt-16 overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white"
    >
      {/* ===================== Background ===================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 46px, #22d3ee 46px 47px), repeating-linear-gradient(25deg, transparent 0 78px, #22d3ee 78px 79px)",
          maskImage: "radial-gradient(ellipse at 35% 50%, black 10%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at 35% 50%, black 10%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[38%] top-1/2 -z-10 hidden lg:block"
      >
        <span className="absolute -inset-6 animate-ping rounded-full bg-cyan-400/20 motion-reduce:animate-none" />
        <span className="relative block h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[340px] w-[340px] rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        {/* ===================== Info ===================== */}
        <div>
          <h2
            id="contact-title"
            className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-left lg:text-6xl"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              Us
            </span>
            <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-slate-400 lg:mx-0 lg:text-left">
            Questions about a build, an order or a warranty? Send us a message and our team will get
            back to you within one business day.
          </p>

          <div className="mt-10 space-y-8 border-l-2 border-cyan-400 pl-6 shadow-[-8px_0_20px_-12px_rgba(34,211,238,0.8)]">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                <Clock className="h-3.5 w-3.5" />
                Store hours
              </h3>
              <dl className="space-y-1.5 text-sm">
                {SITE.hours.map((h) => (
                  <div key={h.days} className="flex max-w-xs justify-between gap-6">
                    <dt className="text-slate-400">{h.days}</dt>
                    <dd
                      className={`font-semibold ${h.time === "Closed" ? "text-orange-300" : "text-slate-200"}`}
                    >
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                <MapPin className="h-3.5 w-3.5" />
                Address
              </h3>
              <address className="space-y-0.5 text-sm not-italic text-slate-200">
                {[SITE.contact.address].map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>

            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                Contacts
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="group inline-flex items-center gap-2.5 text-slate-200 transition-colors hover:text-cyan-300"
                  >
                    <Mail className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    {SITE.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                    className="group inline-flex items-center gap-2.5 text-slate-200 transition-colors hover:text-cyan-300"
                  >
                    <Phone className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    {SITE.contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ul
            className="mt-8 flex items-center justify-center gap-2 lg:justify-start"
            aria-label="Social media"
          >
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===================== Form ===================== */}
        <div className="group relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          {[
            "-left-3 -top-3 border-l-2 border-t-2",
            "-right-3 -top-3 border-r-2 border-t-2",
            "-bottom-3 -left-3 border-b-2 border-l-2",
            "-bottom-3 -right-3 border-b-2 border-r-2",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`pointer-events-none absolute h-10 w-10 border-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.5)] transition-all duration-500 group-focus-within:h-14 group-focus-within:w-14 group-hover:h-14 group-hover:w-14 motion-reduce:transition-none ${pos}`}
            />
          ))}

          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#0a1119]/90 p-6 shadow-[0_0_40px_rgba(6,182,212,0.12)] backdrop-blur sm:p-8">
            <h3 className="mb-6 text-center text-xl font-extrabold">Contact form</h3>

            {status === "success" ? (
              <div role="status" className="py-8 text-center">
                <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cyan-500 text-[#06121a] shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                  <Check className="h-8 w-8" />
                </span>
                <p className="text-lg font-extrabold">Message sent!</p>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
                  Thank you for reaching out. We will reply to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-cyan-400/40 px-5 py-2 text-xs font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                {/* This field stays hidden from people and catches basic bot submissions. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <Field label="Name" id="contact-name" error={errors.name}>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => setField("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="John"
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field label="Email" id="contact-email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder="you@example.com"
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field label="Message" id="contact-message" error={errors.message}>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => setField("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    placeholder="How can we help you?"
                    className={`${inputClass(!!errors.message)} resize-none`}
                  />
                </Field>

                {status === "failed" && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-400/30 bg-red-500/10 p-2.5 text-[11px] text-red-200"
                  >
                    Something went wrong. Please try again in a moment.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === "sending" ? (
                    <>
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-[#06121a]/30 border-t-[#06121a] motion-reduce:animate-none"
                      />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send message</span>
                      <Send className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </>
                  )}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Sub components ===================== */

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:shadow-[0_0_14px_rgba(6,182,212,0.3)] ${
    hasError ? "border-red-400/60" : "border-white/10 focus:border-cyan-400/60"
  }`;

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-400"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
