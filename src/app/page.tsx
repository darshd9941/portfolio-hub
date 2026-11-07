import Image from "next/image";
import Link from "next/link";
import { HomeSequence } from "@/components/home-sequence";
import { Suite } from "@/components/suite";
import { campaigns } from "@/data/campaigns";
import { binName, ratioOf } from "@/lib/formats";

const BIN_PICKS: [slug: string, image: number][] = [
  ["winter", 1],
  ["story-ads", 0],
  ["diwali", 0],
  ["curtains", 0],
  ["sheer-curtains", 1],
  ["payday", 1],
  ["fresh-bedsheets", 0],
  ["tofy", 0],
];

const EFFECTS = [
  { name: "Motion + editing", desc: "Short-form films, campaign edits, title systems and social variants.", track: "motion" },
  { name: "Campaign design", desc: "Visual territories that survive more than one heroic launch post.", track: "campaign" },
  { name: "AI-assisted production", desc: "Image and video workflows directed with taste, checks and product fidelity.", track: "ai" },
  { name: "Creative automation", desc: "Small tools that remove repetitive production without removing the human decisions.", track: "systems" },
];

export default function Home() {
  const totalFrames = campaigns.reduce((sum, c) => sum + c.images.length, 0);
  const bin = BIN_PICKS.flatMap(([slug, index]) => {
    const campaign = campaigns.find((c) => c.slug === slug);
    const src = campaign?.images[index];
    return campaign && src ? [{ campaign, src }] : [];
  });

  return (
    <Suite file="SEQ_01 · PORTFOLIO_2026.prproj">
      <HomeSequence />

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="label">Project bin · campaign graphics</p>
            <h2 className="disp h2">{totalFrames} frames. {campaigns.length} campaigns.</h2>
          </div>
          <Link className="text-link" href="/work?type=campaign">Open the full bin →</Link>
        </div>
        <div className="bin-grid">
          {bin.map(({ campaign, src }) => (
            <Link className="bin-card" href={`/graphics/${campaign.slug}`} key={src}>
              <div className="bin-thumb">
                <span className="badge">{ratioOf(src)}</span>
                <Image src={src} alt={`${campaign.title} creative`} fill sizes="(max-width: 600px) 50vw, 200px" />
              </div>
              <span className="bin-name">{binName(src)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="fx-grid">
          <div>
            <p className="label" style={{ marginBottom: 10 }}>Effect controls · what I do</p>
            <h2 className="disp h2" style={{ marginBottom: 20 }}>Part editor. Part designer. Part workflow goblin.</h2>
            <p className="lede">I like the visible work and the invisible system behind it — the cut, the frame, the prompt, the naming convention, the final export that miraculously has the correct dimensions.</p>
          </div>
          <div className="panel">
            {EFFECTS.map((fx) => (
              <div className={`fx-row track-${fx.track}`} key={fx.name}>
                <span className="fx-tag">fx</span>
                <div>
                  <h3>{fx.name}</h3>
                  <p>{fx.desc}</p>
                </div>
                <div className="keys" aria-hidden="true"><i style={{ left: "10%" }} /><i style={{ left: "55%" }} /><i style={{ left: "88%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="cta">
          <div>
            <p className="label">Render queue · freelance / full-time / interesting trouble</p>
            <h2 className="disp">Timeline on fire?</h2>
          </div>
          <Link className="btn btn-primary" href="/contact">Queue a brief →</Link>
        </div>
      </section>
    </Suite>
  );
}
