# Color & Scent — Design System

> **Version:** 1.0 · August 2026 · The master reference for colorandscent.com.
> Companion docs: [HOMEPAGE-WIREFRAME](./HOMEPAGE-WIREFRAME.md) · [PDP-WIREFRAME](./PDP-WIREFRAME.md) · [COMPONENT-LIBRARY](./COMPONENT-LIBRARY.md) · [ANIMATION-SPEC](./ANIMATION-SPEC.md) · [RESPONSIVE-SPEC](./RESPONSIVE-SPEC.md) · [ACCESSIBILITY-GUIDE](./ACCESSIBILITY-GUIDE.md) · research in [DESIGN-BRIEF](./DESIGN-BRIEF.md)
> Stack: Next.js App Router · Tailwind CSS v4 · shadcn/ui · Framer Motion · Supabase · Printify

---

## 1. Brand Foundation

**Color & Scent** — hand-poured candles crafted to transform your space. Premium, cozy, modern, inviting. Price band $19.99–$54.99 (accessible-premium). Eight launch SKUs: Amber Glow, After Hours, Midnight Bloom, Golden Hour, Calm & Collected, Soft Life, Fresh Start, Essentials Collection.

### 1.1 Design principles

1. **Candlelit, not clinical.** Deep charcoal canvas with warm amber light and cream air. The site should feel like the room the candle is burning in.
2. **Editorial, not app-like.** Serif headlines, generous whitespace, hairline rules, photography doing the talking. No card shadows, no gradients-as-decoration, no red urgency.
3. **One conversion per view.** A single amber button owns each viewport; everything else is ghost, text, or quiet.
4. **The inversion is the signature.** Sections alternate dark charcoal ↔ warm cream. That rhythm — night/flame — is the most recognizable thing about the site.
5. **Warmth with receipts.** Every claim is concrete: soy wax, ~50hr burn, hand-poured to order, 30-day returns. Poetic copy sits on factual bones.

### 1.2 Research synthesis (13 brands)

Full data: [DESIGN-BRIEF.md](./DESIGN-BRIEF.md) (Boy Smells, Byredo, Diptyque, Homesick, Otherland, P.F. Candle Co, Apotheke, Brooklyn Candle Studio) + supplementary Aug 2026 research (Le Labo, Anthropologie, West Elm, CB2, Rifle Paper Co). What we adopt, adapt, and deliberately reject:

| Insight | Source | Our move |
|---|---|---|
| Serif headings signal premium; 5/8 candle brands pair a serif display with a workhorse sans | Diptyque, Brooklyn, Homesick, Anthropologie | **Adopt:** Playfair Display + Inter |
| Every brand builds on black+white with one signature accent | all 13 | **Adopt:** charcoal + cream base, amber as the sole accent |
| Premium "darkness" usually comes from photography over light page chrome | Le Labo, CB2, West Elm | **Deliberately invert:** dark chrome *is* our differentiator — executed with 15:1 text contrast so it reads luxe, never murky |
| No competitor presents a structured top/heart/base scent pyramid prominently | all 13 | **Adopt hard:** the three-column scent-notes band is a PDP signature (PDP-WIREFRAME) |
| Scent descriptors on cards drive discovery | Boy Smells, Rifle Paper (prose), Anthropologie (families) | **Adopt:** one scent-hint line on every product card |
| Inline, discount-forward email capture beats popups | West Elm (15%), Rifle Paper (10%) | **Adopt:** in-page "Join the Scent Circle" + 20%; no popup at launch |
| Values badges outperform certifications at $20–55 | Rifle Paper ("Hand Painted / Crafted With Care / Founder-Led") | **Adopt:** "Built Different" 4-up value props |
| Price laddering $20 tin → $38 jar → large format | Rifle Paper, Otherland | **Adopt:** matches our $19.99–$54.99 catalog exactly |
| Review carousel front-and-center converts | Homesick, P.F. | **Adopt:** "The People Have Spoken", 4.9★ aggregate |
| Extreme minimalism (sparse PDP copy) | Byredo | **Reject:** at our price point, information sells; aura doesn't |
| Mega-nav / sprawling taxonomy | Anthropologie, West Elm | **Reject:** 8 SKUs → 4 nav links, flat structure |
| Red/urgency sale styling | mainstream retail | **Reject:** no red in the palette at all |

---

## 2. Color

### 2.1 Palette

The brand triad from the brief — deep charcoal `#1a1a1a`, warm amber `#b8860b`, cream `#f5f0e8` — expanded into working scales:

```
CHARCOAL (surfaces, dark sections)
  charcoal-950  #0f0f0f   page background
  charcoal-900  #1a1a1a   cards, drawers, elevated surfaces      ← brand charcoal
  charcoal-800  #262421   inputs, hover surfaces
  charcoal-700  #38352f   strong borders, scrollbar thumbs

AMBER (the flame — accent & action)
  amber-400     #d4a017   hover state
  amber-500     #b8860b   primary buttons, links, active states   ← brand amber
  amber-600     #9a7009   pressed state
  amber-ink     #8a6508   amber TEXT on cream sections (AA-safe)
  amber-glow    #b8860b/12  radial glow backgrounds only

CREAM (light sections, text on dark)
  cream         #f5f0e8   text on dark; light-section background  ← brand cream
  soft-white    #faf7f2   cards on cream sections
  muted         #a6a094   secondary text on dark
  muted-ink     #6b665c   secondary text on cream

FUNCTIONAL
  error         #e05252   form errors only (with icon + message)
  success       #7da87b   inline confirmations
  — no warning, no info, no sale-red. Scarcity/marketing states use amber or cream badges.
```

### 2.2 Usage rules

- **Section tones:** every section is `tone="dark"` (charcoal-950/900 bg, cream text) or `tone="cream"` (cream bg, charcoal-900 text). Components flip their tokens with the tone (COMPONENT-LIBRARY §8). Homepage rhythm: dark → dark → **cream** (marquee) → dark → **cream** (brand moment) → dark → dark → dark.
- **Amber is scarce.** Primary CTA, active/selected states, star glyphs, eyebrows, focus rings, one accent word — never body copy, never large fills beyond buttons and badges.
- On cream, amber text drops to `amber-ink` (`#8a6508`) — raw amber fails contrast on cream (ACCESSIBILITY-GUIDE §2).
- All verified contrast pairs and the no-new-pairs rule: ACCESSIBILITY-GUIDE §2.1. Headline pairs: cream/charcoal-900 **15.3:1**, amber/charcoal-900 **5.3:1**, charcoal-on-amber button **5.3:1**.

### 2.3 Token definition (Tailwind v4, `app/globals.css`)

```css
:root {
  --background: #0f0f0f;        --foreground: #f5f0e8;
  --card: #1a1a1a;              --card-foreground: #f5f0e8;
  --primary: #b8860b;           --primary-foreground: #1a1a1a;
  --secondary: #262421;         --secondary-foreground: #f5f0e8;
  --muted: #262421;             --muted-foreground: #a6a094;
  --accent: #b8860b;            --accent-foreground: #1a1a1a;
  --destructive: #e05252;       --border: #f5f0e8/10;  /* hairlines: cream at 10% */
  --input: #262421;             --ring: #b8860b;
  --radius: 0.75rem;
  --cs-cream: #f5f0e8;          --cs-soft-white: #faf7f2;
  --cs-amber-ink: #8a6508;      --cs-muted-ink: #6b665c;
}
```

(Replaces the Noren-era red/gold theme — migration in §11.)

---

## 3. Typography

### 3.1 Families

| Role | Face | Loading |
|---|---|---|
| Display / headings | **Playfair Display** (400, 500, 600 + italic) | `next/font/google`, `--font-display`, `display: swap` |
| Body / UI | **Inter** (400, 500, 600) | `next/font/google`, `--font-sans` (already wired) |
| Technical accent | **Geist Mono** — eyebrows, badges, scent-note labels, SKU/spec details | already in `--font-mono` |

Playfair earns its place on headlines and product names only. Mono is the "perfumer's label" voice (Le Labo pattern): TOP/HEART/BASE eyebrows, badges, spec tables. Everything else is Inter.

### 3.2 Scale (rem; fluid via clamp, see RESPONSIVE-SPEC §4)

| Token | Face / size / line-height | Use |
|---|---|---|
| `display-xl` | Playfair · clamp(2.5rem, 5vw + 1rem, 6rem) · 1.05 | Hero H1 only |
| `display-lg` | Playfair · clamp(1.75rem, 3vw, 2.5rem) · 1.15 | Section H2, PDP title |
| `display-md` | Playfair · 1.5rem · 1.25 | Card group titles, drawer headings |
| `title` | Playfair · 1.25rem · 1.3 | Product card names |
| `body-lg` | Inter · 1.0625rem · 1.6 | Ledes, story copy |
| `body` | Inter · 1rem · 1.6 | Default |
| `body-sm` | Inter · 0.875rem · 1.5 | Meta, trust rows |
| `caption` | Inter · 0.8125rem · 1.4 | Captions, breadcrumb, footer legal |
| `eyebrow` | Mono · 0.6875rem · uppercase · tracking 0.14em | Section eyebrows, badges, note labels |
| `button` | Inter 600 · 0.875rem · uppercase · tracking 0.08em | All buttons |

Rules: max two faces per view section; italics only for Playfair pull-quotes; numerals in prices use `tabular-nums`; prose measures capped at ~65ch.

---

## 4. Spacing & Layout — the 8px grid

All spacing is multiples of 8 (Tailwind's default 4px scale used at even steps; 4px allowed only inside compound components like badges).

| Step | px | Use |
|---|---|---|
| 1 | 8 | icon↔label gaps, badge padding |
| 2 | 16 | intra-component padding, mobile grid gap |
| 3 | 24 | card padding, grid gap (`gap-6`), container px mobile |
| 4 | 32 | block gaps within a section |
| 5 | 40 | container px desktop (`md:px-10`) |
| 6 | 48 | sub-section gaps, marquee height |
| 8 | 64 | section padding mobile (`py-16`) |
| 12 | 96 | section padding desktop (`md:py-24`) |

Container `max-w-7xl`; grids and full-bleed rules in RESPONSIVE-SPEC §2–3. Vertical rhythm inside a section: eyebrow → 12px → H2 → 16px → lede → 40px → content.

---

## 5. Shape, Surface & Depth

- **Radii:** `--radius` 12px base → `radius-sm` 8px (badges, pills-inner), `radius-md` 10px (buttons, inputs), `radius-lg` 12px (cards, images, drawers), `radius-full` (filter pills, swatches). Never mix radii on nested corners — inner = outer − padding.
- **Borders over shadows.** Depth comes from surface steps (950 → 900 → 800) and 1px hairlines (`cream/10` on dark, `charcoal-900/10` on cream). Shadows exist in exactly two places: the primary button's amber hover glow and drawer/lightbox overlays.
- **Overlays:** scrims `charcoal-950/60`–`/70` + `backdrop-blur-md` on header/sticky bar; hero gradient scrim per ACCESSIBILITY-GUIDE §2.2.
- **Imagery is the texture.** No background patterns; the amber radial glow (ANIMATION-SPEC §6) is the only decorative surface effect.

## 6. Iconography & Imagery

- **Icons:** lucide-react, 1.5px stroke, 20px UI / 24px value-props, `currentColor`. No filled or duotone icons; no emoji in UI chrome (wireframe emoji are shorthand).
- **Photography — "Elevated Warmth":** dusk-lit interiors, walnut/linen/ceramic props, charcoal-amber grade, 3200–4000K. Hero shots on warm neutral; every SKU: hero, lifestyle, detail, scale shots (full direction in DESIGN-BRIEF Part 3). Ratios: 4:5 product/gallery, 16:9 desktop hero, 1:1 thumbs.
- Printify mockups are placeholders at launch; replace above-the-fold imagery with real photography as the first post-launch investment.

## 7. Components

Full specs in [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md): buttons (primary amber / ghost / text / icon / magnetic), product card, review card, header + mobile menu, filter pills, breadcrumb, footer, cart drawer, badges, forms, toasts, skeletons, and the `Section/Eyebrow/H2/Lede` scaffolding. Page assemblies: [HOMEPAGE-WIREFRAME.md](./HOMEPAGE-WIREFRAME.md), [PDP-WIREFRAME.md](./PDP-WIREFRAME.md).

## 8. Motion

Full spec in [ANIMATION-SPEC.md](./ANIMATION-SPEC.md). Essence: `--ease-out-luxe` everywhere, 150–200ms for user-caused / 600ms for scroll reveals, hero word-stagger + once-only Ken Burns, marquee + amber glow as the only ambient loops, `prefers-reduced-motion` fully honored, transform/opacity only.

---

## 9. Performance Budget

Targets (Lighthouse mobile, mid-tier device, 4G):

| Metric | Budget |
|---|---|
| Lighthouse Performance / SEO / A11y / Best-practices | **≥ 90 / ≥ 95 / ≥ 95 / ≥ 95** |
| LCP (hero image / PDP main image) | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| JS shipped to storefront routes | < 200KB gzip first load |
| Hero image | < 180KB AVIF/WebP |

How we hit it:

1. **Images:** everything through `next/image` with honest `sizes` (RESPONSIVE-SPEC §6); hero + PDP first image `priority`, all else lazy; AVIF first.
2. **Fonts:** three families max via `next/font` (self-hosted, `swap`, preloaded subsets). Remove the render-blocking Noto Serif JP `<link>` (§11).
3. **JS:** server components by default; `"use client"` only for interactive leaves (cart, selectors, carousels, motion wrappers). Framer Motion imported per-component (`LazyMotion` + `domAnimation`), embla only on routes that carousel. No analytics beyond Vercel Analytics + the pixel already present.
4. **CLS discipline:** aspect-ratio boxes on every image, same-size skeletons, animations never move layout (ANIMATION-SPEC §8).
5. **Data:** product grid is statically rendered (ISR, revalidate on Printify/Supabase webhook); cart state client-side in zustand; no client fetch waterfalls above the fold.
6. CI check: Lighthouse CI on `/`, `/products`, one PDP per release; budgets enforced, regressions block.

## 10. SEO & Structured Data

- **Metadata:** per-route `generateMetadata` — homepage `"Color & Scent — Hand-Poured Soy Candles"`; PDP pattern + JSON-LD `Product`/`BreadcrumbList` per PDP-WIREFRAME; descriptions ≤155 chars from story copy.
- **Structured data:** `Organization` + `WebSite` on the homepage; `Product` with offers + `aggregateRating` (only when real reviews exist) on PDPs; `FAQPage` on the PDP care/FAQ accordion.
- **Infra:** `app/sitemap.ts` + `app/robots.ts` (exist — verify products enumerate from Supabase), canonical URLs, variants on one URL, OG images via `app/og/` (charcoal card, Playfair title, product shot).
- **Semantics:** one `h1`/page, real heading outline (ACCESSIBILITY-GUIDE §5.1), descriptive alt text, target keywords ("hand poured candles", "soy wax candles", "candle gift set") living in real copy — never stuffed.

---

## 11. Implementation & Migration

The codebase still carries the Noren "Tokyo at Midnight" theme. Migration order:

1. **Tokens** — replace `:root` in `app/globals.css` with §2.3 (red `#cc4444` → amber `#b8860b`, gold `#f0b429` retired, `--cs-jade` removed; selection/scrollbar colors updated to match).
2. **Fonts** — in `app/layout.tsx`: swap `Bricolage_Grotesque` → `Playfair_Display` on `--font-display`; delete the Noto Serif JP stylesheet links and `--font-jp`.
3. **Animations** — delete `.animate-gradient` and `.animate-float`; keep `.animate-marquee`; add `--ease-out-luxe`, duration tokens, `.animate-glow`, `.animate-pulse-badge` (ANIMATION-SPEC §1, §6); add the reduced-motion block (ANIMATION-SPEC §7).
4. **Motion lib** — create `lib/motion.ts` (variants in ANIMATION-SPEC §1.3); wrap app in `<MotionConfig reducedMotion="user">`.
5. **Components** — audit `components/storefront/` against COMPONENT-LIBRARY: renames (`WhyNoren` → `WhyColorAndScent`, `ColorSelector` → `ScentSelector`, repurpose `SizeSelector` → lid selector), retire `CustomCursor.tsx` (off-brand + a11y risk), add `Section` scaffolding, `TrustBadges`, `FreeShippingProgress`, `StickyCartBar`.
6. **Pages** — rebuild homepage sections per HOMEPAGE-WIREFRAME, then PDP per PDP-WIREFRAME.
7. **Verify** — QA matrix (RESPONSIVE-SPEC §7) + accessibility checklist (ACCESSIBILITY-GUIDE §10) + Lighthouse budgets (§9).

## 12. Document Map

| Doc | Owns |
|---|---|
| **DESIGN-SYSTEM.md** (this) | tokens, type, spacing, principles, performance, SEO, migration |
| COMPONENT-LIBRARY.md | every reusable component's states & anatomy |
| HOMEPAGE-WIREFRAME.md / PDP-WIREFRAME.md | page assembly & section specs |
| ANIMATION-SPEC.md | all motion (normative for reduced-motion) |
| RESPONSIVE-SPEC.md | breakpoints, per-surface layouts, image sizes |
| ACCESSIBILITY-GUIDE.md | contrast math, focus, ARIA, testing |
| DESIGN-BRIEF.md | competitive research (its indigo/blush palette recommendation is **superseded** by §2) |

Conflicts resolve in this order: ACCESSIBILITY-GUIDE > DESIGN-SYSTEM > specialized spec > wireframes.
