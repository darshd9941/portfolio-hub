import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Compass,
  ExternalLink,
  GitBranch,
  LockKeyhole,
  Mail,
  Palette,
  Play,
  Sparkles,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
};

const fallbackRepos: Repo[] = [
  {
    name: "figma-ae-bridge",
    description:
      "Robust Figma-to-After Effects layer transfer with a Figma plugin and AE CEP panel.",
    html_url: "https://github.com/darshd9941/figma-ae-bridge",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:48:38Z",
    topics: [],
  },
  {
    name: "ae-auto-caption",
    description:
      "Auto-caption After Effects compositions with Whisper transcription and styled text layers.",
    html_url: "https://github.com/darshd9941/ae-auto-caption",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:14:59Z",
    topics: [],
  },
  {
    name: "brand-consistency-checker",
    description:
      "Validate AI outputs against brand rules using YAML specs and compliance reports.",
    html_url: "https://github.com/darshd9941/brand-consistency-checker",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:57:05Z",
    topics: [],
  },
  {
    name: "prompt-archaeologist",
    description:
      "Upload any AI image and reverse-engineer a usable SD/Flux prompt and style analysis.",
    html_url: "https://github.com/darshd9941/prompt-archaeologist",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:01:56Z",
    topics: [],
  },
  {
    name: "ai-rough-cut-assistant",
    description:
      "AI-powered rough cuts for Premiere Pro with transcription, take selection, and XML output.",
    html_url: "https://github.com/darshd9941/ai-rough-cut-assistant",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T10:06:06Z",
    topics: [],
  },
  {
    name: "comfyui-memory-manager",
    description:
      "ComfyUI custom node for VRAM monitoring, model unloading, and memory budget mode.",
    html_url: "https://github.com/darshd9941/comfyui-memory-manager",
    homepage: null,
    language: "Python",
    stargazers_count: 0,
    updated_at: "2026-05-01T09:29:38Z",
    topics: [],
  },
];

const lenses = [
  {
    title: "Creative Direction",
    text: "Taste, narrative, mood, format, and the final feeling of the thing.",
    icon: Compass,
  },
  {
    title: "AI Workflow Design",
    text: "Turning models into reliable creative systems instead of one-off tricks.",
    icon: BrainCircuit,
  },
  {
    title: "Technical Prototyping",
    text: "Small tools, scripts, dashboards, and bridges that remove friction.",
    icon: Code2,
  },
];

const principles = [
  "Make tools that disappear into the work.",
  "Use AI for leverage, not for blandness.",
  "Keep taste in the loop until the final mile.",
  "Ship practical systems that solve real creative bottlenecks.",
];

const navItems = [
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

function formatRepoName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getProjectType(repo: Repo) {
  const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();

  if (text.includes("after effects") || text.includes("premiere") || text.includes("motion")) {
    return "Motion tooling";
  }

  if (text.includes("brand") || text.includes("design") || text.includes("figma")) {
    return "Design system";
  }

  if (text.includes("comfyui") || text.includes("prompt") || text.includes("image")) {
    return "AI production";
  }

  if (text.includes("metadata") || text.includes("prepress") || text.includes("pipeline")) {
    return "Production utility";
  }

  return "Creative tech";
}

function getFeaturedRepos(repos: Repo[]) {
  const preferred = [
    "figma-ae-bridge",
    "ae-auto-caption",
    "ai-rough-cut-assistant",
    "brand-consistency-checker",
    "prompt-archaeologist",
    "comfyui-memory-manager",
    "ai-asset-manager",
    "nl-motion-builder",
    "psd-design-tokens",
  ];

  const repoMap = new Map(repos.map((repo) => [repo.name, repo]));
  const selected = preferred
    .map((name) => repoMap.get(name))
    .filter((repo): repo is Repo => Boolean(repo));

  if (selected.length >= 6) {
    return selected.slice(0, 9);
  }

  return [...selected, ...repos.filter((repo) => !repoMap.has(repo.name))]
    .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
    .slice(0, 9);
}

async function getRepos() {
  try {
    const response = await fetch("https://api.github.com/users/darshd9941/repos?per_page=100&sort=updated", {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      return fallbackRepos;
    }

    const repos = (await response.json()) as Repo[];

    return repos.filter((repo) => repo.description && !repo.name.includes(".github"));
  } catch {
    return fallbackRepos;
  }
}

export default async function Home() {
  const repos = await getRepos();
  const featuredRepos = getFeaturedRepos(repos);

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#151515]">
      <nav className="sticky top-0 z-20 border-b border-[#151515]/10 bg-[#f4f0e8]/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a className="font-mono text-sm uppercase tracking-[0.16em]" href="#">
            Darsh
          </a>
          <div className="hidden items-center gap-6 text-sm text-[#4f4a43] md:flex">
            {navItems.map(([label, href]) => (
              <a className="transition hover:text-[#151515]" href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              className="hidden h-10 items-center gap-2 rounded-md border border-[#151515]/15 bg-white/55 px-4 text-sm font-medium transition hover:bg-white sm:inline-flex"
              href="https://github.com/darshd9941"
              rel="noreferrer"
              target="_blank"
            >
              <GitBranch size={16} />
              GitHub
            </a>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#151515] px-4 text-sm font-medium text-white transition hover:bg-[#38322b]"
              href="/dashboard"
            >
              <LockKeyhole size={16} />
              Private
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-8 flex flex-wrap gap-2">
            {["Creative Director", "AI Workflow Builder", "Creative Technologist"].map((item) => (
              <span
                className="rounded-md border border-[#151515]/15 bg-white/60 px-3 py-2 text-sm text-[#4f4a43]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.01] sm:text-7xl lg:text-8xl">
            I design the work, then build the system that makes it possible.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#514b43] sm:text-xl">
            I am Darsh, a creative director with a sharp eye for taste, a deep
            curiosity for technology, and a practical obsession with using AI to
            remove friction from creative production.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#225e55] px-5 text-sm font-semibold text-white transition hover:bg-[#1b4b44]"
              href="#projects"
            >
              <Play size={18} />
              See the work
            </a>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#151515]/15 bg-white/65 px-5 text-sm font-semibold transition hover:bg-white"
              href="#approach"
            >
              <Sparkles size={18} />
              How I think
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 rounded-lg border border-[#151515]/10 bg-[#151515] p-4 text-white shadow-[0_28px_90px_rgba(25,21,17,0.22)]">
            <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
              <div className="overflow-hidden rounded-md bg-[#e9603f]">
                <Image
                  alt="Darsh GitHub avatar"
                  className="h-full min-h-48 w-full object-cover mix-blend-luminosity"
                  height={360}
                  priority
                  src="https://avatars.githubusercontent.com/u/219564966?v=4"
                  width={360}
                />
              </div>
              <div className="rounded-md bg-white/[0.06] p-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ee1d2]">
                  Public side
                </p>
                <h2 className="mt-4 text-3xl font-semibold">
                  Portfolio, projects, proof of taste.
                </h2>
                <p className="mt-4 leading-7 text-white/65">
                  The public site is for collaborators, clients, and curious
                  people. The private side becomes an operating dashboard later.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Repos", `${repos.length}`],
                ["Focus", "AI + Creative"],
                ["Mode", "Build in public"],
              ].map(([label, value]) => (
                <div className="rounded-md border border-white/10 p-4" key={label}>
                  <p className="text-sm text-white/45">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#151515]/10 bg-white" id="work">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-3">
          {lenses.map((lens) => {
            const Icon = lens.icon;

            return (
              <article className="rounded-lg border border-[#151515]/10 p-5" key={lens.title}>
                <Icon className="text-[#225e55]" size={26} />
                <h2 className="mt-5 text-2xl font-semibold">{lens.title}</h2>
                <p className="mt-3 leading-7 text-[#5b554d]">{lens.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]" id="approach">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.16em] text-[#225e55]">
            Approach
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            The work sits between taste, automation, and useful software.
          </h2>
        </div>
        <div className="grid gap-3">
          {principles.map((principle, index) => (
            <div
              className="grid gap-4 rounded-lg border border-[#151515]/10 bg-white/65 p-5 sm:grid-cols-[64px_1fr] sm:items-center"
              key={principle}
            >
              <span className="font-mono text-2xl text-[#e9603f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xl font-medium">{principle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#151515] px-5 py-20 text-white sm:px-8" id="projects">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.16em] text-[#9ee1d2]">
                GitHub Projects
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                Tools for creative production, AI workflows, and design systems.
              </h2>
            </div>
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-[#151515] transition hover:bg-[#ece7dc]"
              href="https://github.com/darshd9941"
              rel="noreferrer"
            target="_blank"
          >
              <GitBranch size={17} />
              View GitHub
            </a>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {featuredRepos.map((repo) => (
              <article
                className="flex min-h-72 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#9ee1d2]/60 hover:bg-white/[0.09]"
                key={repo.name}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-md bg-[#9ee1d2] px-2 py-1 text-xs font-semibold text-[#12362f]">
                      {getProjectType(repo)}
                    </span>
                    <ExternalLink className="text-white/35" size={18} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">
                    {formatRepoName(repo.name)}
                  </h3>
                  <p className="mt-4 leading-7 text-white/62">
                    {repo.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-white/45">
                    <span>{repo.language ?? "Code"}</span>
                    <span>/</span>
                    <span>{new Date(repo.updated_at).getFullYear()}</span>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#9ee1d2]"
                    href={repo.html_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open
                    <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid border-b border-[#151515]/10 bg-white lg:grid-cols-2">
        <div className="border-b border-[#151515]/10 p-8 sm:p-12 lg:border-b-0 lg:border-r">
          <Palette className="text-[#e9603f]" size={30} />
          <h2 className="mt-6 text-3xl font-semibold">Creative taste</h2>
          <p className="mt-4 max-w-xl leading-8 text-[#5b554d]">
            Direction, restraint, rhythm, hierarchy, mood, and the small choices
            that make work feel intentional instead of generated.
          </p>
        </div>
        <div className="p-8 sm:p-12">
          <Bot className="text-[#225e55]" size={30} />
          <h2 className="mt-6 text-3xl font-semibold">AI adaptation</h2>
          <p className="mt-4 max-w-xl leading-8 text-[#5b554d]">
            I use AI like a studio multiplier: writing tools, auditing output,
            building bridges between apps, and turning fuzzy workflows into
            repeatable systems.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f0e8] px-5 py-16 sm:px-8" id="contact">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-lg border border-[#151515]/10 bg-white p-6 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.16em] text-[#225e55]">
              Collaborate
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              Bring me a creative problem, a messy workflow, or a tool idea.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#151515] px-5 text-sm font-semibold text-white transition hover:bg-[#38322b]"
              href="mailto:hello@darsh.us"
            >
              <Mail size={18} />
              hello@darsh.us
            </a>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#151515]/15 px-5 text-sm font-semibold transition hover:bg-[#f4f0e8]"
              href="https://github.com/darshd9941"
              rel="noreferrer"
              target="_blank"
            >
              <Wand2 size={18} />
              Explore work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
