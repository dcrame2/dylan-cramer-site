"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* -- data ------------------------------------------------- */

const sections = [
  { id: "why-long-distance", label: "Why Long Distance Cycling" },
  { id: "building-bike-fitness", label: "Building Bike Fitness" },
  { id: "training-for-centuries", label: "Training for 100+ Miles" },
  { id: "bike-fit-and-positioning", label: "Bike Fit & Positioning" },
  { id: "cadence-and-power", label: "Cadence & Power Zones" },
  { id: "climbing-strategy", label: "Climbing Strategy" },
  { id: "group-riding", label: "Group Riding Etiquette" },
  { id: "indoor-training", label: "Indoor Training" },
  { id: "nutrition-on-the-bike", label: "Nutrition on the Bike" },
  { id: "gear-essentials", label: "Gear Essentials" },
  { id: "safety-and-maintenance", label: "Safety & Maintenance" },
  { id: "brick-workouts", label: "Brick Workouts" },
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

/* -- component -------------------------------------------- */

export default function LongDistanceCyclingGuide() {
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
          title: "Long Distance Cycling Guide - Dylan Cramer",
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
            src="/images/gallery/bike-capitol.jpg"
            alt="Dylan cycling past the Wisconsin State Capitol during Ironman"
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
            <span className="text-white">Long Distance</span>
            <br />
            <span className="text-red-500">Cycling Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Everything you need to ride 100+ miles. From building your base to
            dialing in nutrition, bike fit, and pacing. Written by someone who
            biked 112 miles during Ironman Wisconsin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#why-long-distance"
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
              {/* -- Section 1: Why Long Distance Cycling -- */}
              <div id="why-long-distance" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    Why Long Distance Cycling<span className="text-red-500">?</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Long distance cycling is one of the most rewarding things you
                    can do as an endurance athlete. A century ride (100 miles) is
                    the cycling equivalent of running a marathon. It tests your
                    fitness, your nutrition strategy, your mental toughness, and
                    your ability to suffer productively for 5-7 hours straight.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    For triathletes, the bike leg is the longest portion of any
                    race. In a half Ironman, it&apos;s 56 miles. In a full Ironman,
                    it&apos;s 112. The bike is where races are won or lost, not
                    because you need to be the fastest cyclist, but because a smart
                    bike leg sets up everything that comes after it. Blow up on the
                    bike and your run becomes a death march.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Even if you never race a triathlon, long distance riding is
                    incredible on its own. There is nothing quite like covering 100
                    miles under your own power, watching the landscape change, and
                    arriving somewhere that felt impossibly far away when you started
                    pedaling that morning.
                  </p>
                  <div className="grid grid-cols-3 gap-4 my-8">
                    {[
                      { distance: "50", unit: "miles", label: "Metric Century" },
                      { distance: "100", unit: "miles", label: "Full Century" },
                      { distance: "112", unit: "miles", label: "Ironman Bike" },
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center"
                      >
                        <p className="text-2xl md:text-3xl font-black text-white">
                          {d.distance}
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

              {/* -- Section 2: Building Bike Fitness ------- */}
              <div id="building-bike-fitness" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Building Bike Fitness From Scratch
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you&apos;re new to cycling or coming from a running background,
                  the good news is that cycling fitness builds faster than you
                  expect. The bike is low-impact, so you can handle higher training
                  volume without the same injury risk as running. The bad news is
                  that your butt, hands, and neck are going to hurt for the first
                  few weeks. That&apos;s normal. It goes away.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Weeks 1-4: Foundation
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Start with 3 rides per week: two short rides (45-60 minutes) and
                  one longer ride (90 minutes to 2 hours). Keep the intensity easy
                  . You should be able to hold a conversation the entire time. The
                  goal is saddle time, not speed. Your body needs to adapt to the
                  position, the pedaling motion, and the sustained effort.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Weeks 5-12: Building Volume
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Increase your long ride by 15-20% each week. If you rode 2 hours
                  last weekend, aim for 2:15 or 2:30 this weekend. Add one
                  structured ride per week with intervals: tempo efforts of 10-20
                  minutes at a pace where talking is difficult but not impossible.
                  This builds your aerobic engine faster than easy riding alone.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Months 3-6: Race-Specific Volume
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  By month three, your long ride should be approaching 3-4 hours.
                  Start incorporating back-to-back ride days to build durability.
                  Ride 3 hours on Saturday, then 90 minutes on Sunday. This teaches
                  your body to perform on tired legs, critical for century rides
                  and Ironman racing.
                </p>
                <Tip>
                  The 10% rule is a rough guide, not gospel. Some weeks you&apos;ll
                  feel great and can push volume. Other weeks your legs are dead and
                  you need to back off. Listen to your body over any training plan.
                  Consistency over months matters far more than any single big week.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 3: Training for Centuries ------ */}
              <div id="training-for-centuries" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Training for 100+ Mile Rides
                </h2>
                <SectionImage
                  src="/images/gallery/bike-barn.jpg"
                  alt="Riding past a barn on the Ironman Wisconsin bike course"
                  caption="Mile 80 - The Verona Loop"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A century ride is a completely different beast than a 50-mile
                  ride. It&apos;s not twice as hard. It&apos;s exponentially
                  harder. The last 20 miles of a century feel nothing like the
                  first 20. Your glycogen is depleted, your muscles are fatigued,
                  and your brain is begging you to stop. That&apos;s exactly why
                  you train for it.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Long Ride Progression
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Build your long ride progressively over 8-12 weeks. A solid
                  progression looks like this: 40 miles, 50, 55, 60, 50 (recovery
                  week), 65, 75, 80, 65 (recovery), 90, 100. You don&apos;t need
                  to ride 100 miles every weekend. Two or three rides over 80 miles
                  in training is enough to know you can finish a century on race
                  day.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Pacing a Century Ride
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The biggest mistake in long distance cycling is going too hard
                  too early. For a century, ride the first 50 miles at a pace that
                  feels almost too easy. If you&apos;re using power, stay at 65-75%
                  of your FTP for the first half. If you&apos;re going by feel,
                  you should be able to chat comfortably. Save your energy for
                  miles 70-100 when the real suffering begins.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  During Ironman Wisconsin, I rode the first 56 miles averaging
                  about 17.5 mph. The second 56 I averaged closer to 16.2 mph.
                  That&apos;s a normal split for a well-paced ride. If your second
                  half is significantly slower than your first, you went out too
                  hard.
                </p>
                <Tip>
                  Use a heart rate monitor or power meter to keep yourself honest
                  in the first half. Perceived effort is unreliable when you&apos;re
                  fresh and excited. Objective data keeps you from blowing up
                  later. If you don&apos;t have a power meter, heart rate is a good
                  substitute. Stay in zone 2-3 for the first half.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 4: Bike Fit -------------------- */}
              <div id="bike-fit-and-positioning" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Bike Fit &amp; Positioning
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A professional bike fit is the single best investment you can
                  make in long distance cycling. A bad fit over 20 miles is
                  uncomfortable. A bad fit over 100 miles is destructive. It will
                  wreck your knees, back, neck, and hands, and it will cost you
                  significant power output.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Saddle Height &amp; Position
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your saddle height determines knee extension at the bottom of your
                  pedal stroke. Too high and you rock your hips side to side, causing
                  lower back pain. Too low and you overload your knees. A proper fit
                  gives you a slight bend (25-35 degrees) in your knee at the
                  bottom of the stroke. Saddle fore/aft position affects how your
                  knee tracks over the pedal. Ideally your kneecap sits directly
                  above the pedal spindle when the crank is at 3 o&apos;clock.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Aero Position
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  For triathletes and anyone looking to ride faster, the aero
                  position is huge. Aerodynamic drag is the biggest force working
                  against you at speeds above 15 mph. Getting low and narrow on
                  aero bars can save you 30-60 minutes over 112 miles compared to
                  riding upright on the hoods. But aero position uses different
                  muscles, primarily your hip flexors and lower back, and
                  requires gradual adaptation.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Start with 10-15 minutes in aero during your rides and build up
                  by 5 minutes per week. By race day, you should be comfortable
                  spending 60-70% of your ride in aero. The remaining time on the
                  base bars is for climbing, descending, and giving your back a
                  break.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Hand &amp; Neck Comfort
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Numbness in your hands and pain in your neck are the two most
                  common complaints on long rides. Change your hand position
                  frequently: tops, hoods, drops, aero bars. Padded gloves help.
                  For neck pain, strengthen your neck and upper back with exercises
                  off the bike, and practice looking up periodically during rides
                  rather than staring at the ground 3 feet in front of your wheel.
                </p>
                <Tip>
                  A bike fit costs $150-300 and takes 2-3 hours. Get one before you
                  start heavy training, not right before your race. You need time
                  to adapt to any position changes. If something still hurts after
                  2-3 weeks of riding in the new position, go back to your fitter
                  for adjustments. Most good fitters include follow-up visits.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 5: Cadence & Power ------------- */}
              <div id="cadence-and-power" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Cadence &amp; Power Zones
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Cadence is how fast your legs are spinning, measured in RPM
                  (revolutions per minute). Most recreational cyclists ride at
                  60-70 RPM in a hard gear. For long distance riding, you want to
                  target{" "}
                  <span className="text-white font-semibold">80-95 RPM</span>.
                  Higher cadence shifts the workload from your muscles to your
                  cardiovascular system, which is more sustainable over hours of
                  riding.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Why Higher Cadence Matters
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Grinding a big gear at 65 RPM feels efficient early in a ride, but
                  it torches your quads and hamstrings. By mile 70, those muscles
                  are fried and you have nothing left. Spinning at 85-90 RPM in an
                  easier gear produces the same speed with less muscular strain.
                  Your legs will be fresher for the later miles, and if you&apos;re
                  doing a triathlon, fresher for the run.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Power Zones for Long Distance
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  If you have a power meter, training and racing by power zones is
                  the most effective way to pace yourself. Here&apos;s how the zones
                  apply to long distance riding:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      zone: "Zone 1",
                      name: "Active Recovery",
                      pct: "<55% FTP",
                      use: "Recovery rides, warming up, cooling down.",
                    },
                    {
                      zone: "Zone 2",
                      name: "Endurance",
                      pct: "55-75% FTP",
                      use: "The bread and butter of long distance riding. Most of your century should be here.",
                    },
                    {
                      zone: "Zone 3",
                      name: "Tempo",
                      pct: "76-90% FTP",
                      use: "Sustained efforts on flats and gradual climbs. Sustainable for 1-2 hours, not 5-6.",
                    },
                    {
                      zone: "Zone 4",
                      name: "Threshold",
                      pct: "91-105% FTP",
                      use: "Short climbs, race surges. Only use sparingly in a century or Ironman.",
                    },
                    {
                      zone: "Zone 5+",
                      name: "VO2max & Above",
                      pct: ">105% FTP",
                      use: "Short intervals in training only. Never in a long distance race.",
                    },
                  ].map((z) => (
                    <div
                      key={z.zone}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {z.zone}: {z.name}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {z.pct}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{z.use}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  If you don&apos;t have a power meter, use heart rate or perceived
                  effort. Zone 2 riding feels like you could sustain it all day.
                  You can talk in full sentences, breathing is controlled, and
                  you&apos;re not sweating excessively. If you can&apos;t talk, you
                  are going too hard for a century pace.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 6: Climbing Strategy ----------- */}
              <div id="climbing-strategy" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Climbing Strategy
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Hills are where most long distance cyclists lose their race. Not
                  because they can&apos;t climb them, but because they climb them
                  too hard and pay for it 30 miles later. A smart climbing strategy
                  is about energy management, not conquering every hill like a
                  mountain goat.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Pace by Power, Not Speed
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your speed on a climb will drop. That&apos;s physics, not
                  fitness. What matters is your power output (or heart rate) staying
                  controlled. On a long climb, stay in Zone 2-3. Yes, people will
                  pass you. Yes, it feels slow. But they are burning matches that
                  don&apos;t grow back. You will catch them on the other side or on
                  the flats that follow.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Gear Selection
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Shift into an easier gear BEFORE the climb starts. If you wait
                  until you&apos;re halfway up and your cadence has dropped to 50
                  RPM, you&apos;ve already wasted energy. Anticipate the terrain
                  and downshift early. Maintain your cadence at 70-85 RPM on
                  climbs, which means using a much easier gear than you think.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Seated vs. Standing
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Seated climbing is more efficient for sustained efforts.
                  Standing uses about 10-12% more energy for the same power output
                  because you&apos;re supporting your body weight. Save standing
                  for short, punchy climbs or to briefly change your position and
                  stretch your back on long climbs. A good rule: stand for no more
                  than 30 seconds at a time on a long climb, then sit back down.
                </p>
                <Tip>
                  Ironman Wisconsin&apos;s bike course has over 4,000 feet of
                  climbing across two loops. The rollers around Verona crushed
                  people who went too hard on the first loop. I kept my heart rate
                  below 145 on every climb and passed dozens of riders on the
                  second loop who had blown up. Patience on the climbs is free
                  speed later.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 7: Group Riding ---------------- */}
              <div id="group-riding" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Group Riding Etiquette
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Group rides are one of the best ways to build cycling fitness and
                  enjoy the sport. Drafting behind other riders reduces your effort
                  by 25-30%, and the social element makes long rides fly by. But
                  group riding has rules, and breaking them puts everyone at risk.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Essential Group Ride Rules
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Hold your line.
                    </span>{" "}
                    Ride in a straight, predictable line. Don&apos;t swerve, don&apos;t
                    overlap wheels with the rider in front of you, and don&apos;t
                    make sudden movements. If you need to move, do it gradually
                    and call it out.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Call out hazards.
                    </span>{" "}
                    Yell &ldquo;hole&rdquo; for potholes, &ldquo;car back&rdquo;
                    for vehicles approaching from behind, &ldquo;slowing&rdquo;
                    when you brake, and &ldquo;on your left&rdquo; when passing.
                    Point out road debris. The riders behind you can&apos;t see
                    what&apos;s ahead.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Take your pulls.
                    </span>{" "}
                    When you&apos;re at the front of a paceline, you&apos;re doing
                    the most work. Pull for 1-3 minutes, then move to the side and
                    drift back. Don&apos;t be the person who sits in the draft the
                    entire ride without contributing.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Don&apos;t half-wheel.
                    </span>{" "}
                    Half-wheeling is when you ride with your front wheel slightly
                    ahead of the person beside you, unconsciously pushing the pace
                    up. It&apos;s the most annoying thing in group cycling. Match
                    the pace of the group, not the other way around.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      No aero bars in a group.
                    </span>{" "}
                    Aero bars take your hands away from the brakes and make you
                    less stable. In a group ride, keep your hands on the hoods or
                    drops where you can brake immediately. Most group rides ban
                    aero bars entirely.
                  </p>
                </div>
                <Tip>
                  If you&apos;re new to group riding, join a &ldquo;no-drop&rdquo;
                  ride first. These rides wait for everyone and nobody gets left
                  behind. Most bike shops host weekly group rides organized by pace.
                  Start with the slower group and work up. There is no shame in
                  riding within your ability.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 8: Indoor Training ------------- */}
              <div id="indoor-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Indoor Training
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Indoor training on a smart trainer or stationary bike is a
                  game-changer for long distance cyclists, especially if you live
                  somewhere with harsh winters. Platforms like Zwift, TrainerRoad,
                  and Wahoo SYSTM offer structured workouts that target specific
                  energy systems and make indoor sessions more tolerable.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  When Indoor Training Makes Sense
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Indoor training is superior to outdoor riding for structured
                  interval workouts. There are no stoplights, no traffic, no
                  coasting downhill. Every second of the workout counts. A
                  60-minute indoor session can deliver more training stimulus than
                  a 90-minute outdoor ride because there&apos;s zero junk time.
                  Use the trainer for weekday workouts when time is tight, and save
                  weekends for outdoor long rides.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Zwift &amp; Virtual Riding
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Zwift turns indoor riding into a video game. You ride with other
                  real people on virtual courses, join group rides, race, and
                  follow structured training plans. It makes the trainer
                  significantly more engaging than staring at a wall. The social
                  element is real. You&apos;ll find riding partners and push
                  yourself harder than you would alone.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Indoor Long Rides
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Indoor rides longer than 2 hours are mentally brutal. Set up a
                  TV show, a movie, or use Zwift&apos;s longer routes. Have a fan
                  blowing directly on you. You sweat significantly more indoors
                  because there&apos;s no natural wind cooling. Have water and
                  nutrition within reach. Most importantly, don&apos;t try to
                  replicate your outdoor long ride indoors minute-for-minute. A
                  3-hour indoor ride is roughly equivalent to a 4-hour outdoor ride
                  in training load because of the constant pedaling.
                </p>
                <Tip>
                  Invest in a good fan. This is not optional. It&apos;s the
                  single most important piece of indoor training equipment. A
                  proper fan keeps your body temperature manageable and your power
                  output higher. Without adequate cooling, your performance drops
                  15-20% and you overheat dangerously. A $40 box fan does the job.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 9: Nutrition on the Bike ------- */}
              <div id="nutrition-on-the-bike" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Nutrition on the Bike
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Long distance cycling nutrition is a skill, not an afterthought.
                  For rides over 2 hours, your body burns through its stored
                  glycogen and you must replace calories while riding. Fail to eat
                  enough and you bonk, a sudden, devastating loss of energy
                  where your legs stop working and your brain fogs over. It&apos;s
                  the cycling equivalent of hitting the wall in a marathon, and
                  it&apos;s entirely preventable.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Calorie Targets
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  For rides of 3+ hours, aim for{" "}
                  <span className="text-white font-semibold">
                    200-350 calories per hour
                  </span>
                  . Your body can absorb roughly 60-90 grams of carbohydrates per
                  hour (more with training and dual-source carbs like
                  glucose+fructose blends). Start eating at minute 30-45 of your
                  ride, not when you first feel hungry. By the time you feel hungry,
                  you&apos;re already behind.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  What to Eat
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The bike is the easiest time to eat during any endurance event.
                  You&apos;re sitting down, your core is relatively stable, and
                  your stomach handles food better at cycling intensity than running
                  intensity. Use a mix of:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      food: "Gels",
                      detail:
                        "Quick, portable, 100 calories each. Take with water. Easy to carry in a jersey pocket or bento box.",
                    },
                    {
                      food: "Bars / Chews",
                      detail:
                        "200-250 calories. Good for the first 3-4 hours when your stomach is fresh. Harder to eat later in a ride.",
                    },
                    {
                      food: "Sports Drink",
                      detail:
                        "Combines calories, carbs, and electrolytes. Aim for 1-2 bottles per hour depending on heat.",
                    },
                    {
                      food: "Real Food",
                      detail:
                        "PB&J sandwiches, rice cakes, bananas, boiled potatoes. Great for ultra-long rides when your palate revolts against sweet gels.",
                    },
                  ].map((f) => (
                    <div
                      key={f.food}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{f.food}</p>
                      <p className="text-sm text-gray-400 mt-1">{f.detail}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Hydration Strategy
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Drink before you&apos;re thirsty. A general target is{" "}
                  <span className="text-white font-semibold">
                    20-28 oz per hour
                  </span>{" "}
                  depending on temperature and sweat rate. In hot conditions, you
                  may need 36+ oz per hour. Include electrolytes in at least one
                  of your bottles. Plain water alone will dilute your sodium
                  levels over many hours (hyponatremia), which is dangerous.
                </p>
                <Tip>
                  Set a timer on your bike computer or watch to beep every 15-20
                  minutes. When it beeps, eat or drink something. It sounds
                  obsessive, but after 4 hours of riding your brain gets foggy
                  and you forget to eat. The timer removes willpower from the
                  equation. I used this strategy for the entire 112-mile bike at
                  Ironman Wisconsin and never bonked.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 10: Gear Essentials ------------ */}
              <div id="gear-essentials" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Gear Essentials
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You don&apos;t need to spend $10,000 to ride a century. But you
                  do need the right equipment to be safe, comfortable, and
                  efficient over 5-7 hours in the saddle. Here&apos;s what matters
                  and what doesn&apos;t:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      item: "Road Bike or Tri Bike",
                      need: "Essential",
                      detail:
                        "A road bike is perfect for centuries and triathlons. Tri bikes are optimized for aero but less comfortable and harder to handle. For your first century, a road bike with clip-on aero bars is ideal.",
                    },
                    {
                      item: "Helmet",
                      need: "Essential",
                      detail:
                        "Non-negotiable. Any CPSC-certified road helmet works. Spend $60-150 for a well-ventilated helmet that fits properly. Aero helmets are faster but hotter.",
                    },
                    {
                      item: "Cycling Shoes & Clipless Pedals",
                      need: "Recommended",
                      detail:
                        "Clipless pedals connect your shoe to the pedal for better power transfer and efficiency. SPD-SL or Look-style for road. Adds 5-10% efficiency over flat pedals. Practice clipping in/out before riding in traffic.",
                    },
                    {
                      item: "Cycling Kit (Bib Shorts + Jersey)",
                      need: "Essential",
                      detail:
                        "Padded bib shorts are mandatory for rides over 2 hours. The chamois pad prevents saddle sores. A cycling jersey has pockets for food and a zipper for ventilation. No underwear under bib shorts.",
                    },
                    {
                      item: "Flat Repair Kit",
                      need: "Essential",
                      detail:
                        "Spare tube, tire levers, CO2 inflator or mini pump. Practice changing a flat at home before you get one at mile 60. A flat is a 5-minute inconvenience, not a ride-ender.",
                    },
                    {
                      item: "Bike Computer or GPS Watch",
                      need: "Recommended",
                      detail:
                        "Tracks speed, distance, cadence, heart rate, and power. Garmin Edge or Wahoo ELEMNT are the most popular. Essential for pacing long rides and following routes.",
                    },
                    {
                      item: "Sunglasses",
                      need: "Essential",
                      detail:
                        "Protects your eyes from bugs, debris, wind, and UV. Cheap sport sunglasses work fine. Wrap-around style that stays put at speed.",
                    },
                    {
                      item: "Water Bottles & Cages",
                      need: "Essential",
                      detail:
                        "Minimum two bottle cages on your bike frame. For hot days or Ironman distance, add a behind-the-saddle hydration system for a third bottle.",
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
                  Don&apos;t buy a tri bike for your first long distance ride or
                  race. A road bike is more comfortable, more versatile, easier to
                  handle, and significantly cheaper. Add $50 clip-on aero bars and
                  you&apos;ll be 90% as aero as a tri bike at a fraction of the
                  cost.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 11: Safety & Maintenance ------- */}
              <div id="safety-and-maintenance" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Safety &amp; Maintenance
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Long distance cycling puts you on the road for hours. Cars,
                  road hazards, mechanical failures, and weather are all real
                  risks. Respecting these risks is not paranoia. It&apos;s what
                  keeps you riding for decades.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Road Safety
                </h3>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Be visible.
                    </span>{" "}
                    Wear bright colors during the day. Use front and rear lights
                    even in daylight. A blinking rear light is visible from much
                    farther than a jersey. Avoid riding at dawn and dusk when
                    driver visibility is worst.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Ride predictably.
                    </span>{" "}
                    Signal turns, don&apos;t weave between parked cars, and obey
                    traffic laws. Drivers expect predictable behavior. The moment
                    you do something unexpected is the moment you&apos;re in danger.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Assume cars don&apos;t see you.
                    </span>{" "}
                    Make eye contact with drivers at intersections. Don&apos;t
                    assume a car will stop just because it should. Defensive
                    cycling saves lives.
                  </p>
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Basic Maintenance
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  You don&apos;t need to be a mechanic, but you should know how to:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      task: "Fix a flat tire",
                      detail:
                        "Remove the wheel, swap the tube, inflate with CO2 or pump. Practice this at home until you can do it in under 5 minutes.",
                    },
                    {
                      task: "Check tire pressure",
                      detail:
                        "Check before every ride. Road tires typically run 80-100 PSI (or as marked on the tire sidewall). Low pressure increases flat risk and rolling resistance.",
                    },
                    {
                      task: "Clean and lube the chain",
                      detail:
                        "Wipe the chain with a rag, apply lube to each link, wipe off excess. Do this every 100-200 miles or after riding in rain. A clean chain shifts better and lasts longer.",
                    },
                    {
                      task: "Check brakes",
                      detail:
                        "Squeeze both brake levers and make sure they engage firmly before the lever hits the bar. Worn brake pads are cheap to replace and critical for descending safely.",
                    },
                  ].map((m) => (
                    <div
                      key={m.task}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{m.task}</p>
                      <p className="text-sm text-gray-400 mt-1">{m.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Carry your phone, an ID, a credit card, and emergency contact
                  info on every ride. Put it in a jersey pocket or saddle bag.
                  If something goes wrong 50 miles from home, you need a way to
                  call for help and pay for a ride back. Also tell someone your
                  route and expected return time before every long ride.
                </Tip>
              </div>

              <SectionDivider />

              {/* -- Section 12: Brick Workouts ------------- */}
              <div id="brick-workouts" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Brick Workouts
                </h2>
                <SectionImage
                  src="/images/gallery/ironman-run.jpg"
                  alt="Dylan running during the Ironman marathon after 112 miles on the bike"
                  caption="Bike to Run - The Hardest Transition"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A brick workout means doing two disciplines back to back,
                  typically a bike ride immediately followed by a run. The name
                  comes from how your legs feel when you start running after hours
                  in the saddle: like bricks. For triathletes, brick workouts are
                  the single most important training session of the week.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Why Bricks Matter
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The bike-to-run transition is the hardest part of any triathlon.
                  Your legs have been in a fixed, repetitive motion for hours. Your
                  hip flexors are shortened from the aero position. Your quads are
                  fatigued from pedaling. And now you have to run. The first mile
                  off the bike is genuinely terrible. Your legs feel like they
                  belong to someone else and your stride is completely off.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Brick training doesn&apos;t make this sensation disappear, but it
                  teaches your body to find a running rhythm faster. After
                  consistent brick training, the &ldquo;dead legs&rdquo; phase
                  shrinks from 2-3 miles to 0.5-1 mile. That adaptation is
                  enormous over a marathon.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  How to Structure Brick Workouts
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      phase: "Beginner Brick",
                      time: "Months 1-3",
                      detail:
                        "60-90 min easy bike followed by 15-20 min easy run. Just get your legs moving. Don't worry about pace.",
                    },
                    {
                      phase: "Building Brick",
                      time: "Months 3-5",
                      detail:
                        "2-3 hour bike followed by 30-45 min run. Practice your race nutrition on the bike. Run at target race effort.",
                    },
                    {
                      phase: "Race Simulation Brick",
                      time: "Months 5-7",
                      detail:
                        "4-5 hour bike followed by 45-75 min run. As close to race conditions as possible. Full nutrition plan. Race pace effort.",
                    },
                    {
                      phase: "Mini Bricks (Weekday)",
                      time: "Year-round",
                      detail:
                        "30-45 min hard bike (trainer works great) followed by 15-20 min run. Quick transition. Great for maintaining the adaptation during lower-volume weeks.",
                    },
                  ].map((b) => (
                    <div
                      key={b.phase}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {b.phase}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {b.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{b.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  During Ironman Wisconsin, the transition from the bike to the
                  run was the lowest point of my race mentally. My legs were dead
                  from 112 miles and 4,000 feet of climbing. The first mile of the
                  marathon was a 12-minute shuffle. But because I had done dozens
                  of bricks in training, I knew the dead-leg feeling would pass.
                  By mile 3, I found my rhythm. By mile 6, I was running my target
                  pace. Trust the training.
                </p>
                <Tip>
                  Practice your T2 (bike-to-run transition) during brick workouts.
                  Get off the bike, rack it, change shoes, grab your run nutrition,
                  and go. The faster and more automatic this process becomes, the
                  less time and mental energy it costs on race day. Your transition
                  area at home can be a spot in your garage.
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
                    Now Go Ride<span className="text-red-500">.</span>
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
                      dialing in your ride nutrition.
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
