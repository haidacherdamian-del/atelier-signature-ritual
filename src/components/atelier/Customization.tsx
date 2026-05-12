import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackButton } from "./BackButton";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";

// Default fallbacks (other models)
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import sneaker from "@/assets/shoe-sneaker.png";

// Real per-color renders for Monk Strap (identical camera/light)
import monkObsidian from "@/assets/monk-obsidian.png";
import monkCognac from "@/assets/monk-cognac.png";
import monkOxblood from "@/assets/monk-oxblood.png";
import monkIvory from "@/assets/monk-ivory.png";
import monkOlive from "@/assets/monk-olive.png";

const MONK_BY_COLOR: Record<BespokeOrder["color"], string> = {
  obsidian: monkObsidian,
  cognac: monkCognac,
  oxblood: monkOxblood,
  ivory: monkIvory,
  olive: monkOlive,
};

const FALLBACK = { oxford, derby, loafer, sneaker } as const;

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
  onBack,
}: {
  order: BespokeOrder;
  onUpdate: (p: Partial<BespokeOrder>) => void;
  onContinue: () => void;
  onBack?: () => void;
}) {
  const [section, setSection] = useState<Section>("leather");

  const isMonk = order.model === "monk";
  const baseImg = isMonk
    ? MONK_BY_COLOR[order.color]
    : order.model && order.model !== "monk"
      ? FALLBACK[order.model as keyof typeof FALLBACK]
      : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.monk;

  // Finish: real visual modulation on the base render
  const finishStyle = (() => {
    switch (order.finish) {
      case "matte":
        return {
          filter: "contrast(0.95) saturate(0.88) brightness(0.96)",
        };
      case "polished":
        return {
          filter: "contrast(1.18) saturate(1.08) brightness(1.04)",
        };
      case "patina":
        return {
          filter: "contrast(1.08) saturate(1.15) brightness(1.0) sepia(0.12)",
        };
    }
  })();

  // Leather material overlay (only used for non-calf — calf is the native render)
  const leatherOverlay = (() => {
    if (order.leather === "suede") {
      // soft, diffuse, matte velvet feel
      return {
        background:
          "radial-gradient(ellipse at 35% 40%, rgba(255,255,255,0.05), transparent 65%), repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
        mixBlendMode: "overlay" as const,
        opacity: 0.85,
      };
    }
    if (order.leather === "exotic") {
      // crocodile-like scale pattern
      return {
        background:
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0 6px, rgba(255,255,255,0.06) 6px 9px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0 6px, rgba(255,255,255,0.05) 6px 9px)",
        mixBlendMode: "overlay" as const,
        opacity: 0.55,
      };
    }
    return null;
  })();

  // Polished highlight overlay
  const polishedOverlay =
    order.finish === "polished"
      ? {
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,240,210,0.18) 45%, transparent 55%)",
          mixBlendMode: "screen" as const,
          opacity: 0.8,
        }
      : null;

  // Patina warm uneven overlay
  const patinaOverlay =
    order.finish === "patina"
      ? {
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(120,60,20,0.35), transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(60,30,10,0.25), transparent 50%)",
          mixBlendMode: "multiply" as const,
          opacity: 0.7,
        }
      : null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 grid grid-rows-[auto_1fr_auto]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center pt-12"
      >
        <p className="text-gold-soft tracking-whisper">Konfiguration</p>
        <p className="font-display text-ivory mt-3 text-3xl italic">{meta.name}</p>
      </motion.div>

      {/* Stage with shoe — layered render */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.78 0.09 75 / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-h-[55vh] max-w-[80%]">
          <AnimatePresence mode="sync">
            <motion.img
              key={`${order.model}-${order.color}`}
              src={baseImg}
              alt={meta.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
              style={finishStyle}
            />
          </AnimatePresence>

          {/* Sizing image (invisible, defines container size) */}
          <img
            src={baseImg}
            alt=""
            aria-hidden
            className="block max-h-[55vh] max-w-full object-contain opacity-0 pointer-events-none"
          />

          {/* Material overlay — clipped to shoe via mask using the image itself */}
          {leatherOverlay && (
            <motion.div
              key={`leather-${order.leather}-${order.color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: leatherOverlay.opacity }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: leatherOverlay.background,
                mixBlendMode: leatherOverlay.mixBlendMode,
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
          )}

          {/* Polished sheen */}
          {polishedOverlay && (
            <motion.div
              key="polished"
              initial={{ opacity: 0 }}
              animate={{ opacity: polishedOverlay.opacity }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: polishedOverlay.background,
                mixBlendMode: polishedOverlay.mixBlendMode,
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
          )}

          {/* Patina */}
          {patinaOverlay && (
            <motion.div
              key="patina"
              initial={{ opacity: 0 }}
              animate={{ opacity: patinaOverlay.opacity }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: patinaOverlay.background,
                mixBlendMode: patinaOverlay.mixBlendMode,
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
          )}

          {/* Sole tint overlay — bottom band */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                order.sole === "rubber"
                  ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 6%, transparent 12%)"
                  : order.sole === "mixed"
                    ? "linear-gradient(to top, rgba(20,10,5,0.45) 0%, rgba(60,32,16,0.3) 6%, transparent 12%)"
                    : "transparent",
              WebkitMaskImage: `url(${baseImg})`,
              maskImage: `url(${baseImg})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transition: "background 0.4s ease",
            }}
          />
        </div>

        {order.stitching === "contrast" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold text-[0.55rem] tracking-[0.4em] uppercase"
          >
            · Kontrastnaht ·
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="pb-10 px-8">
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

        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
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

        <div className="text-center mt-6 flex items-center justify-center gap-10">
          {onBack && (
            <button
              onClick={onBack}
              className="text-muted-foreground tracking-atelier hover:text-ivory transition-colors group"
            >
              <span className="border-transparent border-b pb-2 group-hover:border-ivory/40">
                ← Modelle
              </span>
            </button>
          )}
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
                  ? "0 0 30px oklch(0.78 0.09 75 / 0.5), 0 0 0 1px oklch(0.78 0.09 75 / 0.7)"
                  : "0 0 0 1px oklch(0.92 0.01 80 / 0.15)",
              }}
              transition={{ duration: 0.4 }}
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
