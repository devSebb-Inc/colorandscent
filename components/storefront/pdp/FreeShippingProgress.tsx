"use client"

import { CheckCircle } from "lucide-react"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"
import { useCart } from "@/lib/hooks/use-cart"

export function FreeShippingProgress() {
  const { total } = useCart()
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = total >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="mb-6 rounded-2xl border border-border bg-[#FFF8EF]/70 px-5 py-4">
      {unlocked ? (
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--cs-cedar)]"><CheckCircle className="h-4 w-4" /><span>You’ve unlocked free shipping.</span></div>
      ) : (
        <>
          <p className="mb-2 text-xs text-muted-foreground">Add <span className="font-semibold text-foreground">${remaining.toFixed(2)}</span> more for free shipping</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-[var(--cs-soft-clay)] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </>
      )}
    </div>
  )
}
