import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PortfolioPage from "@/components/PortfolioPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Portfolio | Dylan Cramer",
  description:
    "Websites built by Dylan Cramer — custom-designed, mobile-first sites for creators, athletes, and small businesses. See the work.",
};

export default function Portfolio() {
  return (
    <main className="bg-black">
      <Navigation />
      <PortfolioPage />
      <Footer />
    </main>
  );
}
