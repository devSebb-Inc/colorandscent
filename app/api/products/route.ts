// ── Storefront Products API ──
// Fetches from Supabase (live) with is_active=eq.true filter,
// maps to the Product interface the storefront expects.

import { NextResponse } from "next/server"
import { getProducts } from "@/lib/data/products-db"
import { products as staticProducts } from "@/lib/data/products"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const storeProducts = await getProducts()
    const staticBySlug = new Map(staticProducts.map((product) => [product.slug, product]))
    const staticByName = new Map(staticProducts.map((product) => [product.name.toLowerCase(), product]))

    const mapped = storeProducts.map((sp, idx) => {
      const staticMatch = staticBySlug.get(sp.slug) ?? staticByName.get(sp.title.toLowerCase())

      return {
        id: idx + 1,
        name: sp.title,
        subtitle: sp.subtitle || staticMatch?.subtitle || "",
        price: sp.price,
        originalPrice: sp.originalPrice,
        badge: sp.badge || staticMatch?.badge || "",
        badgeColor: sp.badgeColor || staticMatch?.badgeColor || "bg-primary text-primary-foreground",
        category: sp.category || staticMatch?.category || "Candles",
        tags: sp.tags?.length ? sp.tags : staticMatch?.tags ?? [],
        color: sp.color !== "Default" ? sp.color : staticMatch?.color ?? sp.color,
        colorHex: sp.colorHex !== "#000000" ? sp.colorHex : staticMatch?.colorHex ?? sp.colorHex,
        emoji: sp.emoji || staticMatch?.emoji || "🕯️",
        description: sp.description ?? staticMatch?.description ?? "",
        image: sp.image,
        slug: sp.slug,
        galleryImages: sp.images
          .filter((img) => !img.isPrimary && img.url)
          .map((img) => img.url),
        scentFamily: staticMatch?.scentFamily ?? sp.scentFamily ?? "Amber / Gourmand",
        topNotes: staticMatch?.topNotes ?? sp.topNotes ?? [],
        heartNotes: staticMatch?.heartNotes ?? sp.heartNotes ?? [],
        baseNotes: staticMatch?.baseNotes ?? sp.baseNotes ?? [],
        scentScene: staticMatch?.scentScene ?? sp.scentScene ?? sp.subtitle,
        roomFit: staticMatch?.roomFit ?? sp.roomFit ?? [],
        strength: staticMatch?.strength ?? sp.strength ?? "Medium",
        season: staticMatch?.season ?? sp.season ?? [],
      }
    })

    return NextResponse.json(mapped)
  } catch (error) {
    console.error("[api/products] Failed to fetch from Supabase:", error)
    return NextResponse.json([], { status: 200 })
  }
}