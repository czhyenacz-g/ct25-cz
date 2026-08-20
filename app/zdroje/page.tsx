import type { Metadata } from "next";
import { SITE_NAME } from "../config/site";
import { sourceCategories } from "../lib/sources";

export const metadata: Metadata = {
  title: "Zdroje a partnerské weby",
  description:
    "Nezávislí fact-checkeři, ověřovatelé a přehledy, se kterými web pracuje při dokládání případů manipulace.",
  alternates: { canonical: "/zdroje" },
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Zdroje a partnerské weby</h1>
      <p className="mt-4 text-gray-300">
        {SITE_NAME} nedělá vlastní fact-checking od nuly – opírá se o nezávislé ověřovatele a veřejně
        dostupné přehledy. Tady jsou ti, na které web nejčastěji odkazuje (viz i{" "}
        <a href="/redakcni-pravidla" className="text-accent underline">
          redakční pravidla
        </a>
        ). Seznam budeme postupně rozšiřovat.
      </p>

      <div className="mt-8 space-y-10">
        {sourceCategories.map((category) => (
          <section key={category.title}>
            <h2 className="text-xl font-semibold text-white">{category.title}</h2>
            <ul className="mt-4 space-y-4">
              {category.items.map((item) => (
                <li key={item.url} className="rounded-lg border border-line bg-surface p-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline hover:brightness-110"
                  >
                    {item.name}
                  </a>
                  <p className="mt-1 text-sm text-gray-400">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
