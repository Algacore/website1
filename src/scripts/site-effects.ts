import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global behavior module, loaded once from the layout:
 *  - Lenis momentum smooth-scroll (synced into ScrollTrigger)
 *  - top scroll-progress bar
 *  - scroll-reveal observer (CSS-class driven)
 *  - GSAP parallax for [data-parallax] elements
 *  - section theme cross-fade for [data-theme] sections
 * All motion is disabled under prefers-reduced-motion.
 */

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

/** Sections and effect scripts can reuse the shared Lenis instance. */
export const getLenis = () => lenis;

function init() {
  const reduce = reduceMotion();

  // ---- Scroll-reveal: reveal once, then stop watching ----
  const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  }

  const progress = document.querySelector<HTMLElement>(".scroll-progress");
  const setProgress = (p: number) => {
    if (progress) progress.style.transform = `scaleX(${p})`;
  };

  const parallaxEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]"),
  );

  if (reduce) {
    setProgress(document.documentElement.scrollHeight > window.innerHeight ? 0 : 1);
  } else {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", (e: { progress: number }) => {
      setProgress(e.progress || 0);
      ScrollTrigger.update();
    });

    const raf = (time: number) => {
      lenis!.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP parallax bound to scroll position.
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0");
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // ---- Section theme choreography ----
  // Sections carry data-theme="dark" | "light". The body class cross-fades the
  // page ground so dark grounds bleed into their neighbors instead of hard-cutting.
  const themed = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
  if (themed.length && !reduce) {
    themed.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            document.body.classList.toggle("theme-dark", sec.dataset.theme === "dark");
          }
        },
      });
    });
  }

  if (!reduce) ScrollTrigger.refresh();

  // Anchor links route through Lenis for a smooth glide.
  document.addEventListener("click", (ev: MouseEvent) => {
    const a = (ev.target as HTMLElement)?.closest?.('a[href^="#"]') as
      | HTMLAnchorElement
      | null;
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target && lenis) {
      ev.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
      history.replaceState(null, "", id);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
