import type { Metadata } from "next";
import UpliftContent from "./content";

export const metadata: Metadata = {
  title: "Causal Uplift Model for Credit Card Campaigns — Alexandre Vives",
  description:
    "A two-model T-learner that targets persuadable customers, lifting credit card acquisitions +15% with zero additional budget.",
};

export default function UpliftModelPage() {
  return <UpliftContent />;
}
