"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Home,
  Mail,
  MapPin,
  Package,
  ShoppingCart,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { useCart, type CartItem } from "@/components/Cart/CartContext";
import { formatCartMoney as money } from "@/lib/format";
import {
  COUNTRIES,
  SHIPPING_METHODS,
  calcTotals,
  shippingCost,
  type ShippingId,
} from "@/components/Cart/cart-config";

/* ===================== Types ===================== */

type PaymentId = "card" | "cod";

type Values = {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
  terms: boolean;
};

type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

type Order = {
  id: string;
  email: string;
  items: CartItem[];
  totals: ReturnType<typeof calcTotals>;
  promoCode?: string;
  shippingId: ShippingId;
  payment: PaymentId;
  address: string;
};

const INITIAL: Values = {
  email: "",
  phone: "",
  fullName: "",
  address: "",
  city: "",
  postal: "",
  country: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
  terms: false,
};

// Keep this order aligned with the form so focus moves to the first invalid field.
const FIELD_ORDER: FieldKey[] = [
  "email",
  "phone",
  "fullName",
  "address",
  "city",
  "postal",
  "country",
  "cardNumber",
  "cardName",
  "expiry",
  "cvc",
  "terms",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ===================== Validation ===================== */

// The Luhn checksum catches common card-number typos; valid test numbers pass.
// For example, 4242 4242 4242 4242 passes this checksum.
function luhn(num: string) {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// Normalize common input mistakes while formatting expiry dates as MM/YY.
function formatExpiry(raw: string) {
  let d = raw.replace(/\D/g, "").slice(0, 6);

  // Prefix a zero when the first digit or two-digit month is outside the usual month range.
  if (d.length >= 1 && Number(d[0]) > 1) d = "0" + d;
  else if (d.length >= 2 && Number(d.slice(0, 2)) > 12) d = "0" + d;

  // Convert four-digit years such as 12/2028 to the displayed two-digit form, 12/28.
  if (d.length > 4 && d.slice(2, 4) === "20") d = d.slice(0, 2) + d.slice(4);

  d = d.slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function validate(v: Values, payment: PaymentId): Errors {
  const e: Errors = {};

  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";

  const phoneDigits = v.phone.replace(/\D/g, "");
  if (phoneDigits.length < 6 || phoneDigits.length > 15)
    e.phone = "Please enter a valid phone number.";

  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (v.address.trim().length < 5) e.address = "Please enter your street address.";
  if (v.city.trim().length < 2) e.city = "Please enter your city.";
  if (v.postal.trim().length < 3) e.postal = "Please enter your postal code.";
  if (!v.country) e.country = "Please select your country.";

  if (payment === "card") {
    const digits = v.cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19 || !luhn(digits)) {
      e.cardNumber = "Please enter a valid card number.";
    }
    if (v.cardName.trim().length < 2) e.cardName = "Please enter the name on the card.";

    const m = /^(\d{2})\/(\d{2})$/.exec(v.expiry);
    if (!m) {
      e.expiry = "Use the format MM/YY.";
    } else {
      const month = Number(m[1]);
      const year = 2000 + Number(m[2]);
      if (month < 1 || month > 12) e.expiry = "Month must be between 01 and 12.";
      else if (new Date(year, month, 1) <= new Date()) e.expiry = "This card has expired.";
    }

    if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = "Enter the 3 or 4 digit code.";
  }

  if (!v.terms) e.terms = "You must accept the terms to continue.";

  return e;
}

/* ===================== Page ===================== */

/** Validates checkout details, calculates totals, and presents the order confirmation state. */
export default function CheckoutPage() {
  const { items, count, subtotal, promo, hydrated, clear } = useCart();

  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [delivery, setDelivery] = useState<ShippingId>("standard");
  const [payment, setPayment] = useState<PaymentId>("card");
  const [status, setStatus] = useState<"idle" | "placing" | "failed">("idle");
  const [order, setOrder] = useState<Order | null>(null);

  const totals = calcTotals({
    subtotal,
    promoPercent: promo?.percent ?? 0,
    shippingId: delivery,
    hasItems: items.length > 0,
  });

  const setField = <K extends FieldKey>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "failed") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "placing") return;

    const found = validate(values, payment);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }

    setStatus("placing");
    try {
      // TODO: Connect a server-side order endpoint and secure payment-provider fields, such as Stripe Elements.
      // Never send raw card numbers directly to your server; use the provider's secure card fields.
      // TODO: Replace this simulated delay with the real order and payment request.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const id = `ORD-${crypto.randomUUID().replace(/-/g, "").slice(0, 9).toUpperCase()}`;

      setOrder({
        id,
        email: values.email.trim(),
        items: [...items],
        totals,
        promoCode: promo?.code,
        shippingId: delivery,
        payment,
        address: `${values.fullName.trim()}, ${values.address.trim()}, ${values.postal.trim()} ${values.city.trim()}, ${values.country}`,
      });
      clear();
      setStatus("idle");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <main className="relative isolate min-h-[70vh] overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
      {/* ===================== Background ===================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[340px] w-[340px] rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        {/* ===================== Breadcrumb and title ===================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 lg:justify-start"
        >
          <Link
            href="/#home"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-300"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/cart" className="transition-colors hover:text-cyan-300">
            Cart
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span aria-current="page" className="font-semibold text-cyan-300">
            Checkout
          </span>
        </nav>

        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Secure{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              Checkout
            </span>
          </h1>
        </div>

        {/* ===================== Checkout states ===================== */}
        {/* Wait for persisted cart data before deciding whether to show checkout or an empty-cart state. */}
        {!hydrated ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]" aria-busy="true">
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-2xl bg-white/[0.04] motion-reduce:animate-none"
                />
              ))}
            </div>
            <div className="h-80 animate-pulse rounded-2xl bg-white/[0.04] motion-reduce:animate-none" />
          </div>
        ) : order ? (
          <OrderSuccess order={order} />
        ) : items.length === 0 ? (
          <EmptyCheckout />
        ) : (
          <form
            id="checkout-form"
            onSubmit={onSubmit}
            noValidate
            className="grid gap-6 lg:grid-cols-[1fr_380px]"
          >
            {/* ===================== Steps ===================== */}
            <div className="space-y-6">
              <StepCard step={1} title="Contact" icon={Mail}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" id="co-email" error={errors.email}>
                    <input
                      id="co-email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "co-email-error" : undefined}
                      placeholder="you@example.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                  <Field label="Phone" id="co-phone" error={errors.phone}>
                    <input
                      id="co-phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "co-phone-error" : undefined}
                      placeholder="+000 123 456 789"
                      className={inputClass(!!errors.phone)}
                    />
                  </Field>
                </div>
              </StepCard>

              <StepCard step={2} title="Shipping address" icon={MapPin}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Full name" id="co-fullName" error={errors.fullName}>
                      <input
                        id="co-fullName"
                        type="text"
                        autoComplete="name"
                        value={values.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "co-fullName-error" : undefined}
                        placeholder="John Doe"
                        className={inputClass(!!errors.fullName)}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Street address" id="co-address" error={errors.address}>
                      <input
                        id="co-address"
                        type="text"
                        autoComplete="street-address"
                        value={values.address}
                        onChange={(e) => setField("address", e.target.value)}
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? "co-address-error" : undefined}
                        placeholder="123 Gaming Street"
                        className={inputClass(!!errors.address)}
                      />
                    </Field>
                  </div>
                  <Field label="City" id="co-city" error={errors.city}>
                    <input
                      id="co-city"
                      type="text"
                      autoComplete="address-level2"
                      value={values.city}
                      onChange={(e) => setField("city", e.target.value)}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "co-city-error" : undefined}
                      className={inputClass(!!errors.city)}
                    />
                  </Field>
                  <Field label="Postal code" id="co-postal" error={errors.postal}>
                    <input
                      id="co-postal"
                      type="text"
                      autoComplete="postal-code"
                      value={values.postal}
                      onChange={(e) => setField("postal", e.target.value)}
                      aria-invalid={!!errors.postal}
                      aria-describedby={errors.postal ? "co-postal-error" : undefined}
                      className={inputClass(!!errors.postal)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Country" id="co-country" error={errors.country}>
                      <select
                        id="co-country"
                        autoComplete="country-name"
                        value={values.country}
                        onChange={(e) => setField("country", e.target.value)}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? "co-country-error" : undefined}
                        className={inputClass(!!errors.country)}
                      >
                        <option value="">Select a country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
              </StepCard>

              <StepCard step={3} title="Delivery method" icon={Truck}>
                <div
                  role="radiogroup"
                  aria-label="Delivery method"
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {SHIPPING_METHODS.map((m) => {
                    const cost = shippingCost(m.id, totals.afterDiscount);
                    return (
                      <RadioCard
                        key={m.id}
                        checked={delivery === m.id}
                        onSelect={() => setDelivery(m.id)}
                        icon={m.id === "express" ? Zap : Truck}
                        title={m.label}
                        subtitle={m.eta}
                        right={cost === 0 ? "Free" : money(cost)}
                      />
                    );
                  })}
                </div>
              </StepCard>

              <StepCard step={4} title="Payment" icon={CreditCard}>
                <div
                  role="radiogroup"
                  aria-label="Payment method"
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <RadioCard
                    checked={payment === "card"}
                    onSelect={() => setPayment("card")}
                    icon={CreditCard}
                    title="Credit / debit card"
                    subtitle="Pay securely online"
                  />
                  <RadioCard
                    checked={payment === "cod"}
                    onSelect={() => setPayment("cod")}
                    icon={Wallet}
                    title="Cash on delivery"
                    subtitle="Pay when it arrives"
                  />
                </div>

                {payment === "card" ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {/* TODO: Replace these inputs with the payment provider's secure card fields. */}
                    <div className="sm:col-span-2">
                      <Field label="Card number" id="co-cardNumber" error={errors.cardNumber}>
                        <input
                          id="co-cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength={23}
                          value={values.cardNumber}
                          onChange={(e) => {
                            const d = e.target.value.replace(/\D/g, "").slice(0, 19);
                            setField("cardNumber", d.replace(/(.{4})/g, "$1 ").trim());
                          }}
                          aria-invalid={!!errors.cardNumber}
                          aria-describedby={errors.cardNumber ? "co-cardNumber-error" : undefined}
                          placeholder="1234 5678 9012 3456"
                          className={inputClass(!!errors.cardNumber)}
                        />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Name on card" id="co-cardName" error={errors.cardName}>
                        <input
                          id="co-cardName"
                          type="text"
                          autoComplete="cc-name"
                          value={values.cardName}
                          onChange={(e) => setField("cardName", e.target.value)}
                          aria-invalid={!!errors.cardName}
                          aria-describedby={errors.cardName ? "co-cardName-error" : undefined}
                          className={inputClass(!!errors.cardName)}
                        />
                      </Field>
                    </div>
                    <Field label="Expiry" id="co-expiry" error={errors.expiry}>
                      <input
                        id="co-expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        maxLength={5}
                        value={values.expiry}
                        onChange={(e) => setField("expiry", formatExpiry(e.target.value))}
                        aria-invalid={!!errors.expiry}
                        aria-describedby={errors.expiry ? "co-expiry-error" : undefined}
                        placeholder="MM/YY"
                        className={inputClass(!!errors.expiry)}
                      />
                    </Field>
                    <Field label="CVC" id="co-cvc" error={errors.cvc}>
                      <input
                        id="co-cvc"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        value={values.cvc}
                        onChange={(e) =>
                          setField("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        aria-invalid={!!errors.cvc}
                        aria-describedby={errors.cvc ? "co-cvc-error" : undefined}
                        placeholder="123"
                        className={inputClass(!!errors.cvc)}
                      />
                    </Field>
                  </div>
                ) : (
                  <p className="mt-5 rounded-lg border border-white/5 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-400">
                    You will pay in cash to the courier when your order is delivered.
                  </p>
                )}
              </StepCard>
            </div>

            {/* ===================== Summary ===================== */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent blur-2xl"
                />

                <div className="space-y-5 rounded-2xl border border-cyan-400/20 bg-[#0a1119]/90 p-5 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-extrabold uppercase tracking-widest text-cyan-300">
                      Your order
                    </h2>
                    <Link
                      href="/cart"
                      className="text-[11px] font-semibold text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      Edit cart
                    </Link>
                  </div>

                  <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-[#0d1824] to-[#070d14]">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center">
                              <Package className="h-5 w-5 text-cyan-400/80" />
                            </div>
                          )}
                          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-bl-md bg-cyan-500 px-1 text-[9px] font-bold text-[#06121a]">
                            {item.qty}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold">{item.name}</p>
                          {item.variant && (
                            <p className="truncate text-[10px] text-slate-500">{item.variant}</p>
                          )}
                        </div>
                        <span className="shrink-0 text-xs font-bold">
                          {money(item.price * item.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="space-y-2.5 border-t border-white/5 pt-4 text-xs">
                    <SummaryRow label={`Subtotal (${count} items)`} value={money(subtotal)} />
                    {promo && (
                      <SummaryRow
                        label={`Promo (${promo.code})`}
                        value={`-${money(totals.discount)}`}
                        valueClass="text-emerald-300"
                      />
                    )}
                    <SummaryRow
                      label="Shipping"
                      value={totals.shipping === 0 ? "Free" : money(totals.shipping)}
                    />
                    <SummaryRow label="Taxes" value={money(totals.tax)} />
                  </dl>

                  <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                    <div className="flex items-baseline justify-between" aria-live="polite">
                      <span className="text-xs text-slate-400">Total</span>
                      <span className="text-2xl font-extrabold">{money(totals.total)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-slate-300">
                      <input
                        id="co-terms"
                        type="checkbox"
                        checked={values.terms}
                        onChange={(e) => setField("terms", e.target.checked)}
                        aria-invalid={!!errors.terms}
                        aria-describedby={errors.terms ? "co-terms-error" : undefined}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-cyan-400"
                      />
                      <span>
                        I agree to the{" "}
                        <a href="/legal/terms" className="text-cyan-300 underline-offset-2 hover:underline" target="_blank">
                          terms &amp; conditions
                        </a>{" "}
                        and the{" "}
                        <a href="/legal/privacy" className="text-cyan-300 underline-offset-2 hover:underline" target="_blank">
                          privacy policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors.terms && (
                      <p
                        id="co-terms-error"
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-300"
                      >
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  {status === "failed" && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-400/30 bg-red-500/10 p-2.5 text-[11px] text-red-200"
                    >
                      Something went wrong while placing your order. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={status === "placing"}
                    className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {status === "placing" ? (
                      <>
                        <span
                          aria-hidden
                          className="h-4 w-4 animate-spin rounded-full border-2 border-[#06121a]/30 border-t-[#06121a] motion-reduce:animate-none"
                        />
                        <span className="relative z-10">Placing order...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Place order · {money(totals.total)}</span>
                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </>
                    )}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  </button>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

/* ===================== Sub components ===================== */

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:shadow-[0_0_14px_rgba(6,182,212,0.3)] ${
    hasError ? "border-red-400/60" : "border-white/10 focus:border-cyan-400/60"
  }`;

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-400"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function StepCard({
  step,
  title,
  icon: Icon,
  children,
}: {
  step: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`step-${step}`}
      className="rounded-2xl border border-cyan-400/15 bg-[#0a1119]/90 p-5 shadow-[0_0_40px_rgba(6,182,212,0.08)] backdrop-blur sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.2)]">
          <Icon className="h-5 w-5" />
        </span>
        <h2 id={`step-${step}`} className="text-lg font-extrabold">
          <span className="mr-2 text-cyan-400">{step}.</span>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function RadioCard({
  checked,
  onSelect,
  icon: Icon,
  title,
  subtitle,
  right,
}: {
  checked: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  right?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
        checked
          ? "border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
          : "border-white/5 bg-black/30 hover:border-cyan-400/30"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors ${
          checked ? "bg-cyan-500 text-[#06121a]" : "bg-white/5 text-cyan-300"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">{title}</span>
        <span className="block text-[11px] text-slate-400">{subtitle}</span>
      </span>
      {right && <span className="shrink-0 text-xs font-bold text-cyan-300">{right}</span>}
      <span
        aria-hidden
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
          checked
            ? "border-cyan-400 bg-cyan-500 text-[#06121a]"
            : "border-white/20 text-transparent group-hover:border-cyan-400/50"
        }`}
      >
        <Check className="h-3 w-3" />
      </span>
    </button>
  );
}

function SummaryRow({
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

function EmptyCheckout() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-cyan-500/15 via-emerald-500/5 to-transparent blur-2xl"
      />
      <div className="rounded-3xl border border-cyan-400/20 bg-[#0a1119]/90 px-6 py-14 text-center shadow-[0_0_40px_rgba(6,182,212,0.12)] backdrop-blur">
        <div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center">
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse rounded-full border border-cyan-400/30 motion-reduce:animate-none"
          />
          <span aria-hidden className="absolute inset-3 rounded-full bg-cyan-400/10 blur-xl" />
          <ShoppingCart className="relative h-10 w-10 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
        </div>
        <h2 className="text-xl font-extrabold">Nothing to check out</h2>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-400">
          Your cart is empty. Add some products first, then come back to complete your order.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#sections"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] active:scale-95"
          >
            Browse products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Back to cart
          </Link>
        </div>
      </div>
    </div>
  );
}

function OrderSuccess({ order }: { order: Order }) {
  const method = SHIPPING_METHODS.find((m) => m.id === order.shippingId);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent blur-2xl"
      />

      <div className="rounded-3xl border border-cyan-400/20 bg-[#0a1119]/90 p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur sm:p-10">
        <div role="status" className="text-center">
          <span className="relative mx-auto mb-5 grid h-20 w-20 place-items-center">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20 motion-reduce:animate-none"
            />
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-cyan-500 text-[#06121a] shadow-[0_0_35px_rgba(6,182,212,0.7)]">
              <Check className="h-10 w-10" />
            </span>
          </span>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Thank you for your order!</h2>
          {/* // TODO: Send the real confirmation email here. */}
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-400">
            A confirmation will be sent to{" "}
            <span className="font-semibold text-cyan-300">{order.email}</span>. Your build is now in
            our queue.
          </p>
          <p className="mt-4 inline-block rounded-lg border border-dashed border-cyan-400/40 bg-cyan-400/5 px-4 py-2 text-sm font-bold tracking-widest text-cyan-300">
            {order.id}
          </p>
        </div>

        <div className="mt-8 space-y-5 border-t border-white/5 pt-6">
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-slate-500"> × {item.qty}</span>
                </span>
                <span className="shrink-0 font-bold">{money(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2.5 border-t border-white/5 pt-4 text-xs">
            <SummaryRow
              label="Subtotal"
              value={money(order.totals.afterDiscount + order.totals.discount)}
            />
            {order.promoCode && (
              <SummaryRow
                label={`Promo (${order.promoCode})`}
                value={`-${money(order.totals.discount)}`}
                valueClass="text-emerald-300"
              />
            )}
            <SummaryRow
              label="Shipping"
              value={order.totals.shipping === 0 ? "Free" : money(order.totals.shipping)}
            />
            <SummaryRow label="Taxes" value={money(order.totals.tax)} />
          </dl>

          <div className="flex items-baseline justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3">
            <span className="text-xs text-slate-400">Total</span>
            <span className="text-2xl font-extrabold">{money(order.totals.total)}</span>
          </div>

          <div className="grid gap-3 text-xs sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                Delivery
              </p>
              <p className="font-semibold">{method?.label}</p>
              <p className="text-slate-400">{method?.eta}</p>
              <p className="mt-2 text-slate-400">{order.address}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                Payment
              </p>
              <p className="font-semibold">
                {order.payment === "card" ? "Credit / debit card" : "Cash on delivery"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#sections"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-[#06121a] shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] active:scale-95"
          >
            Continue shopping
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#home"
            className="inline-flex items-center rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
