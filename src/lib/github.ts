import { cacheLife } from "next/cache";

/**
 * Pulls public, non-fork repositories for the owner straight from the GitHub
 * API. Cached with Next's `use cache` so it becomes part of the static shell
 * and refreshes in the background, without a build-time secret.
 *
 * Set GITHUB_TOKEN in the hosting environment to raise the rate limit (the
 * unauthenticated API allows 60 requests/hour per IP).
 */

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  /** Human label like "3d ago", computed against the cache's generation time. */
  pushedLabel: string;
  topics: string[];
};

const OWNER = "nimeetshah0";

/** Repos to surface first, in this order. Everything else follows by recency. */
const FEATURED = [
  "pepper",
  "pi-subagents",
  "claude-mobile",
  "minesweeper",
  "jobstable",
  "capturetheflag",
  "react-tic-tac-toe",
  "roomba-automation",
];

/** Repos that exist publicly but should not be listed (private-source products). */
const HIDDEN = new Set(["gbad", "doctick"]);

const LIMIT = 9;

export async function getRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");

  // Captured inside the cache scope so the relative labels are stable and the
  // build never reads the current time during prerendering.
  const now = Date.now();

  try {
    const res = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });

    if (!res.ok) return [];

    const raw = (await res.json()) as Array<Record<string, unknown>>;

    const repos: Repo[] = raw
      .filter((r) => !r.fork && !r.archived && !r.disabled && !HIDDEN.has(String(r.name)))
      .map((r) => ({
        name: String(r.name),
        description: (r.description as string | null) ?? null,
        url: String(r.html_url),
        homepage: (r.homepage as string | null) || null,
        language: (r.language as string | null) ?? null,
        stars: Number(r.stargazers_count ?? 0),
        pushedAt: String(r.pushed_at ?? ""),
        pushedLabel: relativeDate(String(r.pushed_at ?? ""), now),
        topics: Array.isArray(r.topics) ? (r.topics as string[]) : [],
      }));

    return repos
      .sort((a, b) => {
        const ai = FEATURED.indexOf(a.name);
        const bi = FEATURED.indexOf(b.name);
        if (ai !== -1 || bi !== -1) {
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        }
        return b.pushedAt.localeCompare(a.pushedAt);
      })
      .slice(0, LIMIT);
  } catch {
    return [];
  }
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#da5b0b",
  Go: "#00add8",
  Rust: "#dea584",
  Shell: "#89e051",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Dart: "#00b4ab",
  Elixir: "#6e4a7e",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  "Objective-C": "#438eff",
  Makefile: "#427819",
};

function relativeDate(iso: string, now: number): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.round((now - then) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

export function languageColor(language: string | null): string {
  if (!language) return "var(--color-faint)";
  return LANGUAGE_COLORS[language] ?? "var(--color-muted)";
}

export function repoDisplayName(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
