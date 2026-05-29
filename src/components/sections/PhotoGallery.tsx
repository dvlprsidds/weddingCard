"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  category: string;
}

export default function PhotoGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      id: 1,
      url: "/img1.png",
      caption: "The Royal Union",
      category: "Ceremony",
    },
    {
      id: 2,
      url: "/img2.png",
      caption: "Henna Whispers",
      category: "Mehendi",
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? images.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === images.length - 1 ? 0 : activeIdx + 1);
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0a0103]" id="photo-gallery">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            CAPTURED MEMORIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Love Gallery
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Gallery Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="masonry-grid-box">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: "easeOut" }}
              onClick={() => setActiveIdx(idx)}
              className="relative overflow-hidden rounded-2xl border border-amber-500/10 cursor-pointer shadow-lg group select-none clickable-element break-inside-avoid"
            >
              {/* Image hover zooming container */}
              <div className="relative overflow-hidden w-full h-full">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-auto object-cover transform duration-700 ease-out scale-100 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
              </div>

              {/* Elegant dark overlay revealing on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="font-cinzel text-[8px] tracking-[0.2em] text-amber-400 uppercase font-semibold">
                  {img.category}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-stone-100 tracking-wide mt-1">
                  {img.caption}
                </h4>
                <div className="absolute top-4 right-4 p-2 bg-stone-900/60 rounded-full border border-amber-500/20 text-amber-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FULL SCREEN LIGHTBOX PREVIEW */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-md select-none"
              id="lightbox-overlay"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-6 right-6 p-3 rounded-full glass-card hover:border-amber-400 text-stone-300 hover:text-amber-200 transition-colors clickable-element z-50"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Core Image Slide Container */}
              <div className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center px-12">
                
                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 rounded-full glass-card hover:border-amber-400 text-amber-200 transition-colors clickable-element z-40"
                  id="lightbox-prev-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Lightbox main active image */}
                <motion.img
                  key={activeIdx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={images[activeIdx].url}
                  alt={images[activeIdx].caption}
                  className="max-w-full max-h-[75vh] rounded-xl object-contain border border-amber-500/20 shadow-2xl select-none lightbox-image"
                />

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 rounded-full glass-card hover:border-amber-400 text-amber-200 transition-colors clickable-element z-40"
                  id="lightbox-next-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Bottom Caption bar */}
              <motion.div
                key={`caption-${activeIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mt-6"
              >
                <span className="font-cinzel text-[10px] tracking-[0.25em] text-amber-400 uppercase font-bold block mb-1">
                  {images[activeIdx].category}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-stone-100 tracking-wide uppercase">
                  {images[activeIdx].caption}
                </h3>
                <span className="font-sans text-[9px] text-stone-500 tracking-widest mt-2 block font-semibold">
                  {activeIdx + 1} / {images.length}
                </span>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
