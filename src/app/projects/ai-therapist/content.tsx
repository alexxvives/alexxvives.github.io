"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, Em, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "A FaceTime-style LLM therapist with real-time speech, a lip-synced avatar, and a four-layer safety architecture. Built in 48 hours. 2nd place out of ~80 teams.",
  openP1:
    "Mental-health care has an access problem. Waitlists run months, sessions cost $150–$300 without insurance, and stigma keeps millions from seeking help even when it's available. Could an LLM, paired with voice and a humanizing avatar, lower the barrier to a first-line conversational support tool?",
  openP2:
    "The hackathon prompt was open. The team landed on this problem because it had a clear human impact, a technically interesting multi-API stack, and a compelling live demo story. We had 48 hours. The goal: a working end-to-end demo with real speech, a natural-feeling avatar, and safety guardrails serious enough that we'd be comfortable showing it to a stranger.",

  pipelineStages: [
    { icon: "🎙", label: "User Voice", sub: "microphone · streaming audio", color: "#3b82f6" },
    { icon: "👂", label: "Whisper STT", sub: "low-latency streaming chunks · OpenAI", color: "#8b5cf6" },
    { icon: "🧠", label: "GPT-4", sub: "Rogerian prompt · crisis detection · no diagnoses", color: "#f97316" },
    { icon: "🔊", label: "ElevenLabs TTS", sub: "warm calm voice · SSML pauses", color: "#ec4899" },
    { icon: "🎭", label: "D-ID Lip-Sync", sub: "real-time avatar sync · portrait photo", color: "#22d3ee" },
    { icon: "📱", label: "FaceTime UI", sub: "React · familiar call framing", color: "#a3e635" },
  ] as { icon: string; label: string; sub: string; color: string }[],
  pipelineBottom: "All 4 APIs streamed in parallel · Flask backend · React frontend · end-to-end latency under 2s",
  fig1label: "Fig 1.",
  fig1caption: "Six-stage voice pipeline. Parallelizing the four API calls (Whisper → GPT-4 → ElevenLabs → D-ID) was the critical optimization that brought latency under 2 seconds.",
  latencyXLabel: "Time from user speech end (ms)",

  safetyLayers: [
    { level: "Layer 1 — Hard Block", desc: "Crisis keyword detection (suicide, self-harm, abuse keywords). Triggers immediate escalation to hotline resources. Bypasses LLM.", color: "#ef4444", icon: "🚨" },
    { level: "Layer 2 — Soft Guardrails", desc: "System prompt instructs GPT-4 to never diagnose, never prescribe, and always suggest professional help after 3+ sessions of the same issue.", color: "#f97316", icon: "⚠️" },
    { level: "Layer 3 — Tone Guidance", desc: "Rogerian active-listening framing. Reflect feelings, ask clarifying questions, validate without amplifying distress.", color: "#22d3ee", icon: "💬" },
    { level: "Layer 4 — Normal Conversation", desc: "Standard session flow: check in, explore, reflect, close. No medical framing unless user brings it up.", color: "#a3e635", icon: "✅" },
  ] as { level: string; desc: string; color: string; icon: string }[],
  fig3label: "Fig 3.",
  fig3caption: "Safety architecture with four layers. Crisis detection bypasses the LLM entirely — rule-based keyword matching is more reliable than asking the model to self-moderate in high-stakes situations.",

  s1step: "Step 01",
  s1title: "The Stack: Four APIs in Parallel",
  s1p1pre: "The system chains four external APIs: ",
  s1p1b1: "OpenAI Whisper",
  s1p1m1: " for speech-to-text, ",
  s1p1b2: "GPT-4",
  s1p1m2: " for the conversational model, ",
  s1p1b3: "ElevenLabs",
  s1p1m3: " for text-to-speech, and ",
  s1p1b4: "D-ID",
  s1p1post: " for real-time lip-sync on a portrait. The UI frames the conversation as a FaceTime call — familiar, human, lower-stakes-feeling than a chat interface.",
  s1p2: "The biggest engineering challenge wasn't any individual API — it was making them work together with low enough latency to feel like a real conversation. Serial execution (wait for Whisper → wait for GPT → wait for ElevenLabs → wait for D-ID) produces 3–4 seconds of silence, which kills the illusion. The solution was parallelism and streaming.",
  s1p3: "Whisper processes audio as it streams from the microphone in chunks, reducing STT latency from ~1.2s (wait for end of speech + process) to ~380ms (process streaming chunks). GPT-4 responses begin streaming as tokens arrive — the first tokens feed into ElevenLabs before the full response is generated. D-ID begins rendering the avatar against the audio stream, so by the time GPT-4 finishes, the avatar is already mid-sentence.",
  callout: "Latency is the UX. At 3+ seconds of silence, the demo felt like talking to a loading screen. At under 2 seconds, it felt like a real call. That 1-second difference changed how every person at the demo table emotionally engaged with the product — and it was the hardest engineering problem we solved.",
  fig2label: "Fig 2.",
  fig2caption: "Latency breakdown per stage. ElevenLabs TTS starts streaming in parallel with GPT-4's token stream — the avatar begins speaking before GPT-4 has finished generating, which is why the total latency is 1.9s rather than 1.77s (serial sum).",

  s2step: "Step 02",
  s2title: "Safety Architecture",
  s2p1: "Building an LLM therapist without a serious safety framework is irresponsible. The risk isn't that the model will be obviously bad — GPT-4 is remarkably capable. The risk is that it will be subtly wrong in high-stakes moments: diagnosing a condition, suggesting a medication, or failing to escalate when a user is in crisis.",
  s2p2: "The safety architecture has four layers, each addressing a different failure mode:",
  s2p3pre: "The hard lesson from prompt engineering was that LLMs",
  s2p3em: " love to diagnose",
  s2p3post: " if you don't aggressively constrain them. Early versions of the system prompt would produce outputs like \"it sounds like you might be experiencing depression.\" The fix required explicit negative constraints (\"never diagnose, never use clinical labels\") plus positive framing (\"reflect feelings using the user's own words\") — the combination being much more robust than either alone.",

  s3step: "Step 03",
  s3title: "Demo Day: 2nd Place at HackGPT NYC",
  s3p1: "The demo ran end-to-end, live, on a laptop. No pre-recorded segments. Judges spoke to the avatar directly. The FaceTime framing — a face on screen, natural voice, responsive in under 2 seconds — consistently produced a visible shift in how people engaged: less skeptical, more conversational.",

  metrics: [
    { label: "hackathon placement", value: "2nd", sub: "out of ~80 teams · HackGPT NYC" },
    { label: "end-to-end latency", value: "<2s", sub: "speech to avatar response" },
    { label: "build time", value: "48h", sub: "from zero to live demo" },
    { label: "safety layers", value: "4", sub: "hard block → tone guidance" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "Three Things Worth Remembering",
  s5p1bold: "1. Latency is the product.",
  s5p1: " For a voice-based conversational AI, the latency budget is the primary UX constraint. Every architectural decision — streaming, parallel calls, early token forwarding — should be evaluated against its latency impact first.",
  s5p2bold: "2. The FaceTime framing did more for perceived empathy than any model upgrade.",
  s5p2: " Putting a face on screen in a familiar call layout made people treat the interaction differently. UX framing is not decoration — it shapes how users emotionally interpret the interaction.",
  s5p3bold: "3. Prompt engineering for safety constraints is harder than the technical stack.",
  s5p3: " Getting GPT-4 to reliably avoid clinical language required more iteration than building the entire streaming pipeline. When deploying LLMs in sensitive domains, the prompt is the safety mechanism — and it deserves as much engineering effort as the code.",
};

const es: typeof en = {
  subtitle:
    "Un terapeuta LLM estilo FaceTime con voz en tiempo real, un avatar con sincronización de labios y una arquitectura de seguridad de cuatro capas. Construido en 48 horas. 2.º lugar de ~80 equipos.",
  openP1:
    "La atención en salud mental tiene un problema de acceso. Las listas de espera se extienden durante meses, las sesiones cuestan $150–$300 sin seguro, y el estigma mantiene a millones alejados de buscar ayuda incluso cuando está disponible. ¿Podría un LLM, combinado con voz y un avatar humanizador, reducir la barrera a una herramienta de soporte conversacional de primera línea?",
  openP2:
    "El prompt del hackathon era abierto. El equipo aterrizó en este problema porque tenía un impacto humano claro, un stack multi-API técnicamente interesante y una historia de demo en vivo convincente. Teníamos 48 horas. El objetivo: una demo funcional de extremo a extremo con voz real, un avatar con sensación natural y barreras de seguridad lo suficientemente serias como para que nos sintiéramos cómodos mostrándosela a un desconocido.",

  pipelineStages: [
    { icon: "🎙", label: "Voz del Usuario", sub: "micrófono · audio en streaming", color: "#3b82f6" },
    { icon: "👂", label: "Whisper STT", sub: "chunks en streaming de baja latencia · OpenAI", color: "#8b5cf6" },
    { icon: "🧠", label: "GPT-4", sub: "prompt Rogeriano · detección de crisis · sin diagnósticos", color: "#f97316" },
    { icon: "🔊", label: "ElevenLabs TTS", sub: "voz cálida y tranquila · pausas SSML", color: "#ec4899" },
    { icon: "🎭", label: "D-ID Lip-Sync", sub: "sincronización de avatar en tiempo real · foto de retrato", color: "#22d3ee" },
    { icon: "📱", label: "UI estilo FaceTime", sub: "React · encuadre de llamada familiar", color: "#a3e635" },
  ],
  pipelineBottom: "Las 4 APIs en streaming paralelo · backend Flask · frontend React · latencia total menor a 2s",
  fig1label: "Fig 1.",
  fig1caption: "Pipeline de voz de seis etapas. Paralelizar las cuatro llamadas API (Whisper → GPT-4 → ElevenLabs → D-ID) fue la optimización crítica que redujo la latencia a menos de 2 segundos.",
  latencyXLabel: "Tiempo desde fin del habla del usuario (ms)",

  safetyLayers: [
    { level: "Capa 1 — Bloqueo Duro", desc: "Detección de palabras clave de crisis (suicidio, autolesión, palabras clave de abuso). Activa la escalada inmediata a recursos de línea de ayuda. Evita el LLM.", color: "#ef4444", icon: "🚨" },
    { level: "Capa 2 — Barreras Suaves", desc: "El system prompt indica a GPT-4 que nunca diagnostique, nunca recete, y siempre sugiera ayuda profesional después de 3+ sesiones con el mismo problema.", color: "#f97316", icon: "⚠️" },
    { level: "Capa 3 — Guía de Tono", desc: "Encuadre de escucha activa Rogeriana. Refleja sentimientos, formula preguntas clarificadoras, valida sin amplificar la angustia.", color: "#22d3ee", icon: "💬" },
    { level: "Capa 4 — Conversación Normal", desc: "Flujo estándar de sesión: check in, explorar, reflexionar, cerrar. Sin encuadre médico a menos que el usuario lo traiga.", color: "#a3e635", icon: "✅" },
  ],
  fig3label: "Fig 3.",
  fig3caption: "Arquitectura de seguridad con cuatro capas. La detección de crisis evita el LLM por completo — la coincidencia de palabras clave basada en reglas es más confiable que pedirle al modelo que se auto-modere en situaciones de alto riesgo.",

  s1step: "Paso 01",
  s1title: "El Stack: Cuatro APIs en Paralelo",
  s1p1pre: "El sistema encadena cuatro APIs externas: ",
  s1p1b1: "Whisper de OpenAI",
  s1p1m1: " para reconocimiento de voz, ",
  s1p1b2: "GPT-4",
  s1p1m2: " para el modelo conversacional, ",
  s1p1b3: "ElevenLabs",
  s1p1m3: " para síntesis de voz, y ",
  s1p1b4: "D-ID",
  s1p1post: " para sincronización de labios en tiempo real sobre un retrato. La interfaz enmarca la conversación como una llamada de FaceTime — familiar, humana, con menor percepción de riesgo que una interfaz de chat.",
  s1p2: "El mayor desafío de ingeniería no fue ninguna API individual — fue hacer que funcionaran juntas con suficientemente baja latencia para parecer una conversación real. La ejecución en serie (esperar Whisper → esperar GPT → esperar ElevenLabs → esperar D-ID) produce 3–4 segundos de silencio, lo que destruye la ilusión. La solución fue el paralelismo y el streaming.",
  s1p3: "Whisper procesa el audio conforme se transmite desde el micrófono en fragmentos, reduciendo la latencia de STT de ~1.2s (esperar fin del habla + procesar) a ~380ms (procesar fragmentos en streaming). Las respuestas de GPT-4 comienzan a transmitirse a medida que llegan los tokens — los primeros tokens alimentan ElevenLabs antes de que se genere la respuesta completa. D-ID comienza a renderizar el avatar contra el stream de audio, de modo que cuando GPT-4 termina, el avatar ya está a mitad de frase.",
  callout: "La latencia es la UX. Con más de 3 segundos de silencio, la demo parecía hablar con una pantalla de carga. Con menos de 2 segundos, parecía una llamada real. Esa diferencia de 1 segundo cambió cómo cada persona en la mesa de la demo se involucró emocionalmente con el producto — y fue el problema de ingeniería más difícil que resolvimos.",
  fig2label: "Fig 2.",
  fig2caption: "Desglose de latencia por etapa. ElevenLabs TTS comienza a transmitir en paralelo con el flujo de tokens de GPT-4 — el avatar comienza a hablar antes de que GPT-4 haya terminado de generar, por eso la latencia total es de 1.9s en lugar de 1.77s (suma en serie).",

  s2step: "Paso 02",
  s2title: "Arquitectura de Seguridad",
  s2p1: "Construir un terapeuta LLM sin un framework de seguridad serio es irresponsable. El riesgo no es que el modelo sea obviamente malo — GPT-4 es notablemente capaz. El riesgo es que sea sutilmente incorrecto en momentos de alto riesgo: diagnosticar una condición, sugerir un medicamento, o no escalar cuando un usuario está en crisis.",
  s2p2: "La arquitectura de seguridad tiene cuatro capas, cada una abordando un modo de fallo diferente:",
  s2p3pre: "La dura lección del prompt engineering fue que los LLMs",
  s2p3em: " adoran diagnosticar",
  s2p3post: " si no los restringes agresivamente. Las primeras versiones del system prompt producían outputs como «parece que podrías estar experimentando depresión.» La solución requería restricciones negativas explícitas («nunca diagnostiques, nunca uses etiquetas clínicas») más un encuadre positivo («refleja los sentimientos usando las propias palabras del usuario») — la combinación siendo mucho más robusta que cualquiera de las dos por separado.",

  s3step: "Paso 03",
  s3title: "Día de Demo: 2.º Lugar en HackGPT NYC",
  s3p1: "La demo se ejecutó de extremo a extremo, en vivo, en un portátil. Sin segmentos pregrabados. Los jueces hablaron directamente con el avatar. El encuadre de FaceTime — una cara en pantalla, voz natural, respuesta en menos de 2 segundos — produjo consistentemente un cambio visible en cómo las personas se involucraban: menos escépticas, más conversacionales.",

  metrics: [
    { label: "posición en hackathon", value: "2.º", sub: "de ~80 equipos · HackGPT NYC" },
    { label: "latencia de extremo a extremo", value: "<2s", sub: "del habla a la respuesta del avatar" },
    { label: "tiempo de construcción", value: "48h", sub: "de cero a demo en vivo" },
    { label: "capas de seguridad", value: "4", sub: "bloqueo duro → guía de tono" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "Tres Cosas que Vale la Pena Recordar",
  s5p1bold: "1. La latencia es el producto.",
  s5p1: " Para una IA conversacional basada en voz, el presupuesto de latencia es la principal restricción de UX. Cada decisión arquitectónica — streaming, llamadas paralelas, reenvío anticipado de tokens — debe evaluarse primero según su impacto en la latencia.",
  s5p2bold: "2. El encuadre de FaceTime aportó más a la empatía percibida que cualquier mejora del modelo.",
  s5p2: " Poner una cara en pantalla en un diseño de llamada familiar hizo que las personas trataran la interacción de manera diferente. El encuadre de UX no es decoración — moldea cómo los usuarios interpretan emocionalmente la interacción.",
  s5p3bold: "3. El prompt engineering para restricciones de seguridad es más difícil que el stack técnico.",
  s5p3: " Hacer que GPT-4 evitara de manera confiable el lenguaje clínico requirió más iteraciones que construir todo el pipeline de streaming. Al desplegar LLMs en dominios sensibles, el prompt es el mecanismo de seguridad — y merece tanto esfuerzo de ingeniería como el código.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function SystemPipeline({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {tx.pipelineStages.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div className="rounded-xl border px-2.5 py-3 text-center flex-1 w-full" style={{ borderColor: s.color + "55", background: s.color + "10" }}>
                <p className="text-lg mb-0.5">{s.icon}</p>
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-0.5 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < tx.pipelineStages.length - 1 && (
                <>
                  <div className="flex sm:hidden w-5 shrink-0 items-center justify-center text-ink-subtle">→</div>
                  <div className="hidden sm:flex h-4 w-full items-center justify-center text-ink-subtle text-sm">→</div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">{tx.pipelineBottom}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function LatencyWaterfall({ tx }: { tx: typeof en }) {
  const W = 520, H = 180;
  const pl = 110, pr = 80, pt = 20, pb = 40;
  const cW = W - pl - pr, cH = H - pt - pb;

  const stages = [
    { label: "Whisper STT", ms: 380, color: "#8b5cf6", x0: 0 },
    { label: "GPT-4 (TTFT)", ms: 750, color: "#f97316", x0: 380 },
    { label: "ElevenLabs TTS", ms: 360, color: "#ec4899", x0: 380 },
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
              <text x={xv(ms)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>{ms}ms</text>
            </g>
          ))}
          {stages.map(({ label, ms, color, x0 }, i) => {
            const y = pt + i * (cH / stages.length) + 1;
            const h = cH / stages.length - 4;
            const bW = (ms / total) * cW;
            return (
              <g key={label}>
                <text x={pl - 6} y={y + h / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize={9}>{label}</text>
                <rect x={xv(x0)} y={y} width={bW} height={h} fill={color} fillOpacity={0.75} rx={3} />
                <text x={xv(x0) + bW + 4} y={y + h / 2 + 3} fill="rgba(255,255,255,0.55)" fontSize={9}>{ms}ms</text>
              </g>
            );
          })}
          <line x1={xv(total)} y1={pt} x2={xv(total)} y2={pt + cH} stroke="#a3e635" strokeDasharray="3,2" />
          <text x={xv(total) + 3} y={pt + 12} fill="#a3e635" fontSize={9}>~1.9s total</text>
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.latencyXLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function SafetyLayers({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="space-y-3">
          {tx.safetyLayers.map(({ level, desc, color, icon }) => (
            <div key={level} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: color + "40", background: color + "08" }}>
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
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AITherapistContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Personal · HackGPT NYC · April 2023"
        title="AI Therapist — HackGPT 2nd Place"
        subtitle={tx.subtitle}
        tags={["LLM", "GPT-4", "Whisper", "ElevenLabs", "D-ID", "Mental Health", "48h Hackathon"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
        </Prose>

        <Prose>
          <SH id="stack" step={tx.s1step}>{tx.s1title}</SH>
          <P>
            {tx.s1p1pre}<B>{tx.s1p1b1}</B>{tx.s1p1m1}<B>{tx.s1p1b2}</B>{tx.s1p1m2}
            <B>{tx.s1p1b3}</B>{tx.s1p1m3}<B>{tx.s1p1b4}</B>{tx.s1p1post}
          </P>
          <P>{tx.s1p2}</P>
        </Prose>

        <Wide><SystemPipeline tx={tx} /></Wide>

        <Prose>
          <P>{tx.s1p3}</P>
        </Prose>

        <Wide><LatencyWaterfall tx={tx} /></Wide>

        <Prose>
          <Callout>{tx.callout}</Callout>
        </Prose>

        <Prose>
          <SH id="safety" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1}</P>
          <P>{tx.s2p2}</P>
        </Prose>

        <Wide><SafetyLayers tx={tx} /></Wide>

        <Prose>
          <P>{tx.s2p3pre}<Em>{tx.s2p3em}</Em>{tx.s2p3post}</P>
        </Prose>

        <Prose>
          <SH id="results" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1}</P>
        </Prose>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>{tx.s5title}</SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="music-recommender" />
      </div>
    </article>
  );
}
