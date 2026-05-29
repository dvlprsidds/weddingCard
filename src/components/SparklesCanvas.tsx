"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swingRange: number;
  swingSpeed: number;
  swingAngle: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export default function SparklesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit counts on mobile devices for smooth 60fps performance
    const isMobile = width < 768;
    const maxSparkles = isMobile ? 30 : 65;
    const maxPetals = isMobile ? 8 : 20;

    const sparkles: Sparkle[] = [];
    const petals: Petal[] = [];

    // Luxury Rose/Crimson Petal Shades
    const petalColors = [
      "rgba(191, 15, 46, 0.45)", // Ruby Velvet
      "rgba(148, 11, 33, 0.40)", // Dark Maroon
      "rgba(212, 175, 55, 0.15)", // A few golden petals!
      "rgba(230, 92, 115, 0.45)", // Rose Pink
    ];

    // Initialize Sparkles
    for (let i = 0; i < maxSparkles; i++) {
      sparkles.push(createSparkle(true));
    }

    // Initialize Petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    function createSparkle(randomY = false): Sparkle {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.6 + 0.2),
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.005 + 0.002,
      };
    }

    function createPetal(randomY = false): Petal {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * -height : -20,
        size: Math.random() * 12 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        swingRange: Math.random() * 20 + 10,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      };
    }

    // Draw luxury double curved petal shape
    function drawPetal(c: CanvasRenderingContext2D, p: Petal) {
      c.save();
      c.translate(p.x + Math.sin(p.swingAngle) * p.swingRange, p.y);
      c.rotate(p.rotation);
      c.beginPath();
      
      // Beautiful organic leaf/petal curve
      c.moveTo(0, -p.size / 2);
      c.quadraticCurveTo(p.size / 2, -p.size / 2, p.size / 3, p.size / 2);
      c.quadraticCurveTo(0, p.size, -p.size / 3, p.size / 2);
      c.quadraticCurveTo(-p.size / 2, -p.size / 2, 0, -p.size / 2);

      c.fillStyle = p.color;
      c.fill();
      
      // Fine gold leaf highlights
      c.strokeStyle = "rgba(212, 175, 55, 0.15)";
      c.lineWidth = 0.5;
      c.stroke();
      
      c.restore();
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Gold Sparkles (twinkling gold dust)
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity -= s.fadeSpeed;

        if (s.opacity <= 0 || s.y < 0 || s.x < 0 || s.x > width) {
          sparkles[i] = createSparkle(false);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          // Gold gradient glow color
          ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#d4af37";
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // 2. Draw Translucent Cherry/Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.swingAngle += p.swingSpeed;
        p.rotation += p.rotationSpeed;

        // Reset if it goes below screen or off sides
        if (p.y > height + 20) {
          petals[i] = createPetal(false);
        } else {
          drawPetal(ctx, p);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sparkles-canvas"
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
