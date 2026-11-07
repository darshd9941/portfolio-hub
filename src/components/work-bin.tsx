"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LazyVideo } from "./lazy-video";

export type BinItem = {
  key: string;
  href: string;
  title: string;
  type: string;
  track: "motion" | "campaign" | "systems";
  format: string;
  client: string;
  image: string;
  video?: string;
};

type Filter = "all" | BinItem["track"];
type View = "list" | "grid" | "timeline";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "motion", label: "Motion" },
  { id: "campaign", label: "Campaign" },
  { id: "systems", label: "Systems" },
];

const VIEWS: { id: View; label: string }[] = [
  { id: "list", label: "List" },
  { id: "grid", label: "Grid" },
  { id: "timeline", label: "Tracks" },
];

const TRACK_ROWS: { id: string; track: BinItem["track"]; name: string }[] = [
  { id: "V3", track: "systems", name: "Systems" },
  { id: "V2", track: "motion", name: "Motion" },
  { id: "V1", track: "campaign", name: "Campaign" },
];

/** Width of one clip slot in the Tracks view, in px. */
const CLIP_STEP = 210;

export function WorkBin({ items, initialFilter = "all" }: { items: BinItem[]; initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [view, setView] = useState<View>("list");
  const shown = items.filter((item) => filter === "all" || item.track === filter);

  return (
    <>
      <section className="wrap" style={{ paddingBottom: 24 }}>
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by track">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${f.id === "all" ? "" : ` track-${f.id}`}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                <i aria-hidden="true" />
                {f.label}
                <small>{f.id === "all" ? items.length : items.filter((item) => item.track === f.id).length}</small>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="label" aria-live="polite">Showing {shown.length} of {items.length}</span>
            <div className="seg" role="group" aria-label="View">
              {VIEWS.map((v) => (
                <button key={v.id} type="button" aria-pressed={view === v.id} onClick={() => setView(v.id)}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {view === "list" && (
        <section className="wrap section">
          <div className="list-head" aria-hidden="true">
            <span>#</span><span>Name</span><span>Type</span><span>Format</span><span>Client</span>
          </div>
          {shown.map((item, i) => (
            <Link className={`list-row track-${item.track}`} href={item.href} key={item.key}>
              <span className="cell">{String(i + 1).padStart(2, "0")}</span>
              <span className="row-title">
                <span className="swatch" aria-hidden="true" />
                <span className="disp">{item.title}</span>
              </span>
              <span className="cell">{item.type}</span>
              <span className="cell">{item.format}</span>
              <span className="cell">{item.client}</span>
              <span className="row-thumb" aria-hidden="true">
                <Image src={item.image} alt="" fill sizes="190px" />
              </span>
            </Link>
          ))}
        </section>
      )}

      {view === "grid" && (
        <section className="wrap section card-grid">
          {shown.map((item, i) => (
            <Link className={`card track-${item.track}`} href={item.href} key={item.key}>
              <div className="card-media">
                <span className="badge">{item.format}</span>
                {item.video ? (
                  <LazyVideo src={item.video} poster={item.image} label={item.title} scrub />
                ) : (
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 320px" />
                )}
              </div>
              <span className="label">{String(i + 1).padStart(2, "0")} · {item.type}</span>
              <h3 className="disp">{item.title}</h3>
            </Link>
          ))}
        </section>
      )}

      {view === "timeline" && (
        <section className="wrap section">
          <div className="panel tl-view">
            <div className="panel-head">
              <span>Every piece of work laid out by track</span>
              <span>scroll sideways →</span>
            </div>
            <div className="tl-scroll">
              <div className="tl-inner" style={{ minWidth: 96 + Math.max(...TRACK_ROWS.map((row) => items.filter((item) => item.track === row.track).length)) * CLIP_STEP + 24 }}>
                {TRACK_ROWS.filter((row) => filter === "all" || row.track === filter).map((row) => {
                  const clips = items.filter((item) => item.track === row.track);
                  return (
                    <div className="tl-row" key={row.id}>
                      <div className="tl-head"><strong>{row.id}</strong>{row.name}</div>
                      <div className="tl-lane">
                        {clips.map((item, i) => (
                          <Link
                            key={item.key}
                            href={item.href}
                            className={`clip track-${item.track}`}
                            style={{ left: 8 + i * CLIP_STEP, width: CLIP_STEP - 8 }}
                          >
                            <span className="clip-name">{item.title}</span>
                            <span className="clip-meta">{item.format}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
