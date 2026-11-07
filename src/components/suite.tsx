"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const EMAIL = "djdarshan9941@gmail.com";

export const SOCIAL_LINKS = [
  { name: "GitHub", handle: "darshd9941", href: "https://github.com/darshd9941" },
  { name: "X", handle: "@Darshd9941", href: "https://x.com/Darshd9941" },
];

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const FPS = 25;
/** Every page is treated as a sequence this long; scrolling moves the playhead through it. */
const SEQUENCE_SECONDS = 90;

export function formatTimecode(seconds: number) {
  const frames = Math.max(0, Math.round(seconds * FPS));
  const pad = (n: number) => String(n).padStart(2, "0");
  const h = Math.floor(frames / (FPS * 3600));
  const m = Math.floor(frames / (FPS * 60)) % 60;
  const s = Math.floor(frames / FPS) % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames % FPS)}`;
}

/** Timecode that follows the scroll position, like a playhead moving through the page. */
function useScrollTimecode() {
  const [tc, setTc] = useState(formatTimecode(0));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setTc(formatTimecode(progress * SEQUENCE_SECONDS));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return tc;
}

export function AppBar({ file }: { file: string }) {
  const pathname = usePathname();
  const tc = useScrollTimecode();

  return (
    <header className="appbar">
      <Link className="appbar-brand" href="/" aria-label="Darsh — home">
        <span className="appbar-mark">D/</span>
        <span className="appbar-file">{file}</span>
      </Link>
      <nav className="appbar-nav" aria-label="Primary">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.href === "/work" && pathname.startsWith("/graphics/"))
                ? "page"
                : undefined
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="appbar-meta">
        <span className="tc" aria-label="Scroll position as timecode">{tc}</span>
        <Link className="rec" href="/contact">
          <span className="rec-dot" aria-hidden="true" />
          <span className="rec-label">REC · </span>Available
        </Link>
      </div>
    </header>
  );
}

export function StatusBar() {
  return (
    <footer className="statusbar">
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <nav aria-label="Elsewhere">
        {SOCIAL_LINKS.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
            {link.name} ↗
          </a>
        ))}
      </nav>
      <span>Ahmedabad · IST · © {new Date().getFullYear()} Darsh</span>
    </footer>
  );
}

/** Page shell: app bar on top, status bar at the bottom. */
export function Suite({ file, children }: { file: string; children: React.ReactNode }) {
  return (
    <div className="suite">
      <AppBar file={file} />
      <main>{children}</main>
      <StatusBar />
    </div>
  );
}
