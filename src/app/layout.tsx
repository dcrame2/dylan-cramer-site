import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "Software developer by day, Ironman athlete & ultrarunner by night. Training for Ironman Lake Placid 2026. Follow the journey on Instagram, TikTok & YouTube.",
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
      "Software dev. Ironman finisher. 100-mile ultrarunner. Building InstaCal. Training for Ironman Lake Placid July 2026.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Cramer | Ironman Athlete, Ultrarunner & Creator",
    description:
      "Software dev. Ironman finisher. 100-mile ultrarunner. Building InstaCal. Training for Ironman Lake Placid July 2026.",
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
        {children}
      </body>
    </html>
  );
}
