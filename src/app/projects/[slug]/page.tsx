import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import type { Metadata } from "next";
import { ProjectDetail } from "./ProjectDetail";

const CUSTOM_PAGE_SLUGS = new Set([
  "ab-test-instagram-shop",
  "cltv-model",
  "uplift-model",
  "fico-approximation",
  "microsegments-oracle",
  "printer-sales-forecast",
  "food-detection",
  "covid-simulation",
  "ai-therapist",
  "music-recommender",
  "enertex-cto",
]);

export function generateStaticParams() {
  return projects
    .filter((p) => !CUSTOM_PAGE_SLUGS.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Alexandre Vives`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return <ProjectDetail project={project} next={next} />;
}