"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SocialCards from "./SocialCards";

/* ─── Data ─── */

const platforms = [
  {
    name: "Instagram",
    handle: "@cramerdyl",
    url: "https://instagram.com/cramerdyl",
    description: "Daily stories, reels, and raw moments from training and life.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: "from-pink-600 to-purple-600",
  },
  {
    name: "TikTok",
    handle: "@dylcramer",
    url: "https://tiktok.com/@dylcramer",
    description: "Quick cuts, training montages, and behind-the-scenes chaos.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
      </svg>
    ),
    color: "from-white to-gray-400",
  },
  {
    name: "YouTube",
    handle: "@dylcramer",
    url: "https://youtube.com/@dylcramer",
    description: "Long-form vlogs, race recaps, and deep dives into the grind.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "from-red-600 to-red-800",
  },
];

const contentPillars = [
  { label: "Ironman Training", pct: 35, color: "bg-red-600" },
  { label: "Ultra Running", pct: 25, color: "bg-red-500" },
  { label: "App Building / Entrepreneurship", pct: 20, color: "bg-white" },
  { label: "Lifestyle & Vibes", pct: 20, color: "bg-gray-400" },
];

const instagramEmbeds = [
  "https://www.instagram.com/p/DWE-O9miVsM/",
  "https://www.instagram.com/p/DV_iwkNRJ9q/",
  "https://www.instagram.com/p/DQ4Wd8IiDQB/",
  "https://www.instagram.com/p/DVosetukSIR/",
  "https://www.instagram.com/p/DVeVkGAEfkz/",
  "https://www.instagram.com/p/DTf0KIwkbto/",
  "https://www.instagram.com/p/DVhrg8Jkdgt/",
];

const tiktokIds = [
  "7574802270446030135",
  "7575165481644985613",
  "7596418914360331534",
];

const contentTypes = [
  {
    title: "Race Day Raw",
    desc: "Unfiltered footage from Ironman start lines to finish tapes. Every high and low.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" /></svg>,
  },
  {
    title: "Training Sessions",
    desc: "5 AM swims, brick workouts, 20-milers. The daily grind, documented.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>,
  },
  {
    title: "Build in Public",
    desc: "Shipping apps, debugging at 2 AM, launch days. The dev life, unscripted.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  },
  {
    title: "Life Stuff",
    desc: "Cooking, coffee runs, travel, random adventures. The in-between moments.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>,
  },
];

/* ─── Component ─── */

export default function ContentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const platformInView = useInView(platformRef, { once: true, margin: "-100px" });
  const styleInView = useInView(styleRef, { once: true, margin: "-100px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-100px" });
  const embedInView = useInView(embedRef, { once: true, margin: "-100px" });
  const typesInView = useInView(typesRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-28 overflow-hidden">
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/chicago-run.jpg"
            alt="Dylan running the Chicago Triathlon"
            fill
            className="object-cover object-[50%_30%]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />

        <div className="relative z-10 px-6 w-full max-w-7xl mx-auto py-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-6"
          >
            Socials & Content
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
          >
            <span className="text-white">The</span>
            <br />
            <span className="text-red-500 red-glow-text">Content</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl"
          >
            No scripts. No fancy studios. Just a phone in hand and real life happening.
            Raw, authentic, documentary-style content.
          </motion.p>
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── Platform Cards ─── */}
      <section ref={platformRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={platformInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4 text-center"
          >
            Where to Find Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={platformInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-16"
          >
            Pick Your <span className="text-red-500">Platform</span>
          </motion.h2>

          <SocialCards inView={platformInView} delay={0.15} />
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── My Style ─── */}
      <section ref={styleRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={styleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              The Approach
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              My <span className="text-red-500">Style</span>
            </h2>
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p>
                I film with my phone in hand. Conversational tone, zero scripts,
                no retakes. If it happens, it&apos;s in the video.
              </p>
              <p>
                Think documentary meets vlog. Raw footage of 5 AM training sessions,
                race-day nerves, late-night coding sprints, and everything in between.
                The goal is to make you feel like you&apos;re right there.
              </p>
              <p>
                Inspired by creators like{" "}
                <span className="text-white font-semibold">@jacksdayinlife</span>,{" "}
                <span className="text-white font-semibold">@chida.rajan</span>, and{" "}
                <span className="text-white font-semibold">@omarontape</span> &mdash;
                people who keep it authentic and let the story tell itself.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={styleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  Content DNA
                </span>
              </div>
              {[
                "No scripts. Ever.",
                "Phone in hand, always filming.",
                "Conversational, not performative.",
                "Document, don't create.",
                "Show the lows, not just the highs.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={styleInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── Content Pillars ─── */}
      <section ref={pillarsRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={pillarsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4 text-center"
          >
            The Breakdown
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-16"
          >
            Content <span className="text-red-500">Pillars</span>
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, x: -30 }}
                animate={pillarsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-200">{pillar.label}</span>
                  <span className="text-sm font-mono text-red-400">{pillar.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={pillarsInView ? { width: `${pillar.pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 + 0.15 * i, ease: "easeOut" }}
                    className={`h-full rounded-full ${pillar.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── Embedded Content ─── */}
      <section ref={embedRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={embedInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4 text-center"
          >
            Featured
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={embedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-16"
          >
            Latest <span className="text-red-500">Posts</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={embedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="scroll-gallery flex gap-5 overflow-x-auto pb-6"
          >
            {instagramEmbeds.map((url, i) => (
              <div
                key={i}
                className="shrink-0 w-[320px] h-[560px] rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
              >
                <iframe
                  src={url + "embed"}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  loading="lazy"
                />
              </div>
            ))}
            {tiktokIds.map((id, i) => (
              <div
                key={`tt-${i}`}
                className="shrink-0 w-[320px] h-[560px] rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
              >
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${id}`}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── What You'll See ─── */}
      <section ref={typesRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={typesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4 text-center"
          >
            The Feed
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={typesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-16"
          >
            What You&apos;ll <span className="text-red-500">See</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentTypes.map((ct, i) => (
              <motion.div
                key={ct.title}
                initial={{ opacity: 0, y: 40 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * i }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-red-500/30 transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className="text-red-500 mb-4">{ct.icon}</div>
                <h3 className="text-lg font-bold mb-2">{ct.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{ct.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Red divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

      {/* ─── CTA ─── */}
      <section ref={ctaRef} className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6"
          >
            Come Along for the <span className="text-red-500">Ride</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg mb-12 max-w-xl mx-auto"
          >
            Follow the journey. No filter, no BS &mdash; just the grind and everything
            that comes with it.
          </motion.p>

          <SocialCards inView={ctaInView} delay={0.4} />
        </div>
      </section>
    </div>
  );
}
