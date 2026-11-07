"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LazyVideo } from "./lazy-video";
import { formatTimecode } from "./suite";
import { campaigns } from "@/data/campaigns";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

/** Where each project sits on the home timeline, as % of the lane width. */
const PLACEMENT: Record<string, { left: number; width: number }> = {
  "dreamy-aesthetic-reel": { left: 3, width: 25 },
  "curtain-theory": { left: 30, width: 25 },
  "payday-offer-film": { left: 57, width: 25 },
  "rakhi-gifting-system": { left: 2, width: 33 },
  "creative-automation": { left: 58, width: 34 },
};

const TRACKS = [
  { id: "V3", name: "Systems", track: "systems" },
  { id: "V2", name: "Motion", track: "motion" },
  { id: "V1", name: "Campaign", track: "campaign" },
] as const;

const SEQUENCE_SECONDS = 90;
const TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
const WAVE = Array.from({ length: 120 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.37)) * 60 + Math.abs(Math.sin(i * 1.7)) * 20);

function isPortrait(project: PortfolioProject) {
  return project.format.startsWith("9:16") || project.format.startsWith("4:5");
}

function stillOf(project: PortfolioProject) {
  return project.hero.type === "video" ? project.hero.poster ?? project.hero.src : project.hero.src;
}

export function HomeSequence() {
  const [selected, setSelected] = useState("curtain-theory");
  const project = portfolioProjects.find((p) => p.slug === selected) ?? portfolioProjects[0];
  const place = PLACEMENT[project.slug];
  const fraction = (place.left + place.width * 0.35) / 100;
  const timecode = formatTimecode(fraction * SEQUENCE_SECONDS);
  const portrait = isPortrait(project);
  const href = `/work/${project.slug}`;

  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <div className="stack">
            <p className="label">V3 · Titles — Darsh / motion, editing, creative systems</p>
            <h1 className="disp h1">
              I make ads <span className="accent">move.</span>
            </h1>
            <p className="disp hero-sub">Then I make the workflow behave.</p>
          </div>
          <div className="props">
            <div><p className="label">Role</p><p>Motion designer + editor</p></div>
            <div><p className="label">Based</p><p>Ahmedabad, India</p></div>
            <div><p className="label">Tools</p><p>AE · Premiere · Figma · AI</p></div>
            <div><p className="label">Open to</p><p>Freelance + full-time</p></div>
          </div>
          <div className="actions">
            <Link className="btn btn-primary" href="/work">▶ Play the work</Link>
            <Link className="btn btn-ghost" href="/contact">Queue a brief</Link>
          </div>
        </div>

        <div className="panel monitor">
          <div className="panel-head">
            <span>PROGRAM: {project.name.toUpperCase().replace(/ /g, "_")}</span>
            <span>{project.format}</span>
          </div>
          <div className="monitor-screen">
            <div key={project.slug} className={`monitor-media${portrait ? " is-portrait" : ""}`}>
              {portrait && <Image className="monitor-backdrop" src={stillOf(project)} alt="" fill sizes="30vw" quality={40} />}
              {project.hero.type === "video" ? (
                <LazyVideo src={project.hero.src} poster={project.hero.poster} label={project.hero.alt} scrub />
              ) : (
                <Image src={project.hero.src} alt={project.hero.alt} fill priority sizes="(max-width: 860px) 100vw, 58vw" style={{ objectFit: portrait ? "contain" : "cover" }} />
              )}
            </div>
            <div className="safe" aria-hidden="true" />
            <div className="safe-2" aria-hidden="true" />
            <span className="chip-dark monitor-tc">{timecode}</span>
            <div className="monitor-overlay">
              <div>
                <span className="chip-dark">{project.eyebrow}</span>
                <p className="disp monitor-title">{project.name}</p>
              </div>
              <Link className="btn btn-light" href={href}>Open sequence →</Link>
            </div>
          </div>
          <div className="monitor-foot">
            <span aria-hidden="true">▶</span>
            <div className="progress" aria-hidden="true"><span style={{ width: `${Math.round(fraction * 100)}%` }} /></div>
            <span>Hover = scrub · Click a clip below</span>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-label="Project timeline">
        <div className="panel">
          <div className="panel-head">
            <span>TIMELINE: SELECTED_WORK_2025—2026 · click a clip to load it into the monitor</span>
            <span>{portfolioProjects.length + 1} clips · 4 tracks · snapping on</span>
          </div>
          <div className="tl-scroll">
            <div className="tl-inner">
              <div className="tl-row tl-ruler">
                <div className="tl-head" />
                <div className="tl-lane">
                  {TICKS.map((t) => (
                    <span key={t} className="tick" style={{ left: `${t}%` }}>{formatTimecode((t / 100) * SEQUENCE_SECONDS).slice(0, 8)}</span>
                  ))}
                  <span className="marker" style={{ right: 8 }}>◆ NULL: still rendering…</span>
                </div>
              </div>

              {TRACKS.map((tr) => (
                <div className="tl-row" key={tr.id}>
                  <div className="tl-head"><strong>{tr.id}</strong>{tr.name}</div>
                  <div className="tl-lane">
                    {portfolioProjects
                      .filter((p) => p.track === tr.track)
                      .map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          className={`clip track-${p.track}`}
                          aria-pressed={p.slug === selected}
                          aria-label={`Load ${p.name} into the monitor`}
                          onClick={() => setSelected(p.slug)}
                          style={{ left: `${PLACEMENT[p.slug].left}%`, width: `${PLACEMENT[p.slug].width}%` }}
                        >
                          <span className="clip-name">{p.name}</span>
                          <span className="clip-meta">{p.format}</span>
                        </button>
                      ))}
                    {tr.track === "campaign" && (
                      <Link className="clip track-campaign" href="/work?type=campaign" style={{ left: "37%", width: "40%", opacity: 0.85 }}>
                        <span className="clip-name">{campaigns.length} campaigns · graphics →</span>
                        <span className="clip-meta">nested sequence · open the bin</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              <div className="tl-row">
                <div className="tl-head"><strong>A1</strong>Audio</div>
                <div className="tl-lane">
                  <div className="wave" aria-hidden="true">
                    {WAVE.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
                  </div>
                </div>
              </div>

              <div className="playhead" aria-hidden="true" style={{ left: `calc(96px + (100% - 96px) * ${fraction})` }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
