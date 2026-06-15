import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  pondAlt: string;
  pondTag: string;
  pondLabel: string;
  pond: string[];
  pbrAlt: string;
  pbrTag: string;
  pbrLabel: string;
  pbr: string[];
}

const serpentine =
  "M84 58 H246 A14 14 0 0 1 246 86 H84 A14 14 0 0 0 84 114 H246 A14 14 0 0 1 246 142 H84";

// Centerline of the raceway channel (a stadium loop the paddlewheel circulates).
const racewayLoop = "M82 88 H238 A42 42 0 0 1 238 172 H82 A42 42 0 0 1 82 88 Z";

export default function Compare(props: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const draw = reduce || inView;

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-2 md:gap-5">
      {/* Open raceway pond — quiet, neutral, the legacy way. */}
      <article className="card card--hover card--sheen md:p-7" data-panel="pond">
        <svg viewBox="0 0 320 200" role="img" aria-label={props.pondAlt} className="w-full h-auto block mb-[18px] md:mb-5" style={{ aspectRatio: "320/200" }}>
          <g fill="none" stroke="#aeb6ba" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="40" cy="30" r="9" fill="#cbd3d7" stroke="none" />
            <g stroke="#cbd3d7">
              <line x1="40" y1="11" x2="40" y2="16" />
              <line x1="40" y1="44" x2="40" y2="49" />
              <line x1="21" y1="30" x2="26" y2="30" />
              <line x1="54" y1="30" x2="59" y2="30" />
              <line x1="26.5" y1="16.5" x2="30" y2="20" />
              <line x1="50" y1="40" x2="53.5" y2="43.5" />
              <line x1="53.5" y1="16.5" x2="50" y2="20" />
              <line x1="30" y1="40" x2="26.5" y2="43.5" />
            </g>
            <g fill="#aeb6ba" stroke="none">
              <circle cx="150" cy="24" r="2" />
              <circle cx="178" cy="36" r="1.6" />
              <circle cx="206" cy="22" r="1.8" />
              <circle cx="232" cy="38" r="2.2" />
              <circle cx="120" cy="40" r="1.4" />
            </g>
            <path d="M258 20 L258 50" />
            <path d="M253 44 L258 50 L263 44" />
            <motion.g
              stroke="#8e979b"
              animate={reduce ? {} : { y: [0, -7, 0], opacity: [0.45, 0.85, 0.45] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
            >
              <path d="M96 70 q-5 -9 0 -18 q5 -9 0 -18" />
              <path d="M224 70 q-5 -9 0 -18 q5 -9 0 -18" />
            </motion.g>
          </g>
          <rect x="26" y="74" width="268" height="112" rx="56" fill="#96c3dd" stroke="#6e767a" strokeWidth="1.5" />
          <rect x="54" y="102" width="212" height="56" rx="28" fill="#cbd3d7" stroke="#8e979b" strokeWidth="1.5" />
          {/* Sluggish circulating water: quiet, low-contrast, the legacy way. */}
          <motion.path
            d={racewayLoop}
            fill="none"
            stroke="#7ba5c2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 17"
            opacity="0.5"
            animate={reduce ? {} : { strokeDashoffset: draw ? [0, -40] : 0 }}
            transition={{ duration: 3.4, ease: "linear", repeat: Infinity }}
          />
          <g stroke="#50585c" strokeWidth="1.5" fill="#e2e8ec">
            <rect x="100" y="74" width="20" height="14" rx="2" />
          </g>
          {/* Paddlewheel that pushes the loop, turning slowly. */}
          <motion.g
            stroke="#50585c"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={reduce ? {} : { rotate: draw ? 360 : 0 }}
            transition={{ duration: 7, ease: "linear", repeat: Infinity }}
          >
            <line x1="110" y1="74.5" x2="110" y2="87.5" />
            <line x1="103.5" y1="81" x2="116.5" y2="81" />
            <line x1="105" y1="76" x2="115" y2="86" />
            <line x1="115" y1="76" x2="105" y2="86" />
          </motion.g>
          <g fill="none" stroke="#6e767a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
            <path d="M196 84 l8 4 l-8 4" />
            <path d="M132 176 l-8 -4 l8 -4" />
          </g>
        </svg>
        <span className="inline-block font-semibold text-[0.7rem] tracking-[0.07em] uppercase text-muted border border-line rounded-[3px] px-[11px] py-1 mb-3">
          {props.pondTag}
        </span>
        <h4 className="text-xl tracking-[-0.01em] mb-1">{props.pondLabel}</h4>
        <ul className="list-none mt-3.5 grid gap-2.5">
          {props.pond.map((li) => (
            <li key={li} className="relative pl-5 text-muted text-[0.95rem]">
              <span className="absolute left-0.5 top-[0.55em] w-[7px] h-[7px] rounded-full bg-n-400" />
              {li}
            </li>
          ))}
        </ul>
      </article>

      {/* Tubular photobioreactor — vivid, our way (accent border). */}
      <article className="card card--hover card--sheen md:p-7 border-phyco-200!" data-panel="pbr">
        <svg viewBox="0 0 320 200" role="img" aria-label={props.pbrAlt} className="w-full h-auto block mb-[18px] md:mb-5" style={{ aspectRatio: "320/200" }}>
          <rect x="8" y="60" width="38" height="80" rx="8" fill="#eaf8ff" stroke="#a5ddff" strokeWidth="1.5" />
          <g>
            <circle cx="18" cy="74" r="2.5" fill="#008edd" />
            <rect x="24" y="71.5" width="16" height="5" rx="2.5" fill="#d1eeff" />
            <rect x="24" y="71.5" width="11" height="5" rx="2.5" fill="#36a9f5" />
            <circle cx="18" cy="92" r="2.5" fill="#008edd" />
            <rect x="24" y="89.5" width="16" height="5" rx="2.5" fill="#d1eeff" />
            <rect x="24" y="89.5" width="14" height="5" rx="2.5" fill="#36a9f5" />
            <circle cx="18" cy="110" r="2.5" fill="#008edd" />
            <rect x="24" y="107.5" width="16" height="5" rx="2.5" fill="#d1eeff" />
            <rect x="24" y="107.5" width="8" height="5" rx="2.5" fill="#36a9f5" />
            <circle cx="18" cy="128" r="2.5" fill="#008edd" />
            <rect x="24" y="125.5" width="16" height="5" rx="2.5" fill="#d1eeff" />
            <rect x="24" y="125.5" width="12" height="5" rx="2.5" fill="#36a9f5" />
          </g>
          <line x1="46" y1="72" x2="84" y2="58" stroke="#36a9f5" strokeWidth="4" strokeLinecap="round" />
          <line x1="84" y1="142" x2="46" y2="128" stroke="#36a9f5" strokeWidth="4" strokeLinecap="round" />
          <circle cx="58" cy="132" r="8" fill="#d1eeff" stroke="#008edd" strokeWidth="2" />
          <g stroke="#008edd" strokeWidth="1.4" strokeLinecap="round">
            <line x1="58" y1="132" x2="58" y2="126" />
            <line x1="58" y1="132" x2="63" y2="135" />
            <line x1="58" y1="132" x2="53" y2="135" />
          </g>
          <rect x="70" y="40" width="192" height="120" rx="12" fill="#eaf8ff" stroke="#a5ddff" strokeWidth="1.5" />
          <g stroke="#d1eeff" strokeWidth="1.5">
            <line x1="102" y1="46" x2="102" y2="154" />
            <line x1="134" y1="46" x2="134" y2="154" />
            <line x1="166" y1="46" x2="166" y2="154" />
            <line x1="198" y1="46" x2="198" y2="154" />
            <line x1="230" y1="46" x2="230" y2="154" />
          </g>
          <path d={serpentine} fill="none" stroke="#a5ddff" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
          <motion.path
            d={serpentine}
            fill="none"
            stroke="#008edd"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
          <motion.path
            d={serpentine}
            fill="none"
            stroke="#d1eeff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="2 22"
            animate={reduce ? {} : { strokeDashoffset: draw ? [0, -48] : 0 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity, delay: 0.6 }}
          />
          <line x1="246" y1="56" x2="277" y2="45" stroke="#008edd" strokeWidth="1.5" />
          <circle cx="286" cy="44" r="9" fill="#73c5ff" stroke="#008edd" strokeWidth="2" />
          <circle cx="286" cy="44" r="3" fill="#eaf8ff" stroke="none" />
        </svg>
        <span className="inline-block font-semibold text-[0.7rem] tracking-[0.07em] uppercase text-white bg-accent border border-accent rounded-[3px] px-[11px] py-1 mb-3">
          {props.pbrTag}
        </span>
        <h4 className="text-xl tracking-[-0.01em] mb-1">{props.pbrLabel}</h4>
        <ul className="list-none mt-3.5 grid gap-2.5">
          {props.pbr.map((li) => (
            <li key={li} className="relative pl-5 text-muted text-[0.95rem]">
              <span className="absolute left-0.5 top-[0.55em] w-[7px] h-[7px] rounded-full bg-accent" />
              {li}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
