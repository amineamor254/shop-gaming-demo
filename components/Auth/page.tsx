"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Cpu,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  Package,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";

/* ===================== Types ===================== */

type Mode = "signin" | "signup" | "reset";

type Values = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  remember: boolean;
  terms: boolean;
};

type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

const INITIAL: Values = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  remember: false,
  terms: false,
};

// Used to move focus to the first invalid field after a failed submit.
const FIELD_ORDER: FieldKey[] = ["name", "email", "password", "confirm", "terms"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TITLES: Record<Mode, string> = {
  signin: "Welcome back",
  signup: "Create your account",
  reset: "Reset your password",
};

const SUBTITLES: Record<Mode, string> = {
  signin: "Sign in to track orders and manage your builds.",
  signup: "Join us to save your builds and check out faster.",
  reset: "Enter your email and we will send you a reset link.",
};

const BENEFITS = [
  { icon: Package, title: "Track your orders", text: "Follow every build from assembly to delivery." },
  { icon: Cpu, title: "Save your builds", text: "Keep your favorite configurations in one place." },
  { icon: Zap, title: "Faster checkout", text: "Your details are ready when you are." },
  { icon: ShieldCheck, title: "Easy warranty claims", text: "Manage your 24-month warranty online." },
];

/* ===================== Helpers ===================== */

/** Returns 0 to 4: one point each for length, mixed case, a digit and a symbol. */
function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["bg-red-400", "bg-brand-accent-400", "bg-amber-400", "bg-emerald-400", "bg-brand-primary-400"];

function validate(mode: Mode, v: Values): Errors {
  const e: Errors = {};

  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (mode === "reset") return e;

  if (mode === "signup" && v.name.trim().length < 2) e.name = "Please enter your name.";

  if (mode === "signin") {
    if (v.password.length === 0) e.password = "Please enter your password.";
  } else {
    if (v.password.length < 8) e.password = "Use at least 8 characters.";
    if (v.confirm !== v.password) e.confirm = "Passwords do not match.";
    if (!v.terms) e.terms = "You must accept the terms to continue.";
  }

  return e;
}

/* ===================== Page ===================== */

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [done, setDone] = useState<{ mode: Mode; email: string } | null>(null);

  const setField = <K extends FieldKey>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "failed") setStatus("idle");
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setStatus("idle");
    setDone(null);
    setShowPassword(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(mode, values);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(`auth-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      // TODO: Connect your authentication provider here (Auth.js, Clerk, Supabase, ...).
      // Never store or log raw passwords yourself. This demo only simulates the request.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setDone({ mode, email: values.email.trim() });
      setValues(INITIAL);
      setStatus("idle");
    } catch {
      setStatus("failed");
    }
  };

  const strength = passwordStrength(values.password);

  return (
    <main className="relative isolate min-h-[70vh] overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
      {/* ===================== Background ===================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-primary-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-primary-400) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[380px] w-[380px] rounded-full bg-brand-primary-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[340px] w-[340px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        {/* ===================== Breadcrumb ===================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center gap-2 text-xs text-slate-400 lg:justify-start"
        >
          <Link
            href="/#home"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-primary-300"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span aria-current="page" className="font-semibold text-brand-primary-300">
            Account
          </span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ===================== Benefits (desktop only) ===================== */}
          <div className="hidden lg:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary-400/20 bg-brand-primary-400/5 px-3 py-1 text-xs font-medium text-brand-primary-300">
              <span className="h-2 w-2 rounded-full bg-brand-primary-400" />
              My account
            </span>
            <p className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">
              Your account,{" "}
              <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
                your builds
              </span>
            </p>

            <ul className="mt-8 space-y-3">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary-400/30 hover:bg-brand-primary-400/5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-primary-500/15 text-brand-primary-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="block text-[11px] text-slate-400">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ===================== Form card ===================== */}
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-primary-500/20 via-emerald-500/10 to-transparent blur-2xl"
            />

            <div className="rounded-2xl border border-brand-primary-400/20 bg-[#0a1119]/90 p-6 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_15%,transparent)] backdrop-blur sm:p-8">
              {done ? (
                <SuccessPanel
                  done={done}
                  onBackToSignIn={() => switchMode("signin")}
                />
              ) : (
                <>
                  {/* tabs (hidden in reset mode) */}
                  {mode !== "reset" && (
                    <div
                      role="tablist"
                      aria-label="Account"
                      className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1"
                    >
                      {(
                        [
                          ["signin", "Sign in"],
                          ["signup", "Create account"],
                        ] as const
                      ).map(([m, label]) => (
                        <button
                          key={m}
                          type="button"
                          role="tab"
                          id={`tab-${m}`}
                          aria-selected={mode === m}
                          aria-controls="auth-panel"
                          onClick={() => switchMode(m)}
                          className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                            mode === m
                              ? "bg-brand-primary-500 text-[#06121a] shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-primary-500)_50%,transparent)]"
                              : "text-slate-300 hover:bg-white/5 hover:text-brand-primary-300"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    id="auth-panel"
                    role={mode === "reset" ? undefined : "tabpanel"}
                    aria-labelledby={mode === "reset" ? undefined : `tab-${mode}`}
                  >
                    <h1 className="text-2xl font-extrabold">{TITLES[mode]}</h1>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{SUBTITLES[mode]}</p>

                    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                      {mode === "signup" && (
                        <Field label="Full name" id="auth-name" error={errors.name}>
                          <IconInput icon={User}>
                            <input
                              id="auth-name"
                              type="text"
                              autoComplete="name"
                              value={values.name}
                              onChange={(e) => setField("name", e.target.value)}
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "auth-name-error" : undefined}
                              placeholder="John Doe"
                              className={inputClass(!!errors.name)}
                            />
                          </IconInput>
                        </Field>
                      )}

                      <Field label="Email" id="auth-email" error={errors.email}>
                        <IconInput icon={Mail}>
                          <input
                            id="auth-email"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => setField("email", e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "auth-email-error" : undefined}
                            placeholder="you@example.com"
                            className={inputClass(!!errors.email)}
                          />
                        </IconInput>
                      </Field>

                      {mode !== "reset" && (
                        <Field label="Password" id="auth-password" error={errors.password}>
                          <IconInput icon={Lock}>
                            <input
                              id="auth-password"
                              type={showPassword ? "text" : "password"}
                              autoComplete={mode === "signin" ? "current-password" : "new-password"}
                              value={values.password}
                              onChange={(e) => setField("password", e.target.value)}
                              aria-invalid={!!errors.password}
                              aria-describedby={errors.password ? "auth-password-error" : undefined}
                              className={`${inputClass(!!errors.password)} pr-11`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              aria-pressed={showPassword}
                              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition-colors hover:text-brand-primary-300"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </IconInput>

                          {/* strength meter (sign up only) */}
                          {mode === "signup" && values.password.length > 0 && (
                            <div className="mt-2" aria-live="polite">
                              <div className="flex gap-1">
                                {[0, 1, 2, 3].map((i) => (
                                  <span
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                      i < strength ? STRENGTH_COLORS[strength] : "bg-white/10"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="mt-1 text-[11px] text-slate-400">
                                Strength: {STRENGTH_LABELS[strength]}
                              </p>
                            </div>
                          )}
                        </Field>
                      )}

                      {mode === "signup" && (
                        <Field label="Confirm password" id="auth-confirm" error={errors.confirm}>
                          <IconInput icon={Lock}>
                            <input
                              id="auth-confirm"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              value={values.confirm}
                              onChange={(e) => setField("confirm", e.target.value)}
                              aria-invalid={!!errors.confirm}
                              aria-describedby={errors.confirm ? "auth-confirm-error" : undefined}
                              className={inputClass(!!errors.confirm)}
                            />
                          </IconInput>
                        </Field>
                      )}

                      {mode === "signin" && (
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <label className="flex cursor-pointer items-center gap-2 text-slate-300">
                            <input
                              id="auth-remember"
                              type="checkbox"
                              checked={values.remember}
                              onChange={(e) => setField("remember", e.target.checked)}
                              className="h-3.5 w-3.5 accent-brand-primary-400"
                            />
                            Remember me
                          </label>
                          <button
                            type="button"
                            onClick={() => switchMode("reset")}
                            className="font-semibold text-brand-primary-300 transition-colors hover:text-brand-primary-200"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}

                      {mode === "signup" && (
                        <div>
                          <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-slate-300">
                            <input
                              id="auth-terms"
                              type="checkbox"
                              checked={values.terms}
                              onChange={(e) => setField("terms", e.target.checked)}
                              aria-invalid={!!errors.terms}
                              aria-describedby={errors.terms ? "auth-terms-error" : undefined}
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-primary-400"
                            />
                            <span>
                              I agree to the{" "}
                              <Link
                                href="/legal/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-primary-300 underline-offset-2 hover:underline"
                              >
                                terms &amp; conditions
                              </Link>{" "}
                              and the{" "}
                              <Link
                                href="/legal/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-primary-300 underline-offset-2 hover:underline"
                              >
                                privacy policy
                              </Link>
                              .
                            </span>
                          </label>
                          {errors.terms && (
                            <p id="auth-terms-error" role="alert" className="mt-1.5 text-[11px] text-red-300">
                              {errors.terms}
                            </p>
                          )}
                        </div>
                      )}

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
                        className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-primary-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {status === "sending" ? (
                          <>
                            <span
                              aria-hidden
                              className="h-4 w-4 animate-spin rounded-full border-2 border-[#06121a]/30 border-t-[#06121a] motion-reduce:animate-none"
                            />
                            <span className="relative z-10">Please wait...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">
                              {mode === "signin"
                                ? "Sign in"
                                : mode === "signup"
                                  ? "Create account"
                                  : "Send reset link"}
                            </span>
                            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </>
                        )}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                      </button>
                    </form>

                    {mode === "reset" && (
                      <button
                        type="button"
                        onClick={() => switchMode("signin")}
                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-primary-300 transition-colors hover:text-brand-primary-200"
                      >
                        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                        Back to sign in
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===================== Sub components ===================== */

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-black/40 py-2.5 pl-10 pr-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-500)_30%,transparent)] ${
    hasError ? "border-red-400/60" : "border-white/10 focus:border-brand-primary-400/60"
  }`;

/** Wraps an input and shows a decorative icon on its left side. */
function IconInput({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      {children}
    </div>
  );
}

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

function SuccessPanel({
  done,
  onBackToSignIn,
}: {
  done: { mode: Mode; email: string };
  onBackToSignIn: () => void;
}) {
  const isReset = done.mode === "reset";

  return (
    <div role="status" className="py-6 text-center">
      <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-brand-primary-500 text-[#06121a] shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-primary-500)_60%,transparent)]">
        <Check className="h-8 w-8" />
      </span>

      <h1 className="text-xl font-extrabold">
        {isReset ? "Check your email" : done.mode === "signup" ? "Account created!" : "You are signed in"}
      </h1>
      <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
        {isReset ? (
          <>
            If an account exists for <span className="font-semibold text-brand-primary-300">{done.email}</span>,
            you will receive a link to reset your password.
          </>
        ) : (
          "Your account is ready. Start shopping or build your dream PC."
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isReset ? (
          <button
            type="button"
            onClick={onBackToSignIn}
            className="rounded-full border border-brand-primary-400/40 px-5 py-2.5 text-xs font-semibold text-brand-primary-300 transition-all duration-300 hover:border-brand-primary-300 hover:bg-brand-primary-400/10"
          >
            Back to sign in
          </button>
        ) : (
          <>
            <Link
              href="/#sections"
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary-500 px-5 py-2.5 text-xs font-bold text-[#06121a] shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-primary-500)_40%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-primary-500)_70%,transparent)] active:scale-95"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#home"
              className="rounded-full border border-brand-primary-400/40 px-5 py-2.5 text-xs font-semibold text-brand-primary-300 transition-all duration-300 hover:border-brand-primary-300 hover:bg-brand-primary-400/10"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}