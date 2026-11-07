import type { Metadata } from "next";
import { LabEngine } from "@/components/lab-engine";
import { Suite } from "@/components/suite";

export const metadata: Metadata = { title: "Lab", description: "Creative production tools and motion experiments by Darsh." };

const GITHUB = "https://github.com/darshd9941/";

const PRESETS = [
  { name: "AE auto-caption", repo: "ae-auto-caption", track: "motion", tags: ["After Effects", "ExtendScript", "Whisper"], desc: "Whisper transcription, a cleanup pass, then styled text layers with hold keyframes — straight into After Effects.", io: ["interview.wav", "comp with styled captions"] },
  { name: "AI rough-cut assistant", repo: "ai-rough-cut-assistant", track: "ai", tags: ["Premiere Pro", "XML", "Claude"], desc: "Transcripts in; best takes and in/out points out, as a Premiere-ready XML.", io: ["raw takes + transcript", "rough_cut.xml"] },
  { name: "Figma → AE bridge", repo: "figma-ae-bridge", track: "campaign", tags: ["Figma plugin", "CEP panel"], desc: "Layer transfer from layout to animation that survives auto-layout, components, text and blend modes.", io: ["Figma frame", "editable AE layers"] },
  { name: "Brand consistency checker", repo: "brand-consistency-checker", track: "systems", tags: ["Python", "YAML", "Reports"], desc: "Lint for brand design: checks the colour, type and voice of generated assets against YAML rules.", io: ["brand.yaml + assets", "compliance report"] },
  { name: "NL motion builder", repo: "nl-motion-builder", track: "motion", tags: ["After Effects", "LLM"], desc: "Describe motion in plain English, get ExtendScript that builds the whole composition.", io: ["\"logo drops, settles, glows\"", "built AE comp"] },
  { name: "AE project auditor", repo: "ae-project-auditor", track: "systems", tags: ["After Effects", "Audit"], desc: "Finds orphaned assets, broken expressions and slow layers before the render does.", io: ["project.aep", "audit list"] },
];

export default function LabPage() {
  return (
    <Suite file="EFFECTS & PRESETS · LAB">
      <section className="wrap hero" style={{ alignItems: "center" }}>
        <div className="stack">
          <p className="label" style={{ color: "var(--t-systems)" }}>● fx · Lab / independent builds</p>
          <h1 className="disp h1">I make the frame. I also fix the factory.</h1>
          <p className="lede">After Effects and Premiere are where I&apos;m going deeper next. This page shows the other half honestly: small tools built around real production pain — captions, rough cuts, handoffs, brand checks.</p>
        </div>
        <div className="panel">
          <div className="panel-head"><span>EXPERIMENTAL: HOPE_ENGINE.three</span><span>drag to orbit · pick a signal</span></div>
          <div className="engine"><LabEngine /></div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="label">Presets · open source on GitHub</p>
            <h2 className="disp h2">Tools for the part nobody puts in the moodboard</h2>
          </div>
          <a className="text-link" href="https://github.com/darshd9941" target="_blank" rel="noreferrer">All repos on GitHub ↗</a>
        </div>
        <div className="presets">
          {PRESETS.map((p, i) => (
            <article className={`panel preset track-${p.track}`} key={p.repo}>
              <div className="preset-screen" aria-hidden="true">
                <div><b>IN</b>  {p.io[0]}</div>
                <div><b>→</b>   {p.name.toLowerCase().replace(/ /g, "_")}</div>
                <div><b>OUT</b> {p.io[1]}</div>
              </div>
              <div className="preset-body">
                <div className="preset-top">
                  <span className="fx-tag">fx {String(i + 1).padStart(2, "0")}</span>
                  <span className="toggle" aria-hidden="true" />
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <a className="repo" href={GITHUB + p.repo} target="_blank" rel="noreferrer">github.com/darshd9941/{p.repo} ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Suite>
  );
}
