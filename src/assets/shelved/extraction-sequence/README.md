# Extraction sequence (shelved)

Pinned, scrub-driven scroll scene. Built in commit `a9b9988`, lived at the top
of `src/components/sections/Vision.astro` (above the chapter 01 heading), and
was removed from the site on 2026-09-12. Nothing imports these files.

Kept because the idea is good and may be worth reviving once the bugs below are
fixed and the site has a real reason to spend 2.5 viewports of scroll on it.

## What it does

Full-bleed dark stage, 100svh, pinned while the timeline scrubs through three
beats:

1. **Filament field.** Eleven sine strands in Phyco 300, each out of phase with
   its neighbours. Reads as a loose spirulina culture.
2. **Convergence.** Filaments shrink (`scale 0.42`, stagger `from: "edges"`)
   and dim while the Algacore mark, the closed vessel, resolves out of them.
3. **Flood.** Filaments go to zero, the mark fills with Phyco 500, a radial
   glow opens behind it, and the ground tweens from Cyano 900 to `#00416f`.

So: dispersed biomass, then the closed vessel captures it, then the pigment.
A headline and a row of progress ticks track the beat.

## Files

| File | Role |
|------|------|
| `ExtractionSequence.astro` | Markup, scoped CSS, mount script. Props: `eyebrow`, `stages` (3 strings, in animation order). |
| `extraction-sequence.ts` | GSAP + ScrollTrigger timeline. Exports `mountExtractionSequence(root)`. |

Dependencies already in the project: `gsap`, `gsap/ScrollTrigger`. The scene
draws the mark via `<use href="#mark">`, so `MarkDefs.astro` must be in the
page (it is, from `Base.astro`).

## Why it was removed

It was decorative only. Every word it showed was already on the page, in the
`ProcessFlow` diagram roughly 600px below it, and it carried no argument the
premise needed. It also hid itself entirely below 768px and under
`prefers-reduced-motion`, so it earned nothing on mobile.

## Known bugs, fix these before reviving

1. **Labels ran against the visuals.** It was fed `vision.stages`, which is
   ordered for the process diagram: closed photobioreactor, spirulina biomass,
   phycocyanin. The animation plays biomass, vessel, pigment. So beat 1 said
   "closed photobioreactor" over loose filaments and beat 2 said "spirulina
   biomass" as the vessel appeared. It needs its own three strings in
   animation order, not the `ProcessFlow` array.
2. **Duplicate copy.** It also reused `vision.flowEyebrow`, so "O processo"
   appeared twice in one section.
3. **Off the grid.** `.vseq` sat outside `.container` and `.section-pad` has no
   inline padding, so the headline hung off the raw viewport edge while every
   other block on the page aligns to the 1180px container. Keep the stage
   full-bleed, put the copy in a container.
4. **No `ScrollTrigger.refresh()` after unhide.** The block ships with `hidden`
   and the script clears it at mount, which grows the document by ~100vh after
   `site-effects.ts` has already refreshed. Every trigger created earlier ends
   up with stale start and end values. Refresh after unhiding.
5. **`preserveAspectRatio="xMidYMid slice"`** on a 1200x700 viewBox in a
   full-width 100svh stage crops the filaments on tall windows and the mark on
   ultrawide ones.
6. **Too long.** `end: "+=250%"` locks 2.5 viewports for three beats, right
   after the hero, before the reader has been given an argument. Around 180%
   is closer.
7. **Minor.** `.vseq-labels` has `min-height: clamp(2.6rem, 6vw, 4rem)` while
   `.vseq-label` reaches `3.4rem`, so the line box overruns the min-height on
   large screens and crowds the ticks.

## How to revive

1. Move both files back into the build (`src/components/sections/` and
   `src/scripts/`), or import them from here.
2. Fix the bugs above, starting with 1 and 3.
3. Mount it. It reads better as its own component between `Band` and `Vision`
   in `SiteSections.astro` than as a lid on top of `Vision`, which is how it
   actually behaved.
