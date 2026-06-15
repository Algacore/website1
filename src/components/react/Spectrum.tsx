import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  alt: string;
  caption: string;
  peakLabel: string;
}

const CURVE =
  "M20 196 C140 192 260 184 330 172 C380 160 405 110 431 40 C458 104 490 152 528 174 C552 184 568 188 580 190";
const GLOW =
  "M20 196 C140 192 260 184 330 172 C380 160 405 110 431 40 C458 104 490 152 528 174 C552 184 568 188 580 190 L580 200 L20 200 Z";

export default function Spectrum({ alt, caption, peakLabel }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const on = reduce || inView;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={ref} className="min-w-0">
      <svg viewBox="0 0 600 240" role="img" aria-label={alt} className="w-full h-auto block overflow-visible" style={{ aspectRatio: "600/240" }}>
        <defs>
          <linearGradient id="sigStroke" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#73c5ff" />
            <stop offset="0.55" stopColor="#36a9f5" />
            <stop offset="1" stopColor="#73c5ff" />
          </linearGradient>
          <linearGradient id="sigGlow" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#73c5ff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#73c5ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sigPeak" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(431 40) scale(52)">
            <stop offset="0" stopColor="#d1eeff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#d1eeff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <line x1="20" y1="200" x2="580" y2="200" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <g stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          <line x1="20" y1="200" x2="20" y2="206" />
          <line x1="206.7" y1="200" x2="206.7" y2="206" />
          <line x1="393.3" y1="200" x2="393.3" y2="206" />
          <line x1="580" y1="200" x2="580" y2="206" />
        </g>
        <g fill="rgba(255,255,255,0.52)" fontSize="11" fontWeight="500" style={{ letterSpacing: "0.04em" }} textAnchor="middle">
          <text x="20" y="222">400</text>
          <text x="206.7" y="222">500</text>
          <text x="393.3" y="222">600</text>
          <text x="580" y="222">700</text>
          <text x="552" y="236">nm</text>
        </g>

        <motion.path d={GLOW} fill="url(#sigGlow)" initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 1, delay: 1.15 }} />

        <motion.line x1="431" y1="46" x2="431" y2="200" stroke="#73c5ff" strokeWidth="1" strokeDasharray="2 4" initial={{ opacity: reduce ? 0.65 : 0 }} animate={{ opacity: on ? 0.65 : 0 }} transition={{ duration: 0.8, delay: 1.5 }} />
        <motion.text x="431" y="34" fill="#73c5ff" fontSize="12" fontWeight="600" textAnchor="middle" style={{ letterSpacing: "0.03em" }} initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.5 }}>
          {peakLabel}
        </motion.text>

        <motion.path
          d={CURVE}
          fill="none"
          stroke="url(#sigStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(115,197,255,0.55))" }}
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: on ? 1 : 0 }}
          transition={{ duration: 1.9, ease, delay: 0.15 }}
        />

        <circle cx="431" cy="40" r="44" fill="url(#sigPeak)" />
        <motion.circle
          cx="431"
          cy="40"
          r="4.5"
          fill="#eaf8ff"
          style={{ filter: "drop-shadow(0 0 7px rgba(115,197,255,0.9))", transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
          animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.6, ease, delay: 1.45 }}
        />
      </svg>
      <figcaption className="mt-1 text-[0.74rem] text-white/55" style={{ letterSpacing: "0.01em" }}>
        {caption}
      </figcaption>
    </div>
  );
}
