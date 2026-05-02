'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Ticket, Users, LineChart, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Instant Ticketing',
    description: 'Create tickets in seconds with AI-assisted categorization and automated urgency detection.',
    icon: <Ticket className="w-6 h-6 text-blue-400" />,
    image: '/images/feature-ticket.png',
    glowColor: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    title: 'Smart Assignment',
    description: 'Automatically route issues to the right technician based on expertise and current workload.',
    icon: <Users className="w-6 h-6 text-purple-400" />,
    image: '/images/feature-assign.png',
    glowColor: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50'
  },
  {
    title: 'Real-time Tracking',
    description: 'Watch your issues get resolved with live status updates, comments, and resolution timelines.',
    icon: <LineChart className="w-6 h-6 text-cyan-400" />,
    image: '/images/feature-track.png',
    glowColor: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'group-hover:border-cyan-500/50'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative bg-[#08080c] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">resolve faster.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            A perfectly crafted toolset that eliminates friction and brings harmony to your IT support workflow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`group relative rounded-3xl bg-[#12121a]/60 border border-white/5 backdrop-blur-sm overflow-hidden hover:bg-[#161622]/80 transition-all duration-500 ${feature.borderColor}`}
    >
      {/* Subtle background glow */}
      <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.glowColor}`}></div>
      
      {/* Image Area (60%) */}
      <div className="h-64 relative overflow-hidden bg-[#0a0a0f] p-4 border-b border-white/5">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
               e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent flex items-center justify-center z-[-1]">
             <span className="text-white/20 font-medium">Feature Image</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          {feature.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {feature.title}
        </h3>
        
        <p className="text-white/60 leading-relaxed mb-6">
          {feature.description}
        </p>

        <a href="#" className="inline-flex items-center text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
          Learn More 
          <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>
      </div>
    </motion.div>
  );
}
