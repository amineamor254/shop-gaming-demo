"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Check,
  CreditCard,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Send,
  Wallet,
} from "lucide-react";

/* ===================== Data (عدّلها لعلامتك) ===================== */

const SITE = {
  name: "MIAN",
  tagline: "Games",
  description:
    "Custom gaming PCs built for performance and tested for victory. Top-tier FPS, zero lag, zero compromise.",
  address: "123 Gaming Street, Your City, Country",
  phone: "+000 123 456 789",
  email: "hello@yourbrand.com",
};

const COMPANY_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Sections", href: "/#sections" },
  { label: "PC Configurator", href: "/#configurator" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

// TODO: اربطها بصفحاتك عند إنشائها (الآن "#" حتى لا تظهر 404)
const SERVICE_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "Warranty", href: "#" },
];

const BOTTOM_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#sections" },
  { label: "Builder", href: "/#configurator" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact us", href: "/#contact" },
];

// أيقونات تواصل SVG مدمجة (لا تعتمد على إصدار lucide)
const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.2 22H2l7.7-8.8L1.5 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.8L7.2 3.9H5.3L17.7 20z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

// شارات دفع عامة (استبدلها بشعارات طرق الدفع التي تدعمها)
const PAYMENTS = [
  { label: "Card", icon: CreditCard },
  { label: "Wallet", icon: Wallet },
  { label: "Bank", icon: Landmark },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ===================== Footer ===================== */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    // TODO: أرسل البريد إلى مزوّد النشرة البريدية (Mailchimp, Resend, ...)
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="relative isolate overflow-clip border-t border-cyan-400/10 bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
      {/* ===== Background (same language as Hero) ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at bottom, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at bottom, black 20%, transparent 70%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 -z-10 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-[120px]" />
      {/* top glowing line (same as header) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr]">
          {/* ===== Brand ===== */}
          <div>
            <Link href="/#home" className="group inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#06121a]" aria-hidden>
                  <rect x="3" y="10" width="4" height="10" rx="1" />
                  <rect x="10" y="4" width="4" height="16" rx="1" />
                  <rect x="17" y="8" width="4" height="12" rx="1" />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block text-lg font-extrabold tracking-wider">{SITE.name}</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-400/70">
                  {SITE.tagline}
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
              {SITE.description}
            </p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-cyan-300"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-cyan-300"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Our Company ===== */}
          <FooterColumn title="Our Company" links={COMPANY_LINKS} />

          {/* ===== Customer Service ===== */}
          <FooterColumn title="Customer Service" links={SERVICE_LINKS} />

          {/* ===== Newsletter ===== */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              <span className="h-px w-3 bg-cyan-400/60" />
              Sign up to newsletter
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-slate-400">
              Get the latest builds, offers and gaming news straight to your inbox.
            </p>

            <form onSubmit={subscribe} noValidate>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  aria-invalid={status === "error"}
                  aria-describedby="footer-email-msg"
                  className={`h-11 w-full rounded-lg border bg-black/40 pl-10 pr-14 text-xs text-white outline-none transition placeholder:text-slate-500 focus:shadow-[0_0_14px_rgba(6,182,212,0.3)] ${
                    status === "error"
                      ? "border-red-400/60"
                      : "border-white/10 focus:border-cyan-400/60"
                  }`}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="group/btn absolute right-0 top-0 grid h-11 w-12 place-items-center overflow-hidden rounded-r-lg bg-cyan-500 text-[#06121a] transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_18px_rgba(6,182,212,0.6)] active:scale-95"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>

              <p
                id="footer-email-msg"
                role="status"
                aria-live="polite"
                className={`mt-2 flex min-h-4 items-center gap-1.5 text-[11px] ${
                  status === "error" ? "text-red-300" : "text-emerald-300"
                }`}
              >
                {status === "error" && "Please enter a valid email address."}
                {status === "success" && (
                  <>
                    <Check className="h-3.5 w-3.5" /> Thanks! You are subscribed.
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* ===== Middle row: socials + mini nav ===== */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Stay connected
            </span>
            <ul className="flex items-center gap-2">
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

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {BOTTOM_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 transition-colors hover:text-cyan-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ===== Bottom row: copyright + payments ===== */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center md:flex-row md:text-left">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} All rights reserved.{" "}
            <span className="font-semibold text-cyan-400">
              {SITE.name} {SITE.tagline}
            </span>
          </p>

          <ul className="flex items-center gap-2" aria-label="Accepted payment methods">
            {PAYMENTS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 text-[10px] font-semibold text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Scroll to top ===== */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-cyan-500 text-[#06121a] shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(6,182,212,0.8)] active:scale-95 sm:right-6 lg:bottom-6 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}

/* ===================== Sub components ===================== */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
        <span className="h-px w-3 bg-cyan-400/60" />
        {title}
      </h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-xs text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-300"
            >
              <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-2" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}