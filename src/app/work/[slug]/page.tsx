import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MediaBlock } from "@/components/media-block";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { getPortfolioProject, portfolioProjects } from "@/data/portfolio";

export function generateStaticParams() { return portfolioProjects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function WorkDetailPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  const index = portfolioProjects.findIndex((item) => item.slug === slug);
  const next = portfolioProjects[(index + 1) % portfolioProjects.length];
  return (
    <main className={`portfolio-site case-page project-${project.accent}`}>
      <SiteHeader />
      <section className="case-heading">
        <Link className="back-link" href="/work"><ArrowLeft size={15} /> All work</Link>
        <p className="kicker">{project.eyebrow} / {project.year}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p>
        <div className="case-services">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
      </section>
      <section className="case-hero-media"><MediaBlock media={project.hero} controls={project.hero.type === "video"} /></section>
      <section className="case-story">
        <div><p className="kicker">01 / Challenge</p><p>{project.challenge}</p></div>
        <div><p className="kicker">02 / Approach</p><p>{project.approach}</p></div>
        <div><p className="kicker">03 / Contribution</p><p>{project.contribution}</p></div>
      </section>
      <section className="case-gallery">
        {project.media.map((media, mediaIndex) => <div className={media.type === "video" ? "gallery-video" : "gallery-image"} key={`${media.src}-${mediaIndex}`}><MediaBlock media={media} controls={media.type === "video"} /></div>)}
      </section>
      <Link className="next-project" href={`/work/${next.slug}`}><span>Next project</span><strong>{next.title}</strong><ArrowUpRight size={34} /></Link>
      <SiteFooter />
    </main>
  );
}
