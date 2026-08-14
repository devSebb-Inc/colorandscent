# Color & Scent — Product Detail Page Wireframe

> **Version:** 1.0 · August 2026
> Companion to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Components live in `components/storefront/pdp/`.
> Route: `app/(storefront)/products/[slug]/page.tsx`

---

## Page Goal

Answer the three PDP questions in the first viewport — **what does it smell like, how long does it last, why this one** — and make add-to-cart available at every scroll depth (inline CTA above the fold, `StickyCartBar` below it).

---

## Desktop Layout (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Announcement bar + sticky header (shared)                                │
├──────────────────────────────────────────────────────────────────────────┤
│ Home / Shop / Amber Glow                       ← breadcrumb, muted 13px  │
├───────────────────────────────────┬──────────────────────────────────────┤
│ GALLERY (55%)                     │ BUY PANEL (45%, sticky to gallery ht)│
│ ┌───────────────────────────────┐ │                                      │
│ │                               │ │  CORE COLLECTION · ★ 4.9 (127)       │
│ │   Main image (4:5)            │ │  Amber Glow                          │
│ │   hover: 2× zoom lens         │ │  ← Playfair, 40px                    │
│ │   click: full-screen lightbox │ │                                      │
│ │                               │ │  $24.99                              │
│ │                               │ │  Soy wax · 9oz amber jar · ~50hr burn│
│ └───────────────────────────────┘ │                                      │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │  SCENT                               │
│ │ th1 │ │ th2 │ │ th3 │ │ th4 │   │  (Vanilla Bean) (Black Coral & Moss) │
│ └─────┘ └─────┘ └─────┘ └─────┘   │  (Sea Salt+Orchid) (Cashmere Vanilla)│
│  ← thumbs: active = amber ring    │  (Oakmoss+Amber) (Fraser Fir)        │
│                                   │   ← pill selector, wraps             │
│                                   │                                      │
│                                   │  LID  ( Black | Gold | Silver )      │
│                                   │                                      │
│                                   │  ┌───┬─────┬───┐ ┌────────────────┐  │
│                                   │  │ − │  1  │ + │ │  ADD TO CART   │  │
│                                   │  └───┴─────┴───┘ └────────────────┘  │
│                                   │        ↑ qty        ↑ amber, full-ht │
│                                   │                                      │
│                                   │  ┌────────────────────────────────┐  │
│                                   │  │ 🚚 You're $25.01 from free     │  │
│                                   │  │ shipping  ▓▓▓▓▓░░░░░           │  │
│                                   │  └────────────────────────────────┘  │
│                                   │   ← FreeShippingProgress             │
│                                   │                                      │
│                                   │  ✓ Free Shipping $50+                │
│                                   │  ✓ 30-Day Returns                    │
│                                   │  ✓ Secure Checkout                   │
│                                   │   ← TrustBadges, muted row           │
├───────────────────────────────────┴──────────────────────────────────────┤
│ SCENT NOTES  (cream band — palette inversion)                            │
│                                                                          │
│      TOP                    HEART                    BASE                │
│      Bergamot zest          Warm vanilla bean        Amber & tonka       │
│      first 20 minutes       the heart of the burn    lingers for hours   │
│      ← three columns, thin rules between, mono eyebrow labels            │
├──────────────────────────────────────────────────────────────────────────┤
│ THE STORY  (2-col: evocative copy | lifestyle image)  ← ProductStory     │
│  "Amber Glow is the last hour of golden light, poured into a jar…"       │
│  + specs table: Wax / Vessel / Burn time / Weight / Wick                 │
├──────────────────────────────────────────────────────────────────────────┤
│ WHY COLOR & SCENT  (4-up mini value props — reuse of homepage ⑧)         │
├──────────────────────────────────────────────────────────────────────────┤
│ CANDLE CARE + FAQ  (accordion: first burn, trimming, safety, shipping)   │
├──────────────────────────────────────────────────────────────────────────┤
│ REVIEWS  (aggregate + list, "Write a review")                            │
├──────────────────────────────────────────────────────────────────────────┤
│ YOU MAY ALSO LIKE  (4-up product cards) ← RelatedProducts                │
├──────────────────────────────────────────────────────────────────────────┤
│ Footer (shared)                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout (<768px)

```
┌────────────────────────────┐
│ header (56px, sticky)      │
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │  Image carousel (4:5)  │ │ ← swipe, snap; dots + "1/5" counter
│ │  ● ○ ○ ○ ○             │ │   pinch/double-tap zoom in lightbox
│ └────────────────────────┘ │
│ CORE COLLECTION  ★4.9(127) │
│ Amber Glow                 │ ← Playfair 28px
│ $24.99                     │
│ Soy · 9oz · ~50hr          │
│                            │
│ SCENT  (pills, wrap)       │
│ LID    (3 swatches)        │
│                            │
│ [ − 1 + ] [ ADD TO CART ]  │ ← inline first, then StickyCartBar
│ 🚚 free-shipping progress   │
│ ✓ $50+ ship ✓ Returns ✓ 🔒 │
├────────────────────────────┤
│ Scent notes (stacked rows) │
│ Story (image → copy)       │
│ Specs table                │
│ Care/FAQ accordion         │
│ Reviews                    │
│ You may also like (2-col)  │
├────────────────────────────┤
│ STICKY CART BAR (bottom)   │
│ Amber Glow · $24.99 [ADD]  │ ← appears after inline CTA scrolls off
└────────────────────────────┘
```

---

## Component Specs

### Gallery — `ImageGallery.tsx`
- Desktop: main 4:5 image + thumbnail rail. Thumb click crossfades main (200ms). Hover shows zoom lens (2×, `transform-origin` follows cursor); click opens lightbox (full-screen, charcoal-950/95 backdrop, esc/swipe to close).
- Mobile: embla swipe carousel with snap + counter. No hover zoom; lightbox handles pinch/double-tap.
- Sources: Printify mockups seeded via `scripts/seed-images-from-printify.js`. Always render 4:5 with `next/image` `fill` + `sizes="(min-width:1024px) 55vw, 100vw"`; first image `priority` (it's the LCP).
- Selecting a scent/lid variant swaps to that variant's mockup when one exists (crossfade, 200ms).

### Buy panel
- Order is fixed: category+rating → name → price → spec one-liner → scent → lid → qty+CTA → shipping progress → trust badges. Nothing above the CTA should push it below the fold on a 13" laptop.
- **Scent selector** (`ColorSelector.tsx` → rename `ScentSelector`): pill per scent option from the catalog (e.g. Amber Glow's six Core scents). Selected = amber border + amber-tint fill; one line of scent descriptors ("warm, sweet, classic") appears under the group on selection.
- **Lid selector** (`SizeSelector.tsx` repurposed): 3 swatch circles (black/gold/silver) with visible labels — color is never the only signal.
- **Qty + CTA** (`AddToCartCTA.tsx`): stepper (min 1, max 10) + full-width amber button. States: default → loading (spinner, ~400ms min) → success ("ADDED ✓", 1.2s) → default. Adding opens `CartDrawer` on desktop, fires toast + badge pulse on mobile.
- **`FreeShippingProgress.tsx`**: reads cart subtotal; "You're $X from free shipping" + amber progress bar; switches to "🎉 You've unlocked free shipping" at $50.
- **`TrustBadges.tsx`**: Free Shipping $50+ · 30-Day Returns · Secure Checkout. Lucide icons, muted, 13px — quiet, not salesy.

### Sticky cart bar — `StickyCartBar.tsx`
- Trigger: inline CTA leaves viewport (IntersectionObserver). Slides up from bottom (`.animate-slide-up`), 64px, charcoal-900/95 + blur, hairline top border.
- Contents: 40px product thumb, name (truncated), selected scent, price, compact ADD button. Desktop version may dock top-right under the header instead; mobile is bottom, above the safe-area inset.

### Scent notes
- Structured top/heart/base for every product (author in Supabase `products.metadata.scent_notes`). Mono uppercase eyebrows (`TOP / HEART / BASE`), Playfair note names, one supporting line each.
- This section doubles as the "smell through the screen" moment — the copy carries it; keep it evocative but specific.

### Story + specs — `ProductStory.tsx`
- 2–3 sentence mood narrative per SKU (source: PRODUCT-CATALOG.md marketing copy, expanded), then a hairline-ruled spec table: Wax (soy) / Vessel / Burn time / Weight / Wick / Made (hand-poured to order).

### FAQ — `ProductFAQ.tsx`
- shadcn `accordion`. Launch set: first-burn instructions, wick trimming, safety, "when will it ship?" (Printify: poured to order, ships in 3–5 business days — honesty here prevents support tickets).

### Related — `RelatedProducts.tsx`
- "You may also like": same-category first, then bestsellers; exclude current SKU; max 4. Standard product cards.

### Rename note
- `WhyNoren.tsx` → `WhyColorAndScent.tsx` (content: the four "Built Different" props). `SizeGuide.tsx` is apparel-era; replace with a burn-time/size comparison of 4oz tin / 9oz / 11oz / 13.75oz.

---

## SEO / structured data (per PDP)

- `generateMetadata`: title `"{Product} — Hand-Poured Soy Candle | Color & Scent"`, description from story copy (≤155 chars), OG image from `app/og/`.
- JSON-LD `Product` schema: name, image, description, sku, brand, offers (price, priceCurrency, availability), aggregateRating when reviews exist. `BreadcrumbList` for the crumb trail.
- Canonical URL per slug; variants stay on one URL (no thin per-variant pages).
