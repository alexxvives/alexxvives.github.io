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
  title: "Alexandre Vives · Data Scientist · Causal inference & ML",
  description:
    "Barcelona-born data scientist. Causal inference, A/B testing and ML in production at Santander. Previously Meta and HP. NYU MS, Purdue BS. Open to roles across Europe.",
  keywords: [
    "Alexandre Vives",
    "Data Scientist",
    "Machine Learning",
    "Causal Inference",
    "A/B Testing",
    "Barcelona",
    "Europe",
    "Portfolio",
  ],
  authors: [{ name: "Alexandre Vives" }],
  openGraph: {
    title: "Alexandre Vives · Data Scientist",
    description:
      "Causal inference, A/B testing and ML in production. Santander, ex-Meta, ex-HP. Open to Europe.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre Vives · Data Scientist",
    description:
      "Causal inference, A/B testing and ML in production. Santander, ex-Meta, ex-HP. Open to Europe.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
