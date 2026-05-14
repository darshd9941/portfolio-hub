"use client";

import {
  ArrowUpRight,
  Braces,
  ExternalLink,
  Eye,
  Layers3,
  Radio,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
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
  {
    label: "X",
    href: "https://x.com/Darshd9941",
    status: "live",
  },
  {
    label: "Instagram",
    href: "#contact",
    status: "soon",
  },
  {
    label: "YouTube",
    href: "#contact",
    status: "soon",
  },
  {
    label: "Substack",
    href: "#contact",
    status: "soon",
  },
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

export function PublicHome({ repos }: { repos: PublicRepo[] }) {
  const [mode, setMode] = useState<ProjectMode>("All");
  const [pointer, setPointer] = useState({ x: 52, y: 18 });
  const featuredRepos = useMemo(() => getFeaturedRepos(repos), [repos]);
  const filteredRepos = useMemo(
    () =>
      featuredRepos.filter((repo) => {
        if (mode === "All") {
          return true;
        }

        return getProjectMode(repo) === mode;
      }),
    [featuredRepos, mode],
  );

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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,240,232,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,232,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,95,64,0.12)_36%,transparent_42%,rgba(106,255,204,0.1)_68%,transparent_76%)]" />
      </div>

      <div className="relative z-10">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#f5f0e8]/10" style={{ backgroundColor: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(20px)' }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="font-mono text-sm uppercase tracking-[0.18em] text-[#f5f0e8]" href="#">
            Darsh.us
          </a>
          <div className="hidden items-center gap-6 text-sm text-[#aaa29a] md:flex">
            {["Studio", "Proof", "Graphics", "Signals", "Projects"].map((item) => (
              <a
                className="transition hover:text-[#6affcc]"
                href={`#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#f5f0e8]/18 bg-[#f5f0e8]/7 px-4 text-sm font-semibold text-[#f5f0e8] transition hover:border-[#6affcc] hover:text-[#6affcc]"
            href="https://x.com/Darshd9941"
            rel="noreferrer"
            target="_blank"
          >
            <Radio size={16} />
            X / Darshd9941
          </a>
          </div>
        </nav>

        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-5 pb-14 pt-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              {["Designer", "Creative director", "AI workflow adaptor"].map((label) => (
                <span
                  className="rounded-md border border-[#f5f0e8]/16 bg-[#f5f0e8]/7 px-3 py-2 text-sm text-[#c9c1b7]"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            <h1 className="mt-7 max-w-5xl text-6xl font-semibold leading-[0.92] text-[#f5f0e8] sm:text-8xl lg:text-9xl">
              Taste.
              <br />
              Tools.
              <br />
              Trouble.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#bdb4aa] sm:text-xl">
              I am Darsh, a designer and creative director building sharper
              ways to make things. I care about taste first, then use AI,
              systems, and code to move faster without losing the point of view.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#6affcc] px-5 text-sm font-bold text-[#06120f] transition hover:bg-[#9dffe1]"
                href="#contact"
              >
                <Sparkles size={18} />
                Got a problem? Let's solve it
              </a>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#f5f0e8]/18 px-5 text-sm font-bold text-[#f5f0e8] transition hover:border-[#ff6a4a] hover:text-[#ff8b70]"
                href="https://x.com/Darshd9941"
                rel="noreferrer"
                target="_blank"
              >
                <Radio size={18} />
                Follow the signal
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="group rounded-lg border border-[#f5f0e8]/14 bg-[#111]/85 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between rounded-md bg-[#f5f0e8] px-4 py-3 text-[#050505]">
                <span className="font-mono text-xs uppercase tracking-[0.16em]">
                  Public operating mode
                </span>
                <Eye size={18} />
              </div>
              <div className="grid gap-3 py-4 sm:grid-cols-2">
                {[
                  ["Role", "Designer / creative director"],
                  ["Practice", "Direction, AI workflow, systems"],
                  ["Receipts", `${repos.length} GitHub repos, shown last`],
                  ["Contact", "X first, email after MX setup"],
                ].map(([label, value]) => (
                  <div
                    className="rounded-md border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-4 transition group-hover:border-[#6affcc]/35"
                    key={label}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#ff8b70]">
                      {label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-[#f5f0e8]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-md border border-[#f5f0e8]/10">
                <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap py-3 font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
                  Design direction / visual taste / AI adaptation / motion
                  language / brand systems / workflow design / creative ops /
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#f5f0e8]/10 bg-[#0b0b0b]" id="studio">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:px-8 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className="rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-5 transition hover:-translate-y-1 hover:border-[#ff6a4a]/60 hover:bg-[#f5f0e8]/8"
                  key={service.title}
                >
                  <Icon className="text-[#6affcc]" size={28} />
                  <h2 className="mt-6 text-3xl font-semibold">{service.title}</h2>
                  <p className="mt-4 leading-7 text-[#bdb4aa]">{service.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]" id="proof">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
              Point of view
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.98] sm:text-7xl">
              Not a portfolio of screenshots. A portfolio of instincts.
            </h2>
          </div>
          <div className="grid gap-3">
            {manifesto.map((line, index) => (
              <div
                className="grid gap-4 rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 p-5 transition hover:border-[#6affcc]/55 sm:grid-cols-[72px_1fr] sm:items-center"
                key={line}
              >
                <span className="font-mono text-3xl text-[#ff6a4a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-2xl font-semibold text-[#f5f0e8]">{line}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8" id="signals">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#6affcc]">
                Signals
              </p>
              <h2 className="mt-4 text-5xl font-semibold leading-[0.98] sm:text-7xl">
                More channels are coming into the system.
              </h2>
            </div>
            <div className="grid gap-3" id="contact">
              <a
                className="flex items-center justify-between rounded-lg border border-[#6affcc]/45 bg-[#6affcc] p-5 text-[#050505] transition hover:bg-[#9dffe1]"
                href="mailto:hello@darsh.us"
              >
                <span className="text-2xl font-semibold">Send a message</span>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
                  Email
                  <ArrowUpRight size={15} />
                </span>
              </a>
              {socialLinks.map((link) => (
                <a
                  className={`flex items-center justify-between rounded-lg border p-5 transition ${
                    link.status === "live"
                      ? "border-[#6affcc]/45 bg-[#6affcc]/10 text-[#f5f0e8] hover:bg-[#6affcc]/16"
                      : "border-[#f5f0e8]/12 bg-[#f5f0e8]/5 text-[#8d867e]"
                  }`}
                  href={link.href}
                  key={link.label}
                  rel={link.status === "live" ? "noreferrer" : undefined}
                  target={link.status === "live" ? "_blank" : undefined}
                >
                  <span className="text-2xl font-semibold">{link.label}</span>
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
                    {link.status}
                    {link.status === "live" ? <ExternalLink size={15} /> : null}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <GraphicsSection />

        <section className="border-y border-[#f5f0e8]/10 bg-[#f5f0e8] px-5 py-20 text-[#050505] sm:px-8" id="projects">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#a73522]">
                  Code receipts
                </p>
                <h2 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl">
                  GitHub comes last. The thinking comes first.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5a5148]">
                  These are public builds and experiments behind the broader
                  practice: design, direction, AI adaptation, and creative
                  production systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button
                    className={`h-10 rounded-md border px-4 text-sm font-bold transition ${
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

            <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredRepos.map((repo, index) => {
                const projectMode = getProjectMode(repo);

                return (
                  <a
                    className="group flex min-h-72 flex-col justify-between rounded-lg border border-[#050505]/16 bg-[#050505] p-5 text-[#f5f0e8] transition hover:-translate-y-1 hover:border-[#a73522] hover:bg-[#14110f]"
                    href={repo.html_url}
                    key={repo.name}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-md bg-[#6affcc] px-2 py-1 text-xs font-bold text-[#06120f]">
                          {projectMode}
                        </span>
                        <span className="font-mono text-sm text-[#ff8b70]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-6 text-3xl font-semibold leading-none">
                        {formatRepoName(repo.name)}
                      </h3>
                      <p className="mt-5 leading-7 text-[#bdb4aa]">
                        {repo.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#8c857e]">
                        {repo.language ?? "Code"} / {new Date(repo.updated_at).getFullYear()}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#6affcc]">
                        Open
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="border-t border-[#f5f0e8]/10 px-5 py-8 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#8d867e] sm:flex-row">
            <span>Darsh.us / public portfolio</span>
            <span>No email shown until mail is actually configured.</span>
          </div>
        </footer>
      </div>

      <ChatBot />
    </main>
  );
}
