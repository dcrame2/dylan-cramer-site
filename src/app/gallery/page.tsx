import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import GalleryPage from "@/components/GalleryPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Dylan Cramer",
  description:
    "Photos from Ironman Wisconsin, Tunnel Hill 100, Chicago Triathlon, and the journey of training, racing, and living life to the fullest.",
};

export default function Gallery() {
  return (
    <main className="bg-black">
      <Navigation />
      <GalleryPage />
      <Footer />
    </main>
  );
}
