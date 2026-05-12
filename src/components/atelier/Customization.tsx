import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
type Tone = { id: string; name: string; whisper: string; hex: string };

const STANDARD_TONES: Tone[] = [
  { id: "obsidian", name: "Obsidian", whisper: "Tiefe Nacht", hex: "#0a0807" },
  { id: "cognac", name: "Cognac", whisper: "Warmes Licht", hex: "#5a3018" },
  { id: "oxblood", name: "Oxblood", whisper: "Edler Wein", hex: "#3d1014" },
  { id: "ivory", name: "Elfenbein", whisper: "Stille Helle", hex: "#e8dfcc" },
  { id: "olive", name: "Olive", whisper: "Ruhige Erde", hex: "#3a3a1f" },
];

const PATINA_TECHNIQUES: {
  id: PatinaTechnique;
  name: string;
  whisper: string;
  description: string;
  swatch: string;
}[] = [
  {
    id: "marble",
    name: "Marble",
    whisper: "Geäderte Tiefe",
    description: "Aderungen wie geschliffener Marmor, von Hand aufgetragen.",
    swatch:
      "radial-gradient(ellipse at 30% 30%, #8a5a2a, #2a140a 60%), repeating-linear-gradient(120deg, rgba(255,240,200,0.08) 0 2px, transparent 2px 8px)",
  },
  {
    id: "papiro",
    name: "Papiro",
    whisper: "Handgeschöpftes Papier",
    description: "Sanft gewischte Übergänge, papyrushafte Textur.",
    swatch:
      "radial-gradient(ellipse at 50% 50%, #c89a5a, #4a2a14 70%)",
  },
  {
    id: "regular",
    name: "Regular Patina",
    whisper: "Klassische Hand",
    description: "Die zeitlose Berluti-Schule, ruhig und gleichmäßig.",
    swatch:
      "radial-gradient(ellipse at 40% 40%, #6a3a1a, #1a0a04 70%)",
  },
  {
    id: "museum",
    name: "Museum",
    whisper: "Antike Würde",
    description: "Tiefe Schattierungen, jahrzehntelang gereift.",
    swatch:
      "radial-gradient(ellipse at 30% 70%, #3a1808, #0a0402 80%), radial-gradient(ellipse at 70% 30%, rgba(120,60,20,0.4), transparent 60%)",
  },
];

const PATINA_PALETTES: Record<PatinaTechnique, Tone[]> = {
  marble: [
    { id: "marble-noir", name: "Noir Veiné", whisper: "Schwarz mit Adern", hex: "#1a0d08" },
    { id: "marble-cognac", name: "Cognac Veiné", whisper: "Goldene Maserung", hex: "#6a3a18" },
    { id: "marble-bordeaux", name: "Bordeaux Veiné", whisper: "Rot in Tiefe", hex: "#3a0c14" },
  ],
  papiro: [
    { id: "papiro-sable", name: "Sable", whisper: "Warmer Sand", hex: "#a87a4a" },
    { id: "papiro-tabac", name: "Tabac", whisper: "Gereifter Tabak", hex: "#5a3818" },
    { id: "papiro-ambre", name: "Ambre", whisper: "Honigbernstein", hex: "#7a4818" },
  ],
  regular: [
    { id: "regular-noir", name: "Noir", whisper: "Tiefes Schwarz", hex: "#0a0805" },
    { id: "regular-cognac", name: "Cognac", whisper: "Klassische Wärme", hex: "#5a3018" },
    { id: "regular-acajou", name: "Acajou", whisper: "Mahagoni", hex: "#3a160c" },
    { id: "regular-oxblood", name: "Oxblood", whisper: "Edler Wein", hex: "#3d1014" },
  ],
  museum: [
    { id: "museum-ebene", name: "Ébène", whisper: "Verbranntes Holz", hex: "#0c0604" },
    { id: "museum-patine", name: "Patine Ancienne", whisper: "Alter Bronzeton", hex: "#2a1408" },
    { id: "museum-rouge", name: "Rouge Antique", whisper: "Vergangenes Rot", hex: "#2a0a0a" },
  ],
};

// ─────────────────────────────────────────────
type Step = "technique" | "color";

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
  const [step, setStep] = useState<Step>(isPatina && !order.patinaTechnique ? "technique" : "color");

  // active palette
  const palette: Tone[] = isPatina && order.patinaTechnique
    ? PATINA_PALETTES[order.patinaTechnique]
    : STANDARD_TONES;

  // chosen tone id (lives on patinaColor for patina, color for standard)
  const activeToneId = isPatina ? order.patinaColor ?? palette[0].id : order.color;
  const activeTone = palette.find((t) => t.id === activeToneId) ?? palette[0];

  // initialize default selection
  useEffect(() => {
    if (isPatina && step === "color" && !order.patinaColor && order.patinaTechnique) {
      onUpdate({ patinaColor: PATINA_PALETTES[order.patinaTechnique][0].id });
    }
  }, [isPatina, step, order.patinaColor, order.patinaTechnique, onUpdate]);

  const isMonk = order.model === "monk";
  // For monk, map standard color id → real render. For patina, fall back to oxblood feel.
  const monkKey = isPatina ? "oxblood" : order.color;
  const baseImg = isMonk
    ? MONK_BY_COLOR[monkKey] ?? monkObsidian
    : order.model && order.model !== "monk"
      ? FALLBACK[order.model as keyof typeof FALLBACK]
      : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  // Tonal wash overlay clipped to the shoe
  const tonalWash = {
    background: `radial-gradient(ellipse at 40% 40%, ${activeTone.hex}cc, ${activeTone.hex}55 60%, transparent 85%)`,
    mixBlendMode: isPatina ? ("multiply" as const) : ("soft-light" as const),
    opacity: isPatina ? 0.85 : 0.55,
  };

  // ───── TECHNIQUE STEP ─────
  if (isPatina && step === "technique") {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 flex flex-col"
      >
        {onBack && <BackButton onClick={onBack} />}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-center pt-20 px-8"
        >
          <p className="text-gold-soft tracking-whisper text-[0.65rem]">— Patina Atelier —</p>
          <h1 className="font-display text-ivory mt-5 text-3xl md:text-4xl italic">
            Die Hand des Patineurs
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Wählen Sie die Technik, mit der das Leder seine Seele erhält.
          </p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl">
            {PATINA_TECHNIQUES.map((t, i) => {
              const selected = order.patinaTechnique === t.id;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.12 }}
                  onClick={() => {
                    onUpdate({
                      patinaTechnique: t.id,
                      patinaColor: PATINA_PALETTES[t.id][0].id,
                    });
                  }}
                  className="group flex flex-col items-center text-center"
                >
                  <motion.div
                    animate={{
                      scale: selected ? 1.04 : 1,
                      boxShadow: selected
                        ? "0 0 50px oklch(0.78 0.09 75 / 0.45), 0 0 0 1px oklch(0.78 0.09 75 / 0.7)"
                        : "0 0 0 1px oklch(0.92 0.01 80 / 0.12)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-32 w-32 md:h-40 md:w-40 rounded-full"
                    style={{ background: t.swatch }}
                  />
                  <p
                    className={`mt-6 font-display italic text-lg transition-colors ${
                      selected ? "text-gold" : "text-ivory group-hover:text-gold-soft"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p className="text-gold-soft tracking-whisper text-[0.55rem] mt-1">
                    {t.whisper}
                  </p>
                  <p className="text-muted-foreground text-xs mt-3 max-w-[14rem] leading-relaxed">
                    {t.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="text-center pb-16">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: order.patinaTechnique ? 1 : 0.3 }}
            transition={{ duration: 0.6 }}
            disabled={!order.patinaTechnique}
            onClick={() => setStep("color")}
            className="text-gold tracking-atelier text-sm hover:text-ivory transition-colors disabled:cursor-not-allowed"
          >
            <span className="border-gold/40 border-b pb-2">Fortfahren</span>
          </motion.button>
        </div>
      </motion.section>
    );
  }

  // ───── COLOR STEP (standard or patina) ─────
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 grid grid-rows-[auto_1fr_auto]"
    >
      {onBack && (
        <BackButton
          onClick={() => {
            if (isPatina) setStep("technique");
            else onBack();
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center pt-14 px-8"
      >
        <p className="text-gold-soft tracking-whisper text-[0.65rem]">
          {isPatina && order.patinaTechnique
            ? `— ${PATINA_TECHNIQUES.find((p) => p.id === order.patinaTechnique)?.name} Patina —`
            : "— Tonalität —"}
        </p>
        <h1 className="font-display text-ivory mt-4 text-3xl italic">
          {isPatina ? "Farbe der Patina" : "Tonalität des Leders"}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-xs tracking-wide">
          {meta.name} · {activeTone.whisper}
        </p>
      </motion.div>

      {/* Stage with shoe */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.09 75 / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-h-[50vh] max-w-[80%]">
          <img
            src={baseImg}
            alt={meta.name}
            className="block max-h-[50vh] max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          />

          <motion.div
            key={activeTone.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: tonalWash.opacity }}
            transition={{ duration: 0.7 }}
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
        </div>
      </div>

      {/* Color swatches */}
      <div className="pb-12 px-8">
        <div className="flex justify-center gap-8 md:gap-14 flex-wrap mb-10">
          {palette.map((tone) => {
            const selected = tone.id === activeToneId;
            return (
              <button
                key={tone.id}
                onClick={() => {
                  if (isPatina) onUpdate({ patinaColor: tone.id });
                  else onUpdate({ color: tone.id as BespokeOrder["color"] });
                }}
                className="group flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{
                    scale: selected ? 1.12 : 1,
                    boxShadow: selected
                      ? "0 0 35px oklch(0.78 0.09 75 / 0.55), 0 0 0 1px oklch(0.78 0.09 75 / 0.75)"
                      : "0 0 0 1px oklch(0.92 0.01 80 / 0.15)",
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full"
                  style={{ background: tone.hex }}
                />
                <span
                  className={`font-display italic text-sm transition-colors ${
                    selected ? "text-gold" : "text-ivory group-hover:text-gold-soft"
                  }`}
                >
                  {tone.name}
                </span>
                <span className="text-gold-soft tracking-whisper text-[0.5rem] -mt-1">
                  {tone.whisper}
                </span>
              </button>
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
