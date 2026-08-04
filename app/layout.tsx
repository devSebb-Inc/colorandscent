import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import Script from 'next/script'
import { Providers } from '@/components/layout/Providers'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://colorandscent.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'COLOR & SCENT | Premium Candles & Home Fragrance',
    template: '%s | COLOR & SCENT',
  },
  description: 'Discover Your Signature Scent. Hand-poured candles and curated home fragrance that transforms your space. Samurai cats, ramen dragons, and kawaii creatures await.',
  keywords: ['candles', 'home fragrance', 'scented candles', 'home décor', 'wax melts', 'artisan fragrance'],
  authors: [{ name: 'COLOR & SCENT' }],
  creator: 'COLOR & SCENT',
  openGraph: {
    title: 'COLOR & SCENT | Premium Candles & Home Fragrance',
    description: 'Wear the Culture. Premium garment-dyed t-shirts featuring hand-illustrated artisan fragrance.',
    type: 'website',
    siteName: 'COLOR & SCENT',
    images: [{ url: '/og?title=COLOR & SCENT+&subtitle=Japanese-Inspired+Apparel&emoji=🍜', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COLOR & SCENT | Premium Candles & Home Fragrance',
    description: 'Wear the Culture. Premium Japanese-inspired wax melts.',
    images: ['/og?title=COLOR & SCENT+&subtitle=Japanese-Inspired+Apparel&emoji=🍜'],
  },
  other: {
    'facebook-domain-verification': '0vslkjo0x03pv1ysm2bwfrqil2bv0f',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1219641623573647');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1219641623573647&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet" />
        <SmoothScrollProvider>
          <Providers>{children}</Providers>
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
