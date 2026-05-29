"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";

interface IntroScreenProps {
  onOpen: () => void;
}

export default function IntroScreen({ onOpen }: IntroScreenProps) {
  const [step, setStep] = useState<"mantra" | "families" | "envelope" | "unfolding" | "completed">("mantra");

  const startInvitationOpening = () => {
    setStep("unfolding");
    // Trigger audio shehnai playing in background and main site reveal sequence
    setTimeout(() => {
      setStep("completed");
      onOpen();
    }, 2800); // Sequence: 1s flap rotation + 1.2s card slide up + 0.6s screen fade
  };

  return (
    <AnimatePresence>
      {step !== "completed" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0c0103] flex flex-col items-center justify-center overflow-hidden px-4 select-none royal-bg-pattern"
          id="intro-screen-overlay"
        >
          {/* Ambient golden lighting pulses */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] gold-glow-spot rounded-full opacity-60 animate-pulse" style={{ animationDuration: "6s" }} />

          {/* BACKGROUND DECORATIVE FLOATING PARTICLES (intro specific visual placeholders) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_60%)] pointer-events-none" />

          {/* STEP 1: SANSRIT MANTRA & GANESHA GLOW */}
          {step === "mantra" && (
            <motion.div
              key="mantra-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2 }}
              onAnimationComplete={() => {
                setTimeout(() => setStep("families"), 4000);
              }}
              className="text-center max-w-xl flex flex-col items-center"
              id="mantra-container"
            >
              {/* Gold floral mandala & deity images side-by-side */}
              <div className="flex items-center justify-center gap-6 md:gap-8 mb-6" id="deities-container">
                {/* Lord Ganesha Image */}
                <div className="relative group select-none">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full border border-amber-500/30 bg-black shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/ganesha_gold.png" 
                      alt="Lord Ganesha" 
                      className="w-full h-full object-cover mix-blend-screen"
                    />
                  </div>
                </div>

                {/* Hemareddy Mallamma Image */}
                <div className="relative group select-none">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full border border-amber-500/30 bg-black shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/mallamma_gold.png" 
                      alt="Saint Hemareddy Mallamma" 
                      className="w-full h-full object-cover mix-blend-screen"
                    />
                  </div>
                </div>
              </div>

              {/* Kannada invocation lines */}
              <div className="flex flex-col items-center gap-1.5 mb-4 select-none">
                <h2 className="font-sans text-amber-500 tracking-[0.2em] text-xs md:text-sm uppercase font-semibold">
                  || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||
                </h2>
                <h2 className="font-sans text-amber-400/90 tracking-[0.15em] text-[10px] md:text-xs uppercase font-medium">
                  || ಶ್ರೀ ಹೇಮರಡ್ಡಿ ಮಲ್ಲಮ್ಮ ದೇವಿ ಪ್ರಸನ್ನ ||
                </h2>
              </div>

              <p className="font-sans text-gold-gradient text-xl md:text-2xl mb-4 py-2 leading-relaxed font-semibold">
                ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ।<br />
                ನಿರ್ವಿಘ್ನಂ ಕುರು ಮೇ ದೇವ ಸರ್ವಕಾರ್ಯೇಷು ಸರ್ವದಾ॥
              </p>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent my-2" />
              <p className="font-sans text-[10px] md:text-xs tracking-[0.15em] text-stone-400/80 uppercase">
                An Auspicious Union... Joining Hearts, Uniting Souls
              </p>
            </motion.div>
          )}

          {/* STEP 2: FAMILIES & INTRODUCTION */}
          {step === "families" && (
            <motion.div
              key="families-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              onAnimationComplete={() => {
                setTimeout(() => setStep("envelope"), 2400);
              }}
              className="text-center max-w-2xl px-6"
              id="intro-families-reveal"
            >
              <h3 className="font-script text-amber-300 text-3xl md:text-4xl mb-3">
                Together with their families
              </h3>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] text-stone-400 uppercase mb-8">
                We cordially invite you to celebrate the union of
              </p>
              <h1 className="font-cinzel text-4xl md:text-6xl font-bold tracking-widest text-gold-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.2)] mb-4 uppercase">
                Siddu <span className="font-script text-champagne text-3xl md:text-5xl lowercase tracking-normal font-normal mr-2">and</span> Shyamala
              </h1>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-6" />
            </motion.div>
          )}

          {/* STEP 3 & 4: 3D ENVELOPE OPENING & UNFOLDING INTERACTION */}
          {(step === "envelope" || step === "unfolding") && (
            <motion.div
              key="envelope-step"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center w-full max-w-lg perspective-2000"
              id="intro-envelope-container"
            >
              {/* Couple Names Cinematic display above the card */}
              <motion.div 
                animate={{ opacity: step === "unfolding" ? 0 : 1 }}
                className="text-center mb-10"
              >
                <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] text-stone-400 uppercase block mb-1">
                  Lokapura, Karnataka
                </span>
                <h1 className="font-cinzel text-2xl md:text-3xl font-semibold tracking-wider text-gold-gradient uppercase">
                  Siddu & Shyamala
                </h1>
                <div className="w-12 h-[1px] bg-amber-500/30 mx-auto mt-2" />
              </motion.div>

              {/* 3D Envelope body */}
              <div 
                className="relative w-[310px] h-[210px] md:w-[420px] md:h-[280px] transform-style-3d shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                id="envelope-3d-model"
              >
                {/* 1. Inside of Envelope Back - Cream Card Pocket Background */}
                <div className="absolute inset-0 bg-[#3b060d] border border-amber-500/10 rounded-b-xl overflow-hidden flex items-end justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4),rgba(0,0,0,0.8))]" />
                  <div className="w-full h-[60%] border-t border-amber-500/10 bg-[#250307]" />
                </div>

                {/* 2. THE INVITATION CARD (Slides out in Step 4) */}
                <motion.div
                  className="absolute left-[3%] top-[4%] w-[94%] h-[92%] glass-card rounded-lg p-5 flex flex-col justify-between items-center text-center overflow-hidden border-2 border-amber-500/30 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] bg-[radial-gradient(ellipse_at_center,#fffdd0_0%,#fffdf2_70%,#f5e5bd_100%)]"
                  style={{ transformStyle: "preserve-3d", zIndex: 5 }}
                  initial={{ y: 0, scale: 1 }}
                  animate={
                    step === "unfolding"
                      ? {
                          y: ["0%", "-35%", "-35%"],
                          scale: [1, 1, 1.3],
                          z: [0, 50, 150],
                          opacity: [1, 1, 0],
                          transition: {
                            duration: 2.6,
                            times: [0, 0.4, 1.0],
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                >
                  {/* Inside card content */}
                  <div className="w-full h-full flex flex-col justify-between items-center border border-amber-500/10 p-2 md:p-4 rounded text-[#3b060d]">
                    <div className="w-4 h-4 border border-amber-800/20 rounded-full flex items-center justify-center text-[7px] text-amber-800">
                      🔱
                    </div>
                    <div>
                      <h4 className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] font-bold text-amber-900 mb-1">
                        WEDDING INVITATION
                      </h4>
                      <h2 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-[#42060e] my-1 uppercase">
                        S & S
                      </h2>
                      <p className="font-script text-amber-800 text-lg md:text-xl my-1 leading-none">
                        Save the Date
                      </p>
                      <p className="font-sans text-[8px] md:text-[9px] font-semibold text-stone-600 tracking-wider">
                        JUNE 24, 2026
                      </p>
                    </div>
                    <div className="font-cinzel text-[6px] md:text-[8px] tracking-[0.1em] text-stone-500 uppercase">
                      Lokapura • India
                    </div>
                  </div>
                </motion.div>

                {/* 3. Envelope Side Flaps (Gilded Velvet Triangles folding inward) */}
                <div 
                  className="absolute inset-0 pointer-events-none transform-style-3d"
                  style={{ zIndex: 10 }}
                >
                  {/* Left Flap */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-0 h-0"
                    style={{
                      borderLeftWidth: "155px",
                      borderLeftColor: "#220306",
                      borderLeftStyle: "solid",
                      borderTopWidth: "105px",
                      borderTopColor: "transparent",
                      borderTopStyle: "solid",
                      borderBottomWidth: "105px",
                      borderBottomColor: "transparent",
                      borderBottomStyle: "solid",
                      filter: "drop-shadow(3px 0 5px rgba(0,0,0,0.4))",
                    }}
                  />
                  {/* Right Flap */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-0 h-0"
                    style={{
                      borderRightWidth: "155px",
                      borderRightColor: "#220306",
                      borderRightStyle: "solid",
                      borderTopWidth: "105px",
                      borderTopColor: "transparent",
                      borderTopStyle: "solid",
                      borderBottomWidth: "105px",
                      borderBottomColor: "transparent",
                      borderBottomStyle: "solid",
                      filter: "drop-shadow(-3px 0 5px rgba(0,0,0,0.4))",
                    }}
                  />
                </div>

                {/* 4. Envelope Bottom Flap */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0 w-0 pointer-events-none"
                  style={{
                    borderBottomWidth: "115px",
                    borderBottomColor: "#1d0205",
                    borderBottomStyle: "solid",
                    borderLeftWidth: "155px",
                    borderLeftColor: "transparent",
                    borderLeftStyle: "solid",
                    borderRightWidth: "155px",
                    borderRightColor: "transparent",
                    borderRightStyle: "solid",
                    zIndex: 11,
                    filter: "drop-shadow(0 -5px 8px rgba(0,0,0,0.4))",
                  }}
                />

                {/* 5. ENVELOPE TOP FLAP (Animates on Y-axis in Step 4) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0 w-0 origin-top transform-style-3d cursor-pointer"
                  style={{
                    borderTopWidth: "115px",
                    borderTopColor: "#320409",
                    borderTopStyle: "solid",
                    borderLeftWidth: "155px",
                    borderLeftColor: "transparent",
                    borderLeftStyle: "solid",
                    borderRightWidth: "155px",
                    borderRightColor: "transparent",
                    borderRightStyle: "solid",
                    zIndex: step === "unfolding" ? 3 : 12,
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
                  }}
                  animate={
                    step === "unfolding"
                      ? {
                          rotateX: [0, -180, -180],
                          transition: {
                            duration: 1.0,
                            times: [0, 0.6, 1.0],
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                />

                {/* 6. Gold seal stamp sitting in front of bottom/side flaps */}
                <AnimatePresence>
                  {step === "envelope" && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 border-2 border-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center select-none"
                      style={{ zIndex: 15 }}
                    >
                      <div className="w-11 h-11 md:w-13 md:h-13 rounded-full border border-amber-300/30 flex items-center justify-center font-cinzel text-amber-100 font-bold text-xs select-none">
                        S & S
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tap to Open Invitation Interactive Seal Button */}
              {step === "envelope" && (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startInvitationOpening}
                  className="mt-14 px-8 py-3.5 rounded-full border border-amber-500/30 text-amber-200 uppercase font-cinzel text-xs tracking-[0.25em] flex items-center gap-3 bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-800 hover:to-maroon-700 hover:border-amber-400/50 shadow-2xl relative group select-none clickable-element"
                  id="tap-to-open-btn"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MailOpen className="w-4 h-4 text-amber-400 group-hover:animate-bounce" />
                  Tap to Open Invitation
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
