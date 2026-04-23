import { motion } from "framer-motion";
import { useEffect } from "react";
import shoeLast from "@/assets/shoe-last.jpg";

export function WelcomeTransition({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 6000);
    return () => clearTimeout(t);
  }, [onContinue]);

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
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 0.9, scale: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 3, delay: 0.5 },
          scale: { duration: 3, delay: 0.5 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${shoeLast})` }}
      />

      <div className="absolute inset-0 vignette" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 5, delay: 1, times: [0, 0.2, 0.85, 1] }}
        className="font-display text-ivory absolute bottom-32 text-center text-3xl italic md:text-4xl px-8"
      >
        Every pair begins with understanding your form.
      </motion.p>
    </motion.section>
  );
}
