"use client";
import { ABTestVisuals } from "./ABTestVisuals";
import { UpliftVisuals } from "./UpliftVisuals";
import { CLTVVisuals } from "./CLTVVisuals";

export function CaseStudyVisual({ slug }: { slug: string }) {
  if (slug === "ab-test-instagram-shop") return <ABTestVisuals />;
  if (slug === "uplift-model") return <UpliftVisuals />;
  if (slug === "cltv-model") return <CLTVVisuals />;
  return null;
}
