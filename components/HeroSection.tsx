'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-700 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-500 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Particles (Simplified for now) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >


            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <span className="block text-white">Your IT Problems</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                Solved Instantly.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
              Stop letting tech issues slow your team down. Experience the world's most intelligent, frictionless IT helpdesk designed for modern teams.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <LinkButton href="/register" primary>
                Start for Free
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </LinkButton>
              <LinkButton href="/demo" secondary>
                <Play size={18} className="mr-2" />
                Watch Demo
              </LinkButton>
            </div>


          </motion.div>

          {/* Right Side: Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Floating Dashboard */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 rounded-2xl border border-white/10 bg-[#0a0a0f]/50 backdrop-blur-xl p-2 shadow-2xl shadow-blue-900/20"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-0"></div>
              <div className="relative z-10 rounded-xl overflow-hidden border border-white/5 bg-[#12121a]">
                {/* Fallback box if image is missing */}
                <div className="aspect-[4/3] relative flex items-center justify-center bg-[#0a0a0f]">
                  <Image
                    src="/images/hero-dashboard.png"
                    alt="IT-Fix Dashboard"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute text-white/20 font-bold text-2xl z-[-1]">Dashboard Visual</div>
                </div>
              </div>
            </motion.div>


            
            {/* Back Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-[100px] z-[-1] rounded-full"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function LinkButton({ href, children, primary, secondary }: any) {
  if (primary) {
    return (
      <a href={href} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:-translate-y-1">
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
        <span className="relative flex items-center">{children}</span>
      </a>
    );
  }
  
  return (
    <a href={href} className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
      <span className="relative flex items-center">{children}</span>
    </a>
  );
}

