import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingCTA from "@/components/FloatingCTA";
import "./globals.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dylan Cramer",
  url: "https://dylancramer.com",
  description:
    "Software developer, Ironman finisher, 100-mile ultrarunner, and founder of the InstaCal nutrition app.",
  jobTitle: "Software Developer & App Founder",
  sameAs: [
    "https://www.instagram.com/cramerdyl/",
    "https://www.tiktok.com/@dylcramer",
    "https://www.youtube.com/@dylcramer",
    "https://theinstacal.app",
  ],
  knowsAbout: [
    "Ironman triathlon training",
    "Ultramarathon running",
    "Sports nutrition",
    "Software development",
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dylancramer.com"),
  title: "Dylan Cramer | Ironman Athlete, Ultrarunner & Creator",
  description:
    "Software developer by day, Ironman athlete & ultrarunner by night. Training for Ironman California 2026. Follow the journey on Instagram, TikTok & YouTube.",
  keywords: [
    "Dylan Cramer",
    "Ironman",
    "ultramarathon",
    "triathlon",
    "content creator",
    "InstaCal",
    "endurance athlete",
    "software developer",
  ],
  openGraph: {
    title: "Dylan Cramer | Ironman Athlete, Ultrarunner & Creator",
    description:
      "Software dev. Ironman finisher. 100-mile ultrarunner. Building InstaCal. Training for Ironman California October 2026.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Cramer | Ironman Athlete, Ultrarunner & Creator",
    description:
      "Software dev. Ironman finisher. 100-mile ultrarunner. Building InstaCal. Training for Ironman California October 2026.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
