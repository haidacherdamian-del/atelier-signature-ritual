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

      {/* Vignette + bottom darkening for premium contrast behind typography */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, oklch(0.03 0.003 60 / 0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.03 0.003 60 / 0.55) 45%, oklch(0.02 0.002 60 / 0.95) 100%)",
        }}
      />

      {/* Headline & sub */}
      <div className="absolute inset-x-0 bottom-28 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.2, ease: "easeOut" }}
          className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl leading-[1.1] italic font-normal max-w-5xl"
          style={{
            textShadow:
              "0 2px 24px oklch(0.02 0.002 60 / 0.9), 0 1px 2px oklch(0.02 0.002 60 / 0.8)",
            letterSpacing: "0.005em",
          }}
        >
          Jedes Paar beginnt mit Ihrem Maß.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.8, ease: "easeOut" }}
          className="text-gold/90 mt-6 text-[0.7rem] md:text-xs font-medium uppercase"
          style={{
            letterSpacing: "0.42em",
            textShadow: "0 1px 12px oklch(0.02 0.002 60 / 0.9)",
          }}
        >
          Ein Schuh. Gemacht für Sie.
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.6 }}
        onClick={(e) => {
          e.stopPropagation();
          onContinue();
        }}
        className="text-gold absolute bottom-8 hover:text-ivory transition-colors group text-[0.65rem] md:text-xs font-medium uppercase"
        style={{ letterSpacing: "0.5em" }}
      >
        <span className="border-gold/50 border-b pb-1.5 group-hover:border-ivory/70">
          Fortfahren
        </span>
      </motion.button>
    </motion.section>
  );
}
