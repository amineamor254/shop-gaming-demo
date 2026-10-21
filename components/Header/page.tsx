"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  Cpu,
  Heart,
  Home,
  Layers,
  Menu,
  MessageCircle,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { useCart } from "@/components/Cart/CartContext";
import {
  SHOP_CATEGORIES,
  requestCategory,
  type ShopCategoryKey,
} from "@/components/Shop/shop-filter";

type NavItem = {
  label: string;
  id: string; // يجب أن يطابق id القسم في الصفحة (حروف صغيرة)
  icon: React.ComponentType<{ className?: string }>;
};

// أضف كل قسم جديد هنا مع id مطابق لـ <section id="...">
const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home", icon: Home },
  { label: "Settings", id: "configurator", icon: Settings },
  { label: "Sections", id: "sections", icon: Layers },
  { label: "Blog", id: "blog", icon: BookOpen },
  { label: "Offers", id: "offers", icon: Sparkles },
  { label: "Contact", id: "contact", icon: MessageCircle },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const shopRef = useRef<HTMLDivElement>(null);
  const shopTriggerRef = useRef<HTMLButtonElement>(null);

  // تغيير شكل الـ header عند التمرير
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // تمييز القسم الظاهر حالياً (في الصفحة الرئيسية فقط)
  useEffect(() => {
    if (pathname !== "/") return;

    const els = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // إغلاق قائمة Shop: نقر خارجها أو زر Escape
  useEffect(() => {
    if (!shopOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!shopRef.current?.contains(e.target as Node)) setShopOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShopOpen(false);
        shopTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [shopOpen]);

  const closeAllMenus = () => {
    setShopOpen(false);
    setMobileOpen(false);
    setMobileShopOpen(false);
  };

  const selectCategory = (key: ShopCategoryKey) => {
    requestCategory(key); // يطبّق الفلتر في قسم Sections
    closeAllMenus();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-cyan-500/20 bg-[#070d14]/85 shadow-lg shadow-black/40 backdrop-blur-xl"
          : "border-white/5 bg-[#0a1119]/95 backdrop-blur-md"
      }`}
    >
      {/* line gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* logo */}
        <Link href="/#home" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#06121a]" aria-hidden>
              <rect x="3" y="10" width="4" height="10" rx="1" />
              <rect x="10" y="4" width="4" height="16" rx="1" />
              <rect x="17" y="8" width="4" height="12" rx="1" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block text-lg font-extrabold tracking-wider text-white">MIAN</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-400/70">
              Games
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 lg:flex"
        >
          {NAV_ITEMS.map(({ label, id, icon: Icon }) => {
            const active = pathname === "/" && activeId === id;
            return (
              <Link
                key={id}
                href={`/#${id}`}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-cyan-500 text-[#06121a] shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    active ? "" : "group-hover:-translate-y-0.5 group-hover:scale-110"
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}

          {/* ===== Shop dropdown ===== */}
          <div
            ref={shopRef}
            className="relative"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setShopOpen(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setShopOpen(false);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setShopOpen(false);
            }}
          >
            <button
              ref={shopTriggerRef}
              type="button"
              aria-expanded={shopOpen}
              aria-controls="shop-menu"
              onClick={() => setShopOpen((v) => !v)}
              className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                shopOpen
                  ? "bg-white/5 text-cyan-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
              }`}
            >
              <Store
                className={`h-4 w-4 transition-transform duration-300 ${
                  shopOpen
                    ? "-translate-y-0.5 scale-110"
                    : "group-hover:-translate-y-0.5 group-hover:scale-110"
                }`}
              />
              <span>Shop</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
                  shopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* panel (pt-3 يملأ الفراغ حتى لا تُغلق القائمة عند تحريك الفأرة) */}
            <div
              id="shop-menu"
              className={`absolute right-0 top-full z-50 w-[min(92vw,400px)] origin-top-right pt-3 transition-all duration-200 motion-reduce:transition-none ${
                shopOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-cyan-400/20 bg-[#0a1119]/95 p-3 shadow-[0_0_40px_rgba(6,182,212,0.2)] backdrop-blur-xl">
                <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                  Shop by category
                </p>

                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {SHOP_CATEGORIES.map(({ key, label, description, icon: Icon }) => (
                    <li key={key} className={key === "All" ? "sm:col-span-2" : ""}>
                      <Link
                        href="/#sections"
                        onClick={() => selectCategory(key)}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-[#06121a] group-hover:shadow-[0_0_14px_rgba(6,182,212,0.5)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-bold text-white">{label}</span>
                          <span className="block truncate text-[10px] text-slate-400">
                            {description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#configurator"
                  onClick={closeAllMenus}
                  className="group mt-2 flex items-center justify-between gap-3 rounded-xl border border-orange-400/20 bg-orange-500/10 px-3 py-2.5 transition-all duration-300 hover:border-orange-400/50 hover:bg-orange-500/15"
                >
                  <span className="flex items-center gap-2.5">
                    <Cpu className="h-4 w-4 text-orange-300" />
                    <span>
                      <span className="block text-xs font-bold text-white">Need a custom rig?</span>
                      <span className="block text-[10px] text-slate-400">Build your own PC</span>
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-orange-300 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Side Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Favorites"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-all duration-300 hover:border-pink-400/50 hover:text-pink-400 hover:shadow-[0_0_14px_rgba(244,114,182,0.35)]"
          >
            <Heart className="h-[18px] w-[18px]" />
          </button>

          <Link
            href="/cart"
            aria-label={`Shopping cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-[#06121a]">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>

          {/* TODO: اربط الزر بصفحة تسجيل الدخول عندما تبنيها */}
          <Link
            href="/login"
            className="relative hidden overflow-hidden rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-bold text-[#06121a] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(6,182,212,0.7)] active:scale-95 sm:inline-block"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 hover:translate-x-full" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile Navigation"
            className="mx-auto flex max-h-[75vh] max-w-7xl flex-col gap-1 overflow-y-auto border-t border-white/5 px-4 py-3"
          >
            {NAV_ITEMS.map(({ label, id, icon: Icon }) => {
              const active = pathname === "/" && activeId === id;
              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={closeAllMenus}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-cyan-500 text-[#06121a]"
                      : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}

            {/* Shop accordion */}
            <button
              type="button"
              aria-expanded={mobileShopOpen}
              aria-controls="mobile-shop-list"
              onClick={() => setMobileShopOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-cyan-300"
            >
              <span className="flex items-center gap-3">
                <Store className="h-4 w-4" />
                Shop
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  mobileShopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id="mobile-shop-list"
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                mobileShopOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <ul className="min-h-0 space-y-1 border-l border-cyan-400/20 pl-3 ml-6">
                {SHOP_CATEGORIES.map(({ key, label, icon: Icon }) => (
                  <li key={key}>
                    <Link
                      href="/#sections"
                      onClick={() => selectCategory(key)}
                      tabIndex={mobileShopOpen ? 0 : -1}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-cyan-300"
                    >
                      <Icon className="h-4 w-4 text-cyan-400" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/login"
              onClick={closeAllMenus}
              className="mt-2 rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-bold text-[#06121a] sm:hidden"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
