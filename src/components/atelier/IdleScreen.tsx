import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import leatherMacro from "@/assets/leather-macro.jpg";
import stitchingMacro from "@/assets/stitching-macro.jpg";
import shoeLast from "@/assets/shoe-last.jpg";

const slides = [leatherMacro, stitchingMacro, shoeLast];

export function IdleScreen({ onBegin }: { onBegin: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => setActive((i) => (i + 1) % slides.length), 9000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
      onClick={onBegin}
      className="absolute inset-0 cursor-pointer select-none"
    >
      {/* Cinematic backdrop slideshow */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: i === active ? 0.45 : 0,
              scale: i === active ? 1 : 1.1,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Vignette + spotlight */}
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 spotlight animate-breathe" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-24">
        {/* Top mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-center"
        >
          <div className="text-gold-soft tracking-whisper mb-3">Maison</div>
          <div className="font-display text-ivory text-3xl tracking-[0.3em]">VOLTERRA</div>
          <div className="text-gold-soft mt-3 text-[0.55rem] tracking-[0.5em]">EST · MCMXIV</div>
        </motion.div>

        {/* Center quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
          className="text-center px-8"
        >
          <p className="font-display text-ivory text-5xl md:text-7xl leading-tight italic">
            Gefertigt für einen.
          </p>
          <p className="font-display text-gold text-5xl md:text-7xl leading-tight italic mt-2">
            Entworfen für Sie.
          </p>
        </motion.div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="bg-gold/40 h-px w-16 animate-breathe" />
          </div>
          <p className="text-ivory tracking-atelier">Tippen, um zu beginnen</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
