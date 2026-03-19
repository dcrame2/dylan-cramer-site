import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import InstaCal from "@/components/InstaCal";
import ContentSection from "@/components/ContentSection";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <InstaCal />
      <ContentSection />
      <ConnectSection />
      <Footer />
    </main>
  );
}
