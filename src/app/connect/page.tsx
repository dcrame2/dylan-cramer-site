import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ConnectPage from "@/components/ConnectPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Connect | Dylan Cramer",
  description:
    "Connect with Dylan Cramer. Follow on Instagram, TikTok, and YouTube. Open to collaborations, brand partnerships, and speaking.",
};

export default function Connect() {
  return (
    <main className="bg-black">
      <Navigation />
      <ConnectPage />
      <Footer />
    </main>
  );
}
