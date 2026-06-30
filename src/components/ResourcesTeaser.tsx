"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// A small lead-magnet teaser, a few of the free guides. Full set lives at /resources.
const featured = [
  {
    title: "Your First Ironman",
    readTime: "25 min read",
    href: "/resources/ironman-training-guide",
    image: "/images/gallery/stadium-run.jpg",
    imagePosition: "object-top",
  },
  {
    title: "Balance a 9-5 & Ironman Training",
    readTime: "15 min read",
    href: "/resources/9-to-5-ironman-training",
    image: "/images/gallery/bike-capitol.jpg",
    imagePosition: "object-center",
  },
  {
    title: "Ultra Marathon Nutrition",
    readTime: "18 min read",
    href: "/resources/ultra-marathon-nutrition",
    image: "/images/gallery/tunnel-hill-finish.jpg",
    imagePosition: "object-center",
  },
];

export default function ResourcesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="playbook" ref={ref} className="relative py-28 px-6 overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Free Guides
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Steal My <span className="text-red-500">Playbook.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl leading-relaxed">
            Everything I&apos;ve learned training for Ironmans and 100-milers around a
            full-time job, written down, free, no email wall.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((guide, i) => (
            <motion.div
              key={guide.href}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <Link
                href={guide.href}
                className="group block relative rounded-2xl overflow-hidden border border-white/10 hover:border-red-600/40 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                    className={`object-cover ${guide.imagePosition} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-widest text-red-400 font-mono mb-1">
                    {guide.readTime}
                  </p>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {guide.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all rounded-xl"
          >
            All Free Guides
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
