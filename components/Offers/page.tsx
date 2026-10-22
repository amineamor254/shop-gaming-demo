"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Info,
  Percent,
  Tag,
  Zap,
} from "lucide-react";
import { FLASH_SALE, FLASH_SALE_END, OFFERS, PERKS } from "@/data/offers";

/* ===================== Section ===================== */

/** Displays featured promotions, a hydration-safe countdown, and copyable offer codes. */
export default function Offers() {
  const [msLeft, setMsLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Start the timer after hydration so the server and initial client render use the same placeholder.
  useEffect(() => {
    const end = new Date(FLASH_SALE_END).getTime();
    const tick = () => setMsLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts =
    msLeft === null
      ? null
      : {
          days: Math.floor(msLeft / 86_400_000),
          hours: Math.floor((msLeft / 3_600_000) % 24),
          minutes: Math.floor((msLeft / 60_000) % 60),
          seconds: Math.floor((msLeft / 1000) % 60),
        };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied((c) => (c === code ? null : c)), 2000);
    } catch {
      /* Clipboard access may be unavailable because of browser permissions or context. */
    }
  };

  return (
    <section
      id="offers"
      aria-labelledby="offers-title"
      className="relative isolate scroll-mt-16 overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white"
    >
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
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-[400px] w-[400px] rounded-full bg-brand-primary-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* ===================== Section heading ===================== */}
        <div className="mb-10 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent-400/30 bg-brand-accent-500/10 px-3 py-1 text-xs font-medium text-brand-accent-300">
            <Percent className="h-3.5 w-3.5" />
            Hot deals
          </span>
          <h2 id="offers-title" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Special{" "}
            <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              Offers
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 lg:mx-0">
            Level up your setup for less. Use the codes below at checkout or in the configurator.
          </p>
        </div>

        {/* ===================== Featured flash sale ===================== */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-brand-primary-400/25 bg-gradient-to-br from-brand-primary-500/15 via-[#0a1119] to-emerald-500/10 p-6 shadow-[0_0_50px_color-mix(in_srgb,var(--color-brand-primary-500)_15%,transparent)] sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent-400/40 bg-brand-accent-500/20 px-2.5 py-1 text-[11px] font-semibold text-brand-accent-300">
                <Zap className="h-3 w-3" />
                {FLASH_SALE.tag}
              </span>

              <h3 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                {FLASH_SALE.title}{" "}
                <span className="bg-gradient-to-r from-brand-primary-300 to-sky-500 bg-clip-text text-transparent">
                  {FLASH_SALE.highlight}
                </span>
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400 lg:mx-0">
                {FLASH_SALE.text}
              </p>

              <div
                role="timer"
                aria-label="Time left for the flash sale"
                className="mt-6 flex items-center justify-center gap-2 sm:gap-3 lg:justify-start"
              >
                {(
                  [
                    ["Days", parts?.days],
                    ["Hours", parts?.hours],
                    ["Min", parts?.minutes],
                    ["Sec", parts?.seconds],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-16 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-center sm:min-w-20"
                  >
                    <div className="text-2xl font-extrabold tabular-nums text-brand-primary-300 sm:text-3xl">
                      {value === undefined ? "--" : String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="#configurator"
                className="group relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-primary-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95"
              >
                <span className="relative z-10">Build your PC</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </div>

            <div
              aria-hidden
              className="relative mx-auto grid aspect-square w-full max-w-[260px] place-items-center"
            >
              <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-brand-primary-400/30 motion-reduce:animate-none" />
              <div className="absolute inset-6 rounded-full border border-brand-primary-400/20" />
              <div className="absolute inset-12 rounded-full bg-brand-primary-500/10 blur-xl" />
              <div className="relative text-center">
                <div className="bg-gradient-to-b from-white to-brand-primary-300 bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_60%,transparent)] sm:text-7xl">
                  {FLASH_SALE.discount}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-primary-300">
                  Limited time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== Offer cards ===================== */}
        <div className="grid gap-4 md:grid-cols-3">
          {OFFERS.map((o) => {
            const Icon = o.icon;
            // A local const keeps TypeScript's narrowing valid inside the onClick closure below.
            const code = o.code;
            const isCopied = code !== undefined && copied === code;
            return (
              <article
                key={o.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a1119]/90 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-primary-400/40 hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_22%,transparent)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-primary-500/15 text-brand-primary-300 shadow-[0_0_16px_color-mix(in_srgb,var(--color-brand-primary-500)_20%,transparent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-md bg-brand-primary-500 px-2 py-0.5 text-[10px] font-bold text-[#06121a] shadow-[0_0_12px_color-mix(in_srgb,var(--color-brand-primary-500)_50%,transparent)]">
                    {o.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold transition-colors group-hover:text-brand-primary-300">
                  {o.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{o.text}</p>

                {/* Offers with a promo code get a copy button; the others show an explanatory note. */}
                {code !== undefined ? (
                  <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-dashed border-brand-primary-400/30 bg-black/40 px-3 py-2">
                    <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-primary-300">
                      <Tag className="h-3.5 w-3.5" />
                      {code}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyCode(code)}
                      aria-label={`Copy code ${code}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-300 transition-all duration-300 hover:border-brand-primary-400/50 hover:text-brand-primary-300"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-[11px] leading-relaxed text-slate-400">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary-400" />
                    {o.note ?? "No code needed."}
                  </p>
                )}

                <Link
                  href="#sections"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-brand-primary-400/30 px-4 py-2.5 text-xs font-semibold text-brand-primary-300 transition-all duration-300 hover:bg-brand-primary-400/10 hover:text-brand-primary-200"
                >
                  Shop now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>

        {/* ===================== Store perks ===================== */}
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-brand-primary-400/30 hover:bg-brand-primary-400/5"
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-primary-400" />
              <div>
                <p className="text-xs font-bold">{title}</p>
                <p className="text-[11px] text-slate-500">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}