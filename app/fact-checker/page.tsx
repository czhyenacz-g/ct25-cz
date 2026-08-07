import type { Metadata } from "next";
import FactCheckerForm from "../components/fact-checker/FactCheckerForm";
import { SITE_URL } from "../config/site";

// Veřejná, indexovatelná stránka (na rozdíl od /ai-fotka) — zatím vědomě
// bez odkazu z hlavního menu/homepage CTA, jen přes přímou URL a sitemap.
export const metadata: Metadata = {
  title: "Rychlá kontrola tvrzení",
  description:
    "Jednoduchá pomůcka pro rychlé ověření libovolného tvrzení pomocí existujících veřejných vyhledávacích služeb — žádný automatický verdikt, žádné ukládání zadaného textu.",
  alternates: { canonical: `${SITE_URL}/fact-checker` },
};

export default function FactCheckerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Rychlá kontrola tvrzení</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">
        Nemusíte věřit nám ani tomu, co právě čtete. Napište tvrzení, které chcete prověřit, a
        otevřeme vám několik rychlých cest k dostupným zdrojům.
      </p>

      <div className="mt-5 rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm font-medium text-warn sm:text-base">
        Toto není automatický verdikt ani plnohodnotný fact-check. Je to pouze první rychlá
        kontrola, která vám pomůže hledat další zdroje.
      </div>

      <div className="mt-8">
        <FactCheckerForm />
      </div>
    </div>
  );
}
