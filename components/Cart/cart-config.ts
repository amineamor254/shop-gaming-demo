/**
 * Centralizes the values and calculations shared by the cart and checkout.
 */

/* ===================== Store configuration ===================== */

export const TAX_RATE = 0.1; // Set to 0 when listed prices already include tax.
export const FREE_SHIPPING_MIN = 100; // Standard shipping is free at or above this subtotal.
export const FLAT_SHIPPING = 9;

export type ShippingId = "standard" | "express";

export const SHIPPING_METHODS: {
  id: ShippingId;
  label: string;
  eta: string;
}[] = [
  { id: "standard", label: "Standard delivery", eta: "3-5 business days" },
  { id: "express", label: "Express delivery", eta: "1-2 business days" },
];

export const EXPRESS_SHIPPING = 19;

export const COUNTRIES = [
  "Tunisia",
  "France",
  "Germany",
  "Italy",
  "Romania",
  "Spain",
  "United Kingdom",
  "United States",
];

/* ===================== Helpers ===================== */

/** Calculates shipping from the selected method and discounted subtotal. */
export function shippingCost(id: ShippingId, afterDiscount: number) {
  if (id === "express") return EXPRESS_SHIPPING;
  return afterDiscount >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;
}

/** Calculates discount, shipping, tax, and total consistently for cart and checkout. */
export function calcTotals({
  subtotal,
  promoPercent = 0,
  shippingId = "standard",
  hasItems = true,
}: {
  subtotal: number;
  promoPercent?: number;
  shippingId?: ShippingId;
  hasItems?: boolean;
}) {
  const discount = (subtotal * promoPercent) / 100;
  const afterDiscount = subtotal - discount;
  const shipping = hasItems ? shippingCost(shippingId, afterDiscount) : 0;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + shipping + tax;
  return { discount, afterDiscount, shipping, tax, total };
}
