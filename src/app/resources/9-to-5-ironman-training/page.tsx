import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import NineToFiveIronman from "@/components/NineToFiveIronman";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Train for an Ironman with a 9-5 Job | Dylan Cramer",
  description:
    "A realistic guide to training for an Ironman while working full time. Sample weekly schedules, time management, sleep optimization, meal prepping, and Dylan's actual Ironman Wisconsin training schedule.",
};

export default function NineToFiveIronmanPage() {
  return (
    <main className="bg-black">
      <Navigation />
      <NineToFiveIronman />
      <Footer />
    </main>
  );
}
