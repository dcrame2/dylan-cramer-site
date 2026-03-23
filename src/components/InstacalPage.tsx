'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const features = [
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z'
        />
      </svg>
    ),
    title: 'Snap to Track',
    desc: 'Take a photo of any meal and our AI instantly breaks down calories, protein, carbs, and fats. No manual entry needed.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z'
        />
      </svg>
    ),
    title: 'AI Dietitian',
    desc: 'Chat with your personal AI nutrition coach. Get meal suggestions, answer diet questions, and build better habits.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
        />
      </svg>
    ),
    title: 'Social Feed',
    desc: 'See what your friends are eating, share your meals, and stay motivated together. Health is better with community.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
        />
      </svg>
    ),
    title: 'Meal Map',
    desc: 'Discover healthy food spots near you on an interactive map. See what others ate and how they rated it.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
        />
      </svg>
    ),
    title: '6 Ways to Log',
    desc: 'Photo scan, barcode scan, text search, voice, quick add, or AI chat. However you want to log, we have you covered.',
  },
  {
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
        />
      </svg>
    ),
    title: 'Workout Tracking',
    desc: 'Log workouts alongside your nutrition. See how your training and eating work together to fuel your goals.',
  },
];

const macroData = [
  { label: 'Protein', value: 82, max: 150, color: 'bg-red-500' },
  { label: 'Carbs', value: 120, max: 200, color: 'bg-red-600' },
  { label: 'Fat', value: 45, max: 65, color: 'bg-red-700' },
  { label: 'Calories', value: 1340, max: 2200, color: 'bg-red-500' },
];

export default function InstacalPage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: '-100px',
  });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  return (
    <div className='relative overflow-hidden'>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className='relative min-h-screen flex items-center pt-24 pb-20 px-6'>
        {/* Background effects */}
        <div className='absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black' />
        <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/8 rounded-full blur-[120px]' />
        <div className='absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

        <div className='max-w-7xl mx-auto w-full relative z-10'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className='mb-6'>
                <Image
                  src='/images/app/instacal-icon.png'
                  alt='InstaCal icon'
                  width={64}
                  height={64}
                  sizes='64px'
                  className='rounded-2xl'
                />
              </div>

              <h1 className='text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4'>
                <span className='text-white'>Health Tracking</span>
                <br />
                <span className='text-red-500 red-glow-text'>Meets Social</span>
              </h1>

              <p className='text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed'>
                InstaCal is the nutrition tracker with a social feed. Track your
                macros with AI, discover what your friends are eating, and share
                your meals. It&apos;s fitness meets social. The way tracking
                should be.
              </p>

              {/* App store buttons */}
              <div className='flex flex-wrap gap-4 mb-6'>
                <a
                  href='https://apps.apple.com/us/app/instacal/id6743951306'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 rounded-xl animate-pulse-red'
                >
                  <svg
                    className='w-7 h-7'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                  </svg>
                  App Store
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-xl'
                >
                  <svg
                    className='w-7 h-7'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z' />
                  </svg>
                  Google Play
                </a>
              </div>

              <p className='text-sm text-gray-600 font-mono'>
                Free forever. No credit card required.
              </p>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className='relative flex justify-center'
            >
              <div className='relative'>
                {/* Phone frame */}
                <div className='phone-mockup relative w-[280px] md:w-[320px] overflow-hidden animate-float-slow'>
                  {/* Notch */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-10' />
                  <div className='relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem]'>
                    <Image
                      src='/images/app/instacal-home.jpg'
                      alt='InstaCal app home screen showing calorie tracking dashboard'
                      fill
                      sizes='320px'
                      priority
                      className='object-cover'
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className='absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse-red'
                >
                  Free on iOS &amp; Android
                </motion.div>

                {/* Floating macro card */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className='absolute -left-8 md:-left-16 top-1/3 bg-black/90 border border-red-600/30 backdrop-blur-xl rounded-2xl p-4 shadow-2xl'
                >
                  <p className='text-xs text-gray-400 font-mono mb-2'>
                    Today&apos;s Macros
                  </p>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-500 w-8'>P</span>
                      <div className='w-20 h-1.5 bg-white/10 rounded-full overflow-hidden'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '55%' }}
                          transition={{ delay: 1.5, duration: 1 }}
                          className='h-full bg-red-500 rounded-full'
                        />
                      </div>
                      <span className='text-xs text-white font-mono'>82g</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-500 w-8'>C</span>
                      <div className='w-20 h-1.5 bg-white/10 rounded-full overflow-hidden'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ delay: 1.6, duration: 1 }}
                          className='h-full bg-red-600 rounded-full'
                        />
                      </div>
                      <span className='text-xs text-white font-mono'>120g</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-500 w-8'>F</span>
                      <div className='w-20 h-1.5 bg-white/10 rounded-full overflow-hidden'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '69%' }}
                          transition={{ delay: 1.7, duration: 1 }}
                          className='h-full bg-red-700 rounded-full'
                        />
                      </div>
                      <span className='text-xs text-white font-mono'>45g</span>
                    </div>
                  </div>
                </motion.div>

                {/* Red glow behind phone */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section ref={featuresRef} className='relative py-32 px-6'>
        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <p className='text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-4'>
              Track, Share, Discover
            </p>
            <h2 className='text-4xl md:text-6xl font-black uppercase tracking-tight'>
              Nutrition Goes <span className='text-red-500'>Social</span>
            </h2>
            <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>
              Six ways to log food, an AI dietitian in your pocket, and a social
              feed to keep you accountable. InstaCal is the last nutrition app
              you&apos;ll ever need.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className='group relative p-8 bg-white/[0.03] border border-white/10 hover:border-red-600/40 transition-all duration-500 rounded-2xl overflow-hidden'
              >
                {/* Hover glow */}
                <div className='absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-transparent transition-all duration-500' />

                <div className='relative z-10'>
                  <div className='text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300'>
                    {feature.icon}
                  </div>
                  <h3 className='text-lg font-bold text-white mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-gray-500 leading-relaxed'>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

      {/* ============================================ */}
      {/* ANIMATED PROGRESS BARS / STATS */}
      {/* ============================================ */}
      <section className='relative py-24 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-4'>
                Real-Time Tracking
              </p>
              <h2 className='text-3xl md:text-5xl font-black uppercase tracking-tight mb-6'>
                Watch Your <span className='text-red-500'>Progress</span>
              </h2>
              <p className='text-gray-400 leading-relaxed mb-8'>
                Every meal you log updates your daily macros in real time.
                Beautiful, animated progress graphs show exactly where you
                stand, so you always know how much room you have left.
              </p>
              <a
                href='https://theinstacal.app'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 uppercase tracking-widest font-mono transition-colors'
              >
                Learn more at theinstacal.app
                <svg
                  className='w-4 h-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                  />
                </svg>
              </a>
            </div>

            <div className='bg-white/[0.03] border border-white/10 rounded-2xl p-8'>
              <p className='text-sm text-gray-400 font-mono mb-6'>
                Daily Dashboard
              </p>
              <div className='space-y-6'>
                {macroData.map((macro, i) => (
                  <div key={macro.label}>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='text-gray-300 font-medium'>
                        {macro.label}
                      </span>
                      <span className='text-white font-mono font-bold'>
                        {macro.label === 'Calories'
                          ? `${macro.value} / ${macro.max} kcal`
                          : `${macro.value}g / ${macro.max}g`}
                      </span>
                    </div>
                    <div className='w-full h-3 bg-white/10 rounded-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(macro.value / macro.max) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + i * 0.15,
                          duration: 1.2,
                          ease: 'easeOut',
                        }}
                        className={`h-full ${macro.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

      {/* ============================================ */}
      {/* WHY I BUILT THIS */}
      {/* ============================================ */}
      <section ref={storyRef} className='relative py-32 px-6'>
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p className='text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-4'>
                  The Story
                </p>
                <h2 className='text-4xl md:text-6xl font-black uppercase tracking-tight mb-8'>
                  Why I <span className='text-red-500'>Built</span> This
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='space-y-6 text-gray-400 leading-relaxed text-lg'
              >
                <p>
                  Every calorie tracker I tried felt like a chore. Boring
                  databases, zero community, no way to see what the people around
                  me were actually eating. As someone training for Ironmans and
                  running 100-milers, I needed to know my nutrition was dialed,
                  but I also wanted it to feel like opening Instagram, not a
                  spreadsheet.
                </p>
                <p>
                  I wanted to scroll through a feed and see my training
                  buddy&apos;s post-long-run recovery meal. I wanted to snap a
                  photo and have AI tell me my macros instantly. I wanted to
                  discover restaurants on a map based on what my friends were
                  eating there.
                </p>
                <p>That app didn&apos;t exist. So I built it myself.</p>
                <p className='text-white font-semibold text-xl'>
                  InstaCal is social nutrition. Track what you eat, see what your
                  friends eat, and make healthy choices together.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={storyInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className='mt-8 flex items-center gap-3'
              >
                <div className='w-px h-12 bg-red-600' />
                <div>
                  <p className='text-white font-bold'>Dylan Cramer</p>
                  <p className='text-xs text-gray-600 font-mono'>
                    Founder &amp; Developer, InstaCal
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='flex justify-center'
            >
              <div className='relative w-[280px] rounded-[3rem] border-[6px] border-white/10 bg-black p-2 shadow-2xl shadow-red-500/10'>
                <div className='overflow-hidden rounded-[2.25rem]'>
                  <Image
                    src='/images/app/instacal-profile.png'
                    alt='InstaCal profile screen showing food posts'
                    width={268}
                    height={580}
                    className='w-full h-auto'
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section ref={pricingRef} className='relative py-32 px-6'>
        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='text-center mb-16'
          >
            <p className='text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-4'>
              Simple Pricing
            </p>
            <h2 className='text-4xl md:text-6xl font-black uppercase tracking-tight'>
              Free <span className='text-red-500'>Forever</span>
            </h2>
            <p className='text-gray-400 mt-4 max-w-xl mx-auto'>
              InstaCal is free to use with no time limit. Upgrade to Pro for
              unlimited AI features.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {/* Free tier */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className='relative p-8 bg-white/[0.03] border border-white/10 rounded-2xl'
            >
              <p className='text-xs uppercase tracking-[0.3em] text-gray-500 font-mono mb-2'>
                Free
              </p>
              <p className='text-4xl font-black text-white mb-1'>$0</p>
              <p className='text-sm text-gray-500 mb-8'>
                Forever. No credit card.
              </p>

              <ul className='space-y-4'>
                {[
                  'Unlimited food logging',
                  'Photo scanning (limited/day)',
                  'Barcode scanning',
                  'Social feed access',
                  'Meal map',
                  'Basic workout tracking',
                  'Daily macro dashboard',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-3 text-sm text-gray-300'
                  >
                    <svg
                      className='w-5 h-5 text-red-500 shrink-0'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href='https://apps.apple.com/us/app/instacal/id6743951306'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 block text-center px-6 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all rounded-xl'
              >
                Get Started Free
              </a>
            </motion.div>

            {/* Pro tier */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className='relative p-8 bg-gradient-to-br from-red-950/30 to-black border border-red-600/30 rounded-2xl'
            >
              {/* Popular badge */}
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
                Most Popular
              </div>

              <p className='text-xs uppercase tracking-[0.3em] text-red-500 font-mono mb-2'>
                Pro
              </p>
              <div className='flex items-baseline gap-2 mb-1'>
                <p className='text-4xl font-black text-white'>$29.99</p>
                <span className='text-gray-500 text-sm'>/year</span>
              </div>
              <p className='text-sm text-gray-500 mb-8'>
                or $7.99/month
              </p>

              <ul className='space-y-4'>
                {[
                  'Everything in Free',
                  'Unlimited photo scans',
                  'Unlimited AI dietitian chat',
                  'Advanced macro insights',
                  'Custom meal plans',
                  'Priority support',
                  'Early access to new features',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-3 text-sm text-gray-300'
                  >
                    <svg
                      className='w-5 h-5 text-red-500 shrink-0'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href='https://apps.apple.com/us/app/instacal/id6743951306'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 block text-center px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-500 transition-all rounded-xl animate-pulse-red'
              >
                Upgrade to Pro
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Red accent line */}
      <div className='w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent' />

      {/* ============================================ */}
      {/* BOTTOM CTA */}
      {/* ============================================ */}
      <section ref={ctaRef} className='relative py-32 px-6'>
        <div className='absolute inset-0 bg-gradient-to-t from-red-950/10 via-black to-black' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]' />

        <div className='max-w-7xl mx-auto relative z-10 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Image
              src='/images/app/instacal-icon.png'
              alt='InstaCal'
              width={80}
              height={80}
              sizes='80px'
              className='rounded-2xl mx-auto mb-8'
            />

            <h2 className='text-4xl md:text-6xl font-black uppercase tracking-tight mb-4'>
              Start Tracking <span className='text-red-500'>Today</span>
            </h2>
            <p className='text-gray-400 text-lg max-w-2xl mx-auto mb-10'>
              Join thousands of people using InstaCal to eat smarter, train
              harder, and build healthier habits, together.
            </p>

            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              <a
                href='https://apps.apple.com/us/app/instacal/id6743951306'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-base uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 rounded-xl animate-pulse-red'
              >
                <svg
                  className='w-7 h-7'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                </svg>
                Download for iOS
              </a>
              <a
                href='https://play.google.com/store/apps/details?id=com.digitaldelight.InstaCal'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-bold text-base uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-xl'
              >
                <svg
                  className='w-7 h-7'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z' />
                </svg>
                Download for Android
              </a>
            </div>

            <a
              href='https://theinstacal.app'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 uppercase tracking-widest font-mono transition-colors'
            >
              Visit theinstacal.app
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
