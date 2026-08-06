import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeContent from "../../components/HomeContent";
import { documentedCases, getCaseBySlug } from "../../lib/cases";
import { buildCaseMetadata } from "../../lib/case-metadata";

/**
 * Sdílitelná, stabilní URL pro jeden doložený případ — vykresluje stejnou
 * titulní stránku jako `/` (viz app/page.tsx), jen s vlastními metadaty pro
 * daný případ a automatickým odscrollováním/zvýrazněním po načtení
 * (ScrollToCase). Žádný samostatný detail článku, žádný nový datový zdroj —
 * `documentedCases` zůstává jediným zdrojem pravdy.
 */
export async function generateStaticParams() {
  return documentedCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) return {};

  return buildCaseMetadata(item);
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) notFound();

  return <HomeContent highlightSlug={item.slug} />;
}
