import type { Metadata } from "next";
import FICOContent from "./content";

export const metadata: Metadata = {
  title: "FICO Score Approximation Model — Alexandre Vives",
  description:
    "An internal model that approximates bureau FICO using banking signals, cutting expensive bureau pulls by ~60% and enabling decisions for thin-file customers.",
};

export default function FICOPage() {
  return <FICOContent />;
}
