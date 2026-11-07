import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyVideo } from "@/components/lazy-video";
import { Suite } from "@/components/suite";
import { sizeOf } from "@/data/image-sizes";
import { getPortfolioProject, portfolioProjects, type PortfolioMedia } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  return project ? { title: project.name, description: project.summary } : {};
}

const TRACK_LABEL = { motion: "V2 · Motion", campaign: "V1 · Campaign", systems: "V3 · Systems" } as const;

function stillOf(media: PortfolioMedia) {
  return media.type === "video" ? media.poster ?? media.src : media.src;
}

function Media({ media, sizes }: { media: PortfolioMedia; sizes: string }) {
  if (media.type === "video") {
    return <LazyVideo src={media.src} poster={media.poster} label={media.alt} controls />;
  }
  const [width, height] = sizeOf(media.src);
  return <Image src={media.src} alt={media.alt} width={width} height={height} sizes={sizes} style={{ width: "100%", height: "auto" }} />;
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const index = portfolioProjects.findIndex((item) => item.slug === slug);
  const next = portfolioProjects[(index + 1) % portfolioProjects.length];
  const seq = String(index + 1).padStart(2, "0");
  const wide = !(project.format.startsWith("9:16") || project.format.startsWith("4:5"));
  const extras = project.media.filter((m) => m.src !== project.hero.src);

  return (
    <Suite file={`SEQ_${seq} · ${project.name.toUpperCase().replace(/ /g, "_")}`}>
      <div className={`track-${project.track}`}>
        <section className="wrap case-hero">
          <div className="stack">
            <Link className="text-link" href="/work" style={{ alignSelf: "flex-start" }}>← Back to the bin</Link>
            <p className="label" style={{ color: "var(--track)" }}>● {TRACK_LABEL[project.track]} · {project.eyebrow}</p>
            <h1 className="disp h1">{project.name}</h1>
            <p className="disp" style={{ margin: 0, fontSize: "clamp(24px, 2.6vw, 40px)", color: "var(--muted)" }}>{project.title}</p>
            <p className="lede">{project.summary}</p>
          </div>
          <div className={`viewer${wide ? " is-wide" : ""}`} style={wide ? { maxWidth: 600 } : undefined}>
            <Media media={project.hero} sizes="(max-width: 860px) 100vw, 40vw" />
          </div>
        </section>

        <section className="wrap section">
          <div className="info-strip">
            <div><p className="label">Client</p><p>{project.client}</p></div>
            <div><p className="label">Track</p><p>{TRACK_LABEL[project.track]}</p></div>
            <div><p className="label">Format</p><p>{project.format}</p></div>
            <div><p className="label">Year</p><p>{project.year}</p></div>
            <div style={{ gridColumn: "span 2" }}><p className="label">Toolkit</p><p>{project.services.join(" · ")}</p></div>
          </div>
        </section>

        <section className="wrap section">
          <div className="section-head">
            <div>
              <p className="label">Markers · how it came together</p>
              <h2 className="disp h2">Challenge → Approach → Contribution</h2>
            </div>
          </div>
          <div className="markers">
            <div className="marker-item track-systems"><p className="label">00:00 · Challenge</p><p>{project.challenge}</p></div>
            <div className="marker-item track-campaign"><p className="label">00:15 · Approach</p><p>{project.approach}</p></div>
            <div className="marker-item track-play"><p className="label">00:30 · Contribution</p><p>{project.contribution}</p></div>
          </div>
        </section>

        {extras.length > 0 && (
          <section className="wrap section">
            <div className="section-head">
              <div>
                <p className="label">Export settings · deliverables</p>
                <h2 className="disp h2">One idea, every frame</h2>
              </div>
              <p className="label">{extras.length + 1} outputs from this sequence</p>
            </div>
            <div className="deliverables">
              {extras.map((media, i) => (
                <figure key={`${media.src}-${i}`}>
                  <Media media={media} sizes="(max-width: 860px) 100vw, 33vw" />
                  <figcaption>{String(i + 2).padStart(2, "0")} · {media.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.track === "systems" && (
          <section className="wrap section">
            <div className="cta">
              <div>
                <p className="label">The tools themselves</p>
                <h2 className="disp">See every preset in the Lab</h2>
              </div>
              <Link className="btn btn-primary" href="/lab">Open the Lab →</Link>
            </div>
          </section>
        )}
      </div>

      <Link className="upnext" href={`/work/${next.slug}`}>
        <Image src={stillOf(next.hero)} alt="" fill sizes="100vw" />
        <div className="wrap">
          <p className="label" style={{ color: "var(--text)" }}>Up next on the timeline · SEQ_{String(((index + 1) % portfolioProjects.length) + 1).padStart(2, "0")}</p>
          <p className="disp">{next.name} →</p>
        </div>
      </Link>
    </Suite>
  );
}
