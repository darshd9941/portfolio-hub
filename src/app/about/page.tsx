import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { Suite } from "@/components/suite";

export const metadata: Metadata = { title: "About", description: "About Darsh, a motion-minded designer, editor and creative systems builder." };

const PROCESS = [
  { step: "Brief", note: "What's the job, really?", track: "systems", span: 2 },
  { step: "Moodboard", note: "References, palette, type", track: "campaign", span: 2 },
  { step: "Cut / design", note: "The hero piece, done properly", track: "motion", span: 3 },
  { step: "Variants + checks", note: "Every size and format, scripted where possible", track: "ai", span: 3 },
  { step: "Export", note: "Correct dimensions. Miraculously.", track: "play", span: 2 },
];

const TOOLS = [
  ["Ae", "After Effects", "#2a1e4f", "#c9b8ff"],
  ["Pr", "Premiere Pro", "#2a1e4f", "#c9b8ff"],
  ["Ps", "Photoshop", "#0f2a44", "#8fc8ff"],
  ["Fi", "Figma", "#232326", "#edebe6"],
  ["AI", "Image + video AI", "#0f302b", "#7fe3d2"],
  ["Py", "Python", "#2e2a12", "#f0d46b"],
  ["JS", "ExtendScript / JS", "#2e2a12", "#f0d46b"],
];

export default function AboutPage() {
  return (
    <Suite file="CLIP INFO · DARSH.profile">
      <section className="wrap case-hero" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 24 }}>
          <p className="label">About / without the ceremonial headshot</p>
          <h1 className="disp h1">I build the ad, cut the film, and automate the boring bit.</h1>
          <p className="lede">My work sits between visual design, motion, editing and creative technology. I enjoy making campaign ideas feel tangible — then building cleaner ways to produce the twelve sizes, three formats and last-minute revision that inevitably follow.</p>
          <p className="lede">I&apos;m especially interested in growing deeper into After Effects and Premiere Pro: title design, short-form storytelling, compositing, transitions and the editorial choices that make a piece feel intentional.</p>
          <p className="lede">I use AI as production material, not as a substitute for direction. The useful part is choosing, shaping, checking and assembling until the result belongs to the project rather than the model.</p>
          <div className="actions"><Link className="btn btn-primary" href="/contact">Work with me →</Link></div>
        </div>
        <aside className="panel" aria-label="Clip info">
          <div className="panel-head"><span>PROPERTIES</span><span>DARSH.profile</span></div>
          <div className="mascot-panel"><Mascot /></div>
          <dl className="props-dl">
            <dt>Name</dt><dd>Darsh</dd>
            <dt>Location</dt><dd>Ahmedabad, IN · IST</dd>
            <dt>Now</dt><dd>Urban Space</dd>
            <dt>Codec</dt><dd>Motion / Edit / Systems</dd>
            <dt>Next</dt><dd>Deeper into AE + Premiere</dd>
            <dt>Mascot</dt><dd>Null — faceless, employable</dd>
            <dt style={{ borderBottom: 0 }}>Status</dt><dd style={{ borderBottom: 0, color: "var(--play)" }}>● Available</dd>
          </dl>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="label">Process</p>
            <h2 className="disp h2">A project, on my timeline</h2>
          </div>
        </div>
        <div className="panel tl-scroll">
          <div style={{ padding: "20px 16px" }}>
            <div className="process">
              {PROCESS.map((p) => (
                <div key={p.step} className={`track-${p.track}`} style={{ gridColumn: `span ${p.span}` }}>{p.step}</div>
              ))}
            </div>
            <div className="process-notes">
              {PROCESS.map((p) => <span key={p.step} style={{ gridColumn: `span ${p.span}` }}>{p.note}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <p className="label" style={{ marginBottom: 16 }}>Toolkit</p>
        <div className="toolkit">
          {TOOLS.map(([abbr, name, bg, fg]) => (
            <div className="tool" key={name}>
              <i aria-hidden="true" style={{ background: bg, color: fg }}>{abbr}</i>
              {name}
            </div>
          ))}
        </div>
      </section>
    </Suite>
  );
}
