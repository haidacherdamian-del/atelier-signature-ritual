import { motion } from "framer-motion";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford-side.png";
import derby from "@/assets/shoe-derby-side.png";
import loafer from "@/assets/shoe-loafer-side.png";
import monk from "@/assets/shoe-monk-side.png";
import sneaker from "@/assets/shoe-sneaker-side.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

const LEATHER_LABEL: Record<BespokeOrder["leather"], string> = {
  calf: "Kalbsleder",
  suede: "Veloursleder",
  exotic: "Exotisches Leder",
};

const FINISH_LABEL: Record<BespokeOrder["finish"], string> = {
  matte: "Matte Veredelung",
  polished: "Glatt poliert",
  patina: "Patina · Handveredelt",
};

const LAST_LABEL = {
  round: "Soft Round",
  almond: "Klassisch Elegant",
  square: "Architektonisch",
} as const;

export function CinematicReveal({
  order,
  onContinue,
}: {
  order: BespokeOrder;
  onContinue: () => void;
}) {
  const heroImg = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;

  const filter = (() => {
    if (order.color === "ivory") return "brightness(1.15) saturate(0.55) sepia(0.12)";
    if (order.color === "obsidian") return "brightness(0.92) saturate(0.6)";
    if (order.color === "cognac") return "brightness(1.05) saturate(1.2) hue-rotate(-6deg) sepia(0.18)";
    if (order.color === "oxblood") return "brightness(0.92) saturate(1.35) hue-rotate(-12deg) sepia(0.25)";
    if (order.color === "olive") return "brightness(0.95) saturate(0.85) hue-rotate(28deg) sepia(0.22)";
    return "brightness(0.98)";
  })();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.2 }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Cinematic spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at center 50%, oklch(0.78 0.10 75 / 0.14) 0%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Side metadata — atmospheric, low intensity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 hidden md:block text-[0.55rem] tracking-[0.5em] uppercase space-y-3 text-left"
        style={{ color: "oklch(0.72 0.02 75 / 0.45)", fontWeight: 300 }}
      >
        <div>
          <p className="opacity-60">Modell</p>
          <p className="mt-1.5" style={{ color: "oklch(0.78 0.075 72 / 0.7)" }}>{meta.name}</p>
        </div>
        <div className="pt-2">
          <p className="opacity-60">Leisten</p>
          <p className="mt-1.5" style={{ color: "oklch(0.78 0.075 72 / 0.7)" }}>
            {LAST_LABEL[order.last as keyof typeof LAST_LABEL]}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10 hidden md:block text-[0.55rem] tracking-[0.5em] uppercase space-y-3 text-right"
        style={{ color: "oklch(0.72 0.02 75 / 0.45)", fontWeight: 300 }}
      >
        <div>
          <p className="opacity-60">Leder</p>
          <p className="mt-1.5" style={{ color: "oklch(0.78 0.075 72 / 0.7)" }}>
            {LEATHER_LABEL[order.leather]} · {COLOR_META[order.color]?.name ?? order.color}
          </p>
        </div>
        <div className="pt-2">
          <p className="opacity-60">Veredelung</p>
          <p className="mt-1.5" style={{ color: "oklch(0.78 0.075 72 / 0.7)" }}>
            {FINISH_LABEL[order.finish]}
          </p>
        </div>
      </motion.div>

      {/* Vertical composition — generous rhythm */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-between px-8 py-12 md:py-16">
        {/* Top atelier label */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="text-[0.6rem] md:text-[0.65rem] tracking-[0.6em]"
          style={{ color: "oklch(0.78 0.075 72 / 0.85)", fontWeight: 300 }}
        >
          DAS UNIKAT
        </motion.p>

        {/* Centerpiece — side-profile shoe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center w-full max-w-3xl"
          style={{ height: "34vh" }}
        >
          {/* Floor reflection */}
          <div
            className="absolute bottom-[-1.5vh] left-1/2 -translate-x-1/2 h-10 w-[55%] blur-2xl rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.78 0.09 75 / 0.18) 0%, transparent 70%)",
            }}
          />
          <motion.img
            src={heroImg}
            alt={meta.name}
            draggable={false}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative max-h-full max-w-full object-contain pointer-events-none"
            style={{
              filter: `${filter} drop-shadow(0 40px 70px rgba(0,0,0,0.85))`,
            }}
          />
        </motion.div>

        {/* Editorial typography stack */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="text-center max-w-2xl"
        >
          <p
            className="font-display italic leading-[0.95] text-5xl md:text-7xl"
            style={{ color: "oklch(0.96 0.015 80)" }}
          >
            Ein Unikat.
          </p>
          <p
            className="font-display italic mt-5 md:mt-6 text-xl md:text-2xl"
            style={{ color: "oklch(0.84 0.08 75)" }}
          >
            Für Sie gefertigt.
          </p>

          {order.signature && (
            <p
              className="font-display italic mt-7 md:mt-8 text-sm md:text-base tracking-wide"
              style={{ color: "oklch(0.78 0.075 72 / 0.7)" }}
            >
              innen graviert · «{order.signature}»
            </p>
          )}
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p
            className="text-[0.55rem] md:text-[0.6rem] tracking-[0.55em] mb-7 md:mb-9"
            style={{ color: "oklch(0.72 0.02 75 / 0.65)", fontWeight: 300 }}
          >
            DER MOMENT DER VERPFLICHTUNG
          </p>

          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.012 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative px-20 md:px-28 py-5 md:py-6 overflow-hidden"
            style={{
              border: "1px solid oklch(0.78 0.075 72 / 0.5)",
              background:
                "linear-gradient(180deg, oklch(0.16 0.012 60 / 0.55) 0%, oklch(0.10 0.008 55 / 0.7) 100%)",
              boxShadow:
                "0 0 0 1px oklch(0.78 0.075 72 / 0.06) inset, 0 30px 60px -25px oklch(0 0 0 / 0.8)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.22) 0%, transparent 70%)",
              }}
            />
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-2 h-px transition-all duration-[900ms] ease-out group-hover:w-3/4"
              style={{
                width: "26%",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.85 0.10 78 / 0.85), transparent)",
              }}
            />
            <span
              className="relative tracking-[0.6em] text-[0.85rem] md:text-[0.95rem]"
              style={{ color: "oklch(0.92 0.04 80)", fontWeight: 300 }}
            >
              JETZT BESTELLEN
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
