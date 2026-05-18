import type { Metadata } from "next";
import MicrosegmentsContent from "./content";

export const metadata: Metadata = {
  title: "White-box Affinity Scoring — Alexandre Vives",
  description:
    "A white-box behavioral scoring system using 1,000+ binary flags to rank customers by product affinity — no retraining, +29% lift in campaign product openings.",
};

export default function MicrosegmentsPage() {
  return <MicrosegmentsContent />;
}
