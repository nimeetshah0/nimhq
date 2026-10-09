import Link from "next/link";
import { nav, site } from "@/lib/site";
import { GitHubIcon, XIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/70 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm text-ink"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-edge-2 bg-panel text-accent">
            <span className="text-[11px] leading-none">&gt;_</span>
          </span>
          <span className="font-semibold tracking-tight">{site.brand}</span>
          <span className="hidden text-faint sm:inline">/ {site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-panel hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/nimeetshah"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-panel hover:text-ink"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
