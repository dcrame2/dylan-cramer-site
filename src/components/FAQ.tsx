"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "What's the best way to reach you?",
    answer:
      "DM me on Instagram @cramerdyl. That's where I'm most active and respond fastest. For brand deals and formal inquiries, email dcrame2@gmail.com.",
  },
  {
    question: "Are you open to brand collaborations?",
    answer:
      "Absolutely. I work with brands in fitness, endurance sports, tech, and lifestyle. I only partner with brands I genuinely believe in and use myself.",
  },
  {
    question: "What is InstaCal?",
    answer:
      "InstaCal is my AI-powered calorie tracker with social features. Snap a photo to track macros, chat with an AI dietitian, and share meals with friends. Free on iOS and Android at theinstacal.app.",
  },
  {
    question: "What races have you completed?",
    answer:
      "Ironman Wisconsin (13:54:29), Tunnel Hill 100 mile ultra, Chicago Triathlon, multiple 50-milers, and I'm currently training for Ironman Lake Placid in July 2026.",
  },
  {
    question: "Do you build websites?",
    answer:
      "Yes! I build modern, fast websites for creators, athletes, and small businesses. $500 for a custom build, $99/month for ongoing maintenance and updates. Email dcrame2@gmail.com to get started.",
  },
  {
    question: "What's included in the $500 website build?",
    answer:
      "Custom design, mobile responsive, SEO optimized, and deployed live. I build with Next.js and modern tools so your site is fast and looks great on every device.",
  },
  {
    question: "Do you do coaching or consulting?",
    answer:
      "Not currently offering formal coaching, but I share everything I learn about training, building, and creating through my content. Check out the free resources section for guides.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Questions
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            FAQ
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all text-left"
              >
                <span className="text-sm md:text-base font-bold text-white pr-4">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-red-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 py-4 text-sm text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
