import { motion } from "framer-motion";

export function Signature({
  value,
  onChange,
  onContinue,
}: {
  value: string;
  onChange: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
    >
      <div className="absolute inset-0 vignette pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="text-center mb-12"
      >
        <p className="text-gold-soft tracking-whisper mb-4">Personifizierung</p>
        <p className="font-display text-ivory text-4xl md:text-6xl italic">Ihre Signatur</p>
      </motion.div>

      {/* Engraved lining preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="relative w-full max-w-2xl"
      >
        <div
          className="relative rounded-sm overflow-hidden p-16"
          style={{
            background: "radial-gradient(ellipse at center, #3a2418 0%, #1a0e08 80%)",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.7), 0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative text-center">
            <p className="text-gold-soft text-[0.55rem] tracking-[0.5em] uppercase mb-6">
              — Innen graviert —
            </p>
            <p
              className="font-display italic text-5xl md:text-7xl"
              style={{
                color: "#c9a36a",
                textShadow:
                  "0 1px 0 rgba(0,0,0,0.6), 0 0 20px rgba(201, 163, 106, 0.3)",
                letterSpacing: "0.05em",
                minHeight: "1.2em",
              }}
            >
              {value || <span className="opacity-30">Ihr Name</span>}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-px w-24 bg-gold/30" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.3 }}
        className="mt-10 w-full max-w-md"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 24))}
          placeholder="Initialen oder Name"
          maxLength={24}
          className="w-full bg-transparent border-b border-gold/30 focus:border-gold outline-none text-center font-display text-2xl text-ivory placeholder:text-muted-foreground/50 placeholder:italic placeholder:font-display py-3 transition-colors"
        />
        <p className="text-muted-foreground text-[0.55rem] tracking-[0.4em] uppercase text-center mt-3">
          {value.length}/24 · optional
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        onClick={onContinue}
        className="text-gold mt-12 tracking-atelier hover:text-ivory transition-colors group"
      >
        <span className="border-gold/40 border-b pb-2 group-hover:border-ivory/60">Weiter</span>
      </motion.button>
    </motion.section>
  );
}
