import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "MusicAI — Playlist Auto-Clusterer — Alexandre Vives",
  description:
    "A Gaussian Mixture Model + LLM pipeline that clusters a Spotify library by audio features and genre embeddings, names clusters with a local LLM, and rebuilds them as Spotify playlists.",
};

// ── Diagram 1: Pipeline flow ──────────────────────────────────────────────────

function PipelineFlow() {
  const stages = [
    { icon: "🎵", label: "Spotify OAuth", sub: "full library pull via Spotipy", color: "#3b82f6" },
    { icon: "📊", label: "Audio Features", sub: "11 features · ReccoBeats API", color: "#8b5cf6" },
    { icon: "⚙️", label: "Feature Engineering", sub: "key → circular · genre TF-IDF + SVD", color: "#f97316" },
    { icon: "🔵", label: "GMM Clustering", sub: "auto-K · silhouette + BIC", color: "#ec4899" },
    { icon: "🤖", label: "LLM Naming", sub: "Llama 3 via Ollama · centroid → name", color: "#22d3ee" },
    { icon: "✅", label: "Spotify Write-back", sub: "one playlist per cluster · parallel", color: "#a3e635" },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {stages.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div
                className="rounded-xl border px-2.5 py-3 text-center flex-1 w-full"
                style={{ borderColor: s.color + "55", background: s.color + "10" }}
              >
                <p className="text-lg mb-0.5">{s.icon}</p>
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-0.5 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < stages.length - 1 && (
                <>
                  <div className="flex sm:hidden w-5 shrink-0 items-center justify-center text-ink-subtle">→</div>
                  <div className="hidden sm:flex h-4 w-full items-center justify-center text-ink-subtle text-sm">→</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> End-to-end pipeline from
        Spotify OAuth to playlist write-back. The entire flow is reproducible from a single
        script with a <code className="text-accent">DEV_MODE</code> flag that previews
        clusters before touching Spotify.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: K selection (silhouette vs BIC) ────────────────────────────────

function KSelectionChart() {
  const W = 520, H = 210;
  const pl = 44, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;

  // Sample library: 800 songs → K range [4, 10]
  const ks = [4, 5, 6, 7, 8, 9, 10];
  const silhouette = [0.31, 0.38, 0.44, 0.47, 0.43, 0.39, 0.35];
  const bic = [4820, 4640, 4510, 4480, 4530, 4620, 4750];

  const xk = (i: number) => pl + (i / (ks.length - 1)) * cW;
  const ySil = (v: number) => pt + cH - ((v - 0.28) / 0.22) * cH;
  const yBic = (v: number) => pt + cH - ((4800 - v) / 380) * cH; // inverted (lower BIC = better)

  const silPath = silhouette
    .map((v, i) => `${i === 0 ? "M" : "L"}${xk(i).toFixed(1)},${ySil(v).toFixed(1)}`)
    .join(" ");
  const bicPath = bic
    .map((v, i) => `${i === 0 ? "M" : "L"}${xk(i).toFixed(1)},${yBic(v).toFixed(1)}`)
    .join(" ");

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />

          {ks.map((k, i) => (
            <g key={k}>
              <line x1={xk(i)} y1={pt} x2={xk(i)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xk(i)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={9}>
                K={k}
              </text>
            </g>
          ))}

          {/* BIC line (dashed blue) */}
          <path d={bicPath} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5,2" />
          {bic.map((v, i) => (
            <circle key={i} cx={xk(i)} cy={yBic(v)} r={3} fill="#3b82f6" />
          ))}

          {/* Silhouette line (lime) */}
          <path d={silPath} fill="none" stroke="#a3e635" strokeWidth={2.5} strokeLinejoin="round" />
          {silhouette.map((v, i) => (
            <circle key={i} cx={xk(i)} cy={ySil(v)} r={3.5} fill="#a3e635" />
          ))}

          {/* Winner annotation K=7 */}
          <line
            x1={xk(3)}
            y1={pt}
            x2={xk(3)}
            y2={pt + cH}
            stroke="#a3e635"
            strokeOpacity={0.4}
            strokeDasharray="3,2"
          />
          <text x={xk(3) + 3} y={pt + 10} fill="#a3e635" fontSize={9}>
            selected K=7
          </text>

          {/* Legend */}
          <line x1={pl + 6} y1={pt + 20} x2={pl + 20} y2={pt + 20} stroke="#a3e635" strokeWidth={2.5} />
          <text x={pl + 24} y={pt + 24} fill="rgba(255,255,255,0.6)" fontSize={9}>Silhouette ↑</text>
          <line x1={pl + 110} y1={pt + 20} x2={pl + 124} y2={pt + 20} stroke="#3b82f6" strokeWidth={2} strokeDasharray="5,2" />
          <text x={pl + 128} y={pt + 24} fill="rgba(255,255,255,0.6)" fontSize={9}>BIC ↓ (better)</text>

          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Number of Clusters K
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> K selection via silhouette
        score (maximize, green) and BIC (minimize, blue). K=7 is the agreement point — both
        metrics peak here for an 800-song library. The search range scales with library size:
        K ∈ [n/200, n/80].
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Sample cluster cards ──────────────────────────────────────────

function ClusterCards() {
  const clusters = [
    {
      name: "Late-Night Focus Electronic",
      features: "instrumentalness 0.91 · energy 0.62 · valence 0.24 · tempo 128bpm",
      tracks: ["Jon Hopkins — Emerald Rush", "Bicep — Glue", "Four Tet — Angel Echoes"],
      color: "#8b5cf6",
    },
    {
      name: "High-Energy Running Mix",
      features: "danceability 0.88 · energy 0.94 · valence 0.71 · tempo 148bpm",
      tracks: ["Drake — Started From the Bottom", "Travis Scott — SICKO MODE", "Kanye — All Falls Down"],
      color: "#f97316",
    },
    {
      name: "Sunday Morning Acoustic",
      features: "acousticness 0.87 · energy 0.28 · valence 0.58 · speechiness 0.04",
      tracks: ["Rex Orange County — Loving Is Easy", "Mac DeMarco — Chamber of Reflection", "Sufjan Stevens — Death With Dignity"],
      color: "#a3e635",
    },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mb-4">
          Sample clusters generated by Llama 3 naming — 800-song library
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {clusters.map(({ name, features, tracks, color }) => (
            <div
              key={name}
              className="rounded-xl border p-4"
              style={{ borderColor: color + "40", background: color + "08" }}
            >
              <p className="text-sm font-semibold text-ink mb-2 leading-snug">{name}</p>
              <p className="text-[10px] font-mono text-ink-subtle mb-3 leading-relaxed">{features}</p>
              <div className="space-y-1">
                {tracks.map((t) => (
                  <p key={t} className="text-[11px] text-ink-muted leading-snug">
                    • {t}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Three of the seven
        auto-generated clusters with their Llama 3 names, dominant audio feature signatures,
        and sample tracks. Cluster names were used as-is — no manual editing.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MusicRecommenderPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Personal Project · 2025"
        title="MusicAI — Playlist Auto-Clusterer"
        subtitle="A Gaussian Mixture Model on 11 audio features + 48-dim genre embeddings that discovers the latent 'vibes' in a Spotify library and rebuilds them as playlists — named by a local LLM."
        tags={["Unsupervised Learning", "Gaussian Mixture Model", "Spotify API", "TF-IDF + SVD", "Ollama", "Llama 3"]}
      />

      <div className="container-page mt-16">
        {/* Opening */}
        <Prose>
          <P>
            After years of saving songs to Spotify, my library became a single undifferentiated
            bucket of a few thousand tracks. Great for shuffle on a long trip. Completely useless
            for finding the right music for a specific moment — late-night coding, Sunday morning
            coffee, a run.
          </P>
          <P>
            The standard solution is manual curation. I&apos;d started seven different
            &quot;vibes&quot; playlists, abandoned six of them, and never caught up with newly
            saved tracks. The problem wasn&apos;t motivation — it was friction. Manually sorting
            2,000+ songs is a task no one actually does.
          </P>
          <P>
            The question: could an unsupervised model discover the actual vibes hiding in my
            listening history and reconstruct them as playlists automatically — without me having
            to label anything?
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="data" step="Step 01">
            Data: 11 Audio Features + Genre Embeddings
          </SH>
          <P>
            Spotify&apos;s audio features API provides 11 per-track signals: <B>danceability,
            energy, valence, tempo, acousticness, liveness, loudness, speechiness,
            instrumentalness, key, mode</B>. These capture a song&apos;s sonic character —
            how danceable it is, how much acoustic sound vs electronic production, how
            emotionally positive or negative it feels.
          </P>
          <P>
            Audio features alone turned out to be insufficient. Genres carry information that
            raw audio features don&apos;t — the difference between ambient jazz and ambient
            electronic might be small in feature space but large in listener experience. To
            capture this, I built a <B>TF-IDF representation of genre tags</B> (vocabulary
            capped at 600 terms) and compressed it to <B>48 latent dimensions</B> using
            Truncated SVD. The numeric and genre features are then fused into a single feature
            vector per track.
          </P>

          <Callout>
            Genre embeddings dominated the latent space. Audio features alone confused jazz with
            ambient — both have low energy, high acousticness, low valence. The genre embedding
            separated them immediately. The lesson: sometimes the most useful signal is a
            human-generated label, not a continuous measurement.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="clustering" step="Step 02">
            Feature Engineering: Circular Key Encoding
          </SH>
          <P>
            One non-obvious preprocessing step: musical <B>key</B> is circular. Key C (0) is
            adjacent to key B (11) — they&apos;re a half-step apart in music theory. Treating
            key as an ordinal variable (0–11) tells the model that C and B are maximally
            dissimilar. The fix: encode key as <C>(sin(2π·key/12), cos(2π·key/12))</C>, which
            preserves the circular relationship. This meaningfully improved cluster cohesion.
          </P>
        </Prose>

        <Wide>
          <PipelineFlow />
        </Wide>

        {/* Step 03 */}
        <Prose>
          <SH id="gmm" step="Step 03">
            Clustering: GMM with Auto-K Selection
          </SH>
          <P>
            I chose a <B>Gaussian Mixture Model</B> over k-means for two reasons: (1) GMM
            assigns soft cluster membership probabilities rather than hard assignments, which
            is more honest about songs that sit at the boundary between vibes, and (2) GMM
            better handles the ellipsoidal cluster shapes that arise from correlated feature
            dimensions in music.
          </P>
          <P>
            The number of clusters K is not hard-coded. It&apos;s auto-selected from a data-scaled
            range: K ∈ [n/200, n/80], where n is the library size. This means the tool is useful
            for both 200-song and 5,000-song libraries without any manual configuration. Within
            that range, the selected K maximizes <B>silhouette score</B>, with BIC as a
            tie-breaker.
          </P>
        </Prose>

        <Wide>
          <KSelectionChart />
        </Wide>

        {/* Step 04 */}
        <Prose>
          <SH id="naming" step="Step 04">
            Naming Clusters with a Local LLM
          </SH>
          <P>
            Each cluster&apos;s centroid (the average audio feature vector) plus a random sample
            of 10 tracks and their genres is passed as context to <B>Llama 3 running locally via
            Ollama</B>. The prompt asks for a playlist name that captures the vibe — 2–4 words,
            evocative, not generic.
          </P>
          <P>
            The LLM-generated names worked well enough that I shipped them as-is on the first
            library run — no manual editing. The model naturally landed on names like
            &quot;Late-Night Focus Electronic,&quot; &quot;Sunday Morning Acoustic,&quot; and
            &quot;High-Energy Running Mix.&quot; These are exactly the kind of names I&apos;d
            have given the playlists myself.
          </P>
        </Prose>

        <Wide>
          <ClusterCards />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "audio features modeled per track", value: "11", sub: "Spotify + ReccoBeats API" },
            { label: "genre embedding dimensions", value: "48", sub: "TF-IDF (600 vocab) + SVD" },
            { label: "auto-K range", value: "n/200–n/80", sub: "scales with library size" },
            { label: "write-back workers", value: "16", sub: "ThreadPoolExecutor · parallel" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Three Things That Mattered
          </SH>
          <P>
            <B>1. Circular encoding of musical key is a small fix with outsized impact.</B>{" "}
            Treating key as ordinal was technically wrong — C and B are adjacent, not maximally
            distant. The circular encoding preserved that relationship and improved cluster
            cohesion measurably.
          </P>
          <P>
            <B>2. Genre embeddings are the most important feature family.</B> Raw audio features
            alone grouped by sonic texture (loud vs quiet, fast vs slow) in ways that didn&apos;t
            match musical intuition. Adding genre embeddings aligned the clusters with how humans
            actually categorize music — by style, not just by signal properties.
          </P>
          <P>
            <B>3. Letting K scale with library size made the tool actually reusable.</B> Hard-coding
            K=8 would have produced reasonable clusters for my 800-song library and terrible
            ones for a friend&apos;s 5,000-song archive. Data-scaled auto-K means I can run
            the same script on any library.
          </P>
        </Prose>

        <NextProject slug="enertex-cto" />
      </div>
    </article>
  );
}
