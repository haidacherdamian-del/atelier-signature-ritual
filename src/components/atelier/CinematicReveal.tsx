import { motion } from "framer-motion";
import type { BespokeOrder } from "./types";
import { COLOR_META, MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.png";
import sneaker from "@/assets/shoe-sneaker.png";
import patinaImg from "@/assets/finish-patina.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

const LEATHER_LABEL: Record<BespokeOrder["leather"], string> = {
  calf: "Kalbsleder",
  suede: "Veloursleder",
  exotic: "Exotisches Leder",
};

const FINISH_LABEL: Record<BespokeOrder["finish"], string> = {
  matte: "Matte Veredelung",
  polished: "Standard · Glatt poliert",
  patina: "Patina · Von Hand veredelt",
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
  const baseImg = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;
  // Patina has its own dedicated render for Oxford-class models
  const showPatinaHero =
    order.finish === "patina" && order.model && ["oxford", "derby", "monk"].includes(order.model);
  const heroImg = showPatinaHero ? patinaImg : baseImg;

  const filter = (() => {
    if (showPatinaHero) return "brightness(1.02) contrast(1.05)";
    if (order.color === "ivory") return "brightness(1.25) saturate(0.5) sepia(0.15)";
    if (order.color === "obsidian") return "brightness(0.92) saturate(0.6)";
    if (order.color === "cognac") return "brightness(1.05) saturate(1.25) hue-rotate(-8deg) sepia(0.2)";
    if (order.color === "oxblood") return "brightness(0.9) saturate(1.4) hue-rotate(-15deg) sepia(0.3)";
    if (order.color === "olive") return "brightness(0.95) saturate(0.85) hue-rotate(30deg) sepia(0.25)";
    return "brightness(0.98)";
  })();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.2 }}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at center 40%, oklch(0.78 0.10 75 / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top whisper */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute top-16 md:top-20 text-center"
      >
        <p
          className="text-[0.65rem] tracking-[0.55em]"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DAS UNIKAT
        </p>
      </motion.div>

      {/* Single hero shoe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center w-full max-w-4xl px-8"
        style={{ height: "60vh" }}
      >
        {/* Soft floor reflection */}
        <div
          className="absolute bottom-[-2vh] left-1/2 -translate-x-1/2 h-12 w-[55%] blur-2xl rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.78 0.09 75 / 0.22) 0%, transparent 70%)",
          }}
        />
        <motion.img
          src={heroImg}
          alt={meta.name}
          draggable={false}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="relative max-h-full max-w-full object-contain pointer-events-none"
          style={{
            filter: `${filter} drop-shadow(0 50px 80px rgba(0,0,0,0.85))`,
          }}
        />
      </motion.div>

      {/* Headline + signature whisper */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.4 }}
        className="absolute bottom-32 md:bottom-36 text-center px-8 w-full max-w-3xl"
      >
        <p
          className="font-display italic text-6xl md:text-7xl leading-[0.95]"
          style={{ color: "oklch(0.96 0.015 80)" }}
        >
          Ein Unikat.
        </p>
        <p
          className="font-display italic text-2xl md:text-3xl mt-4"
          style={{ color: "oklch(0.84 0.08 75)" }}
        >
          Für Sie gefertigt.
        </p>

        {order.signature && (
          <p
            className="mt-8 font-display italic text-base md:text-lg"
            style={{ color: "oklch(0.78 0.075 72 / 0.85)" }}
          >
            innen graviert · «{order.signature}»
          </p>
        )}
      </motion.div>

      {/* Material whispers — bottom corners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.8 }}
        className="absolute top-32 md:top-36 left-0 right-0 px-10 md:px-16 hidden md:flex justify-between text-[0.55rem] tracking-[0.45em] uppercase"
        style={{ color: "oklch(0.72 0.02 75 / 0.7)", fontWeight: 300 }}
      >
        <div className="space-y-1 text-left">
          <p>{meta.name}</p>
          <p style={{ color: "oklch(0.78 0.075 72)" }}>
            {LAST_LABEL[order.last as keyof typeof LAST_LABEL]}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p>{LEATHER_LABEL[order.leather]} · {COLOR_META[order.color].name}</p>
          <p style={{ color: "oklch(0.78 0.075 72)" }}>{FINISH_LABEL[order.finish]}</p>
        </div>
      </motion.div>

      {/* Final commitment CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-12 flex flex-col items-center"
      >
        <p
          className="text-[0.55rem] md:text-[0.6rem] tracking-[0.55em] mb-5"
          style={{ color: "oklch(0.72 0.02 75 / 0.75)", fontWeight: 300 }}
        >
          DER MOMENT DER VERPFLICHTUNG
        </p>

        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative px-14 md:px-20 py-5 md:py-6 overflow-hidden"
          style={{
            border: "1px solid oklch(0.78 0.075 72 / 0.5)",
            background:
              "linear-gradient(180deg, oklch(0.16 0.012 60 / 0.55) 0%, oklch(0.10 0.008 55 / 0.7) 100%)",
            boxShadow:
              "0 0 0 1px oklch(0.78 0.075 72 / 0.06) inset, 0 30px 60px -25px oklch(0 0 0 / 0.8)",
          }}
        >
          {/* Soft ambient glow */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.22) 0%, transparent 70%)",
            }}
          />
          {/* Illuminated underline */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-2 h-px transition-all duration-[900ms] ease-out group-hover:w-3/4"
            style={{
              width: "28%",
              background:
                "linear-gradient(90deg, transparent, oklch(0.85 0.10 78 / 0.85), transparent)",
            }}
          />
          <span
            className="relative tracking-[0.55em] text-[0.85rem] md:text-[0.95rem]"
            style={{ color: "oklch(0.92 0.04 80)", fontWeight: 300 }}
          >
            JETZT BESTELLEN
          </span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
