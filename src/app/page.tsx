import {
  ArrowRight,
  GitBranch,
  LockKeyhole,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    name: "AI Study Companion",
    type: "Full-stack app",
    status: "Live soon",
    description:
      "A learning dashboard with notes, summaries, and personal progress tracking.",
    stack: ["Next.js", "Supabase", "OpenAI"],
  },
  {
    name: "Automation Lab",
    type: "Server project",
    status: "Private beta",
    description:
      "A collection of scripts, bots, and dashboards for personal workflows.",
    stack: ["Node.js", "GitHub API", "Cron"],
  },
  {
    name: "Portfolio OS",
    type: "This site",
    status: "Building now",
    description:
      "A public portfolio connected to projects, writing, apps, and a protected dashboard.",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
];

const publicLinks = ["About", "Projects", "Contact"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#171512]">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a className="text-sm font-semibold tracking-wide" href="#">
          Portfolio Hub
        </a>
        <div className="hidden items-center gap-6 text-sm text-[#5c554a] sm:flex">
          {publicLinks.map((item) => (
            <a className="transition hover:text-[#171512]" href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <Link
          className="inline-flex h-10 items-center gap-2 rounded-md bg-[#171512] px-4 text-sm font-medium text-white transition hover:bg-[#2f2a22]"
          href="/dashboard"
        >
          <LockKeyhole size={16} />
          Private
        </Link>
      </nav>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-20 lg:pt-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#d7c8a8] bg-white/70 px-3 py-2 text-sm text-[#5c554a]">
            <Sparkles size={16} />
            Public portfolio now, private tools next
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Your domain becomes a home base for your work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c554a]">
            A polished portfolio for visitors, a protected dashboard for your
            own systems, and one place to connect GitHub projects, apps,
            experiments, writing, and future server tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#245d51] px-5 text-sm font-semibold text-white transition hover:bg-[#1c493f]"
              href="#projects"
            >
              <Rocket size={18} />
              See Projects
            </a>
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#cfc2aa] bg-white/70 px-5 text-sm font-semibold text-[#171512] transition hover:bg-white"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={18} />
              Connect GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-3 rounded-lg border border-[#d8ccb8] bg-white p-4 shadow-[0_24px_80px_rgba(50,43,31,0.12)]">
          <div className="flex items-center justify-between rounded-md bg-[#171512] p-4 text-white">
            <div>
              <p className="text-sm text-white/60">Domain plan</p>
              <p className="mt-1 text-xl font-semibold">Public + Private</p>
            </div>
            <ShieldCheck className="text-[#9dd6c9]" size={28} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[#e6dece] p-4">
              <p className="text-sm font-semibold">yourdomain.com</p>
              <p className="mt-2 text-sm leading-6 text-[#6b6256]">
                Portfolio, projects, contact, demos, and visitor interaction.
              </p>
            </div>
            <div className="rounded-md border border-[#e6dece] p-4">
              <p className="text-sm font-semibold">/dashboard</p>
              <p className="mt-2 text-sm leading-6 text-[#6b6256]">
                Protected admin area for servers, notes, apps, and automations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfd3bc] bg-white" id="about">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-3">
          {[
            ["Portfolio", "A public page that presents your skills, work, links, and contact path."],
            ["Project Graph", "A future GitHub-powered layer that can pull repos, activity, and featured builds."],
            ["Private Ops", "A dashboard for tools only you can access once authentication is enabled."],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-3 leading-7 text-[#625b50]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" id="projects">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#245d51]">
              Featured Work
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Start with these cards, then sync GitHub.
            </h2>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#245d51]"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              className="rounded-lg border border-[#ddd0b9] bg-white p-5 shadow-[0_10px_40px_rgba(50,43,31,0.06)]"
              key={project.name}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#756c5e]">{project.type}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
                </div>
                <span className="rounded-md bg-[#e1efe8] px-2 py-1 text-xs font-semibold text-[#245d51]">
                  {project.status}
                </span>
              </div>
              <p className="mt-4 min-h-20 leading-7 text-[#625b50]">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    className="rounded-md border border-[#ddd0b9] px-2 py-1 text-xs text-[#625b50]"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#171512] px-5 py-14 text-white sm:px-8" id="contact">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd6c9]">
              Next Step
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold">
              Replace the placeholders with your real name, GitHub, projects,
              and domain.
            </h2>
          </div>
          <a
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[#171512] transition hover:bg-[#f0eadf]"
            href="mailto:you@example.com"
          >
            <Mail size={18} />
            Contact
          </a>
        </div>
      </section>
    </main>
  );
}
