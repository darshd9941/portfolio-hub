"use client";

import {
  ArrowUpRight,
  ExternalLink,
  Radio,
  ChevronDown,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBot } from "./chatbot";
import { campaigns, type Campaign } from "@/data/campaigns";

export type PublicRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
};

const navItems = ["Lab", "Graphics", "Projects", "Contact"];
const socialLinks = [
  { label: "X", href: "https://x.com/Darshd9941", status: "live" },
  { label: "GitHub", href: "https://github.com/darshd9941", status: "open source" },
];

const labNotes = [
  "Adobe automation",
  "ComfyUI survival kits",
  "AI image QA",
  "Brand rule engines",
  "Motion workflow tools",
  "Obsidian knowledge systems",
];

const repoThemes = [
  "Creative production",
  "AI workflows",
  "Motion systems",
  "Brand tooling",
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ChapterSection({ campaign, index }: { campaign: Campaign; index: number }) {
  const { ref, visible } = useScrollReveal();
  const heroImage = campaign.images[0] || "";

  return (
    <div
      ref={ref}
      className={`chapter-section min-h-screen ${visible ? "visible" : ""}`}
    >
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 sm:px-12">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={campaign.title}
            className="chapter-image h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#050505]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050505]/30" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 sm:gap-6">
            <span
              className={`chapter-number text-xs tracking-[0.25em] text-[#6affcc] transition-all duration-700 sm:text-sm ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              {String(index + 1).padStart(2, "0")} / {campaign.category.toUpperCase()}
            </span>
            <h2
              className={`cinematic-title max-w-3xl text-5xl font-light text-[#f5f0e8] transition-all duration-700 sm:text-7xl md:text-8xl lg:text-[8rem] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "0.25s" }}
            >
              {campaign.title}
            </h2>
            <p
              className={`max-w-xl text-sm leading-6 text-[#bdb4aa] transition-all duration-700 sm:text-base sm:leading-7 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              {campaign.subtitle}
            </p>
            <div
              className={`flex flex-wrap gap-2 transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "0.55s" }}
            >
              {campaign.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#f5f0e8]/15 bg-[#f5f0e8]/7 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#c9c1b7] sm:text-xs"
                >
                  {tag}
                </span>
              ))}
              <a
                href={`/graphics/${campaign.slug}`}
                className="group inline-flex items-center gap-1 rounded-full border border-[#6affcc]/40 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#6affcc] transition hover:bg-[#6affcc]/10 sm:text-xs"
              >
                View all
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-10 pt-24 sm:px-12 sm:pt-28">
      <div className="absolute inset-0 z-0 bg-[#050505]" />
      <div className="lab-grid absolute inset-0 z-0 opacity-[0.18]" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto grid w-full max-w-7xl gap-10 transition-all duration-1000 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-end ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div>
        <div className="mb-6 inline-flex items-center gap-2 border border-[#6affcc]/35 bg-[#6affcc]/8 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6affcc] sm:text-xs">
          <Sparkles size={13} />
          Creative systems lab / Ahmedabad
        </div>
        <h1 className="cinematic-title max-w-5xl text-5xl font-light leading-[0.92] text-[#f5f0e8] sm:text-6xl md:text-[4.9rem] lg:text-[5.6rem]">
          Darsh builds tools for the creative endgame.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#bdb4aa] sm:text-lg sm:leading-8">
          Creative director turning brand work, AI workflows, Adobe pipelines, and production chaos into sharp little systems that actually ship.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 border border-[#6affcc]/55 bg-[#6affcc]/12 px-5 text-sm font-semibold text-[#6affcc] transition hover:bg-[#6affcc]/20"
          >
            See the machines
            <ArrowUpRight size={15} />
          </a>
          <a
            href="mailto:hello@darsh.us"
            className="inline-flex h-11 items-center gap-2 border border-[#f5f0e8]/15 px-5 text-sm text-[#f5f0e8] transition hover:border-[#ff8b70] hover:text-[#ffb199]"
          >
            Start a project
            <Mail size={15} />
          </a>
        </div>
        </div>

        <div className="border border-[#f5f0e8]/12 bg-[#0a0a0a]/80 p-4 shadow-2xl shadow-black/30 sm:p-5">
          <div className="flex items-center justify-between border-b border-[#f5f0e8]/10 pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff8b70]">
              Current obsessions
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6affcc]">Live</span>
          </div>
          <div className="divide-y divide-[#f5f0e8]/8">
            {labNotes.map((note, index) => (
              <div className="flex items-center justify-between py-4" key={note}>
                <span className="text-sm font-semibold text-[#f5f0e8] sm:text-base">{note}</span>
                <span className="font-mono text-[10px] text-[#6affcc]/80">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <a
            href="#chapters"
            className="mt-5 inline-flex w-full items-center justify-between border border-[#f5f0e8]/12 px-4 py-3 text-sm text-[#bdb4aa] transition hover:border-[#6affcc]/45 hover:text-[#6affcc]"
          >
            Graphic campaigns below
            <ChevronDown size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="border-t border-[#f5f0e8]/8 px-6 py-20 sm:px-12 sm:py-28" id="lab">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-800 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6affcc] sm:text-xs">
          Lab
        </span>
        <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-[#f5f0e8] sm:text-5xl">
          The sweet spot is where taste meets automation and the deadline starts sweating.
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-12">
          <div>
            <h3 className="text-lg font-semibold text-[#f5f0e8] sm:text-xl">Creative Systems</h3>
            <p className="mt-3 text-sm leading-6 text-[#8d867e]">
              Brand logic, campaign rules, reusable visual decisions, and production rituals that keep work consistent.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#f5f0e8] sm:text-xl">AI Workflow Design</h3>
            <p className="mt-3 text-sm leading-6 text-[#8d867e]">
              Prompt systems, image QA, ComfyUI support tools, and automations that survive real production instead of dying in demo land.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#f5f0e8] sm:text-xl">Prototype Builds</h3>
            <p className="mt-3 text-sm leading-6 text-[#8d867e]">
              Small apps, scripts, Adobe bridges, and internal dashboards that make the boring part obedient.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 flex gap-10 border-t border-[#f5f0e8]/8 pt-8 sm:mt-16 sm:gap-16">
          <div>
            <p className="text-2xl font-bold text-[#f5f0e8] sm:text-3xl">7+</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5a5148] sm:text-xs">Years</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#f5f0e8] sm:text-3xl">50+</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5a5148] sm:text-xs">Campaigns</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#f5f0e8] sm:text-3xl">27+</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5a5148] sm:text-xs">Public tools</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalsSection() {
  return (
    <section className="border-t border-[#f5f0e8]/8 px-6 py-16 sm:px-12 sm:py-24" id="contact">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6affcc] sm:text-xs">
          Contact
        </span>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-[#f5f0e8] sm:text-4xl">
          Bring a messy creative problem. Leave with a machine that behaves.
        </h2>
        <div className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2">
          <a
            className="flex items-center justify-between rounded-lg border border-[#6affcc]/45 bg-[#6affcc]/10 p-4 text-[#f5f0e8] transition hover:bg-[#6affcc]/16 sm:p-5"
            href="mailto:hello@darsh.us"
          >
            <span className="text-lg font-semibold sm:text-2xl">Send a message</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:gap-2 sm:text-xs">
              Email <ArrowUpRight size={14} />
            </span>
          </a>
          {socialLinks.map((link) => (
            <a
              className="flex items-center justify-between rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-4 text-[#f5f0e8] transition hover:border-[#6affcc]/45 hover:bg-[#6affcc]/10 sm:p-5"
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              <span className="text-lg font-semibold sm:text-2xl">{link.label}</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:gap-2 sm:text-xs">
                {link.status}
                <ExternalLink size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PublicHome({ repos }: { repos: PublicRepo[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f5f0e8]">
      {/* Fixed grain overlay */}
      <div className="grain-overlay" />

      {/* Fixed Nav */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 border-b border-[#f5f0e8]/8"
        style={{ backgroundColor: "rgba(5,5,5,0.85)", backdropFilter: "blur(16px)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e8] sm:text-sm" href="#">
            Darsh
          </a>

          <div className="hidden items-center gap-6 text-sm text-[#aaa29a] md:flex">
            {navItems.map((item) => (
              <a className="transition hover:text-[#6affcc]" href={`#${item.toLowerCase()}`} key={item}>
                {item}
              </a>
            ))}
            <a
              className="ml-2 flex h-8 items-center gap-1.5 rounded-md border border-[#f5f0e8]/15 px-3 text-xs font-semibold text-[#f5f0e8] transition hover:border-[#6affcc] hover:text-[#6affcc]"
              href="mailto:hello@darsh.us"
            >
              <Mail size={12} />
              Start a project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f5f0e8]/15 text-[#f5f0e8] transition hover:border-[#6affcc] hover:text-[#6affcc] md:hidden"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {menuOpen ? (
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#f5f0e8]/10 bg-[#0a0a0a] px-5 py-4 md:hidden">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-[#bdb4aa] transition hover:bg-[#f5f0e8]/5 hover:text-[#6affcc]"
              >
                <span className="font-mono text-xs text-[#ff8b70]">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </a>
            ))}
            <a
              href="mailto:hello@darsh.us"
              onClick={closeMenu}
              className="mt-2 flex items-center gap-3 rounded-md border border-[#f5f0e8]/12 px-3 py-3 text-sm text-[#f5f0e8] transition hover:border-[#6affcc]"
            >
              <Mail size={14} />
              Start a project
            </a>
          </div>
        )}
      </nav>

      <div className="relative z-10">
        {/* Cinematic Intro */}
        <IntroSection />

        {/* Campaign Chapters */}
        <div id="chapters">
          {campaigns.slice(0, 6).map((campaign, index) => (
            <ChapterSection key={campaign.slug} campaign={campaign} index={index} />
          ))}
        </div>

        {/* Remaining campaigns as compact grid */}
        {campaigns.length > 6 && (
          <section className="border-t border-[#f5f0e8]/8 px-6 py-16 sm:px-12 sm:py-20" id="graphics">
            <div className="mx-auto max-w-6xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6affcc] sm:text-xs">
                More work
              </span>
              <div className="mt-6 grid gap-px bg-[#f5f0e8]/8 sm:grid-cols-2 lg:grid-cols-3">
                {campaigns.slice(6).map((campaign) => (
                  <a
                    key={campaign.slug}
                    href={`/graphics/${campaign.slug}`}
                    className="group relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]"
                  >
                    <img
                      src={campaign.images[0] || ""}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2">
                      <p className="text-sm font-semibold text-[#f5f0e8]">{campaign.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6affcc]">{campaign.category}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About / Lab */}
        <AboutSection />

        {/* Contact */}
        <SignalsSection />

        {/* Projects */}
        <section className="border-t border-[#f5f0e8]/8 bg-[#0a0a0a] px-6 py-16 sm:px-12 sm:py-20" id="projects">
          <div className="mx-auto max-w-6xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6affcc] sm:text-xs">
              Projects
            </span>
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-[#f5f0e8] sm:text-3xl">
              Public builds from the workshop floor.
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {repoThemes.map((theme) => (
                <span
                  key={theme}
                  className="border border-[#f5f0e8]/12 bg-[#050505] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#bdb4aa]"
                >
                  {theme}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {repos.slice(0, 8).map((repo) => (
                <a
                  className="group flex items-center justify-between rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-4 text-sm transition hover:border-[#6affcc]/40 hover:bg-[#f5f0e8]/8 sm:p-5"
                  href={repo.html_url}
                  key={repo.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[#f5f0e8] transition group-hover:text-[#6affcc]">
                      {repo.name.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")}
                    </span>
                    <span className="mt-1 block truncate text-xs text-[#8d867e]">{repo.description}</span>
                  </div>
                  <span className="ml-3 flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6affcc]">
                    {repo.language ?? "Code"}
                    <ArrowUpRight size={12} />
                  </span>
                </a>
              ))}
            </div>
            {repos.length > 8 && (
              <a
                href="https://github.com/darshd9941"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#6affcc] transition hover:underline"
              >
                View all on GitHub <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#f5f0e8]/8 px-6 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <a className="font-mono text-sm uppercase tracking-[0.18em] text-[#f5f0e8]" href="#">Darsh</a>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#8d867e]">
                Creative director building campaign systems, AI workflows, and tiny useful machines.
              </p>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6affcc]">Navigate</p>
                <div className="mt-3 flex flex-col gap-2">
                  {["Lab", "Graphics", "Projects", "Contact"].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#bdb4aa] transition hover:text-[#6affcc]">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6affcc]">Connect</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="mailto:hello@darsh.us" className="inline-flex items-center gap-2 text-sm text-[#bdb4aa] transition hover:text-[#6affcc]"><Mail size={13} /> Email</a>
                  <a href="https://github.com/darshd9941" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#bdb4aa] transition hover:text-[#6affcc]"><ExternalLink size={13} /> GitHub</a>
                  <a href="https://x.com/Darshd9941" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#bdb4aa] transition hover:text-[#6affcc]"><Radio size={13} /> X</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-6xl border-t border-[#f5f0e8]/8 pt-6 text-center text-xs text-[#5a5148] sm:mt-12 sm:pt-8">
            &copy; {new Date().getFullYear()} Darsh. Built with taste & caffeine.
          </div>
        </footer>
      </div>

      <ChatBot />
    </main>
  );
}
