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
  { src: "/images/gallery/chi-tri-sunrise.jpg", alt: "Sunrise over Lake Michigan before Chicago Tri", caption: "RACE MORNING", category: "triathlon" },
  { src: "/images/gallery/chi-tri-swim-exit.jpg", alt: "Swim exit at Chicago Triathlon", caption: "SWIM EXIT", category: "triathlon" },
  { src: "/images/gallery/chi-tri-bike.jpg", alt: "Bike leg at Chicago Triathlon", caption: "BIKE LEG", category: "triathlon" },
  { src: "/images/gallery/chi-tri-finish.jpg", alt: "Running into Chicago Tri finish line", caption: "FINISH LINE", category: "triathlon" },
  { src: "/images/gallery/chi-tri-finish2.jpg", alt: "Crossing Chicago Tri finish", caption: "THE MOMENT", category: "triathlon" },
  { src: "/images/gallery/chi-tri-medal.jpg", alt: "Post-race with Chicago Tri medal", caption: "EARNED IT", category: "triathlon" },
  { src: "/images/gallery/chi-tri-medal2.jpg", alt: "Showing off Chicago Tri medal", caption: "MEDAL POSE", category: "triathlon" },
  { src: "/images/gallery/chi-tri-brightside.jpg", alt: "Post-race celebration at Brightside", caption: "CELEBRATION", category: "triathlon" },
  { src: "/images/gallery/chi-tri-selfie.jpg", alt: "Selfie with Chicago Tri finisher medal", caption: "FINISHER", category: "triathlon" },
  { src: "/images/gallery/chi-tri-swim-exit2.jpg", alt: "Running out of the swim at Chicago Tri", caption: "OUT OF THE WATER", category: "triathlon" },
  { src: "/images/gallery/chi-tri-bike2.jpg", alt: "Aerial view biking at Chicago Tri", caption: "SHADOW RIDER", category: "triathlon" },
  { src: "/images/gallery/chi-tri-crew.jpg", alt: "The crew post-race at Brightside tent", caption: "THE SQUAD", category: "triathlon" },
  { src: "/images/gallery/chi-tri-friends.jpg", alt: "Friends with medals and Chicago skyline", caption: "THE BOYS", category: "triathlon" },
  { src: "/images/gallery/chi-tri-chitri-sign.jpg", alt: "#CHITRI sign at expo", caption: "#CHITRI", category: "triathlon" },
  { src: "/images/gallery/chi-tri-finish-arch.jpg", alt: "Chicago Tri finish arch wide shot", caption: "THE ARCH", category: "triathlon" },
  { src: "/images/gallery/chi-tri-finish-arch2.jpg", alt: "Chicago Tri finish arch close-up", caption: "FINISH ZONE", category: "triathlon" },
  { src: "/images/gallery/chi-tri-family.jpg", alt: "Family with big head cutout at Brightside", caption: "FAMILY", category: "triathlon" },
  { src: "/images/gallery/chi-tri-brightside2.jpg", alt: "Medal pose at Brightside tent", caption: "BRIGHTSIDE", category: "triathlon" },
  { src: "/images/gallery/chi-tri-bike3.jpg", alt: "Smiling on the bike at Chicago Tri", caption: "ALL SMILES", category: "triathlon" },
  { src: "/images/gallery/chi-tri-bike4.jpg", alt: "Biking along the curb at Chicago Tri", caption: "PEDAL ON", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim-start.jpg", alt: "Swim start at Lake Geneva Triathlon", caption: "SWIM START", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim.jpg", alt: "Open water swimming at Lake Geneva", caption: "OPEN WATER", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim-exit.jpg", alt: "Pulling goggles off exiting swim", caption: "GOGGLES OFF", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim-exit2.jpg", alt: "Thumbs up exiting Lake Geneva swim", caption: "THUMBS UP", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim-exit3.jpg", alt: "Swim exit close-up at Lake Geneva", caption: "STOKED", category: "triathlon" },
  { src: "/images/gallery/lg-tri-family.jpg", alt: "Family photo in wetsuit at Lake Geneva", caption: "FAMILY", category: "triathlon" },
  { src: "/images/gallery/lg-tri-swim-exit4.jpg", alt: "Leading the pack out of the swim", caption: "FIRST OUT", category: "triathlon" },
  { src: "/images/gallery/lg-tri-bike.jpg", alt: "Biking lakeside at Lake Geneva", caption: "LAKESIDE RIDE", category: "triathlon" },
  { src: "/images/gallery/lg-tri-run.jpg", alt: "Running through town at Lake Geneva Tri", caption: "THROUGH TOWN", category: "triathlon" },
  { src: "/images/gallery/lg-tri-finish.jpg", alt: "Finish line at Lake Geneva Triathlon", caption: "FINISH LINE", category: "triathlon" },
  { src: "/images/gallery/lg-tri-medal.jpg", alt: "Medal pose at Lake Geneva Triathlon", caption: "MEDAL TIME", category: "triathlon" },
  { src: "/images/gallery/lg-tri-buddy.jpg", alt: "Post-race with friend at Lake Geneva", caption: "RACE BUDDY", category: "triathlon" },
  { src: "/images/gallery/chicago-run.jpg", alt: "Running in Chicago skyline", caption: "CHICAGO TRI", category: "triathlon" },
  { src: "/images/gallery/chicago-finish.jpg", alt: "Chicago Triathlon finish", caption: "FINISH LINE", category: "triathlon" },
  { src: "/images/gallery/open-water-swim.jpg", alt: "Open water swimming", caption: "OPEN WATER", category: "triathlon" },
  { src: "/images/gallery/tri-friends.jpg", alt: "Triathlon friends post-race", caption: "THE CREW", category: "triathlon" },
  { src: "/images/gallery/swim-group.jpg", alt: "Swim group on beach", caption: "SWIM CREW", category: "triathlon" },
  { src: "/images/gallery/chi-half-family.jpg", alt: "Parents with big head cutouts at Chicago 13.1", caption: "BIGGEST FANS", category: "marathon" },
  { src: "/images/gallery/chi-half-crew.jpg", alt: "Post-race crew at Chicago Half Marathon", caption: "THE CREW", category: "marathon" },
  { src: "/images/gallery/chi-half-medal.jpg", alt: "Medal pose at Chicago Half Marathon", caption: "13.1 DONE", category: "marathon" },
  { src: "/images/gallery/chi-half-friends.jpg", alt: "Friends with medals at Chicago Half", caption: "THE BOYS", category: "marathon" },
  { src: "/images/gallery/chi-half-run.jpg", alt: "Running the Chicago Half Marathon", caption: "FULL SEND", category: "marathon" },
  { src: "/images/gallery/chi-half-run2.jpg", alt: "Cruising through Chicago Half Marathon", caption: "STRIDE", category: "marathon" },
  { src: "/images/gallery/champaign-medal.jpg", alt: "Medal on the field at Illinois marathon", caption: "FOR LIAM", category: "marathon" },
  { src: "/images/gallery/champaign-fuel.jpg", alt: "Marathon nutrition flat lay", caption: "FUEL UP", category: "marathon" },
  { src: "/images/gallery/champaign-buddy.jpg", alt: "Post-race with friend on the field", caption: "26.2 DONE", category: "marathon" },
  { src: "/images/gallery/alcatraz-golden-gate.jpg", alt: "Post-swim at Golden Gate Bridge", caption: "GOLDEN GATE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-swim.jpg", alt: "Mass swim start from Alcatraz", caption: "THE ESCAPE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-island.jpg", alt: "Alcatraz Island from the bay", caption: "THE ROCK", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-team.jpg", alt: "Team Brightside in wetsuits before swim", caption: "TEAM BRIGHTSIDE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-bike-gg.jpg", alt: "Biking with Golden Gate Bridge behind", caption: "GOLDEN GATE RIDE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-bike.jpg", alt: "Biking uphill at Escape from Alcatraz", caption: "CLIMBING", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-bike2.jpg", alt: "Biking through curves at Alcatraz tri", caption: "INTO THE TURN", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-bike-coast.jpg", alt: "Biking along the coast", caption: "COASTAL RIDE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-beach-run.jpg", alt: "Running on Baker Beach", caption: "BEACH RUN", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-beach-run2.jpg", alt: "Running along the shore at Alcatraz tri", caption: "SAND MILES", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-trail-run.jpg", alt: "Trail running at Escape from Alcatraz", caption: "TRAIL LEG", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-finish.jpg", alt: "Crossing Escape from Alcatraz finish line", caption: "FINISH LINE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-escape-pose.jpg", alt: "Posing at ESCAPE sign post-race", caption: "ESCAPED", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-escape-sign.jpg", alt: "ESCAPE sign at race venue", caption: "ESCAPE", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-escapees.jpg", alt: "Escapees board June 9 2024", caption: "ESCAPEES", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-pier39.jpg", alt: "Sea lions at Pier 39", caption: "PIER 39", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-sealion.jpg", alt: "Sea lion swimming at Pier 39", caption: "SEA LION", category: "alcatraz" },
  { src: "/images/gallery/alcatraz-medal.jpg", alt: "Selfie with Escape from Alcatraz medal", caption: "FINISHER", category: "alcatraz" },
  { src: "/images/gallery/family-tri.jpg", alt: "Family at triathlon", caption: "FAMILY SUPPORT", category: "triathlon" },
  { src: "/images/gallery/703-swim-exit.jpg", alt: "70.3 swim exit transition", caption: "70.3 SWIM EXIT", category: "70.3" },
  { src: "/images/gallery/703-run-lakeside.jpg", alt: "Running lakeside at 70.3", caption: "70.3 RUN", category: "70.3" },
  { src: "/images/gallery/703-peace-sign.jpg", alt: "Peace sign while running", caption: "GOOD VIBES", category: "70.3" },
  { src: "/images/gallery/703-crowd-cheers.jpg", alt: "Crowd cheering at 70.3", caption: "CROWD ENERGY", category: "70.3" },
  { src: "/images/gallery/703-crowd-cheers2.jpg", alt: "Fans going wild at 70.3", caption: "THE FANS", category: "70.3" },
  { src: "/images/gallery/703-thumbs-up.jpg", alt: "Thumbs up during 70.3 run", caption: "THUMBS UP", category: "70.3" },
  { src: "/images/gallery/703-finish-line.jpg", alt: "Crossing 70.3 finish line", caption: "70.3 FINISH", category: "70.3" },
  { src: "/images/gallery/703-finish-back.jpg", alt: "Running into 70.3 finish arch", caption: "INTO THE ARCH", category: "70.3" },
  { src: "/images/gallery/703-capitol-sunset.jpg", alt: "Madison Capitol at sunset", caption: "MADISON SUNSET", category: "70.3" },
  { src: "/images/gallery/703-family.jpg", alt: "Family after 70.3 finish", caption: "FAMILY", category: "70.3" },
  { src: "/images/gallery/703-run-trees.jpg", alt: "Running under trees at 70.3", caption: "LAKESIDE MILES", category: "70.3" },
];

const categories = [
  { key: "all", label: "All" },
  { key: "ironman", label: "Ironman" },
  { key: "70.3", label: "70.3" },
  { key: "marathon", label: "Marathon" },
  { key: "alcatraz", label: "Alcatraz" },
  { key: "ultra", label: "Ultra" },
  { key: "triathlon", label: "Triathlon" },
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
