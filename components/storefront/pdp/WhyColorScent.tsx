import { Sparkles, Flame, Leaf, Heart } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Premium Soy Wax",
    body: "100% natural soy wax for a clean, long-lasting burn. Our wax is sustainably sourced, biodegradable, and burns up to 50% longer than paraffin. No toxins, no soot, no regrets.",
  },
  {
    icon: Flame,
    title: "Cotton Wick, Every Time",
    body: "Lead-free cotton wicks that curl as they burn — no mushrooming, no smoke, no harsh chemicals. Engineered for a steady, even melt pool every single time.",
  },
  {
    icon: Sparkles,
    title: "Phthalate-Free Fragrance",
    body: "Premium fragrance oils, never diluted with synthetics. Every scent is meticulously blended by perfumers who understand the art of layering top, heart, and base notes.",
  },
  {
    icon: Heart,
    title: "Made With Obsession",
    body: "We're not a faceless candle factory. We hand-pour every batch, trim every wick, and test every scent. You get wearable art for your home, not a mass-produced commodity.",
  },
]

export function WhyColorScent() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight mb-2">
            Why COLOR & SCENT?
          </h2>
          <p className="text-muted-foreground">Hand-poured. Obsessed. Always.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}