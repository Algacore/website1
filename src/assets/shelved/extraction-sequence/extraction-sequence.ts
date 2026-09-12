import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SHELVED - not mounted anywhere. See README.md in this folder.
 *
 * The "extraction" sequence: a pinned, scrub-driven scene that walks the
 * reader from a field of spirulina filaments, through the filaments converging
 * into the Algacore mark (the closed vessel), to the phycocyanin flood.
 *
 * The block ships hidden and is only revealed here, so a visitor without JS or
 * with reduced motion simply reads the static Vision cards instead of staring
 * at a half-built scene.
 */
export function mountExtractionSequence(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(min-width: 768px)").matches) return;

  const stage = root.querySelector<HTMLElement>("[data-vseq-stage]");
  // The mark's paths fill with currentColor, so the pigment flood is a color
  // tween on the wrapper, not a fill tween.
  const mark = root.querySelector<SVGElement>("[data-vseq-mark]");
  const glow = root.querySelector<SVGElement>("[data-vseq-glow]");
  const filaments = Array.from(root.querySelectorAll<SVGPathElement>("[data-vseq-filament]"));
  const labels = Array.from(root.querySelectorAll<HTMLElement>("[data-vseq-label]"));
  const ticks = Array.from(root.querySelectorAll<HTMLElement>("[data-vseq-tick]"));
  if (!stage || !mark || !glow || !labels.length) return;

  root.hidden = false;

  let shown = 0;
  const showLabel = (index: number) => {
    if (index === shown) return;
    shown = index;
    labels.forEach((el, i) => {
      gsap.to(el, { autoAlpha: i === index ? 1 : 0, y: i === index ? 0 : 10, duration: 0.35 });
    });
    ticks.forEach((el, i) => el.classList.toggle("is-on", i <= index));
  };

  gsap.set(labels, { autoAlpha: 0, y: 10 });
  gsap.set(labels[0], { autoAlpha: 1, y: 0 });
  ticks[0]?.classList.add("is-on");
  gsap.set(mark, { autoAlpha: 0.08, scale: 1.12, transformOrigin: "50% 50%" });
  gsap.set(glow, { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=250%",
      pin: stage,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Stage 1 -> 2: the filament field drifts inward and dims while the vessel
  // resolves out of it.
  tl.addLabel("converge")
    .to(
      filaments,
      {
        autoAlpha: 0.18,
        scale: 0.42,
        transformOrigin: "50% 50%",
        stagger: { each: 0.02, from: "edges" },
        duration: 1,
      },
      "converge",
    )
    .to(mark, { autoAlpha: 0.55, scale: 1, duration: 1 }, "converge");

  // Stage 2 -> 3: phycocyanin floods the vessel and the ground lights blue.
  tl.addLabel("flood", ">-0.1")
    .to(filaments, { autoAlpha: 0, duration: 0.5 }, "flood")
    .to(mark, { autoAlpha: 1, color: "#008edd", scale: 1.04, duration: 1 }, "flood")
    .to(glow, { autoAlpha: 1, scale: 1, duration: 1 }, "flood")
    .to(stage, { backgroundColor: "#00416f", duration: 1 }, "flood");

  // Labels are driven from timeline progress rather than one-shot callbacks so
  // that scrubbing backwards restores the earlier stage.
  tl.eventCallback("onUpdate", () => {
    const p = tl.progress();
    showLabel(p > 0.72 ? 2 : p > 0.34 ? 1 : 0);
  });
}
