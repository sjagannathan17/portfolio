import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "./fonts/GeistVF.woff", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srinidhijagannathan.com"),
  title: {
    default: "Srinidhi Jagannathan — AI Builder & Product",
    template: "%s — Srinidhi Jagannathan",
  },
  description:
    "Master's student in Business Analytics at Santa Clara University — building AI systems (RAG pipelines, multi-agent apps) and making my way into product.",
  authors: [{ name: "Srinidhi Jagannathan" }],
  openGraph: {
    type: "website",
    title: "Srinidhi Jagannathan — AI Builder & Product",
    description:
      "Master's student in Business Analytics at Santa Clara University — building AI systems and turning data into decisions.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
