import type { MetadataRoute } from "next";
import { SITE_URL } from "./config/site";
import { documentedCases } from "./lib/cases";

const routes = [
  "",
  "/o-projektu",
  "/poslat-podnet",
  "/fact-checker",
  "/ochrana-soukromi",
  "/cookies",
  "/pravni-upozorneni",
  "/redakcni-pravidla",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.5,
  }));

  // Stejný zdroj dat jako titulní stránka a route /clanky/[slug] — žádné
  // ruční duplikování slugů.
  const caseEntries: MetadataRoute.Sitemap = documentedCases.map((item) => ({
    url: `${SITE_URL}/clanky/${item.slug}`,
    lastModified: new Date(item.verifiedDate),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseEntries];
}
