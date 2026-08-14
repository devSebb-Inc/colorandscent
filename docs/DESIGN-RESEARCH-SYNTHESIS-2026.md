# Color & Scent — Design Research Synthesis 2026

## Status

The deeper design research pass is complete.

This synthesis supersedes the first-pass competitive design direction where there are conflicts. The older `DESIGN-BRIEF.md` remains useful for raw candle-brand competitor notes, but the stronger current direction comes from:

- `COMPETITIVE-VISUAL-RESEARCH-2026.md`
- `UX-CONVERSION-RESEARCH.md`
- `ART-DIRECTION-BRAND-WORLD.md`
- existing implementation docs: `DESIGN-SYSTEM.md`, `HOMEPAGE-WIREFRAME.md`, `PDP-WIREFRAME.md`, `COMPONENT-LIBRARY.md`, `RESPONSIVE-SPEC.md`, `ACCESSIBILITY-GUIDE.md`

## Research base

The expanded research reviewed 19+ premium candle, fragrance, and home references, including:

- Le Labo
- Aesop
- Maison Margiela Replica
- Jo Malone
- D.S. & Durga
- Trudon
- Flamingo Estate
- Loewe Home Scents
- Anthropologie
- West Elm
- CB2
- Boy Smells
- Byredo
- Diptyque
- Homesick
- Otherland
- P.F. Candle Co.
- Apotheke
- Brooklyn Candle Studio
- Voluspa
- Maison Louis Marie

Some prestige/home retailers blocked browser or direct inspection in the agent environment. Those limitations are labeled in the underlying memos; recommendations below prioritize live-observed/source-backed patterns.

## North star

Color & Scent should become:

**The candlelit color atelier.**

A tactile, editorial, interior-led candle brand where scent is made legible through color, room mood, material texture, and structured notes.

It should feel like:

- a warm room at dusk
- a perfumer/interior stylist’s desk
- colored swatches, linen paper, wax, glass, candlelight, botanicals
- premium but human
- sensory but commercially clear

It should not feel like:

- a generic Shopify candle template
- black/white luxury cosplay
- beige apothecary sameness
- wellness-spa cliché
- loud Gen-Z maximalism
- AI-gradient ecommerce

## Core strategic conclusion

The first pass answered: “What do candle competitors look like?”

The deeper pass answers: “How should Color & Scent win?”

The answer is not just better fonts/colors. The site must become a confidence-building scent-commerce system:

1. Make scent understandable before click.
2. Make gift and bundle paths obvious.
3. Put trust/service proof near purchase decisions.
4. Use photography/materials to carry color, not UI gradients.
5. Make TOP / HEART / BASE notes a signature data pattern.
6. Make the brand world tactile and interior-led.

## Visual direction

### Palette

Keep the charcoal/cream/amber direction, but warm it and make it more material.

Recommended base palette:

- Warm Milk: `#F6F0E7`
- Candlewick Black: `#171412`
- Linen Taupe: `#C9BCAE`
- Soft Clay: `#B8795D`
- Smoke Olive: `#74725F`
- Wax Cream: `#FFF5D8`

Use scent-color families through product assets, not broad UI decoration:

- Amber / gourmand: ochre, burnt sugar, toasted cream
- Floral / soft: dusty rose, mauve plaster, faded lilac
- Fresh / citrus: citron peel, pale chartreuse, mineral mint
- Woody / smoky: cedar brown, ash gray, moss green
- Clean / linen: chalk blue, warm white, stone
- Custom blend: split-label or two-tone color chip

Rule: Color should appear as wax, label, paper, glass, shadow, pigment, botanical, or textile — not as flat website gradients.

### Typography

The serif/sans/mono system is validated, but use it with more restraint.

Recommended usage:

- Display serif for hero lines, scent names, PDP product names, editorial pull-quotes.
- Quiet sans for body, nav, commerce, help, forms, checkout.
- Mono/small caps for scent architecture: TOP / HEART / BASE, burn time, wax type, batch/date, poured-on details.

Avoid:

- huge all-caps luxury shouting
- heavy extra-bold Playfair everywhere
- generic animated gradient text
- decorative typography that hurts product clarity

If budget allows later, explore Canela, Reckless, Editorial New, Noe, or a similarly warm editorial serif. If not, Fraunces/Cormorant-style direction can approximate the warmth better than generic Playfair-heavy styling.

## Photography direction

Photography is now the highest-leverage design asset.

Every image should show evidence of touch, temperature, or material.

Use:

- warm plaster
- raw linen
- travertine
- stained oak
- cream paper
- colored vellum
- candlelight plus window light
- wax surface macro
- wick texture
- paper label tooth
- flame reflection in glass
- match strike
- hand writing or wrapping
- botanicals/ingredients as subtle props

Recurring image sets:

1. The Color Table: candle, color swatches, scent ingredients, matches, domestic object.
2. The Evening Shelf: candle burning near books, ceramics, flowers, framed art.
3. The Builder Desk: hands selecting vessel color, label color, notes, ribbon/paper.
4. The Room Mood: close fragments of home, not full interior staging.
5. The Gift Moment: tissue, handwritten note, seal, open carton, candle partially wrapped.

Avoid:

- floating product renders
- glossy studio lighting
- stock lifestyle
- hotel-spa bathrooms
- eucalyptus/stacked-stone wellness clichés

## Homepage architecture

The homepage should shift from “beautiful brand page” to “guided scent commerce funnel.”

Recommended order:

1. Announcement bar: one concrete offer only, such as free shipping threshold or seasonal bundle.
2. Header: Shop, Scents, Gifts, About, Help/FAQ, search, cart.
3. Hero: candlelit tactile image with CTA.
   - Suggested headline: “Scent, in color.”
   - Suggested subhead: “Candles poured for the rooms, rituals, and moods you want to keep.”
   - CTAs: “Shop by mood” and “Build yours” / “Shop the collection.”
4. Shop by need: Best Sellers, Gifts, Warm & Cozy, Fresh & Clean, Floral, Discovery Sets.
5. Featured grid: product cards with scent-color chip, 3-note shorthand, price, quick add.
6. Scent finder: “Find Your Scent Color.”
7. Bundle/gift module: Buy 2 / Buy 3, discovery set, gift bundle.
8. Service proof row: shipping, returns/replacements, secure checkout, poured-to-order timing.
9. Story/process: real craft/process, not invented heritage.
10. Reviews/UGC once real.
11. Email capture: “Join the Scent Circle.”
12. Footer: service, shipping/returns, candle care, ingredients/safety, accessibility, social/newsletter.

Replace generic marquee/value-prop language with specific proof: burn time, wax, gift readiness, shipping timing, replacement policy, scent notes.

## Product card requirements

Every product card should include:

- product name
- scent-color family chip
- three-note shorthand, e.g. “bergamot · vanilla · sandalwood”
- one-line mood/use case where space allows
- price
- quick add / choose options
- review aggregate only when real

Do not use fake reviews, fake press logos, or unsupported “400+ reviews” claims.

## PDP requirements

Above the fold, every PDP must answer:

- What does it smell like?
- What do I get?
- Can I trust it?
- How do I buy?

Recommended buy panel:

1. Collection/scent-family badge.
2. Product name.
3. Price.
4. One-line scent promise.
5. Rating/review count only when real.
6. Scent/size/lid options.
7. Quantity + Add to Cart.
8. Free-shipping progress.
9. Delivery/returns/security row.
10. Visible TOP / HEART / BASE notes immediately near CTA.

Below fold:

- scent story
- scent strength / sweetness / freshness / warmth / room fit
- ingredients/wax/wick
- burn and care
- shipping/returns
- gifting
- related scents / complete the ritual
- reviews with filters once real

Do not bury all scent notes in accordions. Notes must be visible where the purchase decision happens.

## Scent UX

Scent is the hardest ecommerce problem. Treat it as navigation.

Required patterns:

- Shop by scent family: Warm/Spiced, Woody, Floral, Fresh/Clean, Gourmand, Citrus/Fruity.
- Shop by use case: Bedroom wind-down, dinner party, clean kitchen, workday reset, gift-safe crowd pleasers.
- Product-card 3-note line.
- PDP TOP / HEART / BASE.
- Scent comparison table: strength, sweetness, freshness, warmth, best room, best season.
- Lightweight scent finder before complex quiz.

Use “Find Your Scent Color” as the ownable mechanism.

## Gift and bundle strategy

Bundles before subscriptions.

P0:

- Buy 2 / Buy 3 thresholds.
- Discovery set or wax melt sampler if operationally feasible.
- Gift sets by occasion.
- Gift landing page.
- Gift language on PDP/cart only where operationally true.

P1:

- Bundle builder.
- Scent finder result capture.
- Gift guide email capture.

P2:

- Seasonal scent club/subscription.
- Custom candle builder.
- Personalization.

Avoid subscriptions at launch unless fulfillment, scent rotation, and support are proven.

## Trust/service proof

Use trust signals as design, not footer afterthoughts.

Show a compact service row on:

- homepage after first product/discovery block
- PDP near CTA
- cart drawer
- footer

Recommended row:

- Free shipping $50+
- Secure checkout
- Poured to order / ships in X-Y business days, if true
- Returns/replacements policy
- Wax/wick/burn-time facts
- Gift-ready packaging only if true

## Copy direction

Voice:

- warm
- sensory
- specific
- lightly poetic
- practical when commerce matters

Avoid:

- mystical wellness language
- generic “elevate your space” hero copy
- fake heritage
- luxury cosplay
- unsupported claims

Useful lines:

- “Scent, in color.”
- “Choose a scent. Choose its color. Make it feel like home.”
- “For the hour when the lamps come on.”
- “Color-matched to the way it smells.”
- “Soft rose, clean cedar, a little window light.”
- “Poured slowly. Lit often.”

PDP “smells like” format:

- “warm spice, suede chair, the last orange light on the wall”
- “fresh sheets, green fig, a quiet Sunday window”
- “pale wood, steamed milk, a book left open”

## Existing docs: what to trust vs update

### Keep / mostly trust

- `RESPONSIVE-SPEC.md`
- `ACCESSIBILITY-GUIDE.md`
- core charcoal/cream/amber premise in `DESIGN-SYSTEM.md`

### Update

- `DESIGN-BRIEF.md`: useful raw research, but partially stale. Indigo/blush recommendations are superseded.
- `HOMEPAGE-WIREFRAME.md`: visually aligned, but underweights scent finder, gift path, bundles, trust, and honest proof.
- `PDP-WIREFRAME.md`: strong base, but needs scent strength/room fit, gift options, richer reviews, cross-sells, POD shipping/return truth.
- `COMPONENT-LIBRARY.md`: must make quick-add, product cards, trust rows, cart drawer, gift components more specific.
- `RELAUNCH-PLAN.md`: should explicitly include gift flow, bundle strategy, cart/drawer, reviews/trust readiness.

## Implementation priority

### P0 — before launch/redesign implementation

1. Update homepage architecture around scent discovery, gifts, bundles, trust, and email.
2. Update PDP with scent-note architecture and trust rows near CTA.
3. Update product-card spec with scent-color family, note shorthand, and quick add.
4. Remove placeholder/fake review counts and unsupported claims.
5. Specify real shipping/returns/replacement language.
6. Add cart drawer requirements: free-shipping progress, variant clarity, subtotal, checkout, cross-sell.
7. Add gift path and gift truth requirements.
8. Preserve accessibility standards in cart, filters, variant groups, ratings, and review components.

### P1 — early post-launch

1. Scent finder / quiz.
2. Discovery set / wax melt sampler.
3. Review collection fields.
4. Real UGC gallery.
5. Static bundles moving toward bundle builder.

### P2 — after proof

1. Subscription / seasonal scent club.
2. Custom candle builder.
3. Press logos.
4. Deeper personalization.

## Final recommendation

Proceed with the redesign using **“the candlelit color atelier”** as the art direction and **“structured sensory commerce”** as the UX strategy.

That means the design should not merely look premium. It should help a shopper confidently choose a scent online.

The most important unlocks are:

- make scent visible everywhere
- make color tactile, not digital
- build bundle/gift paths early
- place trust near conversion
- use real product-world photography as the premium layer
- keep the UI warm, restrained, and commerce-clear
