import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Home,
  LayoutDashboard,
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Private Dashboard | Darsh",
  robots: "noindex, nofollow",
};

const navItems = [
  { label: "Dashboard", href: "/private", icon: LayoutDashboard },
  { label: "Drafts", href: "/private/drafts", icon: FileText },
];

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-[#f5f0e8]">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-[#f5f0e8]/10 bg-[#0a0a0a] p-5 lg:block">
            <Link
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#6affcc] transition hover:text-[#9dffe1]"
              href="/"
            >
              <ArrowLeft size={14} />
              Back to site
            </Link>

            <nav className="mt-10 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#bdb4aa] transition hover:bg-[#f5f0e8]/6 hover:text-[#f5f0e8]"
                    href={item.href}
                    key={item.href}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-10">
              <div className="rounded-lg border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6affcc]">
                  Private area
                </p>
                <p className="mt-2 text-xs text-[#8d867e]">
                  Authenticated via Basic Auth. Content here is not indexed or
                  publicly accessible.
                </p>
              </div>
            </div>
          </aside>

          {/* Mobile nav */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f5f0e8]/10 bg-[#0a0a0a] px-4 py-2 lg:hidden">
            <div className="flex items-center justify-around">
              <Link
                className="flex flex-col items-center gap-1 px-3 py-2 text-[#8d867e]"
                href="/"
              >
                <Home size={18} />
                <span className="text-[10px]">Home</span>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="flex flex-col items-center gap-1 px-3 py-2 text-[#8d867e]"
                    href={item.href}
                    key={item.href}
                  >
                    <Icon size={18} />
                    <span className="text-[10px]">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
