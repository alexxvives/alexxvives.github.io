import type { Metadata } from "next";
import MusicRecommenderContent from "./content";

export const metadata: Metadata = {
  title: "MusicAI — Playlist Auto-Clusterer — Alexandre Vives",
  description:
    "A Gaussian Mixture Model + LLM pipeline that clusters a Spotify library by audio features and genre embeddings, names clusters with a local LLM, and rebuilds them as Spotify playlists.",
};

export default function MusicRecommenderPage() {
  return <MusicRecommenderContent />;
}
