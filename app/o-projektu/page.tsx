import type { Metadata } from "next";
import { CT25_PAGE_NAME, LAST_CONTENT_UPDATE, RELATED_SITE_NAME, RELATED_SITE_URL, SITE_NAME } from "../config/site";

export const metadata: Metadata = {
  title: "O projektu",
  description: `Co je ${SITE_NAME}, proč vznikl a jakou metodikou vybírá doložené případy manipulace šířené pod názvem ČT25.`,
  alternates: { canonical: "/o-projektu" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">O projektu</h1>
      <p className="mt-2 text-sm text-gray-500">Aktualizováno: {LAST_CONTENT_UPDATE}</p>

      <div className="mt-6 space-y-5 text-gray-300">
        <p>
          {SITE_NAME} vznikl jako veřejné varování před opakovaně doloženými manipulacemi šířenými
          pod názvem „{CT25_PAGE_NAME}“. Shromažďuje konkrétní případy, odkazuje na jejich nezávislé
          ověření a pomáhá čtenářům rozpoznat nepravdivý nebo zmanipulovaný obsah.
        </p>
        <p>
          Web nevydává každý nesouhlasný názor za dezinformaci. Zaměřuje se na konkrétní tvrzení,
          fotografie a videa, která lze ověřit pomocí veřejných zdrojů.
        </p>
        <p>
          <strong className="text-white">
            Tento web není spojen s Českou televizí ani s provozovateli stránky „{CT25_PAGE_NAME}“.
          </strong>{" "}
          Jména a názvy třetích stran na webu uvádíme pouze za účelem identifikace a veřejné kritiky
          konkrétních, doložených jednání.
        </p>

        <h2 className="text-xl font-semibold text-white">Jak vybíráme případy</h2>
        <p>
          Do přehledu doložených případů zařazujeme pouze konkrétní příspěvky nebo fotografie, ke
          kterým existuje veřejně dostupný fact-check nezávislého ověřovatele – především Demagog.cz,
          případně dalších kvalitních fact-checkingových organizací – a který danou manipulaci přímo
          přiřazuje stránce „{CT25_PAGE_NAME}“. Nepoužíváme jako zdroj anonymní komentáře ani
          nekvalitní agregátory. Ke každému případu je uveden typ manipulace, datum ověření a odkaz na
          zdroj.
        </p>
        <p>
          Web netvrdí nic, co by přesahovalo doložená fakta – neuvádíme například, kdo konkrétně
          stránku provozuje, ani nepodložená tvrzení o financování či trestné činnosti. Podrobnosti k
          tomu, co web z principu neuvádí, najdete v{" "}
          <a href="/pravni-upozorneni" className="text-accent underline">
            právním upozornění
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-white">Současný stav</h2>
        <p>
          Jde o první, jednoduchou verzi webu bez registrace uživatelů a bez redakčního systému.
          Obsah je udržován přímo v kódu webu a bude postupně rozšiřován o další doložené případy.
          Informace o provozovateli budou doplněny před plným komerčním spuštěním webu – viz{" "}
          <a href="/kontakt" className="text-accent underline">
            kontakt
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-white">Souvislost se ŠokujícíOdhalení.cz</h2>
        <p>
          {SITE_NAME} je samostatný projekt, nikoli přesměrování. Další ověřené rozbory a články
          věnované dezinformacím a mediálním manipulacím najdete na{" "}
          <a href={RELATED_SITE_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">
            {RELATED_SITE_NAME}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
