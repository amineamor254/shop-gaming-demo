"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { MAX_QTY, useCart, type CartItem } from "@/components/Cart/CartContext";
import { formatCartMoney as money } from "@/lib/format";
import {
  FREE_SHIPPING_MIN,
  TAX_RATE,
  calcTotals,
} from "@/components/Cart/cart-config";
import { PROMOS, type PromoCode } from "@/data/promos";

/* ===================== Page ===================== */

/** Renders cart contents, promo controls, and the shared order summary. */
export default function CartPage() {
  const { items, count, subtotal, savings, promo, setPromo, hydrated, clear } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );
  const [confirmClear, setConfirmClear] = useState(false);

  // Use standard shipping as an estimate; buyers choose the final method at checkout.
  const { discount, afterDiscount, shipping, tax, total } = calcTotals({
    subtotal,
    promoPercent: promo?.percent ?? 0,
    hasItems: items.length > 0,
  });
  const remainingForFree = Math.max(0, FREE_SHIPPING_MIN - afterDiscount);
  const progress = Math.min(100, (afterDiscount / FREE_SHIPPING_MIN) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const percent = PROMOS[code as PromoCode];
    if (percent) {
      setPromo({ code, percent });
      setPromoMsg({ type: "success", text: `Code ${code} applied: ${percent}% off.` });
      setPromoInput("");
    } else {
      setPromoMsg({ type: "error", text: "Invalid promo code." });
    }
  };

  const removePromo = () => {
    setPromo(null);
    setPromoMsg(null);
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clear();
    setPromoMsg(null);
    setConfirmClear(false);
  };

  return (
    <main className="relative isolate min-h-[70vh] overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
      {/* ===================== Background ===================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-primary-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-primary-400) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[380px] w-[380px] rounded-full bg-brand-primary-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[340px] w-[340px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        {/* ===================== Breadcrumb and title ===================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-2 text-xs text-slate-400 lg:justify-start"
        >
          <Link
            href="/#home"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-primary-300"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span aria-current="page" className="font-semibold text-brand-primary-300">
            Cart
          </span>
        </nav>

        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Shopping{" "}
            <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              Cart
            </span>
          </h1>
        </div>

        {/* ===================== Loading before saved cart data is available ===================== */}
        {!hydrated ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]" aria-busy="true">
            <div className="space-y-3 rounded-2xl border border-white/5 bg-[#0a1119]/90 p-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-xl bg-white/[0.04] motion-reduce:animate-none"
                />
              ))}
            </div>
            <div className="h-72 animate-pulse rounded-2xl bg-white/[0.04] motion-reduce:animate-none" />
          </div>
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* ===================== Items ===================== */}
            <section
              aria-label="Cart items"
              className="h-fit overflow-hidden rounded-2xl border border-brand-primary-400/15 bg-[#0a1119]/90 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_8%,transparent)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
                <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-primary-300">
                  <span className="h-px w-3 bg-brand-primary-400/60" />
                  Your items
                  <span className="rounded-full bg-brand-primary-500/15 px-2 py-0.5 text-[10px] text-brand-primary-200">
                    {count}
                  </span>
                </h2>

                <button
                  type="button"
                  onClick={handleClear}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
                    confirmClear
                      ? "border-red-400/60 bg-red-500/15 text-red-300"
                      : "border-white/10 text-slate-400 hover:border-pink-400/50 hover:text-pink-400"
                  }`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {confirmClear ? "Click again to confirm" : "Clear cart"}
                </button>
              </div>

              <ul className="divide-y divide-white/5">
                {items.map((item) => (
                  <CartRow key={item.id} item={item} />
                ))}
              </ul>

              <div className="border-t border-white/5 px-4 py-3">
                <Link
                  href="/#sections"
                  className="group inline-flex items-center gap-2 text-xs font-semibold text-brand-primary-300 transition-colors hover:text-brand-primary-200"
                >
                  <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                  Continue shopping
                </Link>
              </div>
            </section>

            {/* ===================== Summary ===================== */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-primary-500/20 via-emerald-500/10 to-transparent blur-2xl"
                />

                <div className="space-y-5 rounded-2xl border border-brand-primary-400/20 bg-[#0a1119]/90 p-5 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_15%,transparent)] backdrop-blur">
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-brand-primary-300">
                    Order summary
                  </h2>

                  {/* ===================== Free shipping progress ===================== */}
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-[11px] text-slate-300">
                      <Truck className="h-3.5 w-3.5 text-brand-primary-400" />
                      {remainingForFree > 0 ? (
                        <>
                          Add{" "}
                          <span className="font-bold text-brand-primary-300">{money(remainingForFree)}</span>{" "}
                          more for free shipping
                        </>
                      ) : (
                        <span className="font-semibold text-emerald-300">
                          You get free shipping!
                        </span>
                      )}
                    </p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-primary-400 to-sky-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-primary-400)_60%,transparent)] transition-all duration-700 motion-reduce:transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* ===================== Promo code ===================== */}
                  <div>
                    {promo ? (
                      <div className="flex items-center justify-between rounded-lg border border-dashed border-emerald-400/50 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                        <span className="flex items-center gap-2 font-bold tracking-wider">
                          <Tag className="h-3.5 w-3.5" />
                          {promo.code} · -{promo.percent}%
                        </span>
                        <button
                          type="button"
                          onClick={removePromo}
                          aria-label="Remove promo code"
                          className="grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-white/10"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={applyPromo} className="flex gap-2">
                        <label htmlFor="promo" className="sr-only">
                          Promo code
                        </label>
                        <input
                          id="promo"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            if (promoMsg) setPromoMsg(null);
                          }}
                          placeholder="Promo code"
                          className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-black/40 px-3 text-xs uppercase text-white outline-none transition placeholder:normal-case placeholder:text-slate-500 focus:border-brand-primary-400/60 focus:shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-500)_30%,transparent)]"
                        />
                        <button
                          type="submit"
                          className="rounded-lg border border-brand-primary-400/30 px-4 text-xs font-semibold text-brand-primary-300 transition-all duration-300 hover:bg-brand-primary-400/10"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    <p
                      role="status"
                      aria-live="polite"
                      className={`mt-1.5 min-h-4 text-[11px] ${
                        promoMsg?.type === "error" ? "text-red-300" : "text-emerald-300"
                      }`}
                    >
                      {promoMsg?.text}
                    </p>
                  </div>

                  {/* ===================== Totals ===================== */}
                  <dl className="space-y-2.5 border-t border-white/5 pt-4 text-xs">
                    <Row label="Subtotal" value={money(subtotal)} />
                    {savings > 0 && (
                      <Row
                        label="You save"
                        value={`-${money(savings)}`}
                        valueClass="text-emerald-300"
                      />
                    )}
                    {promo && (
                      <Row
                        label={`Promo (${promo.code})`}
                        value={`-${money(discount)}`}
                        valueClass="text-emerald-300"
                      />
                    )}
                    <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
                    <Row label={`Taxes (${Math.round(TAX_RATE * 100)}%)`} value={money(tax)} />
                  </dl>

                  <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                    <div className="flex items-baseline justify-between" aria-live="polite">
                      <span className="text-xs text-slate-400">Total</span>
                      <span className="text-2xl font-extrabold">{money(total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-primary-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95"
                  >
                    <span className="relative z-10">Proceed to checkout</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  </Link>

                  {/* ===================== Store policies ===================== */}
                  <ul className="space-y-2 text-[11px] text-slate-400">
                    {[
                      {
                        icon: Truck,
                        text: `Free delivery on orders over ${money(FREE_SHIPPING_MIN)}`,
                      },
                      { icon: ShieldCheck, text: "24 months warranty on all builds" },
                      { icon: RotateCcw, text: "30-day easy returns" },
                    ].map(({ icon: Icon, text }) => (
                      <li
                        key={text}
                        className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-brand-primary-400" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

/* ===================== Sub components ===================== */

function Row({
  label,
  value,
  valueClass = "text-slate-200",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-400">{label}</dt>
      <dd className={`font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart();
  const lineTotal = item.price * item.qty;

  return (
    <li className="group flex flex-wrap items-center gap-4 p-4 transition-colors duration-300 hover:bg-white/[0.02] sm:flex-nowrap">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0d1824] to-[#070d14]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="64px"
            className="object-contain p-1.5"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Package className="h-7 w-7 text-brand-primary-400/80 drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-primary-400)_50%,transparent)]" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 basis-40">
        <h3 className="truncate text-sm font-bold transition-colors group-hover:text-brand-primary-300">
          {item.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-brand-primary-300">{money(item.price)}</span>
          {item.oldPrice && item.oldPrice > item.price && (
            <span className="text-xs text-slate-500 line-through">{money(item.oldPrice)}</span>
          )}
        </div>
        {item.variant && <p className="mt-1 truncate text-[11px] text-slate-500">{item.variant}</p>}
      </div>

      <div
        role="group"
        aria-label={`Quantity for ${item.name}`}
        className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-black/40"
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={item.qty <= 1}
          onClick={() => updateQty(item.id, item.qty - 1)}
          className="grid h-9 w-9 place-items-center text-slate-300 transition-colors hover:bg-brand-primary-400/10 hover:text-brand-primary-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-300"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <input
          key={item.qty}
          type="text"
          inputMode="numeric"
          aria-label="Quantity"
          defaultValue={item.qty}
          onBlur={(e) => {
            const n = parseInt(e.target.value, 10);
            if (Number.isNaN(n)) {
              e.target.value = String(item.qty);
              return;
            }
            updateQty(item.id, n);
            e.target.value = String(Math.min(MAX_QTY, Math.max(1, n)));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          className="h-9 w-11 border-x border-white/10 bg-transparent text-center text-xs font-bold text-white outline-none focus:bg-brand-primary-400/5"
        />

        <button
          type="button"
          aria-label="Increase quantity"
          disabled={item.qty >= MAX_QTY}
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="grid h-9 w-9 place-items-center text-slate-300 transition-colors hover:bg-brand-primary-400/10 hover:text-brand-primary-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-300"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="w-24 text-right">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">Total</p>
        <p className="text-sm font-extrabold">{money(lineTotal)}</p>
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => removeItem(item.id)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition-all duration-300 hover:border-pink-400/50 hover:text-pink-400 hover:shadow-[0_0_14px_rgba(244,114,182,0.35)]"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
}

function EmptyCart() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-primary-500/15 via-emerald-500/5 to-transparent blur-2xl"
      />
      <div className="rounded-3xl border border-brand-primary-400/20 bg-[#0a1119]/90 px-6 py-14 text-center shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_12%,transparent)] backdrop-blur">
        <div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center">
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse rounded-full border border-brand-primary-400/30 motion-reduce:animate-none"
          />
          <span aria-hidden className="absolute inset-3 rounded-full bg-brand-primary-400/10 blur-xl" />
          <ShoppingCart className="relative h-10 w-10 text-brand-primary-300 drop-shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-400)_60%,transparent)]" />
        </div>

        <h2 className="text-xl font-extrabold">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-400">
          Looks like you have not added anything yet. Explore our gear or build your own custom PC.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#sections"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-primary-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95"
          >
            <span className="relative z-10">Browse products</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/#configurator"
            className="inline-flex items-center rounded-full border border-brand-primary-400/40 px-6 py-3 text-sm font-semibold text-brand-primary-300 transition-all duration-300 hover:border-brand-primary-300 hover:bg-brand-primary-400/10 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-primary-400)_25%,transparent)]"
          >
            Build your PC
          </Link>
        </div>
      </div>
    </div>
  );
}
