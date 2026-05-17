import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandre Vives · Data Scientist",
  description:
    "Data Scientist at Santander. NYU MS in Data Science. Building causal inference, ML, and AI products that move business metrics.",
  keywords: [
    "Alexandre Vives",
    "Data Scientist",
    "Machine Learning",
    "Causal Inference",
    "A/B Testing",
    "Portfolio",
  ],
  authors: [{ name: "Alexandre Vives" }],
  openGraph: {
    title: "Alexandre Vives · Data Scientist",
    description:
      "Causal inference, predictive modeling, and AI products. Santander · ex-Meta · ex-HP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
