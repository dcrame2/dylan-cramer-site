"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    handle: "@cramerdyl",
    url: "https://www.instagram.com/cramerdyl/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@dylcramer",
    url: "https://www.tiktok.com/@dylcramer",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@dylcramer",
    url: "https://www.youtube.com/@dylcramer",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const links = [
  {
    label: "Free Training Guides",
    sub: "Ironman, ultras, nutrition — no email wall",
    href: "/resources",
    external: false,
  },
  {
    label: "My Story",
    sub: "Software dev turned Ironman & 100-miler",
    href: "/about",
    external: false,
  },
  {
    label: "Race Photo Gallery",
    sub: "Alcatraz, Ironman, Tunnel Hill 100 & more",
    href: "/gallery",
    external: false,
  },
  {
    label: "Brand Inquiries",
    sub: "dcrame2@gmail.com",
    href: "mailto:dcrame2@gmail.com",
    external: true,
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-black grain-overlay relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-0 right-0 h-[420px] overflow-hidden">
        <Image
          src="/images/gallery/ironman-final.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={50}
          className="object-cover object-[50%_20%] opacity-30 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-14 flex flex-col items-center">
        {/* Avatar + identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative w-28 h-28 mx-auto mb-4">
            <Image
              src="/images/gallery/703-peace-sign.jpg"
              alt="Dylan Cramer"
              fill
              sizes="112px"
              className="object-cover object-[50%_15%] rounded-full border-2 border-red-600"
            />
            <div className="absolute inset-0 rounded-full red-glow pointer-events-none" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            <span className="text-red-500">Dylan</span> Cramer
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mt-2">
            Ironman &middot; Ultrarunner &middot; App Founder
          </p>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Do hard things. Have fun. Training for Ironman California 2026 and
            documenting all of it.
          </p>
        </motion.div>

        {/* Socials row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-3 mt-6"
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} ${social.handle}`}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-red-500 hover:border-red-600/60 hover:bg-red-600/10 transition-all"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Primary CTA: the app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full mt-8"
        >
          <a
            href="/app"
            className="group flex items-center gap-4 w-full p-4 bg-red-600 hover:bg-red-500 rounded-2xl transition-all animate-pulse-red"
          >
            <Image
              src="/images/app/instacal-icon.png"
              alt="InstaCal"
              width={44}
              height={44}
              className="rounded-xl"
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-black uppercase tracking-wider text-white">
                Download InstaCal
              </p>
              <p className="text-xs text-red-100/80">
                My AI calorie tracker — free on iOS &amp; Android
              </p>
            </div>
            <svg
              className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Link cards */}
        <div className="w-full mt-4 space-y-3">
          {links.map((link, i) => {
            const inner = (
              <>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-white">{link.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.sub}</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </>
            );
            const cls =
              "group flex items-center gap-4 w-full p-4 bg-white/5 border border-white/10 hover:border-red-600/50 hover:bg-red-600/5 rounded-2xl transition-all";
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                {link.external ? (
                  <a href={link.href} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={link.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Full site link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors font-mono"
          >
            dylancramer.com &rarr;
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
