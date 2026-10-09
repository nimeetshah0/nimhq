import { products, type Product, type ProductStatus } from "@/lib/site";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { CodeIcon, GlobeIcon, StoreIcon, ArrowUpRightIcon } from "./icons";

const STATUS_STYLES: Record<ProductStatus, string> = {
  live: "border-accent/30 bg-accent/10 text-accent",
  beta: "border-amber/30 bg-amber/10 text-amber",
  experiment: "border-edge-2 bg-panel-2 text-faint",
};

function LinkIcon({ kind }: { kind: "web" | "store" | "code" }) {
  const className = "h-3.5 w-3.5 shrink-0";
  if (kind === "store") return <StoreIcon className={className} />;
  if (kind === "code") return <CodeIcon className={className} />;
  return <GlobeIcon className={className} />;
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col rounded-xl border border-edge bg-panel/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-edge-2 hover:bg-panel">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }}
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: product.accent, boxShadow: `0 0 12px ${product.accent}` }}
            />
            <h3 className="text-lg font-semibold tracking-tight text-ink">{product.name}</h3>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLES[product.status]}`}
          >
            {product.status}
          </span>
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-faint">{product.kind}</p>

        <p className="mt-3 text-[15px] font-medium text-ink">{product.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {product.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-edge-2 bg-canvas/60 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <LinkIcon kind={link.kind} />
              {link.label}
              <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </a>
          ))}
          {product.openSource ? (
            <span className="rounded-md border border-edge px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-faint">
              open source
            </span>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

export function Products() {
  return (
    <Section
      id="products"
      eyebrow="ls ~/products"
      title="Things I build and run"
      description="A small shelf of products — some commercial, some open source, some just for fun. All built and maintained by me."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 60} />
        ))}
      </div>
    </Section>
  );
}
