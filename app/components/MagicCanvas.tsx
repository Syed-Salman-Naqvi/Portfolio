"use client";

import { useEffect, useRef } from "react";

export default function MagicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.5, y: 0.5, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
      pointer.active = true;
    };

    const leave = () => { pointer.active = false; };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const px = pointer.active ? pointer.x * width : width * 0.5 + Math.sin(time * 0.00025) * width * 0.12;
      const py = pointer.active ? pointer.y * height : height * 0.5 + Math.cos(time * 0.00022) * height * 0.12;

      const glow = ctx.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(20,255,236,.16)");
      glow.addColorStop(.35, "rgba(20,255,236,.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(20,255,236,.08)";
      ctx.lineWidth = 1;
      const spacing = 46;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + (px - width / 2) * 0.05, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + (py - height / 2) * 0.05);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="magic-canvas" aria-label="Interactive visual effect" />;
}
