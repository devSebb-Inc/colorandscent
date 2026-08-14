import { Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data/products"

interface Props {
  inverted?: boolean
  compact?: boolean
}

export function TrustServiceRow({ inverted = false, compact = false }: Props) {
  const items = [
    { icon: Truck, label: `Free shipping $${FREE_SHIPPING_THRESHOLD}+`, sub: "Shown before checkout" },
    { icon: ShieldCheck, label: "Secure checkout", sub: "Stripe-powered payment" },
    { icon: Sparkles, label: "Candle care included", sub: "Trim, burn, and safety tips" },
    { icon: Headphones, label: "Support available", sub: "hello@colorandscent.com" },
  ]

  return (
    <div
      className={`grid ${compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"} gap-2 rounded-3xl border p-2 ${
        inverted ? "border-white/12 bg-white/[0.06]" : "border-[rgba(23,20,18,0.10)] bg-[#FFF8EF]/70"
      }`}
    >
      {items.map(({ icon: Icon, label, sub }) => (
        <div key={label} className={`rounded-2xl p-3 ${inverted ? "bg-white/[0.04]" : "bg-white/45"}`}>
          <div className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${inverted ? "bg-white/10" : "bg-[var(--cs-wax-cream)]"}`}>
              <Icon className={`h-4 w-4 ${inverted ? "text-white/75" : "text-[var(--cs-soft-clay)]"}`} />
            </span>
            <div>
              <p className={`text-xs font-semibold ${inverted ? "text-white" : "text-foreground"}`}>{label}</p>
              {!compact && <p className={`text-[11px] ${inverted ? "text-white/50" : "text-muted-foreground"}`}>{sub}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
