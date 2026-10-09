import { socials, site } from "@/lib/site";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { GitHubIcon, MailIcon, MediumIcon, XIcon } from "./icons";

const ICONS = {
  github: GitHubIcon,
  x: XIcon,
  medium: MediumIcon,
  mail: MailIcon,
} as const;

const FOCUS = [
  { label: "Senior Software Engineer at Podium", detail: "podium.com" },
  { label: "Chrome extensions", detail: "Badgy, Pepper" },
  { label: "Google Drive / Workspace apps", detail: "DocTick" },
  { label: "Open-source tooling", detail: "Pepper, pi-subagents" },
  { label: "Web toys & experiments", detail: "Minesweeper, Media Player" },
];

export function About() {
  return (
    <Section id="about" eyebrow="whoami --verbose" title="About">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m <span className="text-ink">Nimeet Shah</span> — a{" "}
              {site.work.title.toLowerCase()} at{" "}
              <a
                href={site.work.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-edge-2 underline-offset-4 transition-colors hover:text-accent"
              >
                {site.work.company}
              </a>
              , and a builder who likes turning small annoyances into sharp tools. Most of what I
              make starts as a thing I wanted and couldn&apos;t find.
            </p>
            <p>
              These days that means{" "}
              <span className="text-ink">Badgy</span> for wrestling Gmail attachments,{" "}
              <span className="text-ink">DocTick</span> for firms collecting client documents into
              their own Google Drive, and <span className="text-ink">Pepper</span> for reading the
              machine-written pull requests we all have to review now.
            </p>
            <p>
              I&apos;m a dad, husband, engineer and physics enthusiast. I write occasionally about
              the things I build — usually the moment I&apos;ve just figured them out.
            </p>
            <p className="font-mono text-sm text-faint">
              &quot;Languages are tools to build great products.&quot;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-xl border border-edge bg-panel/50 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-faint">Currently</h3>
            <ul className="mt-4 space-y-4">
              {FOCUS.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm text-ink">{f.label}</p>
                    <p className="font-mono text-xs text-faint">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-edge pt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">Elsewhere</h3>
              <ul className="mt-3 space-y-1.5">
                {socials.map((s) => {
                  const Icon = ICONS[s.id as keyof typeof ICONS];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target={s.id === "mail" ? undefined : "_blank"}
                        rel={s.id === "mail" ? undefined : "noreferrer"}
                        className="group flex items-center gap-3 rounded-md px-2 py-1.5 -mx-2 transition-colors hover:bg-panel-2"
                      >
                        <Icon className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                        <span className="text-sm text-ink">{s.label}</span>
                        <span className="ml-auto font-mono text-xs text-faint">{s.handle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-edge-2 bg-gradient-to-r from-panel to-panel-2 p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-ink">Got something worth building?</h3>
            <p className="mt-1 text-sm text-muted">
              The fastest way to reach me is email or X. I read everything.
            </p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-[#05170d] transition-transform hover:-translate-y-0.5"
          >
            <MailIcon className="h-4 w-4" />
            {site.email}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
