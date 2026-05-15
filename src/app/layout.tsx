import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promptnest.ai"),
  title: {
    default: "PromptNest AI – Discover AI Inspirations That Spark Creativity",
    template: "%s | PromptNest AI",
  },
  description:
    "Curated AI prompts, stunning visuals, and endless inspiration. From Midjourney to ChatGPT – discover, share, and monetize your best AI creations.",
  keywords: [
    "AI prompts",
    "Midjourney prompts",
    "ChatGPT prompts",
    "AI inspiration",
    "AI art",
    "Stable Diffusion prompts",
    "room setup ideas",
    "AI wallpapers",
    "prompt sharing",
  ],
  authors: [{ name: "PromptNest AI" }],
  creator: "PromptNest AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptnest.ai",
    siteName: "PromptNest AI",
    title: "PromptNest AI – Discover AI Inspirations That Spark Creativity",
    description:
      "Curated AI prompts, stunning visuals, and endless inspiration for creators.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptNest AI – Discover AI Inspirations That Spark Creativity",
    description: "Curated AI prompts, stunning visuals, and endless inspiration.",
    creator: "@promptnestai",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AnalyticsProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
