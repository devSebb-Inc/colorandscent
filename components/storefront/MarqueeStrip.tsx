export function MarqueeStrip() {
  const topItems = [
    "— SOY WAX",
    "— COTTON WICK",
    "— HAND-POURED",
    "— VEGAN",
    "— ECO-FRIENDLY",
    "— USA MADE",
    "— PHTHALATE-FREE",
    "— PREMIUM SCENTS",
  ]

  const bottomItems = ["SOY", "WAX", "COTTON", "WICK", "VEGAN", "ECO", "USA", "LUXE"]

  return (
    <div className="border-y border-border/50 overflow-hidden select-none bg-background">
      {/* Top strip */}
      <div className="py-3 flex overflow-hidden border-b border-border/30">
        <div className="animate-marquee whitespace-nowrap flex shrink-0">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center">
              {topItems.map((item, j) => (
                <span
                  key={j}
                  className="text-[11px] font-mono tracking-[0.25em] text-foreground/50 uppercase mx-6"
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="py-2.5 flex overflow-hidden">
        <div
          className="whitespace-nowrap flex shrink-0"
          style={{ animation: "marquee 20s linear infinite reverse" }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center">
              {bottomItems.map((item, j) => (
                <span
                  key={j}
                  className="text-sm text-accent/50 mx-8 tracking-widest font-bold"
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}