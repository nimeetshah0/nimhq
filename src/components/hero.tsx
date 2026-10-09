import { products, site } from "@/lib/site";
import { ArrowIcon, GitHubIcon, TerminalIcon } from "./icons";

function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-edge-2 bg-panel/80 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose/70" />
        <span className="h-3 w-3 rounded-full bg-amber/70" />
        <span className="h-3 w-3 rounded-full bg-accent/70" />
        <span className="ml-2 font-mono text-xs text-faint">
          nimeet@nimhq — ~/products
        </span>
      </div>
      <div className="px-4 py-4 font-mono text-[13px] leading-7">
        <p className="text-muted">
          <span className="text-accent">$</span> ls -1 ~/products
        </p>
        <ul className="mt-1">
          {products.map((p) => (
            <li key={p.id} className="flex items-baseline gap-3">
              <span className="text-ink">{p.id}</span>
              <span className="hidden flex-1 border-b border-dashed border-edge/80 sm:block" />
              <span className="hidden text-faint sm:inline">{p.kind}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-muted">
          <span className="text-accent">$</span>{" "}
          <span className="animate-blink">▋</span>
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div
        aria-hidden
        className="glow-accent pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 animate-drift opacity-60"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
        <div className="animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-edge-2 bg-panel/70 px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            building in public
          </div>

          <p className="mt-6 font-mono text-sm text-accent">
            <span className="text-faint">nimeet@nimhq</span>:~$ whoami
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {site.name}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.work.title} at{" "}
            <a
              href={site.work.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-edge-2 underline-offset-4 transition-colors hover:text-accent"
            >
              {site.work.company}
            </a>
            . This is <span className="font-mono text-ink">nimhq</span> — the
            headquarters for everything I ship on the side: Chrome extensions,
            SaaS, open source, and the occasional game.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-[#05170d] transition-transform hover:-translate-y-0.5"
            >
              Explore products
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-edge-2 bg-panel/60 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 font-mono text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-accent" /> type-safe
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> 3 products
              live
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" /> open by
              default
            </span>
          </div>
        </div>

        <div className="animate-rise [animation-delay:120ms]">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}
