import type { ComponentType } from "react";
import { Headphones, Keyboard, LayoutGrid, Monitor, Mouse } from "lucide-react";

/**
 * Defines shop categories and communicates the selected category to the product section.
 */

export type ShopCategoryKey = "All" | "Audio" | "Monitors" | "Mice" | "Keyboards";

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

export const SHOP_EVENT = "shop:category";
const STORAGE_KEY = "shop-category";

/**
 * Requests a category from the header or another page.
 * Stores it as well as dispatching an event so the product section can consume it after mounting.
 */
export function requestCategory(category: ShopCategoryKey) {
  if (typeof window === "undefined") return;
  try {
    // Keep the selection when the product section is not mounted yet, such as after leaving the cart.
    sessionStorage.setItem(STORAGE_KEY, category);
  } catch {
    /* التخزين قد يكون ممنوعاً */
  }
  window.dispatchEvent(new CustomEvent(SHOP_EVENT, { detail: category }));
}

/** Returns and clears a pending category selection saved for a later page render. */
export function consumeRequestedCategory(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return value;
  } catch {
    return null;
  }
}
