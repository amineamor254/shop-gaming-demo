"use client";

import { useEffect, useMemo, useState } from "react";
import { SHOP_EVENT, consumeRequestedCategory } from "@/components/Shop/shop-filter";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Keyboard,
  LayoutGrid,
  Monitor,
  Mouse,
  Rows3,
  Search,
  ShoppingCart,
  Star,
  Grid2x2,
  Grid3x3,
  X,
} from "lucide-react";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { formatProductMoney } from "@/lib/format";
import {
  CATEGORIES,
  COLOR_FILTERS,
  PRODUCTS,
  SORT_OPTIONS,
  type Product,
  type ProductCategory,
} from "@/data/products";

/* ===================== Types and data ===================== */

const CATEGORY_ICONS = {
  Audio: Headphones,
  Monitors: Monitor,
  Mice: Mouse,
  Keyboards: Keyboard,
} as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const GRID_COLS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

const PAGE_SIZE = 6;
const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

/* ===================== Section ===================== */

/** Renders the searchable, filterable, and paginated product catalog. */
export default function Sections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("alpha-asc");
  const [cols, setCols] = useState<2 | 3 | 4>(3);
  const [page, setPage] = useState(1);

  const resetPage = () => setPage(1);

  useEffect(() => {
    // Apply a saved category on mount and listen for selections sent by the header.
    const apply = (c: string | null) => {
      const requestedCategory = CATEGORIES.find((validCategory) => validCategory === c);
      if (!requestedCategory) return;
      setCategory(requestedCategory);
      setQuery("");
      setInStockOnly(false);
      setOutOfStockOnly(false);
      setMaxPrice(MAX_PRICE);
      setColor(null);
      setPage(1);
    };

    apply(consumeRequestedCategory());

    const onRequest = (e: Event) => {
      apply((e as CustomEvent<string>).detail);
      consumeRequestedCategory();
    };
    window.addEventListener(SHOP_EVENT, onRequest);
    return () => window.removeEventListener(SHOP_EVENT, onRequest);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (category !== "All" && p.category !== category) return false;
      if (inStockOnly && !outOfStockOnly && !p.inStock) return false;
      if (outOfStockOnly && !inStockOnly && p.inStock) return false;
      if (p.price > maxPrice) return false;
      if (color && !p.colors.includes(color)) return false;
      return true;
    });

    list.sort((a, b) => {
      switch (sort) {
        case "alpha-asc":
          return a.name.localeCompare(b.name);
        case "alpha-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
      }
    });
    return list;
  }, [query, category, inStockOnly, outOfStockOnly, maxPrice, color, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasFilters =
    query || category !== "All" || inStockOnly || outOfStockOnly || color || maxPrice < MAX_PRICE;

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setInStockOnly(false);
    setOutOfStockOnly(false);
    setMaxPrice(MAX_PRICE);
    setColor(null);
    resetPage();
  };

  return (
    <section
      id="sections"
      aria-labelledby="sections-title"
      className="relative isolate scroll-mt-16 overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white"
    >
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

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* ===================== Section heading ===================== */}
        <div className="mb-8 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary-400/20 bg-brand-primary-400/5 px-3 py-1 text-xs font-medium text-brand-primary-300">
            <span className="h-2 w-2 rounded-full bg-brand-primary-400" />
            Gaming gear
          </span>
          <h2
            id="sections-title"
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              Sections
            </span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* ===================== Sidebar ===================== */}
          <aside className="h-fit space-y-6 rounded-2xl border border-brand-primary-400/15 bg-[#0a1119]/90 p-4 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_8%,transparent)] backdrop-blur lg:sticky lg:top-24">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  resetPage();
                }}
                placeholder="Search here"
                aria-label="Search products"
                className="h-10 w-full rounded-lg border border-white/10 bg-black/40 pl-3 pr-12 text-xs text-white placeholder:text-slate-500 outline-none transition focus:border-brand-primary-400/60 focus:shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-500)_30%,transparent)]"
              />
              <span
                aria-hidden
                className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-r-lg bg-brand-primary-500 text-[#06121a]"
              >
                <Search className="h-4 w-4" />
              </span>
            </div>

            <FilterGroup title="Product Categories">
              <ul className="space-y-1">
                {CATEGORIES.map((c) => {
                  const active = category === c;
                  const Icon = c === "All" ? LayoutGrid : CATEGORY_ICONS[c];
                  const count =
                    c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(c);
                          resetPage();
                        }}
                        className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                          active
                            ? "bg-brand-primary-500 font-bold text-[#06121a] shadow-[0_0_16px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)]"
                            : "text-slate-300 hover:bg-white/5 hover:text-brand-primary-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" />
                          {c}
                        </span>
                        <span className={active ? "" : "text-slate-500"}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </FilterGroup>

            <FilterGroup title="Availability">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    resetPage();
                  }}
                  className="h-3.5 w-3.5 accent-brand-primary-400"
                />
                In Stock ({PRODUCTS.filter((p) => p.inStock).length})
              </label>
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={outOfStockOnly}
                  onChange={(e) => {
                    setOutOfStockOnly(e.target.checked);
                    resetPage();
                  }}
                  className="h-3.5 w-3.5 accent-brand-primary-400"
                />
                Out Of Stock ({PRODUCTS.filter((p) => !p.inStock).length})
              </label>
            </FilterGroup>

            <FilterGroup title="Price">
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  resetPage();
                }}
                aria-label="Maximum price"
                className="h-1.5 w-full cursor-pointer accent-brand-primary-400"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>$0</span>
                <span className="font-bold text-brand-primary-300">Up to ${maxPrice}</span>
              </div>
            </FilterGroup>

            <FilterGroup title="Color">
              <div className="flex flex-wrap gap-2">
                {COLOR_FILTERS.map((c) => {
                  const active = color === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Filter by color ${c}`}
                      aria-pressed={active}
                      onClick={() => {
                        setColor(active ? null : c);
                        resetPage();
                      }}
                      style={{ backgroundColor: c }}
                      className={`h-6 w-6 rounded-full border transition-all duration-300 hover:scale-110 ${
                        active
                          ? "border-brand-primary-300 ring-2 ring-brand-primary-400 ring-offset-2 ring-offset-[#0a1119]"
                          : "border-white/20"
                      }`}
                    />
                  );
                })}
              </div>
            </FilterGroup>

            <Link
              href="#offers"
              className="group relative block overflow-hidden rounded-xl border border-brand-primary-400/20 bg-gradient-to-br from-brand-primary-500/20 via-[#0a1119] to-emerald-500/10 p-4 transition-all duration-500 hover:border-brand-primary-400/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-primary-500)_25%,transparent)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-primary-300">
                Hot deals
              </p>
              <p className="mt-1 text-base font-extrabold leading-tight">Level up your setup</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary-300">
                See offers
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-400/50 hover:text-pink-400"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </aside>

          {/* ===================== Products ===================== */}
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1 sm:flex">
                  {(
                    [
                      [2, Grid2x2],
                      [3, Grid3x3],
                      [4, Rows3],
                    ] as const
                  ).map(([n, Icon]) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} columns`}
                      aria-pressed={cols === n}
                      onClick={() => setCols(n)}
                      className={`hidden h-8 w-8 place-items-center rounded-md transition-all duration-300 lg:grid ${
                        cols === n
                          ? "bg-brand-primary-500 text-[#06121a] shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-500)_50%,transparent)]"
                          : "text-slate-400 hover:bg-white/5 hover:text-brand-primary-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  <span className="font-bold text-white">{filtered.length}</span> Products
                </span>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-400">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortValue);
                    resetPage();
                  }}
                  className="rounded-md border border-white/10 bg-black/50 px-2 py-1.5 text-xs text-white outline-none transition focus:border-brand-primary-400/60"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visible.length > 0 ? (
              <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${GRID_COLS[cols]}`}>
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
                <p className="text-sm font-semibold text-slate-300">
                  No products match your filters
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 rounded-full bg-brand-primary-500 px-5 py-2 text-xs font-bold text-[#06121a] transition hover:scale-105"
                >
                  Clear filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-current={n === currentPage ? "page" : undefined}
                    onClick={() => setPage(n)}
                    className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-bold transition-all duration-300 ${
                      n === currentPage
                        ? "bg-brand-primary-500 text-[#06121a] shadow-[0_0_16px_color-mix(in_srgb,var(--color-brand-primary-500)_50%,transparent)]"
                        : "border border-white/10 text-slate-300 hover:border-brand-primary-400/50 hover:text-brand-primary-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => setPage(currentPage + 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-brand-primary-400/50 hover:text-brand-primary-300"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Sub components ===================== */

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-primary-300">
        <span className="h-px w-3 bg-brand-primary-400/60" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const Icon = CATEGORY_ICONS[p.category];
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a1119]/90 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-primary-400/40 hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_22%,transparent)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#0d1824] to-[#070d14]">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute h-28 w-28 rounded-full bg-brand-primary-400/10 blur-2xl transition-all duration-500 group-hover:bg-brand-primary-400/25" />
            <Icon className="relative h-16 w-16 text-brand-primary-400/80 drop-shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-primary-400)_50%,transparent)] transition-transform duration-500 group-hover:scale-110" />
          </div>
        )}

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-brand-primary-500 px-2 py-0.5 text-[10px] font-bold text-[#06121a] shadow-[0_0_12px_color-mix(in_srgb,var(--color-brand-primary-500)_50%,transparent)]">
            -{discount}%
          </span>
        )}
        {!p.inStock && (
          <span className="absolute right-3 top-3 rounded-md border border-red-400/40 bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-300 backdrop-blur">
            Out of stock
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-brand-primary-300">
          {p.name}
        </h3>

        <div className="flex items-center gap-1.5">
          <div className="flex" aria-label={`${p.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < p.rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-500">({p.reviews} Reviews)</span>
        </div>

        <div className="flex items-center gap-1.5">
          {p.colors.map((c) => (
            <span
              key={c}
              style={{ backgroundColor: c }}
              className="h-2.5 w-2.5 rounded-full border border-white/20"
            />
          ))}
        </div>

        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            {p.oldPrice && (
              <span className="text-xs text-slate-500 line-through">{formatProductMoney(p.oldPrice)}</span>
            )}
            <span className="text-lg font-extrabold text-white">{formatProductMoney(p.price)}</span>
          </div>

          <AddToCartButton
            item={{
              id: `product-${p.id}`,
              name: p.name,
              price: p.price,
              oldPrice: p.oldPrice,
              image: p.image,
              variant: p.category,
            }}
            disabled={!p.inStock}
            aria-label={`Add ${p.name} to cart`}
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-r from-brand-accent-500 to-amber-400 text-[#1a0f00] shadow-[0_0_14px_color-mix(in_srgb,var(--color-brand-accent-500)_30%,transparent)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_22px_color-mix(in_srgb,var(--color-brand-accent-500)_60%,transparent)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <ShoppingCart className="h-4 w-4" />
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
