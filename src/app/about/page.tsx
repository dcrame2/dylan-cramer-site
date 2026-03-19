import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Dylan Cramer",
  description:
    "Software developer, Ironman finisher, 100-mile ultrarunner, and content creator. Training for Ironman Lake Placid 2026.",
};

export default function About() {
  return (
    <main className="bg-black">
      <Navigation />
      <AboutPage />
      <Footer />
    </main>
  );
}
