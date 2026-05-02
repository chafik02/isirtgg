'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[#06060a] border-y border-white/5 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#06060a] to-[#0a0a0f]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem endValue={500} suffix="+" label="Companies using IT-Fix" />
          <StatItem endValue={10000} suffix="+" label="Tickets resolved this month" format />
          <StatItem endValue={98} suffix="%" label="Customer satisfaction" />
          <StatItem prefix="< " endValue={2} suffix="h" label="Average response time" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ endValue, suffix = '', prefix = '', label, format = false }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, endValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, endValue]);

  const displayValue = format ? value.toLocaleString() : value;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center md:items-start text-center md:text-left group relative"
    >
      <div className="absolute -inset-4 rounded-xl bg-gradient-to-b from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-colors duration-500 pointer-events-none"></div>
      
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 flex items-baseline">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
          {prefix}{displayValue}{suffix}
        </span>
      </div>
      
      <p className="text-sm md:text-base font-medium text-white/50 group-hover:text-white/70 transition-colors">
        {label}
      </p>

      {/* Decorative Separator Line (Hidden on last item on mobile, handled via grid gaps usually, but let's add a subtle accent line) */}
      <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500/50 to-transparent mt-6 rounded-full"></div>
    </motion.div>
  );
}
