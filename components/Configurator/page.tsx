"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Check,
  Copy,
  Cpu,
  Fan,
  Flame,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  ShoppingCart,
  Sparkles,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { formatConfiguratorMoney as money } from "@/lib/format";

/* ===================== Types ===================== */

type CategoryKey = "cpu" | "gpu" | "ram" | "storage" | "cooling" | "case" | "psu";

type Part = {
  id: string;
  name: string;
  spec: string;
  price: number;
  score?: number; // 0-100 score used by the performance estimates.
  power?: number; // CPU or GPU power draw in watts.
  watts?: number; // Power supply capacity in watts.
  radiator?: number; // Cooling radiator size in millimeters; 0 represents air cooling.
  maxRadiator?: number; // Maximum radiator size supported by the case, in millimeters.
  popular?: boolean;
};

type Category = {
  key: CategoryKey;
  title: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  parts: Part[];
};

/* ===================== Product data ===================== */

const CATEGORIES: Category[] = [
  {
    key: "cpu",
    title: "Processor",
    hint: "The brain of your PC. More cores = faster multitasking.",
    icon: Cpu,
    parts: [
      {
        id: "cpu-lite",
        name: "Core Lite 6-Core",
        spec: "6 cores · 12 threads · 4.6 GHz",
        price: 180,
        score: 45,
        power: 65,
      },
      {
        id: "cpu-pro",
        name: "Core Pro 8-Core",
        spec: "8 cores · 16 threads · 5.2 GHz",
        price: 290,
        score: 70,
        power: 105,
        popular: true,
      },
      {
        id: "cpu-elite",
        name: "Core Elite 16-Core",
        spec: "16 cores · 32 threads · 5.7 GHz",
        price: 520,
        score: 95,
        power: 170,
      },
    ],
  },
  {
    key: "gpu",
    title: "Graphics Card",
    hint: "Decides your FPS and resolution. The most important part for gaming.",
    icon: Monitor,
    parts: [
      {
        id: "gpu-8",
        name: "Nova 8GB",
        spec: "1080p high settings",
        price: 280,
        score: 40,
        power: 160,
      },
      {
        id: "gpu-12",
        name: "Nova Pro 12GB",
        spec: "1440p high settings",
        price: 520,
        score: 65,
        power: 220,
        popular: true,
      },
      {
        id: "gpu-16",
        name: "Nova Ultra 16GB",
        spec: "4K ready · Ray tracing",
        price: 890,
        score: 85,
        power: 300,
      },
      {
        id: "gpu-24",
        name: "Nova Max 24GB",
        spec: "4K ultra · Creator grade",
        price: 1450,
        score: 100,
        power: 400,
      },
    ],
  },
  {
    key: "ram",
    title: "Memory",
    hint: "More RAM keeps games, streaming and apps smooth together.",
    icon: MemoryStick,
    parts: [
      { id: "ram-16", name: "16GB DDR5", spec: "5600 MHz · 2×8GB", price: 70, score: 45 },
      {
        id: "ram-32",
        name: "32GB DDR5",
        spec: "6000 MHz · 2×16GB",
        price: 130,
        score: 75,
        popular: true,
      },
      { id: "ram-64", name: "64GB DDR5", spec: "6400 MHz · 2×32GB", price: 260, score: 100 },
    ],
  },
  {
    key: "storage",
    title: "Storage",
    hint: "NVMe SSDs load games and Windows in seconds.",
    icon: HardDrive,
    parts: [
      { id: "ssd-500", name: "500GB NVMe", spec: "Gen3 · 3,500 MB/s", price: 45, score: 40 },
      {
        id: "ssd-1",
        name: "1TB NVMe Gen4",
        spec: "Gen4 · 7,000 MB/s",
        price: 80,
        score: 65,
        popular: true,
      },
      { id: "ssd-2", name: "2TB NVMe Gen4", spec: "Gen4 · 7,400 MB/s", price: 150, score: 85 },
    ],
  },
  {
    key: "cooling",
    title: "Cooling",
    hint: "Keeps temperatures low and noise down under load.",
    icon: Fan,
    parts: [
      {
        id: "cool-air",
        name: "Dual Tower Air",
        spec: "Quiet · No leak risk",
        price: 40,
        radiator: 0,
      },
      {
        id: "cool-240",
        name: "240mm Liquid AIO",
        spec: "Better thermals · RGB pump",
        price: 95,
        radiator: 240,
      },
      {
        id: "cool-360",
        name: "360mm Liquid AIO",
        spec: "Max cooling · Infinity mirror",
        price: 150,
        radiator: 360,
        popular: true,
      },
    ],
  },
  {
    key: "case",
    title: "Case",
    hint: "The look of your build. Tempered glass shows off your parts.",
    icon: Box,
    parts: [
      {
        id: "case-compact",
        name: "Compact Mesh",
        spec: "mATX · High airflow",
        price: 70,
        maxRadiator: 240,
      },
      {
        id: "case-mid",
        name: "Mid-Tower Glass RGB",
        spec: "ATX · Dual glass panels",
        price: 110,
        maxRadiator: 360,
        popular: true,
      },
      {
        id: "case-full",
        name: "Full-Tower Panoramic",
        spec: "E-ATX · Curved glass",
        price: 180,
        maxRadiator: 360,
      },
    ],
  },
  {
    key: "psu",
    title: "Power Supply",
    hint: "Stable power protects your parts. We check the wattage for you.",
    icon: Zap,
    parts: [
      { id: "psu-550", name: "550W Bronze", spec: "80+ Bronze", price: 55, watts: 550 },
      {
        id: "psu-750",
        name: "750W Gold",
        spec: "80+ Gold · Modular",
        price: 95,
        watts: 750,
        popular: true,
      },
      {
        id: "psu-1000",
        name: "1000W Gold",
        spec: "80+ Gold · Fully modular",
        price: 160,
        watts: 1000,
      },
      {
        id: "psu-1200",
        name: "1200W Platinum",
        spec: "80+ Platinum · Fully modular",
        price: 230,
        watts: 1200,
      },
    ],
  },
];

type Selection = Record<CategoryKey, string>;

const PRESETS: { name: string; desc: string; picks: Selection }[] = [
  {
    name: "Starter",
    desc: "1080p gaming",
    picks: {
      cpu: "cpu-lite",
      gpu: "gpu-8",
      ram: "ram-16",
      storage: "ssd-500",
      cooling: "cool-air",
      case: "case-compact",
      psu: "psu-550",
    },
  },
  {
    name: "Pro",
    desc: "1440p gaming",
    picks: {
      cpu: "cpu-pro",
      gpu: "gpu-12",
      ram: "ram-32",
      storage: "ssd-1",
      cooling: "cool-360",
      case: "case-mid",
      psu: "psu-750",
    },
  },
  {
    name: "Ultimate",
    desc: "4K + streaming",
    picks: {
      cpu: "cpu-elite",
      gpu: "gpu-16",
      ram: "ram-64",
      storage: "ssd-2",
      cooling: "cool-360",
      case: "case-full",
      psu: "psu-1000",
    },
  },
];

const METRICS = [
  { label: "Gaming", w: { cpu: 0.25, gpu: 0.6, ram: 0.1, storage: 0.05 } },
  { label: "Streaming", w: { cpu: 0.4, gpu: 0.3, ram: 0.2, storage: 0.1 } },
  { label: "Productivity", w: { cpu: 0.45, gpu: 0.15, ram: 0.25, storage: 0.15 } },
] as const;

const BASE_POWER = 100; // Estimated draw for the motherboard, fans, drives, and other components.
const FINANCE_MONTHS = 12;

/* ===================== Section ===================== */

/** Lets buyers select PC parts and checks basic power and radiator compatibility. */
export default function Configurator() {
  const [selection, setSelection] = useState<Selection>(PRESETS[1].picks);
  const [copied, setCopied] = useState(false);

  const chosen = useMemo(() => {
    const out = {} as Record<CategoryKey, Part>;
    for (const cat of CATEGORIES) {
      out[cat.key] = cat.parts.find((p) => p.id === selection[cat.key]) ?? cat.parts[0];
    }
    return out;
  }, [selection]);

  const total = CATEGORIES.reduce((sum, c) => sum + chosen[c.key].price, 0);
  const monthly = Math.ceil(total / FINANCE_MONTHS);

  const buildItem = {
    id: `build-${Object.values(selection).join("-")}`,
    name: "Custom PC Build",
    price: total,
    variant: `${chosen.cpu.name} · ${chosen.gpu.name} · ${chosen.ram.name}`,
  };

  // Weighted component scores estimate relative performance across common workloads.
  const performance = METRICS.map((m) => {
    const value =
      m.w.cpu * (chosen.cpu.score ?? 0) +
      m.w.gpu * (chosen.gpu.score ?? 0) +
      m.w.ram * (chosen.ram.score ?? 0) +
      m.w.storage * (chosen.storage.score ?? 0);
    return { label: m.label, value: Math.round(value) };
  });

  // Reserve 50% power headroom and round the PSU recommendation up to a 50 W increment.
  const draw = (chosen.cpu.power ?? 0) + (chosen.gpu.power ?? 0) + BASE_POWER;
  const recommendedWatts = Math.ceil((draw * 1.5) / 50) * 50;
  const psuOk = (chosen.psu.watts ?? 0) >= draw * 1.5;
  // A build is compatible only when its radiator fits within the case's stated limit.
  const radiatorOk = (chosen.cooling.radiator ?? 0) <= (chosen.case.maxRadiator ?? 999);

  const warnings: string[] = [];
  if (!psuOk) {
    warnings.push(
      `Power supply too weak. Estimated draw is ${draw}W, we recommend at least ${recommendedWatts}W.`
    );
  }
  if (!radiatorOk) {
    warnings.push(
      `This case supports up to ${chosen.case.maxRadiator}mm radiators, but you picked ${chosen.cooling.radiator}mm cooling.`
    );
  }

  const activePreset = PRESETS.find((p) =>
    CATEGORIES.every((c) => p.picks[c.key] === selection[c.key])
  )?.name;

  const select = (key: CategoryKey, id: string) => setSelection((s) => ({ ...s, [key]: id }));

  const copyConfig = async () => {
    const text = [
      "My PC configuration",
      ...CATEGORIES.map((c) => `${c.title}: ${chosen[c.key].name} (${money(chosen[c.key].price)})`),
      `Total: ${money(total)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access may be unavailable because of browser permissions or context. */
    }
  };

  return (
    <section
      id="configurator"
      aria-labelledby="configurator-title"
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
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* ===================== Section heading ===================== */}
        <div className="mb-8 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            PC Configurator
          </span>
          <h2
            id="configurator-title"
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Build your{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              dream PC
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 lg:mx-0">
            Pick a ready preset or customize every part. We check compatibility and update your
            price and performance live.
          </p>
        </div>

        {/* ===================== Presets ===================== */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {PRESETS.map((p) => {
            const active = activePreset === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelection(p.picks)}
                aria-pressed={active}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                  active
                    ? "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                    : "border-white/5 bg-white/[0.03] hover:border-cyan-400/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold">{p.name}</span>
                  {active && (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-500 text-[#06121a]">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-400">{p.desc}</p>
                <p className="mt-3 text-sm font-bold text-cyan-300">
                  {money(
                    CATEGORIES.reduce(
                      (sum, c) => sum + (c.parts.find((x) => x.id === p.picks[c.key])?.price ?? 0),
                      0
                    )
                  )}
                </p>
              </button>
            );
          })}
        </div>

        {/* ===================== Configuration steps ===================== */}
        <nav
          aria-label="Configuration steps"
          className="sticky top-16 z-30 -mx-4 mb-8 overflow-x-auto border-y border-white/5 bg-[#05090f]/85 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-3"
        >
          <ul className="flex min-w-max items-center gap-1">
            {CATEGORIES.map((c, i) => (
              <li key={c.key}>
                <a
                  href={`#cfg-${c.key}`}
                  className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-cyan-300"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-500/15 text-[10px] font-bold text-cyan-300 transition group-hover:bg-cyan-500 group-hover:text-[#06121a]">
                    {i + 1}
                  </span>
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* ===================== Options ===================== */}
          <div className="space-y-10">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={cat.key} id={`cfg-${cat.key}`} className="scroll-mt-36">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.2)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold">
                        <span className="mr-2 text-cyan-400">{i + 1}.</span>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400">{cat.hint}</p>
                    </div>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label={cat.title}
                    className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {cat.parts.map((part) => {
                      const active = selection[cat.key] === part.id;
                      const current = chosen[cat.key].price;
                      const diff = part.price - current;
                      return (
                        <button
                          key={part.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => select(cat.key, part.id)}
                          className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                            active
                              ? "border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                              : "border-white/5 bg-[#0a1119]/90 hover:border-cyan-400/30"
                          }`}
                        >
                          {part.popular && (
                            <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full border border-orange-400/40 bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-300 backdrop-blur">
                              <Flame className="h-3 w-3" />
                              Popular
                            </span>
                          )}

                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-bold">{part.name}</span>
                            <span
                              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                                active
                                  ? "border-cyan-400 bg-cyan-500 text-[#06121a]"
                                  : "border-white/20 text-transparent group-hover:border-cyan-400/50"
                              }`}
                            >
                              <Check className="h-3 w-3" />
                            </span>
                          </div>

                          <span className="mt-1 text-[11px] leading-relaxed text-slate-400">
                            {part.spec}
                          </span>

                          <div className="mt-4 flex items-end justify-between">
                            <span className="text-lg font-extrabold">{money(part.price)}</span>
                            {!active && (
                              <span
                                className={`text-[11px] font-semibold ${
                                  diff > 0 ? "text-orange-300" : "text-emerald-400"
                                }`}
                              >
                                {diff > 0 ? "+" : "-"}
                                {money(Math.abs(diff))}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================== Summary (desktop) ===================== */}
          <aside className="hidden h-fit lg:sticky lg:top-36 lg:block">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent blur-2xl"
              />
              <div className="space-y-5 rounded-2xl border border-cyan-400/20 bg-[#0a1119]/90 p-5 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-cyan-300">
                  Your build
                </h3>

                <ul className="space-y-2.5">
                  {CATEGORIES.map((c) => (
                    <li key={c.key} className="flex items-start justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          {c.title}
                        </p>
                        <p className="truncate font-semibold text-slate-200">
                          {chosen[c.key].name}
                        </p>
                      </div>
                      <span className="shrink-0 font-bold text-slate-300">
                        {money(chosen[c.key].price)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-white/5 pt-4">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                    Performance
                  </p>
                  {performance.map((m) => (
                    <div key={m.label}>
                      <div className="mb-1 flex justify-between text-[11px]">
                        <span className="text-slate-300">{m.label}</span>
                        <span className="font-bold text-cyan-300">{m.value}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all duration-700 motion-reduce:transition-none"
                          style={{ width: `${m.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-500">
                    Estimated power draw:{" "}
                    <span className="font-semibold text-slate-300">{draw}W</span>
                  </p>
                </div>

                {warnings.length > 0 ? (
                  <ul className="space-y-2" role="alert">
                    {warnings.map((w) => (
                      <li
                        key={w}
                        className="flex gap-2 rounded-lg border border-orange-400/30 bg-orange-500/10 p-2.5 text-[11px] leading-relaxed text-orange-200"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-2.5 text-[11px] text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                    All parts are compatible
                  </p>
                )}

                <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Total</span>
                    <span className="text-2xl font-extrabold">{money(total)}</span>
                  </div>
                  <p className="mt-1 text-right text-[11px] text-slate-500">
                    or {money(monthly)}/mo for {FINANCE_MONTHS} months
                  </p>
                </div>

                <AddToCartButton
                  item={buildItem}
                  disabled={warnings.length > 0}
                  addedContent={<>Added ✓</>}
                  className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-bold text-[#1a0f00] shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                </AddToCartButton>

                <button
                  type="button"
                  onClick={copyConfig}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/30 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/10"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy configuration"}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" /> Free delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> 24m warranty
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ===================== Mobile summary bar ===================== */}
      {/* Sticky positioning confines this summary to the configurator section. */}
      <div className="sticky bottom-0 z-40 border-t border-cyan-400/20 bg-[#070d14]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        {warnings.length > 0 && (
          <p className="mb-2 flex items-center gap-2 text-[11px] text-orange-300" role="alert">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            {warnings[0]}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Total</p>
            <p className="text-xl font-extrabold">{money(total)}</p>
          </div>
          <AddToCartButton
            item={buildItem}
            disabled={warnings.length > 0}
            addedContent={<>Added ✓</>}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-bold text-[#1a0f00] shadow-[0_0_20px_rgba(249,115,22,0.35)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
