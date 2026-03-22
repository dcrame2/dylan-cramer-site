"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── data ─────────────────────────────────────────────── */

const sections = [
  { id: "why-nutrition-matters", label: "Why Nutrition Matters" },
  { id: "calories-per-hour", label: "Calories Per Hour" },
  { id: "stomach-training", label: "Stomach Training" },
  { id: "liquid-vs-solid", label: "Liquid vs Solid Calories" },
  { id: "aid-station-strategy", label: "Aid Station Strategy" },
  { id: "electrolyte-strategy", label: "Electrolyte Strategy" },
  { id: "caffeine-strategy", label: "Caffeine Strategy" },
  { id: "night-running-fuel", label: "Night Running Fuel" },
  { id: "race-day-plan", label: "Race Day Nutrition Plan" },
  { id: "tunnel-hill-nutrition", label: "What I Ate at Tunnel Hill 100" },
  { id: "common-mistakes", label: "Common Mistakes" },
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

let sectionImageCount = 0;

function SectionImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const isLeft = sectionImageCount % 2 === 0;
  sectionImageCount++;

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white/5 my-4 w-full md:w-[45%] ${
        isLeft ? "md:float-left md:mr-6 md:mb-4" : "md:float-right md:ml-6 md:mb-4"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        sizes="(max-width: 768px) 100vw, 340px"
        className="w-full h-auto"
      />
      <p className="px-3 py-2 text-xs uppercase tracking-widest text-red-400 font-mono">
        {caption}
      </p>
    </div>
  );
}

/* ── component ────────────────────────────────────────── */

export default function UltraMarathonNutrition() {
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
          title: "Ultra Marathon Nutrition Guide - Dylan Cramer",
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
            src="/images/gallery/tunnel-hill-finish.jpg"
            alt="Dylan finishing Tunnel Hill 100"
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
            Free Guide &middot; 20 Min Read
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Ultra Marathon</span>
            <br />
            <span className="text-red-500">Nutrition Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            How to fuel for 50K, 50-mile, and 100-mile races. From someone who
            learned the hard way what works, and what sends you to the porta
            potty at mile 60.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#why-nutrition-matters"
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
              {/* ── Section 1: Why Nutrition Matters ──── */}
              <div id="why-nutrition-matters" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    Why Nutrition Matters in Ultras
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    In a road marathon, you can get away with mediocre nutrition.
                    You might bonk at mile 22, but you can white-knuckle your way
                    to the finish on willpower alone. In an ultra marathon,
                    nutrition IS the race. Your fitness gets you to the start
                    line. Your fueling determines whether you finish.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    During a 100-mile race, you&apos;ll burn somewhere between{" "}
                    <span className="text-white font-semibold">
                      10,000 and 15,000 calories
                    </span>
                    . You can only absorb and use a fraction of that in real
                    time. The gap between what you burn and what you can take in
                    is what makes ultra nutrition so brutally important. Get it
                    wrong and you&apos;ll be sitting in a chair at mile 65,
                    unable to move, wondering where it all went sideways.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Get it right, and you&apos;ll be passing people at mile 80
                    who are faster than you but forgot to eat. I&apos;ve seen it
                    happen. I&apos;ve been on both sides.
                  </p>
                  <div className="grid grid-cols-3 gap-4 my-8">
                    {[
                      { distance: "50K", calories: "3,500-5,000", time: "4-8 hrs" },
                      { distance: "50 Mi", calories: "6,000-9,000", time: "8-14 hrs" },
                      { distance: "100 Mi", calories: "10,000-15,000", time: "18-30+ hrs" },
                    ].map((d) => (
                      <div
                        key={d.distance}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center"
                      >
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {d.distance}
                        </p>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                          {d.calories} cal
                        </p>
                        <p className="text-sm text-red-400 font-bold mt-1">
                          {d.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <SectionDivider />

              {/* ── Section 2: Calories Per Hour ────────── */}
              <div id="calories-per-hour" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Calories Per Hour<span className="text-red-500">:</span> The
                  Numbers
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The general target for ultra marathon fueling is{" "}
                  <span className="text-white font-semibold">
                    200-350 calories per hour
                  </span>
                  . But this is a range, not a rule. Your ideal number depends on
                  pace, body size, temperature, terrain, and what your stomach
                  can actually handle.
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      race: "50K (competitive pace)",
                      cals: "250-300 cal/hr",
                      detail:
                        "Similar to marathon fueling. Gels and sports drink work fine. You're moving fast enough that solid food can be hard to digest.",
                    },
                    {
                      race: "50 Mile",
                      cals: "200-300 cal/hr",
                      detail:
                        "The sweet spot where you start needing real food. Your pace is slower, digestion works better, and you'll want variety. Mix gels with sandwiches, potatoes, and fruit.",
                    },
                    {
                      race: "100 Mile",
                      cals: "200-350 cal/hr",
                      detail:
                        "Sustained eating over 20-30+ hours. Early miles can be gel-heavy, but by hour 12 you'll likely need real food. Listen to your body. Some hours you'll eat 350+ cals, others you'll struggle to get 150 down.",
                    },
                  ].map((p) => (
                    <div
                      key={p.race}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {p.race}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {p.cals}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{p.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here&apos;s the math that matters: if you&apos;re burning 600
                  calories per hour and absorbing 250, you&apos;re running a 350
                  calorie per hour deficit. Over 24 hours, that&apos;s an 8,400
                  calorie hole. Your body can pull from fat stores to cover some
                  of this, but not all. Fall too far behind on calories and
                  you&apos;ll hit a wall that no amount of mental toughness can
                  push through.
                </p>
                <Tip>
                  Set a recurring timer on your watch for every 20-30 minutes.
                  When it goes off, eat something. Don&apos;t wait until
                  you&apos;re hungry. By the time you feel hunger in an ultra,
                  you&apos;re already deep in a caloric hole that&apos;s very
                  hard to climb out of.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 3: Stomach Training ─────────── */}
              <div id="stomach-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Stomach Training<span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/ultra-snack.jpg"
                  alt="Fueling during an ultra marathon"
                  caption="Fueling on the Move"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your stomach is a muscle that needs to be trained just like
                  your legs. If you never practice eating while running, your
                  race day nutrition plan is worthless because your gut will
                  reject everything you put in it.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  GI distress is the number one reason people DNF ultras. Not
                  injury. Not fitness. Their stomach shuts down, they
                  can&apos;t take in calories, their energy crashes, and
                  they&apos;re done. This is almost entirely preventable with
                  proper training.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How to Train Your Gut
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Start small and build up.
                    </span>{" "}
                    Begin by eating 100-150 calories per hour on your long runs.
                    Gradually increase to 200-300+ calories per hour over 8-12
                    weeks. Your stomach adapts, but it takes time.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Practice with race day foods.
                    </span>{" "}
                    If you plan to eat PB&amp;J at aid stations, eat PB&amp;J on
                    your long runs. If you&apos;ll use a specific gel brand,
                    train with it. Every single item on your race day menu
                    should have been tested multiple times in training.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Train at race intensity.
                    </span>{" "}
                    Eating at an easy jog is very different from eating at your
                    target ultra pace. Practice fueling at the effort level
                    you&apos;ll actually be running on race day.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Build a menu of options.
                    </span>{" "}
                    Over the course of a 100-miler, you&apos;ll develop
                    aversions to foods you normally love. Having 5-8 different
                    foods you know your stomach can handle gives you backups
                    when your primary fuel stops working.
                  </p>
                </div>
                <Tip>
                  Start gut training 3-4 months before your race. Do at least
                  one long run per week where you practice eating at your target
                  calorie rate. By race day, eating while running should feel
                  completely natural.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 4: Liquid vs Solid ──────────── */}
              <div id="liquid-vs-solid" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Liquid vs Solid Calories
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  This is one of the most debated topics in ultra nutrition, and
                  the answer is simple: you need both. The ratio shifts as the
                  race gets longer and as your body gets more fatigued.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Liquid Calories
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sports drink, liquid meal replacements (Ensure, Tailwind,
                  Maurten drink mix), cola, broth. Liquid calories are easier to
                  digest and absorb faster. They&apos;re your best friend in the
                  early miles and when your stomach starts getting cranky in the
                  later stages. The downside: they&apos;re less satiating. You
                  won&apos;t feel &ldquo;full&rdquo; on liquid calories alone,
                  which can mess with your head over 20+ hours.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Solid Calories
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sandwiches, boiled potatoes, pretzels, bananas, rice balls,
                  quesadillas, cookies, candy. Solid food takes longer to digest
                  but provides sustained energy and satisfies the psychological
                  need to actually eat something real. In a 100-miler, you will
                  crave real food. Embrace it.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Shift Pattern
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      phase: "Miles 0-30",
                      ratio: "70% liquid / 30% solid",
                      detail:
                        "Pace is relatively fast. Stick to gels, sports drink, and easy-to-eat snacks. Save your stomach for later.",
                    },
                    {
                      phase: "Miles 30-60",
                      ratio: "50% liquid / 50% solid",
                      detail:
                        "Pace slows, digestion improves. Start mixing in real food. PB&J, potatoes, quesadilla slices. Your body wants substance.",
                    },
                    {
                      phase: "Miles 60-80",
                      ratio: "40% liquid / 60% solid",
                      detail:
                        "Your stomach may start rejecting sweet gels. Pivot to savory food. Broth, ramen, grilled cheese. Salt is king here.",
                    },
                    {
                      phase: "Miles 80-100",
                      ratio: "Variable",
                      detail:
                        "Eat whatever you can keep down. Cola, cookies, broth, potato chips. Palatability matters more than nutrition science at this point.",
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
                          {p.ratio}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{p.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Carry a flask of concentrated liquid calories (Tailwind, Maurten,
                  or Skratch) as your baseline, then supplement with solid food at
                  aid stations. This guarantees a minimum calorie floor even when
                  your stomach is fighting you on solids.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 5: Aid Station Strategy ─────── */}
              <div id="aid-station-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Aid Station Strategy<span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/ultra-wave.jpg"
                  alt="Waving during an ultra marathon"
                  caption="Aid Station Energy"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Ultra aid stations are a whole different world from road
                  marathon water stops. They&apos;re fully stocked mini
                  buffets with volunteers who will make you food, fill your
                  bottles, and cheer you on. They&apos;re also time sinks
                  that can kill your race if you&apos;re not disciplined.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What&apos;s Typically Available
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Most 100-mile aid stations stock: PB&amp;J sandwiches,
                  boiled potatoes with salt, chips, pretzels, bananas, oranges,
                  watermelon, M&amp;Ms, cookies, broth, ramen, quesadillas,
                  cola, ginger ale, water, and electrolyte drink. Some even
                  have grilled cheese, pizza, and soup. Check your race&apos;s
                  website for the specific aid station menu and plan accordingly.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The 5-Minute Rule
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Know what you need before you arrive. Spend no more than 3-5
                  minutes at any aid station. Sit down if you need to, eat
                  something, refill bottles, and get moving. I&apos;ve seen
                  runners lose 30-45 minutes across a 100-miler just from
                  lingering at aid stations. That chair at mile 70 is the most
                  dangerous thing on the course. Once you sit down, it takes
                  enormous willpower to stand back up.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Crew vs Self-Supported
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you have a crew, give them a clear list of what you want at
                  each station: specific foods, fresh bottles, clothing changes,
                  headlamp, etc. A good crew saves you time and mental energy. If
                  you&apos;re running self-supported, use drop bags strategically.
                  Pack your favorite foods, a backup headlamp, extra socks, and
                  anything the aid station might not have.
                </p>
                <Tip>
                  Make a laminated index card listing your nutrition plan for
                  each aid station: what to eat, what to refill, any gear
                  changes. Tape it to your pack or give it to your crew. At
                  mile 75, your brain will not remember the plan you made when
                  you were fresh. The card remembers for you.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 6: Electrolyte Strategy ─────── */}
              <div id="electrolyte-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Electrolyte Strategy<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Electrolytes are non-negotiable in ultra running. You&apos;re
                  sweating for 8-30+ hours. Sodium, potassium, magnesium, and
                  calcium are leaving your body the entire time. If you
                  don&apos;t replace them, you&apos;ll experience cramping,
                  nausea, confusion, and eventually hyponatremia, a dangerous
                  condition where your blood sodium drops too low.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Sodium Is King
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Target{" "}
                  <span className="text-white font-semibold">
                    500-1000mg of sodium per hour
                  </span>{" "}
                  depending on your sweat rate and conditions. Hot and humid
                  races push you toward the higher end. Cooler conditions and
                  lighter sweaters can stay lower. You get sodium from
                  electrolyte drink, salt capsules (SaltStick, LMNT), salty
                  foods at aid stations, and broth.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Signs You&apos;re Behind on Electrolytes
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">Cramping</span>{" "}
                    is the classic sign. If your calves, quads, or hamstrings
                    start seizing, you need sodium immediately. Salt capsules
                    and broth are the fastest fixes.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">Nausea</span>{" "}
                    is often blamed on food, but frequently caused by low
                    sodium. If you feel nauseous and you&apos;ve been drinking
                    plain water without electrolytes, that&apos;s likely the
                    culprit.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Puffy hands and fingers
                    </span>{" "}
                    is a sign of water retention from low sodium. Your body
                    is holding onto water because it doesn&apos;t have enough
                    salt to process it.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Mental fog
                    </span>{" "}
                    means confusion, disorientation, and difficulty making
                    decisions. This is serious. If you or someone around you
                    seems confused, get electrolytes and medical attention if
                    needed.
                  </p>
                </div>
                <Tip>
                  Don&apos;t just drink plain water. Every time you drink, make
                  sure electrolytes are in the mix. Alternating one bottle of
                  electrolyte drink with one bottle of plain water is a solid
                  baseline strategy. In hot conditions, add salt capsules on
                  top of that.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 7: Caffeine Strategy ────────── */}
              <div id="caffeine-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Caffeine Strategy<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Caffeine is the most powerful legal performance enhancer
                  available to ultra runners. It reduces perceived effort,
                  improves alertness, and can pull you out of a dark place at
                  mile 70 when your body is begging you to stop. But timing and
                  dosing matter.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Caffeine Protocol
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      phase: "Miles 0-40",
                      strategy: "Little to no caffeine",
                      detail:
                        "Save it. You don't need it yet. Your body has plenty of natural energy. Using caffeine early means it won't be as effective when you really need it later.",
                    },
                    {
                      phase: "Miles 40-60",
                      strategy: "Start light, 50-100mg",
                      detail:
                        "A caffeinated gel or half a cup of cola. This is your first boost. It'll hit just as fatigue starts building and the sun may be going down.",
                    },
                    {
                      phase: "Miles 60-80",
                      strategy: "Moderate, 100-200mg per hour",
                      detail:
                        "Cola at every aid station, caffeinated gels, or caffeine pills. You're likely running through the night now. Caffeine keeps the lights on mentally.",
                    },
                    {
                      phase: "Miles 80-100",
                      strategy: "Whatever it takes",
                      detail:
                        "Full cola, Mountain Dew, double-caffeine gels. You're in survival mode. The finish line is close. Caffeine is your best friend for the final push.",
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
                          {p.strategy}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{p.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  If you&apos;re a daily coffee drinker, consider reducing your
                  caffeine intake in the 5-7 days before the race. This
                  re-sensitizes your body to caffeine so the race day doses hit
                  harder. Don&apos;t cut it completely (you&apos;ll get
                  withdrawal headaches), just reduce by 50%.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 8: Night Running Fuel ───────── */}
              <div id="night-running-fuel" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Night Running Fuel Tips
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/night-trail.jpg"
                  alt="Running trails at night with headlamp"
                  caption="Night Miles - Tunnel Hill"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Running through the night changes everything about your
                  nutrition. Your body&apos;s circadian rhythm is telling you
                  to sleep, your core temperature drops, your digestion slows,
                  and the foods that worked at mile 30 now make you gag. This
                  is where most 100-mile races are decided.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What Changes at Night
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Sweet foods become revolting.
                    </span>{" "}
                    After 12+ hours of gels and sports drink, your body will
                    revolt against anything sweet. This is incredibly common.
                    Pivot to savory: broth, ramen, potatoes with salt, grilled
                    cheese, quesadillas.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Warm foods are comforting.
                    </span>{" "}
                    A cup of hot broth or ramen at a night aid station is
                    medicinal. It warms you from the inside, provides sodium,
                    and gives you a psychological boost that no gel can match.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Caffeine becomes critical.
                    </span>{" "}
                    This is when you deploy your caffeine strategy. Cola, coffee
                    (some aid stations have it), and caffeinated gels keep you
                    alert and moving through the darkest hours.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Smaller, more frequent bites.
                    </span>{" "}
                    Instead of trying to eat a full sandwich, take 2-3 bites and
                    keep moving. Eat a little something every 15-20 minutes
                    rather than a lot every 45 minutes. Your sluggish nighttime
                    stomach handles small amounts much better.
                  </p>
                </div>
                <Tip>
                  Pack a small ziplock of your favorite salty snacks in your drop
                  bag for the night aid stations: potato chips, salted
                  cashews, pretzels. When your stomach is rebelling against
                  everything at the aid station, having your comfort food can
                  save your race.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 9: Race Day Nutrition Plan ──── */}
              <div id="race-day-plan" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Race Day Nutrition Plan
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here is a practical, actionable nutrition plan framework for
                  a 100-mile race. Adjust quantities based on your training
                  experience and stomach tolerance.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Pre-Race (3 Hours Before Start)
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  500-800 calories of familiar, easy-to-digest carbs. Oatmeal
                  with banana and honey, a bagel with peanut butter, or white
                  rice with a little salt. Sip 16-20oz of electrolyte drink.
                  Use the bathroom. Then stop eating 60-90 minutes before the
                  gun so your stomach is settled.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  During the Race
                </h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Phase
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Target Cal/Hr
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Primary Fuel
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Miles 0-25
                        </td>
                        <td className="py-3 px-4">250-300</td>
                        <td className="py-3 px-4">
                          Gels, sports drink, banana, light snacks
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Miles 25-50
                        </td>
                        <td className="py-3 px-4">250-350</td>
                        <td className="py-3 px-4">
                          Mix of gels and real food: PB&amp;J, potatoes, fruit
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Miles 50-75
                        </td>
                        <td className="py-3 px-4">200-300</td>
                        <td className="py-3 px-4">
                          Savory food: broth, ramen, quesadillas, cola
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">
                          Miles 75-100
                        </td>
                        <td className="py-3 px-4">150-250</td>
                        <td className="py-3 px-4">
                          Whatever you can keep down: cola, broth, chips, cookies
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Hydration Targets
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Aim for{" "}
                  <span className="text-white font-semibold">
                    16-24oz of fluid per hour
                  </span>
                  , adjusted for heat and humidity. In hot conditions, push
                  toward 30oz. In cooler weather, 16oz may be sufficient.
                  Alternate between electrolyte drink and water. If your pee
                  is clear, you&apos;re over-hydrating (risk of hyponatremia).
                  If it&apos;s dark yellow, drink more.
                </p>
                <Tip>
                  Write your nutrition plan on your arm with a permanent marker.
                  List the key numbers: cal/hr, sodium/hr, fluid/hr. When
                  your brain is mush at hour 20, you can just look at your arm
                  and know what to do.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 10: Tunnel Hill 100 ────────── */}
              <div id="tunnel-hill-nutrition" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  What I Ate at Tunnel Hill 100
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Here&apos;s exactly what I ate and drank during Tunnel Hill
                  100. Not a theoretical plan. This is what I actually consumed
                  across 100 miles of crushed limestone trail in southern
                  Illinois.
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Pre-Race: Oatmeal, banana, peanut butter, coffee",
                      detail:
                        "Ate at 3:30 AM. About 700 calories. Nothing fancy. Same breakfast I ate before every long run in training. A cup of coffee for the ritual more than the caffeine.",
                    },
                    {
                      num: "02",
                      title: "Miles 0-25: Maurten gels + Tailwind in bottles",
                      detail:
                        "One Maurten gel every 30 minutes, sipping Tailwind from my flask. About 280 cal/hr. Felt great. Everything was working. Also grabbed a banana at the mile 12.5 aid station.",
                    },
                    {
                      num: "03",
                      title: "Miles 25-50: PB&J, boiled potatoes, Coke",
                      detail:
                        "Started mixing in real food. Half a PB&J every aid station, a few potato pieces with salt. First Coke at mile 37. Still taking Maurten gels between stations but starting to get tired of sweet flavors.",
                    },
                    {
                      num: "04",
                      title: "Miles 50-70: Broth, ramen, chips, lots of Coke",
                      detail:
                        "Sweet foods were done. Couldn't look at another gel. Switched to broth and ramen at every aid station. Potato chips became my best friend. Coke at every stop. About 200-250 cal/hr.",
                    },
                    {
                      num: "05",
                      title: "Miles 70-85: Survival eating. Coke, broth, pretzels",
                      detail:
                        "The lowest point nutritionally. Stomach was touchy. Forced down small sips of Coke and broth. Nibbled pretzels. Maybe 150 cal/hr. Took two caffeine pills at mile 75.",
                    },
                    {
                      num: "06",
                      title: "Miles 85-100: Second wind. Coke, cookies, grilled cheese",
                      detail:
                        "Something clicked around mile 85. The sun came up. My appetite returned slightly. Had a grilled cheese at mile 87 that I still think about. Coke and cookies carried me home.",
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
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Total estimated intake: roughly 7,000-8,000 calories over
                  the entire race. Was it perfectly optimized? No. Did I finish?
                  Yes. The lesson: have a plan, execute it as well as you can,
                  and adapt when your body tells you the plan needs to change.
                </p>
              </div>

              <SectionDivider />

              {/* ── Section 11: Common Mistakes ────────── */}
              <div id="common-mistakes" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Common Nutrition Mistakes
                  <span className="text-red-500">.</span>
                </h2>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Starting too fast and forgetting to eat",
                      detail:
                        "The adrenaline of race start suppresses hunger. By the time you realize you haven't eaten in 2 hours, you're already in a hole. Set that timer from mile 1.",
                    },
                    {
                      num: "02",
                      title: "Only training with gels",
                      detail:
                        "Gels work great for 3-4 hours. For 20+ hours, you need real food. If you've never eaten a sandwich while running, race day is not the time to try it for the first time.",
                    },
                    {
                      num: "03",
                      title: "Drinking only water",
                      detail:
                        "Plain water without electrolytes over many hours can cause hyponatremia. Always pair water intake with sodium. This is not optional. It's a safety issue.",
                    },
                    {
                      num: "04",
                      title: "Trying new foods on race day",
                      detail:
                        "That random energy bar at the mile 50 aid station looks great until it gives you violent stomach cramps for the next 10 miles. Stick to what you've trained with.",
                    },
                    {
                      num: "05",
                      title: "Eating too much too fast",
                      detail:
                        "Slamming 500 calories at an aid station because you're behind on nutrition is a recipe for vomiting. Small, frequent intake beats large infrequent meals every time.",
                    },
                    {
                      num: "06",
                      title: "Ignoring early signs of GI distress",
                      detail:
                        "A little nausea at mile 40 is a warning. Slow down, switch to liquid calories, take some ginger chews. If you ignore it, it becomes full-blown vomiting at mile 55.",
                    },
                    {
                      num: "07",
                      title: "No backup plan",
                      detail:
                        "If your primary fuel is Maurten gels and your stomach rejects them at mile 45, what's Plan B? Always have 2-3 backup fuel sources you've tested in training.",
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
                <Tip>
                  The best nutrition plan is the one you&apos;ve practiced 20+
                  times in training. There are no shortcuts here. Put in the
                  gut training during your long runs and your race day stomach
                  will thank you.
                </Tip>
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
                    Now Go Fuel Your Ultra
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    If this guide helped you, share it with someone who&apos;s
                    about to toe the line at their first ultra. Follow along as
                    I train for more ultras and Ironman Lake Placid 2026.
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
