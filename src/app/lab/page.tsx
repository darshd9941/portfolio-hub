import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SiteFooter, SiteHeader } from "@/components/site-frame";

export const metadata: Metadata = { title: "Motion + Lab", description: "Motion interests and creative production experiments by Darsh." };
const experiments = [
  ["AE auto-caption", "Transcription-to-styled-text experiments for After Effects.", "https://github.com/darshd9941/ae-auto-caption"],
  ["AI rough-cut assistant", "Transcripts, take selection and Premiere-friendly rough-cut output.", "https://github.com/darshd9941/ai-rough-cut-assistant"],
  ["Figma → AE bridge", "A practical handoff route between layout and animation.", "https://github.com/darshd9941/figma-ae-bridge"],
  ["Brand consistency checker", "Rules and checks for keeping generated assets inside a visual system.", "https://github.com/darshd9941/brand-consistency-checker"],
];
export default function LabPage() {
  return (
    <main className="portfolio-site lab-page"><SiteHeader inverted />
      <section className="lab-hero"><div><p className="kicker">Motion + lab</p><h1>I like making the frame.<br />I also like fixing the factory.</h1></div><Mascot /></section>
      <section className="lab-manifesto"><p>After Effects and Premiere are where I want to go deeper next. Until the giant showreel exists, this page shows the direction honestly: motion thinking, edit structure and small tools built around real production pain.</p></section>
      <section className="experiment-list">{experiments.map(([title, copy, href], index) => <a href={href} target="_blank" rel="noreferrer" key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div><ArrowUpRight size={25} /></a>)}</section>
      <SiteFooter />
    </main>
  );
}
