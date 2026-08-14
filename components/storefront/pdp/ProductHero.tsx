"use client"

import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ImageGallery } from "./ImageGallery"
import { AddToCartCTA } from "./AddToCartCTA"
import { StickyCartBar } from "./StickyCartBar"
import { ScentNotePyramid } from "@/components/storefront/ScentNotePyramid"
import { TrustServiceRow } from "@/components/storefront/TrustServiceRow"
import { discountPercent, formatCents } from "@/lib/utils/format"
import type { ProductWithDetails } from "@/lib/types/product"

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } },
  item: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const } } },
}

interface Props { product: ProductWithDetails }

export function ProductHero({ product }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null)
  const primaryVariant = product.variants[0]
  const [selectedColor, setSelectedColor] = useState(primaryVariant?.color ?? "")
  const [selectedColorHex, setSelectedColorHex] = useState(primaryVariant?.colorHex ?? "#888888")
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0]
  const selectedImageUrl = useMemo(() => {
    const colorImage = product.images.find((img) => img.variantColor === selectedColor)
    return colorImage?.url ?? primaryImage?.url ?? ""
  }, [primaryImage?.url, product.images, selectedColor])
  const salePrice = formatCents(product.priceCents)
  const comparePrice = product.compareAtPriceCents ? formatCents(product.compareAtPriceCents) : null
  const savings = product.compareAtPriceCents ? discountPercent(product.compareAtPriceCents / 100, product.priceCents / 100) : null
  const handleColorChange = (color: string, colorHex: string) => { setSelectedColor(color); setSelectedColorHex(colorHex) }
  const notes = product.scentNotes

  return (
    <>
      <div className="atelier-paper border-b border-border/60 px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
          <ImageGallery images={product.images} productName={product.title} badge={product.badge} badgeColor={product.badgeColor} selectedColor={selectedColor} />
          <motion.div className="flex flex-col justify-start lg:pt-2" variants={stagger.container} initial="hidden" animate="show">
            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-2">
              {product.scentFamily && <span className="scent-chip rounded-full bg-[#FFF8EF]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{product.scentFamily}</span>}
              {product.strength && <span className="scent-chip rounded-full bg-secondary/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{product.strength} throw</span>}
            </motion.div>
            <motion.h1 variants={stagger.item} className="mt-4 font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.04em] md:text-7xl">{product.title}</motion.h1>
            {product.subtitle && <motion.p variants={stagger.item} className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{product.subtitle}</motion.p>}
            <motion.div variants={stagger.item} className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold">{salePrice}</span>
              {comparePrice && <span className="text-lg text-muted-foreground line-through">{comparePrice}</span>}
              {savings !== null && savings > 0 && <span className="rounded-full bg-[var(--cs-wax-cream)] px-2.5 py-1 text-xs font-bold text-[var(--cs-cedar)]">SAVE {savings}%</span>}
            </motion.div>
            {product.scentScene && (
              <motion.div variants={stagger.item} className="mt-6 rounded-3xl border border-black/10 bg-[#FFF8EF]/78 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Smells like</p>
                <p className="mt-2 font-serif text-2xl leading-snug text-foreground">{product.scentScene}</p>
              </motion.div>
            )}
            <motion.div variants={stagger.item} className="mt-4">
              <ScentNotePyramid top={notes?.top} heart={notes?.heart} base={notes?.base} />
            </motion.div>
            <motion.div variants={stagger.item} className="mt-4 flex flex-wrap gap-2">
              {[...(product.roomFit ?? []), ...(product.season ?? [])].slice(0, 7).map((item) => <span key={item} className="rounded-full border border-border bg-[#FFF8EF]/70 px-3 py-1.5 text-xs text-muted-foreground">{item}</span>)}
            </motion.div>
            <motion.div variants={stagger.item} ref={ctaRef} className="mt-6">
              <AddToCartCTA product={product} imageUrl={selectedImageUrl} selectedColor={selectedColor} selectedColorHex={selectedColorHex} onColorChange={handleColorChange} />
            </motion.div>
            <motion.div variants={stagger.item} className="mt-5"><TrustServiceRow compact /></motion.div>
            {product.tags && product.tags.length > 0 && (
              <motion.div variants={stagger.item} className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => <span key={tag} className="text-[11px] text-muted-foreground">{tag.startsWith("#") ? tag : `#${tag}`}</span>)}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <StickyCartBar product={product} imageUrl={selectedImageUrl} ctaRef={ctaRef} selectedColor={selectedColor} selectedColorHex={selectedColorHex} />
    </>
  )
}
