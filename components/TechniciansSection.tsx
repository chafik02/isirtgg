'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

const technicians = [
  {
    name: 'Abdellah Amine KERNOU',
    role: 'Senior Network Engineer',
    bio: '10+ years resolving complex infrastructure issues for enterprise clients.',
    rating: 4.9,
    image: '/images/Abdellah Amine KERNOU.png',
    available: true,
  },
  {
    name: 'BEKHOCHE Ahmed Ziad',
    role: 'Cloud Architecture Specialist',
    bio: 'AWS & Azure certified. Specializes in migration and zero-downtime fixes.',
    rating: 5.0,
    image: '/images/BEKHOCHE Ahmed Ziad.png',
    available: true,
  },
  {
    name: 'AKROUCHE Ahmed Rayan',
    role: 'Security Analyst',
    bio: 'Ensures your data is protected during every interaction and resolution.',
    rating: 4.9,
    image: '/images/AKROUCHE Ahmed Rayan.png',
    available: false,
  }
];

export default function TechniciansSection() {
  return (
    <section id="technicians" className="py-24 relative bg-[#06060a] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-[100%] mt-[-100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Experts.</span> Ready Now.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            Our elite team of certified professionals is just a click away, providing enterprise-grade support.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {technicians.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function TechCard({ tech, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl bg-[#0a0a0f] border border-white/10 overflow-hidden shadow-2xl"
    >
      {/* Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 group-hover:to-blue-500/20 transition-all duration-500 z-0"></div>

      {/* Top Banner / Image area */}
      <div className="h-32 bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] relative overflow-visible border-b border-white/5">
        <div className="absolute -bottom-12 left-8">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#0a0a0f] bg-[#1a1a24] shadow-xl">
             <Image
                src={tech.image}
                alt={tech.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
             />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs text-center p-2 z-[-1]">{tech.name}</div>
          </div>
          
          {/* Availability Badge */}
          {tech.available ? (
             <div className="absolute -bottom-2 -right-2 bg-[#0a0a0f] rounded-full p-1 border border-[#1a1a24]">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full border border-green-500/30">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-green-400">NOW</span>
                </div>
             </div>
          ) : (
            <div className="absolute -bottom-2 -right-2 bg-[#0a0a0f] rounded-full p-1 border border-[#1a1a24]">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded-full border border-white/10">
                   <div className="w-2 h-2 rounded-full bg-white/40"></div>
                   <span className="text-[10px] font-bold text-white/60">AWAY</span>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-8 px-8 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {tech.name}
              <CheckCircle2 size={16} className="text-blue-400" />
            </h3>
            <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {tech.role}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-white">{tech.rating}</span>
          </div>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mt-4">
          "{tech.bio}"
        </p>

      </div>
    </motion.div>
  );
}
