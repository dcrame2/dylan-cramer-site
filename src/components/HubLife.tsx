"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// Countdown to Ironman California (mirrors the hook used in Hero.tsx)
function useCountdown(targetDate: Date) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const tick = () => {
      const distance = targetDate.getTime() - new Date().getTime();
      setDays(distance < 0 ? 0 : Math.floor(distance / (1000 * 60 * 60 * 24)));
    };
    tick();
    const interval = setInterval(tick, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [targetDate]);

  return days;
}

const lifeCards = [
  {
    title: "Software Developer",
    time: "9:00 AM – 5:00 PM",
    description:
      "Full-time dev during the day. Writing code, shipping features, solving problems. It pays the bills and fuels everything else.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Endurance Athlete",
    time: "4:00 AM & 6:00 PM",
    description:
      "Training before sunrise and after the laptop closes. Swim, bike, run — sometimes all in the same day. Ironman and ultra training never stops.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    title: "Content Creator",
    time: "Nights & Weekends",
    description:
      "Documenting the journey. Raw, authentic, documentary-style. Filming races, editing videos, and building a community around doing the most with your time.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

export default function HubLife() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const targetDate = useRef(new Date("2026-10-18T07:00:00"));
  const daysOut = useCountdown(targetDate.current);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            A Day in the Life
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-5">
            One Life.{" "}
            <span className="text-red-500">No Off Switch.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            I&apos;m a software developer, an Ironman, a 100-mile ultrarunner, and a
            creator — all at once, all in the same 24 hours. This page is the
            front door to all of it. Come along.
          </p>
        </motion.div>

        {/* Current focus / countdown card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative mb-8 p-6 md:p-8 rounded-2xl border border-red-600/30 bg-red-600/5 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-2">
                Currently Chasing
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                Ironman California 2026
              </h3>
              <p className="text-gray-400 mt-1 text-sm">
                2.4mi swim · 112mi bike · 26.2mi run
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <p className="text-5xl md:text-6xl font-black text-red-500 leading-none">
                {daysOut}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-1">
                Days Out
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lifestyle cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {lifeCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all"
            >
              <div className="text-red-500 mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="text-xs font-mono text-red-500/80 uppercase tracking-widest mt-1 mb-3">
                {card.time}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Full story link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors font-mono"
          >
            Read the full story
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
