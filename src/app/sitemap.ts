import type { MetadataRoute } from "next";

const BASE_URL = "https://dylancramer.com";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/instacal", priority: 0.9, changeFrequency: "monthly" },
  { path: "/links", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/connect", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/ironman-training-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/ultra-marathon-nutrition", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/9-to-5-ironman-training", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/race-day-nutrition-strategy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/ultramarathon-packing-list", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/long-distance-cycling-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/content-creation-for-athletes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/open-water-swimming-guide", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
