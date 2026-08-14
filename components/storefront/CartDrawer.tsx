"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/lib/hooks/use-cart"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils/format"

export function CartDrawer() {
  const { items, isOpen, count, total, closeCart, removeItem, updateQuantity } = useCart()
  const shippingProgress = Math.min(total / FREE_SHIPPING_THRESHOLD, 1)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col border-l border-border bg-[var(--cs-warm-milk)] p-0">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Color story</p>
            <SheetTitle className="mt-1 font-serif text-3xl font-semibold text-foreground">Your Cart ({count})</SheetTitle>
          </div>
          <button onClick={closeCart} className="rounded-full border border-border bg-[#FFF8EF]/70 p-2 transition hover:bg-secondary" aria-label="Close cart"><X className="h-5 w-5" /></button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-[#FFF8EF]/50 p-8 text-center">
              <ShoppingBag className="mb-4 h-14 w-14 text-muted-foreground" />
              <p className="font-serif text-3xl font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">Time to find the color your room is missing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 rounded-3xl border border-black/10 bg-[#FFF8EF]/80 p-3 shadow-[0_12px_40px_rgba(23,20,18,0.045)]">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-secondary">
                    {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" /> : <div className="flex h-full items-center justify-center text-2xl">{item.emoji}</div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-xl font-semibold leading-none">{item.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.size} · {item.color}</p>
                    <div className="mt-2 flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: item.colorHex }} /><p className="text-sm font-bold">{formatPrice(item.price)}</p></div>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.id, item.size)} className="text-muted-foreground transition hover:text-foreground" aria-label="Remove item"><X className="h-4 w-4" /></button>
                    <div className="flex items-center gap-2 rounded-full bg-secondary/70 p-1">
                      <button onClick={() => updateQuantity(item.id, item.size, -1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF8EF] transition hover:bg-border" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                      <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, 1)} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF8EF] transition hover:bg-border" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="space-y-4 border-t border-border bg-[#FFF8EF]/55 p-6">
            {total < FREE_SHIPPING_THRESHOLD ? (
              <div className="space-y-2 rounded-2xl bg-background/70 p-4">
                <p className="text-sm text-muted-foreground">Add <span className="font-semibold text-foreground">{formatPrice(remaining)}</span> more for free shipping</p>
                <div className="h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-[var(--cs-soft-clay)] transition-all duration-300" style={{ width: `${shippingProgress * 100}%` }} /></div>
              </div>
            ) : <p className="rounded-2xl bg-[var(--cs-wax-cream)] p-4 text-sm font-semibold text-[var(--cs-cedar)]">You’ve unlocked free shipping.</p>}
            <div className="flex items-center justify-between text-lg font-bold"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <button onClick={async () => { const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) }); if (res.ok) { const { url } = await res.json(); closeCart(); window.location.href = url } }} className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground transition hover:bg-primary/90">Checkout — {formatPrice(total)}</button>
            <p className="text-center text-xs text-muted-foreground">Secure checkout · Free shipping $75+ · Support available</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
