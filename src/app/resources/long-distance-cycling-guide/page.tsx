import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import LongDistanceCyclingGuide from "@/components/LongDistanceCyclingGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Long Distance Cycling Guide | Dylan Cramer",
  description:
    "Your complete guide to long distance cycling for triathletes and endurance athletes. Bike fit, training plans, nutrition on the bike, gear essentials, and lessons from 112 miles at Ironman Wisconsin.",
};

export default function LongDistanceCyclingGuidePage() {
  return (
    <main className="bg-black">
      <Navigation />
      <LongDistanceCyclingGuide />
      <Footer />
    </main>
  );
}
