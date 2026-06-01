import { getSql } from "@/lib/db";
import {
  Activity,
  BarChart3,
  Calendar,
  FileText,
  TrendingUp,
  Play,
} from "lucide-react";

export const dynamic = "force-dynamic";

const socialCards = [
  {
    platform: "Twitter / X",
    handle: "@Darshd9941",
    icon: TrendingUp,
    color: "#1da1f2",
    stat: "Connect API",
    label: "followers",
  },
  {
    platform: "YouTube",
    handle: "Your channel",
    icon: Play,
    color: "#ff0000",
    stat: "Connect API",
    label: "subscribers",
  },
  {
    platform: "Instagram",
    handle: "Your profile",
    icon: BarChart3,
    color: "#e4405f",
    stat: "Connect API",
    label: "followers",
  },
  {
    platform: "Today",
    handle: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    icon: Calendar,
    color: "#6affcc",
    stat: "No data yet",
    label: "Connect AI app",
  },
];

export default async function PrivateDashboard() {
  let draftCount = 0;
  let recentActivity: {
    id: number;
    type: string;
    title: string;
    summary: string | null;
    created_at: string;
  }[] = [];

  try {
    const sql = getSql();
    const draftRows =
      await sql`SELECT COUNT(*) as count FROM drafts WHERE status = 'draft'`;
    draftCount = Number(draftRows[0]?.count ?? 0);

    const rows =
      await sql`SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10`;
    recentActivity = rows as unknown as typeof recentActivity;
  } catch {
    // Tables may not exist yet — show empty state
  }

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc]">
            Private
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f5f0e8] sm:text-4xl">
            Dashboard
          </h1>
        </div>
        <div className="rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 px-4 py-2">
          <p className="font-mono text-xs text-[#8d867e]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Social stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {socialCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              className="group rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-5 transition hover:border-[#f5f0e8]/20 hover:bg-[#f5f0e8]/8"
              key={card.platform}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#f5f0e8]">
                  {card.platform}
                </span>
                <Icon size={18} style={{ color: card.color }} />
              </div>
              <p className="mt-1 font-mono text-xs text-[#8d867e]">
                {card.handle}
              </p>
              <p className="mt-6 text-2xl font-semibold text-[#f5f0e8]">
                {card.stat}
              </p>
              <p className="mt-1 text-xs text-[#8d867e]">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick stats row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-5">
          <div className="flex items-center gap-2 text-[#6affcc]">
            <FileText size={18} />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              Drafts
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold">{draftCount}</p>
          <p className="mt-1 text-xs text-[#8d867e]">Pending content</p>
        </div>
        <div className="rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-5">
          <div className="flex items-center gap-2 text-[#ff8b70]">
            <Activity size={18} />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              Activity
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold">
            {recentActivity.length}
          </p>
          <p className="mt-1 text-xs text-[#8d867e]">Recent events</p>
        </div>
        <div className="rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-5">
          <div className="flex items-center gap-2 text-[#bdb4aa]">
            <Calendar size={18} />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              Today
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold text-[#8d867e]">
            Connect AI app
          </p>
          <p className="mt-1 text-xs text-[#8d867e]">
            Daily summary will appear here
          </p>
        </div>
      </div>

      {/* Today's summary placeholder */}
      <div className="mt-6 rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-6">
        <h2 className="text-lg font-semibold text-[#f5f0e8]">
          Today&apos;s Summary
        </h2>
        <div className="mt-4 flex flex-col items-center justify-center py-10 text-center">
          <Calendar className="text-[#8d867e]" size={40} />
          <p className="mt-4 text-sm text-[#8d867e]">
            Connect your personal AI app to see daily summaries, conversation
            highlights, and activity logs.
          </p>
          <p className="mt-2 font-mono text-xs text-[#5a5148]">
            Coming in Phase 2
          </p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-6">
        <h2 className="text-lg font-semibold text-[#f5f0e8]">
          Recent Activity
        </h2>
        {recentActivity.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center py-10 text-center">
            <Activity className="text-[#8d867e]" size={40} />
            <p className="mt-4 text-sm text-[#8d867e]">
              No activity logged yet. Activity from your AI conversations and
              content pipeline will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <div
                className="flex items-start gap-4 rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/3 p-4"
                key={item.id}
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6affcc]" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#f5f0e8]">
                    {item.title}
                  </p>
                  {item.summary && (
                    <p className="mt-1 text-xs text-[#bdb4aa]">
                      {item.summary}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[10px] text-[#5a5148]">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-[#f5f0e8]/8 px-2 py-1 font-mono text-[10px] uppercase text-[#8d867e]">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
