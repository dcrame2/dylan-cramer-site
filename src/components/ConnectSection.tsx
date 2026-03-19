"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ConnectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="connect" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Join the Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Stay in
            <br />
            <span className="text-red-500">The Loop.</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-12">
            Get exclusive content, training updates, and early access to everything I&apos;m
            building. Drop your email and join the crew.
          </p>

          {/* Email capture form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto mb-16"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Future: integrate with email service (ConvertKit, Mailchimp, etc.)
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors rounded-xl"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-500 transition-colors whitespace-nowrap rounded-xl"
              >
                Join the Crew
              </button>
            </form>
            <p className="text-[10px] text-gray-600 mt-2">
              No spam. Just real updates from the journey.
            </p>
          </motion.div>

          {/* Big social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              {
                name: "Instagram",
                handle: "@cramerdyl",
                url: "https://www.instagram.com/cramerdyl/",
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
              },
              {
                name: "TikTok",
                handle: "@dylcramer",
                url: "https://www.tiktok.com/@dylcramer",
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z"/></svg>,
              },
              {
                name: "YouTube",
                handle: "@dylcramer",
                url: "https://www.youtube.com/@dylcramer",
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
              },
            ].map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 hover:border-red-600/60 hover:bg-red-600/10 transition-all rounded-2xl"
              >
                <span className="text-gray-400 group-hover:text-red-500 transition-colors">
                  {social.icon}
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{social.name}</p>
                  <p className="text-xs font-mono text-gray-500">{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
