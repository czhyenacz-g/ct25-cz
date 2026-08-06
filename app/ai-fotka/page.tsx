import type { Metadata } from "next";
import Image from "next/image";
import AiFotkaSelector from "../components/ai-photo/AiFotkaSelector";
import { aiDemoImage } from "../lib/ai-photo-templates";
import { SITE_URL } from "../config/site";

// Neveřejná testovací stránka — žádný odkaz z titulní stránky, navigace ani
// footeru, mimo sitemap (app/sitemap.ts ji neobsahuje), noindex/nofollow.
export const metadata: Metadata = {
  title: "AI fotomontáž — testovací ukázka",
  description:
    "Testovací ukázka připravované funkce AI fotomontáží s veřejnou osobností. Zatím se nic negeneruje ani neodesílá.",
  alternates: { canonical: `${SITE_URL}/ai-fotka` },
  robots: { index: false, follow: false },
};

export default function AiFotkaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <p className="mb-3 inline-block rounded-full border border-warn/50 bg-warn/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-warn">
        Testovací stránka
      </p>
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Vyzkoušejte předlohu AI fotomontáže</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">
        Připravujeme možnost vytvořit vlastní, jasně označenou AI fotomontáž s vybranou veřejnou
        osobností. Vyberte si scénu, do které bude později možné vložit vaši fotografii.
      </p>

      <div className="mt-5 rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm font-medium text-warn sm:text-base">
        Výsledné obrázky jsou fikce vytvořená pomocí AI. Nezachycují skutečné setkání ani událost.
      </div>

      <div className="mt-10">
        <AiFotkaSelector />
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-white">S AI se někdy mohou dít i zázraky</h2>
        <div className="mt-4 max-w-sm overflow-hidden rounded-lg border border-line">
          <Image
            src={aiDemoImage.imageUrl}
            alt={aiDemoImage.alt}
            width={aiDemoImage.width}
            height={aiDemoImage.height}
            sizes="(max-width: 640px) 100vw, 384px"
            className="h-auto w-full"
          />
        </div>
        <p className="mt-2 max-w-sm text-xs font-medium text-warn">
          AI fotomontáž — fikce, k zobrazenému setkání nedošlo.
        </p>
        <p className="mt-2 max-w-sm text-sm text-gray-400">
          Tato fotografie Vladimira Putina a Volodymyra Zelenského je vytvořená pomocí AI. K
          zobrazenému setkání nedošlo.
        </p>
      </section>
    </div>
  );
}
