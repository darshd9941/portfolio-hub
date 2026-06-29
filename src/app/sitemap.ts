import type { MetadataRoute } from "next";
import { campaigns } from "@/data/campaigns";
import { portfolioProjects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const campaignPages = campaigns.map((c) => ({
    url: `https://darsh.us/graphics/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workPages = portfolioProjects.map((project) => ({
    url: `https://darsh.us/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://darsh.us",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["work", "lab", "about", "contact"].map((page) => ({
      url: `https://darsh.us/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...workPages,
    ...campaignPages,
  ];
}
