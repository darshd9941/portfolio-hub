import { campaigns, getCampaignBySlug } from "@/data/campaigns";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return {};
  return {
    title: `${campaign.title} — Darsh.us`,
    description: campaign.subtitle,
  };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f0e8]">
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          className="font-mono text-sm uppercase tracking-[0.18em] text-[#f5f0e8] transition hover:text-[#6affcc]"
          href="/"
        >
          Darsh.us
        </Link>
        <Link
          className="inline-flex h-10 items-center gap-2 rounded-md border border-[#f5f0e8]/18 bg-[#f5f0e8]/7 px-4 text-sm text-[#bdb4aa] transition hover:border-[#6affcc] hover:text-[#6affcc]"
          href="/#graphics"
        >
          <ArrowLeft size={16} />
          Back to Graphics
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-[#6affcc] px-3 py-1 text-xs font-bold text-[#06120f]">
            {campaign.category}
          </span>
        </div>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.95] text-[#f5f0e8] sm:text-7xl">
          {campaign.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#bdb4aa]">
          {campaign.subtitle}
        </p>
      </section>

      {/* Hero Image */}
      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
        <div className="overflow-hidden rounded-lg">
          <img
            src={campaign.images[0]}
            alt={campaign.title}
            className="w-full object-cover"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </section>

      {/* Problem / Solution / Impact */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-3">
        <div className="rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#ff8b70]">
            The Problem
          </p>
          <p className="mt-4 leading-7 text-[#bdb4aa]">{campaign.problem}</p>
        </div>
        <div className="rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#6affcc]">
            Our Solution
          </p>
          <p className="mt-4 leading-7 text-[#bdb4aa]">{campaign.solution}</p>
        </div>
        <div className="rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#ff8b70]">
            The Impact
          </p>
          <p className="mt-4 leading-7 text-[#bdb4aa]">{campaign.impact}</p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
          Creative Work
        </p>
        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Campaign visuals
        </h2>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {campaign.images.slice(1).map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-lg ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <img
                src={src}
                alt={`${campaign.title} ${i + 2}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="border-t border-[#f5f0e8]/10 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {campaign.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#f5f0e8]/16 bg-[#f5f0e8]/5 px-4 py-2 text-sm text-[#bdb4aa]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f5f0e8]/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl justify-between text-sm text-[#8d867e]">
          <span>Darsh.us / graphics work</span>
          <Link className="transition hover:text-[#6affcc]" href="/#graphics">
            View all campaigns
          </Link>
        </div>
      </footer>
    </main>
  );
}
