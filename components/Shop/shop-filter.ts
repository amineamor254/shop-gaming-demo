/**
 * Defines shop categories and communicates the selected category to the product section.
 */

import type { ShopCategoryKey } from "@/config/navigation";

export type { ShopCategoryKey } from "@/config/navigation";

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
    /* Session storage may be unavailable or disabled by the browser. */
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
