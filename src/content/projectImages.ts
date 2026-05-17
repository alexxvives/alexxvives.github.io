// Hero images for project cards and case-study pages.
// Sourced from Unsplash (free for commercial use, no attribution required).
// To swap, replace the URL. Use ?w=1200&q=80&auto=format&fit=crop for consistent sizing.
const W = "?w=1400&q=80&auto=format&fit=crop";

export const projectImages: Record<string, string> = {
  // Work — Santander
  "cltv-model": `https://images.unsplash.com/photo-1554224155-6726b3ff858f${W}`, // financial charts
  "fico-approximation": `https://images.unsplash.com/photo-1563013544-824ae1b704d3${W}`, // credit cards
  "uplift-model": `https://images.unsplash.com/photo-1556761175-5973dc0f32e7${W}`, // marketing / people
  "microsegments-oracle": `https://images.unsplash.com/photo-1551288049-bebda4e38f71${W}`, // dashboard
  // Work — Meta / HP / Research
  "customer-retention-meta": `https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0${W}`, // instagram on phone
  "printer-sales-forecast": `https://images.unsplash.com/photo-1553413077-190dd305871c${W}`, // warehouse
  "food-detection": `https://images.unsplash.com/photo-1546069901-ba9599a7e63c${W}`, // plate of food
  "covid-simulation": `https://images.unsplash.com/photo-1584036561566-baf8f5f1b144${W}`, // pandemic / abstract
  // Personal
  "ab-test-instagram-shop": `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7${W}`, // phone w/ shopping feed
  "ai-therapist": `https://images.unsplash.com/photo-1587560699334-cc4ff634909a${W}`, // video call laptop
  "music-recommender": `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4${W}`, // headphones / music
  "enertex-cto": `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15${W}`, // warm cozy lamp
  "scope-consulting": `https://images.unsplash.com/photo-1556761175-b413da4baf72${W}`, // team meeting
  "akademo": `https://images.unsplash.com/photo-1501504905252-473c47e087f8${W}`, // online learning
  "priorityfly": `https://images.unsplash.com/photo-1540962351504-03099e0a754b${W}`, // private jet
  "polybot": `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3${W}`, // trading screens
};

export function getProjectImage(slug: string): string | undefined {
  return projectImages[slug];
}
