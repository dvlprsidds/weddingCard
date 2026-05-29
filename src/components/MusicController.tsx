"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicControllerProps {
  shouldPlay: boolean;
}

export default function MusicController({ shouldPlay }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show player and start playing once the envelope is clicked
  useEffect(() => {
    if (shouldPlay) {
      setIsVisible(true);
      setIsPlaying(true);
    }
  }, [shouldPlay]);

  // Set initial volume to 80%
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.8;
    }
  }, [isVisible]);

  // Synchronize playing state with HTML5 audio play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Audio playback was blocked or interrupted:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Synchronize mute state with HTML5 audio muted attribute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
  }, [isMuted]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent clicking master play/pause trigger
    setIsMuted((prev) => !prev);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* HTML5 Audio Player */}
      <audio
        ref={audioRef}
        src="/krishna_flute.mp3"
        loop
        preload="auto"
        style={{ display: "none" }}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
          id="audio-controls-container"
        >
          {/* Soft shehnai text helper on desktop */}
          <div className="hidden md:block glass-card py-1.5 px-3 rounded-full text-[10px] tracking-widest uppercase font-sans font-bold text-amber-300 border border-amber-500/10 shadow-[0_0_10px_rgba(212,175,55,0.05)] select-none">
            {isPlaying ? "Divine Krishna Flute Playing" : "BGM Paused"}
          </div>

          {/* Mute toggle small floating button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="p-3 rounded-full glass-card hover:border-amber-400/40 text-amber-200 transition-all shadow-lg"
            title={isMuted ? "Unmute Flute" : "Mute Flute"}
            id="audio-mute-btn"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          {/* Master playing visualizer button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayback}
            className="relative p-4 rounded-full glass-card hover:border-amber-400/40 text-amber-200 flex items-center justify-center shadow-2xl overflow-hidden group select-none"
            title={isPlaying ? "Pause Music" : "Play Music"}
            id="audio-master-play-btn"
          >
            {/* Visualizer back ring pulsing */}
            {isPlaying && (
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full animate-ping opacity-75" />
            )}

            <div className="flex items-center gap-2 relative z-10">
              {/* Visualizer bars */}
              <div className="flex items-end gap-[2px] h-4 w-5 mr-1">
                <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? "animate-pulse-bar-1" : "h-[40%]"}`} />
                <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? "animate-pulse-bar-2" : "h-[70%]"}`} />
                <span className={`w-[2px] bg-yellow-300 rounded-full ${isPlaying ? "animate-pulse-bar-3" : "h-[30%]"}`} />
                <span className={`w-[2px] bg-amber-500 rounded-full ${isPlaying ? "animate-pulse-bar-4" : "h-[85%]"}`} />
                <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? "animate-pulse-bar-5" : "h-[50%]"}`} />
              </div>

              <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            </div>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
