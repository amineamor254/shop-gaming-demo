import Link from "next/link";
import { ChevronRight, FileText, Home, Info, Mail } from "lucide-react";
import {
  LEGAL_COMPANY,
  LEGAL_DOCS,
  SHOW_TEMPLATE_NOTICE,
  type LegalDoc,
} from "./legal-content";

/* ===================== Page ===================== */

/** Shared layout for every legal page. The text itself lives in legal-content.ts. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  // Highlight the last word of the title with the brand gradient.
  const words = doc.title.split(" ");
  const lastWord = words.pop();

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

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
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
            {doc.title}
          </span>
        </nav>

        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {words.join(" ")}{" "}
            <span className="bg-gradient-to-r from-brand-primary-300 via-brand-primary-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_color-mix(in_srgb,var(--color-brand-primary-400)_35%,transparent)]">
              {lastWord}
            </span>
          </h1>
          <p className="mt-3 text-xs text-slate-500">Last updated: {doc.updated}</p>
        </header>

        {SHOW_TEMPLATE_NOTICE && (
          <div
            role="note"
            className="mb-8 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-200"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              This is sample content for the template. Replace it with your own legal text, reviewed
              by a qualified lawyer, before you launch your store.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* ===================== Table of contents ===================== */}
          <aside className="h-fit lg:sticky lg:top-24">
            <nav
              aria-label="On this page"
              className="rounded-2xl border border-brand-primary-400/15 bg-[#0a1119]/90 p-4 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_8%,transparent)] backdrop-blur"
            >
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-primary-300">
                <span className="h-px w-3 bg-brand-primary-400/60" />
                On this page
              </p>
              <ol className="space-y-1">
                {doc.sections.map((s, i) => (
                  <li key={s.title}>
                    <a
                      href={`#section-${i + 1}`}
                      className="group flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-brand-primary-300"
                    >
                      <span className="mt-px text-[10px] font-bold text-brand-primary-400">{i + 1}.</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* ===================== Content ===================== */}
          <article className="rounded-2xl border border-white/5 bg-[#0a1119]/90 p-6 shadow-[0_0_40px_color-mix(in_srgb,var(--color-brand-primary-500)_6%,transparent)] backdrop-blur sm:p-8">
            <p className="text-sm leading-relaxed text-slate-300">{doc.intro}</p>

            <div className="mt-8 space-y-9">
              {doc.sections.map((s, i) => (
                <section
                  key={s.title}
                  id={`section-${i + 1}`}
                  aria-labelledby={`section-title-${i + 1}`}
                  className="scroll-mt-24"
                >
                  <h2
                    id={`section-title-${i + 1}`}
                    className="mb-3 flex items-center gap-3 text-lg font-extrabold"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-primary-500/15 text-sm text-brand-primary-300">
                      {i + 1}
                    </span>
                    {s.title}
                  </h2>

                  {s.paragraphs?.map((p) => (
                    <p key={p} className="mb-3 text-sm leading-relaxed text-slate-400">
                      {p}
                    </p>
                  ))}

                  {s.items && (
                    <ul className="space-y-2 text-sm leading-relaxed text-slate-400">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary-400 shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-primary-400)_80%,transparent)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* contact box */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-primary-400/20 bg-brand-primary-400/5 p-4">
              <div>
                <p className="text-sm font-bold">Still have a question?</p>
                <p className="text-xs text-slate-400">Our team usually replies within one business day.</p>
              </div>
              <a
                href={`mailto:${LEGAL_COMPANY.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary-500 px-5 py-2.5 text-xs font-bold text-[#06121a] shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-primary-500)_40%,transparent)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-brand-primary-500)_70%,transparent)] active:scale-95"
              >
                <Mail className="h-4 w-4" />
                {LEGAL_COMPANY.email}
              </a>
            </div>
          </article>
        </div>

        {/* ===================== Related policies ===================== */}
        <section aria-labelledby="related-title" className="mt-10">
          <h2
            id="related-title"
            className="mb-4 text-[11px] font-bold uppercase tracking-widest text-brand-primary-300"
          >
            Other policies
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/legal/${d.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-400/40 hover:bg-brand-primary-400/5"
                >
                  <FileText className="h-4 w-4 shrink-0 text-brand-primary-400" />
                  <span className="text-xs font-semibold transition-colors group-hover:text-brand-primary-300">
                    {d.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}