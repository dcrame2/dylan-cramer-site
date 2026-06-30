import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import HubPage from "@/components/HubPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dylan Cramer | The Hub",
  description:
    "The front door to everything Dylan Cramer — Ironman athlete, ultrarunner, developer, and creator. Get InstaCal, grab the free training guides, and join the email crew.",
  openGraph: {
    title: "Dylan Cramer | The Hub",
    description:
      "Ironman · Ultrarunner · Builder · Creator. Get InstaCal, the free training guides, and join the crew.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function Hub() {
  return (
    <main className="bg-black">
      <Navigation />
      <HubPage />
      <Footer />
    </main>
  );
}
