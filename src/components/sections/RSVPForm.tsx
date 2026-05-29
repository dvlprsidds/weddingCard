"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Users, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Safely parse URL parameters on client side to pre-fill inputs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const guestVal = searchParams.get("guest");
      const countVal = searchParams.get("count");
      
      if (guestVal) {
        setName(decodeURIComponent(guestVal).replace(/\+/g, " "));
      }
      if (countVal) {
        const parsedCount = parseInt(countVal, 10);
        if (!isNaN(parsedCount) && parsedCount > 0) {
          setCount(parsedCount);
        }
      }
    }
  }, []);

  const triggerLuxuryConfetti = () => {
    // Custom luxury gold, cream, and velvet maroon confetti palettes
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#d4af37", "#f3e5ab", "#aa771c", "#42060e", "#5e0b16"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isAttending === null) {
      setError("Please select your attendance option.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, count, isAttending, message }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        triggerLuxuryConfetti();
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("RSVP submit error:", err);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0a0103]" id="wedding-rsvp">
      {/* Visual glowing points in backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] gold-glow-spot rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-20">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            JOIN OUR HAPPINESS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Will You Attend?
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Dynamic Card Container for Form or Success */}
        <motion.div
          layout
          className="glass-card rounded-3xl border border-amber-500/20 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden"
          id="rsvp-form-card"
        >
          {/* Subtle floral golden background texture representation */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8 relative z-10"
                id="rsvp-active-form"
              >
                
                {/* 1. Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="rsvp-input-name" className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] uppercase text-amber-400 font-bold">
                    Full Name
                  </label>
                  <input
                    id="rsvp-input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name / family name"
                    className="w-full bg-[#120205]/40 border border-amber-500/20 rounded-xl px-5 py-3.5 font-sans text-xs md:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all"
                  />
                </div>

                {/* 2. Attendance Radio Toggle */}
                <div className="flex flex-col gap-3">
                  <span className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] uppercase text-amber-400 font-bold">
                    Attendance Option
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Accept Card */}
                    <button
                      type="button"
                      id="rsvp-btn-accept"
                      onClick={() => setIsAttending(true)}
                      className={`py-3.5 rounded-xl border font-cinzel text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 clickable-element ${
                        isAttending === true
                          ? "border-amber-400 bg-amber-500/10 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                          : "border-amber-500/15 bg-transparent text-stone-400 hover:border-amber-400/40 hover:text-amber-300"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isAttending === true ? "text-red-500 fill-red-500" : ""}`} />
                      Joyfully Accept
                    </button>

                    {/* Decline Card */}
                    <button
                      type="button"
                      id="rsvp-btn-decline"
                      onClick={() => {
                        setIsAttending(false);
                        setCount(0); // auto reset count
                      }}
                      className={`py-3.5 rounded-xl border font-cinzel text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 clickable-element ${
                        isAttending === false
                          ? "border-amber-400 bg-amber-500/10 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                          : "border-amber-500/15 bg-transparent text-stone-400 hover:border-amber-400/40 hover:text-amber-300"
                      }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {/* 3. Guest Count dropdown - Only display if joyfully accepting */}
                <AnimatePresence>
                  {isAttending === true && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col gap-2 overflow-hidden"
                    >
                      <label htmlFor="rsvp-input-count" className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] uppercase text-amber-400 font-bold flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        Number of Attendees
                      </label>
                      <select
                        id="rsvp-input-count"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full bg-[#120205]/40 border border-amber-500/20 rounded-xl px-5 py-3.5 font-sans text-xs md:text-sm text-stone-100 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all clickable-element"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-stone-900 text-stone-100">
                            {num} {num === 1 ? "Person" : "People"}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Messages Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="rsvp-input-wishes" className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] uppercase text-amber-400 font-bold">
                    Warm Wishes & Notes
                  </label>
                  <textarea
                    id="rsvp-input-wishes"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send your blessings, dress code wishes, or dietary guidelines..."
                    className="w-full bg-[#120205]/40 border border-amber-500/20 rounded-xl px-5 py-3.5 font-sans text-xs md:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all resize-none"
                  />
                </div>

                {/* Feedback Panel (Errors) */}
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 text-xs font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl border border-amber-500/30 text-amber-200 uppercase font-cinzel text-xs tracking-widest flex items-center justify-center gap-3 bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-800 hover:to-maroon-700 hover:border-amber-400/50 shadow-xl transition-all select-none disabled:opacity-50 disabled:pointer-events-none clickable-element"
                  id="rsvp-submit-btn"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      Submit RSVP
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              // STEP 5: SUCCESS THANK YOU MESSAGE LETTER
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 relative z-10 flex flex-col items-center"
                id="rsvp-success-card"
              >
                <div className="w-16 h-16 rounded-full border border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center mb-6 text-amber-400">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                
                <h3 className="font-cinzel text-2xl font-bold tracking-widest text-gold-gradient mb-2 uppercase">
                  Response Recorded!
                </h3>
                
                <p className="font-script text-[#f7e7ce] text-2xl mb-8 leading-relaxed max-w-md">
                  {isAttending
                    ? `Dearest ${name}, we are overjoyed! Eagerly looking forward to welcoming you in Lokapura.`
                    : `Dearest ${name}, we will miss you dearly. Thank you for your warm blessings!`}
                </p>

                <div className="w-12 h-[1px] bg-amber-500/20 mb-8" />
                
                <p className="font-sans text-[10px] tracking-[0.2em] text-stone-500 uppercase font-semibold">
                  With Love & Blessings • Siddu & Shyamala
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
