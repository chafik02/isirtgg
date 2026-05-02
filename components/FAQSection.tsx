'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "How quickly can your technicians resolve issues?",
    answer: "Our average response time is under 2 hours, and many common issues are resolved instantly thanks to our AI-powered categorization and routing engine."
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "No. We believe in earning your business every month. All our plans are completely flexible with month-to-month billing options available."
  },
  {
    question: "How secure is my company data?",
    answer: "We employ enterprise-grade encryption (AES-256), SOC 2 Type II compliance, and strict RBAC. Your data is isolated and protected at all times during troubleshooting."
  },
  {
    question: "Can IT-Fix integrate with our existing tools?",
    answer: "Absolutely. We offer native integrations with Slack, Microsoft Teams, Jira, Salesforce, and a robust API for custom workflows."
  },
  {
    question: "What happens if a technician can't solve my problem?",
    answer: "Issues are automatically escalated to our Tier 3 engineering team. If the problem requires physical intervention, we partner with local certified vendors to dispatch help."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 relative bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FAQItem({ faq, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-white/10 rounded-2xl bg-[#12121a]/50 backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors group"
      >
        <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
          {faq.question}
        </span>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-transparent border-white/20 text-white/50 group-hover:border-white/50'}`}>
          <Plus 
            size={16} 
            className={`transition-transform duration-500 ease-[0.16,1,0.3,1] ${isOpen ? 'rotate-[135deg]' : 'rotate-0'}`} 
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
