import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

/** Count-up that fires once when scrolled into view; static under reduced motion. */
export default function Counter({ to, prefix = "", suffix = "", durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: durationMs / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce, durationMs]);

  return (
    <span
      ref={ref}
      className="block font-semibold tracking-[-0.03em] text-ink leading-none tabular-nums text-[clamp(2.4rem,7vw,3.4rem)]"
    >
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
