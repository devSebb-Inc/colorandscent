import Link from "next/link"

const moods = [
  { label: "Warm & Cozy", href: "/products?scent=warm", color: "#B98235", notes: "amber · vanilla · sandalwood" },
  { label: "Fresh & Clean", href: "/products?scent=fresh", color: "#B7C6C9", notes: "citrus · salt air · cotton" },
  { label: "Soft Floral", href: "/products?scent=floral", color: "#B58A8B", notes: "rose · violet · musk" },
  { label: "Woody & Smoky", href: "/products?scent=woody", color: "#6E4B35", notes: "pepper · leather · cedar" },
]

export function ScentFinderTeaser() {
  return (
    <section id="scent-finder" className="bg-[#F6F0E7] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-border/70 bg-[#FFF8EF]/70 p-5 shadow-[0_24px_80px_rgba(23,20,18,0.06)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Find the right gift mood</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">Start with the occasion.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Pick the moment — a new apartment, a dinner host, a bedside reset, or a just-because gift — then choose the scent that feels most like home.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {moods.map((mood) => (
              <Link key={mood.label} href={mood.href} className="group rounded-3xl border border-border/70 bg-[#F6F0E7]/90 p-4 transition hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg focus-visible:outline-ring">
                <div className="flex items-start justify-between gap-4">
                  <span className="h-12 w-12 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: mood.color }} />
                  <span className="text-lg transition group-hover:translate-x-1">↗</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold">{mood.label}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{mood.notes}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
