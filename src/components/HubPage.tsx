"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HubHero from "@/components/HubHero";
import HubLife from "@/components/HubLife";
import InstaCal from "@/components/InstaCal";
import SocialCards from "@/components/SocialCards";
import HubResources from "@/components/HubResources";
import HubNewsletter from "@/components/HubNewsletter";

function FollowAlong() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Follow Along
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Where the <span className="text-red-500">Real Stuff Lives.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl leading-relaxed">
            Ironman finisher · 100-mile ultrarunner · app founder. The day-to-day
            grind plays out across all three platforms — pick your poison.
          </p>
        </motion.div>

        <SocialCards animated inView={isInView} delay={0.2} />
      </div>
    </section>
  );
}

export default function HubPage() {
  return (
    <>
      <HubHero />
      <HubLife />
      <InstaCal />
      <FollowAlong />
      <HubResources />
      <HubNewsletter />
    </>
  );
}
