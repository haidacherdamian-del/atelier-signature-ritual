import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { BespokeOrder } from "./types";
import { MODEL_META } from "./types";
import oxford from "@/assets/shoe-oxford.png";
import derby from "@/assets/shoe-derby.png";
import loafer from "@/assets/shoe-loafer.png";
import monk from "@/assets/shoe-monk.jpg";
import sneaker from "@/assets/shoe-sneaker.png";

const IMAGES = { oxford, derby, loafer, monk, sneaker } as const;

export function Confirmation({ order, onReset }: { order: BespokeOrder; onReset: () => void }) {
  const [phase, setPhase] = useState<"text" | "details" | "fade">("text");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("details"), 3500);
    const t2 = setTimeout(() => setPhase("fade"), 18000);
    const t3 = setTimeout(onReset, 22000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onReset]);

  const img = order.model ? IMAGES[order.model] : oxford;
  const meta = order.model ? MODEL_META[order.model] : MODEL_META.oxford;
  const ref = `MV-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
    >
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Fading shoe in background */}
      <motion.img
        src={img}
        alt={meta.name}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: phase === "fade" ? 0 : 0.18,
          scale: phase === "fade" ? 0.95 : 1,
        }}
        transition={{ duration: 4 }}
        className="absolute max-h-[70vh] max-w-[80%] object-contain"
        style={{ filter: "blur(2px) brightness(0.6)" }}
      />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          className="font-display text-ivory text-3xl md:text-5xl italic leading-tight"
        >
          Your bespoke creation is now in the hands of our artisans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "details" || phase === "fade" ? 1 : 0 }}
          transition={{ duration: 2 }}
          className="mt-16 space-y-6"
        >
          <div className="flex justify-center">
            <div className="h-px w-16 bg-gold/40" />
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-5 max-w-md mx-auto text-left">
            <Detail label="Reference" value={ref} />
            <Detail label="Model" value={meta.name} />
            <Detail label="Estimated" value="6–8 weeks" />
            <Detail label="Delivery" value="By appointment" />
          </div>

          <div className="flex justify-center pt-4">
            <div className="h-px w-16 bg-gold/40" />
          </div>

          <p className="text-gold-soft text-[0.6rem] tracking-[0.4em] uppercase">
            A digital receipt has been sent to {order.customer.email || "you"}
          </p>

          <button
            onClick={onReset}
            className="text-muted-foreground text-[0.6rem] tracking-[0.4em] uppercase hover:text-ivory transition-colors mt-12 block mx-auto"
          >
            — Return to atelier —
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gold-soft text-[0.55rem] tracking-[0.4em] uppercase mb-1">{label}</div>
      <div className="font-display text-ivory text-lg italic">{value}</div>
    </div>
  );
}
