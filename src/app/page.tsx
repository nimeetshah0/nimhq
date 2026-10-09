import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { OpenSource } from "@/components/open-source";
import { Writing } from "@/components/writing";
import { About } from "@/components/about";

// GitHub and Medium data are cached with `use cache` + `cacheLife('hours')`
// in src/lib, so this page is served from the static shell and refreshed in
// the background. See src/lib/github.ts and src/lib/medium.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <OpenSource />
      <Writing />
      <About />
    </>
  );
}
