# Algacore — version1

The full-depth, interactive build of the Algacore marketing site. Same copy,
brand, and science as the static draft in the repo root, rebuilt on a modern
stack with motion, smooth scroll, routed i18n, and a real form backend.

## Stack

- **Astro 5** (`output: "server"`, `@astrojs/node` standalone adapter). Content
  pages are prerendered (`export const prerender = true`); only `/api/contact`
  runs on the server.
- **React 19 islands** — hydrated only where interactivity earns it.
- **Tailwind v4** (`@tailwindcss/vite`). Brand tokens live in `@theme` in
  `src/styles/global.css`, so utilities (`bg-cyano-900`, `text-phyco-500` ...)
  come straight from Brand System v1.0.
- **Framer Motion** — magnetic CTAs, the self-drawing absorption curve, the
  photobioreactor culture fill + flow, count-up stats, nav + mobile menu.
- **GSAP + ScrollTrigger** — scroll-bound parallax (`[data-parallax]`).
- **Lenis** — momentum smooth-scroll, synced into GSAP's ticker; anchor links
  glide through it.

All motion is gated on `prefers-reduced-motion`.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/ (server + prerendered client)
npm run preview    # serve the built output
```

## i18n

Routed, not client-swapped: **PT** (default) at `/`, **EN** at `/en/`. Real
URLs, `hreflang` alternates, per-locale `<title>`/meta. Copy is one structured
model in `src/lib/content.ts` (PT + EN), consumed by the section components so
both languages render from the same tree. House rule preserved: no em or en
dashes anywhere in page copy.

## Contact form

`ContactForm.tsx` posts JSON to `src/pages/api/contact.ts`, which validates and
either forwards to `CONTACT_WEBHOOK_URL` (Formspree, Make, n8n, a Resend proxy,
...) or logs the submission so the form works out of the box. Set the env var in
the deploy environment to wire a real inbox:

```bash
CONTACT_WEBHOOK_URL="https://formspree.io/f/XXXX"
```

## Structure

```
src/
├── components/
│   ├── react/            # islands: Nav, SiteEffects, HeroCanvas, MagneticButton,
│   │                     #          Compare, Spectrum, Counter, ContactForm
│   ├── sections/         # Hero, Band, Vision, Approach, Science, Path, Team, Connect
│   ├── MarkDefs.astro    # the brand mark <symbol>
│   ├── SectionHead.astro
│   ├── Wordmark.astro · Footer.astro · SiteSections.astro
├── i18n/config.ts        # locales, lang resolution, path helpers
├── lib/content.ts        # full bilingual content model
├── layouts/Base.astro    # head, nav, footer, global effects
├── pages/                # index.astro (PT), en/index.astro (EN), api/contact.ts
└── styles/global.css     # Tailwind + @theme brand tokens + base + keyframes
```

Brand assets are copied into `public/brand` and `public/team`.
