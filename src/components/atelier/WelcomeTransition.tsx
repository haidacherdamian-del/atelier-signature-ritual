import { motion } from "framer-motion";
import welcomeHero from "@/assets/welcome-hero.png";

export function WelcomeTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
      onClick={onContinue}
    >
      {/* Hero photograph */}
      <motion.img
        src={welcomeHero}
        alt=""
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle vignette to deepen the edges and protect the bottom text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.04 0.003 60 / 0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.04 0.003 60 / 0.85) 100%)",
        }}
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        onClick={(e) => {
          e.stopPropagation();
          onContinue();
        }}
        className="text-gold absolute bottom-12 tracking-atelier hover:text-ivory transition-colors group"
      >
        <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">
          Fortfahren
        </span>
      </motion.button>
    </motion.section>
  );
}
