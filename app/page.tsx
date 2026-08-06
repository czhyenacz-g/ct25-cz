import Link from "next/link";
import AdSlot from "./components/ads/AdSlot";
import CaseCard from "./components/CaseCard";
import { documentedCases } from "./lib/cases";
import { CT25_PAGE_NAME, RELATED_SITE_NAME, RELATED_SITE_URL } from "./config/site";

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

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-warn/10 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
          <p className="mb-3 inline-block rounded-full bg-warn/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-warn">
            Informační upozornění
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Pozor na obsah šířený pod názvem ČT25
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Označení „ČT25“ používá na sociálních sítích stránka „{CT25_PAGE_NAME}“. Nejde o Českou
            televizi. Nezávislí ověřovatelé doložili u ní opakované zveřejňování zmanipulovaných
            fotografií a obsahu vytvořeného umělou inteligencí, který lze snadno zaměnit za skutečnost.
          </p>
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm text-gray-200 sm:text-base">
            <strong className="text-white">Tento web není spojen s Českou televizí ani s provozovateli
            stránky „{CT25_PAGE_NAME}“.</strong> Jeho cílem je upozorňovat na doložené informační
            manipulace a pomáhat čtenářům ověřovat zdroje.
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <AdSlot placement="after-hero" format="leaderboard" />
      </div>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Co je „ČT25“</h2>
        <div className="mt-4 space-y-4 text-gray-300">
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
            používání zmanipulovaných fotografií, fotomontáží a obsahu vytvořeného umělou inteligencí,
            který může čtenáře uvést v omyl. Konkrétní případy níže vždy odkazují na veřejně dostupný
            fact-check nezávislého ověřovatele.
          </p>
        </div>
      </section>

      <section id="pripady" className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Doložené případy manipulace</h2>
        <p className="mt-2 max-w-2xl text-gray-400">
          Přehled případů, u kterých nezávislý ověřovatel (primárně Demagog.cz) konkrétně potvrdil, že
          zmanipulovaný nebo zavádějící obsah šířila stránka „{CT25_PAGE_NAME}“. Přibývat budou další
          doložené případy.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {documentedCases.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <AdSlot placement="mid-content" format="rectangle" />
      </div>

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
        <h2 className="text-2xl font-bold text-white">O projektu</h2>
        <p className="mt-4 text-gray-300">
          Tento web vznikl jako nezávislá reakce na opakované šíření zmanipulovaného obsahu pod
          názvem připomínajícím Českou televizi. Nejde o zpravodajský portál ani o oficiální instituci
          – je to jednoduchý informační projekt, jehož cílem je shromažďovat doložené případy a
          usnadnit čtenářům ověřování zdrojů. Více na stránce{" "}
          <Link href="/o-projektu" className="text-accent underline">
            O projektu
          </Link>
          .
        </p>
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
