"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  { src: "/images/gallery/ironman-finish.jpg", alt: "Ironman Wisconsin finish line", caption: "IRONMAN WISCONSIN" },
  { src: "/images/gallery/tunnel-hill-finish.jpg", alt: "Tunnel Hill 100 finish", caption: "100 MILES" },
  { src: "/images/gallery/stadium-run.jpg", alt: "Running in the stadium", caption: "IRONMAN RUN" },
  { src: "/images/gallery/bike-capitol.jpg", alt: "Biking past the Capitol", caption: "112 MILES" },
  { src: "/images/gallery/open-water-swim.jpg", alt: "Open water swimming", caption: "OPEN WATER" },
  { src: "/images/gallery/swim-exit.jpg", alt: "Exiting the swim", caption: "SWIM EXIT" },
  { src: "/images/gallery/night-run-bw.jpg", alt: "Night running black and white", caption: "INTO THE NIGHT" },
  { src: "/images/gallery/chicago-run.jpg", alt: "Running in Chicago skyline", caption: "CHICAGO TRI" },
  { src: "/images/gallery/chicago-finish.jpg", alt: "Chicago Triathlon finish", caption: "FINISH LINE" },
  { src: "/images/gallery/go-one-more.jpg", alt: "Go One More sign", caption: "GO ONE MORE" },
  { src: "/images/gallery/festival.jpg", alt: "Music festival vibes", caption: "GOOD VIBES" },
  { src: "/images/gallery/ironman-final.jpg", alt: "Ironman crossing finish", caption: "THE MOMENT" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="gallery" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
              The Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Every Mile
              <br />
              <span className="text-red-500">Has a Story.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors font-mono group"
          >
            View All
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="scroll-gallery overflow-x-auto flex gap-4 px-6 pb-4 snap-x snap-mandatory">
          {carouselImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: Math.min(i * 0.08, 0.6), duration: 0.5 }}
              className="relative flex-shrink-0 group snap-start"
            >
              <div className="relative w-[280px] md:w-[350px] aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400">
                    {img.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* View all card at the end */}
          <Link
            href="/gallery"
            className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4 hover:border-red-600/40 hover:bg-red-600/5 transition-all group snap-start"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-red-500 flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <p className="text-sm uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors font-mono">
              View All Photos
            </p>
          </Link>
        </div>
      </motion.div>

      {/* Mobile view all link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors font-mono"
        >
          View All Photos
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
