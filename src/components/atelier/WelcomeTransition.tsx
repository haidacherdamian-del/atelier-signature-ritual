import { motion } from "framer-motion";
import shoeLast from "@/assets/shoe-last.jpg";

export function WelcomeTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Floating shoe last */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.55, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 3, delay: 0.5 },
          scale: { duration: 3, delay: 0.5 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${shoeLast})` }}
      />

      <div className="absolute inset-0 vignette" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="font-display text-ivory absolute bottom-44 text-center text-3xl italic md:text-5xl px-8"
      >
        Jedes Paar beginnt mit Ihrem Maß.
      </motion.p>

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
