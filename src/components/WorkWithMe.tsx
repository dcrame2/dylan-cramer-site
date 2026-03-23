"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Brand Partnerships",
    description:
      "Authentic content creation for brands in fitness, endurance sports, tech, and lifestyle. I create reels, TikToks, and stories that actually convert because my audience trusts me.",
    features: [
      "Instagram Reels & Stories",
      "TikTok content",
      "YouTube integrations",
      "Authentic product reviews",
    ],
    cta: "Let's Talk",
    href: "mailto:dcrame2@gmail.com?subject=Brand%20Partnership%20Inquiry",
    highlight: true,
  },
  {
    title: "Website & App Build",
    description:
      "Need a website, web app, or mobile app? I build fast, modern digital products for creators, athletes, and small businesses. Clean design, mobile-first, built to convert.",
    features: [
      "Custom design & development",
      "Mobile responsive",
      "SEO optimized",
      "Deployed & ready to go",
    ],
    price: "$500",
    priceLabel: "one-time build",
    cta: "Get Started",
    href: "mailto:dcrame2@gmail.com?subject=Website%20Build%20Inquiry",
    highlight: false,
  },
  {
    title: "App & Website Maintenance",
    description:
      "Already have a site? I'll keep it updated, running fast, and looking fresh. Content updates, bug fixes, and ongoing improvements so you can focus on your thing.",
    features: [
      "Monthly content updates",
      "Performance monitoring",
      "Bug fixes & support",
      "Design tweaks as needed",
    ],
    price: "$99",
    priceLabel: "/ month",
    cta: "Learn More",
    href: "mailto:dcrame2@gmail.com?subject=Website%20Maintenance%20Inquiry",
    highlight: false,
  },
];

export default function WorkWithMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Services
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Work With
            <br />
            <span className="text-red-500">Me.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Looking for authentic content for your brand? Need a website or app built?
            I got you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col ${
                service.highlight
                  ? "bg-red-600/10 border-red-600/40 hover:border-red-500"
                  : "bg-white/5 border-white/10 hover:border-red-600/40"
              }`}
            >
              {service.highlight && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />
              )}

              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>

              {service.price && (
                <div className="mb-3">
                  <span className="text-3xl font-black text-red-500">{service.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{service.priceLabel}</span>
                </div>
              )}

              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={service.href}
                className={`block text-center px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-xl transition-all ${
                  service.highlight
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "border border-white/20 text-white hover:border-red-500 hover:text-red-500"
                }`}
              >
                {service.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
