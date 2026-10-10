"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Layers,
  BookOpen,
  Sparkles,
  MessageCircle,
  Gamepad2,
  ChevronDown,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Settings", href: "/configurator", icon: Settings },
  { label: "Sections", href: "/sections", icon: Layers },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Offers", href: "/offers", icon: Sparkles },
  { label: "Contact", href: "/contact", icon: MessageCircle },
  { label: "Platforms", href: "/platforms", icon: Gamepad2, hasDropdown: true },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#06121a]">
              <rect x="3" y="10" width="4" height="10" rx="1" />
              <rect x="10" y="4" width="4" height="16" rx="1" />
              <rect x="17" y="8" width="4" height="12" rx="1" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block text-lg font-extrabold tracking-wider text-white">
              MIAN
            </span>
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
          {NAV_ITEMS.map(({ label, href, icon: Icon, hasDropdown }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
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
                {hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>
            );
          })}
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

          <button
            type="button"
            aria-label="Shopping Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-[#06121a]">
              2
            </span>
          </button>

          <Link
            href="/login"
            className="relative hidden overflow-hidden rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-bold text-[#06121a] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(6,182,212,0.7)] active:scale-95 sm:inline-block"
          >
            <span className="relative z-10">Login</span>
            {/* gradient shine on hover */}
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
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 border-t border-white/5 px-4 py-3">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
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
            <Link
              href="/login"
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