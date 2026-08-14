import type { Metadata } from "next"
import { HeroBanner } from "@/components/storefront/HeroBanner"
import { ProductSection } from "@/components/storefront/ProductSection"
import { NewsletterSignup } from "@/components/storefront/NewsletterSignup"
import { TrustServiceRow } from "@/components/storefront/TrustServiceRow"
import { ScentFinderTeaser } from "@/components/storefront/ScentFinderTeaser"
import { GiftBundleTeaser } from "@/components/storefront/GiftBundleTeaser"
import { buildMetadata } from "@/lib/utils/seo"
import { organizationJsonLd, websiteJsonLd } from "@/lib/utils/json-ld"

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await buildMetadata({
      title: "COLOR & SCENT | Cozy Candles & Thoughtful Gifts",
      description: "Elegant scented candles for thoughtful gifts, cozy rooms, and everyday rituals.",
      path: "/",
    })
  } catch {
    return {}
  }
}

function AtelierNote() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">A warmer way to gift</p>
        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-6xl">A candle should feel chosen, not generic.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Every candle pairs scent notes with room feel and occasion cues, so it is easier to choose something that feels thoughtful before it is ever lit.</p>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()]

  return (
    <>
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <div className="bg-[#F6F0E7] text-[#171412]">
        <HeroBanner />
        <div className="px-4 py-6">
          <div className="mx-auto max-w-[1400px]"><TrustServiceRow /></div>
        </div>
        <ProductSection />
        <ScentFinderTeaser />
        <GiftBundleTeaser />
        <AtelierNote />
        <NewsletterSignup />
      </div>
    </>
  )
}
