"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/instacal", label: "InstaCal" },
  { href: "/services/portfolio", label: "Portfolio" },
  { href: "/resources", label: "Resources" },
  { href: "/connect", label: "Connect" },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo + tagline */}
          <div>
            <p className="text-xl font-black tracking-tight">
              <span className="text-red-500">DYLAN</span>{" "}
              <span className="text-white">CRAMER</span>
            </p>
            <p className="text-xs text-gray-600 mt-1 font-mono">
              Ironman. Ultrarunner. Developer. Creator.
            </p>
            {/* InstaCal plug */}
            <a
              href="https://theinstacal.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors mt-4"
            >
              <Image
                src="/images/app/instacal-icon.png"
                alt="InstaCal"
                width={20}
                height={20}
                className="rounded-md"
              />
              <span className="text-xs font-mono uppercase tracking-wider">
                Download InstaCal
              </span>
            </a>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-mono mb-4">
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-2">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-mono mb-4">
              Follow
            </p>
            <div className="flex flex-col gap-3">
              {[
                { url: "https://www.instagram.com/cramerdyl/", label: "Instagram", handle: "@cramerdyl", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { url: "https://www.tiktok.com/@dylcramer", label: "TikTok", handle: "@dylcramer", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z"/></svg> },
                { url: "https://www.youtube.com/@dylcramer", label: "YouTube", handle: "@dylcramer", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="text-sm">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs text-gray-700 font-mono"
          >
            &copy; {new Date().getFullYear()} Dylan Cramer.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
