export type TemplateId = "pavelplus" | "putinplus";

export interface PhotoTemplate {
  id: TemplateId;
  label: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Předlohy pro /ai-fotka. Obrázky (pavelplus.png, putinplus.png) už existují
 * v Knihovně médií projektu sokujici-redakce (zpracované přes
 * ImageIngestionService na WebP) — schválně se nekopírují sem, jen se
 * odkazují absolutní URL na jejich existující umístění. Viz
 * next.config.ts (images.remotePatterns).
 */
export const photoTemplates: PhotoTemplate[] = [
  {
    id: "pavelplus",
    label: "Fotka s Petrem Pavlem",
    imageUrl:
      "https://redakce.sokujiciodhaleni.cz/media/articles/2026/08/344923ee-d2ce-4253-82da-f933d85f9b48.webp",
    alt: "Petr Pavel si potřásá rukou s postavou se siluetou a otazníkem místo obličeje — sem později přijde vaše fotografie",
    width: 1122,
    height: 1402,
  },
  {
    id: "putinplus",
    label: "Fotka s Vladimirem Putinem",
    imageUrl:
      "https://redakce.sokujiciodhaleni.cz/media/articles/2026/08/ddbeebfd-a016-4b47-b837-7d0f493e1b5c.webp",
    alt: "Vladimir Putin si potřásá rukou s postavou se siluetou a otazníkem místo obličeje — sem později přijde vaše fotografie",
    width: 1122,
    height: 1402,
  },
];

/**
 * Hotová ukázka výsledku (zelensky-putin.png) — stejný princip jako
 * photoTemplates výše: existující MediaAsset z Knihovny médií
 * sokujici-redakce, žádná lokální kopie.
 */
export const aiDemoImage = {
  imageUrl: "https://redakce.sokujiciodhaleni.cz/media/articles/2026/08/5d1cbef2-83d9-43b9-befe-4a07f4f41579.webp",
  alt: "AI fotomontáž: Vladimir Putin a Volodymyr Zelenskyj si potřásají rukou — fiktivní scéna vytvořená umělou inteligencí, k setkání nedošlo",
  width: 1122,
  height: 1402,
};
