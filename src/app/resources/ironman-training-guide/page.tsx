import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import IronmanGuide from "@/components/IronmanGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ironman Training Guide | Dylan Cramer",
  description:
    "Your complete guide to finishing your first Ironman triathlon. Training plans, nutrition, gear, race day tips, and lessons from Dylan Cramer's Ironman Wisconsin 13:54:29 finish.",
};

export default function IronmanTrainingGuidePage() {
  return (
    <main className="bg-black">
      <Navigation />
      <IronmanGuide />
      <Footer />
    </main>
  );
}
