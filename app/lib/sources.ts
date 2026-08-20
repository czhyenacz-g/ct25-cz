export interface SourceLink {
  name: string;
  url: string;
  description: string;
}

export interface SourceCategory {
  title: string;
  items: SourceLink[];
}

/**
 * Zdroje a partnerské weby zobrazené na /zdroje — nezávislí ověřovatelé a
 * přehledy, se kterými web pracuje při dokládání případů (viz
 * docs/SOURCES.md a app/lib/cases.ts). Seznam se bude postupně rozšiřovat.
 */
export const sourceCategories: SourceCategory[] = [
  {
    title: "Nezávislí fact-checkeři a ověřovatelé",
    items: [
      {
        name: "Demagog.cz",
        url: "https://demagog.cz",
        description:
          "Primární fact-checkingový zdroj pro většinu doložených případů na tomto webu – ověřuje konkrétní příspěvky, fotografie a tvrzení šířená stránkou „ČT25 – Pravda bez cenzury“.",
      },
      {
        name: "investigace.cz",
        url: "https://www.investigace.cz",
        description:
          "Nezávislé investigativní médium. Zdroj pro případy mimo běžný záběr klasického fact-checkingu, např. dezinformační kanály mimo Facebook (Telegram, weby).",
      },
    ],
  },
  {
    title: "Přehledy a databáze",
    items: [
      {
        name: "Seznam dezinformačních webů v češtině",
        url: "https://cs.wikipedia.org/wiki/Seznam_dezinformačních_webů_v_češtině",
        description:
          "Wikipedie – přehled webů, které se dlouhodobě opakovaně objevují v souvislosti se šířením dezinformací v češtině.",
      },
    ],
  },
];
