"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function HubNewsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="join" ref={ref} className="relative py-28 px-6 overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400" />

          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Join the Crew
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-5">
            Get the <span className="text-red-500">Inside Lane.</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            Training updates, race recaps, what I&apos;m building, and the stuff I
            only share with the email crew. No spam — just the real journey,
            straight to your inbox.
          </p>

          {status === "success" ? (
            <div className="max-w-md mx-auto px-4 py-3 bg-red-600/10 border border-red-600/30 rounded-xl">
              <p className="text-sm text-red-400 font-bold">
                You&apos;re in! Welcome to the crew.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors rounded-xl"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-red-500 transition-colors whitespace-nowrap rounded-xl disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join the Crew"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 mt-3">Something went wrong. Try again.</p>
          )}
          {status !== "success" && (
            <p className="text-[10px] text-gray-600 mt-3">
              No spam. Just real updates from the journey.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
