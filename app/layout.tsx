import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import {
  Abril_Fatface,
  Bodoni_Moda,
  Cardo,
  Cormorant,
  Inter,
  Libre_Bodoni,
  Literata,
  Old_Standard_TT,
  Quattrocento,
  Rufina,
  Suranna,
} from 'next/font/google'
import Script from 'next/script'
import { Providers } from '@/components/layout/Providers'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

// Temporary heading-font lab for Color & Scent.
// Direction: lifestyle magazine / elegant home / giftable candle display faces — fresh, simple, non-techy.
const literata = Literata({ subsets: ['latin'], variable: '--font-literata', display: 'swap' })
const cardo = Cardo({ subsets: ['latin'], variable: '--font-cardo', display: 'swap', weight: ['400', '700'] })
const cormorant = Cormorant({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap', weight: ['400', '500', '600', '700'] })
const quattrocento = Quattrocento({ subsets: ['latin'], variable: '--font-quattrocento', display: 'swap', weight: ['400', '700'] })
const libreBodoni = Libre_Bodoni({ subsets: ['latin'], variable: '--font-libre-bodoni', display: 'swap' })
const bodoniModa = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni-moda', display: 'swap' })
const rufina = Rufina({ subsets: ['latin'], variable: '--font-rufina', display: 'swap', weight: ['400', '700'] })
const oldStandard = Old_Standard_TT({ subsets: ['latin'], variable: '--font-old-standard', display: 'swap', weight: ['400', '700'] })
const abrilFatface = Abril_Fatface({ subsets: ['latin'], variable: '--font-abril-fatface', display: 'swap', weight: '400' })
const suranna = Suranna({ subsets: ['latin'], variable: '--font-suranna', display: 'swap', weight: '400' })

const headingFontVariables = [
  literata.variable,
  cardo.variable,
  cormorant.variable,
  quattrocento.variable,
  libreBodoni.variable,
  bodoniModa.variable,
  rufina.variable,
  oldStandard.variable,
  abrilFatface.variable,
  suranna.variable,
].join(' ')

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://colorandscent.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'COLOR & SCENT | Cozy Candles & Thoughtful Gifts', template: '%s | COLOR & SCENT' },
  description: 'Elegant scented candles for thoughtful gifts, cozy rooms, and everyday rituals.',
  keywords: ['candles', 'home fragrance', 'scented candles', 'scent notes', 'home décor'],
  authors: [{ name: 'COLOR & SCENT' }],
  creator: 'COLOR & SCENT',
  openGraph: {
    title: 'COLOR & SCENT | Cozy Candles & Thoughtful Gifts',
    description: 'Elegant scented candles for thoughtful gifts, cozy rooms, and everyday rituals.',
    type: 'website',
    siteName: 'COLOR & SCENT',
    images: [{ url: '/og?title=COLOR & SCENT+&subtitle=Scent,+in+color&emoji=🕯️', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COLOR & SCENT | Cozy Candles & Thoughtful Gifts',
    description: 'Elegant scented candles for thoughtful gifts and cozy rooms.',
    images: ['/og?title=COLOR & SCENT+&subtitle=Scent,+in+color&emoji=🕯️'],
  },
  other: { 'facebook-domain-verification': '0vslkjo0x03pv1ysm2bwfrqil2bv0f' },
}

export const viewport: Viewport = { themeColor: '#F6F0E7', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${headingFontVariables}`} data-heading-font="literata">
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1219641623573647');fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1219641623573647&ev=PageView&noscript=1" alt="" />
        </noscript>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScrollProvider>
          <Providers>{children}</Providers>
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
