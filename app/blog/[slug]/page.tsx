import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Home, ChevronRight } from "lucide-react";
import { POSTS, type Post } from "@/data/posts";

type Props = { params: Promise<{ slug: string }> };

const articlesWithContent = POSTS.filter((post) => post.content && post.content.length > 0);

export function generateStaticParams() {
  return articlesWithContent.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = articlesWithContent.find((article) => article.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = articlesWithContent.find((article) => article.slug === slug);
  if (!post) notFound();

  const others = articlesWithContent.filter((article) => article.slug !== post.slug).slice(0, 3);

  return (
    <main className="relative isolate min-h-[70vh] overflow-clip bg-[#05090f] font-[family-name:var(--font-orbitron)] text-white">
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

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-2 text-xs text-slate-400 lg:justify-start"
        >
          <Link href="/#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-primary-300">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/#blog" className="transition-colors hover:text-brand-primary-300">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span aria-current="page" className="max-w-[14rem] truncate font-semibold text-brand-primary-300 sm:max-w-none">
            {post.title}
          </span>
        </nav>

        <header className="mb-8 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest lg:justify-start">
            <span className="text-brand-primary-400">{post.category}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">{post.date}</span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <article>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-[#0a1119]">
            <PostVisual post={post} />
          </div>

          <div className="mt-8 rounded-2xl border border-white/5 bg-[#0a1119]/90 p-6 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_6%,transparent)] backdrop-blur sm:p-8">
            <div className="space-y-5 text-sm leading-7 text-slate-300 sm:text-base">
              {post.content?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/#blog"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand-primary-400/30 bg-brand-primary-400/5 px-5 py-2.5 text-xs font-bold text-brand-primary-300 transition-all duration-300 hover:border-brand-primary-400/60 hover:bg-brand-primary-400/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>
        </article>

        {others.length > 0 && (
          <section className="mt-12" aria-labelledby="more-articles">
            <h2 id="more-articles" className="text-xl font-extrabold">
              More articles
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/5 bg-[#0a1119]/90 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-400/40"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <PostVisual post={article} />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary-400">
                      {article.category}
                    </p>
                    <h3 className="mt-2 text-sm font-bold leading-snug transition-colors group-hover:text-brand-primary-300">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function PostVisual({ post }: { post: Post }) {
  const Icon = post.icon;

  return post.image ? (
    <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
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
      <div aria-hidden className="absolute h-32 w-32 rounded-full bg-brand-primary-400/15 blur-3xl" />
      <Icon className="relative h-16 w-16 text-brand-primary-300 drop-shadow-[0_0_18px_color-mix(in_srgb,var(--color-brand-primary-400)_60%,transparent)] sm:h-24 sm:w-24" />
    </div>
  );
}
