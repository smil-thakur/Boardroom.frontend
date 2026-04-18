import React, { useEffect, useRef } from "react";

const MinimalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const SPACING = 40;
    const DASH_LENGTH = 12;
    const INTERACTIVE_RADIUS = 180;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.08 : 0.06;
      const activeAlpha = isDark ? 0.35 : 0.2;
      const r = isDark ? 255 : 0;
      const g = isDark ? 255 : 0;
      const b = isDark ? 255 : 0;

      for (let x = SPACING; x < width; x += SPACING) {
        for (let y = SPACING; y < height; y += SPACING) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ambient wave: gentle sine ripple across the grid
          const wave = Math.sin(x * 0.015 + time * 2) * Math.cos(y * 0.015 + time * 1.5);
          const ambientAngle = wave * Math.PI * 0.3;

          let angle = ambientAngle;
          let alpha = baseAlpha;
          let length = DASH_LENGTH;

          if (dist < INTERACTIVE_RADIUS) {
            const factor = 1 - dist / INTERACTIVE_RADIUS;
            const easedFactor = factor * factor; // ease-in-out

            // Point dashes toward cursor
            const cursorAngle = Math.atan2(dy, dx);
            angle = ambientAngle + (cursorAngle - ambientAngle) * easedFactor;

            // Brighten and grow near cursor
            alpha = baseAlpha + (activeAlpha - baseAlpha) * easedFactor;
            length = DASH_LENGTH + easedFactor * 6;
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.moveTo(-length / 2, 0);
          ctx.lineTo(length / 2, 0);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default MinimalBackground;
