import type { ComponentType } from "react";
import { Headphones, Keyboard, LayoutGrid, Monitor, Mouse } from "lucide-react";

/**
 * فئات المتجر + وسيلة بسيطة لإرسال الفئة من قائمة Shop (في الـ Header)
 * إلى قسم Sections حتى يطبّق الفلتر تلقائياً.
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

/** يُستدعى من الـ Header عند اختيار فئة */
export function requestCategory(category: ShopCategoryKey) {
  if (typeof window === "undefined") return;
  try {
    // نحفظها أيضاً ليقرأها قسم Sections إن لم يكن معروضاً بعد (مثلاً عند القدوم من /cart)
    sessionStorage.setItem(STORAGE_KEY, category);
  } catch {
    /* التخزين قد يكون ممنوعاً */
  }
  window.dispatchEvent(new CustomEvent(SHOP_EVENT, { detail: category }));
}

/** يقرأ الفئة المطلوبة (إن وُجدت) ثم يمسحها */
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
