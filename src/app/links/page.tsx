import type { Metadata } from "next";
import LinksPage from "@/components/LinksPage";

export const metadata: Metadata = {
  title: "Links | Dylan Cramer",
  description:
    "All of Dylan Cramer's links in one place: InstaCal app, Instagram, TikTok, YouTube, free training guides, and more.",
};

export default function Links() {
  return <LinksPage />;
}
