import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface Props {
  href: string;
  variant?: "solid" | "ghost" | "ink";
  dataInterest?: string;
  children: ReactNode;
}

const variants: Record<string, string> = {
  solid:
    "bg-white text-phyco-700 shadow-[0_8px_24px_rgba(15,46,61,0.18)] hover:bg-white hover:shadow-[0_14px_34px_rgba(15,46,61,0.28)]",
  ghost: "bg-white/10 text-white border border-white/60 hover:bg-white/20 hover:border-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
  ink: "bg-ink text-white hover:bg-cyano-800",
};

/** A button/anchor that drifts gently toward the cursor (disabled under reduced motion). */
export default function MagneticButton({ href, variant = "solid", dataInterest, children }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 14);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 14);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-interest={dataInterest}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2 rounded-[3px] px-[26px] py-[14px] text-base font-medium tracking-[-0.01em] transition-[background-color,border-color,box-shadow] duration-200 ${variants[variant]}`}
    >
      <span>{children}</span>
      <svg
        className="h-[15px] w-[15px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </motion.a>
  );
}
