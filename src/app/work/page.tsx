import type { Metadata } from "next";
import { Suite } from "@/components/suite";
import { WorkBin, type BinItem } from "@/components/work-bin";
import { campaigns } from "@/data/campaigns";
import { portfolioProjects } from "@/data/portfolio";
import { ratioOf } from "@/lib/formats";

export const metadata: Metadata = { title: "Selected Work", description: "Campaign design, motion editing and creative systems by Darsh." };

const TYPE_LABEL = { motion: "Motion", campaign: "Campaign system", systems: "Systems / code" } as const;

export default async function WorkPage({ searchParams }: PageProps<"/work">) {
  const { type } = await searchParams;
  const initialFilter = type === "motion" || type === "campaign" || type === "systems" ? type : "all";

  const items: BinItem[] = [
    ...portfolioProjects.map((p) => ({
      key: p.slug,
      href: `/work/${p.slug}`,
      title: p.name,
      type: p.eyebrow.split(" / ")[0] ?? TYPE_LABEL[p.track],
      track: p.track,
      format: p.format,
      client: p.client,
      image: p.hero.type === "video" ? p.hero.poster ?? p.hero.src : p.hero.src,
      video: p.hero.type === "video" ? p.hero.src : undefined,
    })),
    ...campaigns.map((c) => ({
      key: `campaign-${c.slug}`,
      href: `/graphics/${c.slug}`,
      title: c.title.replace(/^Urbanspace /, ""),
      type: c.category,
      track: "campaign" as const,
      format: `${ratioOf(c.images[0])} · ${c.images.length} frames`,
      client: "Urban Space",
      image: c.images[0],
    })),
  ];

  return (
    <Suite file="BIN · SELECTED_WORK_2025—2026">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 64px) 28px" }}>
        <p className="label" style={{ marginBottom: 14 }}>Project bin · selected work 2025—2026</p>
        <h1 className="disp h1">Things I made when “make it pop” was the entire brief.</h1>
      </section>
      <WorkBin items={items} initialFilter={initialFilter} />
    </Suite>
  );
}
