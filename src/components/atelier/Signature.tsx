import { motion } from "framer-motion";
import { BackButton } from "./BackButton";

export function Signature({
  value,
  onChange,
  onContinue,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onContinue: () => void;
  onBack?: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at center, oklch(0.78 0.10 75 / 0.10) 0%, transparent 70%)",
        }}
      />

      {/* Header — intimate, emotional */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="text-center mb-14 max-w-2xl"
      >
        <p
          className="text-[0.65rem] tracking-[0.5em] mb-6"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DER LETZTE PERSÖNLICHE STRICH
        </p>
        <p
          className="font-display italic text-4xl md:text-6xl leading-[1.05]"
          style={{ color: "oklch(0.95 0.015 80)" }}
        >
          Ihre Signatur.
        </p>
        <p
          className="mt-6 text-sm md:text-base tracking-[0.14em] leading-relaxed max-w-md mx-auto"
          style={{ color: "oklch(0.74 0.02 75 / 0.85)", fontWeight: 300 }}
        >
          Im Inneren des Schuhs — diskret, von Hand graviert. Nur für Sie sichtbar.
        </p>
      </motion.div>

      {/* Engraved lining preview — warmer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl"
      >
        <div
          className="relative rounded-sm overflow-hidden p-14 md:p-16"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.28 0.04 55) 0%, oklch(0.12 0.02 50) 80%)",
            boxShadow:
              "inset 0 0 100px rgba(0,0,0,0.65), 0 40px 100px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative text-center">
            <p
              className="text-[0.55rem] tracking-[0.5em] uppercase mb-8"
              style={{ color: "oklch(0.80 0.08 75)", fontWeight: 300 }}
            >
              — Innen, von Hand graviert —
            </p>
            <p
              className="font-display italic text-5xl md:text-7xl"
              style={{
                color: "oklch(0.84 0.10 78)",
                textShadow:
                  "0 1px 0 rgba(0,0,0,0.55), 0 0 28px oklch(0.78 0.10 75 / 0.35)",
                letterSpacing: "0.04em",
                minHeight: "1.2em",
              }}
            >
              {value || (
                <span style={{ opacity: 0.28 }}>Ihr Name</span>
              )}
            </p>
            <div className="mt-8 flex justify-center">
              <div
                className="h-px w-24"
                style={{ backgroundColor: "oklch(0.78 0.075 72 / 0.35)" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="mt-12 w-full max-w-md"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 24))}
          placeholder="Initialen oder Name"
          maxLength={24}
          className="w-full bg-transparent border-b outline-none text-center font-display italic text-2xl py-3 transition-colors"
          style={{
            color: "oklch(0.95 0.015 80)",
            borderColor: "oklch(0.78 0.075 72 / 0.35)",
          }}
        />
        <p
          className="text-[0.55rem] tracking-[0.4em] uppercase text-center mt-4"
          style={{ color: "oklch(0.70 0.02 75 / 0.7)" }}
        >
          {value.length}/24 · auch leer eine bewusste Entscheidung
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        onClick={onContinue}
        className="mt-14 tracking-[0.5em] text-[0.7rem] group"
        style={{ color: "oklch(0.88 0.10 78)", fontWeight: 300 }}
      >
        <span
          className="border-b pb-2"
          style={{ borderColor: "oklch(0.78 0.075 72 / 0.45)" }}
        >
          DEN SCHUH ENTHÜLLEN
        </span>
      </motion.button>
    </motion.section>
  );
}
