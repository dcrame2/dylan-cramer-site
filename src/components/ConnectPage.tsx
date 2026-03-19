"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import SocialCards from "./SocialCards";

const socials = [
  {
    name: "Instagram",
    handle: "@cramerdyl",
    url: "https://www.instagram.com/cramerdyl/",
    description: "Behind the scenes, race day content, and daily life in Chicago.",
    color: "from-pink-600 to-purple-600",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@dylcramer",
    url: "https://www.tiktok.com/@dylcramer",
    description: "Short-form content on training, tech, and building in public.",
    color: "from-cyan-400 to-pink-500",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@dylcramer",
    url: "https://www.youtube.com/@dylcramer",
    description: "Long-form vlogs, race recaps, and deep dives on building apps.",
    color: "from-red-600 to-red-800",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const workItems = [
  {
    title: "Brand Partnerships",
    description:
      "Authentic partnerships with brands aligned with endurance, fitness, tech, and lifestyle. I create content that resonates.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Collaborations",
    description:
      "Open to co-creating content, joint projects, and creative collaborations with other creators and athletes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Website Builds",
    description:
      "Need a website? I build modern, fast websites for creators and small businesses. $500 build + $99/mo maintenance.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "What's the best way to reach you?",
    answer:
      "DM me on Instagram @cramerdyl — that's where I'm most active and respond fastest. For brand deals and formal inquiries, email dcrame2@gmail.com.",
  },
  {
    question: "Are you open to brand collaborations?",
    answer:
      "Absolutely. I work with brands in fitness, endurance sports, tech, and lifestyle. I only partner with brands I genuinely believe in and use myself.",
  },
  {
    question: "Can I be on your podcast / have you on mine?",
    answer:
      "I'm always down for good conversations. Send me a DM with details about your show and what you'd like to discuss.",
  },
  {
    question: "Do you do coaching or consulting?",
    answer:
      "Not currently offering formal coaching, but I share everything I learn about training, building, and creating through my content.",
  },
  {
    question: "What is InstaCal?",
    answer:
      "InstaCal is my AI-powered calorie tracker with social features. Snap a photo to track macros, chat with an AI dietitian, and share meals with friends. Free on iOS and Android at theinstacal.app.",
  },
];

export default function ConnectPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const emailInView = useInView(emailRef, { once: true, margin: "-100px" });
  const socialInView = useInView(socialRef, { once: true, margin: "-100px" });
  const workInView = useInView(workRef, { once: true, margin: "-100px" });
  const updateInView = useInView(updateRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-28 overflow-hidden">
      {/* Background floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-red-600/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-[60%] right-[5%] w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-[30%] w-64 h-64 bg-red-600/6 rounded-full blur-3xl animate-float" />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/ironman-arch.jpg"
            alt="Ironman finish arch at night"
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
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-6"
          >
            <span className="text-white">Let&apos;s</span>
            <br />
            <span className="text-red-500 red-glow-text">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-xl"
          >
            Whether you want to follow the journey, work together, or just say
            what&apos;s up &mdash; I&apos;m here for it.
          </motion.p>
        </div>
      </section>

      {/* Red accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* ===== EMAIL SIGNUP SECTION ===== */}
      <section ref={emailRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={emailInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Stay in the Loop
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Join the <span className="text-red-500">Crew</span>
            </h2>
            <p className="text-gray-400 mb-10">
              Exclusive content, training updates, app launches, and more.
              No spam &mdash; just real updates from the journey.
            </p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={emailInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              onSubmit={(e) => {
                e.preventDefault();
                // Future: integrate with email service (ConvertKit, Mailchimp, etc.)
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 bg-white/5 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors rounded-xl"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-500 transition-all hover:scale-105 active:scale-95 whitespace-nowrap rounded-xl"
              >
                Join the Crew
              </button>
            </motion.form>
            <p className="text-[10px] text-gray-600 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Red accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* ===== SOCIAL PLATFORMS SECTION ===== */}
      <section ref={socialRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Follow Along
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Find Me <span className="text-red-500">Everywhere</span>
            </h2>
          </motion.div>

          <SocialCards inView={socialInView} delay={0.2} />
        </div>
      </section>

      {/* Red accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* ===== WORK WITH ME SECTION ===== */}
      <section ref={workRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Opportunities
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Work <span className="text-red-500">With Me</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {workItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 100 }}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 hover:border-red-600/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/10 text-red-500 mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={workInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-600 mt-10"
          >
            Interested? DM me on{" "}
            <a
              href="https://www.instagram.com/cramerdyl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors font-mono"
            >
              @cramerdyl
            </a>{" "}
            or reach out on any platform.
          </motion.p>
        </div>
      </section>

      {/* Red accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* ===== WHAT I'M UP TO SECTION ===== */}
      <section ref={updateRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={updateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Current Status
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              What I&apos;m <span className="text-red-500">Up To</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={updateInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 hover:border-red-600/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-red" />
                <span className="text-xs uppercase tracking-wider text-red-500 font-mono font-bold">
                  Training
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-3">
                Ironman Lake Placid
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Training for Ironman Lake Placid in July 2026. Following the
                journey means swim/bike/run content, race prep updates, and the
                grind of balancing training with building.
              </p>
              <p className="text-xs font-mono text-gray-600">
                2.4mi swim &bull; 112mi bike &bull; 26.2mi run
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={updateInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, type: "spring", stiffness: 100 }}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 hover:border-red-600/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-red" />
                <span className="text-xs uppercase tracking-wider text-red-500 font-mono font-bold">
                  Building
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-3">
                InstaCal
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Building InstaCal &mdash; the visual content calendar for
                Instagram creators. Planning, scheduling, and optimizing your
                feed has never been easier.
              </p>
              <a
                href="https://theinstacal.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors font-mono"
              >
                theinstacal.app
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* ===== FAQ SECTION ===== */}
      <section ref={faqRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              Quick Answers
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Frequently <span className="text-red-500">Asked</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-sm md:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 text-xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacer before footer */}
      <div className="pb-8" />
    </div>
  );
}
