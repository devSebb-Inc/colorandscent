import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getProducts, type StoreProduct } from "@/lib/data/products-db"
import { products as staticProducts, type Product } from "@/lib/data/products"
import { buildProductMetadata } from "@/lib/utils/seo"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/utils/json-ld"
import { ProductHero } from "@/components/storefront/pdp/ProductHero"
import { ProductStory } from "@/components/storefront/pdp/ProductStory"
import { WhyColorScent } from "@/components/storefront/pdp/WhyColorScent"
import { ProductFAQ } from "@/components/storefront/pdp/ProductFAQ"
import { RelatedProducts } from "@/components/storefront/pdp/RelatedProducts"
import type { ProductWithDetails } from "@/lib/types/product"

interface Props {
  params: Promise<{ slug: string }>
}

function staticToStoreProduct(p: Product): StoreProduct {
  const galleryUrls = (p as Product & { galleryImages?: string[] }).galleryImages ?? []
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.name,
    subtitle: p.subtitle,
    price: p.price,
    originalPrice: p.originalPrice,
    badge: p.badge,
    badgeColor: p.badgeColor,
    category: p.category,
    tags: p.tags,
    emoji: p.emoji,
    description: p.description,
    image: p.image,
    color: p.color,
    colorHex: p.colorHex,
    images: [
      {
        id: `${p.id}-primary`,
        url: p.image,
        altText: p.name,
        position: 0,
        isPrimary: true,
        variantColor: p.color,
      },
      ...galleryUrls.map((url, idx) => ({
        id: `${p.id}-gallery-${idx}`,
        url,
        altText: p.name,
        position: idx + 1,
        isPrimary: false,
        variantColor: p.color,
      })),
    ],
    variants: [
      {
        id: `${p.id}-v-default`,
        size: "One Size",
        color: p.color,
        colorHex: p.colorHex,
        printifyVariantId: null,
      },
    ],
    scentFamily: p.scentFamily,
    topNotes: p.topNotes,
    heartNotes: p.heartNotes,
    baseNotes: p.baseNotes,
    scentScene: p.scentScene,
    roomFit: p.roomFit,
    strength: p.strength,
    season: p.season,
  }
}

function toProductWithDetails(product: StoreProduct): ProductWithDetails {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle || null,
    description: product.description || null,
    priceCents: Math.round(product.price * 100),
    compareAtPriceCents: Math.round(product.originalPrice * 100) || null,
    category: product.category,
    tags: product.tags,
    badge: product.badge || null,
    badgeColor: product.badgeColor || null,
    emoji: product.emoji || null,
    isFeatured: null,
    seoTitle: null,
    seoDescription: null,
    ogImageUrl: null,
    scentFamily: product.scentFamily ?? null,
    scentNotes: product.topNotes || product.heartNotes || product.baseNotes ? {
      top: product.topNotes ?? [],
      heart: product.heartNotes ?? [],
      base: product.baseNotes ?? [],
    } : null,
    scentScene: product.scentScene ?? null,
    roomFit: product.roomFit ?? null,
    strength: product.strength ?? null,
    season: product.season ?? null,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      size: variant.size,
      color: variant.color,
      colorHex: variant.colorHex,
      sku: variant.printifyVariantId,
      priceCents: Math.round(product.price * 100),
      stockStatus: null,
    })),
    images: product.images.length > 0
      ? product.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          position: img.position,
          isPrimary: img.isPrimary,
          variantColor: img.variantColor,
        }))
      : [
          {
            id: `${product.id}-primary`,
            url: product.image,
            altText: product.title,
            position: 0,
            isPrimary: true,
            variantColor: product.color ?? null,
          },
        ],
  }
}

function withCandleDescription(description?: string | null, fallback?: string | null) {
  const base = description ?? fallback ?? ""
  const phrase = "soy wax candle"

  if (!base) {
    return `Premium ${phrase} with original COLOR & SCENT fragrance and mood-led color design.`
  }

  if (base.toLowerCase().includes(phrase.toLowerCase())) {
    return base
  }

  return `${base} Mood-led candle with structured top, heart, and base notes.`
}

export async function generateStaticParams() {
  // Generate from both static and DB products
  const dbProducts = await getProducts().catch(() => [] as StoreProduct[])
  return [...staticProducts, ...dbProducts].map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    // Try static first, then DB
    const staticProd = staticProducts.find((p) => p.slug === slug)
    const product = staticProd
      ? staticToStoreProduct(staticProd)
      : await getProductBySlug(slug)
    if (!product) return {}

    return await buildProductMetadata({
      title: product.title,
      description: withCandleDescription(product.description, product.subtitle),
      slug: product.slug,
      image: product.image,
      priceCents: Math.round(product.price * 100),
    })
  } catch {
    return {}
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

  // Try static product data first, fall back to Supabase
  const staticProd = staticProducts.find((p) => p.slug === slug)
  const product = staticProd
    ? staticToStoreProduct(staticProd)
    : await getProductBySlug(slug)
  if (!product) notFound()

  const productDetails = toProductWithDetails(product)
  const allDb = await getProducts().catch(() => [] as StoreProduct[])
  const allStatic = staticProducts.map(staticToStoreProduct)
  const allProducts = [...allStatic, ...allDb]
  const related = allProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3)
    .map(toProductWithDetails)

  const seoDescription = withCandleDescription(
    productDetails.description,
    productDetails.subtitle,
  )

  const structuredData = [
    productJsonLd({
      name: productDetails.title,
      description: seoDescription,
      images: productDetails.images.map((image) => image.url),
      slug: productDetails.slug,
      priceCents: productDetails.priceCents,
      compareAtPriceCents: productDetails.compareAtPriceCents ?? undefined,
      isAvailable: true,
      withAggregateRating: false,
    }),
    breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: productDetails.title },
    ]),
  ]

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <ProductHero product={productDetails} />

      {productDetails.description && (
        <ProductStory
          subtitle={productDetails.subtitle ?? ""}
          description={productDetails.description}
        />
      )}

      <WhyColorScent />
      <RelatedProducts products={related} />
      <ProductFAQ />
    </>
  )
}