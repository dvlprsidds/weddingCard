"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, CalendarPlus, Heart, Sparkles } from "lucide-react";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  fade: number;
  size: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export default function GrandFinale() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    const height = (canvas.height = 400); // fixed height box

    const particles: FireworkParticle[] = [];
    const rockets: Rocket[] = [];
    const colors = ["#d4af37", "#f3e5ab", "#aa771c", "#e65c73", "#ff6b81", "#38ef7d", "#11998e"];

    function createExplosion(x: number, y: number, color: string) {
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          alpha: 1,
          fade: Math.random() * 0.015 + 0.008,
          size: Math.random() * 2 + 1,
          gravity: 0.08,
        });
      }
    }

    function launchRocket() {
      if (rockets.length > 4) return;
      const x = Math.random() * width;
      const y = height + 10;
      const tx = Math.random() * width;
      const ty = Math.random() * (height * 0.6) + 50;
      const angle = Math.atan2(ty - y, tx - x);
      const speed = Math.random() * 4 + 7;
      rockets.push({
        x: x,
        y: y,
        tx: tx,
        ty: ty,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        exploded: false,
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(12, 3, 5, 0.2)"; // trailing fade black
      ctx.fillRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        // Check explosion condition
        if (r.vy >= 0 || r.y <= r.ty) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.fade;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 3;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // Sporadic launches
      if (Math.random() < 0.04) {
        launchRocket();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      createExplosion(clickX, clickY, colors[Math.floor(Math.random() * colors.length)]);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
      }
    };
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const inviteUrl = window.location.origin + window.location.pathname;
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Pre-configured Google Calendar link for June 24, 2026, 12:32 - 20:00 IST
  const calendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Siddu+%26+Shyamala&details=Join+the+celebration+of+the+union+of+Siddu+%26+Shyamala+at+Belagali+Kalyan+Mantap%2C+Lokapur.&dates=20260624T123200/20260624T200000&ctz=Asia/Kolkata";

  return (
    <section 
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden select-none bg-[#0c0305] flex flex-col items-center justify-center text-center" 
      id="wedding-finale"
    >
      
      {/* 1. Canvas Fireworks Backdrop wrapper */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 z-10 opacity-70">
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      </div>

      <div className="relative z-20 max-w-3xl flex flex-col items-center">
        
        {/* Floating floral mandala icon representation */}
        <motion.div
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 mb-8 border border-amber-500/20 rounded-full bg-amber-500/5 flex items-center justify-center text-amber-500"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </motion.div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-4 uppercase"
        >
          AN AUSPICIOUS NEW DAWN
        </motion.p>

        {/* Final large calligraphy statement */}
        <h2 className="font-script text-[#f7e7ce] text-3xl md:text-5xl my-4 leading-relaxed max-w-xl">
          Your blessings are the most precious gift we could request as we begin our forever.
        </h2>

        {/* Grand Typography See you reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="font-cinzel text-3xl md:text-5xl font-black tracking-[0.25em] text-gold-gradient uppercase mt-12 mb-16 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          See You At The Wedding!
        </motion.h1>

        {/* Interaction Action Buttons (Share and Save-The-Date/Calendar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md relative z-30 mb-8" id="finale-action-bar">
          
          {/* Add to Calendar Button */}
          <motion.a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-3.5 rounded-xl border border-amber-500/20 text-stone-300 hover:text-amber-200 uppercase font-cinzel text-[10px] md:text-xs tracking-widest flex items-center justify-center gap-2 bg-[#120205]/40 hover:border-amber-400/50 hover:bg-[#1d0205] shadow-lg transition-all clickable-element"
            id="finale-calendar-btn"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
            Add to Calendar
          </motion.a>

          {/* Share Invitation Button */}
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-3.5 rounded-xl border border-amber-500/20 text-stone-300 hover:text-amber-200 uppercase font-cinzel text-[10px] md:text-xs tracking-widest flex items-center justify-center gap-2 bg-[#120205]/40 hover:border-amber-400/50 hover:bg-[#1d0205] shadow-lg transition-all clickable-element"
            id="finale-share-btn"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            {copied ? "Link Copied!" : "Share Invitation"}
          </motion.button>

        </div>

        {/* Heart sign-off */}
        <div className="flex items-center gap-2 text-stone-500 text-[10px] tracking-widest uppercase font-sans mt-4 font-bold select-none">
          <span>Made With</span>
          <Heart className="w-3 h-3 text-red-700 animate-pulse fill-red-800" />
          <span>For Siddu & Shyamala</span>
        </div>

      </div>
    </section>
  );
}
