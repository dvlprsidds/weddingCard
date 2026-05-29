"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface FamilyMember {
  id: number;
  relation: string;
  names: string;
  note: string;
  side: "groom" | "bride";
}

export default function FamilySection() {
  const familyData: FamilyMember[] = [
    // Groom's Family
    {
      id: 1,
      relation: "Groom's Parents",
      names: "Late Shri Lakshmana Siddappa Byakod & Mrs. Bharati Byakod",
      note: "With ancestral blessings and maternal guidance, welcoming you to our family with open arms.",
      side: "groom",
    },
    {
      id: 2,
      relation: "Groom's Close Inviters",
      names: "Sri Krishna Yallappa Mareguddi & Smt. Bhageerathi Krishna Mareguddi",
      note: "Eagerly waiting to celebrate, dance, and welcome our new daughter into the family.",
      side: "groom",
    },
    // Bride's Family
    {
      id: 3,
      relation: "Bride's Parents",
      names: "Mr. Basappa Siddappa Krishnagoudar & Mrs. Shantavva Krishnagoudar",
      note: "Sending our beloved daughter towards a beautiful new dawn in her wedded life with infinite blessings.",
      side: "bride",
    },
    {
      id: 4,
      relation: "Bride's Close Inviters",
      names: "Sri Balachandra Hanumanta Krishnagoudar & Smt. Sharada Balachandra Krishnagoudar",
      note: "Excited to orchestrate the grand wedding festivities and welcome our dear son-in-law.",
      side: "bride",
    },
  ];

  const groomFamily = familyData.filter((member) => member.side === "groom");
  const brideFamily = familyData.filter((member) => member.side === "bride");

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0c0305]" id="family-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            OUR LOVED ONES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            Family Pillars
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Dual Column Layout (Groom Side vs Bride Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* GROOM'S SIDE COLUMN */}
          <div className="space-y-8 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-cinzel text-lg tracking-[0.25em] text-amber-300 border-b border-amber-500/20 pb-3 uppercase w-full text-center"
            >
              Groom&apos;s Family
            </motion.h3>

            <div className="space-y-6 w-full max-w-lg">
              {groomFamily.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 rounded-2xl border border-amber-500/10 text-center relative overflow-hidden glass-card-gold-hover clickable-element group"
                >
                  <div className="absolute top-3 right-3 text-amber-500/20 group-hover:text-amber-400 transition-colors">
                    <Heart className="w-3 h-3" />
                  </div>

                  <span className="font-cinzel text-[9px] tracking-[0.25em] text-amber-500/70 uppercase block mb-2 font-bold">
                    {member.relation}
                  </span>
                  
                  <h4 className="font-cinzel text-lg font-bold tracking-wider text-amber-100 mb-3 group-hover:text-gold-200 transition-colors">
                    {member.names}
                  </h4>
                  
                  <p className="font-sans text-[11px] md:text-xs text-stone-400 leading-relaxed font-light">
                    {member.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BRIDE'S SIDE COLUMN */}
          <div className="space-y-8 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-cinzel text-lg tracking-[0.25em] text-amber-300 border-b border-amber-500/20 pb-3 uppercase w-full text-center"
            >
              Bride&apos;s Family
            </motion.h3>

            <div className="space-y-6 w-full max-w-lg">
              {brideFamily.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 rounded-2xl border border-amber-500/10 text-center relative overflow-hidden glass-card-gold-hover clickable-element group"
                >
                  <div className="absolute top-3 right-3 text-amber-500/20 group-hover:text-amber-400 transition-colors">
                    <Sparkles className="w-3 h-3" />
                  </div>

                  <span className="font-cinzel text-[9px] tracking-[0.25em] text-amber-500/70 uppercase block mb-2 font-bold">
                    {member.relation}
                  </span>
                  
                  <h4 className="font-cinzel text-lg font-bold tracking-wider text-amber-100 mb-3 group-hover:text-gold-200 transition-colors">
                    {member.names}
                  </h4>
                  
                  <p className="font-sans text-[11px] md:text-xs text-stone-400 leading-relaxed font-light">
                    {member.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
