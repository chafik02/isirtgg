'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VisualBreakSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <Image
          src="/images/steps-visual.png"
          alt="IT-Fix Workflow"
          fill
          className="object-cover opacity-60"
          onError={(e) => {
             e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-[-1]"></div>
      </motion.div>

      {/* Dark Gradient Overlays for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/50 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] via-transparent to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl">
            From Broken <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
               to Fixed.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto drop-shadow-lg">
            We handle the chaos so you can focus on what matters. Experience the next generation of IT support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
