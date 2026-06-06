import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darsh.us"),
  title: {
    default: "Darsh — Creative Systems Lab",
    template: "%s | Darsh.us",
  },
  description:
    "Darsh is a creative director building campaign systems, AI workflows, Adobe automation, and practical tools for modern creative production.",
  keywords: [
    "Darsh",
    "creative director",
    "designer",
    "AI workflow",
    "Adobe automation",
    "ComfyUI",
    "brand design",
    "creative systems",
    "portfolio",
  ],
  authors: [{ name: "Darsh" }],
  creator: "Darsh",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darsh.us",
    siteName: "Darsh.us",
    title: "Darsh — Creative Systems Lab",
    description:
      "Campaign systems, AI workflows, Adobe automation, and practical creative tools built by Darsh.",
    images: [
      {
        url: "/hero.jpg",
        width: 1600,
        height: 900,
        alt: "Darsh — Creative Systems Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darsh — Creative Systems Lab",
    description:
      "Campaign systems, AI workflows, Adobe automation, and practical creative tools built by Darsh.",
    creator: "@Darshd9941",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="canonical" href="https://darsh.us" />
      </head>
      <body className="min-h-full flex flex-col">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
