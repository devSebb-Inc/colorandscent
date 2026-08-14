interface Props {
  top?: string[] | null
  heart?: string[] | null
  base?: string[] | null
  compact?: boolean
  inverted?: boolean
}

const rows = [
  { key: "top", label: "TOP", caption: "First light" },
  { key: "heart", label: "HEART", caption: "Room mood" },
  { key: "base", label: "BASE", caption: "Lasting trail" },
] as const

export function ScentNotePyramid({ top, heart, base, compact = false, inverted = false }: Props) {
  const values = { top: top ?? [], heart: heart ?? [], base: base ?? [] }
  const hasNotes = rows.some((row) => values[row.key].length > 0)

  if (!hasNotes) return null

  return (
    <div
      className={compact ? "grid grid-cols-3 gap-2" : "grid grid-cols-1 sm:grid-cols-3 gap-3"}
      aria-label="Scent notes: top, heart, and base"
    >
      {rows.map((row) => {
        const notes = values[row.key]
        return (
          <div
            key={row.key}
            className={`rounded-2xl border p-3 ${
              inverted
                ? "border-white/15 bg-white/[0.06] text-white"
                : "border-[rgba(23,20,18,0.12)] bg-[rgba(255,248,239,0.74)] text-foreground"
            }`}
          >
            <p className={`font-mono text-[10px] tracking-[0.24em] ${inverted ? "text-white/56" : "text-muted-foreground"}`}>
              {row.label}
            </p>
            {!compact && (
              <p className={`mt-0.5 text-[11px] ${inverted ? "text-white/45" : "text-muted-foreground/80"}`}>{row.caption}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed font-medium capitalize">
              {notes.length > 0 ? notes.join(" · ") : "—"}
            </p>
          </div>
        )
      })}
    </div>
  )
}
