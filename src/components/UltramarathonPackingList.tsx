"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */

const STORAGE_KEY = "ultra-packing-checked";

type PackingItem = {
  name: string;
  note?: string;
};

type PackingCategory = {
  id: string;
  label: string;
  icon: string;
  items: PackingItem[];
};

const categories: PackingCategory[] = [
  {
    id: "clothing",
    label: "Clothing",
    icon: "👟",
    items: [
      { name: "Hat x 2", note: "One for day, one backup if it gets soaked" },
      { name: "Rain jacket" },
      { name: "Socks x 3", note: "Fresh socks at mile 50 hit different" },
      { name: "Shoes x 2", note: "Swap at a crew point if your feet are wrecked" },
      { name: "Sunglasses" },
      { name: "T-shirt x 3", note: "Rotate as they get sweat-soaked or chafing starts" },
      { name: "Shorts" },
      { name: "Calf sleeves" },
      { name: "Running pants/tights", note: "For when temps drop at night" },
      { name: "Winter hat", note: "Night miles get cold, even in summer" },
      { name: "Gloves" },
    ],
  },
  {
    id: "food",
    label: "Food & Fuel",
    icon: "⚡",
    items: [
      { name: "Gels x 20-30", note: "Maurten, Go Gel, Gu, Honey Stinger, etc" },
      { name: "Maurten bars" },
      { name: "Go Bars" },
      { name: "Fig Newtons" },
      { name: "Bobo Bars" },
      { name: "Celsius" },
      { name: "White Monster", note: "Late-race caffeine boost" },
      { name: "Ginger Beer", note: "Settles the stomach when nothing else sounds good" },
      { name: "Uncrustables", note: "Real food that goes down easy" },
      { name: "Bananas" },
      { name: "LMNT Salt Drink" },
      { name: "Salt Chew Tablets" },
      { name: "Precision Hydration carb mix" },
      { name: "Cheez-Its", note: "Salty crunchy savory. Exactly what you'll crave" },
      { name: "Gum" },
      { name: "Pickle Juice", note: "Cramp killer" },
    ],
  },
  {
    id: "gear",
    label: "Gear & Misc",
    icon: "🎒",
    items: [
      { name: "Headlamp", note: "Non-negotiable for any ultra with night miles" },
      { name: "Battery pack charger" },
      { name: "Race bib belt" },
      { name: "Running vest" },
      { name: "Running water bottles" },
      { name: "Chargers" },
      { name: "Headphones" },
      { name: "KT Tape" },
      { name: "Athletic Tape" },
      { name: "Scissors" },
      { name: "Small towel" },
      { name: "Small first aid kit" },
      { name: "Toilet wet wipes", note: "You will thank yourself" },
      { name: "Hand sanitizer" },
      { name: "Sunscreen" },
      { name: "Lube for chafing", note: "Apply early and often" },
      { name: "Drop bags" },
      { name: "Plastic baggies", note: "Keep drop bag contents organized and dry" },
      { name: "Sharpie", note: "Label your drop bags and bottles" },
    ],
  },
  {
    id: "pain-relief",
    label: "Pain Relief",
    icon: "💊",
    items: [
      { name: "Biofreeze spray or roller" },
      { name: "Ibuprofen", note: "Use sparingly, hard on kidneys during long efforts" },
      { name: "Pepto Bismol" },
      { name: "Imodium", note: "Stomach issues are when, not if" },
      { name: "Muscle scraper" },
      { name: "Massage gun", note: "For pre-race and post-race" },
      { name: "Biofreeze patches" },
    ],
  },
];

const allItemNames = categories.flatMap((c) => c.items.map((i) => i.name));

/* ── helpers ──────────────────────────────────────────── */

function useAnimRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

/* ── component ────────────────────────────────────────── */

export default function UltramarathonPackingList() {
  const hero = useAnimRef();
  const content = useAnimRef();
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("clothing");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  const updateChecked = useCallback(
    (name: string) => {
      setChecked((prev) => {
        const next = { ...prev, [name]: !prev[name] };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [],
  );

  const clearAll = useCallback(() => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const totalChecked = allItemNames.filter((n) => checked[n]).length;
  const totalItems = allItemNames.length;
  const progressPct = Math.round((totalChecked / totalItems) * 100);

  // Intersection observer for sidebar category highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );

    categories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ultramarathon Packing List - Dylan Cramer",
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative pt-28 overflow-hidden">
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={hero.ref}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/ultra-crew.jpg"
            alt="Dylan finishing Tunnel Hill 100"
            fill
            className="object-cover object-[50%_30%]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />

        <div className="relative z-10 px-6 w-full max-w-7xl mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <Link
              href="/resources"
              className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-red-500 font-mono transition-colors"
            >
              Resources
            </Link>
            <span className="text-gray-700">/</span>
            <p className="text-xs uppercase tracking-[0.5em] text-red-500 font-mono">
              Interactive Checklist
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight"
          >
            <span className="text-white">Ultramarathon</span>
            <br />
            <span className="text-red-500">Packing List</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hero.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Everything I pack for 50-milers and 100-milers. Check items off as
            you pack. Your progress saves automatically.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={hero.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#clothing"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
            >
              Start Packing
            </a>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-red-600/50 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
            >
              {copied ? "Link Copied!" : "Share List"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CHECKLIST LAYOUT ─────────────────────────── */}
      <section ref={content.ref} className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-12">
            {/* ── Sidebar (desktop) ──────────────────── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono">
                      Progress
                    </p>
                    <p className="text-xs font-mono text-gray-500">
                      {totalChecked}/{totalItems}
                    </p>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  {progressPct === 100 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400 font-mono mt-2"
                    >
                      You&apos;re packed. Go get it.
                    </motion.p>
                  )}
                </div>

                {/* Category nav */}
                <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
                  Categories
                </p>
                <nav className="space-y-1">
                  {categories.map((cat) => {
                    const catChecked = cat.items.filter(
                      (i) => checked[i.name],
                    ).length;
                    return (
                      <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className={`flex items-center justify-between py-2 text-sm transition-colors duration-200 border-l-2 pl-4 pr-2 ${
                          activeCategory === cat.id
                            ? "border-red-600 text-red-400"
                            : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700"
                        }`}
                      >
                        <span>
                          {cat.icon} {cat.label}
                        </span>
                        <span className="text-xs font-mono text-gray-600">
                          {catChecked}/{cat.items.length}
                        </span>
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-red-600/50 text-white text-xs uppercase tracking-widest rounded-xl transition-colors font-mono"
                  >
                    {copied ? "Copied!" : "Share This List"}
                  </button>
                  {totalChecked > 0 && (
                    <button
                      onClick={clearAll}
                      className="w-full px-4 py-2.5 text-gray-600 hover:text-red-400 text-xs uppercase tracking-widest rounded-xl transition-colors font-mono"
                    >
                      Reset Checkboxes
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* ── Main Content ───────────────────────── */}
            <div className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile progress bar */}
              <div className="lg:hidden mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-red-500 font-mono">
                    Packed
                  </p>
                  <p className="text-sm font-mono text-gray-400">
                    {totalChecked}/{totalItems} items ({progressPct}%)
                  </p>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-600 rounded-full"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                {totalChecked > 0 && (
                  <button
                    onClick={clearAll}
                    className="mt-3 text-xs text-gray-600 hover:text-red-400 font-mono uppercase tracking-widest transition-colors"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {categories.map((cat, catIdx) => {
                const catChecked = cat.items.filter(
                  (i) => checked[i.name],
                ).length;
                const catComplete = catChecked === cat.items.length;

                return (
                  <motion.div
                    key={cat.id}
                    id={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={content.inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + catIdx * 0.15,
                    }}
                    className={catIdx > 0 ? "mt-16" : ""}
                  >
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                          {cat.label}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-500">
                          {catChecked}/{cat.items.length}
                        </span>
                        {catComplete && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-red-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cat.items.map((item) => {
                        const isChecked = !!checked[item.name];
                        return (
                          <button
                            key={item.name}
                            onClick={() => updateChecked(item.name)}
                            className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 group ${
                              isChecked
                                ? "bg-red-600/5 border-red-600/20"
                                : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                            }`}
                          >
                            {/* Checkbox */}
                            <div
                              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                                isChecked
                                  ? "bg-red-600 border-red-600"
                                  : "border-gray-600 group-hover:border-gray-400"
                              }`}
                            >
                              {isChecked && (
                                <motion.svg
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={4}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </motion.svg>
                              )}
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-base font-semibold transition-colors duration-200 ${
                                  isChecked
                                    ? "text-gray-500 line-through"
                                    : "text-white"
                                }`}
                              >
                                {item.name}
                              </p>
                              {item.note && (
                                <p
                                  className={`text-sm mt-0.5 transition-colors duration-200 ${
                                    isChecked
                                      ? "text-gray-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {item.note}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    {catIdx < categories.length - 1 && (
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent mt-16" />
                    )}
                  </motion.div>
                );
              })}

              {/* ── Bottom CTA ───────────────────────── */}
              <div className="mt-20 pt-16 border-t border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={content.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
                    From Someone Who&apos;s Been There
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                    Now Go Run<span className="text-red-500">.</span>
                  </h3>
                  <p className="text-gray-400 max-w-lg mx-auto mb-8">
                    This is the exact list I used for Tunnel Hill 100. Pack it
                    the night before, trust the process, and go get your buckle.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/resources"
                      className="px-6 py-3 bg-white/5 border border-white/10 hover:border-red-600/50 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
                    >
                      All Resources
                    </Link>
                    <Link
                      href="/resources/ultra-marathon-nutrition"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Ultra Nutrition Guide
                    </Link>
                  </div>

                  {/* InstaCal plug */}
                  <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto">
                    <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-2">
                      Track Your Race Fuel
                    </p>
                    <p className="text-white font-bold mb-2">
                      Download InstaCal
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      The AI-powered calorie tracker I built while training for
                      Ironman. Dial in your nutrition before race day.
                    </p>
                    <a
                      href="https://theinstacal.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Get InstaCal
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
