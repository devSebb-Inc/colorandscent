import type { Metadata } from "next"
import { ProductSection } from "@/components/storefront/ProductSection"
import { ScentFinderTeaser } from "@/components/storefront/ScentFinderTeaser"
import { buildMetadata } from "@/lib/utils/seo"

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await buildMetadata({
      title: "Shop All Scents",
      description: "Browse mood-led candles by scent family, notes, color, strength, and room fit.",
      path: "/products",
    })
  } catch { return {} }
}

export default async function ProductsPage() {
  return (
    <>
      <section className="atelier-paper px-4 py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Shop all scents</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.78] tracking-[-0.06em]">Find the color your room is missing.</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">Filter by scent mood and choose with top, heart, and base notes visible before the product page.</p>
        </div>
      </section>
      <ProductSection />
      <ScentFinderTeaser />
    </>
  )
}
