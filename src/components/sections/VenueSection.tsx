"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Compass, Plane, Train } from "lucide-react";

export default function VenueSection() {
  const mapQueryUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.349605705353!2d75.38575007584594!3d16.155700084534724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6b939fa9917d5%3A0xad52be41620a27de!2sLokapur%2C%20Karnataka%20587122!5e0!3m2!1sen!2sin!4v1716962000000!5m2!1sen!2sin";
  const directionLink = "https://www.google.com/maps/place/Belagali+kalyan+mantap.+Lokapur/@16.1549739,75.3782885,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc767001e633fbd:0xa7037dfad7b0a683!8m2!3d16.1549688!4d75.3808634!16s%2Fg%2F11vzdfp7pn?entry=ttu";

  return (
    <section className="relative py-24 px-6 overflow-hidden select-none bg-[#0c0305]" id="wedding-venue">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-amber-400 block mb-3 uppercase"
          >
            LOCATION GUIDELINES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-3xl md:text-5xl font-bold tracking-widest text-gold-gradient uppercase"
          >
            The Venue
          </motion.h2>
          <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mt-4" />
        </div>

        {/* Core Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: VENUE DESCRIPTION & DETAILS */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-amber-400">
                <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "15s" }} />
                <span className="font-cinzel text-xs tracking-[0.25em] uppercase font-bold">The Royal Address</span>
              </div>
              
              <h3 className="font-cinzel text-2xl font-bold text-amber-100 tracking-wider">
                Belagali Kalyan Mantap
              </h3>
              
              <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed font-light">
                Overlooking the beautiful landscapes of Bagalkot district, our wedding takes place inside the majestic dome structures of Lokapur&apos;s premier celebration hall, the Belagali Kalyan Mantap. Join us in celebrating this auspicious occasion in a grand heritage setting.
              </p>

              <div className="flex gap-3 text-xs text-stone-400 pt-2 items-start font-light">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Kadarakoppa Road, Lokapura, Bagalkot District, Karnataka, 587122, India
                </span>
              </div>
            </motion.div>

            {/* Travel Guide Widgets */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 border-t border-amber-500/10 pt-6"
            >
              <h4 className="font-cinzel text-xs tracking-[0.2em] text-amber-400 font-bold uppercase mb-2">
                Traveler&apos;s Guide
              </h4>

              {/* Air Guide */}
              <div className="flex items-start gap-4 text-xs font-sans text-stone-300">
                <Plane className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-100 font-medium">Hubli Airport (HBX) / Belgaum Airport (IXG)</strong>
                  <span className="text-stone-400 font-light">Approx. 130 km (2.5 hours drive to the palace)</span>
                </div>
              </div>

              {/* Rail Guide */}
              <div className="flex items-start gap-4 text-xs font-sans text-stone-300 mt-3">
                <Train className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-100 font-medium">Bagalkot City Railway Station</strong>
                  <span className="text-stone-400 font-light">Approx. 40 km (45 mins drive to the palace)</span>
                </div>
              </div>
            </motion.div>

            {/* Large glowing direct button */}
            <motion.a
              href={directionLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-4 rounded-xl border border-amber-500/30 text-amber-200 uppercase font-cinzel text-xs tracking-widest flex items-center justify-center gap-3 bg-gradient-to-r from-maroon-900 to-maroon-800 hover:from-maroon-800 hover:to-maroon-700 hover:border-amber-400/50 shadow-xl transition-all select-none clickable-element"
              id="venue-navigate-btn"
            >
              <Navigation className="w-4 h-4 text-amber-400 animate-pulse" />
              Navigate Now
            </motion.a>
          </div>

          {/* RIGHT COLUMN: HIGH-END GOLD/DARK EMBEDDED MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden border-2 border-amber-500/20 shadow-2xl relative select-none"
            id="venue-map-wrapper"
          >
            {/* Embedded maps framed directly inside glassmorphism with high-end dark filter overlays */}
            <iframe
              src={mapQueryUrl}
              className="w-full h-full border-0 absolute inset-0 filter invert-90 hue-rotate-190 contrast-110 saturate-60 brightness-90 grayscale-[10%]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Belagali Kalyan Mantap Lokapur Google Map"
              id="google-maps-iframe-widget"
            />
            
            {/* Perimeter gold outline overlays to mesh with borders */}
            <div className="absolute inset-0 border border-amber-500/10 pointer-events-none rounded-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
