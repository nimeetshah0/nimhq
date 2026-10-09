import { getRepos, languageColor, repoDisplayName } from "@/lib/github";
import { site } from "@/lib/site";
import { ArrowUpRightIcon, GitHubIcon, StarIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export async function OpenSource() {
  const repos = await getRepos();

  return (
    <Section
      id="open-source"
      eyebrow={`gh repo list ${site.githubHandle}`}
      title="Open source"
      description="Selected public repositories, pulled live from GitHub. Want the full list? It's all on my profile."
    >
      {repos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-edge-2 bg-panel/40 p-8 text-center font-mono text-sm text-muted">
          Couldn&apos;t reach GitHub right now.{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline"
          >
            Browse the profile directly →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 50} className="h-full">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-xl border border-edge bg-panel/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-edge-2 hover:bg-panel"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-mono text-sm text-ink">
                    <GitHubIcon className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                    {repo.name}
                  </span>
                  <ArrowUpRightIcon className="h-4 w-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {repo.description || repoDisplayName(repo.name)}
                </p>

                {repo.topics.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded border border-edge px-1.5 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-faint">
                  {repo.language ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: languageColor(repo.language),
                        }}
                      />
                      {repo.language}
                    </span>
                  ) : null}
                  {repo.stars > 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <StarIcon className="h-3 w-3" />
                      {repo.stars}
                    </span>
                  ) : null}
                  <span className="ml-auto">{repo.pushedLabel}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-8">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-80"
        >
          <GitHubIcon className="h-4 w-4" />
          github.com/{site.githubHandle}
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
