import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ContentSection from "@/components/ContentSection";
import InstaCal from "@/components/InstaCal";
import ResourcesTeaser from "@/components/ResourcesTeaser";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <Hero />
      <About />
      <InstaCal />
      <ResourcesTeaser />
      <ContentSection />
      <FAQ />
      <Footer />
    </main>
  );
}
