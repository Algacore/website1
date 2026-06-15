import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Step {
  status: string;
  title: string;
  body: string;
}
interface Props {
  steps: Step[];
}

const ease = [0.22, 1, 0.36, 1] as const;
const nums = ["01", "02", "03", "04", "05"];

function Dot({ current, on, delay }: { current: boolean; on: boolean; delay: number }) {
  return (
    <span className="relative inline-flex">
      {current && (
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/30"
          animate={on ? { scale: [1, 2.1, 1], opacity: [0.5, 0, 0.5] } : {}}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      <motion.span
        className={`relative block w-[14px] h-[14px] rounded-full border-2 ${
          current ? "bg-accent border-accent" : "bg-card border-phyco-300"
        }`}
        style={{ boxShadow: current ? "0 0 0 5px rgba(0,142,221,0.14)" : "0 0 0 5px var(--color-page)" }}
        initial={{ scale: 0 }}
        animate={on ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, ease, delay }}
      />
    </span>
  );
}

function Card({ step, i, current }: { step: Step; i: number; current: boolean }) {
  return (
    <article className={`card card--hover card--sheen pt-[26px] h-full ${current ? "border-phyco-300!" : ""}`}>
      <span className={`block text-[2.4rem] font-semibold leading-none tracking-[-0.03em] mb-4 tabular-nums ${current ? "text-accent" : "text-phyco-200"}`}>
        {nums[i]}
      </span>
      <span
        className={`inline-block font-semibold text-[0.72rem] tracking-[0.06em] uppercase rounded-[3px] px-[11px] py-1 mb-3.5 border ${
          current ? "bg-accent border-accent text-white" : "text-accent-text border-phyco-200"
        }`}
      >
        {step.status}
      </span>
      <h3 className="text-[1.2rem] mb-2">{step.title}</h3>
      <p className="text-muted text-[0.98rem]">{step.body}</p>
    </article>
  );
}

export default function Roadmap({ steps }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const on = reduce ? true : inView;
  const n = steps.length;
  const lineDur = 1.4;

  return (
    <div ref={ref}>
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative">
        <div className="absolute top-[20px] left-[16.667%] right-[16.667%] h-[2px] bg-line overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-phyco-400 to-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={on ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: lineDur, ease }}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col">
              <div className="flex justify-center mb-8 h-[26px] items-center">
                <Dot current={i === 0} on={on} delay={(i / Math.max(1, n - 1)) * lineDur} />
              </div>
              <Card step={step} i={i} current={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-9">
        <div className="absolute left-[6px] top-3 bottom-3 w-[2px] bg-line overflow-hidden rounded-full">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-phyco-400 to-accent origin-top"
            initial={{ scaleY: 0 }}
            animate={on ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: lineDur, ease }}
          />
        </div>
        <div className="grid gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="absolute left-[-35px] top-2">
                <Dot current={i === 0} on={on} delay={(i / Math.max(1, n - 1)) * lineDur} />
              </span>
              <Card step={step} i={i} current={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
