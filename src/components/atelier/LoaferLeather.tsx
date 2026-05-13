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
  { id: "roberto", name: "Roberto", hex: "#ece2d0", texture: calfTexture("#ece2d0") },
  { id: "fabio", name: "Fabio", hex: "#7a4422", texture: calfTexture("#7a4422") },
  { id: "giovanni", name: "Giovanni", hex: "#5a3018", texture: calfTexture("#5a3018") },
  { id: "carlo", name: "Carlo", hex: "#2a160c", texture: calfTexture("#2a160c") },
  { id: "paolo", name: "Paolo", hex: "#3d1014", texture: calfTexture("#3d1014") },
  { id: "andrea", name: "Andrea", hex: "#0e1a30", texture: calfTexture("#0e1a30") },
  { id: "alessio", name: "Alessio", hex: "#070b18", texture: calfTexture("#070b18") },
];

// ─── Velours (Suede) palette ────────────────────────────────────
const VELOURS: Swatch[] = [
  { id: "gastone", name: "Gastone", hex: "#3a2014", texture: suedeTexture("#3a2014") },
  { id: "udinesi", name: "Udinesi", hex: "#0e1a30", texture: suedeTexture("#0e1a30") },
  { id: "cociarelli", name: "Cociarelli", hex: "#c9b596", texture: suedeTexture("#c9b596") },
  { id: "fausto", name: "Fausto", hex: "#4a1a1c", texture: suedeTexture("#4a1a1c") },
  { id: "arrigo", name: "Arrigo", hex: "#7a4422", texture: suedeTexture("#7a4422") },
  { id: "attilio", name: "Attilio", hex: "#6a5a4a", texture: suedeTexture("#6a5a4a") },
  { id: "nero", name: "Nero", hex: "#1a1715", texture: suedeTexture("#1a1715") },
  { id: "calcolo", name: "Calcolo", hex: "#9a9690", texture: suedeTexture("#9a9690") },
  { id: "ruggero", name: "Ruggero", hex: "#4a4a25", texture: suedeTexture("#4a4a25") },
  { id: "gabino", name: "Gabino", hex: "#6a6865", texture: suedeTexture("#6a6865") },
];

const PALETTES: Record<LeatherKind, Swatch[]> = { calf: STANDARD, suede: VELOURS };

const KIND_META: Record<LeatherKind, { title: string; subtitle: string }> = {
  calf: { title: "Standard Leder", subtitle: "Weiches Kalbsleder für klassischen Komfort" },
  suede: { title: "Velours", subtitle: "Samtiges Veloursleder mit entspannter Eleganz" },
};

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

  // Suede absorbs more light, calf has sheen
  const tonalWash = {
    background: `radial-gradient(ellipse at 40% 40%, ${active.hex}cc, ${active.hex}55 60%, transparent 85%)`,
    mixBlendMode: (kind === "suede" ? "multiply" : "soft-light") as "multiply" | "soft-light",
    opacity: kind === "suede" ? 0.85 : 0.6,
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 grid grid-rows-[auto_1fr_auto]"
    >
      {onBack && <BackButton onClick={onBack} />}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center pt-12 px-8"
      >
        <p className="text-gold-soft tracking-whisper text-[0.65rem]">
          — {KIND_META[kind].title} —
        </p>
        <h1 className="font-display text-ivory mt-3 text-2xl md:text-3xl italic">
          Wählen Sie Ihr Leder.
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-xs tracking-wide">
          Loafer · <span className="text-gold-soft/80">{active.name}</span>
        </p>
      </motion.div>

      {/* Stage — the loafer is always the hero */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.09 75 / 0.10) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-h-[55vh] max-w-[78%]">
          <img
            src={loafer}
            alt="Loafer"
            className="block max-h-[55vh] max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${kind}-${active.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: tonalWash.opacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: tonalWash.background,
                mixBlendMode: tonalWash.mixBlendMode,
                WebkitMaskImage: `url(${loafer})`,
                maskImage: `url(${loafer})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Atelier rail — leather kind toggle + color tiles */}
      <div className="pb-10 px-6 md:px-12">
        {/* Kind toggle */}
        <div className="flex justify-center gap-8 md:gap-12 mb-8">
          {(Object.keys(KIND_META) as LeatherKind[]).map((k) => {
            const selected = kind === k;
            const meta = KIND_META[k];
            return (
              <motion.button
                key={k}
                onClick={() => selectKind(k)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col items-center"
              >
                <span
                  className={`mb-3 tracking-[0.3em] uppercase text-[0.55rem] transition-colors ${
                    selected ? "text-gold" : "text-ivory/45"
                  }`}
                >
                  {selected ? "Ausgewählt" : "Auswählen"}
                </span>
                <motion.div
                  animate={{
                    boxShadow: selected
                      ? "0 0 26px oklch(0.78 0.09 75 / 0.32), inset 0 0 0 1px oklch(0.78 0.09 75 / 0.75)"
                      : "inset 0 0 0 1px oklch(0.92 0.01 80 / 0.12)",
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-16 w-28 md:h-20 md:w-32 rounded-[2px] overflow-hidden"
                  style={{
                    backgroundImage:
                      k === "calf"
                        ? calfTexture("#3a2014")
                        : suedeTexture("#5a3a20"),
                  }}
                />
                <span
                  className={`mt-4 font-display italic text-[0.85rem] transition-colors ${
                    selected ? "text-gold" : "text-ivory/85 group-hover:text-gold-soft"
                  }`}
                >
                  {meta.title}
                </span>
                <span className="text-gold-soft/60 tracking-[0.25em] uppercase text-[0.55rem] mt-1.5">
                  {meta.subtitle}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tone tiles */}
        <AnimatePresence mode="wait">
          <motion.div
            key={kind}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-3 md:gap-5 flex-wrap mb-8"
          >
            {palette.map((tone) => {
              const selected = tone.id === active.id;
              return (
                <motion.button
                  key={tone.id}
                  onClick={() => onUpdate({ color: tone.id })}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: selected ? 1.06 : 1,
                      boxShadow: selected
                        ? "0 0 28px oklch(0.78 0.09 75 / 0.5), inset 0 0 0 1px oklch(0.78 0.09 75 / 0.9)"
                        : "inset 0 0 0 1px oklch(0.92 0.01 80 / 0.2)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-10 w-16 md:h-12 md:w-20 rounded-[3px] overflow-hidden"
                    style={{ backgroundImage: tone.texture }}
                  />
                  <span
                    className={`mt-2 font-display italic text-[0.72rem] transition-colors ${
                      selected ? "text-gold" : "text-ivory/80 group-hover:text-gold-soft"
                    }`}
                  >
                    {tone.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <button
            onClick={onContinue}
            className="text-gold tracking-atelier text-sm hover:text-ivory transition-colors"
          >
            <span className="border-gold/40 border-b pb-2">Fortfahren</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
