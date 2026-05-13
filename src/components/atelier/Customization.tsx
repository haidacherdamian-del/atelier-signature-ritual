import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { BackButton } from "./BackButton";
import type { BespokeOrder, PatinaTechnique } from "./types";
import { MODEL_META } from "./types";

import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import sneaker from "@/assets/shoe-sneaker.png";

import monkObsidian from "@/assets/monk-obsidian.png";
import monkCognac from "@/assets/monk-cognac.png";
import monkOxblood from "@/assets/monk-oxblood.png";
import monkIvory from "@/assets/monk-ivory.png";
import monkOlive from "@/assets/monk-olive.png";

const MONK_BY_COLOR: Record<string, string> = {
  obsidian: monkObsidian,
  cognac: monkCognac,
  oxblood: monkOxblood,
  ivory: monkIvory,
  olive: monkOlive,
};

const FALLBACK = { oxford, derby, loafer, sneaker } as const;

// ─────────────────────────────────────────────
// Editorial palettes
// ─────────────────────────────────────────────
type Tone = {
  id: string;
  name: string;
  whisper: string;
  hex: string;
  /** layered CSS background simulating hand-finished leather grain */
  texture: string;
};

// Reusable grain layers — give every tile organic, tactile depth.
// Combined with the tone's hex base they read as cropped macro leather.
const GRAIN_FINE =
  "repeating-radial-gradient(circle at 22% 28%, rgba(255,235,200,0.035) 0 1px, transparent 1px 4px)";
const GRAIN_PORES =
  "radial-gradient(circle at 72% 28%, rgba(0,0,0,0.28), transparent 58%), radial-gradient(circle at 22% 78%, rgba(0,0,0,0.32), transparent 62%)";
const SHEEN =
  "linear-gradient(135deg, rgba(255,235,205,0.10) 0%, rgba(255,235,205,0) 38%, rgba(0,0,0,0.22) 100%)";
const CLOUDING =
  "radial-gradient(ellipse 60% 45% at 30% 35%, rgba(255,235,205,0.07), transparent 65%), radial-gradient(ellipse 50% 40% at 75% 70%, rgba(0,0,0,0.22), transparent 70%)";

// Photographed full-grain leather: soft sheen, organic clouding, fine pores,
// subtle vignette so the tone reads pigmented and dimensional rather than flat.
const calfTexture = (hex: string) =>
  `${SHEEN}, ${CLOUDING}, ${GRAIN_PORES}, ${GRAIN_FINE}, radial-gradient(ellipse at 42% 38%, ${hex} 0%, ${hex} 55%, ${hex}dd 80%, ${hex}aa 100%)`;

const marbleTexture = (hex: string) =>
  `${SHEEN}, repeating-linear-gradient(118deg, rgba(255,240,210,0.10) 0 1px, transparent 1px 6px, rgba(0,0,0,0.18) 6px 7px, transparent 7px 14px), radial-gradient(ellipse at 25% 30%, rgba(255,220,170,0.18), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.5), transparent 60%), linear-gradient(140deg, ${hex} 0%, #0a0604 100%)`;

const papiroTexture = (hex: string) =>
  `${SHEEN}, radial-gradient(ellipse at 30% 30%, rgba(255,235,200,0.18), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(60,30,10,0.45), transparent 60%), repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0 2px, transparent 2px 5px), radial-gradient(ellipse at 50% 50%, ${hex}, ${hex}cc 70%)`;

const museumTexture = (hex: string) =>
  `${SHEEN}, radial-gradient(ellipse at 30% 70%, rgba(120,60,20,0.35), transparent 55%), radial-gradient(ellipse at 70% 25%, rgba(0,0,0,0.6), transparent 65%), repeating-radial-gradient(circle at 60% 40%, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px), linear-gradient(160deg, ${hex} 0%, #060302 100%)`;

const TEXTURE_FOR: Record<PatinaTechnique | "standard", (hex: string) => string> = {
  standard: calfTexture,
  marble: marbleTexture,
  papiro: papiroTexture,
  regular: calfTexture,
  museum: museumTexture,
};

const STANDARD_TONES: Tone[] = [
  { id: "black", name: "Black", whisper: "Seidiges Schwarz", hex: "#0d0b0a", texture: calfTexture("#0d0b0a") },
  { id: "dark-brown", name: "Dark Brown", whisper: "Espresso", hex: "#1f140d", texture: calfTexture("#1f140d") },
  { id: "medium-brown", name: "Medium Brown", whisper: "Cognac-Holz", hex: "#5a3220", texture: calfTexture("#5a3220") },
  { id: "cognac", name: "Cognac", whisper: "Saddle Amber", hex: "#8a4a1e", texture: calfTexture("#8a4a1e") },
  { id: "light-brown", name: "Light Brown", whisper: "Sandiges Taupe", hex: "#a07a55", texture: calfTexture("#a07a55") },
  { id: "mustard", name: "Mustard", whisper: "Karamellgold", hex: "#a67828", texture: calfTexture("#a67828") },
  { id: "burgundy", name: "Burgundy", whisper: "Reifer Bordeaux", hex: "#3a1418", texture: calfTexture("#3a1418") },
  { id: "red", name: "Red", whisper: "Tiefes Crimson", hex: "#5a161a", texture: calfTexture("#5a161a") },
  { id: "forest", name: "Forest", whisper: "Tiefes Laub", hex: "#1c2a22", texture: calfTexture("#1c2a22") },
  { id: "olive", name: "Olive", whisper: "Erdiges Militär", hex: "#3d3c25", texture: calfTexture("#3d3c25") },
  { id: "grey", name: "Grey", whisper: "Graphit", hex: "#4a4a4d", texture: calfTexture("#4a4a4d") },
  { id: "dark-blue", name: "Dark Blue", whisper: "Mitternacht", hex: "#11161f", texture: calfTexture("#11161f") },
  { id: "navy", name: "Navy", whisper: "Marine", hex: "#162238", texture: calfTexture("#162238") },
];

const PATINA_TECHNIQUES: {
  id: PatinaTechnique;
  name: string;
  whisper: string;
  preview: string;
}[] = [
  {
    id: "marble",
    name: "Marble",
    whisper: "Organische Tiefe",
    // Cloudy organic veining — irregular hand movement, smoked espresso base
    preview:
      "linear-gradient(135deg, rgba(255,235,210,0.06) 0%, rgba(0,0,0,0.35) 100%), radial-gradient(ellipse 60% 40% at 30% 35%, rgba(70,42,28,0.55), transparent 70%), radial-gradient(ellipse 50% 35% at 75% 70%, rgba(0,0,0,0.7), transparent 65%), radial-gradient(ellipse 30% 25% at 60% 25%, rgba(120,80,50,0.25), transparent 70%), linear-gradient(160deg, #1a120c 0%, #0a0604 100%)",
  },
  {
    id: "papiro",
    name: "Papiro",
    whisper: "Feine Schichtung",
    // Directional brushed/parchment wipe marks
    preview:
      "linear-gradient(135deg, rgba(255,235,210,0.05) 0%, rgba(0,0,0,0.25) 100%), repeating-linear-gradient(102deg, rgba(255,225,190,0.05) 0 1px, transparent 1px 4px, rgba(0,0,0,0.18) 4px 5px, transparent 5px 9px), radial-gradient(ellipse at 30% 40%, rgba(90,60,38,0.35), transparent 65%), linear-gradient(150deg, #1c1410 0%, #0c0805 100%)",
  },
  {
    id: "regular",
    name: "Regular",
    whisper: "Klassische Balance",
    // Smooth even burnishing — subtle polished gradient
    preview:
      "linear-gradient(140deg, rgba(255,235,205,0.08) 0%, rgba(255,235,205,0) 45%, rgba(0,0,0,0.4) 100%), radial-gradient(ellipse at 38% 38%, rgba(80,52,32,0.3), transparent 70%), linear-gradient(155deg, #1a120d 0%, #0c0805 100%)",
  },
  {
    id: "museum",
    name: "Museum",
    whisper: "Gealterte Intensität",
    // Smoky aged depth, multidimensional darkness
    preview:
      "linear-gradient(135deg, rgba(255,225,185,0.07) 0%, rgba(0,0,0,0.5) 100%), radial-gradient(ellipse 55% 40% at 28% 70%, rgba(85,50,28,0.4), transparent 60%), radial-gradient(ellipse 45% 35% at 75% 25%, rgba(0,0,0,0.85), transparent 65%), repeating-radial-gradient(circle at 60% 45%, rgba(0,0,0,0.18) 0 1px, transparent 1px 5px), linear-gradient(165deg, #14100a 0%, #050302 100%)",
  },
];

const PATINA_COLORS: { id: string; name: string; whisper: string; hex: string }[] = [
  { id: "denim", name: "Denim", whisper: "Verwaschenes Indigo", hex: "#3a4a66" },
  { id: "grey", name: "Grey", whisper: "Stein im Nebel", hex: "#5a5a5a" },
  { id: "cognac", name: "Cognac", whisper: "Warmes Licht", hex: "#6a3a18" },
  { id: "brown", name: "Brown", whisper: "Erdene Tiefe", hex: "#3a2010" },
  { id: "purple", name: "Purple", whisper: "Sammtene Dämmerung", hex: "#3a1a3e" },
  { id: "burgundy", name: "Burgundy", whisper: "Reifer Bordeaux", hex: "#4a0c1c" },
  { id: "khaki", name: "Khaki", whisper: "Stiller Salbei", hex: "#5a5230" },
  { id: "turquoise", name: "Turquoise", whisper: "Adriatisches Blau", hex: "#1a4a52" },
];

const buildPatinaPalette = (technique: PatinaTechnique): Tone[] =>
  PATINA_COLORS.map((c) => ({
    id: `${technique}-${c.id}`,
    name: c.name,
    whisper: c.whisper,
    hex: c.hex,
    texture: TEXTURE_FOR[technique](c.hex),
  }));

const PATINA_PALETTES: Record<PatinaTechnique, Tone[]> = {
  marble: buildPatinaPalette("marble"),
  papiro: buildPatinaPalette("papiro"),
  regular: buildPatinaPalette("regular"),
  museum: buildPatinaPalette("museum"),
};

// ─────────────────────────────────────────────
export function Customization({
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
  const isPatina = order.finish === "patina";

  // Initialize a default patina technique + tone the first time we land here.
  useEffect(() => {
    if (!isPatina) return;
    if (!order.patinaTechnique) {
      onUpdate({
        patinaTechnique: "regular",
        patinaColor: PATINA_PALETTES.regular[0].id,
      });
    } else if (!order.patinaColor) {
      onUpdate({ patinaColor: PATINA_PALETTES[order.patinaTechnique][0].id });
    }
  }, [isPatina, order.patinaTechnique, order.patinaColor, onUpdate]);

  const technique: PatinaTechnique | null = isPatina
    ? order.patinaTechnique ?? "regular"
    : null;

  const palette: Tone[] =
    isPatina && technique ? PATINA_PALETTES[technique] : STANDARD_TONES;

  const activeToneId = isPatina ? order.patinaColor ?? palette[0].id : order.color;
  const activeTone = palette.find((t) => t.id === activeToneId) ?? palette[0];

  const isMonk = order.model === "monk";
  const monkKey = isPatina ? "oxblood" : order.color;
  const baseImg = isMonk
    ? MONK_BY_COLOR[monkKey] ?? monkObsidian
    : order.model && order.model !== "monk"
      ? FALLBACK[order.model as keyof typeof FALLBACK]
      : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  // Patina blends multiplicatively; standard calf gets a soft sheen.
  const tonalWash = {
    background: `radial-gradient(ellipse at 40% 40%, ${activeTone.hex}cc, ${activeTone.hex}55 60%, transparent 85%)`,
    mixBlendMode: isPatina ? ("multiply" as const) : ("soft-light" as const),
    opacity: isPatina ? 0.85 : 0.55,
  };

  const sectionLabel = isPatina && technique
    ? `— ${PATINA_TECHNIQUES.find((p) => p.id === technique)?.name} Patina —`
    : "— Tonalität —";

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
        <p className="text-gold-soft tracking-whisper text-[0.65rem]">{sectionLabel}</p>
        <h1 className="font-display text-ivory mt-3 text-2xl md:text-3xl italic">
          {isPatina ? "Die Hand des Patineurs" : "Tonalität des Leders"}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-xs tracking-wide">
          {meta.name} · <span className="text-gold-soft/80">{activeTone.whisper}</span>
        </p>
      </motion.div>

      {/* Stage — the shoe is always the hero */}
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
            src={baseImg}
            alt={meta.name}
            className="block max-h-[55vh] max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${technique ?? "std"}-${activeTone.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: tonalWash.opacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: tonalWash.background,
                mixBlendMode: tonalWash.mixBlendMode,
                WebkitMaskImage: `url(${baseImg})`,
                maskImage: `url(${baseImg})`,
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

      {/* Atelier rail — technique + tone tiles */}
      <div className="pb-10 px-6 md:px-12">
        {isPatina && (
          <div className="flex justify-center gap-8 md:gap-12 mb-10">
            {PATINA_TECHNIQUES.map((t) => {
              const selected = technique === t.id;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => {
                    onUpdate({
                      patinaTechnique: t.id,
                      patinaColor: PATINA_PALETTES[t.id][0].id,
                    });
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      boxShadow: selected
                        ? "0 0 26px oklch(0.78 0.09 75 / 0.32), inset 0 0 0 1px oklch(0.78 0.09 75 / 0.75)"
                        : "inset 0 0 0 1px oklch(0.92 0.01 80 / 0.12)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-16 w-28 md:h-20 md:w-32 rounded-[2px] overflow-hidden"
                    style={{ backgroundImage: t.preview }}
                  />
                  <span
                    className={`mt-4 font-display italic text-[0.85rem] transition-colors ${
                      selected ? "text-gold" : "text-ivory/85 group-hover:text-gold-soft"
                    }`}
                  >
                    {t.name}
                  </span>
                  <span className="text-gold-soft/60 tracking-[0.25em] uppercase text-[0.55rem] mt-1.5">
                    {t.whisper}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Tone tiles — leather macro swatches */}
        <div className="flex justify-center gap-6 md:gap-9 flex-wrap mb-10 max-w-5xl mx-auto px-4">
          {palette.map((tone) => {
            const selected = tone.id === activeToneId;
            return (
              <motion.button
                key={tone.id}
                onClick={() => {
                  if (isPatina) onUpdate({ patinaColor: tone.id });
                  else onUpdate({ color: tone.id as BespokeOrder["color"] });
                }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center"
              >
                <div className="relative">
                  {/* soft outer glow on selection */}
                  <motion.div
                    animate={{ opacity: selected ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -inset-2 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.78 0.09 75 / 0.25), transparent 70%)",
                    }}
                  />
                  <motion.div
                    animate={{
                      scale: selected ? 1.04 : 1,
                      boxShadow: selected
                        ? "inset 0 0 0 1px oklch(0.82 0.10 78 / 0.95), inset 0 0 22px rgba(0,0,0,0.4)"
                        : "inset 0 0 0 1px rgba(255,240,210,0.10), inset 0 0 18px rgba(0,0,0,0.45)",
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden"
                    style={{ backgroundImage: tone.texture, backgroundSize: "cover" }}
                  />
                </div>
                <span
                  className={`mt-4 font-display italic text-[0.82rem] tracking-[0.04em] transition-colors duration-500 ${
                    selected ? "text-gold" : "text-ivory/75 group-hover:text-gold-soft"
                  }`}
                >
                  {tone.name}
                </span>
                <span className="mt-1 text-ivory/35 tracking-[0.22em] uppercase text-[0.5rem]">
                  {tone.whisper}
                </span>
              </motion.button>
            );
          })}
        </div>

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
