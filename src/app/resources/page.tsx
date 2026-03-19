import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ResourcesPage from "@/components/ResourcesPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Resources | Dylan Cramer",
  description:
    "Free guides and resources for endurance athletes. Ironman training, ultra marathon nutrition, and more from Dylan Cramer.",
};

export default function Resources() {
  return (
    <main className="bg-black">
      <Navigation />
      <ResourcesPage />
      <Footer />
    </main>
  );
}
