import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import UltraMarathonNutrition from "@/components/UltraMarathonNutrition";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ultra Marathon Nutrition Guide | Dylan Cramer",
  description:
    "Complete nutrition guide for ultra marathons. 50K, 50-mile, and 100-mile races. Calories per hour, stomach training, race day fueling, electrolyte strategy, and what Dylan ate during Tunnel Hill 100.",
};

export default function UltraMarathonNutritionPage() {
  return (
    <main className="bg-black">
      <Navigation />
      <UltraMarathonNutrition />
      <Footer />
    </main>
  );
}
