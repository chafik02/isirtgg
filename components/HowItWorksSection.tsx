'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Report the Issue',
    description: 'Submit a ticket through our intuitive portal or simply send an email. AI automatically categorizes and prioritizes it.',
    image: '/images/remplir le form.jpg',
  },
  {
    num: '02',
    title: 'Get Assigned',
    description: 'Our smart routing engine instantly matches your issue with the most qualified available technician.',
    image: '/images/steps-visual.png',
  },
  {
    num: '03',
    title: 'Problem Resolved',
    description: 'Watch the progress in real-time. Confirm the fix and get back to doing your best work.',
    image: '/images/etre notifier.png',
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-24 relative bg-[#0a0a0f] overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">IT-Fix</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            A seamless journey from problem to resolution.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] origin-top"
            style={{ scaleY: lineHeight }}
          ></motion.div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function StepItem({ step, index }: any) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>
      
      {/* Number Circle for Mobile (Desktop handles it differently) */}
      <div className="md:hidden flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 text-2xl font-bold text-white z-10">
        {step.num}
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`flex-1 md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}
      >
        <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
        <p className="text-lg text-white/60 leading-relaxed max-w-md mx-auto md:mx-0">
          {step.description}
        </p>
      </motion.div>

      {/* Center Marker Desktop */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-16 h-16 rounded-full bg-[#0a0a0f] border-4 border-[#1a1a24] z-10 shadow-xl">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
          {step.num}
        </div>
      </div>

      {/* Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="flex-1 w-full md:w-1/2"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#12121a] shadow-2xl p-2 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0f]">
             <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
             />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold z-[-1]">Illustration {step.num}</div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
