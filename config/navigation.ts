import type { ComponentType } from "react";
import {
  BookOpen,
  Headphones,
  Home,
  Keyboard,
  Layers,
  LayoutGrid,
  MessageCircle,
  Monitor,
  Mouse,
  Settings,
  Sparkles,
} from "lucide-react";

export type ShopCategoryKey = "All" | "Audio" | "Monitors" | "Mice" | "Keyboards";

export type NavItem = {
  label: string;
  id: string;
  icon: ComponentType<{ className?: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home", icon: Home },
  { label: "Settings", id: "configurator", icon: Settings },
  { label: "Sections", id: "sections", icon: Layers },
  { label: "Blog", id: "blog", icon: BookOpen },
  { label: "Offers", id: "offers", icon: Sparkles },
  { label: "Contact", id: "contact", icon: MessageCircle },
];

export const SHOP_CATEGORIES: {
  key: ShopCategoryKey;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { key: "All", label: "All products", description: "Browse the full catalog", icon: LayoutGrid },
  { key: "Audio", label: "Audio", description: "Headsets and speakers", icon: Headphones },
  { key: "Monitors", label: "Monitors", description: "High refresh displays", icon: Monitor },
  { key: "Mice", label: "Mice", description: "Precision gaming mice", icon: Mouse },
  { key: "Keyboards", label: "Keyboards", description: "Mechanical and RGB", icon: Keyboard },
];

export const COMPANY_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Sections", href: "/#sections" },
  { label: "PC Configurator", href: "/#configurator" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export const SERVICE_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Shipping Info", href: "/legal/shipping" },
  { label: "Returns & Refunds", href: "/legal/returns" },
  { label: "Warranty", href: "/legal/warranty" },
];

export const BOTTOM_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#sections" },
  { label: "Builder", href: "/#configurator" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact us", href: "/#contact" },
];
