import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PortfolioPage from "@/components/PortfolioPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | Dylan Cramer",
  description:
    "Websites, web apps, and mobile apps built by Dylan Cramer — custom-designed, mobile-first digital products for creators, athletes, and small businesses.",
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
