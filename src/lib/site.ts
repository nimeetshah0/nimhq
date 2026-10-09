export const site = {
  name: "Nimeet Shah",
  brand: "nimhq",
  url: "https://nimhq.com",
  repo: "https://github.com/nimeetshah0/nimhq",
  tagline: "Tools for the people who move a little faster than the software.",
  description:
    "nimhq is the headquarters of Nimeet Shah — a senior software engineer at Podium building small, sharp products: Badgy, DocTick, Pepper and a shelf of open-source experiments.",
  work: {
    title: "Senior Software Engineer",
    company: "Podium",
    url: "https://www.podium.com/",
  },
  email: "contact@nimhq.com",
  github: "https://github.com/nimeetshah0",
  githubHandle: "nimeetshah0",
} as const;

export const socials = [
  { id: "github", label: "GitHub", handle: "@nimeetshah0", href: site.github },
  { id: "x", label: "X", handle: "@nimeetshah", href: "https://x.com/nimeetshah" },
  { id: "medium", label: "Medium", handle: "@nimeetshah", href: "https://medium.com/@nimeetshah" },
  { id: "mail", label: "Email", handle: site.email, href: `mailto:${site.email}` },
] as const;

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Open source", href: "#open-source" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
] as const;

export type ProductStatus = "live" | "beta" | "experiment";
export type ProductLinkKind = "web" | "store" | "code";

export type Product = {
  id: string;
  name: string;
  kind: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  accent: string;
  openSource: boolean;
  links: { label: string; href: string; kind: ProductLinkKind }[];
};

export const products: Product[] = [
  {
    id: "badgy",
    name: "Badgy",
    kind: "Chrome extension",
    status: "live",
    tagline: "Gmail attachments, in bulk.",
    description:
      "Download and print attachments from many Gmail emails at once — straight into an organized ZIP or your Google Drive. Runs 100% client-side.",
    accent: "var(--color-accent)",
    openSource: false,
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/badgy-gmail-attachments-m/obhanchbaamjoipmpaccmigfofpjocde",
        kind: "store",
      },
      { label: "getbadgy.com", href: "https://getbadgy.com", kind: "web" },
    ],
  },
  {
    id: "doctick",
    name: "DocTick",
    kind: "Web app · SaaS",
    status: "live",
    tagline: "Client documents, straight to your Drive.",
    description:
      "The zero-login document checklist for accounting and professional firms. Clients upload through a magic link; files stream into your own Google Drive — no vendor cloud, no passwords.",
    accent: "var(--color-cyan)",
    openSource: false,
    links: [{ label: "doctick.com", href: "https://doctick.com", kind: "web" }],
  },
  {
    id: "pepper",
    name: "Pepper",
    kind: "Chrome extension · open source",
    status: "live",
    tagline: "Your companion through long PRs.",
    description:
      "Adds a categorized view to the GitHub pull-request file tree plus a keyboard-driven review story — so a 900-line AI diff reads as core changes, cosmetics, tests and generated noise.",
    accent: "var(--color-amber)",
    openSource: true,
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/pepper/hbgljjmjbhehhgehoffdojjlejeahmhc",
        kind: "store",
      },
      { label: "Source", href: "https://github.com/nimeetshah0/pepper", kind: "code" },
    ],
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    kind: "Web game · experiment",
    status: "experiment",
    tagline: "The classic, rebuilt.",
    description:
      "A Minesweeper clone built with TypeScript and React. No install, no account — just click.",
    accent: "var(--color-violet)",
    openSource: true,
    links: [
      { label: "minesweeper.nimhq.com", href: "https://minesweeper.nimhq.com", kind: "web" },
      { label: "Source", href: "https://github.com/nimeetshah0/minesweeper", kind: "code" },
    ],
  },
  {
    id: "media-player",
    name: "Media Player",
    kind: "Web app · experiment",
    status: "experiment",
    tagline: "A Linear-inspired media player.",
    description:
      "A minimal media player for the browser, with a Linear-inspired interface.",
    accent: "var(--color-rose)",
    openSource: false,
    links: [{ label: "media-player.nimhq.com", href: "https://media-player.nimhq.com", kind: "web" }],
  },
];
