import { site } from "@/lib/data";

export default function sitemap() {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/gizlilik`, lastModified: new Date("2026-10-22"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
