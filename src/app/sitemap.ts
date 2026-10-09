import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getBuildTimestamp } from "@/lib/build-info";

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
