import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.jpg";
import sneaker from "@/assets/shoe-sneaker.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

export function CinematicReveal({
  order,
  onContinue,
}: {
  order: BespokeOrder;
  onContinue: () => void;
}) {
  const [showCta, setShowCta] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 4500);
    return () => clearTimeout(t);
  }, []);

  const img = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  const filter = (() => {
    if (order.color === "ivory") return "brightness(1.4) saturate(0.3) sepia(0.2)";
    if (order.color === "obsidian") return "brightness(0.55) saturate(0.4)";
    if (order.color === "cognac") return "brightness(0.95) saturate(1.3) hue-rotate(-10deg) sepia(0.25)";
    if (order.color === "oxblood") return "brightness(0.7) saturate(1.6) hue-rotate(-20deg) sepia(0.4)";
    if (order.color === "olive") return "brightness(0.8) saturate(0.7) hue-rotate(40deg) sepia(0.3)";
    return "";
  })();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Dramatic spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at center, oklch(0.78 0.09 75 / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Light passing over */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute inset-y-0 w-[40%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.09 75 / 0.15), transparent)",
          filter: "blur(40px)",
        }}
      />

      {/* Two shoes - left and right */}
      <div className="relative flex items-center justify-center gap-8 md:gap-16">
        {[0, 1].map((i) => (
          <motion.img
            key={i}
            src={img}
            alt={meta.name}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 2.5, delay: 0.5 + i * 0.4 },
              scale: { duration: 2.5, delay: 0.5 + i * 0.4 },
              y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
            }}
            className="max-h-[40vh] max-w-[40%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            style={{
              filter: `${filter} ${order.finish === "polished" ? "contrast(1.15)" : ""}`,
              transform: i === 1 ? "scaleX(-1)" : undefined,
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 2 }}
        className="absolute bottom-32 text-center px-8"
      >
        <p className="text-gold-soft tracking-whisper mb-4">{COLOR_META[order.color].name} · {order.leather} · {order.finish}</p>
        <p className="font-display text-ivory text-7xl md:text-8xl italic">One of one.</p>
        {order.signature && (
          <p className="font-display text-gold mt-4 text-xl italic opacity-70">
            — engraved «{order.signature}»
          </p>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showCta ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        onClick={onContinue}
        className="text-gold absolute bottom-12 tracking-atelier hover:text-ivory transition-colors group"
      >
        <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
          Proceed to Concierge
        </span>
      </motion.button>
    </motion.section>
  );
}
