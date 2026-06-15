import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sjagannathan17.github.io/portfolio";
  return [{ url: base, lastModified: new Date(), priority: 1 }];
}
