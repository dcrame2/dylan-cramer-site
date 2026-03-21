"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── data ─────────────────────────────────────────────── */

const sections = [
  { id: "reality-check", label: "The Reality Check" },
  { id: "time-audit", label: "The Time Audit" },
  { id: "sample-weekly-schedule", label: "Sample Weekly Schedule" },
  { id: "morning-vs-evening", label: "Morning vs Evening Training" },
  { id: "sleep-optimization", label: "Sleep Optimization" },
  { id: "meal-prepping", label: "Meal Prepping for Athletes" },
  { id: "managing-energy", label: "Managing Energy at Work" },
  { id: "relationships", label: "Communicating with Your People" },
  { id: "what-to-sacrifice", label: "What to Sacrifice" },
  { id: "social-life-balance", label: "Social Life Balance" },
  { id: "dylans-actual-schedule", label: "Dylan's Actual Schedule" },
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

export default function NineToFiveIronman() {
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
          title: "How to Train for an Ironman with a 9-5 Job - Dylan Cramer",
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
            src="/images/gallery/bike-capitol.jpg"
            alt="Biking past the capitol building during Ironman Wisconsin"
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
            Free Guide &middot; 22 Min Read
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Balancing a 9-5</span>
            <br />
            <span className="text-red-500">&amp; Ironman Training</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            A realistic guide to training for 140.6 miles while working full
            time. No trust fund required. From someone who did it while
            building an app and creating content on the side.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#reality-check"
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
              {/* ── Section 1: Reality Check ─────────── */}
              <div id="reality-check" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    The Reality Check<span className="text-red-500">.</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Let&apos;s get one thing straight: training for an Ironman
                    while working a full-time job is not easy. Anyone who tells
                    you otherwise is either lying or doesn&apos;t have a job.
                    It&apos;s 6-9 months of early alarms, sacrificed weekends,
                    and constantly feeling like you&apos;re falling behind on
                    something: work, training, relationships, or sleep.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    But here&apos;s the truth:{" "}
                    <span className="text-white font-semibold">
                      the majority of Ironman finishers have full-time jobs
                    </span>
                    . They&apos;re not professional athletes. They&apos;re
                    software developers, teachers, accountants, nurses, and
                    managers who figured out how to make it work within the
                    constraints of a normal life.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    I trained for Ironman Wisconsin while working as a
                    full-time software developer, building and launching InstaCal,
                    creating content for social media, and trying to maintain
                    a social life. My finish time was 13:54:29. Not elite. But
                    I crossed that finish line, and so can you.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    This guide is the playbook I wish I had. No fluff. Just
                    the practical strategies that actually work when you have
                    40+ hours a week spoken for before training even starts.
                  </p>
                </motion.div>
              </div>

              <SectionDivider />

              {/* ── Section 2: Time Audit ─────────────── */}
              <div id="time-audit" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  The Time Audit<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Before you sign up for an Ironman, do a brutally honest time
                  audit. You need to find{" "}
                  <span className="text-white font-semibold">
                    10-15 hours per week
                  </span>{" "}
                  for training at peak volume. Here&apos;s where most people
                  actually find the time:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  {[
                    { source: "TV / Streaming", hours: "2-3 hrs/week", detail: "Cut your screen time in half. One show per night instead of three." },
                    { source: "Social Media Scrolling", hours: "1-2 hrs/week", detail: "Track your screen time. Most people scroll 2+ hours daily. Reclaim half of it." },
                    { source: "Morning Routine", hours: "3-5 hrs/week", detail: "Wake up 60-90 min earlier. This is where the magic happens." },
                    { source: "Lunch Breaks", hours: "2-3 hrs/week", detail: "30-45 min runs during lunch. Shower at a nearby gym." },
                    { source: "Weekend Mornings", hours: "4-6 hrs/week", detail: "Saturday and Sunday mornings become your long session windows." },
                    { source: "Commute (if applicable)", hours: "1-2 hrs/week", detail: "Bike commute as a training ride. Run commute if close enough." },
                  ].map((t) => (
                    <div
                      key={t.source}
                      className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                    >
                      <p className="text-white font-bold text-sm">{t.source}</p>
                      <p className="text-xs text-red-400 font-mono mt-1">
                        {t.hours}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">{t.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  That&apos;s 13-21 hours right there. You don&apos;t need all
                  of them. But you do need to be intentional about where your
                  time goes. Ironman training doesn&apos;t require you to quit
                  your life. It requires you to audit it.
                </p>
                <Tip>
                  Track your time for one full week before you start training.
                  Write down everything: work, meals, commute, scrolling,
                  Netflix, socializing. You&apos;ll be shocked at how many
                  recoverable hours exist in your schedule.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 3: Sample Weekly Schedule ──── */}
              <div id="sample-weekly-schedule" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Sample Weekly Schedule
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/stadium-run.jpg"
                  alt="Running stadium stairs during training"
                  caption="5:30 AM Stadium Stairs"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here&apos;s a realistic peak-phase training week that fits
                  around a 9-5 job. This assumes an 8 AM - 5 PM work schedule
                  with some flexibility on lunch breaks.
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
                          When
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Monday</td>
                        <td className="py-3 px-4">Swim (technique + endurance)</td>
                        <td className="py-3 px-4">5:30 AM</td>
                        <td className="py-3 px-4">1 hr</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Tuesday</td>
                        <td className="py-3 px-4">Run (tempo or intervals)</td>
                        <td className="py-3 px-4">Lunch / 6 PM</td>
                        <td className="py-3 px-4">50 min</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Wednesday</td>
                        <td className="py-3 px-4">Bike (trainer intervals)</td>
                        <td className="py-3 px-4">5:30 AM</td>
                        <td className="py-3 px-4">1.5 hrs</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Thursday</td>
                        <td className="py-3 px-4">Swim + Short Run</td>
                        <td className="py-3 px-4">5:30 AM + Lunch</td>
                        <td className="py-3 px-4">1.5 hrs total</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Friday</td>
                        <td className="py-3 px-4">Rest or easy swim/yoga</td>
                        <td className="py-3 px-4">--</td>
                        <td className="py-3 px-4">0-30 min</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Saturday</td>
                        <td className="py-3 px-4">Long Bike + Brick Run</td>
                        <td className="py-3 px-4">6:00 AM</td>
                        <td className="py-3 px-4">4-6 hrs</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Sunday</td>
                        <td className="py-3 px-4">Long Run</td>
                        <td className="py-3 px-4">7:00 AM</td>
                        <td className="py-3 px-4">1.5-2.5 hrs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Total: ~12-14 hours per week at peak. Weekday sessions are
                  60-90 minutes. The big volume lives on weekends. This is
                  doable. Not easy, but doable.
                </p>
                <Tip>
                  A bike trainer (Wahoo KICKR, Tacx, etc.) is a game-changer
                  for 9-5 athletes. You can get a quality 90-minute bike
                  session done at 5:30 AM without dealing with traffic, flat
                  tires, or weather. It&apos;s the single best equipment
                  investment for time-crunched Ironman training.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 4: Morning vs Evening ─────── */}
              <div id="morning-vs-evening" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Morning vs Evening Training
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  This is the most common question I get. The short answer:
                  mornings win. Not because morning workouts are physiologically
                  superior, but because they&apos;re more reliable. Here&apos;s
                  why:
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Case for Mornings
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Nothing competes with 5 AM.
                    </span>{" "}
                    No meetings. No emergencies. No &ldquo;Hey, can you stay
                    late?&rdquo; Your morning workout happens before the world
                    has a chance to derail it. Evening workouts get crushed by
                    work running late, social obligations, and pure exhaustion.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Mental clarity boost.
                    </span>{" "}
                    Training before work makes you sharper at your desk. I was
                    more productive at work on days I trained in the morning.
                    The endorphin boost and sense of accomplishment carry into
                    everything else.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Evenings become free.
                    </span>{" "}
                    When your workout is done by 7 AM, your entire evening is
                    open for cooking, relationships, side projects, or just
                    resting. This is massive for maintaining quality of life.
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  When Evening Works Better
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Some people are genuinely not morning people, and that&apos;s
                  okay. If you consistently skip morning sessions because you
                  can&apos;t wake up, switch to evenings. A completed evening
                  workout beats a skipped morning workout every time. The best
                  training schedule is the one you actually follow.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Evening training also works well for swim sessions (pools are
                  often less crowded at 7-8 PM) and for easy recovery runs
                  where intensity doesn&apos;t matter.
                </p>
                <Tip>
                  If you&apos;re not a morning person, don&apos;t try to go
                  from waking up at 7 AM to 5 AM overnight. Shift your alarm
                  back by 15 minutes every few days. In 2-3 weeks,
                  you&apos;ll be waking up at 5 AM without wanting to die. Your
                  body adapts. Give it time.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 5: Sleep Optimization ─────── */}
              <div id="sleep-optimization" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Sleep Optimization<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sleep is the most underrated performance enhancer. It&apos;s
                  when your body repairs muscle, consolidates fitness gains,
                  and restores the mental energy you need for both work and
                  training. Sacrifice sleep and everything else falls apart --
                  your workouts suffer, your focus at work drops, and your
                  injury risk skyrockets.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Non-Negotiable Target
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  <span className="text-white font-semibold">
                    7-8 hours per night minimum.
                  </span>{" "}
                  If you&apos;re waking up at 5 AM to train, that means
                  you&apos;re in bed by 9-9:30 PM. Yes, this means your
                  evenings get shorter. That&apos;s the trade-off. There is no
                  hack that replaces sleep.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Sleep Quality Strategies
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Consistent bedtime.
                    </span>{" "}
                    Go to bed and wake up at the same time every day, including
                    weekends. Your body&apos;s circadian rhythm thrives on
                    consistency.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      No screens 30 min before bed.
                    </span>{" "}
                    Blue light suppresses melatonin. Read a book, stretch, or
                    prep your morning gear instead.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Cool, dark room.
                    </span>{" "}
                    65-68 degrees is ideal. Blackout curtains if streetlights
                    are an issue. A white noise machine if you&apos;re a light
                    sleeper.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Prep the night before.
                    </span>{" "}
                    Lay out your workout clothes, fill your water bottles, set
                    the coffee maker. Eliminating morning decisions saves time
                    and lets you sleep 10-15 minutes longer.
                  </p>
                </div>
                <Tip>
                  Naps are your secret weapon. A 20-minute power nap during
                  lunch on heavy training days is worth more than an extra
                  coffee. If your office has a quiet room, use it. If not, a
                  car nap works perfectly.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 6: Meal Prepping ──────────── */}
              <div id="meal-prepping" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Meal Prepping for Athletes
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/swim-exit.jpg"
                  alt="Exiting the swim during Ironman"
                  caption="Fuel the Machine"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  When you&apos;re training 10-15 hours a week on top of a
                  full-time job, you do not have time to cook elaborate meals
                  every night. Meal prepping is not optional, it&apos;s
                  survival. You&apos;re burning 3,000-4,000+ calories a day
                  during peak training. You need to eat a lot, and it needs to
                  be good fuel.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Sunday Prep Session
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Spend 2-3 hours on Sunday afternoon prepping meals for the
                  week. Here&apos;s what I batch-cooked weekly during Ironman
                  training:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      item: "Protein",
                      detail: "5 lbs of chicken thighs or ground turkey, seasoned and baked. Divide into containers. Takes 45 minutes.",
                    },
                    {
                      item: "Carbs",
                      detail: "A big pot of rice or pasta. Cook 4-5 servings at once. Store in the fridge. Reheat as needed.",
                    },
                    {
                      item: "Vegetables",
                      detail: "Roasted sheet pan veggies: sweet potatoes, broccoli, bell peppers. Toss in oil, season, roast at 425F for 25 minutes.",
                    },
                    {
                      item: "Snacks",
                      detail: "Pre-portioned trail mix, hard-boiled eggs (make a dozen), protein bars, and cut fruit in containers.",
                    },
                    {
                      item: "Recovery Shakes",
                      detail: "Pre-measured protein powder + oats in ziplock bags. Add milk and banana, blend. 30-second post-workout meal.",
                    },
                  ].map((m) => (
                    <div
                      key={m.item}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{m.item}</p>
                      <p className="text-sm text-gray-400 mt-1">{m.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Cook double portions at dinner and pack the leftovers for
                  tomorrow&apos;s lunch. This single habit saves 30+ minutes
                  per day and guarantees you eat quality food instead of
                  grabbing fast food because you&apos;re &ldquo;too busy.&rdquo;
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 7: Managing Energy ────────── */}
              <div id="managing-energy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Managing Energy at Work
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You will be tired. There&apos;s no getting around it. Peak
                  training weeks mean you&apos;re physically exhausted by
                  Wednesday. Your job still needs you to be sharp. Here&apos;s
                  how to manage the overlap:
                </p>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Front-load demanding work.
                    </span>{" "}
                    Do your hardest, most creative work in the first 3-4 hours
                    of the workday. Your brain is freshest after your morning
                    workout and breakfast. Save meetings and admin tasks for the
                    afternoon slump.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Strategic caffeine.
                    </span>{" "}
                    One coffee in the morning, one after lunch if needed. Avoid
                    caffeine after 2 PM or it wrecks your sleep, which wrecks
                    everything. If you need an afternoon boost, take a walk
                    outside instead.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Eat enough at lunch.
                    </span>{" "}
                    Under-eating is the fastest way to crash at 2 PM. Eat a
                    solid lunch with protein, carbs, and fat. Your body is
                    recovering from this morning&apos;s workout and needs fuel.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Recovery days at work = low-key work days.
                    </span>{" "}
                    Align your rest days with your hardest work days when
                    possible. If you know Thursday has a big presentation, make
                    Thursday a rest or easy swim day.
                  </p>
                </div>
                <Tip>
                  Be honest with yourself about your energy. If you&apos;re so
                  tired at work that you&apos;re making mistakes or
                  can&apos;t focus, that&apos;s a sign you&apos;re overtraining
                  or under-recovering. Cut a session. Sleep in. One skipped
                  workout won&apos;t ruin your Ironman. Chronic fatigue will.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 8: Relationships ──────────── */}
              <div id="relationships" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Communicating with Your People
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/chicago-run.jpg"
                  alt="Running in Chicago with friends"
                  caption="The Support System"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Ironman training doesn&apos;t just affect you. It affects
                  your partner, your friends, your family, and your coworkers.
                  The people in your life need to understand what&apos;s coming
                  and feel like they&apos;re part of it, not competing with
                  it.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  With Your Partner
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Have a real conversation before you sign up. Explain the time
                  commitment (10-15 hrs/week), the early mornings, the long
                  weekend sessions. Ask for their support and listen to their
                  concerns. Set boundaries together: &ldquo;Saturday mornings
                  are my long ride, but Saturday evenings are ours.&rdquo;
                  Invite them to be part of it: come to the race, be your
                  crew. When they feel included, the sacrifice feels shared.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  With Your Boss
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You don&apos;t need to write a memo about your Ironman. But
                  if you&apos;re using lunch breaks for runs or adjusting your
                  start time for morning swims, a brief heads-up goes a long
                  way. Most managers respect the discipline it takes.
                  &ldquo;I&apos;m training for an endurance event and might
                  start 30 minutes earlier some days&rdquo; is enough context.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  With Friends
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your friends will not fully understand why you&apos;re
                  skipping happy hour to ride a bike trainer in your garage.
                  That&apos;s okay. Be upfront: &ldquo;I&apos;m less available
                  for the next 6 months because I&apos;m training for
                  something big. I still want to hang out, but it might look
                  different for a while.&rdquo; Real friends will get it.
                </p>
                <Tip>
                  Include your people in key training moments. Invite friends
                  to your long run, have your partner meet you at the end of
                  a long bike ride with lunch, share your progress. It
                  transforms Ironman training from &ldquo;that thing that takes
                  you away&rdquo; to &ldquo;that thing we&apos;re doing
                  together.&rdquo;
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 9: What to Sacrifice ─────── */}
              <div id="what-to-sacrifice" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  What to Sacrifice<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here&apos;s the uncomfortable truth nobody posts on
                  Instagram: you cannot add 10-15 hours of training to your
                  life without something giving. The question is not whether
                  you&apos;ll sacrifice things. It&apos;s whether you choose
                  the sacrifices intentionally or let them happen by accident.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Worth Sacrificing
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    { item: "Mindless screen time", detail: "Scrolling social media, binge-watching shows, YouTube rabbit holes. This is the first thing to go and the easiest to cut." },
                    { item: "Drinking alcohol", detail: "Alcohol wrecks recovery, sleep quality, and motivation. I cut alcohol almost entirely during Ironman training and it was the single biggest quality-of-life improvement." },
                    { item: "Perfection at work", detail: "Aim for great work, not perfect work. Ship the 90% solution instead of agonizing over the last 10%. Save that energy for training." },
                    { item: "A spotless house", detail: "Lower your standards slightly on household maintenance. Clean enough is good enough. Deep cleaning can wait until after the race." },
                  ].map((s) => (
                    <div
                      key={s.item}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{s.item}</p>
                      <p className="text-sm text-gray-400 mt-1">{s.detail}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Not Worth Sacrificing
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    { item: "Sleep", detail: "Never sacrifice sleep for training. A workout on 5 hours of sleep does more harm than good. Skip the workout. Sleep in." },
                    { item: "Relationships", detail: "If your partner, kids, or close friends feel like they've lost you, you've gone too far. Adjust the training, not the relationships." },
                    { item: "Mental health", detail: "If training feels like a prison instead of a pursuit, something is wrong. Take a day off. Talk to someone. The race will still be there." },
                    { item: "Career", detail: "Don't tank your performance at work for a finish time. Your job pays the bills and probably funds the race. Keep it healthy." },
                  ].map((s) => (
                    <div
                      key={s.item}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{s.item}</p>
                      <p className="text-sm text-gray-400 mt-1">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <SectionDivider />

              {/* ── Section 10: Social Life Balance ───── */}
              <div id="social-life-balance" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Social Life Balance<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your social life will change during Ironman training. Accept
                  it early and manage it proactively rather than feeling guilty
                  about every declined invitation.
                </p>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Say yes to the things that matter.
                    </span>{" "}
                    Birthday parties, weddings, meaningful dinners: these
                    don&apos;t happen that often. Adjust your training around
                    them, not the other way around.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Turn social into training.
                    </span>{" "}
                    Instead of meeting friends for drinks, meet them for a
                    Saturday morning run. Join a cycling group. Swim with a
                    masters team. You get the social interaction AND the
                    workout.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Be the early leaver, not the no-show.
                    </span>{" "}
                    Go to the party for an hour instead of skipping entirely.
                    Show up to dinner but leave by 9 PM. People appreciate your
                    presence more than your absence, even if it&apos;s brief.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Remember it&apos;s temporary.
                    </span>{" "}
                    Ironman training has an end date. The race happens, you
                    cross the finish line, and your social life returns to
                    normal. The sacrifices are measured in months, not years.
                  </p>
                </div>
                <Tip>
                  Schedule one purely social event per week that has nothing to
                  do with training. Coffee with a friend, dinner date, game
                  night. This prevents the isolation that makes Ironman
                  training feel unsustainable.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 11: Dylan's Actual Schedule ── */}
              <div id="dylans-actual-schedule" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Dylan&apos;s Actual Schedule
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Here&apos;s exactly what a peak training week looked like for
                  me while working full time as a software developer and
                  building InstaCal on the side. This is not idealized. This
                  is what actually happened.
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "4:45 AM: Alarm goes off",
                      detail:
                        "Clothes are already laid out. Coffee is on a timer. I'm out the door by 5:10 for the pool or on the bike trainer by 5:15. No thinking. Just moving.",
                    },
                    {
                      num: "02",
                      title: "5:15-6:45 AM: Morning workout",
                      detail:
                        "Swim 3x/week (Mon, Wed, Thu). Bike trainer 2x/week (Tue, Thu). These are structured sessions, not junk miles. Quality over quantity when time is limited.",
                    },
                    {
                      num: "03",
                      title: "7:00-7:45 AM: Shower, eat, commute",
                      detail:
                        "Big breakfast: eggs, oatmeal, fruit. Meal-prepped lunch in my bag. I worked hybrid, so some days this was just walking to my desk.",
                    },
                    {
                      num: "04",
                      title: "8:00 AM-5:00 PM: Work",
                      detail:
                        "Full focus. Some days I'd do a 30-min lunch run if I missed a morning session. Otherwise, lunch was for eating and resting.",
                    },
                    {
                      num: "05",
                      title: "5:30-6:30 PM: Second session (Tue/Thu only)",
                      detail:
                        "Short easy run on Tuesday, easy spin on Thursday. These were 30-45 min max. Recovery-level effort. Some weeks I skipped these entirely.",
                    },
                    {
                      num: "06",
                      title: "7:00-8:30 PM: Dinner, content work, rest",
                      detail:
                        "Eat dinner. Edit a video or work on InstaCal for 30-45 min. Spend time with people. Phone goes down by 8:30.",
                    },
                    {
                      num: "07",
                      title: "9:00 PM: Lights out",
                      detail:
                        "Non-negotiable. 9 PM bedtime meant 7.5-8 hours of sleep. I protected this ruthlessly. Nothing good happens after 9 PM during Ironman training.",
                    },
                    {
                      num: "08",
                      title: "Weekends: The Big Sessions",
                      detail:
                        "Saturday: 4-6 hour bike ride starting at 6 AM, followed by a 20-40 min brick run. Sunday: 1.5-2.5 hour long run at 7 AM. Rest of the weekend was mine.",
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
                  Was it perfect? No. I missed sessions. I had weeks where
                  work was insane and I trained 8 hours instead of 14. I had
                  weekends where I chose to see friends instead of doing my
                  long ride. And I still finished in 13:54:29. Consistency
                  over perfection. Always.
                </p>
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
                    Now Go Make It Work
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    If this guide helped you, share it with someone who thinks
                    they don&apos;t have time for an Ironman. Follow along as I
                    train for Ironman Lake Placid 2026.
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
                      The AI-powered calorie tracker I built during Ironman
                      training. Snap a photo of your food and get instant macro
                      breakdowns.
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
