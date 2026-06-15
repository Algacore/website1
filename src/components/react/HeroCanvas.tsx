import { useEffect, useRef } from "react";

/**
 * Living brand canvas: a horizontal "current" through a closed photobioreactor.
 * Helical spirulina filaments stream sideways as beaded sine strands, each
 * carrying a bright travelling glint so the flow direction reads instantly. A
 * scatter of rising microbubbles, a soft phycocyanin extraction glow echoing the
 * mark's node, and a few highlight dots that sit dim and flare only occasionally
 * (quiet, clinical, not a light show).
 *
 * Motion is frame-rate independent (time-delta driven), so it looks identical on
 * 60/120/144 Hz. The render loop is crash-proof: a draw error is logged once but
 * never breaks the requestAnimationFrame chain (so the hero can't freeze on a
 * single bad frame). Counts + DPR are capped; paused offscreen / on hidden tab.
 * Robust to zero-size mounts (falls back to viewport, re-measures via
 * ResizeObserver). Under prefers-reduced-motion it keeps a slow, clearly visible
 * drift (no pointer parallax, no flaring) rather than freezing to a dead frame.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced-motion still flows, just calmer (slower current, no parallax, no flares).
    const speedMul = prefersReduced ? 0.55 : 1;
    const flaresOn = !prefersReduced;
    const parallaxOn = !prefersReduced;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let filaments: any[] = [];
    let motes: any[] = [];
    let phycoNodes: any[] = [];
    let targetX = 0.5;
    let targetY = 0.5;
    let parX = 0;
    let parY = 0;
    let raf = 0;
    let running = false;
    let last = 0; // timestamp of previous frame, for dt
    let warned = false;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const nF = W < 700 ? 7 : 11;
      filaments = [];
      for (let i = 0; i < nF; i++) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        filaments.push({
          y: ((i + 0.5) / nF) * H * 0.92 + H * 0.04,
          amp: rand(24, 70),
          wavelength: rand(140, 280),
          dir,
          // Horizontal flow in px/sec: the whole waveform streams sideways.
          vx: rand(46, 92),
          beadGap: rand(11, 16),
          coilFreq: rand(0.016, 0.03),
          depth: rand(0.45, 1),
          drift: rand(-10, 10),
          driftPhase: rand(0, Math.PI * 2),
          alpha: rand(0.26, 0.5),
          // A bright glint head that sweeps along the strand, px/sec.
          glintOffset: rand(0, 1),
          glintSpeed: rand(70, 150),
        });
      }
      const nM = W < 700 ? 26 : 44;
      motes = [];
      for (let j = 0; j < nM; j++) {
        motes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: rand(0.8, 2.6),
          // px/sec
          vx: rand(-12, 12),
          vy: rand(-58, -20),
          a: rand(0.25, 0.7),
          depth: rand(0.3, 1),
        });
      }
      // Phycocyanin highlight nodes: dim at rest, flare briefly and rarely.
      const nP = W < 700 ? 4 : 6;
      phycoNodes = [];
      for (let k = 0; k < nP; k++) {
        phycoNodes.push({
          x: rand(W * 0.08, W * 0.92),
          y: rand(H * 0.1, H * 0.9),
          r: rand(2.4, 4),
          glowR: rand(22, 46),
          phase: rand(0, Math.PI * 2),
          // Slow cycle so flares feel occasional, not a strobe.
          speed: rand(0.14, 0.3),
          depth: rand(0.4, 1),
        });
      }
    }

    function measure() {
      let w = canvas!.clientWidth;
      let h = canvas!.clientHeight;
      // Zero-size mount (layout not settled) must not freeze the canvas.
      if (!w || !h) {
        w = window.innerWidth;
        h = canvas!.parentElement?.clientHeight || window.innerHeight;
      }
      W = w;
      H = h;
    }

    function resize() {
      measure();
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(t: number, dt: number) {
      // dt in seconds, clamped so a long pause (tab refocus) can't teleport things.
      const ts = t / 1000;
      ctx!.clearRect(0, 0, W, H);
      if (parallaxOn) {
        parX += (targetX - 0.5 - parX) * 0.05;
        parY += (targetY - 0.5 - parY) * 0.05;
      }

      // Soft central extraction glow, echoing the mark's node.
      const pulse = 0.5 + 0.5 * Math.sin(ts * 1.1 * speedMul);
      const nodeX = W * 0.78 + parX * 26;
      const nodeY = H * 0.4 + parY * 18;
      const nodeR = Math.max(1, Math.min(W, H) * 0.42);
      const g = ctx!.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, nodeR);
      g.addColorStop(0, "rgba(115, 197, 255, " + (0.16 + 0.1 * pulse).toFixed(3) + ")");
      g.addColorStop(0.5, "rgba(54, 169, 245, 0.05)");
      g.addColorStop(1, "rgba(54, 169, 245, 0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);

      ctx!.beginPath();
      ctx!.arc(nodeX, nodeY, 2.4 + pulse * 1.8, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(208, 238, 255, " + (0.5 + 0.4 * pulse).toFixed(3) + ")";
      ctx!.fill();

      // Streaming helical filaments. The whole waveform translates sideways
      // (clear current) and a bright glint sweeps along it.
      for (let i = 0; i < filaments.length; i++) {
        const f = filaments[i];
        // px the pattern has scrolled; signed by dir.
        const flow = ts * f.vx * f.dir * speedMul;
        const offX = parX * 34 * f.depth;
        const offY = parY * 22 * f.depth + Math.sin(ts * 0.45 * speedMul + f.driftPhase) * f.drift;
        // Glint head position, wrapping across the field, travelling with the current.
        const span = W + 80;
        const gRaw = (f.glintOffset * span + ts * f.glintSpeed * f.dir * speedMul) % span;
        const headX = (gRaw < 0 ? gRaw + span : gRaw) - 40;
        for (let x = -20; x <= W + 20; x += f.beadGap) {
          const s = x + flow;
          const y = f.y + offY + f.amp * Math.sin(s / f.wavelength);
          const d = Math.sin(s * f.coilFreq);
          const dn = d * 0.5 + 0.5;
          const r = 1 + dn * 2.4;
          // Distance to the glint head as a soft falloff.
          const gd = Math.abs(x - headX);
          const glow = Math.exp(-(gd * gd) / 8000);
          const a = f.alpha * (0.45 + dn * 0.55) + glow * 0.55;
          const tint = 165 + Math.round(glow * 60);
          ctx!.beginPath();
          ctx!.arc(x + offX, y, r + glow * 1.8, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(115, 197, " + tint + ", " + Math.min(0.95, a).toFixed(3) + ")";
          ctx!.fill();
        }
      }

      // Rising microbubbles (slow current of particulate).
      for (let m = 0; m < motes.length; m++) {
        const p = motes[m];
        p.x += (p.vx + parX * 26 * p.depth) * dt * speedMul;
        p.y += p.vy * dt * speedMul;
        if (p.y < -6) {
          p.y = H + 6;
          p.x = Math.random() * W;
        }
        if (p.x < -6) p.x = W + 6;
        else if (p.x > W + 6) p.x = -6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(209, 238, 255, " + p.a.toFixed(3) + ")";
        ctx!.fill();
      }

      // Phycocyanin highlight dots: dim baseline, occasional quiet flare.
      for (let k = 0; k < phycoNodes.length; k++) {
        const n = phycoNodes[k];
        const ph = n.phase + ts * n.speed * speedMul;
        // sin^4 stays low most of the cycle, peaks briefly => occasional but seen.
        const sn = Math.max(0, Math.sin(ph));
        const sq = sn * sn;
        const flare = flaresOn ? sq * sq : 0.2;
        const nx = n.x + parX * 28 * n.depth;
        const ny = n.y + parY * 18 * n.depth;
        const gR = n.glowR * (0.85 + flare * 0.65);
        const gr = ctx!.createRadialGradient(nx, ny, 0, nx, ny, Math.max(1, gR));
        gr.addColorStop(0, "rgba(0, 142, 221, " + (0.1 + 0.4 * flare).toFixed(3) + ")");
        gr.addColorStop(0.5, "rgba(54, 169, 245, " + (0.07 * flare).toFixed(3) + ")");
        gr.addColorStop(1, "rgba(54, 169, 245, 0)");
        ctx!.beginPath();
        ctx!.arc(nx, ny, Math.max(1, gR), 0, Math.PI * 2);
        ctx!.fillStyle = gr;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(nx, ny, n.r * (0.75 + flare * 0.5), 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(115, 197, 255, " + (0.35 + 0.55 * flare).toFixed(3) + ")";
        ctx!.fill();
      }

      // Readability scrim: page-colored wash drawn last so the moving art sits
      // behind the copy. Heaviest over the left third (headline + sub live there),
      // fading to near-clear on the right so the extraction glow still reads.
      const scrim = ctx!.createLinearGradient(0, 0, W, 0);
      scrim.addColorStop(0, "rgba(15, 46, 61, 0.46)");
      scrim.addColorStop(0.42, "rgba(15, 46, 61, 0.26)");
      scrim.addColorStop(0.7, "rgba(15, 46, 61, 0.08)");
      scrim.addColorStop(1, "rgba(15, 46, 61, 0)");
      ctx!.fillStyle = scrim;
      ctx!.fillRect(0, 0, W, H);
    }

    function loop(t: number) {
      // dt in seconds, clamped (first frame + tab refocus shouldn't jump).
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
      last = t;
      try {
        draw(t, dt);
      } catch (err) {
        // A single bad frame must never freeze the hero: log once, keep going.
        if (!warned) {
          warned = true;
          console.error("[HeroCanvas] draw error (animation continues):", err);
        }
      }
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    // ResizeObserver catches late layout (fonts, svh settling) that window resize misses.
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement || canvas);
    }

    const onPointer = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };
    // Pause only when the tab is hidden (battery). We deliberately do NOT gate on
    // an IntersectionObserver: with Lenis + ScrollTrigger reflowing the page, the
    // observer can report the on-screen hero as "not intersecting" at rest and
    // freeze the canvas for good. The render loop is cheap and capped, so running
    // it whenever the tab is visible is the robust choice.
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    // Pointer parallax is the one thing reduced-motion users opt out of.
    if (parallaxOn) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      ro?.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true" />;
}
