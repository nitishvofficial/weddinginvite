import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

const PETAL_COLORS = [
  "rgba(255, 220, 228, ", // soft blush
  "rgba(244, 185, 198, ", // warm rose
  "rgba(230, 160, 178, ", // rose petal
  "rgba(200, 110, 135, ", // burgundy rose
  "rgba(250, 235, 215, ", // antique white
];

const GOLD_COLORS = [
  "#FCE195", // champagne
  "#D4AF37", // metallic gold
  "#E5C158", // bright gold
];

export function PetalsOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize petals
    const PETAL_COUNT = Math.min(30, Math.floor(width / 35));
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: 9 + Math.random() * 11,
      speedY: 0.8 + Math.random() * 1.4,
      speedX: -0.3 + Math.random() * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.015 + Math.random() * 0.02,
      opacity: 0.45 + Math.random() * 0.4,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)] ?? "rgba(255, 220, 228, ",
    }));

    // Initialize golden sparkles
    const SPARKLE_COUNT = 24;
    const sparkles: Sparkle[] = Array.from({ length: SPARKLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.5,
      speedY: 0.3 + Math.random() * 0.6,
      alpha: Math.random(),
      alphaSpeed: 0.02 + Math.random() * 0.03,
      color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)] ?? "#D4AF37",
    }));

    // Draw single organic petal shape
    function drawPetal(p: Petal) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.wobble), 1);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size * 0.6, -p.size * 0.8, -p.size * 0.6, -p.size * 1.4, 0, -p.size * 1.6);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 1.4, p.size * 0.6, -p.size * 0.8, 0, 0);

      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();

      // Delicate center vein
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.2);
      ctx.lineTo(0, -p.size * 1.2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.35})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    }

    // Draw gold sparkle with glow
    function drawSparkle(s: Sparkle) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = Math.abs(Math.sin(s.alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();

      // Tiny cross sparkle
      if (s.radius > 1.2) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.radius * 2, s.y);
        ctx.lineTo(s.x + s.radius * 2, s.y);
        ctx.moveTo(s.x, s.y - s.radius * 2);
        ctx.lineTo(s.x, s.y + s.radius * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    let isRunning = true;

    function render() {
      if (!isRunning || !ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Render sparkles
      for (const s of sparkles) {
        s.y += s.speedY;
        s.alpha += s.alphaSpeed;
        if (s.y > height) {
          s.y = -5;
          s.x = Math.random() * width;
        }
        drawSparkle(s);
      }

      // Render petals
      for (const p of petals) {
        p.y += p.speedY;
        p.x += Math.sin(p.wobble) * 1.1 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (p.y > height + 30) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 25;
        if (p.x > width + 30) p.x = -25;

        drawPetal(p);
      }

      animId = requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full select-none"
    />
  );
}
