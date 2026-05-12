import { motion } from "framer-motion";
import { useState } from "react";
import { BackButton } from "./BackButton";
import standardImg from "@/assets/finish-standard.png";
import patinaImg from "@/assets/finish-patina.png";

export type FinishChoice = "standard" | "patina";

const OPTIONS: {
  id: FinishChoice;
  name: string;
  whisper: string;
  description: string;
  image: string;
}[] = [
  {
    id: "standard",
    name: "Standard",
    whisper: "Glatt · Reines Kalbsleder",
    description: "Zeitlose Klarheit und elegante Zurückhaltung.",
    image: standardImg,
  },
  {
    id: "patina",
    name: "Patina",
    whisper: "Von Hand veredelt · Florenz",
    description: "Von Hand veredelte Tiefe mit einzigartigem Charakter.",
    image: patinaImg,
  },
];

export function FinishSelection({
  onSelect,
  onBack,
}: {
  onSelect: (finish: FinishChoice) => void;
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState<FinishChoice | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="absolute inset-0 flex flex-col items-center justify-start pt-20 md:pt-24 pb-28 overflow-y-auto"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="relative text-center px-8 mb-10 md:mb-14"
      >
        <p
          className="text-[0.65rem] md:text-[0.7rem] tracking-[0.5em]"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DIE VEREDELUNG
        </p>
        <p
          className="font-display italic text-3xl md:text-4xl mt-5"
          style={{ color: "oklch(0.94 0.015 80)" }}
        >
          Wählen Sie das Finish.
        </p>
        <p
          className="mt-4 text-xs md:text-sm tracking-[0.18em] max-w-xl mx-auto"
          style={{ color: "oklch(0.72 0.02 75 / 0.85)", fontWeight: 300 }}
        >
          Zwei Wege, dem Leder Charakter zu verleihen.
        </p>
      </motion.div>

      {/* Two finishes */}
      <div className="relative w-full max-w-6xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.id;
          const isDimmed = selected !== null && !isSelected;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isDimmed ? 0.35 : 1,
                y: 0,
              }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(opt.id)}
              className="group relative flex flex-col items-center text-center focus:outline-none"
            >
              {/* Halo */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                animate={{
                  opacity: isSelected ? 0.55 : 0,
                  scale: isSelected ? 1.05 : 0.9,
                }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.35) 0%, transparent 65%)",
                }}
              />

              <div className="relative h-[34vh] md:h-[38vh] w-full flex items-center justify-center">
                <motion.img
                  src={opt.image}
                  alt={opt.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  animate={{
                    y: [0, -6, 0],
                    scale: isSelected ? 1.04 : 1,
                  }}
                  transition={{
                    y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="max-h-full max-w-full object-contain transition-[filter] duration-[1200ms]"
                  style={{
                    filter: isSelected
                      ? "brightness(1.08) contrast(1.05)"
                      : "brightness(0.92) contrast(1.02)",
                  }}
                />
              </div>

              <div className="mt-6 md:mt-8 space-y-3">
                <p
                  className="text-[0.6rem] tracking-[0.5em]"
                  style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
                >
                  {opt.whisper}
                </p>
                <p
                  className="font-display italic text-4xl md:text-5xl"
                  style={{ color: "oklch(0.95 0.015 80)" }}
                >
                  {opt.name}
                </p>
                <p
                  className="text-xs md:text-sm tracking-[0.14em] max-w-sm mx-auto leading-relaxed"
                  style={{ color: "oklch(0.74 0.02 75 / 0.9)", fontWeight: 300 }}
                >
                  {opt.description}
                </p>

                {/* selection hairline */}
                <div className="pt-4 flex justify-center">
                  <motion.div
                    className="h-px"
                    animate={{
                      width: isSelected ? 64 : 18,
                      backgroundColor: isSelected
                        ? "oklch(0.85 0.10 78)"
                        : "oklch(0.78 0.075 72 / 0.35)",
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-14 md:bottom-16"
        style={{ pointerEvents: selected ? "auto" : "none" }}
      >
        <button
          onClick={() => selected && onSelect(selected)}
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
