import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Srinidhi Jagannathan — AI Product Manager",
    template: "%s — Srinidhi Jagannathan",
  },
  description:
    "AI Product Manager building production AI systems. MSBA at Santa Clara University. Available Summer 2026.",
  authors: [{ name: "Srinidhi Jagannathan" }],
  openGraph: {
    type: "website",
    title: "Srinidhi Jagannathan — AI Product Manager",
    description: "Building production AI systems and turning data into strategic decisions.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
