import type { Metadata } from "next";
import { LAST_CONTENT_UPDATE } from "../config/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Přehled kategorií cookies a jak si upravit souhlas.",
  alternates: { canonical: "/cookies" },
};

const categories = [
  {
    title: "Nezbytné",
    status: "Vždy aktivní",
    description:
      "Slouží jen k uložení vaší volby souhlasu s cookies v tomto prohlížeči (localStorage). Bez nich by se banner se souhlasem zobrazoval opakovaně. Nelze vypnout.",
  },
  {
    title: "Analytické",
    status: "Výchozí: vypnuto",
    description:
      "Souhrnná, anonymizovaná statistika návštěvnosti (Vercel Analytics, případně GoatCounter). Skripty se načtou až po vašem souhlasu.",
  },
  {
    title: "Marketingové",
    status: "Výchozí: vypnuto",
    description:
      "Zatím web nenačítá žádnou reklamní síť. Kategorie je připravena pro budoucí použití (např. Google AdSense) – i tehdy se skripty načtou až po souhlasu.",
  },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Cookies</h1>
      <p className="mt-2 text-sm text-gray-500">Aktualizováno: {LAST_CONTENT_UPDATE}</p>

      <p className="mt-6 text-gray-300">
        Souhlas můžete kdykoli změnit přes odkaz „Nastavení cookies“ v patičce webu.
      </p>

      <div className="mt-6 space-y-4">
        {categories.map((cat) => (
          <div key={cat.title} className="rounded-lg border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">{cat.title}</h2>
              <span className="text-xs text-gray-500">{cat.status}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{cat.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Podrobnosti o zpracování dat najdete v{" "}
        <a href="/ochrana-soukromi" className="text-accent underline">
          ochraně soukromí
        </a>
        .
      </p>
    </div>
  );
}
