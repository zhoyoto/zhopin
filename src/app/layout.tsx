import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import Script from "next/script";

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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
  },
};

import GlobalAuthModal from "@/components/GlobalAuthModal";
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2362880425680323"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wrubyp3klq");
            `,
          }}
        />
        <meta name="p:domain_verify" content="0a208a03fc7e03d15b100af32fb61b75" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          <AnalyticsProvider />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <GlobalAuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
