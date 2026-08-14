# Color & Scent — Responsive Specification

> **Version:** 1.0 · August 2026
> Companion to [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). Mobile-first: every style is authored at the smallest size and enhanced upward. 60%+ of traffic will be mobile — the phone experience **is** the product.

---

## 1. Breakpoints

Tailwind v4 defaults — do not customize; the wireframes are authored against them.

| Token | Min-width | Design target | Chrome |
|---|---|---|---|
| *(base)* | 0 | 360–389px phones (design at 390×844) | 56px header, hamburger |
| `sm` | 640px | large phones landscape / small tablets | 56px header |
| `md` | 768px | tablets (portrait iPad) | full nav appears, 72px header |
| `lg` | 1024px | small laptops — **PDP goes 2-column here** | 72px header |
| `xl` | 1280px | 13″+ laptops — collection grid goes 4-up | 72px header |
| `2xl` | 1536px | large desktop — container max-out, no new layout | — |

Hard floor: layouts must reflow without horizontal scroll down to **320px** (WCAG reflow, ACCESSIBILITY-GUIDE §9). Intentional horizontal scrollers (filter-pill row, mobile carousels) are the only exception.

Breakpoints are authored by **content, not device**: the PDP splits at `lg` because the buy panel needs ~440px beside a ~55% gallery; the grid goes 4-up at `xl` because cards bottom out at ~280px width.

## 2. Container & Grid

```
Container: max-w-7xl (1280px) · px-6 (24px) mobile · md:px-10 (40px)
Full-bleed sections (hero, marquee, brand moment): edge-to-edge, inner content re-containered
Column gaps: gap-6 (24px) grids · gap-4 (16px) mobile grids
Section padding: py-16 (64px) mobile · md:py-24 (96px)   — the 8px grid, DESIGN-SYSTEM §4
```

## 3. Layout by Surface

### 3.1 Homepage

| Section | base | `md` | `xl` |
|---|---|---|---|
| Hero | 100svh, 4:5 crop, copy centered | copy left-aligned, max-w 560px | 16:9 crop |
| Marquee | 48px band | same | same |
| Collection grid | **2-col**, gap-4; filter pills scroll horizontally | 3-col, gap-6; pills wrap | **4-col** |
| Brand moment | stacked, image first | 2-col (image \| copy) | same |
| Reviews | 1.15 cards visible, swipe | 2-up | 3-up |
| Value props | 2×2 grid | 4-up row | same |
| Newsletter | stacked input + full-width button | joined input+button row | same |
| Footer | single-column stack | 4 columns | same |

### 3.2 PDP

| Region | base–`md` | `lg`+ |
|---|---|---|
| Gallery | swipe carousel, 4:5, dots + counter | 55% column, main image + thumb rail |
| Buy panel | flows under gallery | 45% column, sticky (`sticky top-[88px]`, self-start) |
| Add to cart | inline CTA, then bottom `StickyCartBar` (64px, above safe-area) after CTA scrolls off | inline only (panel is sticky — no bar) |
| Scent notes | stacked rows | 3 columns with rules |
| Story | image → copy stacked | 2-col |
| Related | 2-col grid | 4-up |

### 3.3 Shared chrome

- **Header:** 56px mobile (hamburger · wordmark · cart) → 72px at `md` (wordmark · nav center · icons right), shrinking to 64px on scroll.
- **Mobile menu:** full-screen overlay, only ≤`md`. **Cart:** right sheet 420px desktop, `100vw − 24px` mobile.
- **Announcement bar:** one message + dismiss on mobile; rotating messages at `md`+.
- `MobileCartButton` FAB: ≤`md` only, hidden when cart empty or drawer open.

## 4. Fluid Type

Playfair headings scale with `clamp()` — no per-breakpoint font sizes (full scale in DESIGN-SYSTEM §3):

```
H1 hero      clamp(2.5rem, 5vw + 1rem, 6rem)
H2 section   clamp(1.75rem, 3vw, 2.5rem)
PDP title    clamp(1.75rem, 2.5vw, 2.5rem)
Body         1rem fixed (readability beats fluidity below 18px)
Meta/eyebrow 0.6875–0.8125rem fixed
```

Line lengths: prose capped at `max-w-prose` (~65ch) at all sizes; hero subtext max-w 560px.

## 5. Touch vs Pointer

Capability queries, not width, decide interaction affordances:

| Behavior | Condition |
|---|---|
| Hover zooms, quick-add slide-up, magnetic CTA, zoom lens | `(hover: hover) and (pointer: fine)` |
| Always-visible quick-add chip, swipe carousels, lightbox pinch/double-tap zoom | `(hover: none)` |
| 44×44px targets, 8px gaps | all touch (ACCESSIBILITY-GUIDE §8) |

iOS specifics: inputs ≥16px font (prevents focus zoom), `env(safe-area-inset-bottom)` padding on sticky bar + FAB, `100svh` (not `100vh`) for the hero.

## 6. Responsive Images

All imagery through `next/image` with real `sizes` — this is most of the performance budget (DESIGN-SYSTEM §9):

| Image | `sizes` | Notes |
|---|---|---|
| Hero | `100vw` | `priority`; art-directed crops: 4:5 ≤`md`, 16:9 above (two sources via `<picture>`/getImageProps) |
| Product card | `(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw` | 4:5, lazy |
| PDP main | `(min-width:1024px) 55vw, 100vw` | first image `priority` (LCP) |
| Brand moment / story | `(min-width:768px) 50vw, 100vw` | lazy |
| Thumbs / cart rows | fixed px | lazy |

## 7. QA Matrix

Every visual PR gets checked at: **320** (reflow floor), **390** (iPhone), **768** (iPad portrait), **1024** (PDP split), **1280** (4-up grid), **1536**. Plus: iOS Safari real device (safe-area, `svh`, input zoom), Android Chrome mid-tier (scroll perf), and desktop at 200% zoom.
