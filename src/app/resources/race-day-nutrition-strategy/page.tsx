import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import RaceDayNutritionGuide from "@/components/RaceDayNutritionGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Race Day Nutrition Strategy for Endurance Athletes | Dylan Cramer",
  description:
    "How to fuel during any endurance race. Calorie targets by sport, carb loading, gel timing, electrolyte strategy, stomach training, and Dylan's exact nutrition plans from Ironman Wisconsin and Tunnel Hill 100.",
};

export default function RaceDayNutritionStrategyPage() {
  return (
    <main className="bg-black">
      <Navigation />
      <RaceDayNutritionGuide />
      <Footer />
    </main>
  );
}
