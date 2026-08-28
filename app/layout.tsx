import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "POW! Peptides — Purity with a punch";
  const description = "A high-impact research compound storefront prototype with transparent testing and total account control.";
  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: { icon: "/brand-assets/favicon/favicon.svg", shortcut: "/brand-assets/favicon/favicon-32.png", apple: "/brand-assets/favicon/apple-touch-icon.png" },
    openGraph: { title, description, images: [{ url: `${origin}/og.png`, width: 1732, height: 909, alt: "POW! Peptides — Purity with a punch" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
