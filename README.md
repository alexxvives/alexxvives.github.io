# Alexandre Vives — Portfolio

Personal data science portfolio. Live at https://alexxvives.github.io/.

## Stack

- **Next.js 15** (App Router, `output: "export"` for static GitHub Pages hosting)
- **TypeScript** + **Tailwind CSS 3** (custom dark theme, lime accent)
- **Framer Motion** for entrance and layout animations
- **Recharts** for custom case-study visualizations (A/B test buyer funnel, uplift curves, ramp plans, HTE)
- **Lucide** icons · Inter (display) + JetBrains Mono (mono)

Deployed via GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`).

## Local dev

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
```

## Editing content

All content lives under `src/content/`:

- `profile.ts` — bio, contact, experience, education, awards, skills.
- `projects.ts` — every case study shown on the homepage and at `/projects/[slug]`.
- `projectImages.ts` — slug → hero image URL. Swap any image in one edit.

Custom case-study visualizations live under `src/components/charts/`.

## Notes

- Image optimization is off (`images.unoptimized: true`) because GitHub Pages is static-only.
- `public/.nojekyll` keeps GitHub Pages from running Jekyll on the build output.
- All metrics referenced (deposits per campaign, bureau pulls, etc.) are anonymized but real Santander work.

