"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const milestones = [
  { year: "2024", title: "Ironman Wisconsin", detail: "13:54:29", icon: "M" },
  { year: "2024", title: "Tunnel Hill 100", detail: "100 miles", icon: "U" },
  { year: "2025", title: "InstaCal Launch", detail: "iOS & Android", icon: "A" },
  { year: "2026", title: "Ironman Lake Placid", detail: "Next target", icon: "T" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Two column: header + text left, image right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Left: Header + Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section header — inside the left column now */}
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              The Story
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-10">
              Built Different.
              <br />
              <span className="text-red-500">Never Enough.</span>
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I&apos;m Dylan Cramer — a software developer by day who refuses to sit still.
                When I&apos;m not writing code or building my app{" "}
                <a href="/instacal" className="text-red-500 hover:underline">
                  InstaCal
                </a>
                , you&apos;ll find me training for my next Ironman, running ultras through
                the night, or swimming in open water before sunrise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I finished <span className="text-white font-semibold">Ironman Wisconsin</span> in
                13:54:29, ran <span className="text-white font-semibold">100 miles at Tunnel Hill</span>,
                and now I&apos;m training for{" "}
                <span className="text-red-500 font-semibold">Ironman Lake Placid</span> in July 2026.
                I also like to party, go to music festivals, and live life to the fullest.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I document the whole journey — the 4am swims, the 100-mile weeks, the
                app development grind, the wins, and the suffering. If you&apos;re into
                pushing limits and doing the most with the time you have, welcome.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Ironman",
                  "Ultrarunning",
                  "Open Water",
                  "Software Dev",
                  "App Founder",
                  "Content Creator",
                  "Chicago",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs uppercase tracking-wider border border-red-900/40 text-red-400 bg-red-900/10 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Feature image — aligned to top */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/ironman-finish.jpg"
                alt="Dylan crossing the Ironman finish line"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-widest text-red-400 font-mono">
                  Ironman Wisconsin 2024
                </p>
                <p className="text-3xl font-black text-white">13:54:29</p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-red-600/20 -z-10 rounded-2xl" />
          </motion.div>
        </div>

        {/* Milestones — horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="group p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                    {milestone.icon}
                  </div>
                  <span className="text-xs font-mono text-red-500">{milestone.year}</span>
                </div>
                <p className="text-sm font-bold text-white">{milestone.title}</p>
                <p className="text-xs text-gray-500 mt-1">{milestone.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-500 transition-all rounded-xl"
            >
              More About Me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
