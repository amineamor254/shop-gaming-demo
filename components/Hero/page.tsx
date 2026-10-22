import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { SITE } from "@/config/site";
import { FEATURED_PRODUCT } from "@/data/hero";
import { formatConfiguratorMoney } from "@/lib/format";

/** Introduces the featured gaming PC and links to the builder and product catalog. */
export default function Hero() {
  return (
    <section
      id="home"
      className=" scroll-mt-16 relative isolate overflow-hidden bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white"
    >
      {/* ===================== Background effects ===================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-primary-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-primary-400) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-brand-primary-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        {/* ===================== Hero copy ===================== */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary-400/20 bg-brand-primary-400/5 px-3 py-1 text-xs font-medium text-brand-primary-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary-400" />
            </span>
            Top-rated builds
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-orbitron)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">PC Gaming</span>
            <span className="block bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              Custom
            </span>
            <span className="block bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              Premium
            </span>
          </h1>

          <p className="mt-6 text-lg font-medium text-slate-200">
            Built for performance. Tested for victory.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400 lg:mx-0">
            Top-tier FPS, zero lag, zero compromise. Whether you play ranked or just for fun, your
            system is ready to dominate.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="#configurator"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-primary-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span className="relative z-10">PC Configurator</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <Link
              href="#sections"
              className="inline-flex items-center rounded-full border border-brand-primary-400/40 px-6 py-3 text-sm font-semibold text-brand-primary-300 transition-all duration-300 hover:border-brand-primary-300 hover:bg-brand-primary-400/10 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-primary-400)_25%,transparent)]"
            >
              View Systems
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:mx-auto lg:mx-0">
            {FEATURED_PRODUCT.stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-400/30 hover:bg-brand-primary-400/5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-primary-400 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-base font-bold text-white">{value}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== Featured product ===================== */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-primary-500/20 via-emerald-500/10 to-transparent blur-2xl"
          />

          <article className="group overflow-hidden rounded-2xl border border-brand-primary-400/20 bg-[#0a1119]/90 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_15%,transparent)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary-400/50 hover:shadow-[0_0_60px_color-mix(in_srgb,var(--color-brand-primary-500)_30%,transparent)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#070d14]">
              {FEATURED_PRODUCT.image ? (
                <Image
                  src={FEATURED_PRODUCT.image}
                  alt={`${FEATURED_PRODUCT.name} gaming PC`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                /* The fallback recreates RGB fan lighting when no product image is configured. */
                <div className="absolute inset-0 grid place-items-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.25),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.25),transparent_50%)]" />
                  <div className="relative grid grid-cols-2 gap-5">
                    {[
                      "border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.6)]",
                      "border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.6)]",
                      "border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.6)]",
                      "border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.6)]",
                    ].map((cls, i) => (
                      <div
                        key={i}
                        className={`h-24 w-24 animate-pulse rounded-full border-[6px] ${cls}`}
                        style={{ animationDelay: `${i * 300}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1119] to-transparent" />

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-brand-accent-400/40 bg-brand-accent-500/20 px-2.5 py-1 text-[11px] font-semibold text-brand-accent-300 backdrop-blur">
                <Flame className="h-3 w-3" />
                Best seller
              </span>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white">{FEATURED_PRODUCT.price.toLocaleString("en-US")}</span>
                  <span className="text-[11px] font-semibold text-brand-primary-400">{SITE.currencySymbol}</span>
                </div>
                <span className="text-[11px] text-slate-500">from {formatConfiguratorMoney(FEATURED_PRODUCT.monthlyPrice)}/mo</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{FEATURED_PRODUCT.name}</h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {FEATURED_PRODUCT.specs.map((s, i) => (
                    <span
                      key={s}
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                        i === 0
                          ? "border-brand-accent-400/30 bg-brand-accent-400/10 text-brand-accent-300"
                          : "border-brand-primary-400/20 bg-brand-primary-400/10 text-brand-primary-300"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" /> Free delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> 24m warranty
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <AddToCartButton
                  item={{
                    id: "hero-featured-pc",
                    name: FEATURED_PRODUCT.name,
                    price: FEATURED_PRODUCT.price,
                    variant: FEATURED_PRODUCT.specs.join(" · "),
                  }}
                  addedContent={<>Added ✓</>}
                  className="group/btn relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-brand-accent-500 to-amber-400 px-4 py-2.5 text-sm font-bold text-[#1a0f00] shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-accent-500)_35%,transparent)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-accent-500)_60%,transparent)] active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                </AddToCartButton>

                <Link
                  href="#sections"
                  className="inline-flex items-center rounded-lg border border-brand-primary-400/30 px-4 py-2.5 text-sm font-semibold text-brand-primary-300 transition-all duration-300 hover:bg-brand-primary-400/10 hover:text-brand-primary-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary-400/40 to-transparent" />
    </section>
  );
}
