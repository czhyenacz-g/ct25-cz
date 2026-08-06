import type { Metadata } from "next";
import { CONTACT_EMAIL, CONTACT_EMAIL_DOMAIN, CONTACT_EMAIL_USER, SITE_NAME } from "../config/site";
import ObfuscatedEmail from "../components/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Jak nás kontaktovat s opravou, reakcí nebo žádostí o aktualizaci obsahu.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Kontakt</h1>
      <div className="mt-6 space-y-5 text-gray-300">
        <p>
          Pokud máte k obsahu {SITE_NAME} opravu, reakci třetí strany nebo žádost o aktualizaci
          konkrétní informace, napište nám. Každý podnět, který se opírá o věcné argumenty nebo zdroj,
          posoudíme a v odůvodněných případech obsah upravíme.
        </p>

        {CONTACT_EMAIL ? (
          <p>
            E-mail: <ObfuscatedEmail user={CONTACT_EMAIL_USER} domain={CONTACT_EMAIL_DOMAIN} />
          </p>
        ) : isDev ? (
          <p className="rounded-md border border-dashed border-line bg-surface p-4 text-sm text-gray-400">
            Vývojový placeholder: proměnná <code>NEXT_PUBLIC_CONTACT_EMAIL</code> není nastavena. Na
            produkci se v tomto stavu žádný kontaktní e-mail nezobrazuje.
          </p>
        ) : (
          <p className="rounded-md border border-line bg-surface p-4 text-sm text-gray-400">
            Funkční kontaktní e-mail bude na této stránce doplněn v nejbližší době. Do té doby prosím
            zkuste kontakt znovu později.
          </p>
        )}

        <p className="text-sm text-gray-500">
          Informace o provozovateli webu budou zveřejněny před plným komerčním spuštěním – viz{" "}
          <a href="/o-projektu" className="text-accent underline">
            O projektu
          </a>
          .
        </p>
      </div>
    </div>
  );
}
