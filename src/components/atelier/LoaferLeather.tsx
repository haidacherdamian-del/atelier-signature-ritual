import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackButton } from "./BackButton";
import type { BespokeOrder } from "./types";

import loafer from "@/assets/shoe-loafer.png";

type LeatherKind = "calf" | "suede";

type Swatch = { id: string; name: string; hex: string; texture: string };

// ─── Texture helpers ────────────────────────────────────────────
const SHEEN =
  "linear-gradient(135deg, rgba(255,230,190,0.16) 0%, rgba(255,230,190,0) 35%, rgba(0,0,0,0.25) 100%)";
const GRAIN_FINE =
  "repeating-radial-gradient(circle at 18% 22%, rgba(255,235,200,0.05) 0 1px, transparent 1px 3px)";
const GRAIN_PORES =
  "radial-gradient(circle at 70% 30%, rgba(0,0,0,0.35), transparent 55%), radial-gradient(circle at 25% 75%, rgba(0,0,0,0.4), transparent 60%)";

const calfTexture = (hex: string) =>
  `${SHEEN}, ${GRAIN_PORES}, ${GRAIN_FINE}, radial-gradient(ellipse at 40% 35%, ${hex}ee, ${hex} 70%)`;

const suedeTexture = (hex: string) =>
  `linear-gradient(160deg, rgba(255,235,210,0.06) 0%, rgba(0,0,0,0.35) 100%), repeating-radial-gradient(circle at 30% 30%, rgba(255,235,210,0.10) 0 1px, transparent 1px 2px), repeating-radial-gradient(circle at 70% 70%, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px), radial-gradient(ellipse at 45% 40%, ${hex}, ${hex}cc 70%)`;

// ─── Standard (Calf) palette ────────────────────────────────────
const STANDARD: Swatch[] = [
  { id: "roberto", name: "Roberto", hex: "#1a1310", texture: calfTexture("#1a1310") },
  { id: "fabio", name: "Fabio", hex: "#3a2014", texture: calfTexture("#3a2014") },
  { id: "giovanni", name: "Giovanni", hex: "#5a3018", texture: calfTexture("#5a3018") },
  { id: "carlo", name: "Carlo", hex: "#7a4220", texture: calfTexture("#7a4220") },
  { id: "paolo", name: "Paolo", hex: "#9a6a3e", texture: calfTexture("#9a6a3e") },
  { id: "andrea", name: "Andrea", hex: "#3d1014", texture: calfTexture("#3d1014") },
  { id: "alessio", name: "Alessio", hex: "#0e1a30", texture: calfTexture("#0e1a30") },
];

// ─── Velours (Suede) palette ────────────────────────────────────
const VELOURS: Swatch[] = [
  { id: "gastone", name: "Gastone", hex: "#6a4a2c", texture: suedeTexture("#6a4a2c") },
  { id: "udinesi", name: "Udinesi", hex: "#3a2818", texture: suedeTexture("#3a2818") },
  { id: "cociarelli", name: "Cociarelli", hex: "#8a5a30", texture: suedeTexture("#8a5a30") },
  { id: "fausto", name: "Fausto", hex: "#5a3a20", texture: suedeTexture("#5a3a20") },
  { id: "arrigo", name: "Arrigo", hex: "#4a1a1c", texture: suedeTexture("#4a1a1c") },
  { id: "attilio", name: "Attilio", hex: "#1a2e3a", texture: suedeTexture("#1a2e3a") },
  { id: "nero", name: "Nero", hex: "#0a0807", texture: suedeTexture("#0a0807") },
  { id: "calcolo", name: "Calcolo", hex: "#5a5a5a", texture: suedeTexture("#5a5a5a") },
  { id: "ruggero", name: "Ruggero", hex: "#7a2a18", texture: suedeTexture("#7a2a18") },
  { id: "gabino", name: "Gabino", hex: "#3a3a1f", texture: suedeTexture("#3a3a1f") },
];

const PALETTES: Record<LeatherKind, Swatch[]> = { calf: STANDARD, suede: VELOURS };

const CARDS: {
  id: LeatherKind;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "calf",
    title: "Standard",
    subtitle: "Weiches Kalbsleder für klassischen Komfort",
  },
  {
    id: "suede",
    title: "Velours",
    subtitle: "Samtiges Veloursleder mit entspannter Eleganz",
  },
];

export function LoaferLeather({
  order,
  onUpdate,
  onContinue,
  onBack,
}: {
  order: BespokeOrder;
  onUpdate: (p: Partial<BespokeOrder>) => void;
  onContinue: () => void;
  onBack?: () => void;
}) {
  const initialKind: LeatherKind = order.leather === "suede" ? "suede" : "calf";
  const [kind, setKind] = useState<LeatherKind>(initialKind);
  const palette = PALETTES[kind];
  const activeId = palette.some((s) => s.id === order.color) ? order.color : palette[0].id;
  const active = palette.find((s) => s.id === activeId) ?? palette[0];

  const selectKind = (k: LeatherKind) => {
    if (k === kind) return;
    setKind(k);
    onUpdate({ leather: k, color: PALETTES[k][0].id, finish: "polished" });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-20 pb-24 overflow-y-auto"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="relative text-center px-8 mb-10 md:mb-12"
      >
        <p
          className="text-[0.65rem] md:text-[0.7rem] tracking-[0.5em]"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DIE LEDERWELT
        </p>
        <p
          className="font-display italic text-3xl md:text-4xl mt-5"
          style={{ color: "oklch(0.94 0.015 80)" }}
        >
          Wählen Sie Ihr Leder.
        </p>
        <p
          className="mt-4 text-xs md:text-sm tracking-[0.18em] max-w-xl mx-auto"
          style={{ color: "oklch(0.72 0.02 75 / 0.85)", fontWeight: 300 }}
        >
          Zwei Charaktere, ein bleibender Eindruck.
        </p>
      </motion.div>

      {/* Two cards */}
      <div className="relative w-full max-w-5xl px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-14 md:mb-16">
        {CARDS.map((c, i) => {
          const isSelected = kind === c.id;
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => selectKind(c.id)}
              className="group relative flex flex-col items-center text-center focus:outline-none p-8 md:p-10 rounded-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.16 0.01 60 / 0.55) 0%, oklch(0.10 0.01 60 / 0.35) 100%)",
              }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-[2px]"
                animate={{
                  boxShadow: isSelected
                    ? "0 0 40px oklch(0.78 0.10 75 / 0.30), inset 0 0 0 1px oklch(0.85 0.10 78 / 0.85)"
                    : "inset 0 0 0 1px oklch(0.92 0.01 80 / 0.10)",
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              <p
                className="text-[0.6rem] tracking-[0.5em] mb-4"
                style={{
                  color: isSelected ? "oklch(0.88 0.10 78)" : "oklch(0.78 0.075 72 / 0.7)",
                  fontWeight: 300,
                }}
              >
                {isSelected ? "AUSGEWÄHLT" : "AUSWÄHLEN"}
              </p>
              <p
                className="font-display italic text-3xl md:text-4xl"
                style={{ color: "oklch(0.95 0.015 80)" }}
              >
                {c.title}
              </p>
              <p
                className="mt-4 text-xs md:text-sm tracking-[0.14em] max-w-xs mx-auto leading-relaxed"
                style={{ color: "oklch(0.74 0.02 75 / 0.9)", fontWeight: 300 }}
              >
                {c.subtitle}
              </p>

              <div className="pt-5 flex justify-center">
                <motion.div
                  className="h-px"
                  animate={{
                    width: isSelected ? 64 : 18,
                    backgroundColor: isSelected
                      ? "oklch(0.85 0.10 78)"
                      : "oklch(0.78 0.075 72 / 0.35)",
                  }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Color grid */}
      <div className="relative w-full max-w-4xl px-6 md:px-10">
        <p
          className="text-center text-[0.6rem] tracking-[0.5em] mb-8"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          — TONALITÄT —
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={kind}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center gap-5 md:gap-7 flex-wrap"
          >
            {palette.map((s) => {
              const selected = s.id === active.id;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => onUpdate({ color: s.id })}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: selected ? 1.08 : 1,
                      boxShadow: selected
                        ? "0 0 28px oklch(0.78 0.09 75 / 0.5), inset 0 0 0 1px oklch(0.85 0.10 78 / 0.95)"
                        : "inset 0 0 0 1px oklch(0.92 0.01 80 / 0.18)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden"
                    style={{ backgroundImage: s.texture }}
                  />
                  <span
                    className={`mt-3 font-display italic text-[0.78rem] transition-colors ${
                      selected ? "text-gold" : "text-ivory/80 group-hover:text-gold-soft"
                    }`}
                  >
                    {s.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-14 md:mt-16"
      >
        <button
          onClick={onContinue}
          className="group tracking-[0.5em] text-[0.7rem]"
          style={{ color: "oklch(0.88 0.10 78)", fontWeight: 300 }}
        >
          <span className="border-b pb-2" style={{ borderColor: "oklch(0.78 0.075 72 / 0.45)" }}>
            FORTFAHREN
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
