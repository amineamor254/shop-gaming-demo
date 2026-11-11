"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { POSTS, type Post } from "@/data/posts";

const INITIAL_VISIBLE = 4;

const postHref = (post: Post) =>
  post.content && post.content.length > 0 ? `/blog/${post.slug}` : undefined;

/* ===================== Section ===================== */

/** Displays the featured article and category-filtered blog posts. */
export default function Blog() {
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const others = POSTS.filter((p) => p.id !== featured.id);

  const categories = ["All", ...Array.from(new Set(others.map((p) => p.category)))];
  const filtered = category === "All" ? others : others.filter((p) => p.category === category);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const canToggle = filtered.length > INITIAL_VISIBLE;

  return (
    <section
      id="blog"
      aria-labelledby="blog-title"
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
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-brand-primary-500/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary-400/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* ===================== Section heading ===================== */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary-400/20 bg-brand-primary-400/5 px-3 py-1 text-xs font-medium text-brand-primary-300">
              <span className="h-2 w-2 rounded-full bg-brand-primary-400" />
              Blog
            </span>
            <h2 id="blog-title" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Latest{" "}
              <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
                Stories
              </span>
            </h2>
          </div>

          {canToggle && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-brand-primary-300 transition-colors hover:text-brand-primary-200"
            >
              {showAll ? "Show less" : "View all"}
              <ArrowRight
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  showAll ? "-rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </button>
          )}
        </div>

        {/* ===================== Featured post ===================== */}
        <FeaturedPost post={featured} />

        {/* ===================== Category filters ===================== */}
        <div
          role="group"
          aria-label="Filter articles by category"
          className="mb-6 mt-10 flex flex-wrap items-center gap-2"
        >
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setCategory(c);
                  setShowAll(false);
                }}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  active
                    ? "border-brand-primary-400 bg-brand-primary-500 text-[#06121a] shadow-[0_0_16px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)]"
                    : "border-white/10 text-slate-300 hover:border-brand-primary-400/50 hover:text-brand-primary-300"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* ===================== Article grid ===================== */}
        {visible.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 py-14 text-center text-sm text-slate-400">
            No articles in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

/* ===================== Sub components ===================== */

function PostVisual({ post, iconClass }: { post: Post; iconClass: string }) {
  const Icon = post.icon;
  return post.image ? (
    <Image
      src={post.image}
      alt={post.title}
      fill
      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <div className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${post.gradient}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-primary-400) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-primary-400) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute h-32 w-32 rounded-full bg-brand-primary-400/15 blur-3xl transition-all duration-500 group-hover:bg-brand-primary-400/30"
      />
      <Icon
        className={`relative text-brand-primary-300 drop-shadow-[0_0_18px_color-mix(in_srgb,var(--color-brand-primary-400)_60%,transparent)] transition-transform duration-500 group-hover:scale-110 ${iconClass}`}
      />
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="group relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-r from-brand-primary-500/15 via-emerald-500/10 to-transparent blur-2xl"
      />

      <div className="grid overflow-hidden rounded-3xl border border-brand-primary-400/20 bg-[#0a1119]/90 shadow-[0_0_50px_color-mix(in_srgb,var(--color-brand-primary-500)_12%,transparent)] backdrop-blur transition-all duration-500 hover:border-brand-primary-400/40 hover:shadow-[0_0_60px_color-mix(in_srgb,var(--color-brand-primary-500)_25%,transparent)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[240px] overflow-hidden lg:min-h-[340px]">
          <PostVisual post={post} iconClass="h-24 w-24 sm:h-32 sm:w-32" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0a1119]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a1119]/40"
          />
        </div>

        <div className="flex flex-col justify-center bg-gradient-to-br from-brand-primary-500/10 via-transparent to-emerald-500/5 p-6 sm:p-10">
          {post.tags && (
            <ul className="mb-3 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tags">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-primary-400"
                >
                  #{t}
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-300 group-hover:text-brand-primary-300 sm:text-3xl">
            {post.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>

          <div className="mt-5 flex items-center gap-3 text-[11px] text-slate-500">
            <span>{post.date}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate-600" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          {postHref(post) && (
            <Link
              href={postHref(post)!}
              className="group/link mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#06121a] shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-500)_45%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_75%,transparent)] active:scale-95"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  const href = postHref(post);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a1119]/90 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-primary-400/40 hover:shadow-[0_0_35px_color-mix(in_srgb,var(--color-brand-primary-500)_22%,transparent)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <PostVisual post={post} iconClass="h-14 w-14" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a1119] to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary-400">
          {post.category}
        </p>

        <h3 className="mt-1.5 text-base font-bold leading-snug transition-colors duration-300 group-hover:text-brand-primary-300">
          {href ? (
            <Link href={href} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-400">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
          {href && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-primary-300">
              Read more
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
