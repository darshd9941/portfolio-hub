"use client";

import { useEffect, useState } from "react";
import { EMAIL, SOCIAL_LINKS } from "./suite";

const TYPES = [
  { id: "motion", label: "Motion / edit" },
  { id: "campaign", label: "Campaign design" },
  { id: "ai", label: "AI production" },
  { id: "tools", label: "Creative tooling" },
  { id: "role", label: "Full-time role" },
];

const URGENCY = [
  { id: "relaxed", label: "Relaxed", hint: "a month or more", track: "ai" },
  { id: "soon", label: "Soon", hint: "next 2–3 weeks", track: "systems" },
  { id: "fire", label: "On fire", hint: "yesterday, ideally", track: "play" },
];

function useAhmedabadTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function BriefBuilder() {
  const [types, setTypes] = useState<string[]>(["motion"]);
  const [urgency, setUrgency] = useState("soon");
  const [brief, setBrief] = useState("");
  const time = useAhmedabadTime();

  const chosen = TYPES.filter((t) => types.includes(t.id)).map((t) => t.label);
  const urg = URGENCY.find((u) => u.id === urgency) ?? URGENCY[1];
  const subject = `Brief: ${chosen.join(" + ") || "Something interesting"} — ${urg.label}`;
  const body = brief.trim() ? `${brief.trim()}\n\nTimeline: ${urg.label} (${urg.hint})` : `Timeline: ${urg.label} (${urg.hint})`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const toggle = (id: string) => setTypes((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <section className="wrap section split">
      <form className="panel brief" action={mailto} onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }}>
        <fieldset>
          <legend className="label">01 · What are we making? (pick any)</legend>
          <div className="chips">
            {TYPES.map((t) => (
              <button key={t.id} type="button" className="chip" aria-pressed={types.includes(t.id)} onClick={() => toggle(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="label">02 · How hot is the timeline?</legend>
          <div className="choices">
            {URGENCY.map((u) => (
              <button key={u.id} type="button" className={`choice track-${u.track}`} aria-pressed={urgency === u.id} onClick={() => setUrgency(u.id)}>
                <strong>{u.label}</strong>
                <span>{u.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label className="label" htmlFor="brief">03 · The brief, in a few lines</label>
          <textarea id="brief" value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Brand, what you need, by when…" />
        </div>
        <div><button type="submit" className="btn btn-primary" style={{ border: 0, cursor: "pointer" }}>Add to render queue →</button></div>
      </form>

      <div className="split-r">
        <div className="panel">
          <div className="panel-head"><span>EXPORT SUMMARY</span><span>opens your email app</span></div>
          <dl className="props-dl">
            <dt>Job</dt><dd>{chosen.join(", ") || "—"}</dd>
            <dt>Priority</dt><dd className={`track-${urg.track}`} style={{ color: "var(--track)" }}>{urg.label} · {urg.hint}</dd>
            <dt>Send to</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
            <dt style={{ borderBottom: 0 }}>Local time</dt><dd style={{ borderBottom: 0 }}>Ahmedabad {time ? `· ${time} IST` : ""}</dd>
          </dl>
        </div>
        <nav className="panel elsewhere" aria-label="Find me elsewhere">
          <div className="panel-head"><span>FIND ME ELSEWHERE</span></div>
          {SOCIAL_LINKS.map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noreferrer">
              <strong>{l.name}</strong>
              <span className="label">{l.handle} ↗</span>
            </a>
          ))}
          <a href={`mailto:${EMAIL}`}>
            <strong>Email</strong>
            <span className="label" style={{ textTransform: "none" }}>{EMAIL}</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
