import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaBlock } from "@/components/media-block";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { portfolioProjects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Selected Work", description: "Campaign design, motion editing and creative systems by Darsh." };

export default function WorkPage() {
  return (
    <main className="portfolio-site work-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="kicker">Selected work / 2025—2026</p>
        <h1>Things I made when “make it pop” was somehow the entire brief.</h1>
        <p>Campaign systems, motion edits and creative-production experiments. The archive will grow; the standards will remain annoyingly high.</p>
      </section>
      <section className="work-grid">
        {portfolioProjects.map((project, index) => (
          <Link className={`work-card project-${project.accent}`} href={`/work/${project.slug}`} key={project.slug}>
            <div className="work-card-media"><MediaBlock media={project.hero} /></div>
            <div className="work-card-copy"><span>0{index + 1} / {project.year}</span><p>{project.eyebrow}</p><h2>{project.title}</h2><ArrowUpRight size={24} /></div>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
