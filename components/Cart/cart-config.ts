/**
 * إعدادات السلة والدفع في مكان واحد.
 * يستخدمها: CartContext و صفحة السلة و صفحة Checkout.
 */

/* ===================== Config (عدّلها لمتجرك) ===================== */

export const TAX_RATE = 0.1; // 10% (ضع 0 إن كانت الأسعار شاملة الضريبة)
export const FREE_SHIPPING_MIN = 100; // الشحن العادي مجاني فوق هذا المبلغ
export const FLAT_SHIPPING = 9;

// أكواد الخصم (نفس أكواد قسم Offers). القيمة = نسبة الخصم
export const PROMOS: Record<string, number> = {
  FLASH25: 25,
  BUNDLE20: 20,
  STUDENT10: 10,
};

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

export const money = (n: number) => `$${n.toFixed(2)}`;

/** تكلفة الشحن حسب الطريقة والمبلغ بعد الخصم */
export function shippingCost(id: ShippingId, afterDiscount: number) {
  if (id === "express") return EXPRESS_SHIPPING;
  return afterDiscount >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;
}

/** حساب كل المبالغ من مكان واحد حتى تتطابق السلة مع Checkout */
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