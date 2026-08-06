import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_EMAIL_DOMAIN, CONTACT_EMAIL_USER, CT25_PAGE_NAME } from "../config/site";
import ObfuscatedEmail from "../components/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Poslat podnět",
  description: "Jak nám poslat podezřelý příspěvek šířený pod označením ČT25 k prověření.",
  alternates: { canonical: "/poslat-podnet" },
};

export default function ReportTipPage() {
  const isDev = process.env.NODE_ENV !== "production";
  const subject = "Podnět k prověření – ČT25";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Narazili jste na podezřelý příspěvek ČT25?</h1>
      <p className="mt-4 text-gray-300">
        Pošlete nám odkaz nebo screenshot příspěvku stránky „{CT25_PAGE_NAME}“, který vám připadá
        zmanipulovaný nebo nepravdivý. Tvrzení prověříme podle veřejně dostupných zdrojů. Pokud se
        manipulace potvrdí, můžeme před ní varovat další čtenáře a přidat ji do přehledu doložených
        případů.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-white">Co nám napsat</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-300">
        <li>Odkaz na původní příspěvek (nebo alespoň jméno a datum, pokud odkaz nefunguje).</li>
        <li>Datum, kdy jste příspěvek viděli.</li>
        <li>Stručné vysvětlení, co vám na něm připadá podezřelé.</li>
        <li>Screenshot – volitelně, pokud odkaz později zmizí (zatím jen jako příloha e-mailu).</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-white">Jak podnět poslat</h2>
      {CONTACT_EMAIL ? (
        <p className="mt-3">
          Napište nám na{" "}
          <ObfuscatedEmail user={CONTACT_EMAIL_USER} domain={CONTACT_EMAIL_DOMAIN} subject={subject} />{" "}
          a přiložte odkaz nebo screenshot a informace uvedené výše.
        </p>
      ) : isDev ? (
        <p className="mt-3 rounded-md border border-dashed border-line bg-surface p-4 text-sm text-gray-400">
          Vývojový placeholder: proměnná <code>NEXT_PUBLIC_CONTACT_EMAIL</code> není nastavena. Na
          produkci se v tomto stavu nezobrazí žádný e-mail – podívejte se na stránku{" "}
          <Link href="/kontakt" className="text-accent underline">
            kontakt
          </Link>{" "}
          pro aktuální stav.
        </p>
      ) : (
        <p className="mt-3 rounded-md border border-line bg-surface p-4 text-sm text-gray-400">
          Funkční kontaktní e-mail pro podněty bude na této stránce doplněn v nejbližší době. Aktuální
          stav kontaktu najdete na stránce{" "}
          <Link href="/kontakt" className="text-accent underline">
            kontakt
          </Link>
          .
        </p>
      )}
    </div>
  );
}
