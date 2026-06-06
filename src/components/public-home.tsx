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
  {
    key: "adobe",
    label: "Adobe automation",
    copy: "Photoshop, AE, Premiere, Figma bridges",
    metric: "scripts",
  },
  {
    key: "comfyui",
    label: "ComfyUI survival kits",
    copy: "dependency repair, VRAM control, batch QA",
    metric: "nodes",
  },
  {
    key: "ai",
    label: "AI image QA",
    copy: "prompt archaeology, consistency checks, asset memory",
    metric: "vision",
  },
  {
    key: "brand",
    label: "Brand rule engines",
    copy: "tokens, preflight, portals, compliance",
    metric: "systems",
  },
  {
    key: "motion",
    label: "Motion workflow tools",
    copy: "captions, rough cuts, B-roll, expressions",
    metric: "timelines",
  },
  {
    key: "knowledge",
    label: "Obsidian knowledge systems",
    copy: "MCP, second brain patterns, searchable memory",
    metric: "graphs",
  },
];

const repoThemes = [
  { key: "all", label: "All builds" },
  { key: "adobe", label: "Adobe tools" },
  { key: "comfyui", label: "ComfyUI" },
  { key: "ai", label: "AI workflows" },
  { key: "brand", label: "Brand systems" },
  { key: "motion", label: "Motion" },
  { key: "knowledge", label: "Knowledge" },
];

function repoSignal(repo: PublicRepo) {
  const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
  if (text.includes("comfyui") || text.includes("vram") || text.includes("workflow json")) return "comfyui";
  if (text.includes("after effects") || text.includes("premiere") || text.includes("photoshop") || text.includes("figma") || text.includes("adobe") || text.includes("psd")) return "adobe";
  if (text.includes("motion") || text.includes("caption") || text.includes("rough cut") || text.includes("b-roll") || text.includes("expression")) return "motion";
  if (text.includes("brand") || text.includes("prepress") || text.includes("token") || text.includes("color") || text.includes("portal")) return "brand";
  if (text.includes("obsidian") || text.includes("second brain") || text.includes("mcp") || text.includes("knowledge")) return "knowledge";
  return "ai";
}

function titleCaseRepo(name: string) {
  return name.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

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

function IntroSection({
  activeSignal,
  setActiveSignal,
}: {
  activeSignal: string;
  setActiveSignal: (signal: string) => void;
}) {
  const { ref, visible } = useScrollReveal();
  const activeNote = labNotes.find((note) => note.key === activeSignal) ?? labNotes[0];
  const featuredRepo = {
    adobe: "figma-ae-bridge",
    comfyui: "comfyui-memory-manager",
    ai: "prompt-archaeologist",
    brand: "brand-consistency-checker",
    motion: "nl-motion-builder",
    knowledge: "obsidian-mcp-server",
    all: "portfolio-hub",
  }[activeSignal] ?? "prompt-archaeologist";

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      className="hero-stage relative flex min-h-screen items-center overflow-hidden px-5 pb-8 pt-20 sm:px-12 sm:pt-24"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 z-0 bg-[#050505]" />
      <div className="lab-grid absolute inset-0 z-0 opacity-[0.18]" />
      <div className="hero-noise-map absolute inset-0 z-0" />
      <div className="pointer-glow absolute z-0" />

      <div className="absolute left-0 right-0 top-16 z-10 overflow-hidden border-y border-[#f5f0e8]/8 bg-[#050505]/60 py-2">
        <div className="marquee-track flex w-max gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff8b70]">
          {Array.from({ length: 2 }).map((_, loop) => (
            <div className="flex gap-8" key={loop}>
              <span>Creative systems</span>
              <span>AI workflow design</span>
              <span>Adobe automation</span>
              <span>ComfyUI utilities</span>
              <span>Motion tools</span>
              <span>Brand machinery</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className={`relative z-10 mx-auto grid w-full max-w-7xl gap-8 transition-all duration-1000 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-center ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#6affcc]/35 bg-[#6affcc]/8 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6affcc] sm:text-xs">
            <Sparkles size={13} />
            Interactive creative lab / Ahmedabad
          </div>
          <h1 className="cinematic-title max-w-4xl text-5xl font-light leading-[0.9] text-[#f5f0e8] sm:text-7xl lg:text-[4.9rem]">
            Not a portfolio. A creative machine room.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#bdb4aa] sm:text-lg sm:leading-8">
            Pick a signal. The projects mutate. The visuals answer back. Somewhere between brand direction, AI workflows, and Adobe tools, the boring part gets handled.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {labNotes.slice(0, 4).map((note) => (
              <button
                key={note.key}
                onClick={() => setActiveSignal(note.key)}
                className={`group flex items-center justify-between border px-3 py-3 text-left transition ${
                  activeSignal === note.key
                    ? "border-[#6affcc]/60 bg-[#6affcc]/12 text-[#f5f0e8]"
                    : "border-[#f5f0e8]/12 bg-[#050505]/70 text-[#bdb4aa] hover:border-[#ff8b70]/50 hover:text-[#f5f0e8]"
                }`}
              >
                <span className="text-xs font-semibold sm:text-sm">{note.label}</span>
                <span className="text-[#6affcc] transition group-hover:translate-x-1">→</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="magnetic-link inline-flex h-10 items-center gap-2 border border-[#6affcc]/55 bg-[#6affcc]/12 px-5 text-sm font-semibold text-[#6affcc] transition hover:bg-[#6affcc]/20"
            >
              Enter the machine
              <ArrowUpRight size={15} />
            </a>
            <a
              href="mailto:hello@darsh.us"
              className="magnetic-link inline-flex h-10 items-center gap-2 border border-[#f5f0e8]/15 px-5 text-sm text-[#f5f0e8] transition hover:border-[#ff8b70] hover:text-[#ffb199]"
            >
              Send a brief
              <Mail size={15} />
            </a>
          </div>
        </div>

        <div className="relative min-h-[540px] lg:min-h-[560px]">
          <div className="hero-card hero-card-a absolute left-0 top-0 w-[70%] overflow-hidden border border-[#f5f0e8]/12 bg-[#0a0a0a] shadow-2xl shadow-black/40">
            <img
              src={campaigns[0]?.images[0] ?? ""}
              alt="Featured campaign visual"
              className="h-60 w-full object-cover"
            />
            <div className="flex items-center justify-between border-t border-[#f5f0e8]/10 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6affcc]">Campaign system</span>
              <span className="text-xs text-[#8d867e]">Visual proof</span>
            </div>
          </div>

          <div className="hero-card hero-card-b absolute right-0 top-16 w-[58%] overflow-hidden border border-[#ff8b70]/25 bg-[#0a0a0a] shadow-2xl shadow-black/40">
            <img
              src={campaigns[3]?.images[0] ?? ""}
              alt="Campaign visual collage"
              className="h-52 w-full object-cover"
            />
            <div className="grid grid-cols-3 border-t border-[#f5f0e8]/10 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#bdb4aa]">
              <span className="border-r border-[#f5f0e8]/10 py-3">Brand</span>
              <span className="border-r border-[#f5f0e8]/10 py-3">AI</span>
              <span className="py-3">Code</span>
            </div>
          </div>

          <div className="scan-panel hero-card hero-card-c absolute bottom-0 left-[7%] right-0 overflow-hidden border border-[#f5f0e8]/12 bg-[#0a0a0a]/90 p-4 shadow-2xl shadow-black/50 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#f5f0e8]/10 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff8b70]">
                Signal board
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6affcc]">Live</span>
            </div>
            <div className="relative my-5 min-h-44 overflow-hidden border border-[#f5f0e8]/10 bg-[#050505] p-4">
            <div className="absolute inset-0 opacity-30 lab-grid" />
            <div className="signal-line absolute left-[18%] top-[30%] h-px w-[64%] bg-[#6affcc]/30" />
            <div className="signal-line absolute left-[28%] top-[64%] h-px w-[52%] bg-[#ff8b70]/28" />
            {labNotes.slice(0, 5).map((note, index) => (
              <button
                key={note.key}
                onClick={() => setActiveSignal(note.key)}
                className={`signal-node absolute h-4 w-4 border transition ${
                  activeSignal === note.key
                    ? "border-[#6affcc] bg-[#6affcc] shadow-[0_0_28px_rgba(106,255,204,0.7)]"
                    : "border-[#f5f0e8]/25 bg-[#f5f0e8]/10 hover:border-[#ff8b70]"
                }`}
                style={{
                  left: `${12 + index * 18}%`,
                  top: `${index % 2 === 0 ? 24 + index * 7 : 58 - index * 4}%`,
                }}
                aria-label={`Filter projects by ${note.label}`}
              />
            ))}
            <div className="relative z-10 mt-24 max-w-xs border border-[#6affcc]/20 bg-[#050505]/80 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6affcc]">
                {activeNote.metric}
              </p>
              <p className="mt-1 text-base font-semibold text-[#f5f0e8]">{activeNote.label}</p>
              <p className="mt-1 text-xs leading-5 text-[#8d867e]">{activeNote.copy}</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {labNotes.map((note, index) => (
              <button
                className={`flex items-center justify-between border px-3 py-3 text-left transition ${
                  activeSignal === note.key
                    ? "border-[#6affcc]/55 bg-[#6affcc]/12 text-[#f5f0e8]"
                    : "border-[#f5f0e8]/10 bg-[#f5f0e8]/4 text-[#bdb4aa] hover:border-[#ff8b70]/50 hover:text-[#f5f0e8]"
                }`}
                key={note.key}
                onClick={() => setActiveSignal(note.key)}
              >
                <span className="text-xs font-semibold sm:text-sm">{note.label}</span>
                <span className="font-mono text-[10px] text-[#6affcc]/80">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 border border-[#f5f0e8]/10 bg-[#050505] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff8b70]">Selected repo</p>
            <p className="mt-1 text-lg font-semibold text-[#f5f0e8]">{featuredRepo}</p>
          </div>
          <a
            href="#projects"
            className="mt-5 inline-flex w-full items-center justify-between border border-[#f5f0e8]/12 px-4 py-3 text-sm text-[#bdb4aa] transition hover:border-[#6affcc]/45 hover:text-[#6affcc]"
          >
            Jump to filtered projects
            <ChevronDown size={15} />
          </a>
          </div>
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
  const [activeSignal, setActiveSignal] = useState("ai");

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const visibleRepos = repos.filter((repo) => activeSignal === "all" || repoSignal(repo) === activeSignal);
  const projectRepos = (visibleRepos.length > 0 ? visibleRepos : repos).slice(0, 8);
  const activeThemeLabel = repoThemes.find((theme) => theme.key === activeSignal)?.label ?? "AI workflows";

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
        <IntroSection activeSignal={activeSignal} setActiveSignal={setActiveSignal} />

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
              Public builds from the workshop floor, currently tuned to {activeThemeLabel.toLowerCase()}.
            </h2>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Project filters">
              {repoThemes.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => setActiveSignal(theme.key)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                    activeSignal === theme.key
                      ? "border-[#6affcc]/60 bg-[#6affcc]/12 text-[#6affcc]"
                      : "border-[#f5f0e8]/12 bg-[#050505] text-[#bdb4aa] hover:border-[#ff8b70]/50 hover:text-[#ffb199]"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {projectRepos.map((repo, index) => (
                <a
                  className="group relative overflow-hidden border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-4 text-sm transition hover:-translate-y-1 hover:border-[#6affcc]/40 hover:bg-[#f5f0e8]/8 sm:p-5"
                  href={repo.html_url}
                  key={repo.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="absolute right-4 top-4 font-mono text-[10px] text-[#6affcc]/50">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="pr-10">
                    <span className="inline-flex border border-[#6affcc]/20 bg-[#050505] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6affcc]">
                      {repoSignal(repo)}
                    </span>
                    <span className="mt-4 block font-semibold text-[#f5f0e8] transition group-hover:text-[#6affcc]">
                      {titleCaseRepo(repo.name)}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-[#8d867e]">{repo.description}</span>
                    <span className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6affcc]">
                      {repo.language ?? "Code"}
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
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
