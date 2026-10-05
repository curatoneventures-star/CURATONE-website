import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const title = "Curatone Music Academy | Music Education in Enugu";
const description = "Curatone Music Academy provides structured music education for children, teenagers and aspiring musicians in Enugu, Nigeria.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title, description, icons: { icon: "/images/logo.png" },
  openGraph: { title, description, type: "website", locale: "en_NG", siteName: "CURATONE MUSIC ACADEMY", images: ["/images/class-keyboard.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "MusicSchool", name: "CURATONE MUSIC ACADEMY", email: site.email, founder: { "@type": "Person", name: site.founder }, address: { "@type": "PostalAddress", addressRegion: "Enugu State", addressCountry: "NG" } };
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></body>
    </html>
  );
}
