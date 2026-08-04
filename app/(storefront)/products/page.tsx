import type { Metadata } from "next"
import { ProductSection } from "@/components/storefront/ProductSection"
import { getProducts } from "@/lib/data/products-db"
import { buildMetadata } from "@/lib/utils/seo"

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await buildMetadata({
      title: "Shop All Products",
      description: "Browse our full collection of premium Japanese-inspired wax melts. Cats, dragons, samurai, and more.",
      path: "/products",
    })
  } catch {
    return {}
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="pt-8">
      <ProductSection products={products} />
    </div>
  )
}
