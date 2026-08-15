import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://colorandscent.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
