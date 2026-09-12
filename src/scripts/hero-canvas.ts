/**
 * Living brand canvas v2: a horizontal "current" through a closed
 * photobioreactor, now with layered depth. Three planes of helical spirulina
 * filaments (far plane thin and dim, near plane bold), drifting caustic light
 * bands composited with "screen" for an underwater glass feel, rising
 * microbubbles, a soft phycocyanin extraction glow and rare quiet flares.
 *
 * Motion is frame-rate independent (time-delta driven). The render loop is
 * crash-proof: a draw error is logged once but never breaks the rAF chain.
 * Counts + DPR are capped; paused on hidden tab. Robust to zero-size mounts.
 * Under prefers-reduced-motion it keeps a slow, clearly visible drift.
 */

interface Filament {
  y: number;
  amp: number;
  wavelength: number;
  dir: number;
  vx: number;
  beadGap: number;
  coilFreq: number;
  depth: number;
  drift: number;
  driftPhase: number;
  alpha: number;
  glintOffset: number;
  glintSpeed: number;
}
interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  depth: number;
}
interface PhycoNode {
  x: number;
  y: number;
  r: number;
  glowR: number;
  phase: number;
  speed: number;
  depth: number;
}
interface Caustic {
  x: number;
  y: number;
  rx: number;
  ry: number;
  vx: number;
  phase: number;
  alpha: number;
}

export function mountHeroCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speedMul = prefersReduced ? 0.55 : 1;
  const flaresOn = !prefersReduced;
  const parallaxOn = !prefersReduced;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let W = 0;
  let H = 0;
  let filaments: Filament[] = [];
  let motes: Mote[] = [];
  let phycoNodes: PhycoNode[] = [];
  let caustics: Caustic[] = [];
  let targetX = 0.5;
  let targetY = 0.5;
  let parX = 0;
  let parY = 0;
  let raf = 0;
  let running = false;
  let last = 0;
  let warned = false;

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  function build() {
    const nF = W < 700 ? 8 : 13;
    filaments = [];
    for (let i = 0; i < nF; i++) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      // Three explicit depth planes: 0.35 far, 0.65 mid, 1 near.
      const plane = i % 3 === 0 ? 0.35 : i % 3 === 1 ? 0.65 : 1;
      filaments.push({
        y: ((i + 0.5) / nF) * H * 0.92 + H * 0.04,
        amp: rand(24, 70) * (0.6 + plane * 0.4),
        wavelength: rand(140, 280),
        dir,
        vx: rand(46, 92) * (0.5 + plane * 0.5),
        beadGap: rand(11, 16),
        coilFreq: rand(0.016, 0.03),
        depth: plane,
        drift: rand(-10, 10),
        driftPhase: rand(0, Math.PI * 2),
        alpha: rand(0.26, 0.5) * (0.45 + plane * 0.55),
        glintOffset: rand(0, 1),
        glintSpeed: rand(70, 150),
      });
    }
    // Depth-sort so near filaments paint over far ones.
    filaments.sort((a, b) => a.depth - b.depth);

    const nM = W < 700 ? 26 : 44;
    motes = [];
    for (let j = 0; j < nM; j++) {
      motes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: rand(0.8, 2.6),
        vx: rand(-12, 12),
        vy: rand(-58, -20),
        a: rand(0.25, 0.7),
        depth: rand(0.3, 1),
      });
    }

    const nP = W < 700 ? 4 : 6;
    phycoNodes = [];
    for (let k = 0; k < nP; k++) {
      phycoNodes.push({
        x: rand(W * 0.08, W * 0.92),
        y: rand(H * 0.1, H * 0.9),
        r: rand(2.4, 4),
        glowR: rand(22, 46),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.14, 0.3),
        depth: rand(0.4, 1),
      });
    }

    // Caustic light bands: broad soft ellipses drifting sideways, screen-blended.
    const nC = W < 700 ? 2 : 3;
    caustics = [];
    for (let c = 0; c < nC; c++) {
      caustics.push({
        x: rand(0, W),
        y: rand(H * 0.05, H * 0.7),
        rx: rand(W * 0.22, W * 0.42),
        ry: rand(H * 0.1, H * 0.22),
        vx: rand(8, 22) * (Math.random() < 0.5 ? -1 : 1),
        phase: rand(0, Math.PI * 2),
        alpha: rand(0.05, 0.1),
      });
    }
  }

  function measure() {
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    if (!w || !h) {
      w = window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
    }
    W = w;
    H = h;
  }

  function resize() {
    measure();
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function draw(t: number, dt: number) {
    const ts = t / 1000;
    ctx!.clearRect(0, 0, W, H);
    if (parallaxOn) {
      parX += (targetX - 0.5 - parX) * 0.05;
      parY += (targetY - 0.5 - parY) * 0.05;
    }

    // Caustic light bands behind everything, screen-composited so overlaps
    // brighten like light through moving water.
    ctx!.save();
    ctx!.globalCompositeOperation = "screen";
    for (let c = 0; c < caustics.length; c++) {
      const b = caustics[c];
      b.x += b.vx * dt * speedMul;
      if (b.x - b.rx > W) b.x = -b.rx;
      else if (b.x + b.rx < 0) b.x = W + b.rx;
      const breathe = 0.85 + 0.15 * Math.sin(ts * 0.3 * speedMul + b.phase);
      const cy = b.y + Math.sin(ts * 0.22 * speedMul + b.phase) * 14 + parY * 12;
      const grad = ctx!.createRadialGradient(b.x, cy, 0, b.x, cy, b.rx * breathe);
      grad.addColorStop(0, `rgba(54, 169, 245, ${(b.alpha * breathe).toFixed(3)})`);
      grad.addColorStop(0.6, `rgba(0, 142, 221, ${(b.alpha * 0.4 * breathe).toFixed(3)})`);
      grad.addColorStop(1, "rgba(0, 142, 221, 0)");
      ctx!.fillStyle = grad;
      ctx!.save();
      ctx!.translate(b.x, cy);
      ctx!.scale(1, b.ry / b.rx);
      ctx!.translate(-b.x, -cy);
      ctx!.beginPath();
      ctx!.arc(b.x, cy, b.rx * breathe, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }
    ctx!.restore();

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

    // Streaming helical filaments, far plane first (already depth-sorted).
    for (let i = 0; i < filaments.length; i++) {
      const f = filaments[i];
      const flow = ts * f.vx * f.dir * speedMul;
      const offX = parX * 34 * f.depth;
      const offY = parY * 22 * f.depth + Math.sin(ts * 0.45 * speedMul + f.driftPhase) * f.drift;
      const span = W + 80;
      const gRaw = (f.glintOffset * span + ts * f.glintSpeed * f.dir * speedMul) % span;
      const headX = (gRaw < 0 ? gRaw + span : gRaw) - 40;
      const beadScale = 0.55 + f.depth * 0.45;
      for (let x = -20; x <= W + 20; x += f.beadGap) {
        const s = x + flow;
        const y = f.y + offY + f.amp * Math.sin(s / f.wavelength);
        const d = Math.sin(s * f.coilFreq);
        const dn = d * 0.5 + 0.5;
        const r = (1 + dn * 2.4) * beadScale;
        const gd = Math.abs(x - headX);
        const glow = Math.exp(-(gd * gd) / 8000);
        const a = f.alpha * (0.45 + dn * 0.55) + glow * 0.55 * f.depth;
        const tint = 165 + Math.round(glow * 60);
        ctx!.beginPath();
        ctx!.arc(x + offX, y, r + glow * 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(115, 197, " + tint + ", " + Math.min(0.95, a).toFixed(3) + ")";
        ctx!.fill();
      }
    }

    // Rising microbubbles.
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

    // Readability scrim: heaviest over the left third (headline + sub),
    // fading right so the extraction glow still reads.
    const scrim = ctx!.createLinearGradient(0, 0, W, 0);
    scrim.addColorStop(0, "rgba(15, 46, 61, 0.46)");
    scrim.addColorStop(0.42, "rgba(15, 46, 61, 0.26)");
    scrim.addColorStop(0.7, "rgba(15, 46, 61, 0.08)");
    scrim.addColorStop(1, "rgba(15, 46, 61, 0)");
    ctx!.fillStyle = scrim;
    ctx!.fillRect(0, 0, W, H);
  }

  function loop(t: number) {
    const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
    last = t;
    try {
      draw(t, dt);
    } catch (err) {
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
  window.addEventListener("resize", resize, { passive: true });

  if ("ResizeObserver" in window) {
    new ResizeObserver(() => resize()).observe(canvas.parentElement || canvas);
  }

  // Pointer parallax is the one thing reduced-motion users opt out of.
  if (parallaxOn) {
    window.addEventListener(
      "pointermove",
      (e: PointerEvent) => {
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
      },
      { passive: true },
    );
  }

  // Pause only when the tab is hidden (battery). Deliberately NOT gated on an
  // IntersectionObserver: with Lenis + ScrollTrigger reflowing the page, the
  // observer can report the on-screen hero as "not intersecting" and freeze
  // the canvas for good. The loop is cheap and capped.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  start();
}
