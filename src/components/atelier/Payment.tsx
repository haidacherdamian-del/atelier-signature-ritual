import { motion } from "framer-motion";
import { useState } from "react";
import { BackButton } from "./BackButton";

type Method = "apple" | "card" | "paypal";

export function Payment({
  onComplete,
  onBack,
}: {
  onComplete: () => void;
  onBack?: () => void;
}) {
  const [method, setMethod] = useState<Method>("apple");
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ number: "", exp: "", cvc: "" });

  const valid = method !== "card" || (card.number && card.exp && card.cvc);

  const handlePay = () => {
    if (!valid) return;
    setProcessing(true);
    setTimeout(onComplete, 2400);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="absolute inset-0 flex flex-col items-center justify-start pt-20 md:pt-24 pb-20 px-8 overflow-y-auto"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at center top, oklch(0.78 0.10 75 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
        className="relative text-center max-w-xl mb-14"
      >
        <p
          className="text-[0.65rem] tracking-[0.5em] mb-6"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DIE ZAHLUNG
        </p>
        <p
          className="font-display italic text-3xl md:text-5xl leading-[1.05]"
          style={{ color: "oklch(0.95 0.015 80)" }}
        >
          Die Beauftragung bestätigen.
        </p>
        <p
          className="mt-6 text-sm md:text-base tracking-[0.14em] leading-relaxed max-w-md mx-auto"
          style={{ color: "oklch(0.74 0.02 75 / 0.85)", fontWeight: 300 }}
        >
          Ihr Paar wird nun für die Fertigung reserviert.
        </p>
      </motion.div>

      {/* Method selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="relative w-full max-w-md"
      >
        <p
          className="tracking-[0.4em] text-[0.55rem] uppercase mb-4 text-center"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          Zahlungsweise
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { id: "apple", label: "Apple Pay" },
              { id: "card", label: "Karte" },
              { id: "paypal", label: "PayPal" },
            ] as { id: Method; label: string }[]
          ).map((m) => {
            const on = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className="relative py-4 transition-all"
                style={{
                  border: on
                    ? "1px solid oklch(0.85 0.10 78 / 0.7)"
                    : "1px solid oklch(0.78 0.075 72 / 0.18)",
                  background: on
                    ? "linear-gradient(180deg, oklch(0.18 0.012 60 / 0.6), oklch(0.10 0.008 55 / 0.7))"
                    : "transparent",
                  color: on ? "oklch(0.94 0.03 80)" : "oklch(0.74 0.02 75 / 0.7)",
                }}
              >
                <span
                  className="text-[0.6rem] tracking-[0.35em] uppercase"
                  style={{ fontWeight: 300 }}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Method body */}
        <div className="mt-10 min-h-[140px]">
          {method === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Field
                label="Kartennummer"
                value={card.number}
                onChange={(v) => setCard({ ...card, number: v })}
                placeholder="•••• •••• •••• ••••"
              />
              <div className="grid grid-cols-2 gap-6">
                <Field
                  label="Gültig bis"
                  value={card.exp}
                  onChange={(v) => setCard({ ...card, exp: v })}
                  placeholder="MM / JJ"
                />
                <Field
                  label="CVC"
                  value={card.cvc}
                  onChange={(v) => setCard({ ...card, cvc: v })}
                  placeholder="•••"
                />
              </div>
            </motion.div>
          )}
          {method === "apple" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center font-display italic text-xl pt-6"
              style={{ color: "oklch(0.86 0.02 80)" }}
            >
              Mit Apple Pay vertraulich abschließen.
            </motion.p>
          )}
          {method === "paypal" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center font-display italic text-xl pt-6"
              style={{ color: "oklch(0.86 0.02 80)" }}
            >
              Sie werden diskret zu PayPal weitergeleitet.
            </motion.p>
          )}
        </div>

        {/* Confirm */}
        <div className="pt-8">
          <motion.button
            onClick={handlePay}
            disabled={!valid || processing}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative w-full py-5 overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              border: "1px solid oklch(0.78 0.075 72 / 0.55)",
              background:
                "linear-gradient(180deg, oklch(0.16 0.012 60 / 0.55), oklch(0.10 0.008 55 / 0.7))",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.18), transparent 70%)",
              }}
            />
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-2 h-px transition-all duration-700 group-hover:w-2/3"
              style={{
                width: "30%",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.85 0.10 78 / 0.85), transparent)",
              }}
            />
            <span
              className="relative tracking-[0.5em] text-[0.75rem] md:text-[0.8rem] uppercase"
              style={{ color: "oklch(0.94 0.03 80)", fontWeight: 300 }}
            >
              {processing ? "Wird vertraulich gesichert" : "Zahlung bestätigen"}
            </span>
          </motion.button>
          <p
            className="text-[0.55rem] tracking-[0.45em] uppercase text-center mt-6"
            style={{ color: "oklch(0.70 0.02 75 / 0.7)", fontWeight: 300 }}
          >
            Die Zahlung erfolgt verschlüsselt und vertraulich.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        className="tracking-[0.4em] text-[0.55rem] uppercase block mb-3"
        style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b outline-none font-display italic text-xl py-2 transition-colors"
        style={{
          color: "oklch(0.95 0.015 80)",
          borderColor: "oklch(0.78 0.075 72 / 0.3)",
        }}
      />
    </div>
  );
}
