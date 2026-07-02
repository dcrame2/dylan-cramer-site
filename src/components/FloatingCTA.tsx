"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Mobile-only sticky dock that surfaces the two core funnel actions
// (download the app, follow on Instagram) once the visitor is engaged.
export default function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  // The window guard keeps the initializer safe during server rendering;
  // visible starts false everywhere, so hydration output matches either way.
  const [dismissed, setDismissed] = useState(
    () =>
      typeof window === "undefined" ||
      sessionStorage.getItem("floating-cta-dismissed") === "1",
  );

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function dismiss() {
    sessionStorage.setItem("floating-cta-dismissed", "1");
    setDismissed(true);
  }

  // The /links page is already a pure funnel — skip the dock there.
  if (pathname === "/links") return null;

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <div className="flex items-center gap-3 p-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-red-900/20">
            <Image
              src="/images/app/instacal-icon.png"
              alt="InstaCal"
              width={36}
              height={36}
              className="rounded-lg shrink-0"
            />
            <a
              href="/app"
              className="flex-1 py-2.5 bg-red-600 text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-500 transition-colors"
            >
              Get the App
            </a>
            <a
              href="https://www.instagram.com/cramerdyl/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 border border-white/20 text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Follow Me
            </a>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="p-1.5 text-gray-500 hover:text-white transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
