"use client";

import {
  ArrowUpRight,
  Braces,
  ExternalLink,
  Eye,
  Layers3,
  Menu,
  Radio,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { ChatBot } from "./chatbot";
import { GraphicsSection } from "./graphics-section";

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

type ProjectMode = "All" | "Motion" | "AI" | "Design" | "Ops";

const modes: ProjectMode[] = ["All", "Motion", "AI", "Design", "Ops"];

const socialLinks = [
  { label: "X", href: "https://x.com/Darshd9941", status: "live" },
  { label: "Instagram", href: "#contact", status: "soon" },
  { label: "YouTube", href: "#contact", status: "soon" },
  { label: "Substack", href: "#contact", status: "soon" },
];

const manifesto = [
  "Direction before decoration.",
  "AI as leverage, not a personality replacement.",
  "Make the boring part obedient.",
  "Tools should feel like taste with buttons.",
];

const services = [
  {
    title: "Creative Systems",
    body: "Brand logic, motion rules, production rituals, and reusable taste.",
    icon: Layers3,
  },
  {
    title: "AI Workflow Design",
    body: "Model chains, prompts, audits, creative QA, and automations that survive real work.",
    icon: Wand2,
  },
  {
    title: "Prototype Builds",
    body: "Small apps, scripts, dashboards, bridges, and weird useful tools.",
    icon: Braces,
  },
];

function formatRepoName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getProjectMode(repo: PublicRepo): Exclude<ProjectMode, "All"> {
  const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();

  if (
    text.includes("after effects") ||
    text.includes("premiere") ||
    text.includes("motion") ||
    text.includes("caption") ||
    text.includes("b-roll")
  ) {
    return "Motion";
  }

  if (
    text.includes("figma") ||
    text.includes("brand") ||
    text.includes("design") ||
    text.includes("tokens") ||
    text.includes("photoshop")
  ) {
    return "Design";
  }

  if (
    text.includes("comfyui") ||
    text.includes("prompt") ||
    text.includes("ai") ||
    text.includes("claude") ||
    text.includes("whisper") ||
    text.includes("image")
  ) {
    return "AI";
  }

  return "Ops";
}

function getFeaturedRepos(repos: PublicRepo[]) {
  const preferred = [
    "figma-ae-bridge",
    "ae-auto-caption",
    "ai-rough-cut-assistant",
    "brand-consistency-checker",
    "prompt-archaeologist",
    "ai-layer-namer",
    "comfyui-memory-manager",
    "psd-design-tokens",
    "color-pipeline-validator",
    "prepress-preflight",
    "motion-concept-generator",
    "nl-motion-builder",
  ];

  const repoMap = new Map(repos.map((repo) => [repo.name, repo]));
  const selected = preferred
    .map((name) => repoMap.get(name))
    .filter((repo): repo is PublicRepo => Boolean(repo));
  const rest = repos.filter((repo) => !preferred.includes(repo.name));

  return [...selected, ...rest].slice(0, 18);
}

const navItems = ["Studio", "Proof", "Graphics", "Signals", "Projects"];

export function PublicHome({ repos }: { repos: PublicRepo[] }) {
  const [mode, setMode] = useState<ProjectMode>("All");
  const [pointer, setPointer] = useState({ x: 52, y: 18 });
  const [menuOpen, setMenuOpen] = useState(false);
  const featuredRepos = useMemo(() => getFeaturedRepos(repos), [repos]);
  const filteredRepos = useMemo(
    () =>
      featuredRepos.filter((repo) => {
        if (mode === "All") return true;
        return getProjectMode(repo) === mode;
      }),
    [featuredRepos, mode],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#050505] text-[#f5f0e8]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      style={{
        background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(106,255,204,0.16), transparent 24rem), #050505`,
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50 max-sm:opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,240,232,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,232,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,95,64,0.12)_36%,transparent_42%,rgba(106,255,204,0.1)_68%,transparent_76%)]" />
      </div>

      <div className="relative z-10">
        {/* Fixed Nav */}
        <nav
          className="fixed left-0 right-0 top-0 z-50 border-b border-[#f5f0e8]/10"
          style={{ backgroundColor: "rgba(5,5,5,0.92)", backdropFilter: "blur(20px)" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
            <a className="font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e8] sm:text-sm" href="#">
              Darsh.us
            </a>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-6 text-sm text-[#aaa29a] md:flex">
              {navItems.map((item) => (
                <a className="transition hover:text-[#6affcc]" href={`#${item.toLowerCase()}`} key={item}>
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                className="hidden h-9 items-center gap-2 rounded-md border border-[#f5f0e8]/18 bg-[#f5f0e8]/7 px-3 text-xs font-semibold text-[#f5f0e8] transition hover:border-[#6affcc] hover:text-[#6affcc] sm:inline-flex sm:px-4 sm:text-sm"
                href="https://x.com/Darshd9941"
                rel="noreferrer"
                target="_blank"
              >
                <Radio size={14} />
                <span className="hidden sm:inline">X / Darshd9941</span>
                <span className="sm:hidden">X</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#f5f0e8]/18 text-[#f5f0e8] transition hover:border-[#6affcc] hover:text-[#6affcc] md:hidden"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="border-t border-[#f5f0e8]/10 bg-[#0a0a0a] px-4 py-4 md:hidden">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-[#bdb4aa] transition hover:bg-[#f5f0e8]/5 hover:text-[#6affcc]"
                  >
                    <span className="font-mono text-xs text-[#ff8b70]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </a>
                ))}
                <a
                  href="https://x.com/Darshd9941"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="mt-2 flex items-center gap-3 rounded-md border border-[#f5f0e8]/12 px-3 py-3 text-sm text-[#f5f0e8] transition hover:border-[#6affcc]"
                >
                  <Radio size={14} />
                  X / Darshd9941
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 pb-10 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-14">
          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Designer", "Creative director", "AI workflow adaptor"].map((label) => (
                <span
                  className="rounded-md border border-[#f5f0e8]/16 bg-[#f5f0e8]/7 px-2 py-1.5 text-xs text-[#c9c1b7] sm:px-3 sm:py-2 sm:text-sm"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.92] text-[#f5f0e8] sm:mt-7 sm:text-7xl lg:text-9xl">
              Taste.
              <br />
              Tools.
              <br />
              Trouble.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#bdb4aa] sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-8 lg:text-xl">
              I am Darsh, a designer and creative director building sharper
              ways to make things. I care about taste first, then use AI,
              systems, and code to move faster without losing the point of view.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:gap-3">
              <a
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#6affcc] px-4 text-sm font-bold text-[#06120f] transition hover:bg-[#9dffe1] sm:h-12 sm:px-5"
                href="#contact"
              >
                <Sparkles size={16} />
                Got a problem? Let&apos;s solve it
              </a>
              <a
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#f5f0e8]/18 px-4 text-sm font-bold text-[#f5f0e8] transition hover:border-[#ff6a4a] hover:text-[#ff8b70] sm:h-12 sm:px-5"
                href="https://x.com/Darshd9941"
                rel="noreferrer"
                target="_blank"
              >
                <Radio size={16} />
                Follow the signal
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            <div className="group rounded-lg border border-[#f5f0e8]/14 bg-[#111]/85 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.5)] sm:p-4">
              <div className="flex items-center justify-between rounded-md bg-[#f5f0e8] px-3 py-2.5 text-[#050505] sm:px-4 sm:py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] sm:text-xs">
                  Public operating mode
                </span>
                <Eye size={16} />
              </div>
              <div className="grid grid-cols-2 gap-2 py-3 sm:gap-3 sm:py-4">
                {[
                  ["Role", "Designer / creative director"],
                  ["Practice", "Direction, AI workflow, systems"],
                  ["Receipts", `${repos.length} GitHub repos`],
                  ["Contact", "X first, email later"],
                ].map(([label, value]) => (
                  <div
                    className="rounded-md border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-3 transition group-hover:border-[#6affcc]/35 sm:p-4"
                    key={label}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#ff8b70] sm:text-xs">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#f5f0e8] sm:mt-3 sm:text-lg">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-md border border-[#f5f0e8]/10">
                <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc] sm:py-3 sm:text-sm">
                  Design direction / visual taste / AI adaptation / motion
                  language / brand systems / workflow design / creative ops /
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-y border-[#f5f0e8]/10 bg-[#0b0b0b]" id="studio">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 py-10 sm:gap-4 sm:px-8 sm:py-14 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  className="rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-4 transition hover:-translate-y-1 hover:border-[#ff6a4a]/60 hover:bg-[#f5f0e8]/8 sm:p-5"
                  key={service.title}
                >
                  <Icon className="text-[#6affcc]" size={24} />
                  <h2 className="mt-4 text-2xl font-semibold sm:mt-6 sm:text-3xl">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#bdb4aa] sm:mt-4 sm:leading-7">{service.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Manifesto */}
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:gap-8 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]" id="proof">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc] sm:text-sm">
              Point of view
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-[0.98] sm:mt-4 sm:text-5xl lg:text-7xl">
              Not a portfolio of screenshots. A portfolio of instincts.
            </h2>
          </div>
          <div className="grid gap-2 sm:gap-3">
            {manifesto.map((line, index) => (
              <div
                className="grid gap-3 rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-4 transition hover:border-[#6affcc]/55 sm:grid-cols-[72px_1fr] sm:items-center sm:gap-4 sm:p-5"
                key={line}
              >
                <span className="font-mono text-2xl text-[#ff6a4a] sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg font-semibold text-[#f5f0e8] sm:text-2xl">{line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signals / Contact */}
        <section className="px-4 py-14 sm:px-8 sm:py-20" id="signals">
          <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc] sm:text-sm">
                Signals
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-[0.98] sm:mt-4 sm:text-5xl lg:text-7xl">
                More channels are coming into the system.
              </h2>
            </div>
            <div className="grid gap-2 sm:gap-3" id="contact">
              <a
                className="flex items-center justify-between rounded-lg border border-[#6affcc]/45 bg-[#6affcc] p-4 text-[#050505] transition hover:bg-[#9dffe1] sm:p-5"
                href="mailto:hello@darsh.us"
              >
                <span className="text-lg font-semibold sm:text-2xl">Send a message</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:gap-2 sm:text-xs">
                  Email
                  <ArrowUpRight size={14} />
                </span>
              </a>
              {socialLinks.map((link) => (
                <a
                  className={`flex items-center justify-between rounded-lg border p-4 transition sm:p-5 ${
                    link.status === "live"
                      ? "border-[#6affcc]/45 bg-[#6affcc]/10 text-[#f5f0e8] hover:bg-[#6affcc]/16"
                      : "border-[#f5f0e8]/12 bg-[#f5f0e8]/5 text-[#8d867e]"
                  }`}
                  href={link.href}
                  key={link.label}
                  rel={link.status === "live" ? "noreferrer" : undefined}
                  target={link.status === "live" ? "_blank" : undefined}
                >
                  <span className="text-lg font-semibold sm:text-2xl">{link.label}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:gap-2 sm:text-xs">
                    {link.status}
                    {link.status === "live" ? <ExternalLink size={14} /> : null}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Graphics */}
        <GraphicsSection />

        {/* Projects */}
        <section className="border-y border-[#f5f0e8]/10 bg-[#f5f0e8] px-4 py-14 text-[#050505] sm:px-8 sm:py-20" id="projects">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#a73522] sm:text-sm">
                  Code receipts
                </p>
                <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[0.98] sm:mt-4 sm:text-5xl lg:text-7xl">
                  GitHub comes last. The thinking comes first.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#5a5148] sm:mt-5 sm:text-lg sm:leading-8">
                  Public builds and experiments behind the broader practice.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {modes.map((item) => (
                  <button
                    className={`h-9 rounded-md border px-3 text-xs font-bold transition sm:h-10 sm:px-4 sm:text-sm ${
                      mode === item
                        ? "border-[#050505] bg-[#050505] text-[#f5f0e8]"
                        : "border-[#050505]/18 bg-transparent text-[#050505] hover:border-[#a73522]"
                    }`}
                    key={item}
                    onClick={() => setMode(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-2 xl:grid-cols-3">
              {filteredRepos.map((repo, index) => {
                const projectMode = getProjectMode(repo);
                return (
                  <a
                    className="group flex min-h-56 flex-col justify-between rounded-lg border border-[#050505]/16 bg-[#050505] p-4 text-[#f5f0e8] transition hover:-translate-y-1 hover:border-[#a73522] hover:bg-[#14110f] sm:min-h-72 sm:p-5"
                    href={repo.html_url}
                    key={repo.name}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-md bg-[#6affcc] px-2 py-1 text-[10px] font-bold text-[#06120f] sm:text-xs">
                          {projectMode}
                        </span>
                        <span className="font-mono text-xs text-[#ff8b70] sm:text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold leading-none sm:mt-6 sm:text-3xl">
                        {formatRepoName(repo.name)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#bdb4aa] sm:mt-5 sm:leading-7">
                        {repo.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 sm:mt-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8c857e] sm:text-xs">
                        {repo.language ?? "Code"} / {new Date(repo.updated_at).getFullYear()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6affcc] sm:gap-2 sm:text-sm">
                        Open
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#f5f0e8]/10 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-[#8d867e] sm:flex-row sm:gap-4 sm:text-sm">
            <span>Darsh.us / public portfolio</span>
            <span>No email shown until mail is actually configured.</span>
          </div>
        </footer>
      </div>

      <ChatBot />
    </main>
  );
}
