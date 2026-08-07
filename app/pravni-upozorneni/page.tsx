import type { Metadata } from "next";
import { CT25_PAGE_NAME, LAST_CONTENT_UPDATE, SITE_NAME } from "../config/site";

export const metadata: Metadata = {
  title: "Právní upozornění",
  description: "Vymezení vztahu webu k České televizi a ke stránce ČT25 – Pravda bez cenzury.",
  alternates: { canonical: "/pravni-upozorneni" },
};

export default function LegalNoticePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Právní upozornění</h1>
      <p className="mt-2 text-sm text-gray-500">Aktualizováno: {LAST_CONTENT_UPDATE}</p>

      <div className="mt-6 space-y-5 text-gray-300">
        <p className="rounded-md border border-line bg-surface p-4 text-sm text-gray-400">
          Tento text je provozním návrhem odpovídajícím rozsahu první verze webu. Nejde o prohlášení
          o úplném souladu se všemi právními předpisy – doporučujeme kontrolu právníkem před plným
          komerčním provozem (viz <a href="/o-projektu#kontakt" className="text-accent underline">kontakt</a>).
        </p>

        <h2 className="text-xl font-semibold text-white">Vztah k třetím stranám</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>{SITE_NAME} není spojen s Českou televizí ani žádným jejím pracovištěm či pořadem.</li>
          <li>
            {SITE_NAME} není spojen s facebookovou stránkou „{CT25_PAGE_NAME}“ ani s jejími
            provozovateli.
          </li>
          <li>
            Názvy, značky a odkazy na třetí strany uvádíme výhradně za účelem identifikace a věcné,
            veřejné kritiky doložených jednání – nejde o jejich propagaci ani napodobování.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white">Zdroje a přesnost</h2>
        <p>
          Konkrétní hodnocení jednotlivých případů jsou založena na uvedených veřejných zdrojích,
          zejména na fact-checích nezávislých ověřovatelů. Obsah může být aktualizován při získání
          nových informací nebo na základě odůvodněné reakce třetí strany.
        </p>
        <p>
          Za obsah externích webů, na které tento web odkazuje, odpovídají jejich provozovatelé.
        </p>

        <h2 className="text-xl font-semibold text-white">Žádost o opravu nebo reakci</h2>
        <p>
          Postup pro zaslání opravy, reakce nebo žádosti o aktualizaci obsahu bude plně funkční, jakmile
          bude doplněn kontaktní e-mail – aktuální stav najdete na stránce{" "}
          <a href="/o-projektu#kontakt" className="text-accent underline">
            kontakt
          </a>
          .
        </p>
      </div>
    </div>
  );
}
