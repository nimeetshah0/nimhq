import { getPosts } from "@/lib/medium";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { ArrowUpRightIcon, MediumIcon } from "./icons";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function Writing() {
  const posts = await getPosts();

  return (
    <Section
      id="writing"
      eyebrow="cat ~/writing"
      title="Writing"
      description="Occasional notes on the tools I build, Gmail, and the physics of time. Most of it lives on Medium."
    >
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-edge-2 bg-panel/40 p-8 text-center font-mono text-sm text-muted">
          No posts loaded right now.{" "}
          <a href="https://medium.com/@nimeetshah" target="_blank" rel="noreferrer" className="text-accent underline">
            Read on Medium →
          </a>
        </div>
      ) : (
        <ul className="divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-panel/50">
          {posts.map((post, i) => (
            <Reveal key={post.url} delay={i * 50}>
              <li>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-panel-2/70 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 font-mono text-[11px] text-faint">
                    <span>{formatDate(post.date)}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{post.readingTime} min</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <a
          href="https://medium.com/@nimeetshah"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
        >
          <MediumIcon className="h-4 w-4" />
          medium.com/@nimeetshah
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
