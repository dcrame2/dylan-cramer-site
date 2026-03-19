"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  { icon: "📸", title: "Snap to Track", desc: "Take a photo of your meal and let AI handle the rest" },
  { icon: "🤖", title: "AI Dietitian", desc: "Chat with your personal AI nutrition coach" },
  { icon: "👥", title: "Social Feed", desc: "See what your friends are eating and stay motivated" },
  { icon: "🗺️", title: "Meal Map", desc: "Discover healthy food spots near you" },
];

export default function InstaCal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="instacal" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="phone-mockup relative w-[280px] md:w-[320px] overflow-hidden animate-float-slow">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-10" />
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem]">
                  <Image
                    src="/images/app/instacal-home.jpg"
                    alt="InstaCal app home screen"
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse-red"
              >
                Free on iOS & Android
              </motion.div>

              {/* Red glow behind phone */}
              <div className="absolute inset-0 -z-10 bg-red-600/20 blur-3xl rounded-full scale-150 pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/app/instacal-icon.png"
                alt="InstaCal icon"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-500 font-mono">
                  My App
                </p>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                  InstaCal
                </h2>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-2 font-semibold">
              Health Tracking Meets Social.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I built InstaCal because I needed a calorie tracker that actually fits
              how I live. Snap a photo to track your macros, share meals with friends,
              discover food on a map, and chat with an AI dietitian. It&apos;s the
              nutrition app I always wanted — now it&apos;s yours too.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="p-4 bg-white/5 border border-white/10 hover:border-red-600/40 transition-colors rounded-2xl"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="text-sm font-bold text-white">{feature.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-4 relative z-10">
              <a
                href="https://apps.apple.com/us/app/instacal/id6743951306"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all rounded-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all rounded-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z" />
                </svg>
                Google Play
              </a>
            </div>

            <a
              href="https://theinstacal.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs text-red-500 hover:text-red-400 uppercase tracking-widest font-mono transition-colors"
            >
              theinstacal.app &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
