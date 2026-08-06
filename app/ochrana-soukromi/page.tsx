import type { Metadata } from "next";
import { LAST_CONTENT_UPDATE, SITE_NAME } from "../config/site";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Jaká data web zpracovává a jak nakládá s cookies.",
  alternates: { canonical: "/ochrana-soukromi" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Ochrana soukromí</h1>
      <p className="mt-2 text-sm text-gray-500">Aktualizováno: {LAST_CONTENT_UPDATE}</p>

      <div className="mt-6 space-y-5 text-gray-300">
        <p className="rounded-md border border-line bg-surface p-4 text-sm text-gray-400">
          Tento text je provozním návrhem popisujícím skutečně nasazené technologie k datu poslední
          aktualizace výše. Nejde o garantovaně právně kompletní dokument – před plným komerčním
          spuštěním jej doporučujeme nechat zkontrolovat podle skutečného provozovatele a případných
          nově nasazených nástrojů (viz <a href="/kontakt" className="text-accent underline">kontakt</a>).
        </p>

        <h2 className="text-xl font-semibold text-white">Co web nedělá</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>{SITE_NAME} nemá registraci ani uživatelské účty.</li>
          <li>Web nemá databázi ani redakční systém – obsah je součástí zdrojového kódu.</li>
          <li>Bez vašeho souhlasu se nenačítá žádná analytika ani reklamní skript.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">Jaká data se zpracovávají</h2>
        <p>
          Vaše volba v nastavení cookies (kategorie necessary/analytics/marketing) se ukládá pouze ve
          vašem prohlížeči (<code>localStorage</code>), ne na serveru, a nespojujeme ji s žádnou
          identitou.
        </p>
        <p>
          Pokud udělíte souhlas s analytickými cookies, může se načíst souhrnná analytika návštěvnosti
          (Vercel Analytics, případně GoatCounter). Bez tohoto souhlasu se nic z toho nenačítá – viz{" "}
          <a href="/cookies" className="text-accent underline">
            přehled cookies
          </a>
          .
        </p>
        <p>
          Jako u každého webu hostovaného na Vercelu vznikají standardní technické provozní záznamy
          (např. IP adresa, čas požadavku) na straně poskytovatele hostingu, a to i bez souhlasu s
          cookies – jde o běžný provoz serverové infrastruktury, ne o sledování napříč weby.
        </p>

        <h2 className="text-xl font-semibold text-white">Reklama</h2>
        <p>
          Web má propojený účet Google AdSense. Po souhlasu s marketingovými cookies se načte pouze
          jeho ověřovací account script (potvrzení vlastnictví domény) – v žádném reklamním prostoru na
          webu se ale zatím nezobrazuje žádná konkrétní reklamní jednotka. Bez souhlasu se tento skript
          nenačítá. Jakmile přibudou skutečné reklamní jednotky, tento text aktualizujeme.
        </p>

        <h2 className="text-xl font-semibold text-white">Vaše práva</h2>
        <p>
          Svou volbu ohledně cookies můžete kdykoli změnit přes odkaz „Nastavení cookies“ v patičce
          webu. S dotazy k ochraně soukromí se můžete obrátit na{" "}
          <a href="/kontakt" className="text-accent underline">
            kontakt
          </a>
          .
        </p>
      </div>
    </div>
  );
}
