import type { MetadataRoute } from "next";
import { campaigns } from "@/data/campaigns";

export default function sitemap(): MetadataRoute.Sitemap {
  const campaignPages = campaigns.map((c) => ({
    url: `https://darsh.us/graphics/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://darsh.us",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...campaignPages,
  ];
}
