import { motion } from "framer-motion";
import { BackButton } from "./BackButton";
import type { Customer } from "./types";

export function Checkout({
  customer,
  onUpdate,
  onComplete,
  onBack,
}: {
  customer: Customer;
  onUpdate: (c: Customer) => void;
  onComplete: () => void;
  onBack?: () => void;
}) {
  const valid = customer.name && customer.email && customer.address;

  const handleContinue = () => {
    if (!valid) return;
    onComplete();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      className="absolute inset-0 flex flex-col items-center justify-start px-8 overflow-y-auto py-20"
    >
      {onBack && <BackButton onClick={onBack} />}
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at center top, oklch(0.78 0.10 75 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Concierge header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-center mb-14 max-w-xl"
      >
        <p
          className="text-[0.65rem] tracking-[0.5em] mb-6"
          style={{ color: "oklch(0.78 0.075 72)", fontWeight: 300 }}
        >
          DIE BEAUFTRAGUNG
        </p>
        <p
          className="font-display italic text-3xl md:text-5xl leading-[1.05]"
          style={{ color: "oklch(0.95 0.015 80)" }}
        >
          Wir beginnen die Arbeit.
        </p>
        <p
          className="mt-6 text-sm md:text-base tracking-[0.14em] leading-relaxed max-w-md mx-auto"
          style={{ color: "oklch(0.74 0.02 75 / 0.85)", fontWeight: 300 }}
        >
          Ihr Paar entsteht in unserer Werkstatt in Italien.
          Die Fertigung erfolgt präzise von Hand
          und benötigt sechs bis acht Wochen.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className="w-full max-w-md space-y-10"
      >
        <Field
          label="Name"
          value={customer.name}
          onChange={(v) => onUpdate({ ...customer, name: v })}
          placeholder="Ihr vollständiger Name"
        />
        <Field
          label="Vertraulicher Kontakt"
          value={customer.email}
          onChange={(v) => onUpdate({ ...customer, email: v })}
          placeholder="name@residenz.de"
          type="email"
        />
        <Field
          label="Lieferadresse"
          value={customer.address}
          onChange={(v) => onUpdate({ ...customer, address: v })}
          placeholder="Straße, PLZ, Stadt"
        />

        <div className="pt-8">
          <button
            onClick={handleContinue}
            disabled={!valid}
            className="w-full py-5 rounded-sm tracking-[0.4em] text-[0.7rem] uppercase transition-all flex items-center justify-center gap-3 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "transparent",
              color: "oklch(0.92 0.02 82)",
              border: "1px solid oklch(0.78 0.075 72 / 0.55)",
              fontWeight: 300,
            }}
          >
            <span>Beauftragung bestätigen</span>
          </button>
          <p
            className="text-[0.55rem] tracking-[0.45em] uppercase text-center mt-6"
            style={{ color: "oklch(0.70 0.02 75 / 0.7)", fontWeight: 300 }}
          >
            Privat · Verschlüsselt · Persönlich begleitet
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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
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
        type={type}
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
