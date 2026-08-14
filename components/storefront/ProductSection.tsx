"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "@/lib/hooks/use-cart"
import { products as staticProducts, scentFilters, type Product } from "@/lib/data/products"
import { discountPercent, formatPrice } from "@/lib/utils/format"

function matchesFilter(product: Product, filter: string) {
  if (filter === "All") return true
  if (filter === "Gifts") return product.scentFamily === "Gift Set" || product.category.toLowerCase().includes("gift")
  if (filter === "Warm & Cozy") return product.scentFamily === "Amber / Gourmand"
  if (filter === "Fresh & Clean") return product.scentFamily === "Fresh / Citrus" || product.scentFamily === "Clean / Linen"
  if (filter === "Floral & Soft") return product.scentFamily === "Floral / Soft"
  if (filter === "Woody & Smoky") return product.scentFamily === "Woody / Smoky"
  return true
}

function ProductCard({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: () => void }) {
  const noteLine = [product.topNotes[0], product.heartNotes[0], product.baseNotes[0]].filter(Boolean).join(" · ")

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.45, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }} layout className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#FFF8EF]/85 shadow-[0_18px_60px_rgba(23,20,18,0.055)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(23,20,18,0.11)]">
        <Link href={`/products/${product.slug}`} className="block p-3 pb-0">
          <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.35rem] bg-secondary">
            <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            <div className="absolute left-3 top-3 flex gap-2">
              <span className="rounded-full bg-[#FFF8EF]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground backdrop-blur">{product.scentFamily}</span>
            </div>
            {product.originalPrice > product.price && (
              <span className="absolute right-3 top-3 rounded-full bg-[var(--cs-soft-clay)] px-2.5 py-1 text-[10px] font-bold text-white">-{discountPercent(product.originalPrice, product.price)}%</span>
            )}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#FFF8EF]/90 px-3 py-1.5 backdrop-blur">
              <span className="h-3.5 w-3.5 rounded-full border border-black/15 shadow-inner" style={{ backgroundColor: product.colorHex }} />
              <span className="text-[11px] font-medium">{product.color}</span>
            </div>
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{noteLine}</p>
          <Link href={`/products/${product.slug}`} className="mt-2 inline-block">
            <h3 className="font-serif text-3xl font-semibold leading-none tracking-tight">{product.name}</h3>
          </Link>
          <p className="mt-3 min-h-[3.25rem] text-sm leading-6 text-muted-foreground">{product.scentScene}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[product.strength, ...product.roomFit.slice(0, 2)].map((tag) => (
              <span key={tag} className="scent-chip rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] text-muted-foreground">{tag}</span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
          </div>
          <button onClick={onAddToCart} className="mt-4 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90" aria-label={`Add ${product.name} to cart`}>
            Quick add — {formatPrice(product.price)}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export function ProductSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof scentFilters)[number]>("All")
  const { addItem, openCart } = useCart()
  const [products, setProducts] = useState<Product[]>(staticProducts)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (mounted && Array.isArray(data) && data.length > 0) setProducts(data)
        if (mounted && Array.isArray(data) && data.length === 0) setProducts(staticProducts)
      } catch (err) {
        console.error("ProductSection: fetch error", err)
        if (mounted) setProducts(staticProducts)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchProducts()
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => products.filter((p) => matchesFilter(p, activeFilter)), [products, activeFilter])

  const handleAddToCart = (product: Product) => {
    addItem({ id: String(product.id), slug: product.slug, name: product.name, price: product.price, size: "One Size", color: product.color, colorHex: product.colorHex, emoji: product.emoji, image: product.image })
    toast.success(`${product.name} added`, { icon: product.emoji })
    openCart()
  }

  return (
    <section id="shop" className="bg-[#F6F0E7] px-4 py-18 md:py-22" ref={sectionRef}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Shop thoughtful scents</p>
            <h2 className="mt-3 font-serif text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.82] tracking-[-0.05em]">Find a candle for the moment.</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">Choose by mood, room, or occasion — from cozy host gifts to quiet evenings at home.</p>
        </div>
        <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter scents">
          {scentFilters.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeFilter === filter ? "border-primary bg-primary text-primary-foreground" : "border-border bg-[#FFF8EF]/70 text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}>{filter}</button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[520px] animate-pulse rounded-[1.75rem] bg-[#FFF8EF]/70" />)}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => <ProductCard key={product.slug} product={product} index={index} onAddToCart={() => handleAddToCart(product)} />)}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-border bg-[#FFF8EF]/70 p-10 text-center text-muted-foreground">No scents match this filter yet.</div>
        )}
        <div className="mt-10 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-semibold transition hover:border-foreground/35">See every candle <span>↗</span></Link>
        </div>
      </div>
    </section>
  )
}
