"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { human } from "@/content/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              data scientist · open to Europe
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h1"
            >
              I build models that{" "}
              <span className="relative whitespace-nowrap">
                <span className="text-accent">move metrics.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent/50"
                  viewBox="0 0 300 8"
                  fill="none"
                >
                  <path
                    d="M2 5 Q 75 1, 150 4 T 298 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 max-w-xl text-lg text-ink-muted leading-relaxed"
            >
              I&apos;m {human.name.split(" ")[0]}, a Barcelona-born data scientist.
              I studied engineering at <span className="text-ink">Purdue</span>{" "}
              and data science at <span className="text-ink">NYU</span>, then worked
              on time-series forecasting at <span className="text-ink">HP</span>,
              experimentation and A/B testing at <span className="text-ink">Meta</span>,
              and now build models with the marketing and risk teams at{" "}
              <span className="text-ink">Santander</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                View projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={human.resume}
                target="_blank"
                rel="noopener"
                className="btn-ghost"
              >
                <Download className="h-4 w-4" /> Download resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-ink-subtle"
            >
              <span>now → Santander</span>
              <span className="hidden sm:inline">·</span>
              <span>prev → Meta · HP</span>
              <span className="hidden sm:inline">·</span>
              <span>edu → NYU MS · Purdue BS</span>
            </motion.div>
          </div>

          {/* Visual: portrait + floating stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto lg:mx-0 w-full max-w-sm aspect-[4/5]"
          >
            <div className="absolute inset-0 rounded-3xl border border-border bg-bg-card overflow-hidden">
              <Portrait />
            </div>

            {/* Floating stat chips */}
            <FloatingStat
              className="left-[-1.5rem] top-12"
              value="+18%"
              label="deposits / campaign"
              delay={0.6}
            />
            <FloatingStat
              className="right-[-1rem] top-1/3"
              value="−60%"
              label="bureau pulls"
              delay={0.8}
            />
            <FloatingStat
              className="left-[-2rem] bottom-16"
              value="NYU"
              label="MS data science"
              delay={1}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingStat({
  value,
  label,
  className,
  delay,
}: {
  value: string;
  label: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute ${className} rounded-2xl border border-border bg-bg-elev/90 backdrop-blur-md px-4 py-3 shadow-xl shadow-black/30`}
    >
      <div className="font-mono text-2xl text-accent font-semibold leading-none">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-ink-subtle mt-1">
        {label}
      </div>
    </motion.div>
  );
}

function Portrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* Initials fallback — always rendered behind */}
      <div className="absolute inset-0 flex items-center justify-center bg-bg-elev">
        <span className="font-display text-8xl font-bold text-ink/15 select-none">
          AV
        </span>
      </div>

      {/* Real photo overlay (hidden until loaded; removed on error) */}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/profile_pic.png"
          alt="Alexandre Vives"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-end p-5 text-xs font-mono text-ink-muted pointer-events-none">
          <span>alexandre vives</span>
        </div>
      )}
    </div>
  );
}
