import type { Metadata } from "next";
import CovidSimContent from "./content";

export const metadata: Metadata = {
  title: "COVID-19 Agent-Based Simulation — Alexandre Vives",
  description:
    "Agent-based stochastic simulation of COVID-19 spread in Tippecanoe County, evaluating masks, school closures and WFH as mitigations across 12 scenarios and ~200k synthetic agents.",
};

export default function CovidSimPage() {
  return <CovidSimContent />;
}
