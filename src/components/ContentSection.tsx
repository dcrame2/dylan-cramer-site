"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SocialCards from "./SocialCards";

const contentPillars = [
  { label: "Ironman Training", percentage: 35 },
  { label: "Ultra Running", percentage: 25 },
  { label: "App Building", percentage: 20 },
  { label: "Lifestyle & Vibes", percentage: 20 },
];

export default function ContentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="content" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Follow Along
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            The Content.
            <br />
            <span className="text-red-500">Real & Raw.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            No scripts, no faking it. I film the 4am swims, the suffering at mile 80,
            the app launches, and everything in between. This is real life documented.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="mb-20">
          <SocialCards inView={isInView} delay={0.2} />
        </div>

        {/* Content pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-mono mb-6">
            What I Create
          </p>
          <div className="space-y-4">
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    {pillar.label}
                  </span>
                  <span className="text-xs font-mono text-red-500">{pillar.percentage}%</span>
                </div>
                <div className="h-1 bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${pillar.percentage}%` } : {}}
                    transition={{ delay: 1.2 + i * 0.15, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Latest Content — Instagram & TikTok Embeds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-mono mb-6">
            Latest Content
          </p>
          <div className="scroll-gallery overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory">
            {[
              { type: "instagram", url: "https://www.instagram.com/p/DWE-O9miVsM/" },
              { type: "tiktok", id: "7574802270446030135" },
              { type: "instagram", url: "https://www.instagram.com/p/DV_iwkNRJ9q/" },
              { type: "instagram", url: "https://www.instagram.com/p/DQ4Wd8IiDQB/" },
              { type: "tiktok", id: "7575165481644985613" },
              { type: "instagram", url: "https://www.instagram.com/p/DVosetukSIR/" },
              { type: "instagram", url: "https://www.instagram.com/p/DVeVkGAEfkz/" },
              { type: "tiktok", id: "7596418914360331534" },
              { type: "instagram", url: "https://www.instagram.com/p/DTf0KIwkbto/" },
              { type: "instagram", url: "https://www.instagram.com/p/DVhrg8Jkdgt/" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] snap-start rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                {item.type === "instagram" ? (
                  <iframe
                    src={`${item.url}embed`}
                    className="w-full h-[560px] border-0"
                    allowTransparency
                    allow="encrypted-media"
                    loading="lazy"
                    title={`Instagram post ${i + 1}`}
                  />
                ) : (
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${item.id}`}
                    className="w-full h-[560px] border-0"
                    allow="encrypted-media"
                    loading="lazy"
                    title={`TikTok video ${i + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/content"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-500 transition-all rounded-xl"
            >
              See All Content
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:dcrame2@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:border-red-500 hover:text-red-500 transition-all rounded-xl"
            >
              Brand Inquiries
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
