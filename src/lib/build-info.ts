import { cacheLife } from "next/cache";

/**
 * Values derived from the current time can't be read during prerendering unless
 * they're cached. This bakes the copyright year at build time (refreshed in the
 * background like the rest of the page data).
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("max");

  return new Date().getFullYear();
}

/** Build-time timestamp + copyright year, cached for use in metadata routes. */
export async function getBuildTimestamp(): Promise<string> {
  "use cache";
  cacheLife("max");

  return new Date().toISOString();
}
