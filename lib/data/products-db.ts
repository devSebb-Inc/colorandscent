const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const PRODUCT_LIST_SELECT =
  "id,slug,title,subtitle,description,price_cents,compare_at_price_cents,category,tags,badge,badge_color,emoji,is_featured,is_active,printify_product_id,product_variants(id,size,color,color_hex,printify_variant_id,is_active),product_images(url,alt_text,is_primary,position,variant_color)"

const PRODUCT_LIST_QUERY = `products?select=${PRODUCT_LIST_SELECT}&is_active=eq.true&order=created_at.asc`
const PRODUCT_BY_SLUG_QUERY = `products?select=${PRODUCT_LIST_SELECT},created_at&is_active=eq.true`

export interface StoreProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice: number
  badge: string
  badgeColor: string
  category: string
  tags: string[]
  emoji: string
  description?: string
  image: string
  color: string
  colorHex: string
  images: Array<{
    id: string
    url: string
    altText: string
    position: number
    isPrimary: boolean
    variantColor: string | null
  }>
  variants: Array<{
    id: string
    size: string
    color: string
    colorHex: string
    printifyVariantId: string | null
  }>
  scentFamily?: string
  topNotes?: string[]
  heartNotes?: string[]
  baseNotes?: string[]
  scentScene?: string
  roomFit?: string[]
  strength?: string
  season?: string[]
}

interface SupabaseVariant {
  id: string
  size: string | null
  color: string | null
  color_hex: string | null
  printify_variant_id: string | null
  is_active: boolean | null
}

interface SupabaseImage {
  url: string | null
  alt_text: string | null
  is_primary: boolean | null
  position: number | null
  variant_color: string | null
}

interface SupabaseProduct {
  id: string
  slug: string
  title: string | null
  subtitle: string | null
  description: string | null
  price_cents: number | null
  compare_at_price_cents: number | null
  category: string | null
  tags: string[] | null
  badge: string | null
  badge_color: string | null
  emoji: string | null
  is_featured: boolean | null
  is_active: boolean | null
  printify_product_id: string | null
  product_variants?: SupabaseVariant[] | null
  product_images?: SupabaseImage[] | null
}

function getSupabaseHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  }
}

async function fetchSupabase<T>(path: string): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: getSupabaseHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Supabase request failed (${response.status}): ${errorText}`)
  }

  return response.json() as Promise<T>
}

function deriveScentMetadata(product: SupabaseProduct, color: string) {
  const text = `${product.title ?? ""} ${product.subtitle ?? ""} ${(product.tags ?? []).join(" ")} ${color}`.toLowerCase()

  if (text.includes("gift") || text.includes("collection") || text.includes("set")) {
    return { scentFamily: "Gift Set", topNotes: ["four scent moods"], heartNotes: ["warm", "fresh", "soft", "woody"], baseNotes: ["room-by-room discovery"], scentScene: "four color moods for the rooms you use most", roomFit: ["gifting", "discovery", "first order"], strength: "Mixed", season: ["all season"] }
  }
  if (text.includes("leather") || text.includes("cedar") || text.includes("smoke") || text.includes("charcoal") || text.includes("wood")) {
    return { scentFamily: "Woody / Smoky", topNotes: ["black pepper"], heartNotes: ["leather"], baseNotes: ["cedarwood"], scentScene: "cedar smoke, leather chair, lamps low after midnight", roomFit: ["study", "lounge", "date night"], strength: "Bold", season: ["fall", "winter"] }
  }
  if (text.includes("rose") || text.includes("bloom") || text.includes("floral") || text.includes("violet") || text.includes("lavender")) {
    return { scentFamily: "Floral / Soft", topNotes: ["soft petals"], heartNotes: ["white flower"], baseNotes: ["warm musk"], scentScene: "soft florals, warm stone, and quiet candlelight", roomFit: ["bedroom", "bath", "evening ritual"], strength: text.includes("dark") ? "Bold" : "Soft", season: ["spring", "evening"] }
  }
  if (text.includes("fresh") || text.includes("sea") || text.includes("citrus") || text.includes("lemon") || text.includes("salt")) {
    return { scentFamily: "Fresh / Citrus", topNotes: ["citrus peel"], heartNotes: ["clean air"], baseNotes: ["mineral musk"], scentScene: "open windows, clean salt air, sun on cotton curtains", roomFit: ["kitchen", "bathroom", "morning reset"], strength: "Medium", season: ["spring", "summer"] }
  }
  if (text.includes("clean") || text.includes("cotton") || text.includes("linen") || text.includes("calm")) {
    return { scentFamily: "Clean / Linen", topNotes: ["bergamot"], heartNotes: ["clean cotton"], baseNotes: ["soft musk"], scentScene: "fresh sheets, green tea, a quiet Sunday window", roomFit: ["bedroom", "bath", "workday reset"], strength: "Soft", season: ["spring", "morning"] }
  }
  return { scentFamily: "Amber / Gourmand", topNotes: ["bergamot"], heartNotes: ["warm amber"], baseNotes: ["sandalwood"], scentScene: "warm spice, suede chair, the last orange light on the wall", roomFit: ["living room", "bedroom", "evening wind-down"], strength: "Medium", season: ["fall", "winter"] }
}

function mapProduct(product: SupabaseProduct): StoreProduct {
  const variants = (product.product_variants ?? [])
    .filter((variant) => variant?.is_active !== false)
    .map((variant) => ({
      id: variant.id,
      size: variant.size ?? "M",
      color: variant.color ?? "Default",
      colorHex: variant.color_hex ?? "#000000",
      printifyVariantId: variant.printify_variant_id,
    }))

  const sortedImages = [...(product.product_images ?? [])].sort(
    (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER)
  )

  const primaryImage =
    sortedImages.find((image) => image.is_primary && image.url)?.url ??
    sortedImages.find((image) => image.url)?.url ??
    "/placeholder.svg"

  const images = sortedImages
    .filter((img) => img.url)
    .map((img, idx) => ({
      id: `${product.id}-img-${idx}`,
      url: img.url!,
      altText: img.alt_text ?? product.title ?? "Product image",
      position: img.position ?? idx,
      isPrimary: img.is_primary ?? false,
      variantColor: img.variant_color ?? null,
    }))

  const firstVariant = variants[0]
  const scent = deriveScentMetadata(product, firstVariant?.color ?? "Default")

  return {
    id: product.id,
    slug: product.slug,
    title: product.title ?? "Untitled Product",
    subtitle: product.subtitle ?? "",
    price: (product.price_cents ?? 0) / 100,
    originalPrice: (product.compare_at_price_cents ?? product.price_cents ?? 0) / 100,
    badge: product.badge ?? "NEW",
    badgeColor: product.badge_color ?? "bg-primary text-primary-foreground",
    category: product.category ?? "Uncategorized",
    tags: product.tags ?? [],
    emoji: product.emoji ?? "🛍️",
    description: product.description ?? undefined,
    image: primaryImage,
    color: firstVariant?.color ?? "Default",
    colorHex: firstVariant?.colorHex ?? "#000000",
    images,
    variants,
    ...scent,
  }
}

export async function getProducts(): Promise<StoreProduct[]> {
  const products = await fetchSupabase<SupabaseProduct[]>(PRODUCT_LIST_QUERY)
  return products.map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const encodedSlug = encodeURIComponent(slug)
  const products = await fetchSupabase<SupabaseProduct[]>(`${PRODUCT_BY_SLUG_QUERY}&slug=eq.${encodedSlug}&limit=1`)
  const product = products[0]
  return product ? mapProduct(product) : null
}
