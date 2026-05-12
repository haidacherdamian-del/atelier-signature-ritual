import { motion } from "framer-motion";

export function BackButton({ onClick, label = "ZURÜCK" }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      onClick={onClick}
      className="group absolute top-8 left-8 md:top-10 md:left-12 z-50 flex items-center gap-3 py-2 px-1"
      aria-label="Zurück"
    >
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        className="transition-transform duration-500 group-hover:-translate-x-1"
      >
        <path
          d="M5 1L1 5L5 9M1 5H13"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[oklch(0.78_0.075_72)] group-hover:text-[oklch(0.88_0.10_78)] transition-colors duration-500"
        />
      </svg>
      <span
        className="text-[0.65rem] tracking-[0.5em] transition-colors duration-500"
        style={{
          color: "oklch(0.78 0.075 72)",
          fontWeight: 300,
        }}
      >
        <span className="group-hover:text-[color:oklch(0.92_0.02_82)] transition-colors duration-500">
          {label}
        </span>
      </span>
    </motion.button>
  );
}
