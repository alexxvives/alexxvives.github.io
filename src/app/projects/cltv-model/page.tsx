import type { Metadata } from "next";
import CLTVContent from "./content";

export const metadata: Metadata = {
  title: "Customer Lifetime Value Model — Alexandre Vives",
  description:
    "How a gradient-boosted CLTV model shifted Santander's marketing from volume acquisition to value acquisition, lifting average deposits per campaign by 18%.",
};

export default function CLTVPage() {
  return <CLTVContent />;
}
