"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function WorkWithMeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-2">
                Services
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
                I Also Build <span className="text-red-500">Apps & Websites.</span>
              </h3>
              <p className="text-gray-400 max-w-lg">
                Websites, web apps, and mobile apps for creators, athletes, and small businesses.
                20+ projects built and counting. Clean design, mobile-first, built to convert.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/services/portfolio"
                className="px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-500 transition-all rounded-xl text-center"
              >
                See My Work
              </Link>
              <a
                href="mailto:dcrame2@gmail.com?subject=Website%20Build%20Inquiry"
                className="px-6 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all rounded-xl text-center"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
