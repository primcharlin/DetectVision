import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DetectVision | One private AI system for your business", template: "%s | DetectVision" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: "DetectVision", description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: "DetectVision", description: site.description },
};

export const viewport: Viewport = { themeColor: "#f7f6f2" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only z-[60] rounded-full bg-signal px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
