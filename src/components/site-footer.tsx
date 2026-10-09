import { socials, site } from "@/lib/site";
import { getCurrentYear } from "@/lib/build-info";
import { GitHubIcon, MailIcon, MediumIcon, XIcon } from "./icons";

const ICONS = {
  github: GitHubIcon,
  x: XIcon,
  medium: MediumIcon,
  mail: MailIcon,
} as const;

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-edge/70 bg-panel/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-faint">
          <p>
            <span className="text-accent">$</span> echo &quot;© {year} {site.name}
            &quot;
          </p>
          <p className="mt-1">
            Built with Next.js · deployed on Vercel ·{" "}
            <a href={site.repo} target="_blank" rel="noreferrer" className="text-muted underline hover:text-accent">
              this site is open source
            </a>
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {socials.map((s) => {
            const Icon = ICONS[s.id as keyof typeof ICONS];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.id === "mail" ? undefined : "_blank"}
                  rel={s.id === "mail" ? undefined : "noreferrer"}
                  className="flex h-9 items-center gap-2 rounded-md border border-edge bg-panel/60 px-3 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
