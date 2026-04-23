import { motion } from "framer-motion";
import { useState } from "react";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.png";
import sneaker from "@/assets/shoe-sneaker.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

export function CinematicReveal({
  order,
  onContinue,
}: {
  order: BespokeOrder;
  onContinue: () => void;
}) {
  // User-controlled rotation via drag
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRot, setStartRot] = useState(0);

  const img = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  const filter = (() => {
    if (order.color === "ivory") return "brightness(1.25) saturate(0.5) sepia(0.15)";
    if (order.color === "obsidian") return "brightness(0.85) saturate(0.6)";
    if (order.color === "cognac") return "brightness(1.05) saturate(1.25) hue-rotate(-8deg) sepia(0.2)";
    if (order.color === "oxblood") return "brightness(0.9) saturate(1.4) hue-rotate(-15deg) sepia(0.3)";
    if (order.color === "olive") return "brightness(0.95) saturate(0.85) hue-rotate(30deg) sepia(0.25)";
    return "";
  })();

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setStartX(e.clientX);
    setStartRot(rotation);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setRotation(startRot + (e.clientX - startX) * 0.4);
  };
  const onPointerUp = () => setDragging(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at center, oklch(0.78 0.09 75 / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="absolute top-20 text-center">
        <p className="text-gold-soft tracking-whisper">Finaler Blick</p>
      </div>

      {/* Two shoes - left and right (slightly different per scan) */}
      <div
        className="relative flex items-center justify-center gap-8 md:gap-16 select-none touch-none"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {[0, 1].map((i) => (
          <motion.img
            key={i}
            src={img}
            alt={meta.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.3 + i * 0.3 }}
            draggable={false}
            className="max-h-[40vh] max-w-[40%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-none"
            style={{
              filter: `${filter} ${order.finish === "polished" ? "contrast(1.15)" : ""}`,
              transform: `${i === 1 ? "scaleX(-1) " : ""}rotateY(${rotation}deg)`,
              transition: dragging ? "none" : "transform 0.6s ease",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute bottom-36 text-center px-8"
      >
        <p className="text-gold-soft tracking-whisper mb-4">
          {COLOR_META[order.color].name} · {order.leather} · {order.finish}
        </p>
        <p className="font-display text-ivory text-6xl md:text-7xl italic">Ein Unikat.</p>
        {order.signature && (
          <p className="font-display text-gold mt-4 text-xl italic opacity-70">
            — graviert «{order.signature}»
          </p>
        )}
        <p className="text-muted-foreground text-[0.55rem] tracking-[0.4em] uppercase mt-6">
          · ziehen zum drehen ·
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        onClick={onContinue}
        className="text-gold absolute bottom-12 tracking-atelier hover:text-ivory transition-colors group"
      >
        <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
          Zur Bestellung
        </span>
      </motion.button>
    </motion.section>
  );
}
