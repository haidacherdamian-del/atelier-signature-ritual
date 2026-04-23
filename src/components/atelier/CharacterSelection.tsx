import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { BespokeOrder, LastShape } from "./types";
import { LAST_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.png";
import sneaker from "@/assets/shoe-sneaker.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

const LASTS: LastShape[] = ["round", "almond", "square"];

// Subtle CSS transforms emulate sculptural variations of the same shoe
const LAST_TRANSFORM: Record<LastShape, string> = {
  round: "scaleX(0.96) scaleY(1.02)",
  almond: "scaleX(1.05) scaleY(0.97)",
  square: "scaleX(1.02) scaleY(1) skewX(-1deg)",
};

type Phase = "silhouette" | "choose";

export function CharacterSelection({
  order,
  onUpdate,
  onContinue,
}: {
  order: BespokeOrder;
  onUpdate: (p: Partial<BespokeOrder>) => void;
  onContinue: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("silhouette");
  const img = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  const colorFilter = (() => {
    if (order.color === "ivory") return "brightness(1.25) saturate(0.5) sepia(0.15)";
    if (order.color === "obsidian") return "brightness(0.85) saturate(0.6)";
    if (order.color === "cognac") return "brightness(1.05) saturate(1.25) hue-rotate(-8deg) sepia(0.2)";
    if (order.color === "oxblood") return "brightness(0.9) saturate(1.4) hue-rotate(-15deg) sepia(0.3)";
    if (order.color === "olive") return "brightness(0.95) saturate(0.85) hue-rotate(30deg) sepia(0.25)";
    return "";
  })();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
    >
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at center, oklch(0.78 0.09 75 / 0.12) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 text-center"
      >
        <p className="text-gold-soft tracking-whisper">Charakter</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === "silhouette" ? (
          <motion.div
            key="silhouette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="flex flex-col items-center"
          >
            {/* Shoe softly dims to suggest silhouette, but remains visible */}
            <motion.img
              src={img}
              alt={meta.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="max-h-[45vh] max-w-[70%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
              style={{ filter: colorFilter }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="font-display text-ivory text-3xl md:text-5xl italic mt-12 text-center"
            >
              Nun verfeinern wir seinen Charakter.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
              onClick={() => setPhase("choose")}
              className="text-gold mt-12 tracking-atelier hover:text-ivory transition-colors group"
            >
              <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
                Form wählen
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="choose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center w-full"
          >
            {/* Three sculptural silhouettes */}
            <div className="flex items-end justify-center gap-8 md:gap-16 w-full max-w-5xl">
              {LASTS.map((shape) => {
                const selected = order.last === shape;
                return (
                  <button
                    key={shape}
                    onClick={() => onUpdate({ last: shape })}
                    className="group flex flex-col items-center"
                  >
                    <motion.div
                      animate={{
                        scale: selected ? 1 : 0.85,
                        opacity: selected ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                    >
                      <img
                        src={img}
                        alt={LAST_META[shape].name}
                        className="max-h-[28vh] md:max-h-[32vh] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
                        style={{
                          filter: `${colorFilter} ${
                            selected ? "" : "brightness(0.3) contrast(1.3)"
                          }`,
                          transform: LAST_TRANSFORM[shape],
                          transition: "filter 1s ease, transform 1s ease",
                        }}
                      />
                      {selected && (
                        <motion.div
                          layoutId="last-glow"
                          className="absolute -inset-8 -z-10"
                          style={{
                            background:
                              "radial-gradient(ellipse, oklch(0.78 0.09 75 / 0.18) 0%, transparent 70%)",
                          }}
                        />
                      )}
                    </motion.div>

                    <div className="mt-6 text-center">
                      <p
                        className={`font-display italic text-xl md:text-2xl transition-colors ${
                          selected ? "text-ivory" : "text-muted-foreground"
                        }`}
                      >
                        {LAST_META[shape].name}
                      </p>
                      <p
                        className={`tracking-[0.3em] text-[0.55rem] uppercase mt-2 transition-colors ${
                          selected ? "text-gold" : "text-muted-foreground/60"
                        }`}
                      >
                        {LAST_META[shape].tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              onClick={onContinue}
              className="text-gold mt-16 tracking-atelier hover:text-ivory transition-colors group"
            >
              <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
                Weiter
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
