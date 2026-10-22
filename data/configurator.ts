import type { ComponentType } from "react";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  MemoryStick,
  Monitor,
  Zap,
} from "lucide-react";

export type CategoryKey = "cpu" | "gpu" | "ram" | "storage" | "cooling" | "case" | "psu";

export type Part = {
  id: string;
  name: string;
  spec: string;
  price: number;
  score?: number;
  power?: number;
  watts?: number;
  radiator?: number;
  maxRadiator?: number;
  popular?: boolean;
};

export type Category = {
  key: CategoryKey;
  title: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
  parts: Part[];
};

export type Selection = Record<CategoryKey, string>;

export const CATEGORIES: Category[] = [
  {
    key: "cpu",
    title: "Processor",
    hint: "The brain of your PC. More cores = faster multitasking.",
    icon: Cpu,
    parts: [
      { id: "cpu-lite", name: "Core Lite 6-Core", spec: "6 cores · 12 threads · 4.6 GHz", price: 180, score: 45, power: 65 },
      { id: "cpu-pro", name: "Core Pro 8-Core", spec: "8 cores · 16 threads · 5.2 GHz", price: 290, score: 70, power: 105, popular: true },
      { id: "cpu-elite", name: "Core Elite 16-Core", spec: "16 cores · 32 threads · 5.7 GHz", price: 520, score: 95, power: 170 },
    ],
  },
  {
    key: "gpu",
    title: "Graphics Card",
    hint: "Decides your FPS and resolution. The most important part for gaming.",
    icon: Monitor,
    parts: [
      { id: "gpu-8", name: "Nova 8GB", spec: "1080p high settings", price: 280, score: 40, power: 160 },
      { id: "gpu-12", name: "Nova Pro 12GB", spec: "1440p high settings", price: 520, score: 65, power: 220, popular: true },
      { id: "gpu-16", name: "Nova Ultra 16GB", spec: "4K ready · Ray tracing", price: 890, score: 85, power: 300 },
      { id: "gpu-24", name: "Nova Max 24GB", spec: "4K ultra · Creator grade", price: 1450, score: 100, power: 400 },
    ],
  },
  {
    key: "ram",
    title: "Memory",
    hint: "More RAM keeps games, streaming and apps smooth together.",
    icon: MemoryStick,
    parts: [
      { id: "ram-16", name: "16GB DDR5", spec: "5600 MHz · 2×8GB", price: 70, score: 45 },
      { id: "ram-32", name: "32GB DDR5", spec: "6000 MHz · 2×16GB", price: 130, score: 75, popular: true },
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
      { id: "ssd-1", name: "1TB NVMe Gen4", spec: "Gen4 · 7,000 MB/s", price: 80, score: 65, popular: true },
      { id: "ssd-2", name: "2TB NVMe Gen4", spec: "Gen4 · 7,400 MB/s", price: 150, score: 85 },
    ],
  },
  {
    key: "cooling",
    title: "Cooling",
    hint: "Keeps temperatures low and noise down under load.",
    icon: Fan,
    parts: [
      { id: "cool-air", name: "Dual Tower Air", spec: "Quiet · No leak risk", price: 40, radiator: 0 },
      { id: "cool-240", name: "240mm Liquid AIO", spec: "Better thermals · RGB pump", price: 95, radiator: 240 },
      { id: "cool-360", name: "360mm Liquid AIO", spec: "Max cooling · Infinity mirror", price: 150, radiator: 360, popular: true },
    ],
  },
  {
    key: "case",
    title: "Case",
    hint: "The look of your build. Tempered glass shows off your parts.",
    icon: Box,
    parts: [
      { id: "case-compact", name: "Compact Mesh", spec: "mATX · High airflow", price: 70, maxRadiator: 240 },
      { id: "case-mid", name: "Mid-Tower Glass RGB", spec: "ATX · Dual glass panels", price: 110, maxRadiator: 360, popular: true },
      { id: "case-full", name: "Full-Tower Panoramic", spec: "E-ATX · Curved glass", price: 180, maxRadiator: 360 },
    ],
  },
  {
    key: "psu",
    title: "Power Supply",
    hint: "Stable power protects your parts. We check the wattage for you.",
    icon: Zap,
    parts: [
      { id: "psu-550", name: "550W Bronze", spec: "80+ Bronze", price: 55, watts: 550 },
      { id: "psu-750", name: "750W Gold", spec: "80+ Gold · Modular", price: 95, watts: 750, popular: true },
      { id: "psu-1000", name: "1000W Gold", spec: "80+ Gold · Fully modular", price: 160, watts: 1000 },
      { id: "psu-1200", name: "1200W Platinum", spec: "80+ Platinum · Fully modular", price: 230, watts: 1200 },
    ],
  },
];

export const PRESETS: { name: string; desc: string; picks: Selection }[] = [
  {
    name: "Starter",
    desc: "1080p gaming",
    picks: { cpu: "cpu-lite", gpu: "gpu-8", ram: "ram-16", storage: "ssd-500", cooling: "cool-air", case: "case-compact", psu: "psu-550" },
  },
  {
    name: "Pro",
    desc: "1440p gaming",
    picks: { cpu: "cpu-pro", gpu: "gpu-12", ram: "ram-32", storage: "ssd-1", cooling: "cool-360", case: "case-mid", psu: "psu-750" },
  },
  {
    name: "Ultimate",
    desc: "4K + streaming",
    picks: { cpu: "cpu-elite", gpu: "gpu-16", ram: "ram-64", storage: "ssd-2", cooling: "cool-360", case: "case-full", psu: "psu-1000" },
  },
];

export const METRICS = [
  { label: "Gaming", w: { cpu: 0.25, gpu: 0.6, ram: 0.1, storage: 0.05 } },
  { label: "Streaming", w: { cpu: 0.4, gpu: 0.3, ram: 0.2, storage: 0.1 } },
  { label: "Productivity", w: { cpu: 0.45, gpu: 0.15, ram: 0.25, storage: 0.15 } },
] as const;

export const BASE_POWER = 100;
