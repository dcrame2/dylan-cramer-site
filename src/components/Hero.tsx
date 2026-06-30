'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Ironman California, October 18, 2026 (Sacramento)
  const ironmanDate = useRef(new Date('2026-10-18T07:00:00'));
  const countdown = useCountdown(ironmanDate.current);

  const roles = [
    'IRONMAN FINISHER',
    '100-MILE ULTRARUNNER',
    'SOFTWARE DEVELOPER',
    'CONTENT CREATOR',
    'APP FOUNDER',
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      ref={ref}
      className='relative h-screen flex items-center overflow-hidden grain-overlay'
    >
      {/* Background image, on mobile, image is wider than viewport and shifted right so Dylan is visible */}
      <div className='absolute top-0 bottom-0 left-0 z-0 md:right-0 right-[-70%] md:w-full'>
        <Image
          src='/images/gallery/ironman-final.jpg'
          alt='Dylan Cramer finishing Ironman'
          fill
          className='object-cover object-[50%_25%] md:object-[70%_25%]'
          priority
          quality={75}
          sizes='200vw'
        />
      </div>

      {/* Overlays, heavier on the left for text readability, lighter on the right to show face */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-[1]' />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-[1]' />
      <div className='absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-transparent z-[1]' />

      {/* Floating red orbs */}

      {/* Main content, left aligned, same container as navbar */}
      <motion.div
        style={{ opacity }}
        className='relative z-10 text-left px-6 w-full max-w-7xl mx-auto'
      >
        <div className='max-w-2xl'>
          {/* Countdown to Ironman */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-8'
          >
            <p className='text-xs uppercase tracking-[0.3em] text-red-400 mb-3 font-mono'>
              Ironman California 2026
            </p>
            <div className='flex gap-3'>
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hrs' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Sec' },
              ].map((item) => (
                <div
                  key={item.label}
                  className='text-center bg-black/40 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-xl border border-white/10'
                >
                  <div className='text-2xl md:text-4xl font-black countdown-digit font-mono'>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className='text-[9px] uppercase tracking-widest text-gray-500 mt-1'>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main headline, DYLAN CRAMER */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className='text-6xl md:text-8xl lg:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter mb-4'
          >
            <span className='text-red-500 red-glow-text'>DYLAN</span>
            <br />
            <span className='text-white'>CRAMER</span>
          </motion.h1>

          {/* Rotating subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='h-7 mb-2 overflow-hidden'
          >
            <motion.p
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='text-sm md:text-base uppercase tracking-[0.3em] text-red-400 font-mono'
            >
              {roles[roleIndex]}
            </motion.p>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className='text-sm md:text-base text-gray-400 mb-8 max-w-md leading-relaxed'
          >
            Software dev by day, Ironman &amp; ultrarunner by night. Building apps, chasing finish lines, and having way too much fun doing hard things.
          </motion.p>

          {/* Quick-link funnels */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className='flex flex-col gap-2.5 max-w-xl'
          >
            {(() => {
              const els = [
              { label: 'My App', href: '#instacal', primary: true, external: false, icon: null },
              { label: 'Free Guides', href: '#playbook', primary: false, external: false, icon: null },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/cramerdyl/',
                primary: false,
                external: true,
                icon: (
                  <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/></svg>
                ),
              },
              {
                label: 'TikTok',
                href: 'https://www.tiktok.com/@dylcramer',
                primary: false,
                external: true,
                icon: (
                  <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'><path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.44 4.84 4.84 0 01-1.99-1.39V6.69h3.98z'/></svg>
                ),
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@dylcramer',
                primary: false,
                external: true,
                icon: (
                  <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'><path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg>
                ),
              },
            ].map((link) => {
              const cls = `group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                link.primary
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-black/30 backdrop-blur-sm border border-white/10 text-gray-300 hover:border-red-500 hover:text-red-500'
              }`;
              const arrow = (
                <svg className='w-3 h-3 transition-transform group-hover:translate-x-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              );
              const content = (
                <>
                  {link.icon}
                  {link.label}
                  {!link.icon && arrow}
                </>
              );
              return link.external ? (
                <a key={link.label} href={link.href} target='_blank' rel='noopener noreferrer' className={cls}>
                  {content}
                </a>
              ) : (
                <a key={link.label} href={link.href} className={cls}>
                  {content}
                </a>
              );
            });
              return (
                <>
                  <div className='flex flex-wrap gap-2.5'>{els.slice(0, 2)}</div>
                  <div className='flex flex-wrap gap-2.5'>{els.slice(2)}</div>
                </>
              );
            })()}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2'
        >
          <motion.div className='w-1 h-2 bg-red-500 rounded-full' />
        </motion.div>
      </motion.div>
    </section>
  );
}
