import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackButton } from "./BackButton";
import { MODEL_META, type ShoeModel } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.png";
import sneaker from "@/assets/shoe-sneaker.png";

const MODELS: { id: ShoeModel; img: string }[] = [
  { id: "oxford", img: oxford },
  { id: "derby", img: derby },
  { id: "loafer", img: loafer },
  { id: "monk", img: monk },
  { id: "sneaker", img: sneaker },
];

export function ModelSelection({ onSelect }: { onSelect: (m: ShoeModel) => void }) {
  const [index, setIndex] = useState(0);
  const current = MODELS[index];
  const meta = MODEL_META[current.id];

  const next = () => setIndex((i) => (i + 1) % MODELS.length);
  const prev = () => setIndex((i) => (i - 1 + MODELS.length) % MODELS.length);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 vignette" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="absolute top-20 text-center"
      >
        <p className="text-gold-soft tracking-whisper">Modellauswahl</p>
      </motion.div>

      {/* Stage */}
      <div className="relative flex items-center justify-center w-full max-w-5xl px-12">
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-gold-soft hover:text-gold transition-colors text-3xl font-thin absolute left-4 z-10"
        >
          ←
        </button>

        <div className="relative h-[55vh] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full flex items-center justify-center"
            >
              {/* Spotlight halo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.78 0.09 75 / 0.12) 0%, transparent 55%)",
                }}
              />
              <motion.img
                src={current.img}
                alt={meta.name}
                animate={{ y: [0, -8, 0], rotateZ: [-1, 1, -1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative max-h-full max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                style={{ filter: "brightness(0.95) contrast(1.05)" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="text-gold-soft hover:text-gold transition-colors text-3xl font-thin absolute right-4 z-10"
        >
          →
        </button>
      </div>

      {/* Caption */}
      <div className="absolute bottom-24 text-center w-full px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-display text-ivory text-5xl md:text-6xl italic">{meta.name}</p>
            <p className="text-gold-soft mt-3 tracking-[0.3em] text-xs uppercase">{meta.tagline}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-3">
          {MODELS.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              aria-label={MODEL_META[m.id].name}
              className="h-px transition-all"
              style={{
                width: i === index ? "48px" : "20px",
                backgroundColor:
                  i === index ? "oklch(0.78 0.09 75)" : "oklch(0.92 0.01 80 / 0.2)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => onSelect(current.id)}
          className="text-gold mt-12 tracking-atelier hover:text-ivory transition-colors group"
        >
          <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
            Dieses Modell konfigurieren
          </span>
        </button>
      </div>
    </motion.section>
  );
}
