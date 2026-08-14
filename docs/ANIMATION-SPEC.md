# Color & Scent — Animation Specification

> **Version:** 1.0 · August 2026
> Companion to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Stack: Framer Motion 12 + CSS keyframes in `app/globals.css` + Lenis smooth scroll.
> Referenced by [HOMEPAGE-WIREFRAME.md](./HOMEPAGE-WIREFRAME.md) and [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md).

Motion philosophy in one line: **candlelight, not fireworks.** Everything moves like warm air — slow entrances, soft eases, no bounce, no spin. If an animation would look at home on a SaaS dashboard, it's wrong for this brand.

---

## 1. Motion Tokens

Define once in `app/globals.css` (`@theme`) and a `lib/motion.ts` for Framer variants.

### 1.1 Durations

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Color/opacity swaps, underlines, badge states |
| `--duration-base` | 200ms | Buttons, pills, thumbnails, most hovers |
| `--duration-slow` | 400ms | Card image zooms settle, drawers, accordions |
| `--duration-reveal` | 600ms | Section/element entrances on scroll |
| `--duration-ambient` | 8–30s | Marquee, Ken Burns, amber glow — background texture |

Rule of thumb: **user-caused = fast, system-caused = slow.** A hover must respond in ≤200ms; a scroll reveal may take 600ms because the user isn't waiting on it.

### 1.2 Easings

```css
--ease-out-luxe:  cubic-bezier(0.22, 1, 0.36, 1);   /* signature — fast start, long soft landing */
--ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);   /* crossfades, palette-neutral moves */
--ease-linear:    linear;                            /* marquee only */
```

`--ease-out-luxe` is the brand ease. Use it for every entrance, hover lift, and drawer. Never use default `ease` or anything with overshoot/bounce — spring configs are capped at gentle (`stiffness ≤ 150`, `damping ≥ 15`, used only by `MagneticButton` and cart-drawer slide).

### 1.3 Framer Motion shared variants — `lib/motion.ts`

```ts
export const easeLuxe = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeLuxe } },
};

export const stagger = (interval = 0.08) => ({
  visible: { transition: { staggerChildren: interval } },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;
```

All scroll entrances animate **opacity + transform only** (compositor-friendly, no CLS — see §8).

---

## 2. Entrance & Hero Reveals

*(Referenced by HOMEPAGE-WIREFRAME §③.)*

### 2.1 Hero headline — word-level stagger

"Discover Your Signature Scent" reveals word by word on first paint:

- Split the H1 into words (each wrapped in `overflow-hidden` span → inner `motion.span`).
- Each word: `y: "110%" → 0`, `opacity 0 → 1`, duration 700ms, `easeLuxe`, stagger 90ms.
- Sequence choreography (delays from page load):
  1. `0ms` — hero image already visible (never animate the LCP element's opacity from 0)
  2. `300ms` — H1 word stagger begins (~1.0s total)
  3. `800ms` — subtext fades up (`fadeUp`, 500ms)
  4. `1000ms` — CTA button fades up + becomes interactive
  5. `1400ms` — scroll cue fades in, gentle 2s loop bob (8px)
- The header wordmark and nav do **not** animate — they're load-bearing chrome.

### 2.2 Hero image — Ken Burns

`scale: 1 → 1.06` over 12s, `easeLuxe`, plays **once** (no loop — looping zoom reads as a screensaver). Implemented as a CSS animation on the `next/image` wrapper so it starts without JS hydration.

### 2.3 Page-level entrances (non-hero routes)

PDP, `/products`, static pages: single `fadeUp` on the main content block (400ms, 60ms delay). No per-element choreography off the homepage — restraint is the luxury signal.

---

## 3. Scroll-Triggered Animations

- Every homepage section ⑤–⑨ and PDP below-fold section enters with `fadeUp` via `whileInView` + `viewportOnce` (fire once, `-80px` bottom margin so elements are ~15% visible before animating).
- **Grids stagger, blocks don't.** Product grid, value props, review cards: parent `stagger(0.08)`, children `fadeUp`. Prose sections (Brand Moment, Story): one block, one fade.
- Cap stagger groups at 8 children; items past the 8th share the last delay (a 12-item grid must not take 2s to settle).
- Filter changes on the collection grid: Framer `layout` on cards + `AnimatePresence` — exit `opacity 0 / scale 0.96` (200ms), enter `fadeUp` (300ms), `layout` transition 400ms `easeLuxe`.
- **Lenis smooth scroll** (already a dependency): `lerp: 0.1`, respect native scroll on touch devices (`smoothTouch: false`). Disabled entirely under reduced motion.
- No parallax at launch. If added later (Brand Moment image only): max ±6% translate, transform-only.

---

## 4. Hover & Micro-Interactions

| Element | Interaction | Spec |
|---|---|---|
| Primary button | hover | bg `#b8860b → #d4a017`, `translateY(-1px)`, amber shadow fades in — 200ms `easeLuxe` |
| Primary button | press | `translateY(0)`, bg `#9a7009` — 100ms |
| Button arrow (`→`) | group-hover | `translateX(4px)` — 200ms |
| Magnetic CTA (`MagneticButton.tsx`) | cursor within 80px | eases toward cursor, max 8px offset, spring `{ stiffness: 150, damping: 15 }`. Desktop pointer-fine only |
| Product card image | hover | `scale: 1.05`, 500ms `easeLuxe`; second mockup crossfades in (300ms) if available |
| Product card title | hover | cream → amber, 150ms |
| Quick-add chip | card hover | slides up 8px + fade in, 250ms (touch: always visible, no animation) |
| Nav link | hover | 1px amber underline scales `scaleX(0 → 1)` from left, 200ms; persists on active route |
| Cart icon badge | count change | `.animate-pulse-badge`: `scale 1 → 1.35 → 1`, 350ms — plays once per change, never loops |
| Filter pill | select | bg/color swap 150ms; grid relayout per §3 |
| Input | focus | border → amber + ring fade-in, 150ms |
| Marquee | hover | `animation-play-state: paused` |

Hovers must be **symmetric** (same duration/ease out as in) and **non-spatial** except the 1px button lift — cards never lift or grow shadows (editorial, not app-like).

---

## 5. Overlays, Drawers & Transitions

### 5.1 Cart drawer — `CartDrawer.tsx`
- In: `x: 100% → 0`, 300ms spring (`stiffness 300, damping 30` — Radix/vaul default is fine). Backdrop `charcoal-950/60` fades 200ms.
- Row remove: collapse height + fade (250ms) via `AnimatePresence`; subtotal number crossfades (no odometer effects).
- Free-shipping progress bar: width animates 400ms `easeLuxe`; on crossing $50 the bar flashes to full amber and the 🎉 message `fadeUp`s.

### 5.2 Mobile menu
Overlay fades in 250ms; links stagger `fadeUp` at 60ms intervals (Playfair 32px rows). Close: single 200ms fade, **no reverse stagger** (exits are always simpler than entrances).

### 5.3 Sticky cart bar — `StickyCartBar.tsx`
IntersectionObserver on the inline CTA. Enter: `y: 100% → 0`, 300ms `easeLuxe`. Exit: reverse, 200ms. Never animates while a drawer is open.

### 5.4 Accordion (FAQ / candle care)
Radix + height auto-animation, 300ms `easeLuxe`; chevron rotates 180°, 200ms.

### 5.5 Lightbox (PDP gallery)
Backdrop fade 250ms; image scales `0.96 → 1` with fade, 300ms. Thumbnail/main crossfade on variant or thumb change: 200ms `--ease-in-out`.

### 5.6 Route changes
No full-page transition wrappers (they fight App Router streaming). Perceived continuity comes from the persistent header + skeletons matching final layout (COMPONENT-LIBRARY §7).

### 5.7 Toasts (sonner)
Slide + fade from bottom, 250ms; auto-dismiss 3.5s; hover pauses timer.

---

## 6. Ambient & Signature Animations

| Animation | Spec | Where |
|---|---|---|
| Marquee | existing `.animate-marquee` — `translateX(0 → -50%)`, 30s linear infinite, duplicated content for seamless loop | Homepage strip ④ |
| Amber glow | radial `#b8860b/12` blob behind newsletter heading, `opacity 0.6 ↔ 1` + `scale 1 ↔ 1.08`, 8s ease-in-out infinite — the "candle flame" of the site | Newsletter ⑨, 404 page |
| Announcement rotation | crossfade messages every 6s, 400ms `--ease-in-out` | `AnnouncementBar.tsx` |
| Scroll cue | 8px bob, 2s loop; fades out permanently after first scroll | Hero |

Retire from the Noren era: `.animate-gradient` (red/gold gradient text) and `.animate-float` — both off-brand. Remove from `globals.css` during token migration (DESIGN-SYSTEM §11).

Never: autoplaying carousels of content (embla moves only on user drag/click), infinite pulsing CTAs, confetti.

---

## 7. Reduced Motion

`prefers-reduced-motion: reduce` is a hard requirement (ACCESSIBILITY-GUIDE §6):

```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee, .animate-glow, .animate-float { animation: none !important; }
}
```

- Framer: wrap the app in `<MotionConfig reducedMotion="user">` — converts transform animations to instant/opacity-only globally.
- Marquee renders as a static centered row of the six phrases (single copy, no duplication).
- Ken Burns, magnetic button, Lenis, scroll cue bob: disabled.
- Preserved: opacity crossfades ≤200ms, focus rings, accordion open/close (instant height is worse for comprehension — keep at 150ms).

---

## 8. Performance Rules

1. **Compositor-only:** animate `transform` and `opacity` exclusively. Exceptions: accordion height (Radix, contained) and progress-bar width (tiny paint area). Never animate `top/left/margin/box-shadow` on large elements — fake shadow transitions with a pre-rendered pseudo-element fading in.
2. **No CLS from motion:** entrance animations start from `opacity: 0` at final layout position (translate offsets don't affect layout). Reserve space for all async content with same-size skeletons.
3. `will-change: transform` only on the marquee track and drawer panel; remove after settle elsewhere (Framer handles this).
4. IntersectionObserver over scroll listeners everywhere (`whileInView` uses it internally).
5. Budget: ambient animations ≤2 concurrent per viewport; if main-thread long tasks appear in traces, the glow goes first.
6. Test on a mid-tier Android (or 6× CPU throttle) — 60fps on the homepage scroll is the acceptance bar (DESIGN-SYSTEM §9).
