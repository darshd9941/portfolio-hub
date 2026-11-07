import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Archivo's width axis gives the condensed display titles; JetBrains Mono
// carries every timecode, label and piece of metadata.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darsh.us"),
  title: {
    default: "Darsh — Motion, Editing & Creative Systems",
    template: "%s | Darsh.us",
  },
  description:
    "Darsh is a motion-minded designer and editor building campaign systems, AI-assisted creative work, and practical tools for modern production.",
  keywords: [
    "Darsh",
    "motion designer",
    "video editor",
    "designer",
    "AI workflow",
    "Adobe automation",
    "ComfyUI",
    "brand design",
    "creative systems",
    "portfolio",
  ],
  authors: [{ name: "Darsh" }],
  alternates: { canonical: "./" },
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
    title: "Darsh — Motion, Editing & Creative Systems",
    description:
      "Motion, editing, campaign design and creative production systems built by Darsh.",
    images: [
      {
        url: "/hero.jpg",
        width: 1600,
        height: 900,
        alt: "Darsh — Motion, Editing & Creative Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darsh — Motion, Editing & Creative Systems",
    description:
      "Motion, editing, campaign design and creative production systems built by Darsh.",
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
      className={`${archivo.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
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
