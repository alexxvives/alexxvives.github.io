import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "AI Therapist — HackGPT 2nd Place — Alexandre Vives",
  description:
    "FaceTime-style LLM-powered virtual therapist with real-time speech and a lip-synced avatar, built in 48 hours at HackGPT NYC. 2nd place out of ~80 teams.",
};

// ── Diagram 1: System pipeline ────────────────────────────────────────────────

function SystemPipeline() {
  const stages = [
    { icon: "🎙", label: "User Voice", sub: "microphone · streaming audio", color: "#3b82f6" },
    { icon: "👂", label: "Whisper STT", sub: "low-latency streaming chunks · OpenAI", color: "#8b5cf6" },
    { icon: "🧠", label: "GPT-4", sub: "Rogerian prompt · crisis detection · no diagnoses", color: "#f97316" },
    { icon: "🔊", label: "ElevenLabs TTS", sub: "warm calm voice · SSML pauses", color: "#ec4899" },
    { icon: "🎭", label: "D-ID Lip-Sync", sub: "real-time avatar sync · portrait photo", color: "#22d3ee" },
    { icon: "📱", label: "FaceTime UI", sub: "React · familiar call framing", color: "#a3e635" },
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
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
            All 4 APIs streamed in parallel · Flask backend · React frontend · end-to-end latency under 2s
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> Six-stage voice pipeline.
        Parallelizing the four API calls (Whisper → GPT-4 → ElevenLabs → D-ID) was the
        critical optimization that brought latency under 2 seconds.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Latency waterfall ──────────────────────────────────────────────

function LatencyWaterfall() {
  const W = 520, H = 180;
  const pl = 110, pr = 80, pt = 20, pb = 40;
  const cW = W - pl - pr, cH = H - pt - pb;

  const stages = [
    { label: "Whisper STT", ms: 380, color: "#8b5cf6", x0: 0 },
    { label: "GPT-4 (TTFT)", ms: 750, color: "#f97316", x0: 380 },
    { label: "ElevenLabs TTS", ms: 360, color: "#ec4899", x0: 380 }, // parallel with GPT stream
    { label: "D-ID render", ms: 280, color: "#22d3ee", x0: 1080 },
  ];
  const total = 1920;

  const xv = (ms: number) => pl + (ms / total) * cW;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[400, 800, 1200, 1600, 2000].map((ms) => (
            <g key={ms}>
              <line x1={xv(ms)} y1={pt - 4} x2={xv(ms)} y2={pt + cH + 4} stroke="rgba(255,255,255,0.06)" />
              <text x={xv(ms)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                {ms}ms
              </text>
            </g>
          ))}

          {stages.map(({ label, ms, color, x0 }, i) => {
            const y = pt + i * (cH / stages.length) + 1;
            const h = cH / stages.length - 4;
            const bW = (ms / total) * cW;
            return (
              <g key={label}>
                <text x={pl - 6} y={y + h / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize={9}>
                  {label}
                </text>
                <rect x={xv(x0)} y={y} width={bW} height={h} fill={color} fillOpacity={0.75} rx={3} />
                <text x={xv(x0) + bW + 4} y={y + h / 2 + 3} fill="rgba(255,255,255,0.55)" fontSize={9}>
                  {ms}ms
                </text>
              </g>
            );
          })}

          {/* Total marker */}
          <line x1={xv(total)} y1={pt} x2={xv(total)} y2={pt + cH} stroke="#a3e635" strokeDasharray="3,2" />
          <text x={xv(total) + 3} y={pt + 12} fill="#a3e635" fontSize={9}>~1.9s total</text>

          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Time from user speech end (ms)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Latency breakdown per stage.
        ElevenLabs TTS starts streaming in parallel with GPT-4&apos;s token stream — the avatar
        begins speaking before GPT-4 has finished generating, which is why the total latency
        is 1.9s rather than 1.77s (serial sum).
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Safety guardrail layers ───────────────────────────────────────

function SafetyLayers() {
  const layers = [
    {
      level: "Layer 1 — Hard Block",
      desc: "Crisis keyword detection (suicide, self-harm, abuse keywords). Triggers immediate escalation to hotline resources. Bypasses LLM.",
      color: "#ef4444",
      icon: "🚨",
    },
    {
      level: "Layer 2 — Soft Guardrails",
      desc: "System prompt instructs GPT-4 to never diagnose, never prescribe, and always suggest professional help after 3+ sessions of the same issue.",
      color: "#f97316",
      icon: "⚠️",
    },
    {
      level: "Layer 3 — Tone Guidance",
      desc: "Rogerian active-listening framing. Reflect feelings, ask clarifying questions, validate without amplifying distress.",
      color: "#22d3ee",
      icon: "💬",
    },
    {
      level: "Layer 4 — Normal Conversation",
      desc: "Standard session flow: check in, explore, reflect, close. No medical framing unless user brings it up.",
      color: "#a3e635",
      icon: "✅",
    },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="space-y-3">
          {layers.map(({ level, desc, color, icon }) => (
            <div
              key={level}
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: color + "40", background: color + "08" }}
            >
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">{level}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Safety architecture with four
        layers. Crisis detection bypasses the LLM entirely — rule-based keyword matching is more
        reliable than asking the model to self-moderate in high-stakes situations.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AITherapistPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Personal · HackGPT NYC · April 2023"
        title="AI Therapist — HackGPT 2nd Place"
        subtitle="A FaceTime-style LLM therapist with real-time speech, a lip-synced avatar, and a four-layer safety architecture. Built in 48 hours. 2nd place out of ~80 teams."
        tags={["LLM", "GPT-4", "Whisper", "ElevenLabs", "D-ID", "Mental Health", "48h Hackathon"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            Mental-health care has an access problem. Waitlists run months, sessions cost
            $150–$300 without insurance, and stigma keeps millions from seeking help even when
            it&apos;s available. Could an LLM, paired with voice and a humanizing avatar, lower
            the barrier to a first-line conversational support tool?
          </P>
          <P>
            The hackathon prompt was open. The team landed on this problem because it had a clear
            human impact, a technically interesting multi-API stack, and a compelling live demo
            story. We had 48 hours. The goal: a working end-to-end demo with real speech, a
            natural-feeling avatar, and safety guardrails serious enough that we&apos;d be
            comfortable showing it to a stranger.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="stack" step="Step 01">
            The Stack: Four APIs in Parallel
          </SH>
          <P>
            The system chains four external APIs: <B>OpenAI Whisper</B> for speech-to-text,{" "}
            <B>GPT-4</B> for the conversational model, <B>ElevenLabs</B> for text-to-speech, and{" "}
            <B>D-ID</B> for real-time lip-sync on a portrait. The UI frames the conversation as a
            FaceTime call — familiar, human, lower-stakes-feeling than a chat interface.
          </P>
          <P>
            The biggest engineering challenge wasn&apos;t any individual API — it was making them
            work together with low enough latency to feel like a real conversation. Serial
            execution (wait for Whisper → wait for GPT → wait for ElevenLabs → wait for D-ID)
            produces 3–4 seconds of silence, which kills the illusion. The solution was
            parallelism and streaming.
          </P>
        </Prose>

        <Wide>
          <SystemPipeline />
        </Wide>

        <Prose>
          <P>
            Whisper processes audio as it streams from the microphone in chunks, reducing STT
            latency from ~1.2s (wait for end of speech + process) to ~380ms (process streaming
            chunks). GPT-4 responses begin streaming as tokens arrive — the first tokens feed
            into ElevenLabs before the full response is generated. D-ID begins rendering the
            avatar against the audio stream, so by the time GPT-4 finishes, the avatar is already
            mid-sentence.
          </P>
        </Prose>

        <Wide>
          <LatencyWaterfall />
        </Wide>

        <Prose>
          <Callout>
            Latency <em>is</em> the UX. At 3+ seconds of silence, the demo felt like talking
            to a loading screen. At under 2 seconds, it felt like a real call. That 1-second
            difference changed how every person at the demo table emotionally engaged with the
            product — and it was the hardest engineering problem we solved.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="safety" step="Step 02">
            Safety Architecture
          </SH>
          <P>
            Building an LLM therapist without a serious safety framework is irresponsible. The
            risk isn&apos;t that the model will be obviously bad — GPT-4 is remarkably capable.
            The risk is that it will be subtly wrong in high-stakes moments: diagnosing a
            condition, suggesting a medication, or failing to escalate when a user is in crisis.
          </P>
          <P>
            The safety architecture has four layers, each addressing a different failure mode:
          </P>
        </Prose>

        <Wide>
          <SafetyLayers />
        </Wide>

        <Prose>
          <P>
            The hard lesson from prompt engineering was that LLMs <Em>love to diagnose</Em> if
            you don&apos;t aggressively constrain them. Early versions of the system prompt would
            produce outputs like &quot;it sounds like you might be experiencing depression.&quot;
            The fix required explicit negative constraints (&quot;never diagnose, never use
            clinical labels&quot;) plus positive framing (&quot;reflect feelings using the user&apos;s
            own words&quot;) — the combination being much more robust than either alone.
          </P>
        </Prose>

        {/* Results */}
        <Prose>
          <SH id="results" step="Step 03">
            Demo Day: 2nd Place at HackGPT NYC
          </SH>
          <P>
            The demo ran end-to-end, live, on a laptop. No pre-recorded segments. Judges spoke
            to the avatar directly. The FaceTime framing — a face on screen, natural voice,
            responsive in under 2 seconds — consistently produced a visible shift in how people
            engaged: less skeptical, more conversational.
          </P>
        </Prose>

        <MetricStrip
          metrics={[
            { label: "hackathon placement", value: "2nd", sub: "out of ~80 teams · HackGPT NYC" },
            { label: "end-to-end latency", value: "<2s", sub: "speech to avatar response" },
            { label: "build time", value: "48h", sub: "from zero to live demo" },
            { label: "safety layers", value: "4", sub: "hard block → tone guidance" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Three Things Worth Remembering
          </SH>
          <P>
            <B>1. Latency is the product.</B> For a voice-based conversational AI, the latency
            budget is the primary UX constraint. Every architectural decision — streaming, parallel
            calls, early token forwarding — should be evaluated against its latency impact first.
          </P>
          <P>
            <B>2. The FaceTime framing did more for perceived empathy than any model upgrade.</B>{" "}
            Putting a face on screen in a familiar call layout made people treat the interaction
            differently. UX framing is not decoration — it shapes how users emotionally interpret
            the interaction.
          </P>
          <P>
            <B>3. Prompt engineering for safety constraints is harder than the technical stack.</B>{" "}
            Getting GPT-4 to reliably avoid clinical language required more iteration than building
            the entire streaming pipeline. When deploying LLMs in sensitive domains, the prompt is
            the safety mechanism — and it deserves as much engineering effort as the code.
          </P>
        </Prose>

        <NextProject slug="music-recommender" />
      </div>
    </article>
  );
}
