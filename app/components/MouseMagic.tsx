"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function MouseMagic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const target: Point = { x: -1000, y: -1000 };
    const current: Point = { x: -1000, y: -1000 };
    let active = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      active = true;
    };

    const leave = () => { active = false; };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      if (active && current.x > -500 && current.y > -500) {
        const pulse = 1 + Math.sin(time * 0.004) * 0.06;
        const radius = 230 * pulse;
        const glow = ctx.createRadialGradient(current.x, current.y, 0, current.x, current.y, radius);
        glow.addColorStop(0, "rgba(20,255,236,0.16)");
        glow.addColorStop(0.18, "rgba(20,255,236,0.10)");
        glow.addColorStop(0.48, "rgba(20,255,236,0.035)");
        glow.addColorStop(1, "rgba(20,255,236,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(current.x - radius, current.y - radius, radius * 2, radius * 2);

        ctx.beginPath();
        ctx.arc(current.x, current.y, 72 + Math.sin(time * 0.003) * 8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(20,255,236,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(current.x, current.y, 115 + Math.cos(time * 0.0025) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(20,255,236,0.035)";
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
          const angle = time * 0.00035 + (Math.PI * 2 * i) / 8;
          const distance = 95 + Math.sin(time * 0.002 + i) * 18;
          ctx.beginPath();
          ctx.arc(
            current.x + Math.cos(angle) * distance,
            current.y + Math.sin(angle) * distance,
            1.4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "rgba(20,255,236,0.22)";
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-magic" aria-hidden="true" />;
}
