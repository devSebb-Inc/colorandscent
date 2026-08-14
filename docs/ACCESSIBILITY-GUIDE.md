# Color & Scent — Accessibility Guide

> **Version:** 1.0 · August 2026
> Target: **WCAG 2.1 AA** across the storefront. Companion to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).
> Radix primitives (via shadcn/ui) supply most interaction semantics — this guide covers what we must add on top, and what our dark, moody palette makes easy to get wrong.

---

## 1. Principles

1. **Dark ≠ dim.** The charcoal palette is the brand; illegible text is not. Every text/background pair below is pre-verified — don't invent new pairs without checking contrast.
2. **Color is never the only signal.** Selected states pair color with a border/weight/checkmark; errors pair red with an icon and message; lid swatches carry visible text labels.
3. **Everything works with a keyboard**, in order, with a visible focus ring.
4. **Motion is optional.** Full spec in ANIMATION-SPEC §7; summarized in §6 below.
5. Semantics first: native elements and Radix primitives before ARIA attributes hand-rolled onto `<div>`s.

---

## 2. Color & Contrast

AA thresholds: **4.5:1** normal text, **3:1** large text (≥24px, or ≥18.7px bold) and UI components/graphical objects.

### 2.1 Verified pairs (computed, WCAG relative luminance)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| Cream `#f5f0e8` | Charcoal-900 `#1a1a1a` | **15.3:1** | ✅ any size |
| Cream `#f5f0e8` | Charcoal-950 `#0f0f0f` | **16.9:1** | ✅ any size |
| Muted `#a6a094` | Charcoal-900 `#1a1a1a` | **6.7:1** | ✅ normal text |
| Amber `#b8860b` | Charcoal-900 `#1a1a1a` | **5.3:1** | ✅ normal text |
| Amber `#b8860b` | Charcoal-950 `#0f0f0f` | **5.9:1** | ✅ normal text |
| Charcoal-900 `#1a1a1a` | Amber `#b8860b` (primary button) | **5.3:1** | ✅ |
| Charcoal-900 `#1a1a1a` | Cream `#f5f0e8` (cream sections) | **15.3:1** | ✅ |
| **Amber `#b8860b` on Cream `#f5f0e8`** | | **2.9:1** | ❌ **fails for text** |
| Amber-ink `#8a6508` | Cream `#f5f0e8` | **4.7:1** | ✅ normal text |

### 2.2 Rules that follow

- **On cream sections, amber text/links use `--color-amber-ink` (`#8a6508`)**, never raw `#b8860b`. Raw amber on cream is allowed only for large decorative type (≥24px) and non-text ornaments (star glyphs sit next to a text rating, so they're exempt as redundant).
- Muted text (`#a6a094` on dark / `#6b665c` on cream) is for captions and meta only — never for prices, error messages, or anything transactional.
- Hero text sits on a photo → the gradient scrim (`from-charcoal-950/70`) is a **contract**: H1/subtext/CTA must stay inside the scrimmed area at every breakpoint. Verify with the darkest *and lightest* hero image crops.
- Focus ring amber on its adjacent surface must hit 3:1 (it does on both charcoal and cream — 5.3:1 / 2.9:1… on cream the ring adds a 1px charcoal outline to compensate, see §3).
- Disabled controls are exempt from contrast requirements, but still render at ≥3:1 where feasible (`amber/40` on charcoal ≈ passes for the large button label).

---

## 3. Focus States

*(Referenced by COMPONENT-LIBRARY §1.)*

One global recipe, applied via Tailwind utilities on every interactive element:

```css
:focus-visible {
  outline: 2px solid var(--color-amber);   /* #b8860b */
  outline-offset: 2px;
  border-radius: inherit;
}
/* On cream sections the ring gains a contrast backstop: */
.section-cream :focus-visible {
  outline-color: var(--color-amber-ink);    /* #8a6508 — 4.7:1 on cream */
}
```

- `:focus-visible` only — no rings on mouse click, always on keyboard focus. Never `outline: none` without a replacement.
- The ring must never be clipped: parents of focusable children don't use `overflow: hidden` without padding ≥4px (product cards: ring on the whole-card link uses `outline-offset: -2px` inset instead).
- Focus order = visual order. The PDP buy panel tabs: scent pills → lid swatches → qty − → qty + → Add to Cart, matching top-to-bottom layout.
- Drawers and the mobile menu **trap focus** (Radix Sheet/Dialog does this) and return focus to the trigger on close.
- Skip link: first tabbable element on every page — visually hidden until focused, jumps to `#main-content`. Style: amber pill, top-left, z-index above header.
- Sticky header + sticky cart bar: `scroll-padding-top/bottom` on `html` so focused elements scrolled into view are never hidden beneath them.

---

## 4. Keyboard Interaction

| Surface | Keys | Notes |
|---|---|---|
| Nav / links / buttons | Tab, Enter, Space | Native semantics — every "button" is a `<button>`, every navigation is an `<a>` |
| Mobile menu, cart drawer, lightbox | Esc closes; Tab cycles inside | Radix Dialog/Sheet |
| Filter pills | Arrow keys move, Enter/Space select | Radix ToggleGroup (roving tabindex — one tab stop for the group) |
| Scent pills / lid swatches | Arrow keys within group | Implement as `RadioGroup` — it *is* a single-choice input |
| Qty stepper | −/+ buttons tabbable; input accepts typed digits, ↑/↓ | Clamp 1–10 |
| Carousels (reviews, PDP gallery) | ←/→ when focused; slides are tabbable when visible | embla + explicit key handlers; hidden slides `inert` |
| Accordion | Enter/Space toggle, ↑/↓ between headers | Radix Accordion |
| Marquee | Not focusable, `aria-hidden="true"` | Decorative; content duplicated for the loop would double-announce |

Whole-card product links: the card is one `<a>`; the nested quick-add `<button>` is the second tab stop. Never nest interactive elements inside each other.

---

## 5. Screen Readers & ARIA

### 5.1 Landmarks & structure
- One `<header>`, `<main id="main-content">`, `<footer>` per page; `<nav aria-label="Main">` and `<nav aria-label="Footer">`.
- Heading outline is strict: one `h1` per page (homepage: the hero headline; PDP: product name). Section titles are `h2`, sub-blocks `h3`. Eyebrows are styled `<p>`, not headings.
- Announcement bar: `role="region" aria-label="Announcements"`; rotating messages do **not** use `aria-live` (a 6s rotation would chatter — the info is repeated in the footer).

### 5.2 Component-by-component

| Component | Requirements |
|---|---|
| Cart icon | `aria-label="Cart, 2 items"` (count in the label, badge itself `aria-hidden`) |
| Cart drawer | `Sheet` with `aria-label="Shopping cart"`; subtotal changes in an `aria-live="polite"` region |
| Add to Cart | Loading: `aria-disabled="true"` + label stays "Add to cart" (spinner `aria-hidden`); success announced via live region "Amber Glow added to cart" |
| Qty stepper | Buttons `aria-label="Decrease quantity"/"Increase quantity"`; value in `aria-live="polite"` |
| Scent selector | `RadioGroup` `aria-label="Scent"`; each pill's accessible name = scent name; descriptor line linked via `aria-describedby` |
| Lid swatches | Same pattern; visible text label under each swatch (color never alone) |
| Star ratings | Single text alternative: `<span aria-label="Rated 4.9 out of 5 stars, 127 reviews">` wrapping `aria-hidden` glyphs |
| Filter pills | ToggleGroup announces pressed state; grid updates announced by result count in `aria-live="polite"` ("8 products") |
| Free-shipping progress | `role="progressbar"` with `aria-valuenow/min/max` + the visible sentence as accessible name |
| Newsletter form | `<label>` (visually hidden ok) + `autocomplete="email"`; success/error in `aria-live` region, focus stays on form |
| Breadcrumb | `<nav aria-label="Breadcrumb">`, current page `aria-current="page"` |
| Toasts | sonner renders `aria-live` — keep toasts informational only; any *required* action must also exist in-page (undo remove also available via cart state) |
| Lightbox | `aria-label="Image gallery"`, slide counter announced ("Image 2 of 5") |
| Marquee, Ken Burns image, glow, decorative icons | `aria-hidden="true"` |

### 5.3 Product images
- Alt text pattern: `"{Product name} candle in {vessel} with {lid} lid"` — factual, no "image of", no scent poetry (that's in the copy).
- Purely decorative lifestyle shots (Brand Moment): `alt=""`.
- OG/hero images: the headline text lives in HTML, never baked into the image.

---

## 6. Motion & Vestibular Safety

Summary of ANIMATION-SPEC §7 (that doc is normative):

- `prefers-reduced-motion: reduce` disables: marquee loop, Ken Burns, Lenis smooth scroll, magnetic button, scroll-cue bob, glow pulse, staggered entrances (content appears instantly or via ≤200ms fades).
- `<MotionConfig reducedMotion="user">` wraps the app.
- Nothing flashes more than 3×/second (nothing flashes at all). No autoplaying video with motion at launch; if a hero video ships later it gets a pause control and `prefers-reduced-motion` poster fallback.

---

## 7. Forms & Errors

- Every input has a programmatic `<label>`; placeholder is never the label.
- Errors: `#e05252` border + icon + text message below the field, linked with `aria-describedby`, `aria-invalid="true"` on the input. Focus moves to the first invalid field on submit.
- Checkout-adjacent inputs use correct `autocomplete` tokens (`email`, `name`, `postal-code`…) and `inputmode` (`numeric` for qty).
- The 20%-off incentive is stated in text next to the form — not only in a dismissible toast.

## 8. Touch Targets

- Minimum 44×44px on touch for all controls (icon buttons, qty steppers, pills, swatches, carousel dots — dots get invisible padded hit areas).
- Minimum 8px between adjacent targets (qty − / + are separated by the value box).
- Sticky cart bar sits above `env(safe-area-inset-bottom)`.

## 9. Zoom, Reflow & Text

- Layout survives 200% browser zoom and 320px-wide reflow (RESPONSIVE-SPEC §1 — no horizontal scroll except intentional carousels/pill rows).
- All type in `rem`; user font-size preferences respected (no `px` body text).
- Letter-spaced uppercase (buttons, eyebrows) uses real text with `letter-spacing`, never spaced characters.
- Language: `<html lang="en">`.

---

## 10. Testing Checklist (per release)

**Automated (CI):**
- [ ] `eslint-plugin-jsx-a11y` clean
- [ ] axe-core (via Playwright) on `/`, `/products`, one PDP, cart drawer open — zero critical/serious
- [ ] Lighthouse a11y score ≥ 95 on the same routes

**Manual (each significant UI change):**
- [ ] Full keyboard pass: tab through homepage → PDP → add to cart → drawer → checkout handoff, no traps, no invisible focus
- [ ] VoiceOver (Safari) pass on the PDP buy flow: variant selection, qty, add-to-cart announcement
- [ ] 200% zoom + 320px viewport reflow check
- [ ] `prefers-reduced-motion` on: homepage scroll + hero
- [ ] Contrast spot-check any *new* color pair against §2.1
