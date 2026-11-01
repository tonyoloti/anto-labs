import { useEffect, useRef } from 'react';

import { useMouseScrub } from '../hooks/useMouseScrub';

/**
 * Fond animé original, dessiné en canvas : un « globe neuronal » (points
 * reliés, clin d'œil à l'IA) devant un soleil corail. Comme la vidéo du
 * modèle, il ne tourne pas tout seul : sa position suit le mouvement
 * horizontal de la souris (ou du doigt).
 */

const DURATION = 1;
const NODES = 96;
const LINK_DISTANCE = 0.42;
const INK = '23, 20, 26';

type Point = [number, number, number];

/** Points répartis régulièrement sur une sphère (spirale de Fibonacci). */
function sphere(count: number): Point[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = golden * i;
    return [Math.cos(a) * r, y, Math.sin(a) * r];
  });
}

const POINTS = sphere(NODES);
const LINKS: [number, number][] = [];
for (let i = 0; i < NODES; i++) {
  for (let j = i + 1; j < NODES; j++) {
    const [a, b] = [POINTS[i], POINTS[j]];
    if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < LINK_DISTANCE) LINKS.push([i, j]);
  }
}

function draw(canvas: HTMLCanvasElement, t: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Ciel : crème vers pêche.
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#f6f1ea');
  sky.addColorStop(1, '#f7d6c2');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Le globe se place à droite sur grand écran, en haut sur mobile.
  const mobile = w < 768;
  const cx = mobile ? w * 0.55 : w * 0.7;
  const cy = mobile ? h * 0.32 : h * 0.5;
  const radius = Math.min(w, h) * (mobile ? 0.36 : 0.34);

  // Soleil derrière le globe.
  const sunY = cy + Math.sin(t * Math.PI * 2) * radius * 0.06;
  const sun = ctx.createRadialGradient(cx, sunY, 0, cx, sunY, radius * 1.25);
  sun.addColorStop(0, 'rgba(240, 120, 70, 0.55)');
  sun.addColorStop(0.55, 'rgba(244, 150, 100, 0.25)');
  sun.addColorStop(1, 'rgba(246, 200, 170, 0)');
  ctx.fillStyle = sun;
  ctx.beginPath();
  ctx.arc(cx, sunY, radius * 1.25, 0, Math.PI * 2);
  ctx.fill();

  // Rotation du globe selon la position de la « tête de lecture ».
  const yaw = t * Math.PI * 2 * 1.2;
  const pitch = -0.35 + Math.sin(t * Math.PI * 2) * 0.15;
  const [cyaw, syaw, cp, sp] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)];
  const projected = POINTS.map(([x, y, z]) => {
    const x1 = x * cyaw + z * syaw;
    const z1 = -x * syaw + z * cyaw;
    const y2 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    return { x: cx + x1 * radius, y: cy + y2 * radius, depth: (z2 + 1) / 2 };
  });

  ctx.lineWidth = 1;
  for (const [i, j] of LINKS) {
    const a = projected[i];
    const b = projected[j];
    const depth = (a.depth + b.depth) / 2;
    ctx.strokeStyle = `rgba(${INK}, ${0.05 + depth * 0.3})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  for (const p of [...projected].sort((a, b) => a.depth - b.depth)) {
    ctx.fillStyle = `rgba(${INK}, ${0.25 + p.depth * 0.75})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2 + p.depth * 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function ScrubScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const time = useMouseScrub(DURATION, (t) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => canvas.current && draw(canvas.current, t));
  }, 0.12);

  useEffect(() => {
    const redraw = () => canvas.current && draw(canvas.current, time.current);
    redraw();
    window.addEventListener('resize', redraw);
    return () => {
      window.removeEventListener('resize', redraw);
      cancelAnimationFrame(frame.current);
    };
  }, [time]);

  return <canvas ref={canvas} aria-hidden className="fixed inset-0 z-0 h-full w-full" />;
}
