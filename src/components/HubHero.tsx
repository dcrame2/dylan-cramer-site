"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/cramerdyl/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@dylcramer",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@dylcramer",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const arrowIcon = (
  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Link-in-bio style quick actions. `primary` buttons use red fill; others use the
// white-border → red-hover convention from the rest of the site.
const quickActions = [
  { label: "Join the Newsletter", href: "#join", primary: true, external: false },
  { label: "Try My App InstaCal", href: "#instacal", primary: false, external: false },
  { label: "Free Training Guides", href: "/resources", primary: false, external: false },
  {
    label: "Follow on Instagram",
    href: "https://www.instagram.com/cramerdyl/",
    primary: false,
    external: true,
  },
];

export default function HubHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Ambient red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-red-600/50 red-glow"
        >
          <Image
            src="/images/gallery/ironman-finish.jpg"
            alt="Dylan Cramer"
            fill
            sizes="160px"
            quality={80}
            priority
            className="object-cover object-[50%_25%]"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-3xl md:text-5xl font-black uppercase tracking-tight"
        >
          <span className="text-red-500">Dylan</span>{" "}
          <span className="text-white">Cramer</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-3 text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 font-mono"
        >
          Ironman · Ultrarunner · Builder · Creator
        </motion.p>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="mt-4 text-gray-400 max-w-md leading-relaxed"
        >
          Chasing finish lines, building apps, and documenting the whole messy,
          relentless thing. Pull up a chair — here&apos;s my world.
        </motion.p>

        {/* Social icon row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 flex items-center gap-4"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Quick-action button stack (link-in-bio) */}
        <div className="mt-10 w-full flex flex-col gap-3">
          {quickActions.map((action, i) => {
            const classes = `group flex items-center justify-between gap-3 w-full px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${
              action.primary
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-white/5 border border-white/10 text-white hover:border-red-500 hover:text-red-500"
            }`;

            const inner = (
              <>
                <span>{action.label}</span>
                {arrowIcon}
              </>
            );

            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              >
                {action.external ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>
                    {inner}
                  </a>
                ) : (
                  <Link href={action.href} className={classes}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
