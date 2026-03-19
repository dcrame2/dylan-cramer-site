import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContentCreationGuide from "@/components/ContentCreationGuide";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Content Creation Guide for Athletes | Dylan Cramer",
  description:
    "How to document your athletic journey without it killing your training. Filming tips, editing workflow, growing on Instagram Reels and TikTok, storytelling frameworks, and building an authentic athlete brand.",
};

export default function ContentCreationForAthletesPage() {
  return (
    <main className="bg-black">
      <Navigation />
      <ContentCreationGuide />
      <Footer />
    </main>
  );
}
