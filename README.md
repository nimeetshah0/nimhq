# nimhq

The headquarters of Nimeet Shah — a small, fast, open-source portfolio for
[Badgy](https://getbadgy.com), [DocTick](https://doctick.com),
[Pepper](https://github.com/nimeetshah0/pepper) and a shelf of experiments.
Live at **[nimhq.com](https://nimhq.com)**.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first tokens in `src/app/globals.css`)
- Deployed on **Vercel**

No database, no CMS. All content is either hand-written in `src/lib/site.ts`
or pulled live from public APIs.

## Sections

| Section | Source |
| --- | --- |
| Hero | `src/components/hero.tsx` |
| Products | `src/lib/site.ts` → `products[]` |
| Open source | GitHub REST API (`src/lib/github.ts`) |
| Writing | Medium RSS feed (`src/lib/medium.ts`) |
| About | `src/components/about.tsx` |

The GitHub and Medium data are fetched server-side, cached with
`use cache` + `cacheLife('hours')`, and refreshed in the background — so the
page is served as a static shell but stays current without a redeploy.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Optional: copy `.env.example` to `.env.local` and add a `GITHUB_TOKEN` to raise
the GitHub API rate limit during development.

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
```

## Editing content

Almost everything lives in **`src/lib/site.ts`** — your name, links, social
handles, and the product list. Add a product by appending to the `products`
array; it shows up in the grid and in the hero terminal automatically.

Repos are filtered and ordered in **`src/lib/github.ts`**:

- `FEATURED` — repos to surface first, in order
- `HIDDEN` — repos to omit (e.g. private-source products)
- `LIMIT` — how many cards to show

Forks, archived and disabled repos are excluded automatically.

## Deploying

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected automatically, no build settings needed.
3. Add the domain `nimhq.com` in **Project → Settings → Domains** and point your
   DNS (Namecheap) at Vercel:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
4. Point the subdomains at their existing deployments:
   - `minesweeper` → `CNAME cname.vercel-dns.com`
   - `media-player` → `CNAME cname.vercel-dns.com`

Optionally set `GITHUB_TOKEN` in **Project → Settings → Environment Variables**
to raise the API rate limit.

## License

[MIT](./LICENSE) © Nimeet Shah
