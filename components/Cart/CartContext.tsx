"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PROMOS } from "./cart-config";

/* ===================== Types ===================== */

export type CartItem = {
  id: string; // معرّف فريد للمنتج (أو للتركيبة)
  name: string;
  price: number;
  oldPrice?: number;
  image?: string; // مثال: "/images/products/elite-audio.png"
  variant?: string; // لون، حجم، تفاصيل التركيبة...
  qty: number;
};

export type NewCartItem = Omit<CartItem, "qty">;

export type Promo = { code: string; percent: number };

type CartContextValue = {
  items: CartItem[];
  count: number; // مجموع الكميات
  subtotal: number;
  savings: number; // التوفير مقارنة بالأسعار القديمة
  promo: Promo | null; // كود الخصم المطبَّق (يبقى بين السلة والدفع)
  hydrated: boolean; // تم تحميل السلة من التخزين
  addItem: (item: NewCartItem, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  setPromo: (promo: Promo | null) => void;
  clear: () => void; // يفرّغ السلة ويزيل الكود
};

/* ===================== Config ===================== */

const STORAGE_KEY = "cart-v1";
const PROMO_KEY = "cart-promo-v1";
export const MAX_QTY = 99;

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n)));

function isValidItem(x: unknown): x is CartItem {
  if (typeof x !== "object" || x === null) return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.price === "number" &&
    typeof i.qty === "number" &&
    i.qty >= 1
  );
}

// نقبل الكود فقط إذا كان موجوداً فعلاً بنفس النسبة
function isValidPromo(x: unknown): x is Promo {
  if (typeof x !== "object" || x === null) return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.code === "string" &&
    typeof p.percent === "number" &&
    PROMOS[p.code] === p.percent
  );
}

/* ===================== Context ===================== */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromoState] = useState<Promo | null>(null);
  const [hydrated, setHydrated] = useState(false);

// تحميل السلة والكود من المتصفح مرة واحدة
useEffect(() => {
  const timeoutId = window.setTimeout(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed: unknown = JSON.parse(raw);

        if (Array.isArray(parsed)) {
          setItems(parsed.filter(isValidItem));
        }
      }

      const rawPromo = localStorage.getItem(PROMO_KEY);

      if (rawPromo) {
        const parsedPromo: unknown = JSON.parse(rawPromo);

        if (isValidPromo(parsedPromo)) {
          setPromoState(parsedPromo);
        }
      }
    } catch {
      /* تجاهل بيانات تالفة */
    } finally {
      setHydrated(true);
    }
  }, 0);

  return () => window.clearTimeout(timeoutId);
}, []);

  // حفظ السلة عند كل تغيير
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* التخزين قد يكون ممنوعاً */
    }
  }, [items, hydrated]);

  // حفظ كود الخصم
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (promo) localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
      else localStorage.removeItem(PROMO_KEY);
    } catch {
      /* تجاهل */
    }
  }, [promo, hydrated]);

  // مزامنة السلة بين تبويبات المتصفح
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed: unknown = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
  setItems(parsed.filter(isValidItem));
}
        } catch {
          /* تجاهل */
        }
      }
      if (e.key === PROMO_KEY) {
        try {
          const parsed: unknown = e.newValue ? JSON.parse(e.newValue) : null;
          setPromoState(isValidPromo(parsed) ? parsed : null);
        } catch {
          /* تجاهل */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((item: NewCartItem, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: clampQty(i.qty + qty) } : i
        );
      }
      return [...prev, { ...item, qty: clampQty(qty) }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setPromo = useCallback((p: Promo | null) => setPromoState(p), []);

  const clear = useCallback(() => {
    setItems([]);
    setPromoState(null);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const savings = items.reduce(
      (sum, i) => sum + (i.oldPrice && i.oldPrice > i.price ? (i.oldPrice - i.price) * i.qty : 0),
      0
    );
    return {
      items,
      count,
      subtotal,
      savings,
      promo,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      setPromo,
      clear,
    };
  }, [items, promo, hydrated, addItem, updateQty, removeItem, setPromo, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}