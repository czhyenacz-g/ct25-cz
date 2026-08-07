export const SITE_NAME = "CT25.cz";
export const SITE_TAGLINE = "Varování před dezinformacemi";
export const SITE_TITLE = "Varování před dezinformacemi a manipulacemi ČT25";
export const SITE_DOMAIN = "ct25.cz";
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const SITE_DESCRIPTION =
  "Doložené případy nepravdivých tvrzení, fotomontáží a AI obsahu šířeného facebookovou stránkou „ČT25 – Pravda bez cenzury“. CT25.cz před touto stránkou varuje a nemá s ní ani s Českou televizí nic společného.";

export const CT25_PAGE_NAME = "ČT25 – Pravda bez cenzury";

export const RELATED_SITE_NAME = "ŠokujícíOdhalení.cz";
export const RELATED_SITE_URL = "https://sokujiciodhaleni.cz";

// Datum poslední redakční aktualizace obsahu homepage a případů.
export const LAST_CONTENT_UPDATE = "2026-08-06";

// Veřejný kontaktní e-mail pro podněty (app/poslat-podnet). Pokud není
// v produkci nastaven, stránka žádnou (ani placeholder) adresu nezobrazí
// — viz docs/LEGAL-TODO.md. Samostatná stránka /kontakt byla zrušena,
// obsah je teď na /o-projektu#kontakt (permanentní redirect v next.config.ts).
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

// Rozdělené na dvě části pro ObfuscatedEmail — kvůli ochraně před
// scrapery/boty se adresa nikdy nevykresluje jako jeden spojený řetězec
// v serverem generovaném HTML (viz app/components/ObfuscatedEmail.tsx).
const [CONTACT_EMAIL_USER_PART, CONTACT_EMAIL_DOMAIN_PART] = CONTACT_EMAIL.split("@");
export const CONTACT_EMAIL_USER = CONTACT_EMAIL_USER_PART || "";
export const CONTACT_EMAIL_DOMAIN = CONTACT_EMAIL_DOMAIN_PART || "";

export const NAV_LINKS = [
  { href: "/#pripady", label: "Doložené případy" },
  { href: "/#jak-poznat", label: "Jak poznat manipulaci" },
  { href: "/poslat-podnet", label: "Poslat podnět" },
  { href: "/o-projektu", label: "O projektu" },
  { href: "/fact-checker", label: "Fact-checker" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/o-projektu", label: "O projektu" },
  { href: "/poslat-podnet", label: "Poslat podnět" },
  { href: "/redakcni-pravidla", label: "Redakční pravidla" },
  { href: "/pravni-upozorneni", label: "Právní upozornění" },
  { href: "/ochrana-soukromi", label: "Ochrana soukromí" },
  { href: "/cookies", label: "Cookies" },
  { href: "/o-projektu#kontakt", label: "Kontakt" },
] as const;
