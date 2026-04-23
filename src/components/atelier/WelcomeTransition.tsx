import { motion } from "framer-motion";

export function WelcomeTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Subtle radial atelier glow — no shoe shape revealed yet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.18 0.02 60) 0%, oklch(0.06 0.004 60) 70%)",
        }}
      />
      <div className="absolute inset-0 vignette" />

      {/* Soft drifting light */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, oklch(0.78 0.09 75 / 0.15) 0%, transparent 40%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 0.2, 0.5], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 60%, oklch(0.78 0.09 75 / 0.12) 0%, transparent 45%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 1 }}
        className="relative text-center px-8 max-w-3xl"
      >
        <p className="text-gold-soft tracking-whisper mb-6">Willkommen</p>
        <p className="font-display text-ivory text-4xl md:text-6xl italic leading-tight">
          Jedes Paar beginnt mit Ihrem Maß.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        onClick={onContinue}
        className="text-gold absolute bottom-20 tracking-atelier hover:text-ivory transition-colors group"
      >
        <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">Fortfahren</span>
      </motion.button>
    </motion.section>
  );
}
