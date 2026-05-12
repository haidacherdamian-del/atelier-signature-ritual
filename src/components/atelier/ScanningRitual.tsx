import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BackButton } from "./BackButton";

type Phase =
  | "left-prompt"
  | "left-scan"
  | "left-done"
  | "right-prompt"
  | "right-scan"
  | "right-done"
  | "final";

export function ScanningRitual({ onComplete, onBack }: { onComplete: () => void; onBack?: () => void }) {
  const [phase, setPhase] = useState<Phase>("left-prompt");

  // Only the *scanning* phases auto-progress to "done" — everything else waits for tap.
  useEffect(() => {
    if (phase === "left-scan") {
      const t = setTimeout(() => setPhase("left-done"), 3500);
      return () => clearTimeout(t);
    }
    if (phase === "right-scan") {
      const t = setTimeout(() => setPhase("right-done"), 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const copy: Record<Phase, { eyebrow: string; title: string; cta: string; onTap: () => void }> = {
    "left-prompt": {
      eyebrow: "Schritt 1 — Linker Fuß",
      title: "Platzieren Sie Ihren linken Fuß",
      cta: "Scan starten",
      onTap: () => setPhase("left-scan"),
    },
    "left-scan": {
      eyebrow: "Schritt 1 — Linker Fuß",
      title: "Ihre Form wird erfasst",
      cta: "",
      onTap: () => {},
    },
    "left-done": {
      eyebrow: "Schritt 1 — Abgeschlossen",
      title: "Linke Form, erfasst.",
      cta: "Weiter zum rechten Fuß",
      onTap: () => setPhase("right-prompt"),
    },
    "right-prompt": {
      eyebrow: "Schritt 2 — Rechter Fuß",
      title: "Platzieren Sie Ihren rechten Fuß",
      cta: "Scan starten",
      onTap: () => setPhase("right-scan"),
    },
    "right-scan": {
      eyebrow: "Schritt 2 — Rechter Fuß",
      title: "Ihre Form wird erfasst",
      cta: "",
      onTap: () => {},
    },
    "right-done": {
      eyebrow: "Schritt 2 — Abgeschlossen",
      title: "Rechte Form, erfasst.",
      cta: "Modelle entdecken",
      onTap: onComplete,
    },
    final: {
      eyebrow: "Präzision",
      title: "Ihre Form. Präzise verstanden.",
      cta: "Modell auswählen",
      onTap: onComplete,
    },
  };

  const current = copy[phase];

  const leftState: FootState = phase.startsWith("left")
    ? phase === "left-prompt"
      ? "prompt"
      : phase === "left-scan"
      ? "scanning"
      : "complete"
    : phase === "final" || phase.startsWith("right")
    ? "complete"
    : "idle";

  const rightState: FootState = phase.startsWith("right")
    ? phase === "right-prompt"
      ? "prompt"
      : phase === "right-scan"
      ? "scanning"
      : "complete"
    : phase === "final"
    ? "complete"
    : "idle";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {onBack && <BackButton onClick={onBack} />}

      {/* Top instruction */}
      <div className="absolute top-20 text-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1 }}
          >
            <p className="tracking-whisper mb-4" style={{ color: "oklch(0.82 0.085 75)" }}>{current.eyebrow}</p>
            <p
              className="font-display text-4xl italic md:text-5xl"
              style={{ color: "oklch(0.97 0.018 85)", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
            >
              {current.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Foot displays */}
      <div className="flex items-center justify-center gap-16 md:gap-32">
        <FootScan side="left" state={leftState} />
        <FootScan side="right" state={rightState} />
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-20 text-center">
        <AnimatePresence mode="wait">
          {current.cta && (
            <motion.button
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              onClick={current.onTap}
              className="group tracking-atelier transition-colors"
              style={{ color: "oklch(0.86 0.10 78)" }}
            >
              <span
                className="border-b pb-2 transition-colors"
                style={{ borderColor: "oklch(0.86 0.10 78 / 0.55)" }}
              >
                {current.cta}
              </span>
            </motion.button>
          )}
          {!current.cta && (
            <motion.p
              key={`${phase}-hint`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[0.65rem] tracking-[0.4em] uppercase"
              style={{ color: "oklch(0.7 0.02 70)" }}
            >
              · einen Moment ·
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 vignette pointer-events-none" />
    </motion.section>
  );
}

type FootState = "idle" | "prompt" | "scanning" | "complete";

function FootScan({ side, state }: { side: "left" | "right"; state: FootState }) {
  const flip = side === "right" ? "scale-x-[-1]" : "";

  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: state === "idle" ? 0.3 : state === "prompt" ? 0.7 : 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-72 w-40 md:h-[26rem] md:w-60"
      >
        {/* Glowing outline guide */}
        {state === "prompt" && (
          <motion.div
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 rounded-[50%/40%]"
            style={{
              boxShadow:
                "0 0 70px oklch(0.85 0.10 78 / 0.5), inset 0 0 45px oklch(0.85 0.10 78 / 0.28)",
              border: "1px solid oklch(0.85 0.10 78 / 0.65)",
            }}
          />
        )}

        {/* Ambient halo for scanning/complete */}
        {(state === "scanning" || state === "complete") && (
          <div
            className="absolute -inset-6 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.85 0.10 78 / 0.10) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Foot SVG */}
        <svg viewBox="0 0 200 400" className={`relative h-full w-full ${flip}`} fill="none">
          <defs>
            <linearGradient id={`grad-${side}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.88 0.10 78)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(0.62 0.07 65)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100 30 C 60 30, 50 80, 55 140 C 60 200, 50 260, 60 320 C 70 370, 130 370, 140 320 C 150 260, 140 200, 145 140 C 150 80, 140 30, 100 30 Z"
            stroke={`url(#grad-${side})`}
            strokeWidth="1.4"
            fill={state === "complete" ? "oklch(0.85 0.10 78 / 0.12)" : "transparent"}
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: state === "idle" || state === "prompt" ? 0.4 : 1,
              opacity: state === "complete" ? 1 : 0.85,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {(state === "scanning" || state === "complete") &&
            [80, 130, 180, 230, 280, 330].map((y, i) => (
              <motion.ellipse
                key={y}
                cx="100"
                cy={y}
                rx={y < 60 ? 25 : y > 280 ? 38 : 45}
                ry="6"
                stroke="oklch(0.85 0.10 78 / 0.6)"
                strokeWidth="0.7"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              />
            ))}
        </svg>

        {/* Light sweep during scan */}
        {state === "scanning" && (
          <motion.div
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-24"
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.88 0.10 78 / 0.65), transparent)",
              filter: "blur(8px)",
            }}
          />
        )}
      </motion.div>

      <div
        className="mt-6 text-center tracking-[0.45em] text-[0.7rem] uppercase"
        style={{
          color: state === "idle" ? "oklch(0.6 0.02 70)" : "oklch(0.85 0.085 75)",
          transition: "color 0.6s",
          fontWeight: 400,
        }}
      >
        {side === "left" ? "Links" : "Rechts"}
      </div>
    </div>
  );
}
