import { motion } from "framer-motion";
import { useEffect } from "react";
import { BackButton } from "./BackButton";

export function SneakerSilhouetteNotice({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack?: () => void;
}) {
  // Auto-advance after a contemplative pause
  useEffect(() => {
    const t = setTimeout(onContinue, 5200);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at center, oklch(0.78 0.10 75 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="text-[0.65rem] tracking-[0.55em] mb-10"
        style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
      >
        DIE SILHOUETTE
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display italic text-3xl md:text-5xl text-center max-w-3xl leading-[1.15]"
        style={{ color: "oklch(0.95 0.015 80)" }}
      >
        Für dieses Modell wurde bewusst eine
        <br className="hidden md:block" /> einzige, perfekt ausbalancierte
        Silhouette definiert.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.6, delay: 1.6 }}
        className="h-px w-24 mt-12"
        style={{ backgroundColor: "oklch(0.78 0.075 72 / 0.55)" }}
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.4 }}
        onClick={onContinue}
        className="absolute bottom-12 tracking-[0.5em] text-[0.7rem]"
        style={{ color: "oklch(0.88 0.10 78)", fontWeight: 300 }}
      >
        <span
          className="border-b pb-2"
          style={{ borderColor: "oklch(0.78 0.075 72 / 0.45)" }}
        >
          FORTFAHREN
        </span>
      </motion.button>
    </motion.section>
  );
}
