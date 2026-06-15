import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  stages: string[];
  notes: string[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/* ---- Brand-styled stage glyphs (closed PBR -> biomass -> phycocyanin) ---- */

function Vessel({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <rect x="38" y="8" width="24" height="11" rx="5.5" fill="rgba(115,197,255,0.14)" stroke="#a5ddff" strokeWidth="2" />
      <rect x="22" y="16" width="56" height="74" rx="16" fill="rgba(115,197,255,0.07)" stroke="#a5ddff" strokeWidth="2" />
      {/* coiled spirulina filaments */}
      <g stroke="#73c5ff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M32 36 q9 -9 18 0 q9 9 18 0" />
        <path d="M32 50 q9 -9 18 0 q9 9 18 0" />
        <path d="M32 64 q9 -9 18 0 q9 9 18 0" />
        <path d="M32 78 q9 -9 18 0 q9 9 18 0" />
      </g>
      {/* moving shimmer reads as live culture / circulation */}
      <motion.path
        d="M32 36 q9 -9 18 0 q9 9 18 0 M32 50 q9 -9 18 0 q9 9 18 0 M32 64 q9 -9 18 0 q9 9 18 0 M32 78 q9 -9 18 0 q9 9 18 0"
        stroke="#eaf8ff"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="2 26"
        animate={draw ? { strokeDashoffset: [0, -56] } : {}}
        transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
      />
      {/* sensor / controller ticks */}
      <g stroke="#36a9f5" strokeWidth="2" strokeLinecap="round">
        <line x1="82" y1="30" x2="88" y2="30" />
        <line x1="82" y1="44" x2="88" y2="44" />
        <line x1="82" y1="58" x2="88" y2="58" />
      </g>
    </svg>
  );
}

function Biomass({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <path
        d="M50 12 C66 40 78 54 78 67 a28 28 0 1 1 -56 0 C22 54 34 40 50 12 Z"
        fill="rgba(0,142,221,0.16)"
        stroke="#73c5ff"
        strokeWidth="2"
      />
      {/* concentrated swirl */}
      <g stroke="#a5ddff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M36 66 q14 -12 28 0" />
        <path d="M34 76 q16 -12 32 0" />
        <path d="M40 56 q10 -9 20 0" />
      </g>
      <motion.circle
        cx="50"
        cy="68"
        r="3"
        fill="#eaf8ff"
        animate={draw ? { opacity: [0.4, 1, 0.4] } : {}}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
      />
    </svg>
  );
}

function Extract({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="pfVial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#36a9f5" />
          <stop offset="1" stopColor="#0073bc" />
        </linearGradient>
        <radialGradient id="pfGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#73c5ff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#73c5ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="50"
        cy="56"
        r="40"
        fill="url(#pfGlow)"
        animate={draw ? { scale: [0.92, 1.06, 0.92], opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <rect x="40" y="9" width="20" height="9" rx="4.5" fill="rgba(115,197,255,0.18)" stroke="#a5ddff" strokeWidth="2" />
      <rect x="36" y="16" width="28" height="74" rx="13" fill="rgba(15,46,61,0.35)" stroke="#a5ddff" strokeWidth="2" />
      {/* filled extract level rises as it draws into view */}
      <motion.rect
        x="40"
        width="20"
        rx="9"
        fill="url(#pfVial)"
        initial={false}
        animate={draw ? { y: 44, height: 42 } : { y: 86, height: 0 }}
        transition={{ duration: 1.5, ease, delay: 0.3 }}
      />
      <circle cx="50" cy="40" r="3.4" fill="#eaf8ff" opacity="0.9" />
    </svg>
  );
}

const glyphs = [Vessel, Biomass, Extract];

export default function ProcessFlow({ eyebrow, title, stages, notes }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const draw = reduce ? true : inView;

  const Conduit = ({ vertical = false }: { vertical?: boolean }) => (
    <div
      aria-hidden="true"
      className={
        vertical
          ? "conduit conduit--v md:hidden"
          : "conduit conduit--h hidden md:block"
      }
      data-on={draw ? "1" : "0"}
    />
  );

  return (
    <div ref={ref} className="deep-ground grain relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-deep)] p-[clamp(32px,4.5vw,56px)]">
      <div className="relative z-[1]">
        <p className="eyebrow eyebrow--onDark mb-3">{eyebrow}</p>
        <h3 className="font-display text-white text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.02em] mb-[clamp(36px,5vw,56px)] max-w-[24ch]">
          {title}
        </h3>

        <div className="flex flex-col md:flex-row md:items-stretch gap-5 md:gap-3">
          {stages.map((label, i) => {
            const Glyph = glyphs[i];
            return (
              <div key={label} className="contents">
                <motion.div
                  className="group relative flex-1 min-w-0"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={draw ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease, delay: 0.12 * i }}
                >
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 rounded-[3px] border border-white/12 bg-white/[0.04] p-5 md:p-6 transition-colors duration-300 hover:border-phyco-300/60 hover:bg-white/[0.07] h-full">
                    <div className="w-[clamp(56px,12vw,76px)] h-[clamp(56px,12vw,76px)] flex-none md:mb-5 transition-transform duration-500 group-hover:scale-[1.06]">
                      <Glyph draw={draw} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-phyco-300 mb-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-white text-[1.05rem] font-medium tracking-[-0.01em] mb-1.5">{label}</h4>
                      <p className="text-white/64 text-[0.9rem] leading-snug">{notes[i]}</p>
                    </div>
                  </div>
                </motion.div>
                {i < stages.length - 1 && (
                  <div className="flex items-center justify-center md:flex-none md:w-[clamp(28px,3vw,56px)]">
                    <Conduit />
                    <Conduit vertical />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
