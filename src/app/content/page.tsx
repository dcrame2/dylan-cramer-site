import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContentPage from "@/components/ContentPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Content | Dylan Cramer",
  description:
    "Follow Dylan's journey on Instagram, TikTok, and YouTube. Raw, authentic content documenting Ironman training, ultrarunning, app building, and living life.",
};

export default function Content() {
  return (
    <main className="bg-black">
      <Navigation />
      <ContentPage />
      <Footer />
    </main>
  );
}
