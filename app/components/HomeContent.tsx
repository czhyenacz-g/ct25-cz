import Link from "next/link";
import AdSlot from "./ads/AdSlot";
import CaseCard from "./CaseCard";
import ScrollToCase from "./ScrollToCase";
import { documentedCases } from "../lib/cases";
import { CT25_PAGE_NAME, RELATED_SITE_NAME, RELATED_SITE_URL } from "../config/site";

const spottingTips = [
  {
    title: "Nečekaná fotografie bez původního zdroje",
    description: "Snímek se objeví bez odkazu na to, kde a kdy vznikl, nebo kdo ho pořídil.",
  },
  {
    title: "Silně emocionální text",
    description: "Popisek cílí na hněv nebo strach místo na věcné informace.",
  },
  {
    title: "Falešná autorita",
    description: "Odkaz na blíže neurčené „zdroje“, „experty“ nebo „vnitřní informace“ bez jmen a ověřitelnosti.",
  },
  {
    title: "AI obraz nebo video",
    description: "Nepřirozené detaily, podivné ruce, nekonzistentní osvětlení nebo stíny, rozostřené pozadí.",
  },
  {
    title: "Tvrzení jen z anonymního příspěvku",
    description: "Zpráva se opírá výhradně o jiný neprověřený příspěvek na sociální síti, ne o médium nebo instituci.",
  },
];

const verificationSteps = [
  {
    title: "Najděte původní zdroj",
    description: "Zkuste dohledat, kde se fotografie nebo tvrzení objevilo poprvé a v jakém kontextu.",
  },
  {
    title: "Ověřte datum",
    description: "Stará fotografie nebo zpráva se často znovu šíří jako aktuální událost.",
  },
  {
    title: "Porovnejte více důvěryhodných médií",
    description: "Pokud o události nepíše žádné etablované zpravodajské médium, buďte obezřetní.",
  },
  {
    title: "Použijte fact-checking",
    description: "Podívejte se, zda tvrzení už neprověřil Demagog.cz nebo jiná nezávislá ověřovací organizace.",
  },
];

/**
 * Skutečný obsah titulní stránky — vykresluje jak `/` (app/page.tsx), tak
 * `/clanky/[slug]` (app/clanky/[slug]/page.tsx). Držet mimo `app/page.tsx`
 * záměrně: Next.js generuje striktní PageProps typ pro exportovaný default
 * z page.tsx a nedovolí mu přijímat vlastní `highlightSlug` prop.
 */
export default function HomeContent({ highlightSlug }: { highlightSlug?: string } = {}) {
  return (
    <>
      <ScrollToCase slug={highlightSlug} />
      <section className="border-b border-warn/30 bg-gradient-to-b from-warn/15 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
          <p className="mb-4 inline-block rounded-full border border-warn/50 bg-warn/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-warn">
            Informační varování
          </p>
          <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Pozor: facebooková stránka ČT25 šíří prokazatelně nepravdivý a manipulativní obsah
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Označení „ČT25“ používá na sociálních sítích stránka „{CT25_PAGE_NAME}“ – nejde o Českou
            televizi. Nezávislí fact-checkeři u ní doložili opakované šíření fotomontáží, nepravdivých
            tvrzení a AI obsahu, který lze zaměnit za skutečnost.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-bold text-warn sm:text-2xl">
            ČT25 manipuluje. Ověřujte, než budete sdílet.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-400 sm:text-base">
            Neplatí to jen pro ČT25. Ověřovat můžete jakékoli podezřelé tvrzení.
          </p>
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm text-gray-200 sm:text-base">
            <strong className="text-white">CT25.cz není spojen s Českou televizí ani s provozovateli
            facebookové stránky „{CT25_PAGE_NAME}“.</strong> Tento web před jejími doloženými
            manipulacemi varuje.
          </div>
          <a
            href="#pripady"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-ink hover:brightness-110"
          >
            Zobrazit doložené případy
          </a>
        </div>
      </section>

      <section id="pripady" className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Doložené případy manipulace</h2>
        <p className="mt-2 max-w-2xl text-gray-400">
          Přehled případů, u kterých nezávislý ověřovatel (primárně Demagog.cz) konkrétně potvrdil, že
          zmanipulovaný nebo zavádějící obsah šířila stránka „{CT25_PAGE_NAME}“. Přibývat budou další
          doložené případy.
        </p>
        <div className="mt-6 grid items-start gap-5 sm:grid-cols-2">
          {documentedCases.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <AdSlot placement="after-hero" format="leaderboard" />
      </div>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <details className="group rounded-lg border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Co je ČT25 a proč před ní tento web varuje?
            </h2>
            <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-gray-400 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="space-y-4 px-5 pb-5 text-gray-300">
            <p>
              „ČT25“ není program ani služba České televize. Je to název facebookové stránky
              „{CT25_PAGE_NAME}“, kterou provozuje blíže neznámý subjekt využívající zkratku
              připomínající veřejnoprávní televizi.
            </p>
            <p>
              Česká televize provozuje své vlastní, veřejně ověřitelné kanály a stránky. Stránka
              „{CT25_PAGE_NAME}“ s ní nemá žádné organizační ani obsahové spojení.
            </p>
            <p>
              Problém, na který tento web upozorňuje, není politický názor stránky, ale doložené
              používání zmanipulovaných fotografií, fotomontáží a obsahu vytvořeného umělou
              inteligencí, který může čtenáře uvést v omyl. Konkrétní případy výše vždy odkazují na
              veřejně dostupný fact-check nezávislého ověřovatele.
            </p>
          </div>
        </details>
      </section>

      <section id="jak-poznat" className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Jak manipulaci poznat</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {spottingTips.map((tip) => (
            <li key={tip.title} className="rounded-lg border border-line bg-surface p-4">
              <p className="font-semibold text-white">{tip.title}</p>
              <p className="mt-1 text-sm text-gray-400">{tip.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <AdSlot placement="mid-content" format="rectangle" />
      </div>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Jak postupovat před sdílením</h2>
        <ol className="mt-6 space-y-4">
          {verificationSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-lg border border-line bg-surface p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-white">{step.title}</p>
                <p className="mt-1 text-sm text-gray-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-lg border border-warn/40 bg-warn/10 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Narazili jste na podezřelý příspěvek ČT25?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Pošlete nám odkaz nebo screenshot. Tvrzení prověříme podle veřejně dostupných zdrojů.
            Pokud se manipulace potvrdí, můžeme před ní varovat další čtenáře.
          </p>
          <Link
            href="/poslat-podnet"
            className="mt-5 inline-block rounded-md bg-accent px-5 py-2.5 font-semibold text-ink hover:brightness-110"
          >
            Poslat podnět
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">O projektu</h2>
        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            CT25.cz vznikl jako veřejné varování před opakovaně doloženými manipulacemi šířenými pod
            názvem „{CT25_PAGE_NAME}“. Shromažďuje konkrétní případy, odkazuje na jejich nezávislé
            ověření a pomáhá čtenářům rozpoznat nepravdivý nebo zmanipulovaný obsah.
          </p>
          <p>
            Web nevydává každý nesouhlasný názor za dezinformaci. Zaměřuje se na konkrétní tvrzení,
            fotografie a videa, která lze ověřit pomocí veřejných zdrojů. Více na stránce{" "}
            <Link href="/o-projektu" className="text-accent underline">
              O projektu
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-lg border border-line bg-surface p-5 text-gray-300">
          Další ověřené rozbory a články najdete na{" "}
          <a href={RELATED_SITE_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">
            {RELATED_SITE_NAME}
          </a>
          .
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdSlot placement="before-footer" format="leaderboard" />
      </div>
    </>
  );
}
