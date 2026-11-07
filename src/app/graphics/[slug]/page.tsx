import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suite } from "@/components/suite";
import { campaigns, getCampaignBySlug } from "@/data/campaigns";
import { sizeOf } from "@/data/image-sizes";
import { ratioOf } from "@/lib/formats";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return {};
  return {
    title: campaign.title,
    description: campaign.subtitle,
    openGraph: { images: [campaign.images[0]] },
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) notFound();

  const index = campaigns.findIndex((c) => c.slug === slug);
  const others = [...campaigns.slice(index + 1), ...campaigns.slice(0, index)];
  const [w, h] = sizeOf(campaign.images[0]);
  const ratios = [...new Set(campaign.images.map(ratioOf))].join(" · ");

  return (
    <Suite file={`BIN / CAMPAIGNS / ${campaign.slug.toUpperCase()}`}>
      <div className="track-campaign">
        <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 56px) 24px" }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="stack" style={{ gap: 14 }}>
              <Link className="text-link" href="/work?type=campaign" style={{ alignSelf: "flex-start" }}>← All campaigns</Link>
              <p className="label" style={{ color: "var(--track)" }}>● V1 · Campaign graphics · {campaign.category} · {String(index + 1).padStart(2, "0")} / {campaigns.length}</p>
              <h1 className="disp h1">{campaign.title.replace(/^Urbanspace /, "")}</h1>
              <p className="lede">{campaign.subtitle}</p>
            </div>
            <dl className="props-dl panel" style={{ minWidth: 260 }}>
              <dt>Client</dt><dd>Urban Space</dd>
              <dt>Frames</dt><dd>{campaign.images.length}</dd>
              <dt>Format</dt><dd>{ratios}</dd>
              <dt style={{ borderBottom: 0 }}>Master</dt><dd style={{ borderBottom: 0 }}>{w}×{h}</dd>
            </dl>
          </div>
        </section>

        <section className="wrap section">
          <div className="sheet">
            <div className="sheet-head">
              <span>CONTACT SHEET · {campaign.slug.toUpperCase()} · {campaign.images.length} FRAMES</span>
              <span>APPROVED ✓</span>
            </div>
            <div className="sheet-grid">
              {campaign.images.map((src, i) => {
                const [iw, ih] = sizeOf(src);
                return (
                  <figure className="frame" key={src}>
                    <Image
                      src={src}
                      alt={`${campaign.title} — frame ${i + 1} of ${campaign.images.length}`}
                      width={iw}
                      height={ih}
                      priority={i === 0}
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                    <figcaption>
                      <span>{String(i + 1).padStart(2, "0")}A</span>
                      <span>{ratioOf(src)} · {iw}×{ih}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        <section className="wrap section">
          <div className="trio">
            <div className="track-systems"><p className="label">◆ The brief</p><p>{campaign.problem}</p></div>
            <div className="track-campaign"><p className="label">◆ The idea</p><p>{campaign.solution}</p></div>
            <div className="track-play"><p className="label">◆ The impact</p><p>{campaign.impact}</p></div>
          </div>
          <div className="services" style={{ marginTop: 28 }}>
            {campaign.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>
      </div>

      <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap section-head" style={{ paddingTop: 24, marginBottom: 16 }}>
          <p className="label">Filmstrip · {others.length} more campaigns · scroll →</p>
          <Link className="text-link" href="/work?type=campaign">Open the bin</Link>
        </div>
        <div className="filmstrip">
          <div className="filmstrip-row">
            {others.map((c, i) => (
              <Link href={`/graphics/${c.slug}`} key={c.slug}>
                <Image src={c.images[0]} alt={c.title} width={170} height={220} sizes="170px" />
                <span>{String(i + 1).padStart(2, "0")} · {c.title.replace(/^Urbanspace /, "")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Suite>
  );
}
