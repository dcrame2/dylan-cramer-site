"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const resources = [
  {
    title: "Your Complete Guide to Your First Ironman",
    category: "Triathlon",
    readTime: "25 min read",
    description:
      "Everything you need to know to go from zero to Ironman finisher. Training plans, nutrition, gear, race day strategy, and lessons from the course.",
    href: "/resources/ironman-training-guide",
    image: "/images/gallery/stadium-run.jpg",
    imagePosition: "top" as const,
    available: true,
  },
  {
    title: "Ultra Marathon Nutrition Guide",
    category: "Nutrition",
    readTime: "18 min read",
    description:
      "How to fuel for 50K, 50-mile, and 100-mile ultramarathons. Real-world nutrition strategies that won't wreck your stomach.",
    href: "/resources/ultra-marathon-nutrition",
    image: "/images/gallery/tunnel-hill-finish.jpg",
    available: true,
  },
  {
    title: "How to Balance a 9-5 and Ironman Training",
    category: "Lifestyle",
    readTime: "15 min read",
    description:
      "A realistic guide to fitting swim, bike, and run training around a full-time job. Schedules, sacrifices, and strategies that actually work.",
    href: "/resources/9-to-5-ironman-training",
    image: "/images/gallery/bike-capitol.jpg",
    available: true,
  },
  {
    title: "Open Water Swimming Guide",
    category: "Swimming",
    readTime: "18 min read",
    description:
      "From pool to open water. Wetsuits, sighting, drafting, race starts, and everything you need to swim confidently in any body of water.",
    href: "/resources/open-water-swimming-guide",
    image: "/images/gallery/open-water-swim.jpg",
    available: true,
  },
  {
    title: "Long Distance Cycling Guide",
    category: "Cycling",
    readTime: "20 min read",
    description:
      "Build up to 100+ mile rides. Bike fit, pacing, nutrition on the bike, gear essentials, and training for the Ironman bike leg.",
    href: "/resources/long-distance-cycling-guide",
    image: "/images/gallery/bike-barn.jpg",
    available: true,
  },
  {
    title: "Race Day Nutrition Strategy",
    category: "Nutrition",
    readTime: "16 min read",
    description:
      "How to fuel during any endurance race. Calories per hour, gel timing, stomach training, and exact plans from Ironman and Tunnel Hill 100.",
    href: "/resources/race-day-nutrition-strategy",
    image: "/images/gallery/ultra-snack.jpg",
    available: true,
  },
  {
    title: "Content Creation for Athletes",
    category: "Content",
    readTime: "12 min read",
    description:
      "How to document your athletic journey without it killing your training. Gear, workflow, and growing an audience as an endurance athlete.",
    href: "/resources/content-creation-for-athletes",
    image: "/images/gallery/alcatraz-beach-run2.jpg",
    available: true,
  },
  {
    title: "Ultramarathon Packing List",
    category: "Ultrarunning",
    readTime: "Interactive Checklist",
    description:
      "The complete packing list from a 100-mile finisher. Clothing, fuel, gear, and pain relief. Check items off as you pack.",
    href: "/resources/ultramarathon-packing-list",
    image: "/images/gallery/ultra-crew.jpg",
    available: true,
  },
];

function useAnimRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return { ref, inView };
}

function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
  );
}

export default function ResourcesPage() {
  const hero = useAnimRef();
  const grid = useAnimRef();
  const signup = useAnimRef();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative pt-28 overflow-hidden">
      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={hero.ref} className="relative py-24 px-6">
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.5em] text-red-500 font-mono mb-6"
          >
            Learn From The Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Free</span>
            <br />
            <span className="text-red-500">Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Free guides for endurance athletes who want to push their limits.
            Everything I wish I had when I started training for my first Ironman.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* ── RESOURCE GRID ────────────────────────────── */}
      <section ref={grid.ref} className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 40 }}
                animate={grid.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              >
                {resource.available ? (
                  <Link
                    href={resource.href}
                    className="group block relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all duration-500"
                  >
                    {/* Card image */}
                    <div className="relative h-56 overflow-hidden">
                      {resource.image && (
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className={`object-cover group-hover:scale-105 transition-transform duration-700 ${resource.imagePosition === "top" ? "object-top" : ""}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono bg-red-600 text-white rounded-lg">
                          {resource.category}
                        </span>
                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono bg-white/10 text-gray-300 rounded-lg backdrop-blur-sm">
                          {resource.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 group-hover:gap-3 transition-all">
                        Read Guide
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed">
                    {/* Placeholder image area */}
                    <div className="relative h-56 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                          </svg>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-gray-600 font-mono">
                          Coming Soon
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono bg-white/5 text-gray-600 rounded-lg">
                          {resource.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-600 mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── WANT MORE? EMAIL SIGNUP ──────────────────── */}
      <section ref={signup.ref} className="relative py-28 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={signup.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Stay In The Loop
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Want More<span className="text-red-500">?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              New guides drop regularly. Drop your email and I&apos;ll let you
              know when the next one is live. No spam, just value.
            </p>

            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={signup.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors font-mono text-sm"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors whitespace-nowrap"
                >
                  Notify Me
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white/5 border border-red-600/30 rounded-2xl max-w-md mx-auto"
              >
                <p className="text-white font-bold mb-1">You&apos;re in.</p>
                <p className="text-sm text-gray-400">
                  I&apos;ll hit your inbox when the next guide drops.
                </p>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={signup.inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-16 text-gray-600 text-xs font-mono uppercase tracking-widest"
            >
              More guides coming soon.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
