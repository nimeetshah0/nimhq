import { cacheLife } from "next/cache";

/**
 * Reads the Medium RSS feed for the author and turns it into posts for the
 * Writing section. Parsed by hand (the feed shape is stable) to avoid pulling
 * an XML dependency into the bundle. Cached like the repos.
 */

export type Post = {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  readingTime: number;
};

const FEED = "https://medium.com/feed/@nimeetshah";
const LIMIT = 4;

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(FEED, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; nimhq/1.0)" },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    return parseFeed(xml).slice(0, LIMIT);
  } catch {
    return [];
  }
}

function parseFeed(xml: string): Post[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  const posts: Post[] = [];

  for (const item of items) {
    const title = cdata(item, "title");
    const url = first(item, /<link>(https?:\/\/[^<]+)<\/link>/);
    const pubDate = first(item, /<pubDate>([^<]+)<\/pubDate>/);
    const content = cdata(item, "content:encoded");
    if (!title || !url) continue;

    const body = stripHtml(content);
    posts.push({
      title: decodeEntities(title),
      url: url.replace(/\?source=rss.*$/, ""),
      date: pubDate ? new Date(pubDate).toISOString() : "",
      excerpt: truncate(body, 180),
      readingTime: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
    });
  }

  return posts;
}

function first(block: string, re: RegExp): string {
  const m = block.match(re);
  return m?.[1] ?? "";
}

function cdata(block: string, tag: string): string {
  const re = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`);
  const m = block.match(re);
  if (m) return m[1];
  return first(block, new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8212;/g, "—");
}
