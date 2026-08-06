export const SITE_NAME = "CT25.cz";
export const SITE_TITLE = "Pozor na obsah šířený pod názvem ČT25";
export const SITE_DOMAIN = "ct25.cz";
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const SITE_DESCRIPTION =
  "Facebooková stránka „ČT25 – Pravda bez cenzury“ nemá nic společného s Českou televizí. Nezávislí ověřovatelé u ní doložili opakované šíření zmanipulovaných fotografií a obsahu vytvořeného umělou inteligencí. Přehled doložených případů a návod, jak manipulaci poznat.";

export const CT25_PAGE_NAME = "ČT25 – Pravda bez cenzury";

export const RELATED_SITE_NAME = "ŠokujícíOdhalení.cz";
export const RELATED_SITE_URL = "https://sokujiciodhaleni.cz";

// Datum poslední redakční aktualizace obsahu homepage a případů.
export const LAST_CONTENT_UPDATE = "2026-08-06";

// Veřejný kontaktní e-mail. Pokud není v produkci nastaven, stránka
// /kontakt nezobrazí žádnou (ani placeholder) adresu — viz docs/LEGAL-TODO.md.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export const NAV_LINKS = [
  { href: "/#pripady", label: "Doložené případy" },
  { href: "/#jak-poznat", label: "Jak poznat manipulaci" },
  { href: "/o-projektu", label: "O projektu" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/o-projektu", label: "O projektu" },
  { href: "/redakcni-pravidla", label: "Redakční pravidla" },
  { href: "/pravni-upozorneni", label: "Právní upozornění" },
  { href: "/ochrana-soukromi", label: "Ochrana soukromí" },
  { href: "/cookies", label: "Cookies" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
