/**
 * Facebook Pixel utility
 * Pixel ID: 1219641623573647
 * Safe to call server-side (no-op if window is undefined)
 */

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export function pixelAddToCart(params: {
  contentId: string
  contentName: string
  value: number
  currency?: string
}) {
  fbq('track', 'AddToCart', {
    content_ids: [params.contentId],
    content_name: params.contentName,
    content_type: 'product',
    value: params.value,
    currency: params.currency ?? 'USD',
  })
}

export function pixelInitiateCheckout(params: {
  numItems: number
  value: number
  currency?: string
}) {
  fbq('track', 'InitiateCheckout', {
    num_items: params.numItems,
    value: params.value,
    currency: params.currency ?? 'USD',
  })
}

export function pixelPurchase(params: {
  value: number
  currency?: string
}) {
  fbq('track', 'Purchase', {
    value: params.value,
    currency: params.currency ?? 'USD',
  })
}
