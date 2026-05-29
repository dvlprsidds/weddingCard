"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, MapPin } from "lucide-react";

interface StoryItem {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function StoryTimeline() {
  const storyData: StoryItem[] = [
    {
      id: 1,
      date: "DECEMBER 2023",
      title: "The First Glance",
      subtitle: "Lokapura Cultural Festival",
      description: "Under the golden winter sunshine of Karnataka, a chance meeting sparked an unforgettable conversation. Midst books, traditional drums, and royal architecture, two worlds converged, finding an instant, inexplicable connection that changed everything.",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 2,
      date: "APRIL 2024",
      title: "Late Night Conversations",
      subtitle: "Unveiling Hearts Across Miles",
      description: "What began as shared ideals blossomed into hours of midnight sharing. Countless miles melted away over digital letters, laughter, favorite playlist shares, and deep discussions about life, dreams, and our shared values.",
      icon: <Star className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 3,
      date: "OCTOBER 2024",
      title: "The Magical Proposal",
      subtitle: "Belagali Kalyan Mantap",
      description: "Surrounded by warm lanterns and the beautiful landscape of Lokapur, Siddu went down on one knee. With family blessings and the sunset glowing in the backdrop, a tearful, joyous 'YES' was whispered, binding our futures together forever.",
      icon: <Heart className="w-4 h-4 text-red-500 animate-pulse" />,
    },
    {
      id: 4,
      date: "JANUARY 2026",
      title: "Uniting Families",
      subtitle: "The Roka Ceremony",
      description: "Our homes filled with laughter, sweet aromas of marigolds, and blessings. Traditional sweets were shared, hands were joined in sacred trust, and the official path toward our wedded union was happily laid.",
      icon: <MapPin className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0a0103]" id="love-story-timeline">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            OUR ROMANTIC JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Our Love Story
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/10 via-amber-500/40 to-amber-500/10 -translate-x-1/2" />

          {/* Timeline Milestones list */}
          <div className="space-y-16 md:space-y-28">
            {storyData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central glowing icon node */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-9 h-9 rounded-full bg-stone-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Visual story card Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-14">
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? 40 : -40,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card p-6 md:p-8 rounded-2xl border border-amber-500/15 relative overflow-hidden glass-card-gold-hover group"
                    >
                      {/* Interactive internal glowing ambient point */}
                      <span className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors duration-500" />

                      <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] text-amber-500/80 uppercase block mb-2">
                        {item.date}
                      </span>
                      
                      <h3 className="font-cinzel text-xl md:text-2xl font-bold tracking-wider text-amber-100 group-hover:text-gold-200 transition-colors">
                        {item.title}
                      </h3>
                      
                      <span className="font-script text-champagne/80 text-lg md:text-xl block mt-1 mb-4">
                        {item.subtitle}
                      </span>
                      
                      <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
