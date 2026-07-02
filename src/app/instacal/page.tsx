import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import InstacalPage from "@/components/InstacalPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "InstaCal | Dylan Cramer",
  description:
    "InstaCal: AI-powered calorie tracker with social features. Snap a photo to track macros, chat with an AI dietitian, and share meals with friends.",
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "InstaCal",
  operatingSystem: "iOS, Android",
  applicationCategory: "HealthApplication",
  description:
    "AI-powered calorie tracker with social features. Snap a photo to track macros, chat with an AI dietitian, and share meals with friends.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Dylan Cramer",
    url: "https://dylancramer.com",
  },
  downloadUrl: "https://apps.apple.com/us/app/instacal/id6743951306",
  url: "https://theinstacal.app",
};

export default function Instacal() {
  return (
    <main className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Navigation />
      <InstacalPage />
      <Footer />
    </main>
  );
}
