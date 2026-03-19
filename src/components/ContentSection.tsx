"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const platforms = [
  {
    name: "Instagram",
    handle: "@cramerdyl",
    url: "https://www.instagram.com/cramerdyl/",
    description: "Behind the scenes of training, racing, and building. Daily stories from the grind.",
    color: "from-pink-500 to-red-500",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@dylcramer",
    url: "https://www.tiktok.com/@dylcramer",
    description: "Short-form videos documenting the triathlon lifestyle, app building, and real life.",
    color: "from-cyan-400 to-pink-500",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@dylcramer",
    url: "https://www.youtube.com/@dylcramer",
    description: "Longer form content — race recaps, training vlogs, and the full journey documented.",
    color: "from-red-600 to-red-400",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const contentPillars = [
  { label: "Ironman Training", percentage: 35 },
  { label: "Ultra Running", percentage: 25 },
  { label: "App Building", percentage: 20 },
  { label: "Lifestyle & Vibes", percentage: 20 },
];

export default function ContentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="content" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Follow Along
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            The Content.
            <br />
            <span className="text-red-500">Real & Raw.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            No scripts, no faking it. I film the 4am swims, the suffering at mile 80,
            the app launches, and everything in between. This is real life documented.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="group relative p-6 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-500 overflow-hidden rounded-2xl"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="flex items-start justify-between mb-4">
                <div className="text-white group-hover:text-red-500 transition-colors">
                  {platform.icon}
                </div>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{platform.name}</h3>
              <p className="text-sm font-mono text-red-500 mb-3">{platform.handle}</p>
              <p className="text-sm text-gray-500">{platform.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Content pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-mono mb-6">
            What I Create
          </p>
          <div className="space-y-4">
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    {pillar.label}
                  </span>
                  <span className="text-xs font-mono text-red-500">{pillar.percentage}%</span>
                </div>
                <div className="h-1 bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${pillar.percentage}%` } : {}}
                    transition={{ delay: 1.2 + i * 0.15, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reel/TikTok embed placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-mono mb-6">
            Latest Content
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={i}
                href="https://www.instagram.com/cramerdyl/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] bg-white/5 border border-white/10 overflow-hidden hover:border-red-600/40 transition-all rounded-2xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 group-hover:text-red-500 transition-colors">
                  <svg className="w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-xs uppercase tracking-widest">Reel {i}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">
            Connect your Instagram & TikTok to auto-populate latest content
          </p>
        </motion.div>
      </div>
    </section>
  );
}
