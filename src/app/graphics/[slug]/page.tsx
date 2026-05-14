import { campaigns, getCampaignBySlug } from "@/data/campaigns";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const currentIndex = campaigns.findIndex((c) => c.slug === slug);
  const nextCampaign = campaigns[(currentIndex + 1) % campaigns.length];
  const prevCampaign =
    campaigns[(currentIndex - 1 + campaigns.length) % campaigns.length];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f0e8]">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#f5f0e8]/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            className="font-mono text-sm uppercase tracking-[0.18em] text-[#f5f0e8] transition hover:text-[#6affcc]"
            href="/"
          >
            Darsh.us
          </Link>
          <div className="flex items-center gap-6">
            <span className="hidden font-mono text-xs text-[#8d867e] sm:block">
              {String(currentIndex + 1).padStart(2, "0")} / {String(campaigns.length).padStart(2, "0")}
            </span>
            <Link
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#f5f0e8]/18 px-3 text-sm text-[#bdb4aa] transition hover:border-[#6affcc] hover:text-[#6affcc]"
              href="/#graphics"
            >
              <ArrowLeft size={14} />
              All campaigns
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — full bleed */}
      <section className="relative">
        <div className="aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8]">
          <img
            src={campaign.images[0]}
            alt={campaign.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 w-full px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="rounded-md bg-[#6affcc] px-3 py-1 text-xs font-bold text-[#06120f]">
              {campaign.category}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-[0.95] text-[#f5f0e8] sm:text-6xl lg:text-7xl">
              {campaign.title}
            </h1>
            <p className="mt-3 max-w-xl text-base text-[#bdb4aa] sm:text-lg">
              {campaign.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Problem → Solution → Impact */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1px_1fr_1px_1fr]">
          {/* Problem */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6a4a]/15 font-mono text-sm text-[#ff8b70]">
                1
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#ff8b70]">
                The Problem
              </span>
            </div>
            <p className="text-base leading-7 text-[#bdb4aa]">
              {campaign.problem}
            </p>
          </div>

          <div className="hidden bg-[#f5f0e8]/10 lg:block" />

          {/* Solution */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6affcc]/15 font-mono text-sm text-[#6affcc]">
                2
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#6affcc]">
                Our Solution
              </span>
            </div>
            <p className="text-base leading-7 text-[#bdb4aa]">
              {campaign.solution}
            </p>
          </div>

          <div className="hidden bg-[#f5f0e8]/10 lg:block" />

          {/* Impact */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6a4a]/15 font-mono text-sm text-[#ff8b70]">
                3
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#ff8b70]">
                The Impact
              </span>
            </div>
            <p className="text-base leading-7 text-[#bdb4aa]">
              {campaign.impact}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery — masonry-like layout */}
      <section className="border-t border-[#f5f0e8]/10 bg-[#0b0b0b] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
            Creative assets
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            The work
          </h2>
          <p className="mt-3 max-w-xl text-[#8d867e]">
            Visuals designed for this campaign across platforms and formats.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaign.images.map((src, i) => (
              <div
                key={i}
                className={`group overflow-hidden rounded-lg border border-[#f5f0e8]/8 transition hover:border-[#6affcc]/40 ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`${campaign.title} — visual ${i + 1}`}
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8d867e]">
            Skills & tools
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {campaign.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-4 py-2 text-sm text-[#bdb4aa]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="border-t border-[#f5f0e8]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2">
          <Link
            href={`/graphics/${prevCampaign.slug}`}
            className="group flex flex-col gap-2 border-r border-[#f5f0e8]/10 px-5 py-10 transition hover:bg-[#f5f0e8]/3 sm:px-8"
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#8d867e]">
              ← Previous
            </span>
            <span className="text-lg font-semibold text-[#f5f0e8] transition group-hover:text-[#6affcc] sm:text-xl">
              {prevCampaign.title}
            </span>
          </Link>
          <Link
            href={`/graphics/${nextCampaign.slug}`}
            className="group flex flex-col items-end gap-2 px-5 py-10 transition hover:bg-[#f5f0e8]/3 sm:px-8"
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#8d867e]">
              Next →
            </span>
            <span className="text-lg font-semibold text-[#f5f0e8] transition group-hover:text-[#6affcc] sm:text-xl">
              {nextCampaign.title}
            </span>
          </Link>
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
