export type ProjectCategory = "Work" | "Personal" | "Research";

export type Project = {
  slug: string;
  title: string;
  org: string;
  date: string;
  category: ProjectCategory;
  tags: string[];
  blurb: string;
  /** Hero image. Use Unsplash photo IDs (https://images.unsplash.com/photo-XYZ). */
  image?: string;
  /** Optional credit shown subtly under hero. */
  imageCredit?: string;
  link?: { label: string; href: string };
  impact?: { label: string; value: string }[];
  // Rich case-study content rendered on /projects/[slug]
  problem: string;
  approach: string[];
  results: string[];
  learnings?: string[];
  hasCustomVisual?: boolean;
  /** Override section heading labels for this project */
  sectionLabels?: {
    problem?: string;
    approach?: string;
    results?: string;
    learnings?: string;
  };
};

const allProjects: Project[] = [
  // ───────────── Work ─────────────
  {
    slug: "cltv-model",
    title: "Customer Lifetime Value Model",
    org: "Santander Bank",
    date: "2024",
    category: "Work",
    tags: ["Supervised Learning", "XGBoost", "Marketing", "Snowflake"],
    blurb:
      "Supervised learning model predicting 2-year customer profitability, used to shift marketing strategy from volume to quality acquisition.",
    impact: [
      { label: "lift in avg deposits per campaign", value: "+18%" },
      { label: "customer-level profitability horizon", value: "2 yr" },
    ],
    problem:
      "Marketing campaigns were optimized for raw acquisition volume, attracting many low-value customers. Leadership needed a way to score prospects by expected long-term profitability so spend could be reallocated toward high-value segments.",
    approach: [
      "Defined CLTV target as 2-year net contribution margin per customer (deposits × NIM − cost-to-serve − attrition-adjusted).",
      "Engineered ~180 features from product holdings, transaction velocity, digital engagement, demographics, and ZIP-level enrichment.",
      "Trained a gradient-boosted regression (XGBoost) with monotonic constraints on key risk features; tuned via 5-fold time-aware CV.",
      "Calibrated predictions with isotonic regression on a held-out cohort and bucketed scores into deciles for marketing handoff.",
      "Deployed in Snowflake with monthly batch scoring and a Streamlit dashboard for campaign owners to slice scores by product.",
    ],
    results: [
      "+18% lift in avg deposits per campaign after redirecting spend to top 3 deciles.",
      "Adopted across 4 marketing pillars (deposits, lending, credit cards, wealth).",
      "Reduced campaign acquisition cost by 11% with same revenue target.",
    ],
    learnings: [
      "Monotonic constraints made the model legible to risk and compliance reviewers, critical for adoption in a regulated environment.",
      "Decile bucketing was the right interface for marketers: predicted dollars were noisy, but rank order was very stable.",
    ],
    hasCustomVisual: true,
  },
  {
    slug: "fico-approximation",
    title: "FICO Score Approximation Model",
    org: "Santander Bank",
    date: "2024",
    category: "Work",
    tags: ["Credit Risk", "Gradient Boosting", "Onboarding", "Cost Optimization"],
    blurb:
      "Internal model approximating bureau FICO at onboarding to cut expensive bureau pulls by ~60% and enable instant decisions for thin-file customers.",
    impact: [
      { label: "reduction in bureau pulls", value: "−60%" },
      { label: "thin-file customers newly scorable", value: "12k+" },
    ],
    problem:
      "Every credit decision required a hard bureau pull at a unit cost. For many low-risk applicants, the pull was wasteful. For thin-file applicants without a FICO score, the bank had no signal at all and defaulted to declines.",
    approach: [
      "Built a regression model targeting FICO using internal banking signals: deposit patterns, account age, payroll cadence, digital footprint, peer benchmarks.",
      "Set up a guard-rail policy: only skip the bureau pull when (i) approximation falls in a safe band and (ii) prediction interval is tight (conformal prediction).",
      "For thin-file customers, used a separate classifier predicting 24-month delinquency directly, calibrated to be at most as risky as the existing FICO cutoff.",
      "Validated on 18 months of out-of-time data and shadowed in production for 60 days before activation.",
    ],
    results: [
      "≈60% fewer paid bureau pulls at onboarding with no measurable lift in default rate.",
      "12k+ previously-rejected thin-file customers approved within risk-equivalent bounds.",
      "Sub-200ms inference integrated into the onboarding API.",
    ],
    learnings: [
      "Conformal prediction intervals were what made risk leadership comfortable enough to ship.",
      "The real win wasn't ML accuracy, it was a hybrid policy that ML + business rules made possible.",
    ],
  },
  {
    slug: "uplift-model",
    title: "Causal Uplift Model for Credit Card Campaigns",
    org: "Santander Bank",
    date: "2024",
    category: "Work",
    tags: ["Causal Inference", "Uplift", "Marketing", "A/B Testing"],
    blurb:
      "Two-model uplift framework that targets customers most likely to be persuaded by an offer, lifting acquisitions by +15% with the same budget.",
    impact: [
      { label: "credit card acquisitions vs. control", value: "+15%" },
      { label: "marketing budget delta", value: "0%" },
    ],
    problem:
      "Most response models predict propensity to convert, not incremental response. Targeting high-propensity customers often wastes spend on people who would have converted anyway (`sure things`) while ignoring the persuadable middle.",
    approach: [
      "Used a holdout-controlled campaign as training data: treatment (offer) vs. control (no offer) random assignment.",
      "Estimated CATE (Conditional Average Treatment Effect) with both a Two-Model T-learner (XGBoost) and an X-learner for robustness.",
      "Validated with Qini curves and uplift-by-decile on held-out controls.",
      "Defined four quadrants: persuadables, sure-things, lost-causes, sleeping-dogs. Targeted only persuadables.",
      "Rolled out via the marketing platform's audience segmentation API.",
    ],
    results: [
      "+15% incremental acquisitions vs. propensity-targeting baseline at flat spend.",
      "Identified ~7% of audience as 'sleeping dogs' (negative uplift) and suppressed them explicitly.",
      "Now a default modeling pattern for credit card and personal loan campaigns.",
    ],
    learnings: [
      "Holdouts are sacred. Without disciplined control groups, uplift modeling collapses.",
      "Stakeholders found the persuadables/sleeping-dogs framing more intuitive than CATE numbers.",
    ],
    hasCustomVisual: true,
  },
  {
    slug: "microsegments-oracle",
    title: "White-box Affinity Scoring",
    org: "Santander Bank",
    date: "2023",
    category: "Work",
    tags: ["White-box ML", "Segmentation", "A/B Testing", "Rolling Windows"],
    blurb:
      "White-box system using 1,000+ behavioral segment flags to rank customers into deciles by product affinity, auto-updating with a 90-day rolling window.",
    impact: [
      { label: "lift in product openings per campaign", value: "+29%" },
      { label: "behavioral segment flags", value: "1,000+" },
      { label: "model retraining cost", value: "$0" },
    ],
    problem:
      "Black-box scoring models drifted constantly, required quarterly retraining, and produced scores that marketers couldn't explain to compliance or to themselves.",
    approach: [
      "Mined ~1,000 binary behavioral flags (e.g. 'made 3+ Zelle transfers in last 30d', 'opened savings in last 90d').",
      "For each product, ranked flags by historical lift over baseline open-rate and assigned interpretable weights.",
      "Combined flag activations into a transparent linear score, validated against a holdout A/B test.",
      "Designed the system to self-update with a rolling 90-day window, flag weights recomputed nightly, no retraining ceremony required.",
    ],
    results: [
      "+29% lift in product opening rates per campaign.",
      "Zero retraining downtime, model adapts continuously.",
      "Marketers can explain exactly why a customer is in the top decile (4-5 flag attributions).",
    ],
    learnings: [
      "Sometimes the right answer isn't deep learning. It's an interpretable system with a tight feedback loop.",
      "Explainability is a feature: adoption skyrocketed once marketing trusted the score.",
    ],
  },
  {
    slug: "customer-retention-meta",
    title: "Instagram Shop Buyer Retention Analysis",
    org: "Meta (Facebook)",
    date: "Summer 2022",
    category: "Work",
    tags: ["Behavioral Analytics", "Product Strategy", "Retention", "Cohort Analysis"],
    blurb:
      "Analyzed buyer retention on the Instagram Shopping tab, uncovering behavioral drivers that shaped retargeting and product roadmap decisions.",
    impact: [
      { label: "behavioral drivers identified", value: "5" },
      { label: "recommendations adopted by product", value: "3" },
    ],
    problem:
      "Instagram Shopping had strong first-purchase conversion but weak second-purchase retention. The product team needed to know what behaviors at session N predicted return at session N+1.",
    approach: [
      "Built cohort retention curves segmented by acquisition channel, category, and creator-attribution.",
      "Fit a logistic regression on session-level engagement to identify the strongest predictors of 30-day repeat purchase.",
      "Ran survival analysis (Kaplan-Meier + Cox PH) on time-to-second-purchase.",
      "Synthesized findings into 5 behavioral drivers and prioritized intervention opportunities by reach × effect size.",
    ],
    results: [
      "Identified saved-collections engagement and creator-follow within 24h of purchase as the two strongest retention predictors.",
      "3 of 5 recommendations adopted: improved post-purchase notification flow, surfaced save action more prominently, added creator-follow CTA on order confirmation.",
    ],
    learnings: [
      "Survival analysis communicates retention to PMs better than cohort tables. The curves tell a story.",
      "Effect size × addressable population is the right prioritization metric, not p-values.",
    ],
  },
  {
    slug: "printer-sales-forecast",
    title: "Printer Sales Time-Series Forecast",
    org: "Hewlett-Packard",
    date: "Spring 2021",
    category: "Work",
    tags: ["Time Series", "SARIMA", "Forecasting", "Supply Chain"],
    blurb:
      "Built AR/MA/ARIMA/SARIMA forecasting pipeline for printer SKUs, improving accuracy by ~27% and supporting global supply-chain planning.",
    impact: [
      { label: "forecast accuracy improvement", value: "+27%" },
      { label: "SKUs forecasted", value: "120+" },
    ],
    problem:
      "Supply chain planning relied on judgment-based forecasts that systematically over-ordered on slow SKUs and under-ordered on hits.",
    approach: [
      "Decomposed weekly sales into trend, seasonality, and residuals (STL).",
      "Benchmarked AR, MA, ARIMA, SARIMA, and exponential-smoothing baselines per SKU family.",
      "Auto-selected per-SKU model via AIC and rolling-origin backtests.",
      "Delivered as a parameterized R/Python pipeline producing forecasts and confidence bands.",
    ],
    results: [
      "~27% MAPE reduction vs. legacy forecast.",
      "Adopted by planning team for 120+ SKUs across 3 product lines.",
    ],
    learnings: [
      "Per-SKU model selection beat any single model globally, heterogeneity dominates.",
      "Confidence bands changed how planners thought about safety stock.",
    ],
  },

  // ───────────── Research ─────────────
  {
    slug: "food-detection",
    title: "Food Detection & Classification (CNN + ResNet-50)",
    org: "Purdue · Prof. Edward J. Delp",
    date: "Fall 2020",
    category: "Research",
    tags: ["Computer Vision", "Deep Learning", "ResNet-50", "PyTorch"],
    blurb:
      "Computer vision pipeline to detect, segment, and classify food items from self-reported meal photos. Published at Purdue Research Conference.",
    impact: [
      { label: "top-1 classification accuracy", value: "82%" },
      { label: "food classes", value: "101" },
    ],
    problem:
      "Manual dietary logging is unreliable. Could a phone camera passively detect what's on a plate?",
    approach: [
      "Built a baseline CNN from scratch (4 conv blocks, ~2M params) on Food-101.",
      "Migrated to ResNet-50 fine-tuning with progressive unfreezing and discriminative learning rates.",
      "Added a segmentation head (U-Net style) for multi-item plates.",
      "Heavy augmentation: rotation, color jitter, mixup, meal photos are noisy.",
    ],
    results: [
      "82% top-1 / 95% top-5 accuracy on Food-101.",
      "Functional plate segmentation on a held-out custom test set.",
      "Published & presented at Purdue Undergraduate Research Conference.",
    ],
    learnings: [
      "Transfer learning > training from scratch by an enormous margin with limited data.",
      "Augmentation choices matter more than architecture choices at this scale.",
    ],
  },
  {
    slug: "covid-simulation",
    title: "Tippecanoe County COVID-19 Simulation",
    org: "Purdue · Prof. Mario Ventresca",
    date: "Summer 2020",
    category: "Research",
    tags: ["Stochastic Simulation", "Agent-Based", "R", "Public Health"],
    blurb:
      "Agent-based stochastic simulation of COVID-19 spread in Tippecanoe County, evaluating masks, school closures and WFH as mitigations.",
    impact: [
      { label: "synthetic population", value: "~200k agents" },
      { label: "mitigation scenarios", value: "12" },
    ],
    problem:
      "Public-health decision-makers needed scenario evidence for non-pharmaceutical interventions before vaccines were available.",
    approach: [
      "Generated a synthetic population matching county demographics, household sizes, and workplace/school structure.",
      "Assigned probabilistic daily schedules (home → work/school → errands → home) with location-specific contact graphs.",
      "Implemented SEIR-style transmission with stochastic contact draws and infection probability tunable per location.",
      "Ran 1,000 Monte Carlo replicates per scenario in R.",
    ],
    results: [
      "Quantified relative effect of masks, school closures, and WFH, and their interactions.",
      "Found combined interventions had super-additive effects on R-effective.",
    ],
    learnings: [
      "Stochastic agent-based models are powerful for communicating uncertainty.",
      "Population synthesis is half the work, and the most underrated step.",
    ],
  },

  // ───────────── Personal ─────────────
  {
    slug: "ab-test-instagram-shop",
    title: "A/B Testing a Recommender System: End-to-End Walkthrough",
    org: "Meta (Instagram)",
    date: "Summer 2022",
    category: "Work",
    tags: ["A/B Testing", "Experimentation", "Recommender Systems", "Statistical Inference", "Causal Inference"],
    blurb:
      "End-to-end A/B test walkthrough for a ranking algorithm change on the Instagram Shop tab — from user journey mapping through the seven-step experimental framework: problem definition, hypothesis setup, experiment design, execution, validity checks, results interpretation, and launch decision.",
    impact: [
      { label: "methodology steps", value: "7" },
      { label: "lift in avg revenue / user / day", value: "+4.4%" },
      { label: "users per arm", value: "2.1M" },
    ],
    sectionLabels: {
      approach: "Methodology",
      results: "Results & Interpretation",
      learnings: "Launch Decision",
    },
    problem:
      "Instagram Shop used a ranking algorithm to surface products for each user. The team built a new version and wanted to know if it moved the needle. The chosen KPI: **average revenue per user per day** — not conversion rate, not click-through rate. _Conversion rate treats a $5 phone case and a $200 jacket as identical signals._ Revenue per user captures both purchase frequency and purchase value. That distinction shapes the sample size calculation, the interpretation of any observed lift, and whether the result actually means something to the business.",
    approach: [
      "**Step 1 — Understand the Problem & Define the Metric.** The user journey has six stages: impression → click → product page view → add to cart → checkout → order placed. A ranking algorithm can win at clicks and silently lose downstream. The success metric must capture the full chain. **Average revenue per user per day** satisfies the four required qualities: _measurable_ (server-side event log), _attributable_ (tied to the treatment session), _sensitive_ (lower variance than raw GMV), _timely_ (a 14-day window is short enough to iterate on rapidly).",
      "> \"Conversion rate is a volume signal. Revenue per user is a value signal. An algorithm that surfaces many cheap products can easily win on conversion rate while quietly losing on the metric that matters to the business.\"",
      "**Step 2 — Define the Hypothesis.** H₀: average revenue per user per day is the same in control and treatment. H₁: it differs. Parameters locked before the experiment starts: significance level α = `0.05` (the decision threshold — if the probability of observing this result by chance is below 5%, we reject H₀), statistical power = `0.80` (80% probability of detecting a real effect if one exists), MDE = `1%` relative lift (smallest improvement worth the engineering cost of shipping). These three numbers fully determine the required sample size — none are revisited after seeing early data.",
      "**Step 3 — Design the Experiment.** _Randomization unit_: users, not sessions. Hashing `user_id` into 1,000 buckets ensures each person always sees one algorithm — session-level randomization would let the same user encounter both models and contaminate the readout. _Target population_: users who performed at least one search (the moment the algorithm activates), not the entire platform. _Sample size_: applying n ≈ 16σ²/Δ² with baseline variance and a 1% MDE yields roughly **~2.1M users per arm**. _Duration_: 1–2 full weeks to capture weekday/weekend cycles. _Ramp_: 1% → 5% → 25% → 50%, with daily guardrail checks between each step.",
      "**Step 4 — Run the Experiment.** Instrumentation logs `user_id`, arm assignment, and all downstream conversion events tied to the treatment session. Daily guardrail monitoring: crash rate, p95 latency, ads revenue per user, hide-and-report rate. **Critical rule: no peeking at the primary metric p-value mid-experiment.** Every intermediate check is a decision opportunity that erodes the Type I error guarantee — the end date is committed to before launch and is not moved based on what the data shows at day 7.",
      "**Step 5 — Validity Checks.** Four checks before reading the result: **(1) Instrumentation audit** — event loss rate < 0.3%, within tolerance. **(2) AA test** — 50/50 split with no treatment applied the week prior; p-value on revenue/user = `0.61`, confirming the randomization pipeline was unbiased before the real test began. **(3) Ratio check** — chi-square test on arm sizes: 50.1% / 49.9%, p = `0.42`, no meaningful imbalance. **(4) Novelty effect** — week-2 lift was 91% of week-1, confirming the effect is real and not a launch-day curiosity spike.",
      "> \"The AA test is the foundation of experimental credibility. If you skip it and the groups turn out to be unbalanced before treatment, every number you report afterward is confounded — and there is no way to know.\"",
    ],
    results: [
      "Control group: avg revenue per user per day = **$25.00**. Treatment group: **$26.10**. Absolute lift: **+$1.10/user/day**. Relative lift: **+4.4%**.",
      "**p-value = 0.01 < 0.05** → statistically significant. We reject H₀. There is a 1% probability of observing a lift this large by pure chance given no real underlying effect.",
      "**95% confidence interval: [+3.4%, +5.4%]**. The entire interval sits above the 1% MDE — the result is _both_ statistically and practically significant. This is a strong, clean signal.",
      "Funnel check: the lift propagated end to end — CTR **+5.4%** → product views **+4.8%** → add-to-cart **+4.1%** → checkout **+3.5%** → orders **+3.1%**. A click lift that collapsed at checkout would have signaled the ranker surfaces eye-catching but irrelevant products. It did not.",
      "Heterogeneity: dormant users +6.9%, APAC +5.1%, high-frequency buyers (3+ prior purchases) +0.2%. The legacy ranker was already well-calibrated for power users — the gain came almost entirely from everyone else.",
    ],
    learnings: [
      "**Decision: launch.** CI fully above MDE, all guardrails green, incremental cost breaks even at ~+0.4% GMV lift — well below the observed +4.4%. A 5% holdback runs for 90 days as a long-horizon counterfactual.",
      "> \"When the CI sits entirely above your practical significance threshold and no guardrail is violated, that is a clean launch signal. Check three things: metric tradeoffs, implementation cost, and false-positive risk. All three cleared here.\"",
      "Metric selection was the most consequential design decision. Choosing revenue per user instead of conversion rate gave the result _business_ meaning — and prevented a scenario where the algorithm wins by surfacing cheap high-volume products while actual GMV stays flat.",
      "No peeking is not optional. Every intermediate p-value look costs probability mass from your Type I error budget. Committing to the end date before the experiment starts is the only way to preserve the α = `0.05` guarantee.",
      "The AA test is not optional either. It is the only pre-experiment proof that the randomization pipeline is sound and the groups are comparable before treatment.",
    ],
    hasCustomVisual: false,
  },
  {
    slug: "ai-therapist",
    title: "AI Therapist, HackGPT 2nd Place",
    org: "HackGPT NYC · 2023",
    date: "April 2023",
    category: "Personal",
    tags: ["LLM", "Mental Health", "GPT-4", "Whisper", "D-ID", "48h Hackathon"],
    blurb:
      "FaceTime-style LLM-powered virtual therapist with real-time speech and a lip-synced avatar, built in 48h at HackGPT NYC and awarded 2nd place out of ~80 teams.",
    impact: [
      { label: "hackathon ranking", value: "2nd / ~80" },
      { label: "build time", value: "48h" },
      { label: "end-to-end latency", value: "<2s" },
    ],
    problem:
      "Mental-health care is inaccessible to most people, cost, stigma and waiting lists keep millions from seeking help. Could an LLM, paired with a humanizing avatar and natural voice, lower the barrier to a useful first-line conversational tool?",
    approach: [
      "Speech-to-text. OpenAI Whisper with low-latency streaming chunks.",
      "Reasoning. GPT-4 with a tuned therapist system prompt, Rogerian active-listening, no diagnoses, hard-coded crisis-detection phrases that escalate to suicide-prevention resources.",
      "Text-to-speech. ElevenLabs with a warm, calm voice profile and SSML pauses for naturalness.",
      "Avatar. D-ID for real-time lip-sync to a portrait, framed in a FaceTime-style UI to evoke familiarity.",
      "Stack. React frontend, Flask backend, all four APIs streamed in parallel to keep end-to-end latency under 2s.",
    ],
    results: [
      "Functional end-to-end demo working live on stage at the 48h deadline.",
      "2nd place out of ~80 teams at HackGPT NYC.",
      "<2s end-to-end latency on a laptop, felt like a real video call.",
    ],
    learnings: [
      "Latency *is* the UX. Shaving 500ms turned the demo from clunky to convincingly conversational.",
      "Prompt engineering for safety boundaries was harder than the technical stack, LLMs love to diagnose if you don't aggressively constrain them.",
      "The FaceTime framing did more for perceived empathy than any model upgrade would have.",
    ],
  },
  {
    slug: "music-recommender",
    title: "MusicAI, Playlist Auto-Clusterer (GMM + LLM)",
    org: "Personal Project",
    date: "2025",
    category: "Personal",
    tags: ["Unsupervised", "Gaussian Mixture", "Spotify API", "ReccoBeats", "TF-IDF + SVD", "Ollama"],
    blurb:
      "End-to-end tool that pulls a Spotify library, clusters every song into latent 'vibes' with a Gaussian Mixture Model on 11 audio features + genre embeddings, names each cluster via a local LLM, and rebuilds the clusters back into Spotify playlists.",
    impact: [
      { label: "audio features modeled", value: "11" },
      { label: "genre embedding dims (TF-IDF + SVD)", value: "48" },
      { label: "auto-K range", value: "n/200, n/80" },
    ],
    problem:
      "After years of saving songs, my Spotify library was a single undifferentiated bucket of thousands of tracks, unsearchable by mood. I wanted an unsupervised system that would discover the actual *vibes* hiding in my library and rebuild them as standalone playlists, without me having to label anything.",
    approach: [
      "Data. Pulled the full Spotify library via Spotipy OAuth, enriched each track with audio features (`danceability`, `energy`, `valence`, `tempo`, `speechiness`, `acousticness`, `liveness`, `loudness`, `instrumentalness`, `key`, `mode`) from the ReccoBeats API.",
      "Feature engineering. Encoded musical `key` as circular coordinates `(sin, cos)` since C(0) is adjacent to B(11). Standardized numeric features with `StandardScaler`.",
      "Genre embedding. Built a TF-IDF representation of genre tags (vocab cap 600) and reduced it to 48 latent dimensions via Truncated SVD, always on, fused with numeric features.",
      "Clustering. Fit a Gaussian Mixture Model. Auto-selected K in a data-scaled range (`n/200` to `n/80`) optimizing the silhouette score with BIC as a tie-breaker, to avoid hard-coding cluster count.",
      "Naming. Pumped each cluster's centroid + sample tracks into a local Llama 3 via Ollama, which generated human-readable cluster names (e.g. *'late-night focus electronic'*).",
      "Write-back. Created one Spotify playlist per cluster and added tracks in parallel (`ThreadPoolExecutor`, 16 workers) to stay within rate limits.",
    ],
    results: [
      "Library auto-partitioned into interpretable mood clusters that I actually use.",
      "LLM-generated playlist names worked well enough that I shipped them as-is.",
      "Full pipeline reproducible from one `clustering.py` script with a DEV_MODE flag to preview clusters before touching Spotify.",
    ],
    learnings: [
      "Circular encoding of musical key meaningfully improved cluster cohesion vs. treating it as ordinal.",
      "Genre embeddings turned out to dominate the latent space, audio features alone confused jazz with ambient.",
      "Letting K scale with library size made the tool useful for both 200-song and 5000-song libraries with no manual tuning.",
    ],
  },
  {
    slug: "enertex-cto",
    title: "CTO @ Enertex Group",
    org: "enertexgroup.com",
    date: "2024–Present",
    category: "Personal",
    tags: ["E-commerce", "Shopify", "Co-founder", "Wellness Tech"],
    blurb:
      "Co-founded and lead tech for Enertex, a wellness e-commerce selling Spiro electromagnetic-filtering products and blue-light-free lighting across Europe. Shopify storefront, conversion optimization, and product analytics.",
    link: { label: "enertexgroup.com", href: "https://www.enertexgroup.com" },
    impact: [
      { label: "customers served", value: "5,000+" },
      { label: "dispatch time", value: "<24h" },
      { label: "role", value: "co-founder" },
    ],
    problem:
      "Spiro electromagnetic-protection technology had proven scientific backing but no clean European D2C channel. We needed a credible, fast e-commerce operation that could carry premium product positioning and scale shipping across the continent.",
    approach: [
      "Co-founded the company with a partner and took ownership of the tech stack.",
      "Built and operated the Shopify storefront end-to-end: catalog, checkout, multi-currency, EN/ES localization.",
      "Designed the product taxonomy around two pillars (electromagnetic filtering + circadian lighting) for clearer customer journeys.",
      "Set up product analytics, conversion tracking, and a 24h fulfillment SLA pipeline.",
      "Integrated affiliate program, WhatsApp support and Shop Pay for high-trust checkout.",
    ],
    results: [
      "5,000+ customers served across Europe.",
      "24h dispatch SLA met consistently.",
      "Spiro Disc, Square, and Stroom Master Pro as top-selling SKUs, each rated 5.0 stars.",
    ],
  },
  {
    slug: "scope-consulting",
    title: "Scope Consulting, Co-founder & Project Acquisition Director",
    org: "Purdue University · scopeje-consulting.com",
    date: "2018–Present",
    category: "Personal",
    tags: ["Co-founder", "Junior Enterprise", "Consulting", "Client Acquisition"],
    blurb:
      "Co-founded Scope Consulting in 2018, a non-profit, student-led Junior Enterprise at Purdue advising non-profits, tech startups, and Fortune 500s. Multi-disciplinary by design: engineers, business, liberal arts, CS.",
    link: { label: "scopeje-consulting.com", href: "https://www.scopeje-consulting.com/" },
    impact: [
      { label: "members in year one", value: "50+" },
      { label: "founded", value: "2018" },
      { label: "client tiers", value: "NPO → F500" },
    ],
    problem:
      "Purdue had strong technical talent but no student-led management consulting practice. There was no on-ramp for students interested in consulting careers, and no organized way for local non-profits and tech startups to tap into that talent.",
    approach: [
      "Co-founded with three other engineering students passionate about entrepreneurship and community impact.",
      "As Project Acquisition Director, owned the client pipeline: sourced engagements across non-profits, tech startups, and Fortune 500s.",
      "Designed the multidisciplinary recruiting model, opened to liberal arts, CS, business and art history students to bring diverse perspectives to client work.",
      "Built the case-training curriculum so the club could onboard students with zero prior consulting experience.",
    ],
    results: [
      "Grew to 50+ members in the first year.",
      "Now a fixture among Purdue's pre-professional clubs, with recurring engagements across all three client tiers.",
      "Continues operating today as a Junior Enterprise advising real clients.",
    ],
  },
  {
    slug: "akademo",
    title: "AKADEMO, LMS for Online Academies",
    org: "Solo founder · akademo-edu.com",
    date: "2025–Present",
    category: "Personal",
    tags: ["Founder", "SaaS", "DRM", "Anti-piracy", "Full Stack"],
    blurb:
      "Built end-to-end (100% solo): a SaaS LMS for online academies obsessed with one problem, stopping account sharing and content piracy. Single active session per student, dynamic watermarks, secure streaming, no downloads.",
    link: { label: "akademo-edu.com", href: "https://www.akademo-edu.com" },
    impact: [
      { label: "built solo", value: "100%" },
      { label: "shared-account detection", value: "100%" },
      { label: "session-kick response time", value: "<1s" },
    ],
    problem:
      "Online academies bleed revenue to shared accounts (students paying for 1 seat, accessing with 3+) and to videos getting downloaded and resold on Telegram/WhatsApp. Big platforms have security teams; small academies fight piracy alone with spreadsheets and trust.",
    approach: [
      "Anti-sharing core. One active session per student, logging in from a second device instantly kicks the previous one (<1s). Pattern detection on anomalous behavior runs 24/7 with real-time alerts.",
      "Content protection. Secure HLS streaming with no download button, encrypted at rest, per-class access control, optional playback caps.",
      "Dynamic watermarks. Every video overlays a moving watermark with the student's name, email, ID and timestamp. Leaks become traceable to the exact user, providing legal evidence.",
      "Academy OS. Full management layer: teacher autonomy (each teacher runs their own classes), student lifecycle (enrollment → access → payment → progress), course/cohort structure, role-based permissions.",
      "Revenue tooling. Built-in 'ghost student' calculator surfaces exactly how much an academy loses to shared accounts. A sales asset in itself.",
    ],
    results: [
      "Live SaaS product at akademo-edu.com.",
      "100% of shared-account attempts detected and resolved in <1s.",
      "Built and shipped solo: product, infra, payments, marketing site.",
    ],
    learnings: [
      "Anti-piracy is a narrow, intense wedge. Small academies pay for one solved problem far more readily than for a generalist LMS.",
      "Dynamic watermarks are 90% deterrence and 10% forensics. The deterrence is what actually moves the needle.",
    ],
  },
  {
    slug: "priorityfly",
    title: "PriorityFLY, Private Jet Marketplace",
    org: "Solo founder · priorityfly.com",
    date: "2024–Present",
    category: "Personal",
    tags: ["Founder", "Marketplace", "Aviation", "Full Stack", "Empty-Leg Pricing"],
    blurb:
      "Built end-to-end (100% solo): a Colombian private-aviation marketplace offering both by-the-seat empty-leg flights (up to 90% off) and full charter quotes across a 5-tier fleet. The bridge between private aviation operators and end customers.",
    link: { label: "priorityfly.com", href: "https://www.priorityfly.com" },
    impact: [
      { label: "built solo", value: "100%" },
      { label: "empty-leg discount surfaced", value: "up to 90%" },
      { label: "aircraft tiers covered", value: "5" },
    ],
    problem:
      "Private aviation is two broken markets at once. Operators fly thousands of 'empty leg' repositioning flights every year with zero passengers, pure burned cost for them. Customers see private jets as opaque and unaffordable. There was no clean platform in Colombia connecting both sides.",
    approach: [
      "Two products on one platform. (1) By-the-seat marketplace where users browse empty-leg flights with set routes/times and book individual seats at up to 90% off; (2) Full-charter quote flow where users specify itinerary and a sales agent quotes a complete jet.",
      "Fleet abstraction. Modeled 5 aircraft tiers (Light Jets, Midsize, Heavy, Twin Turboprop, Twin Piston) with passenger capacity, range and use-case so customers self-select before contacting sales.",
      "Operator pipeline. Built dedicated operator onboarding (`/operators`) so private-aviation operators can list empty legs without friction.",
      "Conversion flow. WhatsApp and email fallback at every step. Luxury travel buyers convert through high-touch channels, not pure self-serve.",
      "Stack. Full-stack build: catalog dashboard, booking flow, quote form, blog, fleet pages, multi-language (ES/EN), responsive design.",
    ],
    results: [
      "Live marketplace at priorityfly.com serving the Colombian private aviation market.",
      "5-tier fleet catalog covering everything from short regional hops (Piston) to intercontinental (Heavy Jets).",
      "Built and shipped solo: product, infra, content, GTM.",
    ],
    learnings: [
      "Empty-leg as a wedge: customers come for 'private jet at 90% off' and stay for full charter.",
      "Luxury booking flows need to deliberately leave high-touch escape hatches (WhatsApp/email) instead of forcing pure self-serve checkout.",
    ],
  },
  {
    slug: "polybot",
    title: "Polybot, Polymarket Copy-Trading System",
    org: "Personal Project",
    date: "2026",
    category: "Personal",
    tags: ["Algorithmic Trading", "Polymarket", "On-chain", "Kelly Sizing", "Telegram", "DigitalOcean"],
    blurb:
      "Production live-trading system that detects alpha-generating wallets on Polymarket, copies their trades in real time through 11 risk gates, and pushes signed orders to the CLOB. ~12,000 lines of Python running on a DigitalOcean box with Telegram alerting.",
    impact: [
      { label: "lines of Python", value: "~12k" },
      { label: "wallets scraped → watchlist", value: "287k → 6" },
      { label: "risk gates per trade", value: "11" },
      { label: "order-placement latency", value: "0.14s" },
    ],
    problem:
      "Polymarket has public, on-chain trade history for every wallet, which means alpha is observable if you can isolate it. The challenge: out of hundreds of thousands of wallets, find the few with statistically significant edge, then mirror their trades fast enough and safely enough to actually capture it before the price moves.",
    approach: [
      "5-stage detection pipeline. (0) Goldsky on-chain scrape → 287,908 wallets; (0b) leaderboard merge → 17,449; (1) activity gate `unique_markets ≥ 5 AND vol ≥ $1k` → 10,107; (2) alpha gate `α ≥ 0.05` → 919; (3) deep stats (z-scores, calibration, rolling α) → 566 wallets / 218k market entries; (4) advanced metrics (red-flag detection, alpha-by-category) → final Tier-1 watchlist of 6.",
      "Watchlist selection. Tier-1 filter `alpha_60d ≥ 0.15 AND n_60d ≥ 10`. Dormant-elite tier for high-lifetime-α wallets that haven't traded recently.",
      "11 risk gates per trade. Side validation, category skip-list, edge threshold, price band [0.10, 0.80], open-position cap (15), token resolution, per-event exposure cap ($10), slippage buffer (2¢ over alert), alert age (≤300s), book-depth check (≥ 5× trade size), min trade size ($1).",
      "Kelly sizing. `p = clip(alert_price + α)`, fractional Kelly with `bankroll × kelly_fraction × f*`, then capped by `max_per_trade` and remaining event exposure.",
      "Execution. EIP-712 signing on the EOA, funds on the proxy wallet, POLY_1271 signature type, signed orders posted to the Polymarket CLOB. E2E live test: real $1 order placed in **0.14s** and canceled immediately.",
      "Ops. DigitalOcean droplet, cron with `flock` (no overlapping runs): `monitor_wallets` every 1 min, `trade_reconciler` every 30 min, `stage_3 + stage_4` nightly, `stage_0→0b→1→2` weekly. Telegram digest twice daily.",
      "Critical bug caught. `/book` endpoint returned asks/bids in reversed order, every BUY was being incorrectly rejected for slippage. Patched + regression test added.",
    ],
    results: [
      "Live system running on DigitalOcean with full 24/7 monitoring and Telegram alerting.",
      "End-to-end live order placement validated at 0.14s latency.",
      "Detection pipeline collapses 287,908 raw wallets into a defensible 6-wallet watchlist via reproducible statistical gates.",
    ],
    learnings: [
      "Detection > execution. Most of the engineering value sat in the 5-stage statistical funnel, not in the order-placement layer.",
      "On-chain books lie unless you read them carefully. A reversed-order bug silently killed 100% of BUY orders for days before I caught it.",
      "In thin markets, the binding constraint is liquidity, not edge. The book-depth gate (5× size) is what keeps the strategy honest.",
    ],
  },
];

// Slugs hidden from the homepage (kept here so old links still resolve if anyone has them).
const HIDDEN_SLUGS = new Set<string>(["customer-retention-meta"]);

// Display order on the homepage. Slugs not listed here fall to the end.
const DISPLAY_ORDER = [
  "cltv-model",
  "uplift-model",
  "ab-test-instagram-shop",
  "fico-approximation",
  "microsegments-oracle",
  "printer-sales-forecast",
];

export const projects: Project[] = allProjects
  .filter((p) => !HIDDEN_SLUGS.has(p.slug))
  .sort((a, b) => {
    const ia = DISPLAY_ORDER.indexOf(a.slug);
    const ib = DISPLAY_ORDER.indexOf(b.slug);
    const ra = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
    const rb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
    return ra - rb;
  });

export const featuredSlugs = [
  "ab-test-instagram-shop",
  "uplift-model",
  "cltv-model",
  "polybot",
  "akademo",
  "ai-therapist",
];

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
