# Color & Scent Visual Upgrades Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Upgrade the Color & Scent website from a dark/template candle storefront into the research-backed “candlelit color atelier”: tactile, editorial, warm, interior-led, and scent-commerce clear.

**Architecture:** Preserve the existing Next.js storefront, cart drawer, product data/API fallback, Printify/Supabase integration path, and current checkout plumbing. Apply visual upgrades through shared design tokens, richer product data, reusable storefront components, then page-level composition. Do not invent reviews, press, heritage, fulfillment promises, or gift features that are not operationally true.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4 CSS variables in `app/globals.css`, Framer Motion, Zustand cart, Supabase/Drizzle product fallback path.

**Source docs:**
- `docs/DESIGN-RESEARCH-SYNTHESIS-2026.md` — north star; supersedes older docs on conflict.
- `docs/COMPETITIVE-VISUAL-RESEARCH-2026.md` — source-backed visual patterns.
- `docs/UX-CONVERSION-RESEARCH.md` — conversion and ecommerce architecture.
- `docs/ART-DIRECTION-BRAND-WORLD.md` — art direction, palette, photography, packaging implications.
- Existing implementation docs: `DESIGN-SYSTEM.md`, `HOMEPAGE-WIREFRAME.md`, `PDP-WIREFRAME.md`, `COMPONENT-LIBRARY.md`, `RESPONSIVE-SPEC.md`, `ACCESSIBILITY-GUIDE.md`.

**North star:** “The candlelit color atelier.”

**UX strategy:** “Structured sensory commerce.” Make scent understandable before click; make color tactile, not digital; make gift/bundle/trust paths obvious.

---

## Non-negotiable guardrails

1. Preserve working storefront routes:
   - `/`
   - `/products`
   - `/products/[slug]`
   - `/cart`
   - `/about`
   - `/faq`
   - `/contact`
2. Preserve cart behavior and checkout request shape.
3. Preserve static product fallback. Do not require Supabase to be live for local/storefront rendering.
4. No fake social proof:
   - remove/avoid “12K+ customers” unless real
   - remove/avoid “2,400+ reviews” unless real
   - no fake press logos
   - no fake “hand-poured in small batches” unless operationally confirmed
5. Use honest placeholder language where truth is not final:
   - “secure checkout” is okay if Stripe flow exists/configured
   - “free shipping threshold” only if actual shipping policy is true
   - “gift-ready packaging” only after packaging is operationally true
6. Product cards and PDPs must expose scent notes visibly, not buried in generic tags.
7. Visual polish cannot break accessibility: focus states, semantic buttons, reduced motion where needed, sufficient contrast.

---

## Current implementation baseline

Observed current files:

- Homepage composition: `app/(storefront)/page.tsx`
  - `HeroBanner`
  - `MarqueeStrip`
  - `ProductSection`
  - `ReviewsSection`
  - `ValueProps`
  - `NewsletterSignup`
- Global tokens: `app/globals.css`
  - current dark teal/gold theme: `#0D2F32`, `#C5A55A`, `#FFF8F0`
- Product data: `lib/data/products.ts`
  - already has name, subtitle, tags, color, colorHex, description, image, galleryImages
  - lacks structured scent fields: scentFamily, top/heart/base, roomFit, intensity, scentScene
- PDP: `app/(storefront)/products/[slug]/page.tsx` + `components/storefront/pdp/ProductHero.tsx`
  - currently includes hard-coded fake 4.9 / 2,400+ reviews in `ProductHero`
  - has product gallery and add-to-cart
  - needs visible scent architecture near CTA
- Cart: `components/storefront/CartDrawer.tsx`
  - has free shipping progress and trust line
  - needs warmer atelier styling and operationally truthful trust text

Repo status also shows many uncommitted changes. Before implementation, Mike/worker must run `git status --short` and avoid overwriting unrelated work.

---

## Phase 0 — Coordination and branch safety

### Task 0.1: Confirm whether Mike has active separate work

**Objective:** Prevent two workers from editing the same files blindly.

**Files:** None.

**Steps:**
1. Run:
   ```bash
   git status --short
   git branch --show-current
   ```
2. Check for running Hermes/background workers if in same session.
3. If there is a separate Mike session, assign him this plan and tell him to work branch-first.
4. If no separate worker is active, create a branch:
   ```bash
   git switch -c visual-upgrades-candlelit-atelier
   ```

**Verification:**
- Current branch is not dirty from another active implementation unless explicitly continuing it.
- No unexplained deletes or rebrands are overwritten.

---

## Phase 1 — Product truth layer for scent commerce

### Task 1.1: Add structured scent metadata to static product type

**Objective:** Give UI components real fields for scent family, note pyramid, room fit, and scent copy.

**Files:**
- Modify: `lib/data/products.ts`
- Modify: `lib/types/product.ts`
- Modify: `app/(storefront)/products/[slug]/page.tsx`

**Implementation details:**

Extend `Product` in `lib/data/products.ts` with:

```ts
export interface Product {
  id: number
  name: string
  subtitle: string
  price: number
  originalPrice: number
  badge: string
  badgeColor: string
  category: string
  tags: string[]
  color: string
  colorHex: string
  emoji: string
  description: string
  image: string
  slug: string
  galleryImages?: string[]
  scentFamily: "Amber / Gourmand" | "Woody / Smoky" | "Floral / Soft" | "Fresh / Citrus" | "Clean / Linen" | "Gift Set"
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  scentScene: string
  roomFit: string[]
  strength: "Soft" | "Medium" | "Bold"
  season: string[]
}
```

Extend `ProductWithDetails` in `lib/types/product.ts` with nullable equivalents:

```ts
scentFamily: string | null
scentNotes: {
  top: string[]
  heart: string[]
  base: string[]
} | null
scentScene: string | null
roomFit: string[] | null
strength: string | null
season: string[] | null
```

Update `staticToStoreProduct` / `toProductWithDetails` mapping in `app/(storefront)/products/[slug]/page.tsx` so static products carry the fields into PDP components. If DB products do not yet have these fields, default to `null` and derive a safe fallback from `subtitle`.

**Verification:**
```bash
npm run lint
npm run build
```
Expected: typecheck/build does not fail from new fields.

### Task 1.2: Populate all 8 current products with scent metadata

**Objective:** Make every card/PDP capable of showing scent clearly.

**Files:**
- Modify: `lib/data/products.ts`

**Product metadata direction:**

- Amber Glow
  - family: Amber / Gourmand
  - top: bergamot, orange peel
  - heart: warm amber, vanilla
  - base: sandalwood, soft musk
  - scene: “warm spice, suede chair, the last orange light on the wall”
  - room fit: living room, bedroom, evening wind-down
  - strength: Medium
- After Hours
  - family: Woody / Smoky
  - top: black pepper, saffron
  - heart: leather, labdanum
  - base: cedarwood, smoke
  - scene: “cedar smoke, leather chair, lamps low after midnight”
  - room fit: study, lounge, date night
  - strength: Bold
- Midnight Bloom
  - family: Floral / Soft
  - top: black rose, plum
  - heart: oud, violet
  - base: patchouli, dark amber
  - scene: “a midnight garden, dark rose, rain on warm stone”
  - room fit: bedroom, bath, evening ritual
  - strength: Bold
- Golden Hour
  - family: Amber / Gourmand
  - top: honey, orange light
  - heart: tonka, warm milk
  - base: amber, vanilla bean
  - scene: “the hour when the lamps come on and everything turns gold”
  - room fit: kitchen, living room, gifting
  - strength: Medium
- Calm & Collected
  - family: Clean / Linen
  - top: bergamot, lavender leaf
  - heart: chamomile, clean cotton
  - base: pale woods, soft musk
  - scene: “fresh sheets, green tea, a quiet Sunday window”
  - room fit: bedroom, bath, workday reset
  - strength: Soft
- Soft Life
  - family: Floral / Soft or Amber / Gourmand
  - top: coconut water, vanilla
  - heart: creamy sandalwood, white flower
  - base: tonka, warm musk
  - scene: “pale wood, steamed milk, a book left open”
  - room fit: bedroom, self-care, gift-safe
  - strength: Soft
- Fresh Start
  - family: Fresh / Citrus
  - top: sea breeze, lemon peel
  - heart: salt air, cucumber
  - base: driftwood, mineral musk
  - scene: “open windows, clean salt air, sun on cotton curtains”
  - room fit: kitchen, bathroom, morning reset
  - strength: Medium
- Essentials Collection
  - family: Gift Set
  - top/heart/base: mixed set; use empty arrays or representative “four scent moods” copy
  - scene: “four color moods for the rooms you use most”
  - room fit: gifting, discovery, first order
  - strength: Mixed

**Verification:**
- Product cards can render a 3-note shorthand from `topNotes[0]`, `heartNotes[0]`, `baseNotes[0]`.
- PDPs can render full TOP / HEART / BASE arrays.

---

## Phase 2 — Design tokens: warm atelier base

### Task 2.1: Replace harsh dark teal theme with warm material palette

**Objective:** Move global UI from digital teal/gold toward Warm Milk / Candlewick Black / Soft Clay / Linen Taupe.

**Files:**
- Modify: `app/globals.css`

**Token direction:**

Replace root tokens with:

```css
:root {
  --background: #F6F0E7;
  --foreground: #171412;
  --card: #FFF8EF;
  --card-foreground: #171412;
  --popover: #FFF8EF;
  --popover-foreground: #171412;
  --primary: #171412;
  --primary-foreground: #F6F0E7;
  --secondary: #EFE4D6;
  --secondary-foreground: #171412;
  --muted: #EFE4D6;
  --muted-foreground: #74725F;
  --accent: #B8795D;
  --accent-foreground: #FFF8EF;
  --destructive: #B34A4A;
  --destructive-foreground: #FFF8EF;
  --border: #D8CABB;
  --input: #D8CABB;
  --ring: #B8795D;
  --radius: 0.875rem;

  --cs-warm-milk: #F6F0E7;
  --cs-candlewick-black: #171412;
  --cs-linen-taupe: #C9BCAE;
  --cs-soft-clay: #B8795D;
  --cs-smoke-olive: #74725F;
  --cs-wax-cream: #FFF5D8;
  --cs-amber: #B98235;
  --cs-dusty-rose: #B58A8B;
  --cs-citron: #D6C85A;
  --cs-cedar: #6E4B35;
  --cs-chalk-blue: #B7C6C9;
}
```

Add optional utility classes:

```css
.atelier-paper {
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 245, 216, 0.65), transparent 28%),
    linear-gradient(135deg, #F6F0E7 0%, #EFE4D6 100%);
}

.candlelit-panel {
  background:
    radial-gradient(circle at 70% 20%, rgba(255, 245, 216, 0.28), transparent 34%),
    linear-gradient(145deg, #201A16 0%, #171412 58%, #2A211B 100%);
  color: #F6F0E7;
}

.scent-chip {
  border: 1px solid rgba(23, 20, 18, 0.14);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
}
```

**Important:** Do not leave old `gradient-text` as AI-gradient ecommerce. Replace with a subtle clay/wax gradient or plain serif emphasis.

**Verification:**
```bash
npm run build
```
Then run local server and check that text remains readable on homepage/PDP/cart.

---

## Phase 3 — Shared visual-commerce components

### Task 3.1: Create `ScentNotePyramid`

**Objective:** Reuse TOP / HEART / BASE visual system across cards/PDP/product sections.

**Files:**
- Create: `components/storefront/ScentNotePyramid.tsx`

**Component behavior:**
- Accept `top`, `heart`, `base`, optional `compact`.
- Render three columns or rows depending on compact mode.
- Use mono/small caps labels: TOP, HEART, BASE.
- Keep accessible text; do not rely on color alone.

**Verification:**
- Can import into `ProductHero` with no client/server mismatch.
- Handles missing/empty arrays gracefully.

### Task 3.2: Create `TrustServiceRow`

**Objective:** Make trust/service proof a consistent design element on homepage, PDP, cart/footer.

**Files:**
- Create: `components/storefront/TrustServiceRow.tsx`

**Content, conservative launch version:**
- Free shipping threshold only if configured/true. Current constant is `$75`, so use “Free shipping $75+” unless business changes it.
- Secure checkout.
- Candle care included.
- Support available at `hello@colorandscent.com` if configured.

**Avoid for now unless confirmed:**
- 30-day returns for burned candles
- hand-poured to order
- gift-ready packaging
- free samples

**Verification:**
- Component renders on light and dark/candlelit panels with contrast.

### Task 3.3: Create `ScentFinderTeaser`

**Objective:** Add ownable “Find Your Scent Color” module without building the full quiz yet.

**Files:**
- Create: `components/storefront/ScentFinderTeaser.tsx`

**Behavior:**
- Four tiles: Warm & Cozy, Fresh & Clean, Soft Floral, Woody & Smoky.
- Each links to `/products?scent=...` or scrolls/filters if product listing supports it.
- Microcopy: “Choose a mood first. We’ll show you the notes next.”

**Verification:**
- Works as static module now; does not require complex quiz infra.

### Task 3.4: Create `GiftBundleTeaser`

**Objective:** Introduce bundle/gift path as commerce architecture before full bundle builder.

**Files:**
- Create: `components/storefront/GiftBundleTeaser.tsx`

**Content:**
- “Build a color story” / “Pick 3 scent moods”
- Link to gift set product or `/products?category=Gift%20Sets`
- Use honest wording: “starter set” if actual bundle product exists; do not promise custom packaging yet.

**Verification:**
- No checkout/cart changes required.

---

## Phase 4 — Homepage redesign composition

### Task 4.1: Rewrite hero to candlelit atelier direction

**Objective:** Replace “FIND YOUR SCENT” / fake proof / digital card feel with tactile editorial hero.

**Files:**
- Modify: `components/storefront/HeroBanner.tsx`
- Modify: `app/(storefront)/page.tsx` if composition changes.

**Hero direction:**
- Headline: “Scent, in color.” or “Find the color your room is missing.”
- Subhead: “Mood-led candles built around color, notes, and the rooms you use most.”
- Primary CTA: “Shop the Collection”
- Secondary CTA: “Find Your Scent Color”
- Remove fake “4.9 · 12K+ Happy Customers.”
- Replace stats strip with service/navigation truth:
  - “8 scent moods”
  - “Free ship $75+” if true
  - “Secure checkout”
  - “Candle care included”
- Visual language: candlelit-panel, warm paper/card, product-world color swatches.

**Verification:**
- Homepage first viewport looks premium on desktop and does not hide CTA on mobile.
- No fake social proof remains.

### Task 4.2: Replace/retire generic marquee

**Objective:** Stop the site from feeling like a hype/template DTC strip.

**Files:**
- Modify or remove: `components/storefront/MarqueeStrip.tsx`
- Modify: `app/(storefront)/page.tsx`

**Replacement options:**
- Prefer `TrustServiceRow` after the hero.
- Or a restrained editorial scent-note band:
  - TOP: citrus, herbs, clean air
  - HEART: rose, amber, cedar
  - BASE: musk, sandalwood, smoke

**Verification:**
- Motion is subtle; no loud infinite hype strip unless it is accessibility-safe and visually restrained.

### Task 4.3: Rebuild product section around scent discovery

**Objective:** Product grid must sell scent clarity, not just thumbnails.

**Files:**
- Modify: `components/storefront/ProductSection.tsx`
- Possibly create: `components/storefront/ProductCard.tsx` if extracting from current nested component.

**Changes:**
- Filter categories should shift from product formats to scent/use cases where possible:
  - All
  - Warm & Cozy
  - Fresh & Clean
  - Floral & Soft
  - Woody & Smoky
  - Gifts
- Product card displays:
  - scent family chip
  - color swatch
  - product name
  - 3-note shorthand: `top[0] · heart[0] · base[0]`
  - scent scene one-liner
  - price
  - quick add button always reachable, not hover-only on mobile
- Remove fake badges if unsupported; “Best Seller” only if real. Safer: use “Warm”, “Fresh”, “Gift Set”, etc.

**Verification:**
- Product grid still fetches `/api/products` but has static fallback or handles empty API gracefully.
- Quick add still opens cart and adds correct item.

### Task 4.4: Add scent finder and gift/bundle teasers to homepage

**Objective:** Make the homepage a guided buying path.

**Files:**
- Modify: `app/(storefront)/page.tsx`
- Add/import: `ScentFinderTeaser`, `GiftBundleTeaser`, `TrustServiceRow`

**Recommended homepage order:**
1. Announcement bar/header
2. `HeroBanner`
3. `TrustServiceRow`
4. `ProductSection`
5. `ScentFinderTeaser`
6. `GiftBundleTeaser`
7. Honest story/process module
8. Reviews/UGC only if real; otherwise replace with founder notes or remove
9. `NewsletterSignup`

**Verification:**
- Scroll order tells a coherent buyer story.
- No section relies on unconfirmed reviews/press.

---

## Phase 5 — PDP conversion upgrade

### Task 5.1: Remove fake review/social proof from PDP

**Objective:** Stop unsupported claims immediately.

**Files:**
- Modify: `components/storefront/pdp/ProductHero.tsx`
- Modify: `app/(storefront)/products/[slug]/page.tsx`
- Modify: `components/storefront/ReviewsSection.tsx` if it renders fake global reviews.

**Changes:**
- Hide rating UI when no real aggregate exists.
- If placeholder needed, use “Be the first to review” or remove review block.
- In JSON-LD, do not set aggregate rating unless real. Current `productJsonLd(... withAggregateRating: true)` should become false/conditional.

**Verification:**
- Search for fake proof:
  ```bash
  rg "12K|2,400|2400|4.9|reviews|Happy Customers|Rated" app components lib
  ```
- Every remaining review/rating claim is either real or intentionally disabled.

### Task 5.2: Add visible scent-note architecture near CTA

**Objective:** PDP must answer scent choice before buying.

**Files:**
- Modify: `components/storefront/pdp/ProductHero.tsx`
- Import: `components/storefront/ScentNotePyramid.tsx`

**Layout:**
Under product title/description and before/near Add to Cart:
- scent family chip
- “Smells like” scene sentence
- TOP / HEART / BASE note pyramid
- strength, room fit, season chips

**Verification:**
- Above fold on desktop includes product image, product title, price, CTA, scent notes.
- On mobile, notes appear before long story accordions.

### Task 5.3: Add PDP trust row and care facts

**Objective:** Move trust near purchase decision.

**Files:**
- Modify: `components/storefront/pdp/ProductHero.tsx`
- Maybe modify: `components/storefront/pdp/ProductFAQ.tsx`
- Import/use: `TrustServiceRow`

**Content:**
- Free shipping threshold.
- Secure checkout.
- Burn/care facts if known.
- Support/damaged shipment handling if known.

**Verification:**
- Trust row is visible near Add to Cart.
- No unsupported return/gift/hand-poured claims.

### Task 5.4: Improve PDP story modules

**Objective:** Make below-fold feel editorial and tactile, not generic product copy.

**Files:**
- Modify: `components/storefront/pdp/ProductStory.tsx`
- Modify: `components/storefront/pdp/WhyColorScent.tsx`
- Modify/create: `components/storefront/pdp/ScentProfile.tsx`

**Content direction:**
- Scent as room/palette.
- Include color chip and material words.
- Add “best for” room/use case.
- Add candle care and ingredients/wax only if true.

**Verification:**
- PDP tells the scent story without adding fake operations claims.

---

## Phase 6 — Cart and conversion trust polish

### Task 6.1: Warm up cart drawer styling and variant clarity

**Objective:** Cart should feel like part of atelier, not generic dark drawer.

**Files:**
- Modify: `components/storefront/CartDrawer.tsx`

**Changes:**
- Apply warm background/card tokens.
- Show item image instead of emoji if available.
- Show scent/color clearly: `item.color`, maybe scent family if cart type gets extended later.
- Keep free shipping progress.
- Replace green progress with clay/amber palette.
- Trust line should be conservative: “Secure checkout · Free shipping threshold · Support available”.

**Verification:**
- Add-to-cart from product card and PDP opens drawer.
- Quantity update/remove still works.
- Checkout button still posts to `/api/checkout` with same `items` shape.

### Task 6.2: Add tasteful cross-sell placeholder only if product data supports it

**Objective:** Support AOV without inventing bundle builder.

**Files:**
- Modify: `components/storefront/CartDrawer.tsx`

**Approach:**
- If easy, show one “Complete the color story” related product from static products not in cart.
- If not easy, skip until P1.

**Verification:**
- No cart performance or hydration issues.

---

## Phase 7 — Secondary pages consistency

### Task 7.1: Apply atelier typography/palette to product listing page

**Objective:** `/products` should match homepage discovery UX.

**Files:**
- Modify: `app/(storefront)/products/page.tsx`

**Changes:**
- Use scent family filters.
- Product cards match homepage.
- Add scent finder intro or filter chips.

**Verification:**
- `/products` loads and filters without requiring DB.

### Task 7.2: Update About/FAQ/Contact copy to avoid generic/fake claims

**Objective:** Make support/story pages honest and brand-consistent.

**Files:**
- Modify: `app/(storefront)/about/page.tsx`
- Modify: `app/(storefront)/faq/page.tsx`
- Modify: `app/(storefront)/contact/page.tsx`

**Changes:**
- Brand story: color, scent, room mood, tactile ritual.
- FAQ: shipping, returns, care, ingredients only where true.
- Contact: support path clear.

**Verification:**
- No “Noren” leftovers.
- No unsupported operational promises.

---

## Phase 8 — Accessibility, responsive, and motion pass

### Task 8.1: Reduced motion and focus states

**Objective:** Keep premium motion without accessibility regressions.

**Files:**
- Modify: `app/globals.css`
- Modify: any Framer-heavy components as needed.

**Changes:**
- Ensure `prefers-reduced-motion` disables marquee/parallax/nonessential animations.
- Ensure focus-visible states are visible on buttons/links/filter pills/cart controls.

**Verification:**
- Keyboard tab through homepage, product grid, PDP add-to-cart, cart drawer.
- No hidden focus traps except intended Sheet behavior.

### Task 8.2: Mobile-first visual QA

**Objective:** Verify homepage/PDP/cart look good on mobile, not just desktop.

**Files:**
- Modify as needed.

**Checkpoints:**
- Hero CTA visible without awkward 100svh crop.
- Product cards quick-add visible on touch devices.
- Scent note pyramid readable on 375px width.
- Cart drawer full-width mobile layout works.

**Verification:**
- Browser screenshots at 375px, 768px, 1440px.

---

## Phase 9 — Build, visual verification, and handoff

### Task 9.1: Run code quality checks

**Objective:** Confirm implementation builds.

**Commands:**
```bash
npm run lint
npm run build
```

**Expected:**
- Lint passes or only pre-existing warnings are documented.
- Build succeeds.

### Task 9.2: Run local server and route checks

**Objective:** Verify actual pages render.

**Commands:**
```bash
npm run dev
```
Then in another terminal/tool:
```bash
curl -I http://localhost:3000/
curl -I http://localhost:3000/products
curl -I http://localhost:3000/products/amber-glow
curl -I http://localhost:3000/cart
```

If port 3000 is busy, use the actual Next-selected port and record it.

**Expected:** HTTP 200/OK or Next route success.

### Task 9.3: Browser visual QA

**Objective:** Confirm the site actually looks like the research direction.

**Routes:**
- `/`
- `/products`
- `/products/amber-glow`
- cart drawer after adding product

**Visual acceptance criteria:**
- Looks tactile/editorial/warm, not digital teal/gold template.
- Product color appears through swatches, labels, photography/card materials, not UI gradients.
- Scent notes visible before purchase decisions.
- No fake proof visible.
- Gift/bundle path present but honest.
- Trust row near conversion surfaces.

### Task 9.4: Final diff review

**Objective:** Prevent unrelated or unsafe changes.

**Commands:**
```bash
git status --short
git diff -- app components lib docs package.json
```

**Review for:**
- no secrets
- no unrelated infrastructure changes
- no broken checkout request shape
- no hardcoded fake claims
- no Noren leftovers

---

## Recommended worker allocation

If using Mike as the implementation worker:

### Mike prompt

Agent: Mike
Objective: Implement the Color & Scent “candlelit color atelier” visual upgrade plan.
Why this agent: This is a frontend implementation task across Next.js pages/components with build verification.
Context: Use `/Users/jessica/.openclaw/workspace/projects/colorandscent/docs/VISUAL-UPGRADES-IMPLEMENTATION-PLAN.md` as the implementation plan. Treat `DESIGN-RESEARCH-SYNTHESIS-2026.md` as the north star and source of truth over older docs.
Constraints:
- Do not overwrite unrelated uncommitted changes.
- Preserve cart, checkout request shape, product fallback, and routes.
- No fake reviews, fake customers, fake press, fake heritage, or unsupported fulfillment/gift claims.
- Keep accessibility and mobile UX intact.
Deliverable:
- Implement phases 1–6 first, then stop for Harvey review before secondary pages if scope gets large.
- Provide changed files, commands run, build output, and screenshots/route checks.
Success criteria:
- `npm run lint` and `npm run build` pass or failures are documented as pre-existing/blocking.
- Homepage/PDP/cart visibly reflect candlelit color atelier direction.
- Scent-note commerce is visible on product cards and PDP.
- No fake proof remains.
Time sensitivity: high, but quality over speed.
Do not:
- Deploy.
- Change secrets/env.
- Connect new APIs.
- Build full custom candle builder or full quiz in this pass.

---

## Suggested implementation sequence for first shipment

Ship this in one scoped PR/commit series:

1. Product scent metadata and types.
2. Global warm atelier tokens.
3. `ScentNotePyramid` + `TrustServiceRow`.
4. Product card/grid scent-commerce upgrade.
5. Hero rewrite + fake proof removal.
6. PDP scent/trust upgrade + JSON-LD fake aggregate removal.
7. Cart drawer warm polish.
8. Build + local visual QA.

Defer until after review:

- Full quiz.
- Full bundle builder.
- Subscription/seasonal club.
- Real UGC/review modules.
- Press/awards.
- Custom candle personalization.
