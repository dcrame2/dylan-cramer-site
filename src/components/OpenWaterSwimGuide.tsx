"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── data ─────────────────────────────────────────────── */

const sections = [
  { id: "pool-to-open-water", label: "Pool to Open Water" },
  { id: "wetsuit-selection", label: "Wetsuit Selection & Fitting" },
  { id: "sighting-technique", label: "Sighting Technique" },
  { id: "drafting", label: "Drafting in Open Water" },
  { id: "waves-and-current", label: "Waves, Current & Chop" },
  { id: "cold-water", label: "Cold Water Acclimation" },
  { id: "breathing", label: "Breathing in Choppy Water" },
  { id: "race-start-strategy", label: "Race Start Strategy" },
  { id: "training-locations", label: "Training in Lakes & Ocean" },
  { id: "safety", label: "Safety & Group Etiquette" },
  { id: "dylans-swim-tips", label: "Dylan's Open Water Tips" },
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
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden my-8">
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
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

export default function OpenWaterSwimGuide() {
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
          title: "Open Water Swimming Guide for Triathletes - Dylan Cramer",
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
            src="/images/gallery/open-water-swim.jpg"
            alt="Open water swimming in a lake"
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
            <span className="text-white">Open Water</span>
            <br />
            <span className="text-red-500">Swimming Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Everything you need to know about open water swimming for
            triathlons. From pool swimmer to confident open water athlete.
            Tips from Ironman Wisconsin and Chicago lakefront training.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#pool-to-open-water"
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
              {/* ── Section 1: Pool to Open Water ─────── */}
              <div id="pool-to-open-water" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    Pool to Open Water
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    If you can swim 2,000 meters in a pool, you have the
                    fitness for open water. But fitness is only half the
                    equation. Open water swimming is a completely different
                    skill set. The pool is controlled: lane lines, a black
                    line on the bottom, walls to push off, clear water, and a
                    consistent depth. Open water has none of that.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    In open water, you&apos;re navigating murky water where you
                    can&apos;t see the bottom. There are no lane lines to keep
                    you straight. Waves push you off course. Other swimmers
                    are kicking and grabbing at you. The bottom drops away
                    beneath you. It&apos;s uncomfortable, disorienting, and
                    honestly a little terrifying the first time.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    And that&apos;s exactly why you need to practice it before
                    race day. The swimmers who panic in the Ironman swim
                    are almost always the ones who only trained in a pool.
                  </p>
                  <div className="grid grid-cols-2 gap-4 my-8">
                    {[
                      { label: "Pool", traits: "Lane lines, clear water, walls, black line, controlled temp, solo" },
                      { label: "Open Water", traits: "No lines, murky water, no walls, waves, variable temp, crowds" },
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                      >
                        <p className="text-xl font-black text-red-400 mb-2">
                          {d.label}
                        </p>
                        <p className="text-sm text-gray-400">{d.traits}</p>
                      </div>
                    ))}
                  </div>
                  <Tip>
                    Get into open water at least 8-10 times before your race.
                    Your first session should be short: just 10-15 minutes of
                    easy swimming to acclimate. Don&apos;t worry about distance.
                    Get comfortable with the feeling. The distance comes later.
                  </Tip>
                </motion.div>
              </div>

              <SectionDivider />

              {/* ── Section 2: Wetsuit Selection ─────── */}
              <div id="wetsuit-selection" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Wetsuit Selection &amp; Fitting
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/swim-exit.jpg"
                  alt="Exiting the water in a wetsuit"
                  caption="Wetsuit Swim Exit"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A triathlon-specific wetsuit is one of the best investments
                  you&apos;ll make as a triathlete. It adds buoyancy (making
                  you faster and more efficient), keeps you warm in cold water,
                  and provides a psychological safety net. A good wetsuit can
                  take 5-10 minutes off your Ironman swim time.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Triathlon vs. Surfing Wetsuits
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Do NOT use a surfing wetsuit for triathlon. Triathlon wetsuits
                  are specifically designed with flexible shoulder panels for
                  the overhead swimming motion, thicker neoprene in the core
                  for buoyancy, and thinner material in the arms and legs for
                  range of motion. A surfing wetsuit will restrict your stroke
                  and gas you within 200 meters.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Fit Is Everything
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A wetsuit should fit like a second skin: tight everywhere
                  with no air pockets, but not so tight that it restricts
                  breathing or shoulder movement. The neck seal should be snug
                  but not choking. Water should not be flushing in and out
                  freely. When trying on a wetsuit, do swimming arm motions for
                  2-3 minutes. If your shoulders fatigue quickly, it&apos;s too
                  tight in the chest and shoulders.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Rent First
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  For your first triathlon season, rent a wetsuit ($75-150 for
                  the season or $50-80 for a single race). This lets you figure
                  out what size and style works without dropping $300-600 on a
                  suit that might not fit right. Many local tri shops and online
                  services offer rental programs.
                </p>
                <Tip>
                  Apply Body Glide or Trislide to your neck, wrists, and ankles
                  before putting on your wetsuit. This prevents chafing during
                  the swim and makes it significantly easier to strip off in
                  transition. Practice wetsuit removal at home. It&apos;s a
                  skill that saves 30-60 seconds in T1.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 3: Sighting ──────────────── */}
              <div id="sighting-technique" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Sighting Technique<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sighting is the single most important open water skill.
                  Without lane lines, your body naturally drifts off course.
                  Most swimmers veer to one side without realizing it. Over
                  2.4 miles, bad sighting can add 200-400 extra meters to your
                  swim. That&apos;s 3-7 minutes of free time lost.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How to Sight
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      The crocodile eyes technique.
                    </span>{" "}
                    Lift your head just enough to get your goggles above the
                    waterline, like a crocodile. You don&apos;t need to see
                    perfectly. You just need to locate the next buoy or
                    landmark. Then immediately drop your head back down and
                    resume your stroke.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Integrate with your breathing.
                    </span>{" "}
                    Sight forward, then rotate to breathe. This creates one
                    fluid motion: eyes up, spot the buoy, head turns to
                    breathe, resume stroke. Practice this as a drill in the
                    pool.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Sight every 6-10 strokes.
                    </span>{" "}
                    In calm water, you can sight less frequently. In choppy
                    water or crowded conditions, sight more often. The cost of
                    a few extra sighting strokes is tiny compared to the cost
                    of swimming 100 meters off course.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Use landmarks, not just buoys.
                    </span>{" "}
                    Buoys are small and hard to see in waves. Find a tall,
                    stationary landmark behind the buoy: a building, a tree,
                    a flagpole. Aim for the big target and you&apos;ll
                    naturally hit the buoy.
                  </p>
                </div>
                <Tip>
                  Practice sighting in the pool. Swim a few laps with your
                  eyes closed, then sight a specific object at the end of the
                  lane. You&apos;ll be amazed how far off course you drift in
                  just 25 meters. This builds awareness of your natural drift
                  pattern.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 4: Drafting ──────────────── */}
              <div id="drafting" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Drafting in Open Water
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Drafting is legal in the swim (unlike the bike in
                  non-drafting triathlons) and it&apos;s one of the biggest
                  free speed gains available. Swimming in the wake of another
                  swimmer reduces your energy expenditure by{" "}
                  <span className="text-white font-semibold">18-25%</span>.
                  That&apos;s massive over 2.4 miles.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Drafting Positions
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      position: "Directly Behind (feet)",
                      savings: "~20-25% energy savings",
                      detail:
                        "The most effective position. Swim with your head near the lead swimmer's feet. You ride in their wake like a cyclist in a peloton. The downside: you may get kicked in the face.",
                    },
                    {
                      position: "Hip Draft (side)",
                      savings: "~15-18% energy savings",
                      detail:
                        "Swim at the lead swimmer's hip, slightly behind. Less energy savings than feet drafting, but you can see where you're going and you won't get kicked. Good for congested starts.",
                    },
                    {
                      position: "Two-Deep (behind a drafter)",
                      savings: "~10-12% energy savings",
                      detail:
                        "Draft off someone who's already drafting. Still significant savings. Works well in large groups where getting to the front isn't possible.",
                    },
                  ].map((p) => (
                    <div
                      key={p.position}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {p.position}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {p.savings}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{p.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  To find a good draft, look for someone swimming at your pace
                  or slightly faster. Tuck in behind their feet and match their
                  stroke rate. If they&apos;re too fast, you&apos;ll burn more
                  energy trying to keep up than you save from drafting. If
                  they&apos;re too slow, you&apos;re better off on your own.
                </p>
                <Tip>
                  Practice drafting in group open water swims before race day.
                  Swimming close to other people takes practice: the contact,
                  the reduced visibility, the pace matching. It&apos;s a skill,
                  not just a positioning choice.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 5: Waves and Current ─────── */}
              <div id="waves-and-current" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Waves, Current &amp; Chop
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/wetsuit-buddy.jpg"
                  alt="Getting ready for open water swim with buddy"
                  caption="Pre-Swim Prep"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Flat, calm water is a gift. Don&apos;t count on it. Lake
                  Monona at Ironman Wisconsin can get surprisingly choppy.
                  Ocean swims are even more variable. You need to be
                  comfortable swimming when the water is fighting you.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Swimming in Chop
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Increase your stroke rate.
                    </span>{" "}
                    In choppy water, a longer, slower stroke gets disrupted by
                    waves. Shorten your stroke slightly and increase your
                    turnover. More strokes per minute keeps you moving forward
                    even when waves are pushing you around.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Breathe away from the waves.
                    </span>{" "}
                    If waves are coming from the left, breathe to the right.
                    This seems obvious but requires you to be comfortable
                    breathing bilaterally. Practice bilateral breathing in the
                    pool so you have the option on race day.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Stay relaxed.
                    </span>{" "}
                    Tension is the enemy in rough water. If you tense up,
                    your stroke falls apart, you waste energy, and you start
                    swallowing water. Focus on keeping your hands relaxed,
                    your jaw unclenched, and your kick light.
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Dealing with Current
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you&apos;re swimming against a current, angle slightly
                  into it to maintain your line. Swimming directly against a
                  strong current is exhausting. Angle into it at 10-15
                  degrees and let your forward motion carry you toward the
                  target. With a following current, relax and enjoy the free
                  speed. Sight less often since the current is pushing you
                  forward.
                </p>
                <Tip>
                  Study your race course map and talk to athletes who&apos;ve
                  done the race before. Know where the current runs, where the
                  wind typically comes from, and which sections tend to be
                  choppy. Race-specific knowledge is a massive advantage.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 6: Cold Water ────────────── */}
              <div id="cold-water" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Cold Water Acclimation
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Pool water is a comfortable 78-82 degrees. Open water can be
                  anywhere from 55 to 78 degrees depending on location and
                  time of year. The cold shock response when you first enter
                  cold water is real: rapid breathing, elevated heart rate,
                  and a panicky feeling. If you&apos;ve never experienced it,
                  it can cause a full-blown panic attack on race morning.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Acclimation Protocol
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      phase: "Weeks 1-2",
                      strategy: "Cold showers",
                      detail:
                        "End every shower with 60-90 seconds of cold water. Focus on controlling your breathing. This trains the cold shock response in a safe environment.",
                    },
                    {
                      phase: "Weeks 3-4",
                      strategy: "Short cold swims",
                      detail:
                        "Get in the lake or ocean for 5-10 minutes. Don't worry about swimming hard. Just float, tread water, and get comfortable with the temperature.",
                    },
                    {
                      phase: "Weeks 5-8",
                      strategy: "Extended cold swims",
                      detail:
                        "Build up to 20-40 minute swims in open water. Your body adapts. What felt freezing in week 3 will feel merely cool by week 7.",
                    },
                    {
                      phase: "Race Week",
                      strategy: "Pre-race dip",
                      detail:
                        "If possible, swim the race venue 1-2 days before. Even a 10-minute swim eliminates the shock factor on race morning. Your body already knows what to expect.",
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
                  On race morning, splash water on your face and inside your
                  wetsuit before the start. This pre-loads the cold sensation
                  so when the cannon goes off and you dive in, the shock is
                  minimized. Your first 200 meters will be dramatically calmer.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 7: Breathing ─────────────── */}
              <div id="breathing" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Breathing in Choppy Water
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Breathing is the number one source of anxiety for open water
                  swimmers. In the pool, you turn your head and there&apos;s
                  air. In open water, you turn your head and there might be a
                  wave. Swallowing water mid-stroke triggers a panic response
                  that can spiral quickly.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Breathing Strategies
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Exhale fully underwater.
                    </span>{" "}
                    Many swimmers hold their breath and try to exhale and
                    inhale in the same short breathing window. This is a
                    recipe for hyperventilation. Exhale steadily through your
                    nose/mouth while your face is in the water so that when
                    you rotate to breathe, you only need to inhale.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Breathe bilaterally.
                    </span>{" "}
                    Being able to breathe on both sides gives you options. If
                    waves are hitting your right side, breathe left. If
                    you&apos;re drafting off someone on your left, breathe
                    right. Train bilateral breathing in the pool even if you
                    have a preferred side.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      The wave trough technique.
                    </span>{" "}
                    In moderate chop, breathe in the trough between waves. As
                    a wave passes, there&apos;s a brief pocket of air in the
                    dip behind it. Time your breathing rotation to catch this
                    pocket. It takes practice but becomes instinctive.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      If you swallow water, don&apos;t panic.
                    </span>{" "}
                    It happens to everyone. Roll onto your back for 3-5
                    seconds, cough it out, catch your breath, and resume. You
                    lose 10 seconds. It feels like the end of the world in the
                    moment but it&apos;s nothing.
                  </p>
                </div>
                <Tip>
                  If you feel panic rising in open water, flip onto your back
                  and float. Look at the sky. Take 10 slow breaths. Your
                  wetsuit keeps you buoyant. You&apos;re safe. Once your heart
                  rate settles, flip back over and resume swimming. There is no
                  rule that says you have to swim freestyle the entire time.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 8: Race Start Strategy ────── */}
              <div id="race-start-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Race Start Strategy<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The race start is the most chaotic part of any triathlon
                  swim. Hundreds or thousands of athletes hitting the water at
                  the same time. Bodies everywhere. Accidental punches, kicks,
                  and elbows. Goggles getting knocked off. It&apos;s controlled
                  chaos, and you need a plan.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Mass Start vs. Rolling Start
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      type: "Mass Start",
                      detail:
                        "Everyone enters the water at once. Maximum chaos. Seed yourself based on your ability: fast swimmers up front, slower swimmers toward the back and sides. If you're unsure, go to the back. You can always swim around people. Getting trampled at the front is much worse.",
                    },
                    {
                      type: "Rolling Start (Self-Seeded)",
                      detail:
                        "Athletes enter in waves based on predicted swim time. Much calmer than a mass start. Be honest about your swim time when seeding. Starting in a faster wave means getting swum over. Starting in a slower wave means navigating around people.",
                    },
                    {
                      type: "Wave Start (Age Group)",
                      detail:
                        "Athletes start in groups by age or category, 3-5 minutes apart. Smaller groups mean less contact. Position yourself toward the front of your wave if you're a strong swimmer, sides or back if you're moderate.",
                    },
                  ].map((s) => (
                    <div
                      key={s.type}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm mb-2">
                        {s.type}
                      </p>
                      <p className="text-sm text-gray-400">{s.detail}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The First 200 Meters
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The first 200 meters are always the worst. Your heart rate
                  spikes from the cold water and adrenaline. Bodies are packed
                  tight. Sighting is impossible in the splash zone. Just
                  survive the first 200 meters. Swim easy, protect your space,
                  and let the field spread out. By 300-400 meters, you&apos;ll
                  have room to breathe and find your rhythm.
                </p>
                <Tip>
                  Start slightly wider than the main pack and swim to the
                  first buoy on a tangent. You swim a few extra meters but
                  avoid the worst of the contact zone. This is especially
                  valuable for first-timers who haven&apos;t experienced the
                  washing machine of a mass start.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 9: Training Locations ─────── */}
              <div id="training-locations" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Training in Lakes &amp; Ocean
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/swim-group.jpg"
                  alt="Group open water swim training"
                  caption="Group Open Water Session"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Finding safe, accessible open water to train in is one of the
                  biggest challenges for triathletes. Here are your options:
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Lakes
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The most common open water training venue for triathletes.
                  Look for designated swimming areas with lifeguards. Many
                  state parks and recreation areas have swim beaches. Join a
                  local triathlon club. They often organize group lake swims
                  with safety kayakers.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Ocean
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Ocean swimming adds waves, currents, and salt water to the
                  equation. If your race is in the ocean, you need ocean
                  practice. Swim parallel to shore where you can stand up if
                  needed. Never swim in the ocean alone. Understand rip
                  currents and how to escape them (swim parallel to shore, not
                  against the current).
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Organized Group Swims
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The best way to practice open water is with a group. Triathlon
                  clubs, masters swim groups, and local organizations often host
                  weekly open water sessions in the summer. You get safety
                  support, people to draft off, and the experience of swimming
                  near other bodies, which is exactly what race day feels
                  like.
                </p>
                <Tip>
                  If you live somewhere without easy open water access, a
                  masters swim group in a pool is the next best thing. The
                  lane-sharing, circle swimming, and close-quarters contact
                  simulate some aspects of open water racing. Supplement with
                  occasional travel to a lake or ocean for dedicated open
                  water weekends.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 10: Safety ───────────────── */}
              <div id="safety" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Safety &amp; Group Etiquette
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Open water swimming carries inherent risks that pool swimming
                  does not. Respect the water. Every year, athletes have medical
                  events during triathlon swims. Take safety seriously.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Safety Rules
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Never swim alone.
                    </span>{" "}
                    Always have a buddy, a kayaker, or someone on shore
                    watching you. This is non-negotiable. No workout is worth
                    the risk.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Use a swim buoy.
                    </span>{" "}
                    A brightly colored inflatable swim buoy ($15-25) attaches
                    to your waist and makes you visible to boats and
                    watercraft. It also serves as a flotation device if you
                    need to rest. Mandatory gear for training swims.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Know your limits.
                    </span>{" "}
                    If the water is rougher than your skill level, don&apos;t
                    get in. If you&apos;re feeling off or overly tired, skip
                    the swim. There will be another day. Open water is not the
                    place to push through &ldquo;just one more&rdquo; when
                    your body is telling you to stop.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Check conditions.
                    </span>{" "}
                    Water temperature, wave height, wind speed, and current
                    conditions before every swim. Many beach and lake apps
                    provide real-time conditions.
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Group Swim Etiquette
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Be aware of swimmers around you. Don&apos;t swim directly
                  over someone slower. Go around. If drafting off someone,
                  don&apos;t grab their feet. Communicate with hand signals
                  or shouts if you need to stop. And always let the group
                  know your planned route and turnaround point before getting
                  in the water.
                </p>
                <Tip>
                  On race day, if you feel panicked or in distress, raise your
                  hand and wave. Safety kayakers and support boats will come
                  to you immediately. You can hold onto a kayak or paddle
                  board to catch your breath without being disqualified.
                  You&apos;re only DQ&apos;d if they pull you out of the water
                  or if you make forward progress while holding the support.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 11: Dylan's Tips ──────────── */}
              <div id="dylans-swim-tips" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Dylan&apos;s Open Water Tips
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Specific lessons from my Ironman Wisconsin swim and training
                  in Lake Michigan and Chicago&apos;s lakefront. These are
                  things I learned the hard way.
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Practice in your exact race gear",
                      detail:
                        "Same wetsuit, same goggles, same swim cap, same tri suit underneath. On race morning you should have zero unknowns. I did at least 6 open water swims in my full race setup.",
                    },
                    {
                      num: "02",
                      title: "Bring two pairs of goggles on race day",
                      detail:
                        "Goggles break. Straps snap. Someone kicks them off your face in the washing machine start. Have a backup pair in your transition bag. I wore my primary pair and had a backup taped to my wetsuit collar.",
                    },
                    {
                      num: "03",
                      title: "Anti-fog your goggles the night before",
                      detail:
                        "Apply anti-fog spray or baby shampoo to the inside of your goggles the night before the race. Foggy goggles make sighting impossible, which makes navigation impossible.",
                    },
                    {
                      num: "04",
                      title: "Warm up your shoulders before the start",
                      detail:
                        "Do 5 minutes of arm circles, shoulder stretches, and light swimming if the warm-up area is open. Cold muscles plus cold water plus an aggressive start pace equals shoulder cramps at 400 meters.",
                    },
                    {
                      num: "05",
                      title: "The swim is just the beginning",
                      detail:
                        "Don't burn energy trying to PR the swim. Your goal is to exit the water feeling strong and calm, not gassed. Save your matches for the bike and run. A relaxed, efficient swim sets up your entire race.",
                    },
                    {
                      num: "06",
                      title: "Chicago lakefront for cold water training",
                      detail:
                        "Lake Michigan in May-June is cold. Like 55-60 degrees cold. Training there made Ironman Wisconsin's 70-degree water feel like a bathtub. Seek out cold water training if you can. It builds immense confidence.",
                    },
                    {
                      num: "07",
                      title: "Flip to backstroke when you need a break",
                      detail:
                        "There is no rule that says you must swim freestyle. If you need 30 seconds to catch your breath, flip to backstroke. You're still making forward progress, you can breathe freely, and your heart rate comes down. I did this twice during my Ironman swim.",
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
                    Now Get In the Water
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    If this guide helped you, share it with a triathlete
                    who&apos;s nervous about the swim. Follow along as I train
                    for Ironman Lake Placid 2026.
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
                      Track Your Training
                    </p>
                    <p className="text-white font-bold mb-2">
                      Download InstaCal
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      The AI-powered calorie tracker I built. Dial in your
                      nutrition to fuel your swim training and recovery.
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
