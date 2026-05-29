"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Global utilities
import CustomCursor from "@/components/CustomCursor";
import SparklesCanvas from "@/components/SparklesCanvas";
import MusicController from "@/components/MusicController";
import IntroScreen from "@/components/IntroScreen";

// Page sections
import Hero from "@/components/sections/Hero";
import EventDetails from "@/components/sections/EventDetails";
import FlipInvitation from "@/components/sections/FlipInvitation";
import FamilySection from "@/components/sections/FamilySection";
import PhotoGallery from "@/components/sections/PhotoGallery";
import VenueSection from "@/components/sections/VenueSection";
import GrandFinale from "@/components/sections/GrandFinale";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll until the magical wedding envelope is opened
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">
      {/* 1. Global Luxury Utilities */}
      <CustomCursor />
      <SparklesCanvas />
      <MusicController shouldPlay={isOpen} />

      {/* 2. Opening Experience: 3D envelope card unfolding overlay */}
      <IntroScreen onOpen={() => setIsOpen(true)} />

      {/* 3. Immersive Main Page Sections */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="royal-bg-pattern relative z-20 w-full"
            id="main-wedding-content"
          >
            {/* Wedding sections sequentially aligned for smooth scroll */}
            <Hero />
            <EventDetails />
            <FlipInvitation />
            <FamilySection />
            <PhotoGallery />
            <VenueSection />
            <GrandFinale />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
