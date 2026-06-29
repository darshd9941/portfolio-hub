import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SiteFooter, SiteHeader } from "@/components/site-frame";

export const metadata: Metadata = { title: "About", description: "About Darsh, a motion-minded designer, editor and creative systems builder." };
export default function AboutPage() {
  return (
    <main className="portfolio-site about-page"><SiteHeader />
      <section className="about-hero"><div><p className="kicker">About / without the ceremonial headshot</p><h1>I’m Darsh. I build the ad, cut the film and occasionally automate the boring bit.</h1></div><Mascot /></section>
      <section className="about-body"><div className="about-lead">Based in Ahmedabad. Available for freelance projects and full-time creative roles.</div><div className="about-copy"><p>My work sits between visual design, motion, editing and creative technology. I enjoy making campaign ideas feel tangible—then building cleaner ways to produce the twelve sizes, three formats and last-minute revision that inevitably follow.</p><p>I’m especially interested in growing deeper into After Effects and Premiere Pro: title design, short-form storytelling, compositing, transitions and the editorial choices that make a piece feel intentional.</p><p>I use AI as production material, not as a substitute for direction. The useful part is choosing, shaping, checking and assembling until the result belongs to the project rather than the model.</p><Link className="button button-dark" href="/contact">Work with me <ArrowUpRight size={17} /></Link></div></section>
      <section className="tool-cloud"><span>After Effects</span><span>Premiere Pro</span><span>Photoshop</span><span>Figma</span><span>AI image + video</span><span>Creative automation</span><span>Campaign systems</span></section>
      <SiteFooter />
    </main>
  );
}
