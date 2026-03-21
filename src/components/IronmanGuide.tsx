"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── data ─────────────────────────────────────────────── */

const sections = [
  { id: "what-is-ironman", label: "What is an Ironman?" },
  { id: "can-you-do-it", label: "Can You Do It?" },
  { id: "how-long-to-train", label: "How Long to Train" },
  { id: "training-plan-overview", label: "Training Plan Overview" },
  { id: "swim-training", label: "Swim Training" },
  { id: "bike-training", label: "Bike Training" },
  { id: "run-training", label: "Run Training" },
  { id: "race-day-nutrition", label: "Race Day Nutrition" },
  { id: "gear-essentials", label: "Gear Essentials" },
  { id: "mental-game", label: "The Mental Game" },
  { id: "dylans-race-day-tips", label: "Dylan's Race Day Tips" },
];

/* ── helpers ──────────────────────────────────────────── */

function useAnimRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-16" />
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-red-600 bg-white/5 rounded-r-xl p-4 my-6">
      <p className="text-sm font-mono text-red-400 uppercase tracking-widest mb-2">
        Pro Tip
      </p>
      <div className="text-gray-300 text-base leading-relaxed">{children}</div>
    </div>
  );
}

function SectionImage({
  src,
  alt,
  caption,
  imagePosition,
}: {
  src: string;
  alt: string;
  caption: string;
  imagePosition?: "top" | "center" | "bottom";
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden my-8">
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className={`object-cover ${imagePosition === "top" ? "object-top" : imagePosition === "bottom" ? "object-bottom" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <p className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-red-400 font-mono">
        {caption}
      </p>
    </div>
  );
}

/* ── component ────────────────────────────────────────── */

export default function IronmanGuide() {
  const hero = useAnimRef();
  const content = useAnimRef();
  const cta = useAnimRef();
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ironman Training Guide - Dylan Cramer",
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative pt-28 overflow-hidden">
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={hero.ref}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/ironman-finish.jpg"
            alt="Dylan crossing the Ironman finish line"
            fill
            className="object-cover object-[50%_30%]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />

        <div className="relative z-10 px-6 w-full max-w-7xl mx-auto py-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.5em] text-red-500 font-mono mb-6"
          >
            Free Guide &middot; 25 Min Read
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Ironman</span>
            <br />
            <span className="text-red-500">Training Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Your complete guide to finishing your first Ironman. From someone who
            works a 9-5, built an app, and still crossed the finish line in
            13:54:29.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#what-is-ironman"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
            >
              Start Reading
            </a>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-red-600/50 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
            >
              {copied ? "Link Copied!" : "Share Guide"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE LAYOUT ───────────────────────────── */}
      <section ref={content.ref} className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-12">
            {/* ── Sidebar TOC (desktop) ──────────────── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-6">
                  Table of Contents
                </p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block py-1.5 text-sm transition-colors duration-200 border-l-2 pl-4 ${
                        activeSection === s.id
                          ? "border-red-600 text-red-400"
                          : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-red-600/50 text-white text-xs uppercase tracking-widest rounded-xl transition-colors font-mono"
                  >
                    {copied ? "Copied!" : "Share This Guide"}
                  </button>
                </div>
              </div>
            </aside>

            {/* ── Main Content ───────────────────────── */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* ── Section 1: What is an Ironman? ───── */}
              <div id="what-is-ironman" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    What is an Ironman<span className="text-red-500">?</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    An Ironman triathlon is the single hardest single-day
                    endurance event most humans will ever attempt. It consists of
                    three consecutive disciplines, completed back to back with no
                    rest:
                  </p>
                  <div className="grid grid-cols-3 gap-4 my-8">
                    {[
                      { distance: "2.4", unit: "miles", discipline: "Swim" },
                      { distance: "112", unit: "miles", discipline: "Bike" },
                      { distance: "26.2", unit: "miles", discipline: "Run" },
                    ].map((d) => (
                      <div
                        key={d.discipline}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center"
                      >
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {d.distance}
                        </p>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                          {d.unit}
                        </p>
                        <p className="text-sm text-red-400 font-bold mt-1">
                          {d.discipline}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    That&apos;s 140.6 miles in total. You have 17 hours from the
                    moment the cannon goes off to cross that finish line. Most
                    people finish between 12 and 16 hours. The swim takes place
                    in open water: a lake, ocean, or river. The bike course
                    covers 112 miles of road. And then you run a full marathon.
                    After already swimming and biking for 8-10 hours.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    It sounds impossible. It&apos;s not. But it does require
                    serious preparation, dedication, and a willingness to suffer.
                    That&apos;s what this guide is for.
                  </p>
                </motion.div>
              </div>

              <SectionDivider />

              {/* ── Section 2: Can You Do It? ────────── */}
              <div id="can-you-do-it" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Can You Do It<span className="text-red-500">?</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Yes. Full stop. If you&apos;re reading this, you can finish an
                  Ironman.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  I&apos;m not a professional athlete. I work a full-time 9-5 as
                  a software developer. I built and launched an app (InstaCal)
                  during my training. I create content on the side. I still found
                  time to train for and finish Ironman Wisconsin in 13 hours, 54
                  minutes, and 29 seconds.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The people on the Ironman course are not all chiseled
                  superhumans. They&apos;re teachers, accountants, nurses,
                  parents, first-timers, and people who just decided one day that
                  they wanted to see what they were made of. The youngest racers
                  are 18. The oldest finishers are in their 80s. There are
                  people of every body type, every speed, and every background.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The Ironman is not about being fast. It&apos;s about being
                  relentless. If you can commit to the training, stay consistent,
                  and refuse to quit on race day, you will become an Ironman.
                </p>
                <Tip>
                  The hardest part is not race day. It&apos;s the months of
                  training before it. The early mornings, the long weekends on
                  the bike, the sessions when you&apos;d rather do anything
                  else. Race day is the celebration. The training is the real
                  test.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 3: How Long to Train ─────── */}
              <div id="how-long-to-train" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  How Long to Train
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  For your first Ironman, plan for{" "}
                  <span className="text-white font-semibold">
                    a minimum of 6-9 months
                  </span>{" "}
                  of dedicated training. If you&apos;re new to triathlon or
                  don&apos;t have a strong endurance base,{" "}
                  <span className="text-white font-semibold">
                    12 months is ideal
                  </span>
                  .
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here&apos;s a rough breakdown of training phases:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      phase: "Base Phase",
                      time: "Months 1-4",
                      detail:
                        "Build aerobic fitness. Long, easy efforts. Get comfortable in all three disciplines. 8-10 hours/week.",
                    },
                    {
                      phase: "Build Phase",
                      time: "Months 5-8",
                      detail:
                        "Increase volume and introduce intensity. Longer long rides, open water swims, and brick workouts. 10-14 hours/week.",
                    },
                    {
                      phase: "Peak Phase",
                      time: "Months 9-10",
                      detail:
                        "Highest training volume. Race simulation workouts. Practice nutrition strategy. 14-18 hours/week at peak weeks.",
                    },
                    {
                      phase: "Taper",
                      time: "Final 2-3 Weeks",
                      detail:
                        "Reduce volume by 40-60%. Maintain intensity. Rest your body while keeping fitness sharp. 6-8 hours/week.",
                    },
                  ].map((p) => (
                    <div
                      key={p.phase}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {p.phase}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {p.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{p.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Don&apos;t rush the base phase. It&apos;s tempting to jump
                  into big training weeks early, but building your aerobic engine
                  slowly is what prevents injury and burnout. Trust the process.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 4: Training Plan Overview ── */}
              <div id="training-plan-overview" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  The Training Plan Overview
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  At peak training, expect to spend{" "}
                  <span className="text-white font-semibold">
                    12-15 hours per week
                  </span>{" "}
                  swimming, biking, and running. Some weeks will be higher, some
                  lower. Here&apos;s what a typical peak training week looks
                  like:
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Day
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Workout
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Monday
                        </td>
                        <td className="py-3 px-4">
                          Swim (technique + endurance)
                        </td>
                        <td className="py-3 px-4">1 hr</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Tuesday
                        </td>
                        <td className="py-3 px-4">
                          Bike (intervals) + Short Run
                        </td>
                        <td className="py-3 px-4">2 hrs</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Wednesday
                        </td>
                        <td className="py-3 px-4">Run (tempo or speed work)</td>
                        <td className="py-3 px-4">1 hr</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Thursday
                        </td>
                        <td className="py-3 px-4">
                          Swim + Bike (easy effort)
                        </td>
                        <td className="py-3 px-4">2 hrs</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Friday
                        </td>
                        <td className="py-3 px-4">Rest or easy swim</td>
                        <td className="py-3 px-4">0-45 min</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Saturday
                        </td>
                        <td className="py-3 px-4">
                          Long Bike + Brick Run
                        </td>
                        <td className="py-3 px-4">4-6 hrs</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">
                          Sunday
                        </td>
                        <td className="py-3 px-4">Long Run</td>
                        <td className="py-3 px-4">2-3 hrs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  <span className="text-white font-semibold">
                    Brick workouts
                  </span>{" "}
                  are one of the most important types of training for Ironman.
                  A &ldquo;brick&rdquo; means doing two disciplines back to
                  back, typically a bike ride followed immediately by a run.
                  This trains your body to run on tired legs, which is exactly
                  what race day demands. Your legs will feel like concrete
                  blocks the first time. That&apos;s normal. It gets better.
                </p>
                <Tip>
                  Your longest training ride should be 100-112 miles, and your
                  longest run should be 18-20 miles. You do NOT need to do the
                  full Ironman distance in training. Trust your fitness and your
                  taper.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 5: Swim Training ─────────── */}
              <div id="swim-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Swim Training
                </h2>
                <SectionImage
                  src="/images/gallery/swim-exit.jpg"
                  alt="Exiting the water during a triathlon swim"
                  caption="Swim Exit - Ironman Wisconsin"
                  imagePosition="top"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The swim is 2.4 miles and it&apos;s usually the discipline
                  that terrifies first-timers the most. The good news: the swim
                  is the shortest part of your day (typically 1-1.5 hours), and
                  it&apos;s very trainable even if you&apos;re starting from
                  scratch.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Open Water vs. Pool
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Train in the pool for technique and fitness, but you MUST get
                  open water practice before race day. Swimming in a lake is
                  nothing like swimming in a pool. There are no lane lines, no
                  walls to push off, no black line on the bottom. You&apos;ll be
                  surrounded by hundreds of other swimmers. The water may be
                  choppy, cold, and dark.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Sighting
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sighting means lifting your head while swimming to see where
                  you&apos;re going. In a pool, you just follow the lane. In
                  open water, you need to pick a landmark, like a buoy, a building,
                  or a tree on shore, and sight every 6-10 strokes to swim
                  straight. Bad sighting can add hundreds of extra meters to your
                  swim. Practice this in the pool by swimming with your eyes
                  closed and checking your drift.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Drafting
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Drafting is legal in the swim (unlike the bike). Swimming
                  directly behind or slightly to the side of another swimmer
                  reduces the effort by up to 20-25%. Find someone swimming your
                  pace or slightly faster and tuck in behind their feet. It&apos;s
                  free speed.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Wetsuit Advice
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Most Ironman races are wetsuit-legal (water temp below 76.1F).
                  A wetsuit adds buoyancy and makes you faster even if you&apos;re
                  a weak swimmer. Rent one first to find the right fit before
                  buying. Practice swimming in your wetsuit at least 5-6 times
                  before race day. The restricted shoulder movement takes
                  getting used to.
                </p>
                <Tip>
                  If the mass start scares you, seed yourself toward the back or
                  to the side. There is zero benefit to starting in the front if
                  you&apos;re not a fast swimmer. Let the chaos clear out and
                  swim your own race. The time you &ldquo;lose&rdquo; is
                  negligible compared to the energy you save by not panicking.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 6: Bike Training ─────────── */}
              <div id="bike-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Bike Training
                </h2>
                <SectionImage
                  src="/images/gallery/bike-capitol.jpg"
                  alt="Biking past the capitol building"
                  caption="Bike Leg - Ironman Wisconsin"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The bike is the longest portion of your race (112 miles,
                  typically 5-7 hours) and arguably the most important. A great
                  bike leg sets you up for a strong marathon. A bad one destroys
                  your run before it starts.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Long Rides Are Non-Negotiable
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You need to spend time in the saddle. There is no shortcut.
                  Build up to rides of 80, 90, 100, and eventually 112 miles
                  during your peak training. These rides teach your body to burn
                  fat efficiently, build muscular endurance, and, critically,
                  teach you how to eat and drink on the bike.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Nutrition on the Bike
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You need to take in 250-350 calories per hour on the bike.
                  This is your fueling window. If you under-eat on the bike,
                  your marathon will be a death march. Practice your nutrition on
                  every long ride. Figure out what your stomach can tolerate at
                  race pace: gels, bars, sports drink, real food. Don&apos;t
                  try anything new on race day.
                </p>
                <SectionImage
                  src="/images/gallery/bike-barn.jpg"
                  alt="Riding past a barn during Ironman bike course"
                  caption="Mile 80 - The Verona Loop"
                />
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Aero Position
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you have aero bars (clip-on or tri bike), spend time riding
                  in the aero position. It&apos;s significantly faster due to
                  reduced wind resistance, but it uses different muscles and can
                  be uncomfortable. Build up gradually. You don&apos;t need to be
                  aero the entire 112 miles, but spending 60-70% of the ride
                  aero will save you 30-60 minutes compared to riding upright.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Equipment Basics
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You do NOT need a $10,000 tri bike for your first Ironman.
                  A road bike with clip-on aero bars is perfectly fine. Make
                  sure it fits you properly. Get a professional bike fit.
                  A bad fit over 112 miles will wreck your back, neck, and
                  knees. Other essentials: flat repair kit, spare tube, CO2
                  inflator, and cycling shoes if you use clipless pedals.
                </p>
                <Tip>
                  Ride the first 56 miles easier than you think you should. The
                  bike is where most people blow up their race. If your power or
                  heart rate is too high in the first half, you&apos;re borrowing
                  energy from your marathon. Be patient. The second half of the
                  bike is where you can push if you feel good.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 7: Run Training ──────────── */}
              <div id="run-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Run Training
                </h2>
                <SectionImage
                  src="/images/gallery/ironman-run.jpg"
                  alt="Running during the Ironman marathon"
                  caption="The Marathon - Mile 18"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The Ironman marathon is nothing like a standalone marathon.
                  You&apos;re running 26.2 miles after already swimming 2.4
                  miles and biking 112. Your legs are trashed. Your glycogen is
                  depleted. Your mind is fragile. This is where the race truly
                  begins.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Brick Runs
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The single most important type of run training for Ironman is
                  the brick run, running immediately after a long bike ride.
                  The first mile off the bike feels absolutely terrible. Your
                  legs feel like they belong to someone else. That sensation
                  never fully goes away, but brick training teaches your body to
                  transition and find a rhythm faster.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Start with 15-20 minute brick runs after your long rides and
                  build up to 45-60 minutes by peak training. These don&apos;t
                  need to be fast. Just get your legs moving off the bike.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Pacing Strategy
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your Ironman marathon pace will be 60-90 seconds per mile
                  slower than your standalone marathon pace. Accept this now.
                  Start the run conservatively, slower than you think you need
                  to. A good strategy is to run the first 6 miles at an easy,
                  comfortable pace, then settle into your target pace from miles
                  6-20, and then give everything you have left for the final 10K.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Marathon Wall
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  In a standalone marathon, the wall hits around mile 20. In an
                  Ironman marathon, it can hit as early as mile 13-16. When it
                  hits, your pace will slow. You might need to walk. That&apos;s
                  okay. Almost every Ironman finisher walks at some point during
                  the marathon. The key is to keep moving forward. Walk the aid
                  stations, run between them. Even a 14-15 minute per mile
                  walk/run pace will get you to the finish.
                </p>
                <Tip>
                  Set up a run/walk strategy from the start. Many experienced
                  Ironman athletes run 10 minutes, walk 1 minute through every
                  aid station from mile 1. This preserves your legs and keeps
                  your overall pace more consistent than running hard and
                  blowing up at mile 16.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 8: Race Day Nutrition ────── */}
              <div id="race-day-nutrition" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Race Day Nutrition
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Nutrition can make or break your Ironman. You will burn
                  8,000-10,000 calories during the race. You cannot replace all
                  of them, but you need to take in enough to keep moving. Here
                  is a practical nutrition plan:
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Pre-Race (Morning)
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Eat breakfast 3 hours before the start. Stick to foods you
                  know and have practiced. A good pre-race meal: oatmeal with
                  banana and peanut butter, a bagel with cream cheese, or rice
                  with a little salt. Aim for 500-800 calories, mostly carbs.
                  Sip water and electrolytes but don&apos;t chug.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  During the Swim
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You can&apos;t eat during the swim. Just focus on swimming.
                  Have a gel or some calories ready in your transition bag to
                  take immediately after you exit the water.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  During the Bike (The Fueling Window)
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  This is where you do the heavy lifting on nutrition. Target{" "}
                  <span className="text-white font-semibold">
                    250-350 calories per hour
                  </span>{" "}
                  on the bike. Set a timer on your watch to remind you to eat
                  every 20-30 minutes. Alternate between sports drink, gels,
                  bars, and whatever real food you&apos;ve trained with.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  <span className="text-white font-semibold">Electrolytes</span>{" "}
                  are critical. You&apos;re sweating for 10+ hours. Sodium,
                  potassium, and magnesium need to be replaced. Use electrolyte
                  tabs, salt capsules, or electrolyte drink mix. If you start
                  cramping, you&apos;re already behind on electrolytes.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  During the Run
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your stomach will be more sensitive during the run. Drop your
                  intake to{" "}
                  <span className="text-white font-semibold">
                    150-250 calories per hour
                  </span>
                  . Use gels, cola (the caffeine and sugar are clutch late in
                  the race), broth at aid stations, and whatever you can stomach.
                  Many people switch to real food in the back half of the
                  marathon: pretzels, boiled potatoes with salt, even cookies.
                  If it has calories and you can keep it down, eat it.
                </p>
                <Tip>
                  The golden rule of Ironman nutrition: NOTHING NEW ON RACE DAY.
                  Every gel, bar, drink, and food item should be tested
                  extensively during training. Your stomach at hour 12 is not
                  the time to experiment.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 9: Gear Essentials ───────── */}
              <div id="gear-essentials" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Gear Essentials
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You don&apos;t need to spend $15,000 to do an Ironman. You DO
                  need the right gear. Here&apos;s what you actually need vs.
                  what&apos;s nice to have:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      item: "Wetsuit",
                      need: "Essential",
                      detail:
                        "Rent for your first race ($100-150). Buy if you know you're doing more triathlons. Budget: $200-500.",
                    },
                    {
                      item: "Bike",
                      need: "Essential",
                      detail:
                        "A road bike works fine. Add clip-on aero bars ($50-100). Get a professional bike fit ($150-250). Tri bikes are nice but NOT necessary.",
                    },
                    {
                      item: "Helmet",
                      need: "Essential",
                      detail:
                        "Any CPSC-certified helmet works. Aero helmets save time but a standard road helmet is fine for your first race.",
                    },
                    {
                      item: "Tri Suit",
                      need: "Essential",
                      detail:
                        "A one-piece or two-piece tri suit you wear for the entire race. Swim, bike, and run in it. No changing. Budget: $100-200.",
                    },
                    {
                      item: "Running Shoes",
                      need: "Essential",
                      detail:
                        "Shoes you've trained in extensively. Many athletes use elastic laces for faster transitions. Do NOT wear new shoes on race day.",
                    },
                    {
                      item: "Nutrition Belt / Bento Box",
                      need: "Recommended",
                      detail:
                        "A bike bento box or top-tube bag for gels and bars. A run belt if you carry your own nutrition rather than relying on aid stations.",
                    },
                    {
                      item: "GPS Watch",
                      need: "Recommended",
                      detail:
                        "Track your pace, heart rate, and nutrition reminders. Garmin and COROS are popular. Useful but not mandatory.",
                    },
                    {
                      item: "Flat Kit",
                      need: "Essential",
                      detail:
                        "Spare tube, tire levers, CO2 inflator or mini pump. Practice changing a flat before race day. A flat is not a DNF. It's a 5-minute delay.",
                    },
                  ].map((g) => (
                    <div
                      key={g.item}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4"
                    >
                      <span
                        className={`text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-lg h-fit whitespace-nowrap ${
                          g.need === "Essential"
                            ? "bg-red-600/20 text-red-400 border border-red-600/30"
                            : "bg-white/5 text-gray-500 border border-white/10"
                        }`}
                      >
                        {g.need}
                      </span>
                      <div>
                        <p className="text-white font-bold text-sm">
                          {g.item}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {g.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Tip>
                  A bike fit is the single best investment you can make. It
                  prevents injury, increases power output, and makes 112 miles
                  significantly more comfortable. Don&apos;t skip it.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 10: Mental Game ──────────── */}
              <div id="mental-game" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  The Mental Game
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  An Ironman is 30% physical, 70% mental. Your body will be
                  trained. Your fitness will be there. But at some point during
                  the race, maybe mile 80 on the bike, maybe mile 16 of the
                  marathon, you will want to quit. Every Ironman finisher has
                  been there.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Dark Places
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  There will be a period during the race where everything feels
                  wrong. Your legs hurt. Your stomach is off. You&apos;re
                  questioning every decision that led you to this moment. This is
                  the dark place, and it&apos;s completely normal. It&apos;s
                  temporary. I promise you it passes. Just keep moving.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  During my Ironman, the dark place hit around mile 85 on the
                  bike. The wind was brutal on the second loop, my stomach was
                  turning, and I still had 55+ miles left including a full
                  marathon. For about 30 minutes, I genuinely considered
                  quitting. But I didn&apos;t stop pedaling. I ate something
                  small. I got to the next aid station. And slowly, it passed.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How to Push Through
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Break it into small pieces.
                    </span>{" "}
                    Don&apos;t think about the finish line when you&apos;re at
                    mile 70 on the bike. Think about getting to the next aid
                    station. The next mile marker. The next song on your
                    playlist. Shrink the race down to the next 10 minutes.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Have a mantra.
                    </span>{" "}
                    Something short and powerful you repeat when things get
                    hard. Mine was &ldquo;one more mile.&rdquo; Pick yours
                    before race day and practice it during tough training
                    sessions.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Think about your people.
                    </span>{" "}
                    Think about who&apos;s waiting at the finish line. Think
                    about the people who supported your training. Think about
                    the version of yourself that signed up for this race and
                    believed it was possible. Don&apos;t let them down.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Remember: pain is temporary.
                    </span>{" "}
                    The suffering you feel at mile 20 of the marathon will be a
                    distant memory by the time you cross the finish line. The
                    finish line feeling lasts forever. The pain does not.
                  </p>
                </div>
                <Tip>
                  Mile 80+ on the bike is where most races are lost. If you can
                  get through the last 30 miles of the bike with your nutrition
                  intact and your spirits up, you&apos;re going to finish.
                  The marathon is hard, but by then you can see the end. The
                  late bike miles are the loneliest part of the race.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 11: Dylan's Race Day Tips ── */}
              <div id="dylans-race-day-tips" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Dylan&apos;s Race Day Tips
                </h2>
                <SectionImage
                  src="/images/gallery/ironman-final.jpg"
                  alt="Dylan finishing Ironman Wisconsin"
                  caption="The Finish Line - 13:54:29"
                  imagePosition="top"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  These are the specific lessons I learned finishing Ironman
                  Wisconsin in{" "}
                  <span className="text-white font-semibold">13:54:29</span>.
                  Not generic advice. These are things I wish someone had told
                  me.
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Rack your bike the day before and walk the transition area",
                      detail:
                        "Know exactly where your spot is, where the swim exit feeds into T1, where the bike out and bike in are, and where T2 starts. Race morning is chaos. Eliminate variables.",
                    },
                    {
                      num: "02",
                      title: "Wake up 3+ hours before the race start",
                      detail:
                        "Eat your pre-race meal, use the bathroom (multiple times), apply body glide, put on your wetsuit, and get to the swim start with time to spare. Rushing creates anxiety.",
                    },
                    {
                      num: "03",
                      title: "Body Glide everywhere",
                      detail:
                        "Neck (wetsuit rub), armpits, inner thighs, feet, and anywhere your tri suit seams sit. 13+ hours of movement will destroy any spot that chafes. Be generous with it.",
                    },
                    {
                      num: "04",
                      title: "Ride your own race on the bike",
                      detail:
                        "People will fly past you in the first 30 miles. Let them. You will catch many of them on the run when they've blown up from riding too hard. Discipline on the bike wins Ironman races.",
                    },
                    {
                      num: "05",
                      title: "Take in calories even when you don't want to",
                      detail:
                        "Around hour 8-10, your appetite will disappear. Eat anyway. Even if it's just sips of cola and a few pretzels. The moment you stop eating is the moment your race starts falling apart.",
                    },
                    {
                      num: "06",
                      title: "Walk the aid stations on the run",
                      detail:
                        "Take 30-60 seconds at each aid station to walk, drink, eat, and pour cold water on your head. These walking breaks preserve your legs and the time lost is minimal compared to the benefit.",
                    },
                    {
                      num: "07",
                      title: "Smile when the cameras are out",
                      detail:
                        "You're doing an Ironman. Even when it hurts, you're living a moment most people will never experience. The photos from race day are ones you'll look at for the rest of your life. Smile in them.",
                    },
                    {
                      num: "08",
                      title: "The last mile is the best mile of your life",
                      detail:
                        "When you turn onto the finisher's chute and hear the crowd, when the announcer calls your name and says those words, \"YOU ARE AN IRONMAN,\" nothing else matters. Every early morning, every long ride, every hard run leads to that moment. Soak it in.",
                    },
                  ].map((tip) => (
                    <div
                      key={tip.num}
                      className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-black text-red-600/40 font-mono flex-shrink-0">
                          {tip.num}
                        </span>
                        <div>
                          <p className="text-white font-bold mb-1">
                            {tip.title}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {tip.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SectionDivider />

              {/* ── CTA / SHARE ──────────────────────── */}
              <div ref={cta.ref} className="py-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={cta.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
                    That&apos;s The Guide
                  </p>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                    Now Go Become an Ironman
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    If this guide helped you, share it with someone who needs it.
                    Follow along as I train for Ironman Lake Placid 2026.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <button
                      onClick={handleShare}
                      className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
                    >
                      {copied ? "Link Copied!" : "Share This Guide"}
                    </button>
                    <a
                      href="/resources"
                      className="px-8 py-3.5 bg-white/5 border border-white/10 hover:border-red-600/50 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
                    >
                      All Resources
                    </a>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center justify-center gap-6 mt-8">
                    <a
                      href="https://www.instagram.com/cramerdyl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@dylcramer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@dylcramer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="YouTube"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>

                  {/* InstaCal plug */}
                  <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto">
                    <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-2">
                      Track Your Nutrition
                    </p>
                    <p className="text-white font-bold mb-2">
                      Download InstaCal
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      The AI-powered calorie tracker I built. Snap a photo of
                      your food and get instant macro breakdowns. Perfect for
                      dialing in your race nutrition.
                    </p>
                    <a
                      href="https://theinstacal.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Get InstaCal
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
