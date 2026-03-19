"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";


const galleryImages = [
  { src: "/images/gallery/ironman-finish.jpg", alt: "Ironman Wisconsin finish line", caption: "IRONMAN WISCONSIN", category: "ironman" },
  { src: "/images/gallery/ironman-final.jpg", alt: "Ironman crossing finish", caption: "THE MOMENT", category: "ironman" },
  { src: "/images/gallery/ironman-run.jpg", alt: "Running the Ironman marathon", caption: "MARATHON LEG", category: "ironman" },
  { src: "/images/gallery/ironman-arch.jpg", alt: "Ironman finish arch", caption: "THE ARCH", category: "ironman" },
  { src: "/images/gallery/night-run-bw.jpg", alt: "Night running black and white", caption: "INTO THE NIGHT", category: "ironman" },
  { src: "/images/gallery/stadium-run.jpg", alt: "Running in the stadium", caption: "IRONMAN RUN", category: "ironman" },
  { src: "/images/gallery/bike-capitol.jpg", alt: "Biking past the Capitol", caption: "112 MILES", category: "ironman" },
  { src: "/images/gallery/bike-barn.jpg", alt: "Biking past a barn", caption: "COUNTRY ROADS", category: "ironman" },
  { src: "/images/gallery/swim-exit.jpg", alt: "Exiting the swim", caption: "SWIM EXIT", category: "ironman" },
  { src: "/images/gallery/wetsuit-buddy.jpg", alt: "Pre-race with friend", caption: "RACE MORNING", category: "ironman" },
  { src: "/images/gallery/tunnel-hill-finish.jpg", alt: "Tunnel Hill 100 finish", caption: "100 MILES", category: "ultra" },
  { src: "/images/gallery/tunnel-hill-50.jpg", alt: "Tunnel Hill 50 mile mark", caption: "HALFWAY THERE", category: "ultra" },
  { src: "/images/gallery/night-trail.jpg", alt: "Night trail running", caption: "DARK MILES", category: "ultra" },
  { src: "/images/gallery/ultra-wave.jpg", alt: "Waving during ultra", caption: "STILL SMILING", category: "ultra" },
  { src: "/images/gallery/ultra-snack.jpg", alt: "Aid station fuel", caption: "FUEL UP", category: "ultra" },
  { src: "/images/gallery/ultra-crew.jpg", alt: "Ultra crew support", caption: "CREW SUPPORT", category: "ultra" },
  { src: "/images/gallery/go-one-more.jpg", alt: "Go One More sign", caption: "GO ONE MORE", category: "ultra" },
  { src: "/images/gallery/survive-the-night.jpg", alt: "Survive the Night race", caption: "SURVIVE THE NIGHT", category: "ultra" },
  { src: "/images/gallery/chicago-run.jpg", alt: "Running in Chicago skyline", caption: "CHICAGO TRI", category: "triathlon" },
  { src: "/images/gallery/chicago-finish.jpg", alt: "Chicago Triathlon finish", caption: "FINISH LINE", category: "triathlon" },
  { src: "/images/gallery/open-water-swim.jpg", alt: "Open water swimming", caption: "OPEN WATER", category: "triathlon" },
  { src: "/images/gallery/tri-friends.jpg", alt: "Triathlon friends post-race", caption: "THE CREW", category: "triathlon" },
  { src: "/images/gallery/swim-group.jpg", alt: "Swim group on beach", caption: "SWIM CREW", category: "triathlon" },
  { src: "/images/gallery/family-tri.jpg", alt: "Family at triathlon", caption: "FAMILY SUPPORT", category: "life" },
  { src: "/images/gallery/festival.jpg", alt: "Music festival vibes", caption: "GOOD VIBES", category: "life" },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ironman", label: "Ironman" },
  { key: "ultra", label: "Ultra" },
  { key: "triathlon", label: "Triathlon" },
  { key: "life", label: "Life" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            The Full Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
            Gallery
          </h1>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-mono rounded-xl border transition-all ${
                  filter === cat.key
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-white/10 text-gray-400 hover:border-red-600/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-20 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(i)}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs font-bold uppercase tracking-widest text-red-400">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:text-red-500 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-red-500 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : filtered.length - 1));
              }}
            >
              &#8249;
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-red-500 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : 0));
              }}
            >
              &#8250;
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                  {filtered[lightbox].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
