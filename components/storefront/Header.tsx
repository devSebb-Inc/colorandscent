"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { FontSelector } from "@/components/storefront/FontSelector"
import { useCart } from "@/lib/hooks/use-cart"

const navLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/products?category=Gift%20Sets", label: "Gifts" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "Candle Care" },
]

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group relative rounded-full px-3 py-2 text-sm font-medium text-[#6F665B] transition hover:text-[#171412]" data-cursor="grow">
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-x-2 bottom-1 h-px origin-left scale-x-0 bg-[#B8795D] transition-transform duration-300 group-hover:scale-x-100" />
      <span className="absolute inset-0 -z-0 rounded-full bg-[#FFF8EF]/0 transition group-hover:bg-[#FFF8EF]/70" />
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 border-b border-[#E4D8CA] transition-all duration-300 ${scrolled ? "bg-[#F6F0E7]/90 shadow-[0_10px_35px_rgba(23,20,18,0.05)] backdrop-blur-xl" : "bg-[#F6F0E7]/82 backdrop-blur-md"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-6">
        <Link href="/" className="group flex items-center gap-3" data-cursor="grow">
          <span className="font-serif text-2xl font-semibold tracking-[-0.03em] text-[#171412]">Color & Scent</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-[#D8CABB] bg-[#FFF8EF]/65 px-2 py-1 md:flex">
          {navLinks.map((link) => <NavLink key={link.label} {...link} />)}
        </div>

        <div className="flex items-center gap-2">
          <FontSelector />
          <motion.button onClick={openCart} data-cursor="grow" className="relative rounded-full border border-[#D8CABB] bg-[#FFF8EF]/80 p-2.5 text-[#171412] transition hover:border-[#B8795D] hover:bg-[#FFF8EF]" aria-label={`Open cart, ${count} items`} whileTap={{ scale: 0.94 }}>
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#B8795D] text-[10px] font-bold text-white">
                {count}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
