import type { Metadata } from "next";
import AbTestContent from "./content";

export const metadata: Metadata = {
  title: "A/B Testing on Instagram's Shop — Alexandre Vives",
  description:
    "How we ran the A/B test for Instagram Shop's new ranking algorithm, from picking the right metric to making the launch call.",
};

export default function AbTestPage() {
  return <AbTestContent />;
}
