import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import InstacalPage from "@/components/InstacalPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "InstaCal | Dylan Cramer",
  description:
    "InstaCal - AI-powered calorie tracker with social features. Snap a photo to track macros, chat with an AI dietitian, and share meals with friends.",
};

export default function Instacal() {
  return (
    <main className="bg-black">
      <Navigation />
      <InstacalPage />
      <Footer />
    </main>
  );
}
