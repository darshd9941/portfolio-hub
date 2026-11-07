"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Mascot } from "./mascot";
import { SiteFooter, SiteHeader } from "./site-frame";
import { portfolioProjects } from "@/data/portfolio";

const HopeMachine = dynamic(() => import("./hope-machine").then((module) => module.HopeMachine), {
  loading: () => <div className="hope-machine-loading" aria-label="Hope engine waking" />,
});

function ProjectVisual({ project, priority = false }: { project: (typeof portfolioProjects)[number]; priority?: boolean }) {
  if (project.hero.type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={project.hero.poster}
        aria-label={project.hero.alt}
      >
        <source src={project.hero.src} type="video/mp4" />
      </video>
    );
  }

  return <Image src={project.hero.src} alt={project.hero.alt} fill priority={priority} sizes="(max-width: 900px) 100vw, 38vw" />;
}

export function PublicHome() {
  const featured = portfolioProjects.slice(0, 4);

  return (
    <main className="portfolio-site">
      <SiteHeader />

      <section className="new-hero">
        <div className="hero-copy">
          <p className="kicker hero-kicker">Darsh / Motion, systems, hopeful trouble</p>
          <h1>I make ads <em>move.</em><br />Then I make the workflow behave.</h1>
          <p className="hero-deck">
            Motion design, editing and AI-assisted creative production for brands that would prefer not to look dead on arrival.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/work">See selected work <ArrowUpRight size={17} /></Link>
            <Link className="text-link" href="/about">The person, minus the face <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div className="hero-stage-new"><HopeMachine /></div>

        <a className="hero-scroll" href="#selected">Selected work <ArrowDown size={16} /></a>
      </section>

      <section className="ticker" aria-label="Capabilities">
        <div>
          <span>Premiere Pro</span><i>✦</i><span>After Effects</span><i>✦</i><span>Campaign Design</span><i>✦</i><span>AI Production</span><i>✦</i><span>Creative Systems</span><i>✦</i>
          <span>Premiere Pro</span><i>✦</i><span>After Effects</span><i>✦</i><span>Campaign Design</span><i>✦</i><span>AI Production</span><i>✦</i><span>Creative Systems</span><i>✦</i>
        </div>
      </section>

      <section className="selected-work" id="selected">
        <div className="section-intro">
          <p className="kicker">01 / Selected work</p>
          <h2>Proof, not decorative rectangles.</h2>
          <p>Campaign systems, edited stories and experiments made for the messy reality between an idea and its deadline.</p>
        </div>

        <div className="project-list">
          {featured.map((project, index) => (
            <Link className={`project-row project-${project.accent}`} href={`/work/${project.slug}`} key={project.slug}>
              <div className="project-index">0{index + 1}</div>
              <div className="project-copy">
                <p>{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <span>{project.summary}</span>
              </div>
              <div className="project-visual">
                <ProjectVisual project={project} />
              </div>
              <ArrowUpRight className="project-arrow" size={27} />
            </Link>
          ))}
        </div>

        <Link className="all-work-link" href="/work">View the full work archive <ArrowUpRight size={18} /></Link>
      </section>

      <section className="split-statement">
        <div className="statement-dark">
          <p className="kicker">02 / What I do</p>
          <h2>Part editor.<br />Part designer.<br />Part workflow goblin.</h2>
          <p>I like the visible work and the invisible system behind it—the cut, the frame, the prompt, the naming convention, the final export that miraculously has the correct dimensions.</p>
        </div>
        <div className="services-stack">
          {[
            ["Motion + editing", "Short-form films, campaign edits, title systems and social variants."],
            ["Campaign design", "Visual territories that survive more than one heroic launch post."],
            ["AI-assisted production", "Image and video workflows directed with taste, checks and product fidelity."],
            ["Creative automation", "Small tools that remove repetitive production without removing the human decisions."],
          ].map(([title, copy], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mascot-break">
        <Mascot />
        <div>
          <p className="kicker">Meet Null</p>
          <h2>No face. No opinions about aspect ratios. Surprisingly employable.</h2>
          <p>Null is the studio mascot, timeline witness and convenient stand-in for a portfolio owner who would rather let the work appear on camera.</p>
          <Link className="text-link" href="/about">More about the studio <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
