import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://srinidhijagannathan.com";
  return [{ url: base, lastModified: new Date(), priority: 1 }];
}
