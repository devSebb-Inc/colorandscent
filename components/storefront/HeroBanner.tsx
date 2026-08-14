"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Gift, Heart, Home, Sparkles } from "lucide-react"
import { products } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils/format"

const EASE = [0.16, 1, 0.3, 1] as const

function LineArt() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden="true">
      <defs>
        <pattern id="soft-lines" width="260" height="180" patternUnits="userSpaceOnUse">
          <path d="M18 130 C70 75 122 182 176 92 C205 45 236 54 250 22" fill="none" stroke="#B8795D" strokeWidth="1" />
          <path d="M44 36 C70 18 98 18 124 36 C96 42 72 42 44 36Z" fill="none" stroke="#74725F" strokeWidth="0.8" />
          <circle cx="206" cy="132" r="28" fill="none" stroke="#C9BCAE" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#soft-lines)" />
    </svg>
  )
}

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imageX = useSpring(mouseX, { stiffness: 50, damping: 24 })
  const imageY = useSpring(mouseY, { stiffness: 50, damping: 24 })
  const heroProducts = useMemo(() => products.filter((p) => p.slug !== "essentials-collection").slice(0, 4), [])
  const currentProduct = heroProducts[currentIndex] ?? heroProducts[0]

  useEffect(() => {
    if (heroProducts.length <= 1) return
    const id = window.setInterval(() => setCurrentIndex((i) => (i + 1) % heroProducts.length), 4800)
    return () => window.clearInterval(id)
  }, [heroProducts.length])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 14)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 14)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative overflow-hidden bg-[#F6F0E7] px-4 pb-12 pt-16 md:pt-20 lg:min-h-[88svh]">
      <LineArt />
      <div className="absolute left-[-10rem] top-16 h-96 w-96 rounded-full bg-[#FFF5D8]/70 blur-3xl" />
      <div className="absolute right-[-10rem] bottom-16 h-[30rem] w-[30rem] rounded-full bg-[#B8795D]/10 blur-3xl" />
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="relative z-10 py-8 md:py-14">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="font-serif text-lg italic text-[#74725F] md:text-xl">
            Cozy candles for thoughtful gifting and softer rooms
          </motion.p>
          <div className="mt-6 overflow-hidden">
            <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.95, ease: EASE }} className="max-w-4xl font-serif text-[clamp(4.1rem,10.8vw,11rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-[#171412]">
              Give a room<br />a warmer mood.
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }} className="mt-8 max-w-xl text-base leading-8 text-[#6F665B] md:text-lg">
            Elegant scented candles for housewarmings, thank-yous, birthdays, quiet evenings, and the little rituals that make home feel cared for.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36, ease: "easeOut" }} className="mt-9 flex flex-wrap gap-3">
            <Link href="/products?category=Gift%20Sets" className="rounded-full bg-[#171412] px-6 py-3.5 text-sm font-semibold text-[#F6F0E7] transition hover:bg-[#2A211B]">Shop gifts</Link>
            <Link href="/#shop" className="rounded-full border border-[#D8CABB] bg-[#FFF8EF]/70 px-6 py-3.5 text-sm font-semibold text-[#171412] transition hover:border-[#B8795D]">Browse scents</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { icon: Gift, text: 'Giftable moods' },
              { icon: Home, text: 'Homey scents' },
              { icon: Heart, text: 'Cozy rituals' },
              { icon: Sparkles, text: 'Candle care' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-2xl border border-[#D8CABB] bg-[#FFF8EF]/62 px-3 py-3 text-xs font-medium text-[#6F665B]">
                <Icon className="h-3.5 w-3.5 text-[#B8795D]" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ x: imageX, y: imageY }} className="relative z-10 mx-auto w-full max-w-[650px] lg:mx-0">
          <div className="grid grid-cols-[0.78fr_1fr] gap-4 sm:gap-5">
            <div className="space-y-4 pt-10 sm:pt-16">
              <div className="rounded-[2rem] border border-[#D8CABB] bg-[#FFF8EF]/86 p-5 shadow-[0_24px_80px_rgba(23,20,18,0.08)]">
                <p className="font-serif text-2xl font-semibold leading-tight text-[#171412]">A candle that feels like a note on the table.</p>
                <p className="mt-4 text-sm leading-6 text-[#74725F]">Pair a warm scent with a simple message: welcome home, thinking of you, stay awhile.</p>
              </div>
              <div className="rounded-[2rem] border border-[#D8CABB] bg-[#F0E5D7] p-5">
                <p className="text-sm font-semibold text-[#171412]">Best for</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Host gifts', 'New homes', 'Self-care', 'Dinner nights'].map((item) => <span key={item} className="rounded-full bg-[#FFF8EF]/80 px-3 py-1 text-xs text-[#6F665B]">{item}</span>)}
                </div>
              </div>
            </div>
            {currentProduct && (
              <Link href={`/products/${currentProduct.slug}`} className="group relative block overflow-hidden rounded-[2.25rem] border border-[#D8CABB] bg-[#FFF8EF] p-3 shadow-[0_30px_100px_rgba(23,20,18,0.12)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#EFE4D6]">
                  <Image src={currentProduct.image} alt={currentProduct.name} fill priority className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 1024px) 70vw, 460px" />
                </div>
                <div className="p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8A7D70]">{currentProduct.topNotes[0]} · {currentProduct.heartNotes[0]} · {currentProduct.baseNotes[0]}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h2 className="font-serif text-3xl font-semibold leading-none">{currentProduct.name}</h2>
                    <span className="rounded-full bg-[#EFE4D6] px-3 py-1 text-sm font-semibold">{formatPrice(currentProduct.price)}</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
