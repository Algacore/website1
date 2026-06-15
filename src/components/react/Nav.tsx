import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  lang: "pt" | "en";
  navTeam: string;
  navContact: string;
  langLabel: string;
  ptHref: string;
  enHref: string;
}

const links = (team: string, contact: string) => [
  { href: "#team", label: team, soft: true },
  { href: "#connect", label: contact, soft: false },
];

export default function Nav({ lang, navTeam, navContact, langLabel, ptHref, enHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const rafRef = useRef<number | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setScrolled(true);
      return;
    }
    // Swap to the solid bar a little before the hero fully leaves.
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const cleanup = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resetRef.current) clearTimeout(resetRef.current);
    };
    if (!autoScroll) { cleanup(); return; }

    const SPEED = 0.55;
    const step = () => {
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        resetRef.current = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          resetRef.current = setTimeout(() => {
            rafRef.current = requestAnimationFrame(step);
          }, 800);
        }, 2800);
        return;
      }
      window.scrollBy(0, SPEED);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return cleanup;
  }, [autoScroll]);

  const navLinks = links(navTeam, navContact);
  const light = !scrolled && !open;

  return (
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "bg-white/88 backdrop-blur-md border-line"
          : "bg-transparent backdrop-blur-md border-white/20"
      }`}
      style={{ WebkitBackdropFilter: "saturate(140%) blur(10px)" }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-[var(--maxw)] mx-auto px-[var(--gutter)] py-3.5">
        {/* Language toggle + autoscroll */}
        <div className="hidden sm:inline-flex items-center gap-3 justify-self-start">
          <div
            className="inline-flex items-center gap-1"
            role="group"
            aria-label={langLabel}
          >
            <a
              href={ptHref}
              aria-current={lang === "pt" ? "true" : undefined}
              className={`px-1 py-1.5 text-[0.9rem] font-medium tracking-wide transition-opacity hover:opacity-80 ${
                lang === "pt" ? "underline underline-offset-4" : ""
              } ${light ? "text-white" : "text-ink"} ${
                lang !== "pt" && light ? "text-white/82" : ""
              } ${lang !== "pt" && !light ? "text-muted" : ""}`}
            >
              PT
            </a>
            <span className={light ? "text-white/24" : "text-line"}>/</span>
            <a
              href={enHref}
              aria-current={lang === "en" ? "true" : undefined}
              className={`px-1 py-1.5 text-[0.9rem] font-medium tracking-wide transition-opacity hover:opacity-80 ${
                lang === "en" ? "underline underline-offset-4" : ""
              } ${light ? "text-white" : "text-ink"} ${
                lang !== "en" && light ? "text-white/82" : ""
              } ${lang !== "en" && !light ? "text-muted" : ""}`}
            >
              EN
            </a>
          </div>

          <button
            type="button"
            aria-label={autoScroll ? "Parar autoscroll" : "Iniciar autoscroll"}
            onClick={() => setAutoScroll((v) => !v)}
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200 ${
              autoScroll
                ? light
                  ? "bg-white/20 border-white/60 text-white"
                  : "bg-phyco-500/15 border-phyco-500/60 text-phyco-600"
                : light
                  ? "bg-transparent border-white/30 text-white/60 hover:border-white/60 hover:text-white"
                  : "bg-transparent border-line text-muted hover:border-ink/40 hover:text-ink"
            }`}
          >
            {autoScroll ? (
              /* pause icon */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <rect x="1.5" y="1" width="3" height="8" rx="0.8" />
                <rect x="5.5" y="1" width="3" height="8" rx="0.8" />
              </svg>
            ) : (
              /* double-down chevron icon */
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="2,1.5 5,4.5 8,1.5" />
                <polyline points="2,5 5,8 8,5" />
              </svg>
            )}
          </button>
        </div>

        {/* Brand */}
        <a
          href={lang === "pt" ? ptHref : enHref}
          aria-label="Algacore"
          className="col-start-2 justify-self-center inline-flex items-center"
        >
          <img
            src={light ? "/brand/svg/algacore-lockup-stacked-white.svg" : "/brand/svg/algacore-lockup-stacked.svg"}
            alt="Algacore"
            className="h-12 md:h-16 w-auto"
          />
        </a>

        {/* Desktop links */}
        <nav className="col-start-3 justify-self-end hidden sm:inline-flex items-center gap-5" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[0.95rem] font-medium px-1 py-1.5 transition-opacity hover:opacity-70 ${
                light ? "text-white" : "text-ink"
              } ${l.soft ? "hidden md:inline-block" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`sm:hidden col-start-3 justify-self-end inline-flex flex-col gap-[5px] p-2 ${
            light ? "text-white" : "text-ink"
          }`}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current rounded-full"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-current rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current rounded-full"
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden overflow-hidden bg-white border-t border-line"
            aria-label="Mobile"
          >
            <div className="px-[var(--gutter)] py-5 grid gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink text-lg font-medium"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-line text-muted">
                <a href={ptHref} className={lang === "pt" ? "text-ink font-medium underline underline-offset-4" : ""}>
                  PT
                </a>
                <span>/</span>
                <a href={enHref} className={lang === "en" ? "text-ink font-medium underline underline-offset-4" : ""}>
                  EN
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
