import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import OpenWaterSwimGuide from "@/components/OpenWaterSwimGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open Water Swimming Guide for Triathletes | Dylan Cramer",
  description:
    "Complete guide to open water swimming for triathletes. Pool to open water transition, wetsuit selection, sighting, drafting, cold water acclimation, race start strategy, and tips from Ironman swim experience.",
};

export default function OpenWaterSwimmingGuidePage() {
  return (
    <main className="bg-black">
      <Navigation />
      <OpenWaterSwimGuide />
      <Footer />
    </main>
  );
}
