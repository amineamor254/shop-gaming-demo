import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Cpu,
  Flame,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trophy,
  Truck,
  Zap,
} from "lucide-react";

// ضع مسار صورة الجهاز هنا، مثال: "/images/mian-vandal.png" (داخل مجلد public)
// إذا تركته فارغاً سيظهر شكل بديل بالـ CSS
const PRODUCT_IMAGE = "/images/mian-vandal.png";

const STATS = [
  { icon: Trophy, value: "240+", label: "Builds delivered" },
  { icon: Cpu, value: "RTX 50", label: "Latest series" },
  { icon: Clock, value: "24", label: "Months warranty" },
];

const SPECS = ["RTX 5060 Ti", "Ryzen 7 9700X", "32GB DDR5"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
      {/* ===== Background effects ===== */}
      {/* grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        {/* ===== Left: text ===== */}
        <div className="text-center lg:text-left">
          {/* badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Top-rated builds
          </span>

          {/* title */}
          <h1 className="mt-6 font-[family-name:var(--font-orbitron)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">PC Gaming</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              Custom
            </span>
            <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              Premium
            </span>
          </h1>

          <p className="mt-6 text-lg font-medium text-slate-200">
            Built for performance. Tested for victory.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400 lg:mx-0">
            Top-tier FPS, zero lag, zero compromise. Whether you play ranked or
            just for fun, your system is ready to dominate.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/Configurator"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span className="relative z-10">PC Configurator</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <Link
              href="/Sections"
              className="inline-flex items-center rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              View Systems
            </Link>
          </div>

          {/* stats */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:mx-auto lg:mx-0">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-base font-bold text-white">{value}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right: product card ===== */}
        <div className="relative mx-auto w-full max-w-sm">
          {/* glow behind card */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent blur-2xl"
          />

          <article className="group overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0a1119]/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_60px_rgba(6,182,212,0.3)]">
            {/* image area */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#070d14]">
              {PRODUCT_IMAGE ? (
                <Image
                  src={PRODUCT_IMAGE}
                  alt="Mian Vandal gaming PC"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                /* CSS placeholder: RGB fans */
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

              {/* bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1119] to-transparent" />

              {/* badge */}
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-500/20 px-2.5 py-1 text-[11px] font-semibold text-orange-300 backdrop-blur">
                <Flame className="h-3 w-3" />
                Best seller
              </span>
            </div>

            {/* info */}
            <div className="space-y-4 p-4">
              {/* price */}
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white">5499</span>
                  <span className="text-[11px] font-semibold text-cyan-400">RON</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  from 458 RON/mo
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Mian Vandal</h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SPECS.map((s, i) => (
                    <span
                      key={s}
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                        i === 0
                          ? "border-orange-400/30 bg-orange-400/10 text-orange-300"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
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

              {/* actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="group/btn relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-sm font-bold text-[#1a0f00] shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                </button>
                <Link
                  href="/sections"
                  className="inline-flex items-center rounded-lg border border-cyan-400/30 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* bottom glowing line (same style as header) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </section>
  );
}