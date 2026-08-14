"use client"

import { useEffect, useId, useState } from "react"
import type { ChangeEvent } from "react"

const STORAGE_KEY = "cs-heading-font"

const fontOptions = [
  { value: "literata", label: "Literata" },
  { value: "cardo", label: "Cardo" },
  { value: "cormorant", label: "Cormorant" },
  { value: "quattrocento", label: "Quattrocento" },
  { value: "libre-bodoni", label: "Libre Bodoni" },
  { value: "bodoni-moda", label: "Bodoni Moda" },
  { value: "rufina", label: "Rufina" },
  { value: "old-standard", label: "Old Standard" },
  { value: "abril-fatface", label: "Abril Fatface" },
  { value: "suranna", label: "Suranna" },
] as const

type FontOption = (typeof fontOptions)[number]["value"]

function isFontOption(value: string | null): value is FontOption {
  return fontOptions.some((option) => option.value === value)
}

function applyHeadingFont(value: FontOption) {
  document.documentElement.dataset.headingFont = value
}

export function FontSelector() {
  const id = useId()
  const [selectedFont, setSelectedFont] = useState<FontOption>("literata")

  useEffect(() => {
    const savedFont = window.localStorage.getItem(STORAGE_KEY)
    const initialFont = isFontOption(savedFont) ? savedFont : "literata"
    setSelectedFont(initialFont)
    applyHeadingFont(initialFont)
  }, [])

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextFont = event.target.value
    if (!isFontOption(nextFont)) return

    setSelectedFont(nextFont)
    applyHeadingFont(nextFont)
    window.localStorage.setItem(STORAGE_KEY, nextFont)
  }

  return (
    <div className="hidden items-center gap-2 rounded-full border border-[#D8CABB] bg-[#FFF8EF]/75 px-3 py-2 text-xs text-[#6F665B] lg:flex">
      <label htmlFor={id} className="font-medium">
        Font
      </label>
      <select
        id={id}
        value={selectedFont}
        onChange={handleChange}
        className="max-w-36 rounded-full border border-[#D8CABB] bg-[#F6F0E7]/80 px-2 py-1 text-xs font-medium text-[#171412] outline-none transition focus:border-[#B8795D]"
        aria-label="Preview heading font"
      >
        {fontOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
