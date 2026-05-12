import { motion } from "framer-motion";
import { useState } from "react";
import type { LastShape } from "./types";
import lastClassic from "@/assets/last-classic.png";
import lastSoft from "@/assets/last-soft.png";

type Choice = "almond" | "round";

const OPTIONS: {
  id: Choice;
  label: string;
  description: string;
  image: string;
  last: LastShape;
}[] = [
  {
    id: "almond",
    label: "KLASSISCH ELEGANT",
    description: "Leicht verlängert. Zeitlos elegant.",
    image: lastClassic,
    last: "almond",
  },
  {
    id: "round",
    label: "SOFT ROUND",
    description: "Weicher. Moderner. Vielseitig.",
    image: lastSoft,
    last: "round",
  },
];

export function LastSelection({
  onSelect,
  onBack,
}: {
  onSelect: (last: LastShape) => void;
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState<Choice | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      style={{ background: "#0a0a0b" }}
    >
      {/* Cinematic ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 45%, rgba(180,140,80,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute top-[8vh] text-center"
      >
        <p
          className="text-[0.65rem] md:text-[0.7rem] tracking-[0.6em]"
          style={{ color: "rgba(190,160,110,0.7)" }}
        >
          PRÄZISION
        </p>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="font-display italic text-3xl md:text-5xl lg:text-6xl text-center mb-[7vh] md:mb-[9vh]"
        style={{
          color: "#e9e2d3",
          letterSpacing: "0.01em",
          fontWeight: 300,
          textShadow: "0 2px 30px rgba(0,0,0,0.6)",
        }}
      >
        Ihre Form. Präzise verstanden.
      </motion.h1>

      {/* Two lasts */}
      <div className="flex items-center justify-center gap-12 md:gap-28 lg:gap-40 w-full max-w-6xl">
        {OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.8 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(opt.id)}
              className="group relative flex flex-col items-center"
            >
              {/* Spotlight halo */}
              <motion.div
                className="absolute -inset-10 -z-10 rounded-full pointer-events-none"
                animate={{
                  opacity: isSelected ? 1 : 0.4,
                }}
                transition={{ duration: 1 }}
                style={{
                  background:
                    "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(200,165,110,0.10) 0%, transparent 70%)",
                }}
              />

              <motion.div
                animate={{
                  y: isSelected ? -6 : 0,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.img
                  src={opt.image}
                  alt={opt.label}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                  className="h-[42vh] md:h-[52vh] w-auto object-contain select-none"
                  style={{
                    filter: isSelected
                      ? "drop-shadow(0 40px 60px rgba(0,0,0,0.85)) brightness(1.05)"
                      : "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) brightness(0.9)",
                    transition: "filter 1s ease",
                  }}
                  draggable={false}
                />
              </motion.div>

              {/* Label */}
              <div className="mt-10 text-center">
                <p
                  className="text-[0.7rem] md:text-[0.75rem] tracking-[0.5em]"
                  style={{
                    color: isSelected ? "#d4b483" : "rgba(220,210,190,0.55)",
                    transition: "color 0.6s",
                  }}
                >
                  {opt.label}
                </p>
                <p
                  className="font-display italic mt-3 text-sm md:text-base"
                  style={{
                    color: isSelected
                      ? "rgba(233,226,211,0.95)"
                      : "rgba(180,170,150,0.5)",
                    transition: "color 0.6s",
                    fontWeight: 300,
                  }}
                >
                  {opt.description}
                </p>

                {/* Selection indicator */}
                <motion.div
                  className="mx-auto mt-5 h-px"
                  animate={{
                    width: isSelected ? 56 : 14,
                    backgroundColor: isSelected
                      ? "rgba(212,180,131,0.85)"
                      : "rgba(160,140,110,0.25)",
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-[7vh]"
      >
        <button
          disabled={!selected}
          onClick={() => {
            const opt = OPTIONS.find((o) => o.id === selected);
            if (opt) onSelect(opt.last);
          }}
          className="group relative px-12 py-4"
          style={{
            cursor: selected ? "pointer" : "default",
          }}
        >
          <span
            className="relative text-[0.7rem] md:text-[0.75rem] tracking-[0.55em] transition-colors"
            style={{ color: "#d4b483" }}
          >
            MODELL AUSWÄHLEN
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2 bottom-2 h-px transition-all duration-700 group-hover:w-24"
            style={{
              width: "3rem",
              background:
                "linear-gradient(90deg, transparent, rgba(212,180,131,0.7), transparent)",
            }}
          />
        </button>
      </motion.div>
    </motion.section>
  );
}
