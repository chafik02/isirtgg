'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Technicians', href: '#technicians' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-white/10 shadow-lg shadow-black/50 py-3'
          : 'bg-[#0a0a0f]/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center group">
          <div className="relative w-28 h-8 md:w-36 md:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/the logo.png"
              alt="IT-Fix Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollClick(e, link.href)}
              className="text-sm font-medium text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="relative group overflow-hidden rounded-full p-[1px]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            <div className="relative bg-[#0a0a0f] hover:bg-transparent transition-colors duration-300 px-6 py-2.5 rounded-full flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Get Started Free</span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="text-lg font-medium text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-medium text-white/80 hover:text-white py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-semibold text-white py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
