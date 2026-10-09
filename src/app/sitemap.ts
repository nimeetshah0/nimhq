import type { MetadataRoute } from "next";
import { getBuildTimestamp } from "@/lib/build-info";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getBuildTimestamp();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
