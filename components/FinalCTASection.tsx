'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="relative py-32 overflow-hidden flex items-center justify-center border-t border-white/5">
      
      {/* Dramatic Background Gradients */}
      <div className="absolute inset-0 bg-[#06060a]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#06060a] via-purple-900/20 to-blue-900/30"></div>
      
      {/* Floating Blurred Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[150px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[150px]"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Fix Everything?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
            Join 500+ companies who have eliminated IT friction and empowered their teams to do their best work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/register" 
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:shadow-[0_0_80px_rgba(59,130,246,0.7)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
              <span className="relative flex items-center text-lg">
                Get Started for Free
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </a>
            
            <p className="text-sm text-white/50 font-medium">
              No credit card required. <br className="sm:hidden" /> Free forever plan available.
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
