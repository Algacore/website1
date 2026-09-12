# Algacore site (version1)

The production build of the Algacore marketing site. Static Astro output, one
bilingual content model, GSAP-driven motion, zero UI framework.

## Stack

- **Astro 5**, `output: "static"`. Every route is prerendered to HTML; there is
  no server runtime and no API route.
- **Tailwind v4** (`@tailwindcss/vite`). Brand tokens live in `@theme` in
  `src/styles/global.css`, so utilities (`bg-cyano-900`, `text-phyco-500` ...)
  come straight from Brand System v1.0.
- **GSAP + ScrollTrigger** — the pinned Vision extraction sequence, parallax,
  magnetic CTAs, scroll-triggered draw-ins, section theme choreography.
- **Lenis** — momentum smooth-scroll, synced into ScrollTrigger; anchor links
  glide through it.
- **Canvas 2D** — the hero scene (depth-sorted filament planes, caustic light
  bands, extraction glow), hand-rolled, no library.
- **Self-hosted type** via `@fontsource-variable/outfit` and
  `@fontsource-variable/fraunces`. No third-party font request at runtime.

Interactive parts are plain `<script>` modules inside their Astro components.
All motion is gated on `prefers-reduced-motion`, and everything degrades to
readable static content with JavaScript off.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/ (static)
npm run preview    # serve the built output
```

## i18n

Routed, not client-swapped: **PT** (default) at `/`, **EN** at `/en/`. Real
URLs, `hreflang` alternates, per-locale `<title>`/meta. Copy is one structured
model in `src/lib/content.ts` (PT + EN), consumed by the section components so
both languages render from the same tree. House rule preserved: no em or en
dashes anywhere in page copy.

## Contact form

`ContactForm.astro` posts the submission as JSON straight to Formspree. Point it
at your form by setting the endpoint in `.env` (see `.env.example`):

```bash
PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/XXXX"
```

The variable is `PUBLIC_`-prefixed because it ships in the client bundle, which
is fine: a Formspree form id is not a secret. A hidden honeypot field
(`company_website`) silently drops bot submissions. The required acknowledgement
checkbox and the privacy note are legal requirements, not decoration; do not
remove them.

## Structure

```
src/
├── assets/team/          # team photos, processed by astro:assets
├── components/
│   ├── sections/         # Hero, Band, Vision, Market, Approach, Science,
│   │   │                 # Path, Team, Faq, Connect
│   │   └── parts/        # MagneticButton, Counter, Roadmap, Compare,
│   │                     # ProcessFlow, Spectrum, ContactForm
│   ├── Nav.astro         # fixed header, scroll state, mobile sheet
│   ├── MarkDefs.astro    # the brand mark <symbol>
│   ├── SectionHead.astro
│   ├── Wordmark.astro · Footer.astro · LegalDoc.astro · SiteSections.astro
├── i18n/config.ts        # locales, lang resolution, path helpers
├── lib/content.ts        # full bilingual content model
├── layouts/Base.astro    # head, meta, JSON-LD, nav, footer, global effects
├── pages/                # index.astro (PT), en/index.astro (EN), legal pages, 404
├── scripts/
│   ├── site-effects.ts   # Lenis, reveals, parallax, progress bar, theme fades
│   ├── hero-canvas.ts    # the hero Canvas 2D scene
│   └── vision-sequence.ts# the pinned extraction sequence
└── styles/global.css     # Tailwind + @theme brand tokens + base + keyframes
```

Brand assets (logos, favicons, OG card) live in `public/brand`.

## Legal guardrails

Algacore is a venture in formation. The site must never read as an operating,
registered company or as an investment solicitation. The rules that govern the
copy (no registration symbols, no legal name or CNPJ, capacity in target voice,
sourced numbers, non-offer disclaimer, the legal and privacy pages) are written
out in `CLAUDE.md` at the repo root. Read it before touching page copy.
