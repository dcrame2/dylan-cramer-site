"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/* ── data ─────────────────────────────────────────────── */

const sections = [
  { id: "why-document", label: "Why Document Your Journey" },
  { id: "filming-while-training", label: "Filming While Training" },
  { id: "editing-workflow", label: "Editing Workflow" },
  { id: "storytelling-frameworks", label: "Storytelling Frameworks" },
  { id: "what-performs-well", label: "What Performs Well" },
  { id: "reels-vs-tiktok", label: "Instagram Reels vs TikTok" },
  { id: "best-times-to-post", label: "Best Times to Post" },
  { id: "managing-creation-training", label: "Content + Training Balance" },
  { id: "building-authentic-brand", label: "Building an Authentic Brand" },
  { id: "monetization", label: "Monetization Paths" },
  { id: "dylans-workflow", label: "Dylan's Content Workflow" },
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

export default function ContentCreationGuide() {
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
          title: "Content Creation Guide for Athletes - Dylan Cramer",
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
            src="/images/gallery/alcatraz-beach-run2.jpg"
            alt="Filming content while running in Chicago"
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
            Free Guide &middot; 18 Min Read
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Content Creation</span>
            <br />
            <span className="text-red-500">for Athletes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            How to document your athletic journey without it killing your
            training. Filming tips, editing workflows, and growing an audience
            as an athlete-creator.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#why-document"
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
              {/* ── Section 1: Why Document ──────────── */}
              <div id="why-document" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                    Why Document Your Journey
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    You&apos;re already doing the hard part: training,
                    racing, pushing your limits. Creating content around that
                    journey is one of the highest-leverage things you can do.
                    Not for vanity metrics. For connection, opportunity, and
                    legacy.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    When I started documenting my Ironman training, I expected
                    maybe my friends to watch. Instead, I connected with
                    thousands of people on the same path. I got asked to
                    collaborate with brands. I built an audience that now
                    supports my app, InstaCal. And most importantly, I have a
                    library of memories from the most transformative period of
                    my life.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    The barrier to entry has never been lower. A phone, a free
                    editing app, and 30 minutes a week. That&apos;s it.
                    You&apos;re not competing with production studios. You&apos;re
                    competing for attention with authenticity. And athletes have
                    an unfair advantage: our content is inherently interesting.
                    Suffering, triumph, transformation. These are the stories
                    people are drawn to.
                  </p>
                </motion.div>
              </div>

              <SectionDivider />

              {/* ── Section 2: Filming While Training ─── */}
              <div id="filming-while-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Filming While Training
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/alcatraz-bike-coast.jpg"
                  alt="Capturing content at a race event"
                  caption="Content Meets Racing"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The number one rule:{" "}
                  <span className="text-white font-semibold">
                    training comes first, content comes second
                  </span>
                  . If filming disrupts your workout quality, you&apos;re
                  doing it wrong. The goal is to capture your training, not to
                  train for the camera.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Phone vs. GoPro
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      device: "Phone (iPhone/Android)",
                      best: "Best for: talking to camera, lifestyle shots, transitions",
                      detail:
                        "Higher video quality, better microphone, easier editing on-device. Use a phone mount on your bike handlebars or a running armband. The latest iPhones shoot cinematic video that looks professional with zero effort.",
                    },
                    {
                      device: "GoPro / Action Camera",
                      best: "Best for: POV shots, water, rough conditions",
                      detail:
                        "Waterproof, ultra-wide angle, built for motion. Mount on your helmet for bike POV, chest mount for running, or hold it for swim footage. Video quality is slightly lower than phone but the versatility is unmatched.",
                    },
                    {
                      device: "Phone + GoPro Combo",
                      best: "Best for: race day coverage",
                      detail:
                        "Use GoPro for action shots during the actual workout and phone for pre/post workout talking head clips. This gives you the best of both worlds without either device being perfect for everything.",
                    },
                  ].map((d) => (
                    <div
                      key={d.device}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{d.device}</p>
                      <p className="text-xs text-red-400 font-mono mt-1">
                        {d.best}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">{d.detail}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  Phone Mount Tips
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  For bike filming, a handlebar phone mount ($15-25) gives you
                  stable POV footage and lets you record time-lapses of long
                  rides. For running, a magnetic chest mount or asking a friend
                  to film 30 seconds works great. For the gym, a small tripod
                  ($20) propped against a wall captures your sets without
                  needing someone to hold the camera.
                </p>
                <Tip>
                  Batch your filming. Instead of filming every workout, choose
                  2-3 sessions per week to capture content. Film extra footage
                  during those sessions so you have a content bank to pull
                  from during the week. This minimizes disruption to your
                  training.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 3: Editing Workflow ──────── */}
              <div id="editing-workflow" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Editing Workflow<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Editing is where most athlete-creators get stuck. They film
                  great footage then sit on it for weeks because editing feels
                  overwhelming. The fix: develop a system and stick to it.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The Tools
                </h3>
                <div className="space-y-3 my-6">
                  {[
                    {
                      tool: "CapCut (Free)",
                      detail: "The best free editing app for short-form content. Auto-captions, trending templates, effects library. 90% of my Reels are edited in CapCut on my phone.",
                    },
                    {
                      tool: "Adobe Premiere Rush (Free/Paid)",
                      detail: "More powerful than CapCut, syncs across devices. Good if you want to start on your phone and finish on desktop.",
                    },
                    {
                      tool: "Final Cut Pro / Premiere Pro",
                      detail: "Desktop editing for longer-form content or YouTube videos. Overkill for Reels and TikToks but essential if you're doing YouTube.",
                    },
                    {
                      tool: "Canva (Free/Paid)",
                      detail: "Thumbnails, story templates, and static graphics. Not a video editor but essential for the visual brand surrounding your content.",
                    },
                  ].map((t) => (
                    <div
                      key={t.tool}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <p className="text-white font-bold text-sm">{t.tool}</p>
                      <p className="text-sm text-gray-400 mt-1">{t.detail}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The 30-Minute Edit
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A polished 30-60 second Reel should take you no more than
                  30 minutes to edit once you have a system. Here&apos;s the
                  workflow: (1) Select your best 5-8 clips. (2) Drop them on
                  the timeline. (3) Trim to the beat of your audio. (4) Add
                  auto-captions. (5) Add a hook text overlay in the first 2
                  seconds. (6) Export. Done. Don&apos;t over-edit. Authenticity
                  beats production value every time in the athlete space.
                </p>
                <Tip>
                  Create 2-3 &ldquo;template&rdquo; editing styles that you
                  reuse. A training montage template, a race day recap
                  template, and a talking head/advice template. When you sit
                  down to edit, you&apos;re not starting from scratch.
                  You&apos;re plugging new footage into a proven format.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 4: Storytelling ──────────── */}
              <div id="storytelling-frameworks" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Storytelling Frameworks
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Good content is not about fancy editing or expensive gear.
                  It&apos;s about storytelling. Every piece of content you post
                  should follow a structure, even a 15-second Reel.
                </p>
                <h3 className="text-xl font-bold text-white mt-8 mb-4">
                  The 3 Frameworks That Work
                </h3>
                <div className="space-y-4 my-6">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white font-bold mb-2">
                      1. The Hook → Struggle → Triumph
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Open with a bold statement or dramatic moment.
                      Show the hard part: the suffering, the early mornings,
                      the doubt. End with the payoff: the finish line, the
                      PR, the breakthrough. This is the hero&apos;s journey
                      compressed into 30 seconds. Works for race recaps,
                      training montages, and milestone posts.
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white font-bold mb-2">
                      2. The &ldquo;Day in the Life&rdquo;
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Walk your audience through a full training day or race
                      day. 5 AM alarm, breakfast, workout, work, second
                      session, recovery. People love seeing the behind-the-scenes
                      reality. It makes them feel connected to your journey
                      and inspired to start their own.
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white font-bold mb-2">
                      3. The Teach → Show → Inspire
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Share a specific tip or lesson (teach), demonstrate it
                      with footage from your training (show), and connect it
                      to a bigger message (inspire). &ldquo;Here&apos;s how I
                      fuel for long rides&rdquo; + bike footage + &ldquo;small
                      habits compound into big results.&rdquo; Educational
                      content builds authority and gets saved/shared more.
                    </p>
                  </div>
                </div>
                <Tip>
                  The first 1-2 seconds of your video determine whether
                  someone watches or scrolls. Start with your most
                  attention-grabbing moment, a bold text overlay, or a direct
                  question. Never start with a slow fade-in or logo animation.
                  Hook them immediately.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 5: What Performs Well ─────── */}
              <div id="what-performs-well" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  What Performs Well
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/chi-tri-friends.jpg"
                  alt="Athletes and friends at a race"
                  caption="Community Content"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  After posting hundreds of pieces of content across Instagram,
                  TikTok, and YouTube, here&apos;s what consistently
                  outperforms everything else in the athlete niche:
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Race day content",
                      detail:
                        "Nothing beats race day. The emotions, the atmosphere, the finish line. A race day Reel will outperform 10 training montages. Film EVERYTHING on race day: the morning, the start line nerves, the suffering, the finish. You can create weeks of content from one race.",
                    },
                    {
                      num: "02",
                      title: "Raw, emotional moments",
                      detail:
                        "The post-finish-line tears. The 5 AM alarm when you don't want to get up. The moment you question why you're doing this. Vulnerability performs. People are tired of highlight reels. Show the real struggle.",
                    },
                    {
                      num: "03",
                      title: "Training montages with good music",
                      detail:
                        "Clean cuts synced to a trending audio track. Swimming, biking, running. Show the volume. These are your bread and butter weekly posts. Keep them 15-30 seconds.",
                    },
                    {
                      num: "04",
                      title: "Before and after / transformation",
                      detail:
                        "Your first triathlon vs your latest. Month 1 of training vs month 6. People love progress stories. Keep a library of footage from early training for these comparisons.",
                    },
                    {
                      num: "05",
                      title: "Gear reviews and tips",
                      detail:
                        "\"The nutrition that got me through 100 miles.\" \"My entire Ironman gear list.\" Practical, useful content gets saved and shared. It also positions you as a knowledgeable voice in the space.",
                    },
                    {
                      num: "06",
                      title: "Lifestyle integration content",
                      detail:
                        "How you balance training with a job. What you eat in a day. Your morning routine. This broadens your audience beyond just athletes to anyone interested in discipline and optimization.",
                    },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-red-600/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-black text-red-600/40 font-mono flex-shrink-0">
                          {item.num}
                        </span>
                        <div>
                          <p className="text-white font-bold mb-1">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SectionDivider />

              {/* ── Section 6: Reels vs TikTok ──────── */}
              <div id="reels-vs-tiktok" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Instagram Reels vs TikTok
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Both platforms reward short-form video. But they have
                  different algorithms, audiences, and content cultures.
                  Here&apos;s how they compare for athlete-creators:
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Factor
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          Instagram Reels
                        </th>
                        <th className="text-left py-3 px-4 text-red-400 font-mono uppercase tracking-wider text-xs">
                          TikTok
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Discovery</td>
                        <td className="py-3 px-4">Slower growth, loyal followers</td>
                        <td className="py-3 px-4">Faster virality, broader reach</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Audience</td>
                        <td className="py-3 px-4">25-45, fitness-focused, higher income</td>
                        <td className="py-3 px-4">16-35, entertainment-focused, diverse</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Content Style</td>
                        <td className="py-3 px-4">Polished, aspirational, aesthetic</td>
                        <td className="py-3 px-4">Raw, funny, trend-driven, authentic</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-white font-medium">Brand Deals</td>
                        <td className="py-3 px-4">Higher value per follower</td>
                        <td className="py-3 px-4">Higher volume, lower per-deal value</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Best For</td>
                        <td className="py-3 px-4">Building authority, brand partnerships</td>
                        <td className="py-3 px-4">Growing fast, testing content ideas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  My recommendation: post on both, but treat them differently.
                  Use TikTok to test content ideas quickly. What gets views
                  there will likely perform well on Reels too. But invest more
                  polish into your Instagram content since that&apos;s where
                  brands look first and where your long-term community lives.
                </p>
                <Tip>
                  Cross-posting the same video to both platforms works, but
                  remove any TikTok watermarks before posting to Instagram.
                  Instagram&apos;s algorithm deprioritizes videos with TikTok
                  watermarks. Use SnapTik or similar tools to download
                  watermark-free versions.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 7: Best Times to Post ────── */}
              <div id="best-times-to-post" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Best Times to Post<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Timing matters less than content quality, but it&apos;s
                  still a factor. Here&apos;s what I&apos;ve found works best
                  for athletic content:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      time: "6:00-7:30 AM",
                      detail: "Early risers scrolling before work. Athletes check their feed during breakfast. Great for training content and motivational posts.",
                    },
                    {
                      time: "12:00-1:00 PM",
                      detail: "Lunch break scrolling. Good for tips, gear reviews, and educational content that people can save for later.",
                    },
                    {
                      time: "5:00-7:00 PM",
                      detail: "Post-work wind-down. Highest overall engagement window. Good for race recaps, emotional content, and lifestyle posts.",
                    },
                    {
                      time: "Sunday 8:00-10:00 AM",
                      detail: "Weekend warriors checking in. Perfect for long session recaps, week-in-review content, and race announcements.",
                    },
                  ].map((t) => (
                    <div
                      key={t.time}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {t.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{t.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Check your Instagram Insights for when YOUR specific audience
                  is most active. The general windows above are starting
                  points, but your data will tell you the real answer.
                </p>
                <Tip>
                  Consistency beats timing. Posting at the same time every day
                  trains your audience to expect your content. If you post
                  every morning at 6:30 AM, your followers will start looking
                  for you at 6:30 AM. Pick a schedule and stick to it.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 8: Content + Training ─────── */}
              <div id="managing-creation-training" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Content + Training Balance
                  <span className="text-red-500">.</span>
                </h2>
                <SectionImage
                  src="/images/gallery/go-one-more.jpg"
                  alt="Motivational training content"
                  caption="Content That Writes Itself"
                />
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  This is the hardest part. You&apos;re already training 10-15
                  hours a week. Adding content creation on top of that feels
                  impossible. But it doesn&apos;t have to consume hours of
                  your week. Here&apos;s how to keep it sustainable:
                </p>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Capture during, create after.
                    </span>{" "}
                    Don&apos;t think about editing during your workout. Just
                    hit record at key moments. Set up the phone before your
                    set, click record during your run, get 30 seconds of bike
                    footage. Do the creative work later in a batch.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      One content day per week.
                    </span>{" "}
                    Pick one day (I use Sunday evenings) to edit and schedule
                    all your content for the week. Film throughout the week,
                    edit on Sunday, schedule posts for the next 7 days. Total
                    time: 1-2 hours.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Quality over quantity.
                    </span>{" "}
                    Three great posts per week beats seven mediocre ones. The
                    algorithm rewards engagement rate, not post frequency. A
                    viral Reel every few weeks is worth more than daily posts
                    nobody watches.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Not every workout needs to be content.
                    </span>{" "}
                    Some sessions are just for you. No camera, no phone, no
                    documenting. Protect those moments. The content will be
                    better because you had space to actually live the
                    experience.
                  </p>
                </div>
                <Tip>
                  Use voice memos during or after workouts to capture your
                  thoughts while they&apos;re fresh. &ldquo;That tempo run
                  was brutal. Hit a wall at mile 5 but pushed through.&rdquo;
                  These become captions, voiceovers, and content ideas later.
                  Takes 30 seconds and eliminates the
                  &ldquo;what do I post about?&rdquo; problem.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 9: Authentic Brand ────────── */}
              <div id="building-authentic-brand" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Building an Authentic Brand
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Your brand is not a logo or a color palette. It&apos;s the
                  feeling people get when they see your content. For
                  athlete-creators, authenticity IS the brand. Here&apos;s
                  what that means in practice:
                </p>
                <div className="space-y-4 my-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Share the real story, not just the highlight reel.
                    </span>{" "}
                    The 5 AM alarm is more relatable than the finish line
                    photo. The failed workout is more interesting than the PR.
                    People follow you for the journey, including the ugly
                    parts. Show them.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Have a point of view.
                    </span>{" "}
                    What do you believe about training, racing, and life that
                    other people might disagree with? &ldquo;You don&apos;t
                    need a tri bike for your first Ironman.&rdquo;
                    &ldquo;Alcohol has no place in serious training.&rdquo;
                    Opinions create conversation. Conversation creates
                    community.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Be consistent in your voice.
                    </span>{" "}
                    Whether your vibe is motivational, educational, funny, or
                    raw, own it. Don&apos;t try to be someone you&apos;re
                    not. The audience can smell inauthenticity instantly.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-white font-semibold">
                      Engage with your community.
                    </span>{" "}
                    Reply to every comment for the first year. DM people who
                    share your content. Join conversations in your niche.
                    Community is built one interaction at a time.
                  </p>
                </div>
                <Tip>
                  Write down three words that describe the energy you want
                  your content to have. Mine are: relentless, real,
                  resourceful. Every piece of content I post should embody at
                  least one of those words. This simple filter prevents you
                  from posting content that doesn&apos;t fit your brand.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 10: Monetization ──────────── */}
              <div id="monetization" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Monetization Paths<span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Let me be real: don&apos;t start creating content to make
                  money. Start because you want to document and connect. But
                  once you&apos;ve built an engaged audience, there are
                  legitimate monetization paths for athlete-creators:
                </p>
                <div className="space-y-3 my-6">
                  {[
                    {
                      path: "Brand Partnerships",
                      threshold: "1,000+ engaged followers",
                      detail:
                        "Nutrition brands, gear companies, and athletic apparel are actively looking for athlete-creators. Start by tagging brands you use organically. Many will reach out once they see authentic content featuring their products. Rates: $100-500 per post at micro-influencer level.",
                    },
                    {
                      path: "Affiliate Marketing",
                      threshold: "Any audience size",
                      detail:
                        "Share affiliate links for gear, nutrition, and training tools you actually use. Amazon Associates, brand-specific affiliate programs, and platforms like LTK. Small per-sale commissions that add up. Be transparent. Always disclose affiliates.",
                    },
                    {
                      path: "Coaching / Training Plans",
                      threshold: "Established credibility",
                      detail:
                        "Once you've proven results and built trust, offering coaching or custom training plans is a natural extension. Start with free advice content, then offer paid deep-dives.",
                    },
                    {
                      path: "Your Own Products",
                      threshold: "Dedicated audience",
                      detail:
                        "Build something for your audience. I built InstaCal. You could create a training journal, a nutrition guide, merchandise, or a course. Your audience already trusts you, so give them something valuable to buy.",
                    },
                    {
                      path: "Race/Event Partnerships",
                      threshold: "Local influence",
                      detail:
                        "Race directors offer free entries, VIP access, and sometimes payment for athlete-creators who will cover their events. Great for getting free races and building event content.",
                    },
                  ].map((m) => (
                    <div
                      key={m.path}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-red-400">
                          {m.path}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {m.threshold}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{m.detail}</p>
                    </div>
                  ))}
                </div>
                <Tip>
                  Never promote something you wouldn&apos;t use yourself. Your
                  audience&apos;s trust is worth infinitely more than any
                  single brand deal. One inauthentic promotion can undo months
                  of community building. Be selective. Say no to deals that
                  don&apos;t align with your values.
                </Tip>
              </div>

              <SectionDivider />

              {/* ── Section 11: Dylan's Workflow ──────── */}
              <div id="dylans-workflow" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                  Dylan&apos;s Content Workflow
                  <span className="text-red-500">.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Here&apos;s exactly how I manage content creation alongside
                  Ironman training and a full-time software job. This is the
                  system, not the theory.
                </p>
                <div className="space-y-4 my-6">
                  {[
                    {
                      num: "01",
                      title: "Film 2-3 workouts per week",
                      detail:
                        "Monday swim, Wednesday run, Saturday long ride. I set my phone up before the session and hit record at key moments. Total filming time: maybe 5 minutes of actual recording per workout.",
                    },
                    {
                      num: "02",
                      title: "Voice memo after every workout",
                      detail:
                        "30-60 seconds of stream of consciousness. How I feel, what happened, any insights. These become captions and voiceovers. I have hundreds of these in my Notes app.",
                    },
                    {
                      num: "03",
                      title: "Sunday evening edit session (1.5 hours)",
                      detail:
                        "I batch-edit 3-4 Reels/TikToks for the week. CapCut on my phone, trending audio, auto-captions. I schedule them using Instagram's built-in scheduler and TikTok's post scheduler.",
                    },
                    {
                      num: "04",
                      title: "Post schedule: Mon/Wed/Fri + Stories daily",
                      detail:
                        "Three Reels per week is my baseline. Stories are low-effort daily updates: a training screenshot, a meal photo, a quick thought. Stories take 30 seconds each.",
                    },
                    {
                      num: "05",
                      title: "Engage for 10 minutes after posting",
                      detail:
                        "Reply to every comment within the first hour. Check DMs. Like and comment on 5-10 posts from people in my niche. This boosts algorithmic distribution and builds real relationships.",
                    },
                    {
                      num: "06",
                      title: "Race days = content gold mines",
                      detail:
                        "I film everything on race day. Give my GoPro to friends at different points on the course. Set up a tripod at the finish. One race produces 2-3 weeks of content. The race recap Reel alone is usually my highest-performing post of the month.",
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
                  Total weekly time spent on content: about 3-4 hours
                  including filming, editing, posting, and engaging. That&apos;s
                  it. It&apos;s manageable alongside training and a full-time
                  job because I have a system. Build your system and content
                  stops being a burden and becomes a natural extension of what
                  you&apos;re already doing.
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
                    Now Go Create
                    <span className="text-red-500">.</span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    If this guide helped you, share it with an athlete who&apos;s
                    been thinking about starting content. Follow along as I
                    document the road to Ironman Lake Placid 2026.
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
                      Built by an Athlete-Creator
                    </p>
                    <p className="text-white font-bold mb-2">
                      Download InstaCal
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      The AI-powered calorie tracker I built while training
                      for Ironman and creating content. Proof that the
                      athlete-creator path works.
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
