"use client";

import { useEffect, useRef } from "react";

type Layer = {
  amp: number; // crest height as fraction of canvas height
  len: number; // primary wavelength in px
  speed: number; // px/frame phase drift (sign = direction)
  phase: number;
  base: number; // resting surface as fraction of canvas height (0 = top)
  top: string;
  bottom: string;
  foam: boolean;
};

const LAYERS: Layer[] = [
  { amp: 0.12, len: 360, speed: 0.45, phase: 0.0, base: 0.14, top: "rgba(150,210,240,0.5)", bottom: "rgba(70,150,200,0.5)", foam: false },
  { amp: 0.16, len: 520, speed: -0.30, phase: 2.1, base: 0.30, top: "#7fc6ea", bottom: "#3f8fc4", foam: true },
  { amp: 0.12, len: 240, speed: 0.62, phase: 4.2, base: 0.42, top: "#5fb2dd", bottom: "#2f78ac", foam: true },
];

export function Waves({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 1;
    let h = 1;
    let t = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const surfaceY = (x: number, l: Layer) => {
      const k1 = (Math.PI * 2) / l.len;
      const k2 = (Math.PI * 2) / (l.len * 0.45);
      const primary = Math.sin(k1 * x + l.speed * t * 0.04 + l.phase);
      const detail = Math.sin(k2 * x - l.speed * 1.7 * t * 0.04 + l.phase * 1.3);
      return h * l.base + h * l.amp * (0.7 * primary + 0.3 * detail);
    };

    const drawLayer = (l: Layer) => {
      const step = 5;
      const pts: Array<[number, number]> = [];
      for (let x = 0; x <= w + step; x += step) pts.push([x, surfaceY(x, l)]);

      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(pts[0][0], pts[0][1]);
      for (const [x, y] of pts) ctx.lineTo(x, y);
      ctx.lineTo(w, h);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, h * l.base - h * l.amp, 0, h);
      g.addColorStop(0, l.top);
      g.addColorStop(1, l.bottom);
      ctx.fillStyle = g;
      ctx.fill();

      if (l.foam) {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (const [x, y] of pts) ctx.lineTo(x, y);
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,255,255,0.30)";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const l of LAYERS) drawLayer(l);
      if (!reduce) {
        t += 1;
        raf = requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
