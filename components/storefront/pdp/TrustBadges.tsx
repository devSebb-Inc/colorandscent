import { Headphones, Scissors, ShieldCheck, Truck } from "lucide-react"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"

const badges = [
  { icon: Truck, title: `Free Ship $${FREE_SHIPPING_THRESHOLD}+`, sub: "Threshold shown in cart" },
  { icon: ShieldCheck, title: "Secure Checkout", sub: "Encrypted payment" },
  { icon: Scissors, title: "Candle Care", sub: "Trim wick before lighting" },
  { icon: Headphones, title: "Support", sub: "hello@colorandscent.com" },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
      {badges.map(({ icon: Icon, title, sub }) => (
        <div key={title} className="rounded-2xl border border-border bg-[#FFF8EF]/70 p-3 text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cs-wax-cream)]"><Icon className="h-4 w-4 text-[var(--cs-soft-clay)]" /></div>
          <p className="text-xs font-semibold leading-tight">{title}</p>
          <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  )
}
