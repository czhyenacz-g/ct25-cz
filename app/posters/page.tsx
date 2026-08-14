import type { Metadata } from "next";
import { SITE_URL } from "../config/site";
import { STICKERS_COLLECTION_SLUG, POSTERS_COLLECTION_SLUG } from "../config/posters";
import { getPosterCollection } from "../lib/posters";
import PosterGallerySection from "../components/posters/PosterGallerySection";

export const metadata: Metadata = {
  title: "Plakáty a nálepky proti dezinformacím ke stažení",
  description:
    "Plakáty a nálepky CT25.cz ke stažení, tisku a volnému sdílení. Materiály zaměřené na dezinformace, kritické myšlení a mediální gramotnost.",
  alternates: { canonical: `${SITE_URL}/posters` },
};

export default async function PostersPage() {
  const [stickers, posters] = await Promise.all([
    getPosterCollection(STICKERS_COLLECTION_SLUG),
    getPosterCollection(POSTERS_COLLECTION_SLUG),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Plakáty a nálepky ke stažení</h1>

      <div className="mt-5 max-w-3xl space-y-4 text-gray-300">
        <p>Materiály na této stránce můžete zdarma stáhnout, vytisknout a dál sdílet.</p>
        <p>
          Vznikly jako součást projektu CT25.cz, který upozorňuje na dezinformace a informační
          manipulace.
        </p>
        <p>Můžete je použít například:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-300">
          <li>na nástěnce,</li>
          <li>ve škole nebo při výuce mediální gramotnosti,</li>
          <li>na veřejné debatě,</li>
          <li>pro vlastní nekomerční i komerční tisk,</li>
          <li>při sdílení na internetu.</li>
        </ul>
        <p>
          Materiály jsou poskytovány pod licencí{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/deed.cs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Creative Commons Attribution 4.0 International (CC BY 4.0)
          </a>
          , pokud u konkrétního materiálu není uvedeno jinak. To znamená, že je možné je kopírovat,
          tisknout, sdílet a upravovat, a to i pro komerční účely, pokud je přiměřeně uveden zdroj.
          Doporučené uvedení zdroje: <strong className="text-white">Zdroj: CT25.cz</strong>.
        </p>
        <p className="text-sm text-gray-500">
          Toto shrnutí licence je jen orientační a nenahrazuje právní poradenství — závazné je vždy
          plné znění licence CC BY 4.0.
        </p>
      </div>

      <div className="mt-6 max-w-3xl rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm text-gray-200">
        Některé materiály obsahují ukázky dezinformací, fotomontáží nebo parodického obsahu. Jejich
        účelem je kritika, vzdělávání a upozornění na informační manipulace.
      </div>

      <PosterGallerySection
        id="nalepky"
        title="Nálepky k tisku"
        images={stickers}
        itemAltFallback="Nálepka CT25.cz ke stažení"
        emptyMessage="Zatím tu nejsou žádné nálepky ke stažení. Brzy je doplníme."
      />

      <PosterGallerySection
        id="plakaty"
        title="Plakáty k tisku"
        images={posters}
        itemAltFallback="Plakát CT25.cz ke stažení"
        emptyMessage="Zatím tu nejsou žádné plakáty ke stažení. Brzy je doplníme."
      />
    </div>
  );
}
