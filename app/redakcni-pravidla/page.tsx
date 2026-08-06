import type { Metadata } from "next";
import { LAST_CONTENT_UPDATE, SITE_NAME } from "../config/site";

export const metadata: Metadata = {
  title: "Redakční pravidla",
  description: "Jakou metodikou web vybírá a popisuje doložené případy manipulace.",
  alternates: { canonical: "/redakcni-pravidla" },
};

export default function EditorialRulesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Redakční pravidla</h1>
      <p className="mt-2 text-sm text-gray-500">Aktualizováno: {LAST_CONTENT_UPDATE}</p>

      <div className="mt-6 space-y-5 text-gray-300">
        <p>{SITE_NAME} se při zařazování a popisu případů řídí těmito pravidly:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Každý uvedený případ musí mít odkaz na veřejně dostupný fact-check nezávislého ověřovatele.</li>
          <li>Preferujeme primární fact-checkingové zdroje, zejména Demagog.cz.</li>
          <li>Nepoužíváme jako zdroj anonymní komentáře, neprověřené účty ani nekvalitní agregátory.</li>
          <li>Shrnutí případů píšeme vlastními slovy; nepřebíráme rozsáhle cizí text ani chráněné obrázky.</li>
          <li>
            Neuvádíme tvrzení, která přesahují to, co konkrétní zdroj doložil (např. o financování,
            řízení ze zahraničí nebo trestné činnosti), pokud to není podloženo.
          </li>
          <li>Při zjištění nové informace nebo důvodné reakce třetí strany obsah aktualizujeme.</li>
        </ul>
        <p>
          Tato pravidla se vztahují na sekci doložených případů na hlavní stránce. Web nemá redakční
          systém ani placené autory – jde o jednoduchý informační projekt udržovaný přímo ve zdrojovém
          kódu.
        </p>
      </div>
    </div>
  );
}
