import { CONTACT_EMAIL } from "../config/site";

export const SUPPORTER_CONTACT_NAME = "Hynek Dařbujan";
// Nikdy osobní e-mail natvrdo v kódu — sdílená redakční adresa, stejný
// zdroj pravdy jako zbytek webu (viz app/config/site.ts, docs/LEGAL-TODO.md).
export const SUPPORTER_CONTACT_EMAIL = CONTACT_EMAIL;
export const SUPPORTER_EMAIL_SUBJECT = "Zájem o AI fotomontáž z ct25.cz";

/**
 * Sestaví mailto: odkaz s předvyplněným předmětem a tělem — ruční,
 * neautomatizovaná domluva (žádný formulář, žádný upload, žádná platba).
 * encodeURIComponent, ne URLSearchParams — mailto (RFC 6068) čeká
 * procentuálně kódované mezery, ne "+" z form-urlencoded.
 */
export function buildSupporterMailtoHref(selectedTemplateLabel?: string | null): string {
  const bodyLines = [
    selectedTemplateLabel
      ? `Vybral(a) jsem scénu: ${selectedTemplateLabel}.`
      : "Zatím jsem nevybral(a) konkrétní scénu.",
    "",
    "Mám zájem o dobrovolnou podporu provozu webu a ruční zpracování AI fotomontáže. Prosím o další informace k domluvení postupu.",
  ];

  const params = [
    `subject=${encodeURIComponent(SUPPORTER_EMAIL_SUBJECT)}`,
    `body=${encodeURIComponent(bodyLines.join("\n"))}`,
  ].join("&");

  return `mailto:${SUPPORTER_CONTACT_EMAIL}?${params}`;
}
