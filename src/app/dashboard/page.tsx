import {
  Activity,
  ArrowLeft,
  Database,
  GitBranch,
  KeyRound,
  Server,
  Settings,
} from "lucide-react";
import Link from "next/link";

const dashboardItems = [
  {
    title: "Authentication",
    detail: "Add Clerk or Supabase Auth before putting private tools online.",
    icon: KeyRound,
  },
  {
    title: "GitHub Sync",
    detail: "Pull selected repositories, stars, commits, and featured project metadata.",
    icon: GitBranch,
  },
  {
    title: "Server Tools",
    detail: "Connect APIs, scheduled jobs, logs, deployments, and private utilities.",
    icon: Server,
  },
  {
    title: "Database",
    detail: "Store contacts, messages, project notes, app settings, and dashboard data.",
    icon: Database,
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#11100e] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between">
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            href="/"
          >
            <ArrowLeft size={16} />
            Portfolio
          </Link>
          <div className="inline-flex items-center gap-2 rounded-md bg-[#213f38] px-3 py-2 text-sm text-[#9dd6c9]">
            <KeyRound size={16} />
            Auth required before launch
          </div>
        </nav>

        <section className="py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd6c9]">
            Private Dashboard
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            This is where your personal tools will live.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Right now this page is a planning shell. Before deployment, protect
            it with login middleware so only your account can access it.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/55">System Status</p>
                <p className="mt-2 text-2xl font-semibold">Planning</p>
              </div>
              <Activity className="text-[#9dd6c9]" size={28} />
            </div>
            <div className="mt-8 space-y-4">
              {["Portfolio route", "Dashboard route", "Auth gate", "GitHub API", "Database"].map(
                (item, index) => (
                  <div className="flex items-center justify-between gap-3" key={item}>
                    <span className="text-sm text-white/70">{item}</span>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        index < 2
                          ? "bg-[#d9f6ea] text-[#173a31]"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {index < 2 ? "Ready" : "Next"}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {dashboardItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
                  key={item.title}
                >
                  <Icon className="text-[#9dd6c9]" size={24} />
                  <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 leading-7 text-white/65">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <div className="flex items-center gap-3">
            <Settings className="text-[#9dd6c9]" size={22} />
            <h2 className="text-xl font-semibold">Launch checklist</h2>
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-white/65">
            Deploy the public portfolio first. Then add authentication,
            environment variables, GitHub API access, and database storage
            before connecting private apps or server controls.
          </p>
        </section>
      </div>
    </main>
  );
}
