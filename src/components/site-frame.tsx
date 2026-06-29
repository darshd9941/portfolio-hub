import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Motion + Lab" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  return (
    <header className={`site-header ${inverted ? "site-header-inverted" : ""}`}>
      <Link className="site-mark" href="/" aria-label="Darsh home">
        D/
      </Link>
      <nav aria-label="Primary navigation">
        {nav.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="header-cta" href="mailto:hello@darsh.us">
        Available for work <ArrowUpRight size={15} />
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="kicker">Freelance / Full-time / Interesting trouble</p>
        <h2>Have a brief, a role, or a timeline on fire?</h2>
      </div>
      <a href="mailto:hello@darsh.us">hello@darsh.us <ArrowUpRight size={22} /></a>
      <div className="footer-meta">
        <span>Ahmedabad, India</span>
        <span>Motion · Editing · Creative systems</span>
        <span>© {new Date().getFullYear()} Darsh</span>
      </div>
    </footer>
  );
}
