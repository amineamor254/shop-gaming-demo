"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PROMOS, type PromoCode } from "@/data/promos";

/* ===================== Types ===================== */

export type CartItem = {
  id: string; // Unique product or configuration identifier.
  name: string;
  price: number;
  oldPrice?: number;
  image?: string; // For example, "/images/products/elite-audio.png".
  variant?: string; // Optional color, size, or configuration details.
  qty: number;
};

export type NewCartItem = Omit<CartItem, "qty">;

export type Promo = { code: string; percent: number };

type CartContextValue = {
  items: CartItem[];
  count: number; // Total quantity across all items.
  subtotal: number;
  savings: number; // Savings compared with original prices.
  promo: Promo | null; // Applied discount code, shared by the cart and checkout.
  hydrated: boolean; // True after saved cart data has been loaded.
  addItem: (item: NewCartItem, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  setPromo: (promo: Promo | null) => void;
  clear: () => void; // Clears the cart and applied promo code.
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

// Accept persisted promo data only when its code and percentage match the current catalog.
function isValidPromo(x: unknown): x is Promo {
  if (typeof x !== "object" || x === null) return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.code === "string" &&
    typeof p.percent === "number" &&
    PROMOS[p.code as PromoCode] === p.percent
  );
}

/* ===================== Context ===================== */

const CartContext = createContext<CartContextValue | null>(null);

/** Provides cart state, persistence, and cross-tab synchronization to its children. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromoState] = useState<Promo | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Defer storage reads until after the first render to keep server and client markup consistent.
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
        /* Ignore malformed saved data and let the cart start empty. */
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Wait for storage hydration before writing so the initial empty state cannot overwrite saved data.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Storage may be unavailable or disabled by the browser. */
    }
  }, [items, hydrated]);

  // Keep the applied promo available when the buyer moves between cart and checkout.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (promo) localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
      else localStorage.removeItem(PROMO_KEY);
    } catch {
      /* Storage may be unavailable or disabled by the browser. */
    }
  }, [promo, hydrated]);

  // The browser storage event keeps other open tabs in sync with cart and promo changes.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed: unknown = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setItems(parsed.filter(isValidItem));
          }
        } catch {
          /* Ignore malformed updates from another tab. */
        }
      }
      if (e.key === PROMO_KEY) {
        try {
          const parsed: unknown = e.newValue ? JSON.parse(e.newValue) : null;
          setPromoState(isValidPromo(parsed) ? parsed : null);
        } catch {
          /* Ignore malformed promo updates from another tab. */
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
        return prev.map((i) => (i.id === item.id ? { ...i, qty: clampQty(i.qty + qty) } : i));
      }
      return [...prev, { ...item, qty: clampQty(qty) }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i)));
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

/** Returns the shared cart state and throws when called outside CartProvider. */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
