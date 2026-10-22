import type { ComponentType } from "react";
import {
  Gift,
  RefreshCw,
  ShieldCheck,
  Truck,
  Undo2,
  Zap,
} from "lucide-react";

export const FLASH_SALE_END = "2026-12-31T23:59:59";

export const FLASH_SALE = {
  tag: "Flash sale",
  title: "Up to 30% off",
  highlight: "Pro builds",
  text: "Limited-time prices on our best-selling custom gaming PCs. Free delivery and 24 months warranty included.",
  discount: "-30%",
};

export type Offer = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  badge: string;
  title: string;
  text: string;
  code?: string;
  note?: string;
};

export const OFFERS: Offer[] = [
  {
    id: "bundle",
    icon: Gift,
    badge: "Save 15%",
    title: "Starter Bundle",
    text: "Get a gaming PC with a keyboard, mouse and headset at a special bundle price.",
    code: "BUNDLE15",
  },
  {
    id: "upgrade",
    icon: Zap,
    badge: "Free upgrade",
    title: "Memory Upgrade",
    text: "Upgrade from 16GB to 32GB DDR5 on any Pro or Ultimate build at no extra cost.",
    note: "No code needed. Choose a Pro or Ultimate build in the configurator.",
  },
  {
    id: "tradein",
    icon: RefreshCw,
    badge: "Up to $200",
    title: "Trade-in Bonus",
    text: "Trade your old graphics card and get instant credit towards your new build.",
    note: "No code needed. Contact our team to claim your credit.",
  },
];

export const PERKS = [
  { icon: Truck, title: "Free delivery", text: "On every custom build" },
  { icon: ShieldCheck, title: "24 months warranty", text: "Full parts and labour" },
  { icon: Undo2, title: "30-day returns", text: "No questions asked" },
];
