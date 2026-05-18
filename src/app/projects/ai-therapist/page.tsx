import type { Metadata } from "next";
import AITherapistContent from "./content";

export const metadata: Metadata = {
  title: "AI Therapist — HackGPT 2nd Place — Alexandre Vives",
  description:
    "FaceTime-style LLM-powered virtual therapist with real-time speech and a lip-synced avatar, built in 48 hours at HackGPT NYC. 2nd place out of ~80 teams.",
};

export default function AITherapistPage() {
  return <AITherapistContent />;
}
