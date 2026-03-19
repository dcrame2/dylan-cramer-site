"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SocialCards from "./SocialCards";

/* ── data ─────────────────────────────────────────────── */

const timeline = [
  {
    year: "2023",
    title: "Shamrock Shuffle 8K",
    detail: "41:43 — first race in the books.",
    icon: "SS",
  },
  {
    year: "2023",
    title: "Chicago 13.1 Half Marathon",
    detail: "1:48:52 — first half marathon finish.",
    icon: "HM",
  },
  {
    year: "2023",
    title: "Chicago Triathlon",
    detail: "First multi-sport finish — hooked immediately.",
    icon: "CT",
  },
  {
    year: "2023",
    title: "Fontana Triathlon",
    detail: "3:00:35 — Geneva Lake, Wisconsin.",
    icon: "FT",
  },
  {
    year: "2023",
    title: "Indianapolis Marathon",
    detail: "3:54:20 — first full marathon.",
    icon: "MR",
  },
  {
    year: "2024",
    title: "Escape Alcatraz Triathlon",
    detail: "3:08:57 — swam out of Alcatraz.",
    icon: "EA",
  },
  {
    year: "2024",
    title: "Chicago Triathlon",
    detail: "2:54:26 — back for round two.",
    icon: "CT",
  },
  {
    year: "2024",
    title: "IRONMAN 70.3 Wisconsin",
    detail: "6:14:11 — first half Ironman.",
    icon: "IM",
  },
  {
    year: "2024",
    title: "Tunnel Hill 100",
    detail: "100 miles through southern Illinois. All night, all grit.",
    icon: "TH",
  },
  {
    year: "2025",
    title: "Frozen Gnome 50K",
    detail: "6:46:12 — 50K in the dead of winter.",
    icon: "FG",
  },
  {
    year: "2025",
    title: "Chicago Triathlon Triple",
    detail: "Sprint + Olympic + International in one day. 5:11:04.",
    icon: "CT",
  },
  {
    year: "2025",
    title: "BPN 50 Mile Ultra",
    detail: "~9 hours — Go One More, Nov 2025.",
    icon: "50",
  },
  {
    year: "2025",
    title: "Tunnel Hill 100mi",
    detail: "25:53:47 — back for 100 more miles.",
    icon: "TH",
  },
  {
    year: "2025",
    title: "InstaCal Launch",
    detail: "Shipped an AI-powered calorie tracker to iOS & Android.",
    icon: "IC",
  },
  {
    year: "2026",
    title: "Ironman Lake Placid",
    detail: "July 2026. Full 140.6. The next chapter.",
    icon: "LP",
  },
];

const stats = [
  { value: "15+", label: "Races Finished", suffix: "" },
  { value: "100", label: "Longest Run (mi)", suffix: "" },
  { value: "70.3", label: "Half Ironman", suffix: "" },
  { value: "3:54", label: "Marathon PR", suffix: "" },
  { value: "50K", label: "Winter Ultra", suffix: "" },
  { value: "1", label: "App Shipped", suffix: "" },
];

const interests = [
  "Ironman",
  "Ultrarunning",
  "Open Water Swimming",
  "Software Development",
  "App Founder",
  "Content Creator",
  "Music Festivals",
  "Concerts",
  "Chicago",
  "Documentary-Style Video",
  "Cycling",
  "Trail Running",
];

const galleryImages = [
  { src: "/images/gallery/ironman-finish.jpg", alt: "Ironman Wisconsin finish line", caption: "Ironman Wisconsin" },
  { src: "/images/gallery/stadium-run.jpg", alt: "Stadium run in Chicago", caption: "Stadium Run" },
  { src: "/images/gallery/tunnel-hill-finish.jpg", alt: "Tunnel Hill 100 finish", caption: "Tunnel Hill 100" },
  { src: "/images/gallery/swim-exit.jpg", alt: "Open water swim exit", caption: "Swim Exit" },
  { src: "/images/gallery/chicago-run.jpg", alt: "Running in Chicago", caption: "Chicago Run" },
  { src: "/images/gallery/bike-capitol.jpg", alt: "Biking at the capitol", caption: "Bike Leg" },
];

/* ── helpers ──────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
  );
}

function useAnimRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

/* ── component ────────────────────────────────────────── */

export default function AboutPage() {
  const hero = useAnimRef();
  const who = useAnimRef();
  const timelineRef = useAnimRef();
  const drives = useAnimRef();
  const statsRef = useAnimRef();
  const lifestyle = useAnimRef();
  const photos = useAnimRef();
  const cta = useAnimRef();

  return (
    <div className="relative pt-28 grain-overlay overflow-hidden">
      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={hero.ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/night-run-bw.jpg"
            alt="Dylan running at night"
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
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.5em] text-red-500 font-mono mb-6"
          >
            The Full Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
          >
            <span className="text-red-500 red-glow-text">About</span>
            <br />
            <span className="text-white">Me</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl"
          >
            Software developer. Ironman finisher. 100-mile ultrarunner.
            Content creator. Based in Chicago.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* ── WHO I AM ──────────────────────────────────── */}
      <section ref={who.ref} className="relative py-28 px-6">
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={who.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-2">
                Who I Am
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Built Different.
                <br />
                <span className="text-red-500">Never Enough.</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                I&apos;m Dylan Cramer — a software developer by day who refuses to sit still.
                When I&apos;m not writing code at my 9-5 or building{" "}
                <span className="text-red-500 font-semibold">InstaCal</span>,
                you&apos;ll find me training for my next Ironman, running ultras through
                the night, or swimming in open water before sunrise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I&apos;ve finished{" "}
                <span className="text-white font-semibold">IRONMAN 70.3 Wisconsin</span> in
                6:14:11, ran{" "}
                <span className="text-white font-semibold">100 miles at Tunnel Hill</span> in 25:53,
                swam Escape Alcatraz, raced the Chicago Triathlon Triple,
                and now I&apos;m training for my first full{" "}
                <span className="text-red-500 font-semibold">Ironman at Lake Placid</span> in
                July 2026.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Outside of racing, I like to party, hit music festivals and concerts,
                and live life to the absolute fullest. I document it all — raw,
                authentic, documentary-style — because this life is meant to be shared.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {interests.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={who.inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="px-3 py-1 text-xs uppercase tracking-wider border border-red-900/40 text-red-400 bg-red-900/10 rounded-lg"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={who.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                    IRONMAN 70.3 Wisconsin 2024
                  </p>
                  <p className="text-3xl font-black text-white countdown-digit">
                    6:14:11
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-red-600/20 -z-10 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── TIMELINE ──────────────────────────────────── */}
      <section ref={timelineRef.ref} className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={timelineRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              The Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Milestones
            </h2>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/60 via-red-600/30 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -40 : 40,
                    }}
                    animate={
                      timelineRef.inView
                        ? { opacity: 1, x: 0 }
                        : {}
                    }
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft
                        ? "md:flex-row md:pr-[50%]"
                        : "md:flex-row-reverse md:pl-[50%]"
                    }`}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-black z-10 mt-1" />

                    {/* Card */}
                    <div
                      className={`ml-14 md:ml-0 ${
                        isLeft ? "md:mr-12" : "md:ml-12"
                      } p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all flex-1`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold rounded-xl">
                          {item.icon}
                        </div>
                        <span className="text-xs font-mono text-red-500 tracking-widest">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">{item.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{item.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── WHAT DRIVES ME ────────────────────────────── */}
      <section ref={drives.ref} className="relative py-28 px-6">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={drives.inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/gallery/tunnel-hill-finish.jpg"
                  alt="Tunnel Hill 100 finish"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs uppercase tracking-widest text-red-400 font-mono">
                    Tunnel Hill 100
                  </p>
                  <p className="text-2xl font-black text-white">100 Miles.</p>
                </div>
              </div>
            </motion.div>

            {/* Text right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={drives.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-2">
                The Philosophy
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                What Drives Me
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                There&apos;s a moment in every race — mile 80 of a 100-miler, hour 12 of an
                Ironman — when your body tells you to stop. Your legs are gone. Your mind
                is begging you to quit. That&apos;s the moment that defines you.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                One more mile. One more rep. One more commit. One more video. It&apos;s not
                about being the fastest or the most talented — it&apos;s about refusing to
                stop when it gets hard.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe you can have the 9-5 career, train for an Ironman, build an app,
                create content, AND still have a life. You just have to want it badly
                enough and be willing to sacrifice comfort for progress.
              </p>

            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── STATS / NUMBERS ───────────────────────────── */}
      <section ref={statsRef.ref} className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={statsRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              By The Numbers
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              The Resume
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsRef.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all text-center"
              >
                <p className="text-3xl md:text-4xl font-black countdown-digit">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg text-red-400">{stat.suffix}</span>
                  )}
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-mono mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── THE LIFESTYLE ─────────────────────────────── */}
      <section ref={lifestyle.ref} className="relative py-28 px-6">
        <div className="absolute top-20 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={lifestyle.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              The Balance
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              9-5. Athlete. Creator.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Software Developer",
                time: "9:00 AM - 5:00 PM",
                description:
                  "Full-time software developer during the day. Writing code, shipping features, and solving problems — it pays the bills and fuels the rest.",
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
                  "Training before sunrise and after the laptop closes. Swim, bike, run — sometimes all in the same day. Ironman and ultramarathon training never stops.",
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
                  "Documenting the journey — raw, authentic, documentary-style. Filming races, editing videos, and building a community around doing the most with your time.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={lifestyle.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-red-600/40 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-red-600/20 border border-red-600/40 text-red-500 rounded-xl mb-5 group-hover:bg-red-600 group-hover:text-white transition-all">
                  {card.icon}
                </div>
                <p className="text-xs font-mono text-red-500 tracking-widest uppercase mb-2">
                  {card.time}
                </p>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={lifestyle.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 text-sm font-mono mt-10"
          >
            Sleep is optional. Results are mandatory.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* ── PHOTO HIGHLIGHTS ──────────────────────────── */}
      <section ref={photos.ref} className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={photos.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Highlights
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Captured Moments
            </h2>
          </motion.div>

          {/* Scrollable gallery */}
          <div className="overflow-x-auto scroll-gallery">
            <div className="flex gap-4 min-w-max pb-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={photos.inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="relative w-72 h-96 flex-shrink-0 overflow-hidden rounded-2xl group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="288px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-widest text-red-400 font-mono">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs font-mono mt-6 tracking-wider uppercase">
            Scroll to see more &rarr;
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA / SOCIALS ─────────────────────────────── */}
      <section ref={cta.ref} className="relative py-28 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Follow The Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              Come Along<span className="text-red-500">.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12">
              I share everything — the training, the races, the app builds, the wins,
              and the suffering. Follow along on your favorite platform.
            </p>
          </motion.div>

          <SocialCards inView={cta.inView} delay={0.3} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={cta.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-gray-600 text-xs font-mono uppercase tracking-widest"
          >
            The journey continues.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
