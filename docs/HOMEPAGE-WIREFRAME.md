# Color & Scent — Homepage Wireframe

> **Version:** 1.0 · August 2026
> Companion to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Component names reference real files in `components/storefront/`.

---

## Page Goal

One scroll = one story: **arrive in a moody, candlelit room → meet the products → believe the brand → join the list.**
Primary conversion: click-through to a PDP. Secondary: newsletter capture ("Join the Scent Circle").

---

## Full-Page Flow (desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ① ANNOUNCEMENT BAR   Free U.S. shipping over $50 · 30-day returns   │  32px, amber text on charcoal
├──────────────────────────────────────────────────────────────────────┤
│ ② STICKY HEADER                                                      │
│  COLOR & SCENT        Shop  Collections  About  FAQ         ◌ 🛒(2) │  72px, blurs on scroll
├──────────────────────────────────────────────────────────────────────┤
│ ③ HERO  (100svh, full-bleed)                                         │
│                                                                      │
│    [ Lifestyle photo: lit candles on a walnut shelf, dusk light,     │
│      deep shadows — charcoal/amber grade, subtle Ken Burns zoom ]    │
│                                                                      │
│         Discover Your                                                │
│         Signature Scent               ← Playfair Display, cream,     │
│                                         clamp(2.5rem → 6rem)         │
│         Hand-poured candles crafted                                  │
│         to transform your space.      ← Inter, cream/80              │
│                                                                      │
│         [ SHOP THE COLLECTION → ]     ← amber solid, magnetic hover  │
│                                                                      │
│                        ⌄  scroll cue (fades after first scroll)      │
├──────────────────────────────────────────────────────────────────────┤
│ ④ MARQUEE STRIP  (48px, cream band, charcoal text, 30s loop)         │
│  — SOY WAX — HAND POURED — LONG BURNING — NATURAL SCENTS — PREMIUM   │
│  GLASS — UNIQUE FRAGRANCES — SOY WAX — HAND POURED — …               │
├──────────────────────────────────────────────────────────────────────┤
│ ⑤ FEATURED COLLECTION                                                │
│                                                                      │
│   The Collection                      ← Playfair, section eyebrow    │
│   [ All ] [ Core ] [ Premium ] [ Signature ] [ Gifts ]  ← filter pills│
│                                                                      │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                │
│   │ Amber   │  │ After   │  │ Midnight│  │ Golden  │                │
│   │ Glow    │  │ Hours   │  │ Bloom   │  │ Hour    │                │
│   │ ★4.9    │  │ NEW     │  │         │  │ BEST    │                │
│   │ $24.99  │  │ $29.99  │  │ $29.99  │  │ SELLER  │                │
│   │ [+ ADD] │  │ [+ ADD] │  │ [+ ADD] │  │ $24.99  │                │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘                │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                │
│   │ Calm &  │  │ Soft    │  │ Fresh   │  │Essentials│               │
│   │Collected│  │ Life    │  │ Start   │  │Collection│               │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘                │
│                                                                      │
│                    [ VIEW ALL PRODUCTS ]   ← ghost button            │
├──────────────────────────────────────────────────────────────────────┤
│ ⑥ BRAND MOMENT  (full-bleed cream section — palette inversion)       │
│                                                                      │
│   ┌────────────────────┐   "Every scent begins as a color."          │
│   │ Detail photo:      │                                             │
│   │ pouring wax,       │   Two short paragraphs of brand story —     │
│   │ close crop         │   hand-poured, small-batch, mood-first.     │
│   └────────────────────┘   [ OUR STORY → ]  ← text link, amber       │
├──────────────────────────────────────────────────────────────────────┤
│ ⑦ REVIEWS — "The People Have Spoken"                                 │
│                                                                      │
│        ★★★★★  4.9 / 5   ·  based on 400+ reviews                     │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐                          │
│   │ "Smells   │ │ "Burns so │ │ "The jar  │   ← 3-up carousel,       │
│   │ incredible│ │ evenly…"  │ │ is art…"  │     embla, drag on       │
│   │ …" — Maya │ │ — Jordan  │ │ — Priya   │     mobile               │
│   └───────────┘ └───────────┘ └───────────┘                          │
├──────────────────────────────────────────────────────────────────────┤
│ ⑧ VALUE PROPS — "Built Different"  (4-up, icons, stagger on scroll)  │
│                                                                      │
│   🌿 Natural        🕯 Hand-        ⏱ 50hr+         ◇ Premium        │
│   Soy Wax           Poured          Burn Time       Glass Vessels    │
├──────────────────────────────────────────────────────────────────────┤
│ ⑨ NEWSLETTER — "JOIN THE SCENT CIRCLE"                               │
│                                                                      │
│   Get first access to new scents, seasonal drops, and 20% off        │
│   your first order.                                                  │
│   ┌───────────────────────────────┐ ┌──────────────┐                 │
│   │ you@example.com               │ │ GET 20% OFF  │                 │
│   └───────────────────────────────┘ └──────────────┘                 │
├──────────────────────────────────────────────────────────────────────┤
│ ⑩ FOOTER                                                             │
│  COLOR & SCENT          SHOP        HELP           FOLLOW            │
│  Hand-poured candles    All         FAQ            Instagram         │
│  crafted to transform   Core        Shipping       TikTok            │
│  your space.            Premium     Returns        Pinterest         │
│                         Gifts       Track Order                      │
│                         Contact     Policies                         │
│  © 2026 Color & Scent · Privacy · Terms                              │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Section Specs

### ① Announcement Bar — `AnnouncementBar.tsx`
- 32px tall, `charcoal-900` bg, `cream` 12px text, amber for the offer ("over **$50**").
- Rotates 2–3 messages (crossfade every 6s): shipping threshold → 30-day returns → current promo.
- Dismissable on mobile (persists via `localStorage`).

### ② Header — `Header.tsx`
- Transparent over hero, transitions to `charcoal-950/85` + `backdrop-blur-md` + bottom hairline after 24px scroll.
- Left: wordmark (Playfair Display, letterspaced small caps). Center: Shop / Collections / About / FAQ. Right: search icon (optional v2), cart icon with amber count badge.
- Cart click opens `CartDrawer.tsx` (right sheet), never navigates away.
- Mobile: hamburger left, wordmark center, cart right. Menu = full-screen charcoal overlay, links in Playfair at 32px, staggered fade-in.

### ③ Hero — `HeroBanner.tsx`
- `100svh` full-bleed image (art direction: `next/image` with `priority`, mobile crop 4:5, desktop 16:9). Dark gradient scrim `from-charcoal-950/70 via-transparent` for text contrast (see ACCESSIBILITY-GUIDE).
- Copy block left-aligned on desktop (max-w 560px, offset from left gutter), centered on mobile.
- H1: "Discover Your Signature Scent" — two lines, word-level stagger reveal (see ANIMATION-SPEC §2).
- CTA: `SHOP THE COLLECTION →` primary amber button, arrow slides 4px on hover, magnetic effect via `MagneticButton.tsx` (desktop only).
- Slow Ken Burns zoom on the image (scale 1 → 1.06 over 12s, once). Disabled under `prefers-reduced-motion`.

### ④ Marquee — `MarqueeStrip.tsx`
- Cream band (this is the first palette inversion — it pops against the dark hero and section below).
- Items: `— SOY WAX`, `— HAND POURED`, `— LONG BURNING`, `— NATURAL SCENTS`, `— PREMIUM GLASS`, `— UNIQUE FRAGRANCES`, duplicated for the seamless `-50%` loop already in `globals.css` (`.animate-marquee`, 30s linear).
- Uppercase Inter, 13px, tracking `0.14em`, charcoal text. Pauses on hover; static row under reduced motion.

### ⑤ Featured Collection — `ProductSection.tsx`
- Section header row: eyebrow "SHOP" (mono/uppercase, amber) + H2 "The Collection".
- Filter pills map to catalog categories (Core / Premium / Signature / Sampler / Gift). Active pill = amber fill, charcoal text; layout animates with Framer Motion `layout` + `AnimatePresence` on card exit/enter.
- Grid: 2-col mobile → 3-col md → 4-col xl, `gap-6`. Cards per COMPONENT-LIBRARY §2 (image 4:5, hover zoom, quick-add).
- All 8 SKUs at launch; "VIEW ALL PRODUCTS" ghost button → `/products`.

### ⑥ Brand Moment
- Cream `#f5f0e8` background, charcoal text — the editorial "breather" between commerce sections.
- 2-col: 4:5 detail photo (pour shot) | pull-quote in Playfair italic 32px + 2 short paragraphs + amber text-link. Stacks image-first on mobile.

### ⑦ Reviews — `ReviewsSection.tsx`
- H2: "The People Have Spoken". Aggregate line: 4.9 ★ in amber, count in muted cream.
- 3-up card carousel (embla, already a dependency): quote, ★ row, first name + verified badge. Drag-scroll with snap on mobile (1.15 cards visible to signal scrollability).

### ⑧ Value Props — `ValueProps.tsx`
- H2: "Built Different". 4 items: Natural Soy Wax / Hand-Poured / 50hr+ Burn / Premium Glass Vessels.
- Thin-stroke lucide icons in amber inside 56px circles, title 16px semibold, one-line supporting text. 2×2 grid on mobile.
- Staggered fade-up on scroll entry (80ms interval).

### ⑨ Newsletter — `NewsletterSignup.tsx`
- Charcoal-900 card with subtle amber radial glow behind heading. H2 "JOIN THE SCENT CIRCLE" (Playfair, letterspaced).
- Single email field + `GET 20% OFF` amber button; inline success state ("Check your inbox ✨") — no page reload, no popup at launch (exit-intent popup is a v2 experiment).
- Feeds Supabase `newsletter_subscribers` (or Resend audience) — wire to existing API route.

### ⑩ Footer — `Footer.tsx`
- Charcoal-950, hairline top border. 4 columns → accordion-free single column stack on mobile (links are few enough).
- Brand column: wordmark + tagline + payment icons. Bottom row: copyright, Privacy, Terms.

---

## Mobile Order (unchanged, single column)

Announcement → Header → Hero (4:5 crop, centered copy) → Marquee → Collection (2-col grid, horizontal filter pills scroll) → Brand Moment (stacked) → Reviews (swipe carousel) → Value Props (2×2) → Newsletter → Footer.

Sticky elements on mobile: header (collapsed 56px) and `MobileCartButton.tsx` (floating cart FAB, appears only when cart is non-empty).

---

## Performance Notes

- Hero image: AVIF/WebP via `next/image`, `priority`, `sizes="100vw"`; everything below the fold `loading="lazy"`.
- Sections ⑤–⑨ enter via `whileInView` with `viewport={{ once: true, margin: "-80px" }}` — no re-triggering, no CLS (reserve space, animate `opacity/transform` only).
- Target: LCP < 2.5s on 4G, CLS < 0.1, Lighthouse ≥ 90 (see DESIGN-SYSTEM §9).
