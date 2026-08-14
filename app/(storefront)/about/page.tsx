import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story — COLOR & SCENT",
  description: "Learn about COLOR & SCENT — premium candles and curated home fragrance crafted with love.",
}

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-6xl mb-6 block">🕯️</span>
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold tracking-tight mb-4">
            Our Story
          </h1>
          <p className="text-muted-foreground text-xl">
            Where scent, design, and everyday ritual collide.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            COLOR & SCENT started with a simple obsession: everyone deserves a signature scent that transforms their space.
          </p>

          <p>
            We believe that scent is the most powerful sense — it can transport you, calm you, energize you, and make any room feel like home. That&apos;s why we craft candles and fragrances designed to do more than just smell good.
          </p>

          <p>
            Every scent is carefully composed by perfumers who understand the art of layering notes — from the first bright top notes to the warm, lingering base that stays with you long after the flame is out.
          </p>

          <p>
            We use only premium soy wax, cotton wicks, and phthalate-free fragrance oils. No shortcuts, no synthetic fillers. The kind of candle that becomes part of your daily ritual.
          </p>

          <p>
            This isn&apos;t just a candle. It&apos;s an experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "🌿", label: "Natural Soy Wax", description: "Clean-burning, eco-friendly soy wax" },
            { icon: "✨", label: "Premium Scents", description: "Phthalate-free fragrance oils" },
            { icon: "🇺🇸", label: "Hand-Poured", description: "Crafted in small batches in the USA" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-2xl p-6 border border-border text-center">
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-bold mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}