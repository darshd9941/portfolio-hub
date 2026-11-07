import type { Metadata } from "next";
import { BriefBuilder } from "@/components/brief-builder";
import { Suite } from "@/components/suite";

export const metadata: Metadata = { title: "Contact", description: "Contact Darsh for freelance work or full-time creative roles." };

export default function ContactPage() {
  return (
    <Suite file="RENDER QUEUE · NEW JOB">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 64px) 32px" }}>
        <p className="label" style={{ color: "var(--play)", marginBottom: 14 }}>● REC · Freelance + full-time</p>
        <h1 className="disp h1">Let&apos;s make something people don&apos;t scroll past.</h1>
        <p className="lede" style={{ marginTop: 20 }}>Campaigns, motion edits, creative production systems — or a role where those things collide in an interesting way.</p>
      </section>
      <BriefBuilder />
    </Suite>
  );
}
