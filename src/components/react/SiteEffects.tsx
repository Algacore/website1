import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global behavior island, mounted once in the layout:
 *  - Lenis momentum smooth-scroll (synced into GSAP's ticker + ScrollTrigger)
 *  - a top scroll-progress bar
 *  - the lightweight scroll-reveal observer (CSS-class driven)
 *  - GSAP parallax for [data-parallax] elements
 * All motion is disabled under prefers-reduced-motion.
 */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    // ---- Scroll-reveal: reveal once, then stop watching ----
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      io = new IntersectionObserver(
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
      reveals.forEach((el) => io!.observe(el));
    }

    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const setProgress = (p: number) => {
      if (progress) progress.style.transform = `scaleX(${p})`;
    };

    // Parallax targets: data-parallax holds a speed factor (px per viewport).
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    let lenis: Lenis | null = null;
    let rafId = 0;

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
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

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

      ScrollTrigger.refresh();
    }

    // Anchor links should route through Lenis for a smooth glide.
    const onClick = (ev: MouseEvent) => {
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
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      io?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
