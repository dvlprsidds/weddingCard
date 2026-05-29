"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function FlipInvitation() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Position motion values to support interactive mouse tilts
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Set limits for desktop 3D tilting
  const rotateX = useTransform(y, [-200, 200], [12, -12]);
  const rotateY = useTransform(x, [-200, 200], [-12, 12]);

  // Spring interpolations for smooth physical tilts
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return; // Disable tilt during flipped state for read stability
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0a0103] flex flex-col items-center justify-center" id="3d-flip-invitation">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            INTERACTIVE KEEPSAKE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            The Royal Invitation
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
          <p className="font-sans text-[10px] md:text-xs text-stone-400 uppercase tracking-widest mt-4">
            {isFlipped ? "TAPPED TO REVEAL DETAILS • CLICK CARD TO RESET" : "HOVER TO TILT • CLICK CARD TO FLIP OPEN"}
          </p>
        </div>

        {/* 3D Perspective Card Wrapper */}
        <div className="perspective-2000 w-[300px] h-[450px] md:w-[380px] md:h-[560px] cursor-pointer" id="flip-card-outer">
          <motion.div
            style={{
              rotateX: springX,
              rotateY: springY,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full relative rounded-3xl transform-style-3d shadow-[0_30px_70px_rgba(0,0,0,0.85)] clickable-element"
            id="flip-card-inner"
          >
            
            {/* FRONT SIDE (Velvet Maroon + Gold Filigree Monogram) */}
            <div className="absolute inset-0 backface-hidden rounded-3xl border-2 border-amber-500/20 overflow-hidden flex flex-col justify-between items-center text-center p-8 bg-[radial-gradient(circle_at_center,#42060e_0%,#150204_100%)]">
              {/* Premium Gold corner frame overlays */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-amber-400/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-amber-400/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-amber-400/40 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-amber-400/40 rounded-br-xl pointer-events-none" />

              {/* Decorative top symbol */}
              <div className="text-amber-500/30 text-2xl font-cinzel mt-4 select-none">
                🔱
              </div>

              {/* Main front logo panel */}
              <div className="flex flex-col items-center">
                <span className="font-cinzel text-[9px] tracking-[0.4em] text-amber-500/70 uppercase mb-4">
                  Royal Wedding Invite
                </span>
                
                {/* Gold Crest Frame */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-amber-500/20 bg-amber-500/5 shadow-[0_0_20px_rgba(212,175,55,0.05)] flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/10 animate-spin" style={{ animationDuration: "35s" }} />
                  <div className="font-cinzel text-3xl md:text-4xl font-black text-gold-gradient tracking-wide">
                    S & S
                  </div>
                </div>

                <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-amber-100 uppercase">
                  Siddu & Shyamala
                </h1>
                
                <div className="w-10 h-[1px] bg-amber-500/30 my-3" />
                
                <span className="font-script text-champagne/80 text-xl block leading-none">
                  Save our Date
                </span>
              </div>

              {/* Bottom tag */}
              <div className="flex flex-col items-center mb-4">
                <p className="font-sans text-[8px] md:text-[9px] font-semibold text-stone-400/80 tracking-[0.25em] uppercase">
                  24th JUNE 2026
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-[9px] font-cinzel tracking-widest text-amber-400/60 hover:text-amber-300">
                  <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
                  Tap to Reveal Itinerary
                </div>
              </div>
            </div>

            {/* BACK SIDE (Luxurious Cream/Ivory Calligraphy Card - Flipped 180Y) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl border-2 border-amber-800/20 overflow-hidden flex flex-col justify-between items-center text-center p-6 md:p-8 bg-[radial-gradient(circle_at_center,#fffdf2_0%,#faf6e6_70%,#f0e5c9_100%)] text-[#3b060d]">
              {/* Premium Gold corner frame overlays */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-amber-800/30 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-amber-800/30 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-amber-800/30 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-amber-800/30 rounded-br-lg pointer-events-none" />

              {/* Top Mantra and Icon */}
              <div className="flex flex-col items-center mt-3 select-none">
                <span className="text-amber-800 text-[10px]">🔱</span>
                <span className="font-sans text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-amber-900 uppercase mt-1">
                  || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||
                </span>
              </div>

              {/* Core invitation calligraphic text */}
              <div className="my-2 flex flex-col items-center">
                <p className="font-sans text-[7px] md:text-[8px] text-stone-600 tracking-[0.15em] uppercase font-bold mb-2 max-w-[270px]">
                  MRS. BHARATI BYAKOD & THE LATE SHRI LAKSHMANA SIDDAPPA BYAKOD
                </p>
                <p className="font-sans text-[7px] md:text-[8px] text-stone-500 tracking-[0.1em] uppercase italic mb-3">
                  Request the pleasure of your company on the auspicious wedding of
                </p>
                
                <h3 className="font-cinzel text-lg md:text-xl font-black text-amber-950 tracking-wider uppercase leading-tight">
                  SIDDU <span className="text-stone-500 font-sans text-[9px] font-normal lowercase">(BCA)</span>
                </h3>
                <span className="font-script text-amber-800 text-base my-0.5 font-bold">with</span>
                <h3 className="font-cinzel text-lg md:text-xl font-black text-amber-950 tracking-wider uppercase leading-tight">
                  SHYAMALA <span className="text-stone-500 font-sans text-[9px] font-normal lowercase">(MBA)</span>
                </h3>

                <p className="font-sans text-[7px] md:text-[8px] text-stone-500 tracking-[0.1em] uppercase italic mt-3 max-w-[270px] leading-relaxed">
                  Daughter of Mr. Basappa Siddappa Krishnagoudar & Mrs. Shantavva Krishnagoudar
                </p>
              </div>

              {/* Location & Time bottom details */}
              <div className="border-t border-amber-800/10 pt-4 w-full flex flex-col items-center mb-2">
                <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-cinzel font-bold text-amber-900 tracking-wider">
                  <span>WEDNESDAY</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                  <span>JUNE 24, 2026</span>
                </div>
                
                <p className="font-sans text-[8px] md:text-[9px] text-[#42060e] mt-2 font-bold tracking-wide">
                  AT 12:32 PM (SUBHA ABHIJIT MUHURTHA)
                </p>
                <p className="font-sans text-[8px] md:text-[9px] text-stone-600 mt-1 font-medium tracking-wide">
                  AT BELAGALI KALYAN MANTAP, LOKAPUR
                </p>

                {/* Flip indicator */}
                <div className="flex items-center gap-1.5 mt-5 text-[8px] font-cinzel tracking-widest text-stone-400 font-bold hover:text-amber-800">
                  <RefreshCw className="w-2.5 h-2.5" />
                  Tap to flip front
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
