import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.png";
import sneaker from "@/assets/shoe-sneaker.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

type Section = "leather" | "color" | "sole" | "stitching" | "finish";
const SECTIONS: { id: Section; label: string }[] = [
  { id: "leather", label: "Leder" },
  { id: "color", label: "Farbe" },
  { id: "sole", label: "Sohle" },
  { id: "stitching", label: "Naht" },
  { id: "finish", label: "Finish" },
];

export function Customization({
  order,
  onUpdate,
  onContinue,
}: {
  order: BespokeOrder;
  onUpdate: (p: Partial<BespokeOrder>) => void;
  onContinue: () => void;
}) {
  const [section, setSection] = useState<Section>("leather");
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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 grid grid-rows-[auto_1fr_auto]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="text-center pt-12"
      >
        <p className="text-gold-soft tracking-whisper">Konfiguration</p>
        <p className="font-display text-ivory mt-3 text-3xl italic">{meta.name}</p>
      </motion.div>

      {/* Stage with shoe */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.09 75 / 0.1) 0%, transparent 60%)",
          }}
        />
        <motion.img
          key={`${order.color}-${order.finish}`}
          src={img}
          alt={meta.name}
          initial={{ opacity: 0.6, scale: 0.98 }}
          animate={{
            opacity: order.finish === "matte" ? 0.85 : 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1.5 },
            scale: { duration: 1.5 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative max-h-[55vh] max-w-[80%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          style={{
            filter: `${filter} ${order.finish === "polished" ? "contrast(1.15)" : ""} ${
              order.finish === "patina" ? "sepia(0.15)" : ""
            }`,
            transition: "filter 1.2s ease",
          }}
        />

        {/* Subtle stitching indicator */}
        {order.stitching === "contrast" && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold text-[0.55rem] tracking-[0.4em] uppercase opacity-70">
            · Kontrastnaht ·
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="pb-10 px-8">
        {/* Section tabs */}
        <div className="flex justify-center gap-8 mb-8">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`tracking-[0.3em] text-[0.65rem] uppercase pb-2 border-b transition-all ${
                section === s.id
                  ? "text-gold border-gold/60"
                  : "text-muted-foreground border-transparent hover:text-ivory"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Section panels */}
        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-3xl"
            >
              {section === "leather" && (
                <Swatches
                  options={[
                    { id: "calf", label: "Kalbsleder", swatch: "linear-gradient(135deg, #2a1a10, #4a2a18)" },
                    { id: "suede", label: "Veloursleder", swatch: "radial-gradient(circle, #5a4030, #2a1a10)" },
                    { id: "exotic", label: "Exotisch", swatch: "repeating-linear-gradient(45deg, #3a2010, #3a2010 4px, #2a1408 4px, #2a1408 8px)" },
                  ]}
                  active={order.leather}
                  onSelect={(v) => onUpdate({ leather: v as BespokeOrder["leather"] })}
                />
              )}
              {section === "color" && (
                <Swatches
                  options={Object.entries(COLOR_META).map(([id, m]) => ({
                    id,
                    label: m.name,
                    swatch: m.hex,
                  }))}
                  active={order.color}
                  onSelect={(v) => onUpdate({ color: v as BespokeOrder["color"] })}
                />
              )}
              {section === "sole" && (
                <Swatches
                  options={[
                    { id: "leather", label: "Leder", swatch: "#3a2010" },
                    { id: "rubber", label: "Gummi", swatch: "#0c0c0c" },
                    { id: "mixed", label: "Kombiniert", swatch: "linear-gradient(90deg, #3a2010 50%, #0c0c0c 50%)" },
                  ]}
                  active={order.sole}
                  onSelect={(v) => onUpdate({ sole: v as BespokeOrder["sole"] })}
                />
              )}
              {section === "stitching" && (
                <Swatches
                  options={[
                    { id: "tone", label: "Ton-in-Ton", swatch: "linear-gradient(135deg, #2a1a10, #2a1a10)" },
                    { id: "contrast", label: "Kontrast", swatch: "linear-gradient(135deg, #2a1a10, #d4a35a)" },
                  ]}
                  active={order.stitching}
                  onSelect={(v) => onUpdate({ stitching: v as BespokeOrder["stitching"] })}
                />
              )}
              {section === "finish" && (
                <Swatches
                  options={[
                    { id: "matte", label: "Matt", swatch: "radial-gradient(circle, #2a1a10, #1a0f08)" },
                    { id: "polished", label: "Poliert", swatch: "radial-gradient(circle at 30% 30%, #6a4a30, #1a0f08)" },
                    { id: "patina", label: "Patina", swatch: "radial-gradient(ellipse at 40% 40%, #8a5a30, #2a1a10 70%)" },
                  ]}
                  active={order.finish}
                  onSelect={(v) => onUpdate({ finish: v as BespokeOrder["finish"] })}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onContinue}
            className="text-gold tracking-atelier hover:text-ivory transition-colors group"
          >
            <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
              Weiter
            </span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function Swatches({
  options,
  active,
  onSelect,
}: {
  options: { id: string; label: string; swatch: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
      {options.map((opt) => {
        const selected = opt.id === active;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="group flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{
                scale: selected ? 1.08 : 1,
                boxShadow: selected
                  ? "0 0 30px oklch(0.78 0.09 75 / 0.4), 0 0 0 1px oklch(0.78 0.09 75 / 0.6)"
                  : "0 0 0 1px oklch(0.92 0.01 80 / 0.15)",
              }}
              transition={{ duration: 0.6 }}
              className="h-14 w-14 md:h-16 md:w-16 rounded-full"
              style={{ background: opt.swatch }}
            />
            <span
              className={`tracking-[0.3em] text-[0.6rem] uppercase transition-colors ${
                selected ? "text-gold" : "text-muted-foreground group-hover:text-ivory"
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
