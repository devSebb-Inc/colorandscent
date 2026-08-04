import type { Metadata } from "next"
import { HeroBanner } from "@/components/storefront/HeroBanner"
import { MarqueeStrip } from "@/components/storefront/MarqueeStrip"
import { ProductSection } from "@/components/storefront/ProductSection"
import { ReviewsSection } from "@/components/storefront/ReviewsSection"
import { ValueProps } from "@/components/storefront/ValueProps"
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup"
import { getProducts } from "@/lib/data/products-db"
import { buildMetadata } from "@/lib/utils/seo"
import { organizationJsonLd, websiteJsonLd } from "@/lib/utils/json-ld"

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await buildMetadata({
      title: "COLOR & SCENT | Premium Candles & Home Fragrance",
      description:
        "Discover Your Signature Scent. Hand-poured candles and curated home fragrance that transforms your space.",
      path: "/",
    })
  } catch {
    return {}
  }
}

export default async function HomePage() {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()]
  const products = await getProducts()

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <HeroBanner products={products} />
      <MarqueeStrip />
      <ProductSection products={products} />
      <ReviewsSection />
      <ValueProps />
      <NewsletterSignup />
    </>
  )
}
