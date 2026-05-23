import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#fdfdfe",
          elev: "#eff0f3",
          card: "#e8eaef",
        },
        ink: {
          DEFAULT: "#0e1014",
          muted: "#5c6175",
          subtle: "#969daf",
        },
        border: {
          DEFAULT: "#dce0ea",
          strong: "#c8cdd9",
        },
        accent: {
          DEFAULT: "#15254e", // deep navy
          soft: "#1e3260",
          glow: "#0e1014",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(21,37,78,0.06), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(21,37,78,0.25)" },
          "50%": { boxShadow: "0 0 40px 6px rgba(21,37,78,0.1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
