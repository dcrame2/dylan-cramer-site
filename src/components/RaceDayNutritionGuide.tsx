"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* -- data ------------------------------------------------- */

const sections = [
  { id: "why-nutrition-matters", label: "Why Nutrition Matters" },
  { id: "calories-per-hour", label: "Calories Per Hour by Sport" },
  { id: "carb-loading", label: "Carb Loading Week" },
  { id: "pre-race-meal", label: "Pre-Race Meal Timing" },
  { id: "fueling-the-bike", label: "Fueling the Bike Leg" },
  { id: "fueling-the-run", label: "Fueling the Run" },
  { id: "electrolyte-strategy", label: "Electrolyte Strategy" },
  { id: "caffeine", label: "Caffeine as Performance Tool" },
  { id: "stomach-training", label: "Stomach Training" },
  { id: "when-nutrition-fails", label: "When Nutrition Goes Wrong" },
  { id: "dylans-nutrition-plan", label: "Dylan's Exact Race Plans" },
  { id: "recovery-nutrition", label: "Post-Race Recovery" },
];

/* -- helpers ----------------------------------------------- */

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

/* -- component -------------------------------------------- */

export default function RaceDayNutritionGuide() {
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
          title: "Race Day Nutrition Strategy - Dylan Cramer",
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
      {/* -- HERO ------------------------------------------ */}
      <section
        ref={hero.ref}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/ultra-snack.jpg"
            alt="Fueling during an ultra endurance race"
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
            <span className="text-white">Race Day</span>
            <br />
            <span className="text-red-500">Nutrition Strategy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            How to fuel any endurance race without bonking, cramping, or
            destroying your stomach. Includes my exact nutrition plans from
            Ironman Wisconsin and Tunnel Hill 100.
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

      {/* -- ARTICLE LAYOUT -------------------------------- */}
      <section ref={content.ref} className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-12">
            {/* -- Sidebar TOC (desktop) ------------------- */}
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

            {/* -- Main Content ---------------------------- */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* -- Section 1: Why Nutrition Matters ------- */}
              <div id="why-nutrition-matters" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    Why Nutrition Matters<span className="text-red-500">.</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    In any endurance race lasting more than 90 minutes, nutrition
                    is the fourth discipline. You can have perfect fitness, flawless
                    pacing, and bulletproof mental toughness, but if your nutrition
                    falls apart, your race falls apart. It&apos;s that simple.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Your body stores roughly{" "}
                    <span className="text-white font-semibold">
                      1,500-2,000 calories
                    </span>{" "}
                    of glycogen in your muscles and liver. During hard exercise, you
                    burn 600-1,000 calories per hour. That means your stored fuel
                    runs out in 2-3 hours. After that, if you&apos;re not replacing
                    calories, you bonk, a catastrophic loss of energy where your
                    pace drops 30-50% and your brain stops cooperating.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    During an Ironman, you burn 8,000-10,000 calories. During a 100-
                    mile ultra, 10,000-12,000+. You can&apos;t replace all of it because
                    your gut can only absorb so much. But the difference between a
                    well-fueled race and a poorly-fueled one is the difference
                    between crossing the finish line strong or crawling across it,
                    or not finishing at all.
                  </p>
                  <div className="grid grid-cols-3 gap-4 my-8">
                    {[
                      { value: "2,000", unit: "cal", label: "Stored Glycogen" },
                      { value: "800+", unit: "cal/hr", label: "Burn Rate" },
                      { value: "60-90", unit: "g/hr", label: "Max Absorption" },
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center"
                      >
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {d.value}
                        </p>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                          {d.unit}
                        </p>
                        <p className="text-sm text-red-400 font-bold mt-1">
                          {d.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <SectionDivider />

              {/* -- Section 2: Calories Per Hour ----------- */}
              <div id="calories-per-hour" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Calories Per Hour by Sport
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  How much you need to take in depends on the sport, intensity,
                  and duration. Here are practical targets based on what your gut
                  can actually absorb (not what you burn, since you&apos;ll always run
                  a calorie deficit in a long race):
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Sport
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Cal/Hour
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Carbs/Hour
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Swimming
                        </td>
                        <td className="py-3 px-4">0</td>
                        <td className="py-3 px-4">0g</td>
                        <td className="py-3 px-4">
                          Can&apos;t eat while swimming. Fuel before and immediately after.
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Cycling
                        </td>
                        <td className="py-3 px-4">250-350</td>
                        <td className="py-3 px-4">60-90g</td>
                        <td className="py-3 px-4">
                          Easiest time to eat. Stable position, lower GI distress.
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Running (Marathon)
                        </td>
                        <td className="py-3 px-4">150-250</td>
                        <td className="py-3 px-4">30-60g</td>
                        <td className="py-3 px-4">
                          Stomach is sensitive from impact. Mostly gels and liquids.
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">
                          Ultramarathon
                        </td>
                        <td className="py-3 px-4">200-300</td>
                        <td className="py-3 px-4">40-80g</td>
                        <td className="py-3 px-4">
                          Lower intensity allows more solid food. Variety prevents palate fatigue.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">
                          Ironman Run
                        </td>
                        <td className="py-3 px-4">150-200</td>
                        <td className="py-3 px-4">30-50g</td>
                        <td className="py-3 px-4">
                          Gut is most stressed. Cola, broth, and pretzels are lifesavers.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Tip>
                  These are absorption targets, not burn rates. You will always
                  burn more calories than you consume during a race. The goal is
                  to slow the depletion rate enough to maintain performance, not
                  to achieve calorie balance. Trying to match your burn rate will
                  overwhelm your gut and cause GI distress.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 3: Carb Loading ---------------- */}
              <div id="carb-loading" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Carb Loading Week
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Carb loading is not &ldquo;eat a giant pasta dinner the night
                  before.&rdquo; Real carb loading is a{" "}
                  <span className="text-white font-semibold">
                    2-3 day process
                  </span>{" "}
                  that tops off your glycogen stores. Done correctly, it can
                  increase your stored glycogen by 20-40%, giving you a meaningful
                  buffer on race day.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Protocol
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Starting 3 days before your race, increase your carbohydrate
                  intake to{" "}
                  <span className="text-white font-semibold">
                    8-12 grams of carbs per kilogram of body weight per day
                  </span>
                  . For a 70kg (154lb) athlete, that&apos;s 560-840 grams of carbs
                  daily. This is a LOT of carbs. You will feel bloated. That&apos;s
                  normal. Glycogen binds with water, so you&apos;ll gain 2-4
                  pounds of water weight. This is a good thing. That water helps
                  with hydration on race day.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What to Eat
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Focus on easily digestible, low-fiber carbohydrates. This is not
                  the time for whole grains and vegetables. You want white rice,
                  pasta, bread, bagels, pancakes, juice, sports drink, pretzels,
                  and potatoes. Reduce fat and fiber to make room for more carbs
                  and to avoid GI issues. Keep protein moderate.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Common Mistakes
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Starting too late.
                    </span>{" "}
                    One big pasta dinner does almost nothing. Your muscles need
                    2-3 days to fully saturate with glycogen. Start early.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Eating too much fat.
                    </span>{" "}
                    Alfredo sauce, butter, and cream-heavy meals fill you up
                    without adding carbs. Stick to tomato-based sauces, plain rice,
                    and simple carb-dense foods.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Trying new foods.
                    </span>{" "}
                    Race week is not the time for the exotic restaurant near the
                    race venue. Eat foods your stomach knows and trusts.
                  </p>
                </div>
                <Tip>
                  A simple carb-loading meal: 2 cups white rice + grilled chicken
                  + soy sauce. That&apos;s roughly 100g of carbs, easy on the
                  stomach, and you can eat it 3-4 times a day. Boring? Yes. But
                  your glycogen stores don&apos;t care about flavor. They care
                  about volume.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 4: Pre-Race Meal --------------- */}
              <div id="pre-race-meal" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Pre-Race Meal Timing
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your pre-race meal is the final piece of the fueling puzzle.
                  Get it wrong and you&apos;ll spend the first hour of your race
                  with a sloshing stomach or, worse, looking for a porta-potty.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Timing: 3 Hours Before Start
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Eat your pre-race meal{" "}
                  <span className="text-white font-semibold">
                    3 hours before the race start
                  </span>
                  . This gives your body time to digest and stabilize blood sugar.
                  For a 7:00 AM race start, you&apos;re eating at 4:00 AM. Yes,
                  it&apos;s early. Set an alarm, eat, and go back to sleep or start
                  your morning routine.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What to Eat
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Aim for{" "}
                  <span className="text-white font-semibold">
                    500-800 calories, mostly carbohydrates
                  </span>
                  . Low fiber, low fat, moderate protein. Proven pre-race meals:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      meal: "Oatmeal + banana + honey",
                      cals: "~550 cal",
                      note: "Easy to make in a hotel room with hot water.",
                    },
                    {
                      meal: "Bagel + peanut butter + banana",
                      cals: "~600 cal",
                      note: "Dense carbs, some protein and fat for sustained energy.",
                    },
                    {
                      meal: "White rice + scrambled eggs + salt",
                      cals: "~650 cal",
                      note: "My go-to. Easy on the stomach, high carb.",
                    },
                    {
                      meal: "Pancakes + maple syrup",
                      cals: "~700 cal",
                      note: "Simple carbs. Skip the butter if fat bothers your stomach.",
                    },
                  ].map((m) => (
                    <div
                      key={m.meal}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">
                          {m.meal}
                        </span>
                        <span className="text-xs text-red-400 font-mono">
                          {m.cals}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{m.note}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  30 Minutes Before Start
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sip on a sports drink or take a gel with water 15-30 minutes
                  before the gun goes off. This tops off blood sugar and gives you
                  an immediate energy source for the first 30-45 minutes of racing,
                  bridging the gap until you start your in-race nutrition plan.
                </p>
                <Tip>
                  Practice your pre-race meal before every long training session.
                  By race day, your morning routine should be automatic: same
                  food, same timing, same quantities. Eliminate all decision-making
                  from race morning. You have enough to think about.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 5: Fueling the Bike ------------ */}
              <div id="fueling-the-bike" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Fueling the Bike Leg
                </h2>
                <SectionImage
                  src="/images/gallery/tunnel-hill-finish.jpg"
                  alt="Dylan at the Tunnel Hill 100 finish line"
                  caption="Fueled Right - Tunnel Hill 100 Finish"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The bike is your golden fueling window. In a triathlon, the bike
                  leg is where you do the heavy lifting on calories. Your body is
                  in a stable, seated position. The intensity is lower than running.
                  Your stomach tolerates food better on the bike than it ever will
                  on the run. If you get your bike nutrition right, everything that
                  follows becomes dramatically easier.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Bike Nutrition Plan
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Target{" "}
                  <span className="text-white font-semibold">
                    250-350 calories per hour
                  </span>{" "}
                  from the moment you start riding. Set a timer on your bike
                  computer to beep every 20 minutes as a reminder to eat or drink.
                  Don&apos;t wait until you feel hungry. By then you&apos;re
                  already 30-45 minutes behind on fueling.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Liquid vs. Solid Calories
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  In the first 2-3 hours of riding, your stomach can handle solid
                  food: bars, chews, rice cakes, PB&amp;J sandwiches. These
                  provide sustained energy and psychological satisfaction. As the
                  ride goes on and intensity increases, shift to liquid calories
                  and gels which are easier to digest. By hour 4-5, most athletes
                  are relying primarily on sports drink, gels, and simple sugars.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What I Carried on the Bike at Ironman Wisconsin
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      item: "Aero bottle (between aero bars)",
                      detail:
                        "Filled with concentrated sports drink mix. ~400 calories total. Sipped continuously.",
                    },
                    {
                      item: "2x frame bottles",
                      detail:
                        "One with electrolyte drink, one with water. Refilled at aid stations every ~20 miles.",
                    },
                    {
                      item: "6x gels in bento box",
                      detail:
                        "Took one every 30-35 minutes starting at mile 15. Alternated between caffeinated and non-caffeinated.",
                    },
                    {
                      item: "2x bars in jersey pocket",
                      detail:
                        "Ate in the first 40 miles while stomach was fresh. Cut into pieces before the race for easy eating.",
                    },
                    {
                      item: "Salt capsules",
                      detail:
                        "One capsule every 45 minutes. Crucial on a warm day. Kept in a small bag taped to the top tube.",
                    },
                  ].map((i) => (
                    <div
                      key={i.item}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{i.item}</p>
                      <p className="text-sm text-gray-400 mt-1">{i.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Front-load your bike calories. Eat more in the first half of the
                  bike when your stomach is fresh and processing food well. If you
                  wait until the second half to start eating aggressively, your gut
                  may not cooperate. I aimed for 350 cal/hr in the first 3 hours
                  and 250 cal/hr in the last 2 hours at Ironman Wisconsin.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 6: Fueling the Run ------------- */}
              <div id="fueling-the-run" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Fueling the Run
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Running nutrition is harder than cycling nutrition. The constant
                  impact jostles your stomach, blood flow shifts away from
                  digestion to your working muscles, and many foods that sat
                  perfectly fine on the bike suddenly become intolerable.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Calorie Targets on the Run
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Drop your intake to{" "}
                  <span className="text-white font-semibold">
                    150-250 calories per hour
                  </span>{" "}
                  on the run. This is lower than the bike because your stomach
                  can&apos;t handle as much and because you fueled heavily on the
                  bike (if you followed the plan). Focus on simple, fast-digesting
                  carbs: gels, sports drink, cola, and aid station food.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Aid Station Strategy
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Walk through every aid station. Seriously. The 15-30 seconds you
                  lose walking is nothing compared to the benefit of being able to
                  actually eat, drink, and keep things down. Trying to eat while
                  running at pace is a recipe for choking, spilling, and GI
                  distress. Walk, eat, drink, pour cold water on your head, then
                  start running again.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What Works Late in a Race
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  After 8-10 hours of racing, your palate revolts against sweet
                  gels. Everything tastes sickeningly sweet. This is when savory
                  options save your race:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      food: "Cola (flat or fizzy)",
                      why: "Caffeine + sugar + familiar taste. The late-race lifesaver for almost every Ironman finisher.",
                    },
                    {
                      food: "Chicken broth",
                      why: "Warm, salty, easy on the stomach. Available at most Ironman aid stations after dark.",
                    },
                    {
                      food: "Pretzels with salt",
                      why: "Crunchy, salty, and easy to eat while walking. Sodium + carbs in one bite.",
                    },
                    {
                      food: "Boiled potatoes with salt",
                      why: "Calorie-dense, easy to digest, savory. A staple at ultra aid stations.",
                    },
                    {
                      food: "Watermelon",
                      why: "Hydrating, easy to stomach, natural sugars. Refreshing when everything else makes you gag.",
                    },
                  ].map((f) => (
                    <div
                      key={f.food}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{f.food}</p>
                      <p className="text-sm text-gray-400 mt-1">{f.why}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  If you can&apos;t eat, drink. If you can&apos;t drink, sip. If
                  you can&apos;t sip, pour water on yourself and keep moving. Even
                  small amounts of calories keep your blood sugar stable enough to
                  function. A single cup of cola every 15 minutes is 50-60
                  calories per hour. Not ideal, but enough to keep you moving
                  when your stomach has shut down.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 7: Electrolyte Strategy -------- */}
              <div id="electrolyte-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Electrolyte Strategy
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Electrolytes are the minerals your body loses through sweat:
                  primarily sodium, but also potassium, magnesium, and calcium.
                  During a long race, you can lose{" "}
                  <span className="text-white font-semibold">
                    500-1,500mg of sodium per hour
                  </span>{" "}
                  depending on your sweat rate and the heat. If you don&apos;t
                  replace it, you cramp, your muscles stop firing efficiently, and
                  in extreme cases you develop hyponatremia (dangerously low blood
                  sodium).
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How Much Sodium You Need
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A safe starting point is{" "}
                  <span className="text-white font-semibold">
                    500-800mg of sodium per hour
                  </span>{" "}
                  during racing. Heavy sweaters or racing in hot conditions may
                  need 1,000mg+ per hour. You can dial this in by doing a sweat
                  test (weigh yourself before and after a 1-hour hard effort) or
                  by paying attention to salt stains on your kit after training.
                  White, crusty stains = you&apos;re a salty sweater and need more
                  sodium.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Sources of Electrolytes
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      source: "Salt Capsules (e.g., SaltStick, LMNT)",
                      sodium: "200-350mg per cap",
                      note: "Easy to dose precisely. Take with water every 30-45 min.",
                    },
                    {
                      source: "Electrolyte Drink Mix",
                      sodium: "300-1,000mg per serving",
                      note: "Combines hydration + electrolytes + calories. Convenient.",
                    },
                    {
                      source: "Gels with Sodium",
                      sodium: "50-200mg per gel",
                      note: "Some but usually not enough on their own. Supplement with other sources.",
                    },
                    {
                      source: "Food (pretzels, broth, pickles)",
                      sodium: "Varies",
                      note: "Good supplemental source at aid stations. Broth has ~800mg per cup.",
                    },
                  ].map((e) => (
                    <div
                      key={e.source}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">
                          {e.source}
                        </span>
                        <span className="text-xs text-red-400 font-mono">
                          {e.sodium}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{e.note}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Hydration Math: Sweat Rate
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  To calculate your sweat rate: weigh yourself before and after a
                  1-hour workout (with minimal clothing). Each pound lost equals
                  roughly 16 oz of sweat. If you lose 2 lbs in an hour, your sweat
                  rate is ~32 oz/hour. You should aim to replace 70-80% of that --
                  trying to replace 100% often causes sloshing and GI issues.
                </p>
                <Tip>
                  Do your sweat test in conditions similar to race day. Sweat rate
                  in a cool gym is very different from sweat rate in 85-degree
                  sunshine. Test in heat if your race is in heat. And remember:
                  your need for electrolytes goes up dramatically in hot weather,
                  even if your pace is the same.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 8: Caffeine -------------------- */}
              <div id="caffeine" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Caffeine as Performance Tool
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Caffeine is one of the most well-researched and effective legal
                  performance enhancers in endurance sports. It reduces perceived
                  effort, delays fatigue, increases fat oxidation, and improves
                  focus, all of which matter enormously in a race lasting 5-17
                  hours.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How Much and When
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The effective dose is{" "}
                  <span className="text-white font-semibold">
                    3-6mg per kg of body weight
                  </span>
                  . For a 70kg athlete, that&apos;s 210-420mg total. You don&apos;t
                  need to take it all at once. A smart strategy for an Ironman or
                  ultra:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      timing: "Pre-Race (60 min before)",
                      dose: "100-200mg",
                      how: "Coffee or caffeine pill. Gives you a boost for the start without jitters.",
                    },
                    {
                      timing: "Mid-Bike (Hour 3-4)",
                      dose: "50-100mg",
                      how: "Caffeinated gel or cola. Maintains alertness during the long middle section.",
                    },
                    {
                      timing: "Start of Run",
                      dose: "50-100mg",
                      how: "Caffeinated gel. Provides a mental and physical lift for the hardest part of the race.",
                    },
                    {
                      timing: "Late Run (Mile 18+)",
                      dose: "50-100mg",
                      how: "Cola or caffeinated gel. The late-race caffeine hit is a genuine lifeline when you're falling apart.",
                    },
                  ].map((c) => (
                    <div
                      key={c.timing}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">
                          {c.timing}
                        </span>
                        <span className="text-xs text-red-400 font-mono">
                          {c.dose}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{c.how}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Caffeine Caveats
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Caffeine is a diuretic at high doses, meaning it increases urine
                  output. At the doses used in racing, this effect is minimal and
                  offset by the fluid you&apos;re consuming. However, if you&apos;re
                  sensitive to caffeine, test it extensively in training. Caffeine
                  can cause GI distress, jitters, and elevated heart rate in
                  sensitive individuals. Also, don&apos;t reduce your daily caffeine
                  intake in the weeks before a race. Withdrawal headaches on race
                  morning are brutal.
                </p>
                <Tip>
                  Save your biggest caffeine hit for the back half of the race when
                  fatigue is highest and you need it most. Taking 200mg of caffeine
                  at mile 1 is wasted. You&apos;re already alert and energized.
                  Taking 100mg at mile 18 of the marathon when you&apos;re falling
                  asleep on your feet? That&apos;s a game-changer.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 9: Stomach Training ------------ */}
              <div id="stomach-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Stomach Training
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Here&apos;s something most people don&apos;t realize: your gut
                  is trainable. Just like your legs adapt to running longer and
                  your lungs adapt to harder efforts, your stomach adapts to
                  processing food during exercise. Athletes who practice eating
                  during training can absorb significantly more calories during
                  racing than those who don&apos;t.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How to Train Your Gut
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Eat during every long session.
                    </span>{" "}
                    From week one of training, practice eating on the bike and
                    during long runs. Even if you don&apos;t &ldquo;need&rdquo;
                    calories for a 90-minute run, take a gel anyway. You&apos;re
                    training your gut, not fueling for that specific session.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Gradually increase volume.
                    </span>{" "}
                    Start with 30g of carbs per hour and build to 60-90g over
                    several weeks. If your stomach protests at 60g/hr, stay there
                    for 2-3 weeks before pushing higher. Forcing too much too soon
                    causes GI distress and makes your gut less willing to cooperate
                    next time.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Use race-day products.
                    </span>{" "}
                    Train with the exact gels, drinks, and bars you plan to use on
                    race day. Your gut adapts to specific formulations. Switching
                    brands or flavors on race morning is asking for trouble.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Practice at race intensity.
                    </span>{" "}
                    Eating during a Zone 2 easy ride is simple. Eating during a
                    threshold effort is much harder because blood flow diverts from
                    your gut to your muscles. Do some of your nutrition practice at
                    race pace to simulate real conditions.
                  </p>
                </div>
                <Tip>
                  The athletes who DNF due to nutrition problems almost always
                  skipped gut training. They show up to race day having never eaten
                  a gel while running or consumed 300 cal/hr on the bike. Their
                  gut has no idea what to do with that volume and it rebels.
                  Stomach training is as important as any physical training you do.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 10: When Nutrition Fails ------- */}
              <div id="when-nutrition-fails" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  When Nutrition Goes Wrong
                </h2>
                <SectionImage
                  src="/images/gallery/ironman-finish.jpg"
                  alt="Dylan crossing the Ironman Wisconsin finish line"
                  caption="Made it Through - Ironman Wisconsin Finish"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Even with perfect preparation, nutrition can go sideways mid-race.
                  The heat spikes unexpectedly. An aid station runs out of your
                  preferred product. Your stomach decides it&apos;s done cooperating
                  at hour 9. Having a plan for when things go wrong is just as
                  important as having a plan for when things go right.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  GI Distress: Nausea and Bloating
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you feel nauseous or bloated, slow down and stop eating solid
                  food. Switch to sipping water or diluted sports drink. Walk for
                  2-3 minutes. The nausea is usually caused by undigested food
                  sitting in your stomach because blood has shifted away from
                  digestion. Slowing down redirects blood to your gut and lets it
                  catch up. Once the nausea passes (and it usually does in 10-15
                  minutes), resume eating with small amounts of liquid calories.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Bonking (Hitting the Wall)
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you bonk (sudden fatigue, dizziness, inability to maintain
                  pace), your blood sugar has crashed. You need fast-acting sugar
                  immediately. Cola, a gel with water, or any simple carbohydrate.
                  It takes 10-15 minutes for ingested carbs to hit your
                  bloodstream. Walk or easy spin while you wait. The bonk is
                  recoverable if you act quickly. If you try to push through
                  without eating, you will only get worse.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Cramping
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Muscle cramps during racing are usually caused by a combination
                  of fatigue, dehydration, and electrolyte depletion, not just
                  one factor. If you start cramping, immediately take sodium
                  (salt capsule, broth, or pickle juice if available), drink
                  water, and slow your pace. Stretch gently if possible. Cramps
                  that come on gradually can often be managed. Cramps that hit
                  suddenly and severely may require walking until they release.
                </p>
                <Tip>
                  The worst thing you can do when nutrition goes wrong is panic
                  and stop eating entirely. Even if your stomach is upset, keep
                  taking in small sips of liquid calories, like 2-3 sips of cola
                  every 5 minutes. Complete nutritional shutdown is a downward
                  spiral you cannot recover from. Something is always better than
                  nothing.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 11: Dylan's Plans -------------- */}
              <div id="dylans-nutrition-plan" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Dylan&apos;s Exact Race Plans
                </h2>
                <SectionImage
                  src="/images/gallery/chicago-finish.jpg"
                  alt="Dylan finishing the Chicago Marathon"
                  caption="Fueled and Finished - Chicago Marathon"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Here are the actual nutrition plans I used for two very different
                  races. Not theoretical. These are what I ate, when I ate it,
                  and how it worked.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Ironman Wisconsin (13:54:29)
                </h3>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Pre-Race (4:00 AM)",
                      detail:
                        "2 cups white rice with scrambled eggs and soy sauce (~650 cal). 16oz water with electrolyte mix. Coffee (200mg caffeine).",
                    },
                    {
                      num: "02",
                      title: "Pre-Swim (6:30 AM)",
                      detail:
                        "1 gel + 8oz sports drink (~200 cal). Final bathroom stop.",
                    },
                    {
                      num: "03",
                      title: "Swim to T1 (7:00-8:15 AM)",
                      detail:
                        "Nothing during swim. Took a gel immediately exiting the water while running to my bike.",
                    },
                    {
                      num: "04",
                      title: "Bike Leg (8:20 AM - 2:00 PM)",
                      detail:
                        "~1,800 total calories over 5.5 hours. Concentrated drink mix in aero bottle (~400 cal), 6 gels (~600 cal), 2 bars (~500 cal), electrolyte drink (~300 cal). Salt capsule every 45 min. Refilled bottles at aid stations twice.",
                    },
                    {
                      num: "05",
                      title: "Run Leg (2:15 - 7:55 PM)",
                      detail:
                        "~1,000 total calories over 5.5 hours. Gels every 30-40 min for first 13 miles (~400 cal). Switched to cola and pretzels from mile 13-26 (~600 cal). Chicken broth at two aid stations. Salt capsule every 45 min.",
                    },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-black text-red-600/40 font-mono flex-shrink-0">
                          {step.num}
                        </span>
                        <div>
                          <p className="text-white font-bold mb-1">
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  <span className="text-white font-semibold">
                    Total race calories consumed: ~3,650.
                  </span>{" "}
                  Total calories burned: ~9,500. That&apos;s a deficit of nearly
                  6,000 calories, which is normal. The stored glycogen from carb
                  loading and body fat make up the difference.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Tunnel Hill 100 (100-Mile Ultramarathon)
                </h3>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Pre-Race (4:00 AM)",
                      detail:
                        "Oatmeal with peanut butter and banana (~600 cal). Coffee (200mg caffeine). 16oz water with electrolytes.",
                    },
                    {
                      num: "02",
                      title: "Miles 0-30 (Easy pace, stomach fresh)",
                      detail:
                        "Gels every 25-30 min. PB&J sandwich quarters at aid stations. Sports drink at every stop. ~300 cal/hr. Felt great.",
                    },
                    {
                      num: "03",
                      title: "Miles 30-60 (Fatigue building)",
                      detail:
                        "Mix of gels, boiled potatoes with salt, pretzels, and cola. Backed off to ~250 cal/hr as stomach sensitivity increased. Salt capsule every 40 min.",
                    },
                    {
                      num: "04",
                      title: "Miles 60-80 (The dark place)",
                      detail:
                        "Stomach nearly shut down around mile 65. Switched entirely to cola, broth, and small bites of potato. ~150-200 cal/hr. Walked aid stations for longer. Caffeine gels at miles 65 and 75.",
                    },
                    {
                      num: "05",
                      title: "Miles 80-100 (Survival mode)",
                      detail:
                        "Sipping cola and broth. Occasional pretzel or cookie when stomach allowed. ~150 cal/hr. Caffeine gel at mile 90. Crossed the finish line depleted but upright.",
                    },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-black text-red-600/40 font-mono flex-shrink-0">
                          {step.num}
                        </span>
                        <div>
                          <p className="text-white font-bold mb-1">
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Tip>
                  No nutrition plan survives a race perfectly. The plan gives you
                  structure and targets. When your stomach says no at mile 65, you
                  adapt: smaller amounts, different foods, more liquid. The
                  athletes who fall apart are the ones with no plan at all, not the
                  ones whose plan needed adjusting.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 12: Recovery Nutrition --------- */}
              <div id="recovery-nutrition" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Post-Race Recovery Nutrition
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You just crossed the finish line. You&apos;re exhausted,
                  emotional, and probably not hungry. But what you eat in the first
                  24 hours after your race has an enormous impact on how quickly
                  your body recovers.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The First 30-60 Minutes
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your muscles are most receptive to glycogen replenishment
                  immediately after exercise. Within 30-60 minutes of finishing,
                  try to get in{" "}
                  <span className="text-white font-semibold">
                    a mix of carbs and protein
                  </span>
                  . A recovery shake, chocolate milk, or a simple meal like a
                  turkey sandwich works. Aim for a 3:1 or 4:1 ratio of carbs to
                  protein. If your stomach won&apos;t tolerate solid food (common
                  after an Ironman), a liquid option is perfectly fine.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The First 24 Hours
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Eat frequently and eat well. Your body is in repair mode. Focus
                  on:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      need: "Carbohydrates",
                      why: "Replenish depleted glycogen stores. Rice, pasta, bread, fruit.",
                    },
                    {
                      need: "Protein",
                      why: "Repair muscle damage. Aim for 20-40g every 3-4 hours. Meat, eggs, dairy, protein shake.",
                    },
                    {
                      need: "Sodium & Electrolytes",
                      why: "Replace what you sweated out. Salty foods, electrolyte drinks. Your body may crave salt. Listen to it.",
                    },
                    {
                      need: "Water",
                      why: "Rehydrate. Drink to thirst. Monitor urine color, aiming for pale yellow within 24 hours.",
                    },
                    {
                      need: "Anti-inflammatory Foods",
                      why: "Berries, tart cherry juice, fatty fish, turmeric. Reduce the systemic inflammation from 10+ hours of exercise.",
                    },
                  ].map((r) => (
                    <div
                      key={r.need}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{r.need}</p>
                      <p className="text-sm text-gray-400 mt-1">{r.why}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Next Week
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You will be ravenously hungry for 3-5 days after an Ironman or
                  ultra. This is your body demanding fuel for repair. Eat. This
                  is not the time to count calories or restrict. Your metabolism
                  is elevated, your muscles are rebuilding, and your immune system
                  is suppressed. Feed it quality food in generous quantities.
                  Pizza, burgers, and ice cream are also acceptable. You earned
                  it.
                </p>
                <Tip>
                  After Ironman Wisconsin, I ate a large pizza, a milkshake, and
                  a bag of chips within 3 hours of finishing. The next morning I
                  ate the biggest breakfast of my life. I was still hungry. Your
                  body is not being greedy. It genuinely needs those calories.
                  Don&apos;t fight it. Eat until you&apos;re satisfied, then eat
                  a little more.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- CTA / SHARE --------------------------- */}
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
                    Now Go Fuel Your Race
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
                      dialing in your race day nutrition.
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
