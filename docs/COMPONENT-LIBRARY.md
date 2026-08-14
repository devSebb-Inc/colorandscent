# Color & Scent — Component Library

> **Version:** 1.0 · August 2026
> Tokens come from [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Base primitives are shadcn/ui (`components/ui/`); brand components live in `components/storefront/`. All examples are Tailwind v4 + the CSS variables defined in `app/globals.css`.

---

## 1. Buttons

All buttons: Inter 600, uppercase, tracking `0.08em`, 14px (13px on `sm`), radius `--radius-md` (10px), transition `all 200ms var(--ease-out-luxe)`. Focus-visible: 2px amber ring offset 2px (see ACCESSIBILITY-GUIDE §3).

### 1.1 Primary — amber solid
The single conversion button per view (hero CTA, add to cart, newsletter submit).

```
Default   bg #b8860b   text #1a1a1a
Hover     bg #d4a017   translateY(-1px)   shadow 0 8px 24px rgba(184,134,11,.25)
Active    bg #9a7009   translateY(0)
Loading   spinner replaces label, width locked (no reflow)
Disabled  bg #b8860b/40, text #1a1a1a/50, no pointer events
```

```tsx
<Button variant="primary" size="lg">Shop the Collection <ArrowRight /></Button>
// arrow: translate-x-1 on group-hover
```

Sizes: `sm` 36px · `md` 44px · `lg` 52px height, x-padding 20/28/36px. Full-width variant for mobile CTAs.

### 1.2 Secondary — ghost/outline
For "View all", filters, secondary paths. 1px `cream/25` border, cream text, transparent bg. Hover: border-amber, text-amber, bg `amber/8`.

On cream sections invert: charcoal border/text, hover fills charcoal with cream text.

### 1.3 Tertiary — text link
Amber text + 1px underline offset 4px; hover shifts underline to full opacity and arrow (if present) slides right. Used for "Our Story →", footer links use muted cream → cream on hover.

### 1.4 Icon button
40×40 hit area minimum (44×44 on touch), transparent, cream icon at 20px. Hover: `bg cream/10` circle. Cart icon carries the count badge (below).

### 1.5 Magnetic wrapper — `components/ui/MagneticButton.tsx` (exists)
Wraps primary CTAs on desktop only: button eases toward cursor within a 80px radius (max offset 8px, spring `stiffness 150 / damping 15`). Disabled on touch and under `prefers-reduced-motion`.

---

## 2. Product Card

The workhorse. Used on homepage grid, `/products`, related products.

```
┌──────────────────────┐
│ ┌──────────────────┐ │ ← 4:5 image, radius-lg, overflow hidden
│ │   product image  │ │   hover: img scale 1.05 (500ms ease-out-luxe)
│ │ [BEST SELLER]    │ │ ← badge top-left (see §5)
│ │        [+ Quick] │ │ ← quick-add: slides up on hover (desktop),
│ └──────────────────┘ │   always-visible "+" chip on touch
│ CORE COLLECTION      │ ← mono 11px uppercase, muted
│ Amber Glow           │ ← Playfair 20px, cream
│ Vanilla · Amber · Fir│ ← top scent hints, Inter 13px muted
│ ★ 4.9 (127)          │ ← amber star, muted count
│ $24.99               │ ← Inter 600 16px
└──────────────────────┘
```

- Card surface: transparent on dark sections (image is the card); on cream sections wrap in `soft-white` card with hairline border.
- Whole card is one `<Link>`; quick-add is a nested button with `e.preventDefault()` — hit areas don't overlap (quick-add ≥44px).
- Hover (desktop): image zoom + second mockup crossfades in if available; title → amber. No lift/shadow on the card itself — keep it editorial, not app-like.
- Skeleton: `components/ui/skeleton.tsx` block at 4:5 + 3 text rows, shimmer in `cream/8`.

## 2b. Review Card

Charcoal-900 surface, radius-lg, 24px padding: ★ row (amber) → quote (Inter 15px/1.6, clamp 4 lines) → name + "Verified buyer" (muted 13px). Cream-section variant: soft-white bg, charcoal text.

---

## 3. Navigation

### 3.1 Header — `Header.tsx`
- 72px desktop / 56px mobile. Over hero: transparent, cream content. Scrolled >24px: `bg charcoal-950/85`, `backdrop-blur-md`, hairline `border-b cream/10`, height eases to 64px.
- Nav links: Inter 13px uppercase tracking `0.12em`, muted-cream → cream on hover with amber 1px underline growing left→right (200ms).
- Active route: amber underline persists (`aria-current="page"`).
- Cart badge: 16px amber circle, charcoal 10px count, `-top-1 -right-1`; pulses (`.animate-pulse-badge`) when count changes.

### 3.2 Mobile menu
Full-screen overlay `charcoal-950/98` + blur. Links in Playfair 32px, staggered fade-up (60ms interval). Secondary block: FAQ, Track Order, Contact in Inter 15px. Close (×) top-right, 44px. Focus is trapped; body scroll locked; esc closes (Radix `Dialog`/`Sheet` handles all three).

### 3.3 Filter pills (collection grid)
Height 36px, radius-full, Inter 13px. Inactive: `border cream/20`, muted text. Active: amber fill, charcoal text, 600 weight. Row scrolls horizontally on mobile (`.scrollbar-hide`, fade-out mask at right edge). Implemented as `ToggleGroup` (single) with `aria-pressed` semantics.

### 3.4 Breadcrumb
`components/ui/breadcrumb.tsx`: muted 13px, `/` separators, current page cream and not a link. Emits `BreadcrumbList` JSON-LD.

### 3.5 Footer — `Footer.tsx`
Charcoal-950, `border-t cream/10`, 80px vertical padding. Column heads: mono 11px uppercase amber. Links: muted → cream. Bottom bar: 13px muted, payment method icons at 24px grayscale.

---

## 4. Cart Drawer — `CartDrawer.tsx`

- Radix Sheet from right, 420px (100vw − 24px on mobile), charcoal-900, spring slide-in (300ms).
- Rows: 72px thumb, name (Playfair 16px), scent/lid meta, qty stepper, line price, remove (trash icon, confirm-free — undo via toast instead).
- `FreeShippingProgress` pinned above the summary.
- Footer: subtotal (shipping/tax "calculated at checkout"), primary CHECKOUT button, "or continue shopping" text link.
- Empty state: outline candle illustration, "Your cart is empty — light it up", ghost button → `/products`.

---

## 5. Badges & status

| Badge | Style |
|---|---|
| BEST SELLER | amber fill, charcoal text |
| NEW | cream fill, charcoal text |
| STAFF PICK / HAND POURED / LONGEST BURN / GIFT READY | transparent, 1px amber border, amber text |
| Sale (future) | reserved — no red in this palette; use cream on charcoal |

All: mono 10px uppercase tracking `0.1em`, 4px/8px padding, radius-sm. Max one badge per card (priority: BEST SELLER > NEW > others).

---

## 6. Forms & inputs

- Input (`components/ui/input.tsx`): 48px, `bg charcoal-800`, `border cream/15`, radius-md, cream text, placeholder `muted`. Focus: amber border + ring. Error: 1px `#e05252` border + 13px message with icon below (never color alone).
- Newsletter combo: input + button joined (radius on outer corners only) on desktop; stacked full-width on mobile.
- Quantity stepper: 44px square − / + buttons, value readonly-styled but announced via `aria-live="polite"`.
- Select (scent on mobile if pills overflow): Radix `Select`, same surface tokens.

---

## 7. Feedback

- **Toast** (`sonner`): bottom-center mobile / bottom-right desktop, charcoal-800 + hairline, 3.5s. Add-to-cart toast includes 32px thumb + "View cart" action.
- **Skeletons**: every async surface (grid, PDP gallery, cart rows) has a same-size skeleton — no spinners on page-level loads, no layout shift.
- **Empty states**: one illustration style (thin amber line-art), one sentence, one action.

---

## 8. Section scaffolding

```tsx
<Section tone="dark" | "cream">     // controls bg + text token flip
  <Eyebrow>SHOP</Eyebrow>            // mono 11px uppercase amber, mb-3
  <H2>The Collection</H2>            // Playfair clamp(1.75rem, 3vw, 2.5rem)
  <Lede>…</Lede>                     // optional, Inter 17px muted, max-w-prose
  {children}
</Section>
```

Vertical rhythm: sections `py-24` desktop / `py-16` mobile; container `max-w-7xl px-6 md:px-10`. Alternate dark → cream tones deliberately (see homepage flow) — the inversion is the brand's visual signature.
