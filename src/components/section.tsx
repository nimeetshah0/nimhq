import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-edge/70 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs tracking-wide text-accent">
            <span className="text-faint">$</span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
