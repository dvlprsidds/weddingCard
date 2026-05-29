"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Sparkles, Shirt, X } from "lucide-react";

interface WeddingEvent {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  colorTheme: string; // Tailwind gradient overlay representation
  borderGlow: string; // Box shadow glow color representation
  detailedSchedule: string[];
}

export default function EventDetails() {
  const [activeEvent, setActiveEvent] = useState<WeddingEvent | null>(null);

  const events: WeddingEvent[] = [
    {
      id: 1,
      title: "Engagement Ceremony",
      subtitle: "Entering the Bond of Love",
      date: "JUNE 23, 2026",
      time: "08:30 PM ONWARDS",
      venue: "Belagali Kalyan Mantap, Lokapur",
      dressCode: "Festive Ethnic Wear / Elegant Formal Attire",
      colorTheme: "from-blue-500/20 via-indigo-600/10 to-transparent",
      borderGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:border-blue-400/50",
      detailedSchedule: [
        "08:30 PM - Welcoming of Guests & Auspicious Lamp Lighting",
        "09:00 PM - Exchange of Engagement Rings",
        "09:30 PM - Interactive Couple Musical Dances & Toasts",
        "10:00 PM - Celebration Buffet Dinner Feast",
      ],
    },
    {
      id: 2,
      title: "Haldi Ceremony",
      subtitle: "The Auspicious Turmeric Glow",
      date: "JUNE 23, 2026",
      time: "10:00 PM ONWARDS",
      venue: "Belagali Kalyan Mantap, Lokapur",
      dressCode: "Sunshine Yellow Traditional Attire",
      colorTheme: "from-amber-500/20 via-yellow-600/10 to-transparent",
      borderGlow: "shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:border-amber-400/50",
      detailedSchedule: [
        "10:00 PM - Traditional Haldi Application Rituals",
        "10:30 PM - Sacred Folk Songs & Sister's Shringar Ceremonies",
        "11:00 PM - Late Night Sangeet Beats & Dancing",
      ],
    },
    {
      id: 3,
      title: "Marriage Inside (Lagna Niyama)",
      subtitle: "Sacred Inner Chamber Rituals",
      date: "JUNE 24, 2026",
      time: "09:45 AM ONWARDS",
      venue: "Belagali Kalyan Mantap, Lokapur",
      dressCode: "Traditional White & Gold / Rich Silk Sarees",
      colorTheme: "from-emerald-500/20 via-teal-600/10 to-transparent",
      borderGlow: "shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:border-emerald-400/50",
      detailedSchedule: [
        "09:45 AM - Sacred Gauri Pooja & Kashi Yatra",
        "10:15 AM - Mandap Entrance & Jeerige Bella Rituals",
        "10:45 AM - Kanyadaana Ceremony & Blessings",
        "11:30 AM - Saptapadi (Seven Holy Steps) & Mangalasutra Dharane",
      ],
    },
    {
      id: 4,
      title: "Marriage Stage (Dhare & Reception)",
      subtitle: "The Grand Auspicious Dhare Muhurtha",
      date: "JUNE 24, 2026",
      time: "12:32 PM ONWARDS",
      venue: "Belagali Kalyan Mantap, Lokapur",
      dressCode: "Grand Royal Sherwanis & Designer Silk Sarees",
      colorTheme: "from-red-500/20 via-rose-700/10 to-transparent",
      borderGlow: "shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:border-red-400/50",
      detailedSchedule: [
        "12:32 PM - Shubh Abhijit Lagna Dhare Muhurtha Exchange",
        "01:00 PM - Grand Dhare garland ceremony & Stage Meet-up",
        "01:30 PM - Sumptuous South Indian Wedding Lunch Feast",
        "06:30 PM - Evening Grand Reception & Portrait Sessions",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0c0305]" id="wedding-events">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            THE CELEBRATION SCHEDULE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Wedding Events
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="events-grid-container">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: event.id * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveEvent(event)}
              className={`relative rounded-2xl glass-card border border-amber-500/15 p-6 md:p-8 cursor-pointer select-none transition-all duration-300 group ${event.borderGlow} overflow-hidden clickable-element`}
            >
              {/* Event Background Glow Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${event.colorTheme} pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60`} />

              {/* Glowing Corner sparkle */}
              <span className="absolute top-4 right-4 text-amber-500/30 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500">
                <Sparkles className="w-4 h-4" />
              </span>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="font-cinzel text-[10px] md:text-xs tracking-[0.2em] text-amber-400 uppercase font-semibold">
                    {event.date}
                  </span>
                  
                  <h3 className="font-cinzel text-2xl font-bold tracking-wider text-amber-100 group-hover:text-gold-200 transition-colors mt-2 mb-1">
                    {event.title}
                  </h3>
                  
                  <p className="font-script text-champagne/80 text-lg md:text-xl block mb-6">
                    {event.subtitle}
                  </p>
                </div>

                <div className="space-y-3 font-sans text-xs text-stone-300 font-light border-t border-amber-500/10 pt-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shirt className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="line-clamp-1 italic font-normal text-amber-300/80">{event.dressCode}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <span className="font-cinzel text-[9px] tracking-[0.2em] text-amber-400 uppercase border-b border-amber-500/30 group-hover:border-amber-400 group-hover:text-amber-300 transition-all">
                    View Full Itinerary →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay for Detailed Itinerary */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
              className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md"
              id="event-itinerary-modal"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()} // prevent click through
                className="w-full max-w-lg glass-card border border-amber-500/20 rounded-2xl overflow-hidden relative p-8 bg-[radial-gradient(circle_at_center,#1d0306_0%,#0c0103_100%)]"
              >
                {/* Modal close icon */}
                <button
                  onClick={() => setActiveEvent(null)}
                  className="absolute top-4 right-4 p-2 rounded-full glass-card hover:border-amber-400 text-stone-300 hover:text-amber-200 transition-colors clickable-element"
                  id="modal-close-btn"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Event header details */}
                <span className="font-cinzel text-xs tracking-[0.2em] text-amber-400 font-semibold block mb-2">
                  {activeEvent.date}
                </span>
                
                <h3 className="font-cinzel text-3xl font-bold tracking-wider text-gold-gradient mb-1">
                  {activeEvent.title}
                </h3>
                
                <p className="font-script text-champagne text-2xl mb-6">
                  {activeEvent.subtitle}
                </p>

                {/* Core metadata columns */}
                <div className="space-y-4 font-sans text-sm text-stone-300 border-b border-amber-500/10 pb-6 mb-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs uppercase text-amber-500/60 font-semibold tracking-wider">Timings</span>
                      <span>{activeEvent.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs uppercase text-amber-500/60 font-semibold tracking-wider">Venue</span>
                      <span>{activeEvent.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shirt className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs uppercase text-amber-500/60 font-semibold tracking-wider">Dress Code</span>
                      <span className="text-amber-300">{activeEvent.dressCode}</span>
                    </div>
                  </div>
                </div>

                {/* Custom list itineraries timeline */}
                <h4 className="font-cinzel text-xs tracking-[0.2em] text-amber-400 font-bold uppercase mb-4">
                  Ceremony Itinerary
                </h4>
                
                <div className="space-y-3 pl-1 relative">
                  <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-amber-500/20" />
                  
                  {activeEvent.detailedSchedule.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start relative z-10 text-xs font-sans text-stone-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-stone-950 mt-1 shrink-0" />
                      <span className="leading-relaxed font-light">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveEvent(null)}
                  className="mt-8 w-full py-3 rounded-xl border border-amber-500/30 text-amber-200 uppercase font-cinzel text-xs tracking-widest bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-800 hover:to-maroon-700 hover:border-amber-400/50 shadow-xl transition-all clickable-element"
                  id="modal-submit-close-btn"
                >
                  Close Itinerary
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
