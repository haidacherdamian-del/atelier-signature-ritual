import { motion } from "framer-motion";
import { BackButton } from "./BackButton";

export function OxfordFinishNotice({
  onContinue,
  onBack,
}: {
  onContinue: () => void;
  onBack?: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* warm glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2.4 }}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-[0.65rem] md:text-[0.7rem] tracking-[0.5em]"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DIE VEREDELUNG
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="font-display italic text-4xl md:text-5xl mt-6 leading-[1.15]"
          style={{ color: "oklch(0.95 0.015 80)" }}
        >
          Die Vollendung des Leders
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="font-display italic text-base md:text-lg mt-5"
          style={{ color: "oklch(0.85 0.04 78 / 0.9)", fontWeight: 300 }}
        >
          Der Oxford entfaltet seine Eleganz in ihrer reinsten Form.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.85 }}
          className="mx-auto mt-10 h-px w-24 origin-center"
          style={{ background: "oklch(0.78 0.075 72 / 0.45)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.0 }}
          className="mt-10 text-sm md:text-base leading-[1.9] max-w-xl mx-auto tracking-[0.04em]"
          style={{ color: "oklch(0.78 0.02 75 / 0.92)", fontWeight: 300 }}
        >
          Für den Oxford wählen wir bewusst ausschließlich das klassische
          Standard-Finish. Die klare Oberfläche bewahrt die Ruhe des Leders,
          seine Tiefe und die zeitlose Eleganz traditioneller Schuhmacherkunst.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.3 }}
          className="mt-12 text-[0.65rem] md:text-[0.7rem] tracking-[0.42em]"
          style={{ color: "oklch(0.74 0.05 72 / 0.75)", fontWeight: 300 }}
        >
          REINES KALBSLEDER · ZEITLOSE VEREDELUNG · OHNE KÜNSTLICHE PATINA
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="absolute bottom-14 md:bottom-16"
      >
        <button
          onClick={onContinue}
          className="group tracking-[0.5em] text-[0.7rem]"
          style={{ color: "oklch(0.88 0.10 78)", fontWeight: 300 }}
        >
          <span
            className="border-b pb-2"
            style={{ borderColor: "oklch(0.78 0.075 72 / 0.45)" }}
          >
            FORTFAHREN
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
