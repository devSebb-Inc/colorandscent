"use client"

import { useEffect } from "react"
import { pixelPurchase } from "@/lib/utils/fbpixel"

export function PurchasePixel({ value }: { value: number }) {
  useEffect(() => {
    pixelPurchase({ value })
  }, [value])

  return null
}
