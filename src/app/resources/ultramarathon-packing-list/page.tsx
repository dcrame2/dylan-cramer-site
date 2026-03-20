import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import UltramarathonPackingList from "@/components/UltramarathonPackingList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ultramarathon Packing List | Dylan Cramer",
  description:
    "The complete ultramarathon packing list from a 100-mile finisher. Clothing, fuel, gear, and pain relief — everything you need on race day.",
};

export default function UltramarathonPackingListPage() {
  return (
    <main className="bg-black">
      <Navigation />
      <UltramarathonPackingList />
      <Footer />
    </main>
  );
}
