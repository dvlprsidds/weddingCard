"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Position coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for the delayed outer ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate custom cursor on non-touch desktop screens
    const checkDevice = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isDesktop = window.innerWidth >= 768;
      setEnabled(!isTouch && isDesktop);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (!enabled) return;

    // Track mouse coordinates
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Add pointer class to body
    document.documentElement.classList.add("custom-cursor-active");

    window.addEventListener("mousemove", moveCursor);

    // Track hovered interactive elements
    const addHoverEffect = () => setHovered(true);
    const removeHoverEffect = () => setHovered(false);

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .clickable-element, .event-card, .lightbox-image'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", addHoverEffect);
        el.addEventListener("mouseleave", removeHoverEffect);
      });
    };

    // Wait slightly for DOM load, then attach listeners
    const timeout = setTimeout(attachListeners, 500);

    // Watch for dynamically added elements (like lightbox or forms)
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.classList.remove("custom-cursor-active");
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer delayed glowing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/60 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: hovered
            ? "0 0 20px rgba(212, 175, 55, 0.6), inset 0 0 10px rgba(212, 175, 55, 0.4)"
            : "0 0 8px rgba(212, 175, 55, 0.2)",
        }}
        animate={{
          scale: hovered ? 1.6 : 1.0,
          backgroundColor: hovered ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0)",
          borderColor: hovered ? "rgba(255, 243, 196, 0.8)" : "rgba(212, 175, 55, 0.5)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      {/* Inner instant cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-yellow-300 via-amber-500 to-amber-600 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.5 : 1.0,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
    </>
  );
}
