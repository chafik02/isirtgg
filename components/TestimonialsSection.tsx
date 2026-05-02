'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Yacine B.',
    role: 'CTO, TechFlow',
    text: 'IT-Fix completely transformed how we handle internal support. The AI routing saves us hours every single day. Highly recommended.',
    image: '/images/costemer 1.png',
  },
  {
    name: 'Amine K.',
    role: 'Operations Director, Nexus',
    text: 'The most beautiful and intuitive helpdesk software I have ever used. Our employees actually like submitting tickets now.',
    image: '/images/costemer 2.png',
  },
  {
    name: 'Sarah M.',
    role: 'Lead Developer, Stacked',
    text: 'Instant resolution isn\'t just a marketing promise, they actually deliver. The technicians are world-class.',
    image: '/images/costemer 3.png',
  },
  {
    name: 'Karim T.',
    role: 'VP of Engineering, CloudScale',
    text: 'We migrated from a legacy system and the difference is night and day. Premium experience from top to bottom.',
    image: '/images/costemer 4.png',
  },
  {
    name: 'Lina H.',
    role: 'CEO, Russo Group',
    text: 'Worth every penny. It feels like having an elite internal IT team available 24/7. Exceptional design and functionality.',
    image: '/images/avatar-5.png',
  }
];

export default function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Duplicate array for infinite scroll effect
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 relative bg-[#08080c] overflow-hidden">
      
      <div className="text-center max-w-3xl mx-auto mb-16 px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Industry Leaders</span>
        </motion.h2>
      </div>

      <div 
        className="relative flex overflow-hidden w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#08080c] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#08080c] to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          className="flex gap-6 w-max px-6"
          animate={{ x: isHovered ? 0 : "-50%" }}
          transition={
            isHovered 
            ? { type: "tween", duration: 0 } // Stops animation (effectively paused, though framer-motion approach requires a different setup for true pause/resume without jumping. For simplicity, we just slow it down or use CSS animation, but let's use a simpler CSS approach for true infinite marquee that pauses on hover)
            : { duration: 30, ease: "linear", repeat: Infinity }
          }
          style={{
             // Fallback to pure CSS for better infinite scroll that pauses
             animation: 'marquee 40s linear infinite',
             animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          {doubledTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[350px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-white/80 text-lg md:text-xl italic leading-relaxed mb-8">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#1a1a24] border border-white/10">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{testimonial.name}</h4>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Inline style for marquee animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </div>
    </section>
  );
}
