import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/Legal/LegalPage";
import { LEGAL_DOCS, getLegalDoc } from "@/components/Legal/legal-content";

type Props = { params: Promise<{ slug: string }> };

// Build /legal/privacy, /legal/terms, ... at build time. Any other slug returns a 404.
export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}