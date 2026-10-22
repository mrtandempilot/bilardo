import { site } from "@/lib/data";

export default function sitemap() {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
