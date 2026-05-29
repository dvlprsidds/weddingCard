"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-06-24T12:32:00+05:30"); // 24th June 2026, Indian Standard Time

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateTime = () => {
      const difference = +TARGET_DATE - +new Date();
      let newTime: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTime);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden select-none" id="wedding-hero">
      {/* Background cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0103]/80 via-transparent to-[#0c0103]" />

      {/* Floating flower silhouettes in background using pure CSS glow shadows */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl flex flex-col items-center mt-8">
        
        {/* Sanskrit Auspicious Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          className="text-amber-400 text-xs md:text-sm tracking-[0.3em] font-sans uppercase mb-6 flex items-center gap-2 font-bold"
        >
          <span className="text-amber-500">🪔</span> ಶುಭ ವಿವಾಹ <span className="text-amber-500">🪔</span>
        </motion.div>

        {/* The Royal Wedding of */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] text-stone-400 uppercase mb-4"
        >
          THE WEDDING CELEBRATION
        </motion.p>

        {/* Grand Bride & Groom Names Reveal */}
        <h1 className="font-cinzel text-5xl md:text-8xl font-bold tracking-widest text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.15)] leading-tight uppercase my-4">
          Siddu
          <span className="font-script text-champagne text-4xl md:text-6xl font-normal lowercase block md:inline tracking-normal mx-4 md:-translate-y-2">
            and
          </span>
          Shyamala
        </h1>

        {/* Romantic quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-script text-stone-300 text-2xl md:text-3xl mt-4 mb-10 max-w-xl leading-relaxed py-1"
        >
          “Two souls with but a single thought, two hearts that beat as one.”
        </motion.p>

        {/* Date & Location overlay */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mb-14 font-cinzel text-xs tracking-[0.2em] text-amber-100"
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>JUNE 24, 2026</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-amber-500/50" />
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>LOKAPURA, KARNATAKA</span>
          </div>
        </motion.div>

        {/* COUNTDOWN TIMER WIDGET */}
        {isClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 1.2 }}
            className="glass-card py-6 px-4 md:px-10 rounded-2xl flex items-center justify-center gap-4 md:gap-10 shadow-2xl relative select-none w-full max-w-lg md:max-w-xl"
            id="countdown-timer-widget"
          >
            {/* Glowing amber perimeter ring */}
            <div className="absolute inset-0 border border-amber-500/15 rounded-2xl pointer-events-none" />

            {/* Days Card */}
            <div className="flex flex-col items-center">
              <span className="font-cinzel text-2xl md:text-4xl font-bold text-gold-gradient tracking-wide">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-2 font-semibold">
                Days
              </span>
            </div>

            <div className="font-cinzel text-amber-500/50 text-xl font-light -translate-y-2">:</div>

            {/* Hours Card */}
            <div className="flex flex-col items-center">
              <span className="font-cinzel text-2xl md:text-4xl font-bold text-gold-gradient tracking-wide">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-2 font-semibold">
                Hours
              </span>
            </div>

            <div className="font-cinzel text-amber-500/50 text-xl font-light -translate-y-2">:</div>

            {/* Minutes Card */}
            <div className="flex flex-col items-center">
              <span className="font-cinzel text-2xl md:text-4xl font-bold text-gold-gradient tracking-wide">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-2 font-semibold">
                Minutes
              </span>
            </div>

            <div className="font-cinzel text-amber-500/50 text-xl font-light -translate-y-2">:</div>

            {/* Seconds Card */}
            <div className="flex flex-col items-center">
              <span className="font-cinzel text-2xl md:text-4xl font-bold text-yellow-400/90 tracking-wide">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-2 font-semibold">
                Seconds
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Indian Mandap floral hanging lines representation */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
      
      {/* Down arrow scroll helper */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-1 opacity-70"
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-stone-400 font-medium">Scroll to Discover</span>
        <div className="w-1.5 h-1.5 border-b-2 border-r-2 border-amber-500 rotate-45 mt-1" />
      </motion.div>
    </section>
  );
}
