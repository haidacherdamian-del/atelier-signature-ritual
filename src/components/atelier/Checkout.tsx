import { motion } from "framer-motion";
import { useState } from "react";
import type { Customer } from "./types";

export function Checkout({
  customer,
  onUpdate,
  onComplete,
}: {
  customer: Customer;
  onUpdate: (c: Customer) => void;
  onComplete: () => void;
}) {
  const [processing, setProcessing] = useState(false);
  const valid = customer.name && customer.email && customer.address;

  const handlePay = () => {
    if (!valid) return;
    setProcessing(true);
    setTimeout(onComplete, 2200);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8 overflow-y-auto py-16"
    >
      <div className="absolute inset-0 vignette pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-center mb-12"
      >
        <p className="text-gold-soft tracking-whisper mb-3">Chapter V — Concierge</p>
        <p className="font-display text-ivory text-3xl md:text-4xl italic">
          Your pair will be handcrafted
        </p>
        <p className="font-display text-gold text-3xl md:text-4xl italic">
          and delivered to your residence.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <Field
          label="Name"
          value={customer.name}
          onChange={(v) => onUpdate({ ...customer, name: v })}
          placeholder="Your full name"
        />
        <Field
          label="Email"
          value={customer.email}
          onChange={(v) => onUpdate({ ...customer, email: v })}
          placeholder="name@residence.com"
          type="email"
        />
        <Field
          label="Delivery"
          value={customer.address}
          onChange={(v) => onUpdate({ ...customer, address: v })}
          placeholder="Suite, residence, city"
        />

        <div className="pt-6">
          <button
            onClick={handlePay}
            disabled={!valid || processing}
            className="w-full bg-ivory text-obsidian py-5 rounded-sm font-medium tracking-[0.25em] text-xs uppercase transition-all hover:bg-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {processing ? (
              <>
                <span className="inline-block h-3 w-3 rounded-full bg-obsidian animate-pulse" />
                <span>Securing your commission</span>
              </>
            ) : (
              <>
                <ApplePayMark />
                <span>Pay Discreetly</span>
              </>
            )}
          </button>
          <p className="text-muted-foreground text-[0.55rem] tracking-[0.4em] uppercase text-center mt-4">
            Secure · Encrypted · Private
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
      <label className="text-gold-soft tracking-[0.4em] text-[0.55rem] uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none font-display text-xl text-ivory placeholder:text-muted-foreground/40 placeholder:italic py-2 transition-colors"
      />
    </div>
  );
}

function ApplePayMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.85 2.33-4.22 2.43-4.29-1.32-1.94-3.39-2.21-4.12-2.24-1.76-.18-3.43 1.04-4.32 1.04-.9 0-2.27-1.02-3.74-.99-1.92.03-3.7 1.12-4.69 2.84-2 3.46-.51 8.57 1.44 11.39.95 1.38 2.08 2.93 3.55 2.87 1.43-.06 1.97-.92 3.7-.92s2.21.92 3.72.89c1.54-.03 2.51-1.4 3.45-2.79 1.09-1.6 1.54-3.16 1.56-3.24-.03-.01-2.99-1.15-3.02-4.56zM14.16 4.04c.79-.96 1.32-2.29 1.18-3.62-1.13.05-2.51.76-3.32 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.55-.64 3.34-1.6z" />
    </svg>
  );
}
