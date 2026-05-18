import type { Metadata } from "next";
import EnertexContent from "./content";

export const metadata: Metadata = {
  title: "Enertex CTO — E-commerce & Analytics — Alexandre Vives",
  description:
    "Co-founded and lead tech for Enertex, a wellness e-commerce selling EMF-filtering products across Europe — Shopify storefront, conversion optimization, and product analytics.",
};

export default function EnertexCTOPage() {
  return <EnertexContent />;
}
