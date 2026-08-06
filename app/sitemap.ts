import type { MetadataRoute } from "next";
import { SITE_URL } from "./config/site";

const routes = [
  "",
  "/o-projektu",
  "/kontakt",
  "/ochrana-soukromi",
  "/cookies",
  "/pravni-upozorneni",
  "/redakcni-pravidla",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}
