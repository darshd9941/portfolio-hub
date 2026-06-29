import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-frame";

export const metadata: Metadata = { title: "Contact", description: "Contact Darsh for freelance work or full-time creative roles." };
export default function ContactPage() {
  return (
    <main className="portfolio-site contact-page"><SiteHeader inverted />
      <section className="contact-stage"><p className="kicker">Freelance + full-time</p><h1>Let’s make something people don’t scroll past.</h1><p>Campaigns, motion edits, creative production systems—or a role where those things collide in an interesting way.</p><a className="contact-email" href="mailto:hello@darsh.us">hello@darsh.us <ArrowUpRight size={34} /></a><div className="contact-links"><a href="https://github.com/darshd9941">GitHub ↗</a><a href="https://x.com/Darshd9941">X ↗</a><span>Ahmedabad, India</span></div><Mascot /></section>
    </main>
  );
}
