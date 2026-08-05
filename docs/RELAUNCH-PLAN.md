# Color & Scent — Re-Plan (Remaining Tasks)

_Created: 2026-08-04 · Updated: 2026-08-04_

**IMPORTANT:** Color & Scent is a **separate project** from Noren Ecom. It was bootstrapped from Noren Ecom as a starting point, but it's its own codebase, own design, own store. Each has its own page in Mission Control, independent of each other.

## Current Status

- ✅ 4 of 7 tasks completed (design brief, product catalog, Printify integration, PNG designs)
- 🔄 3 tasks remaining: storefront build, Gmail integration, SEO strategy
- 📁 Codebase exists at `/Users/jessica/.openclaw/workspace/projects/colorandscent`
- 🏪 Printify shop: Color&Scent (ID: 28475121), 8 products uploaded and published
- 📊 Mission Control page exists at `/projects/colorandscent`
- 📧 Customer email: colorandscentltd@gmail.com
- 💳 Stripe: **NOT NOW** — add later

## What We Have

- Printify shop ID: 28475121 (Color&Scent)
- 8 products uploaded and published
- Design brief with competitive analysis
- Product catalog with 8 SKUs, pricing, scent options
- Label dimensions for all products
- Codebase duplicated from Noren Ecom (needs rebuild)
- Mission Control page exists but needs updating
- Customer email: colorandscentltd@gmail.com

## What We Need (No Stripe yet)

1. Build the actual storefront (homepage, product pages, cart, checkout)
2. Set up Supabase for the storefront
3. Set up Gmail for customer service (colorandscentltd@gmail.com)
4. SEO strategy
5. **Stripe later** — not now

## Dependency Graph

```
cs-001a Infra (Supabase + env) ─► cs-001b Seed products ─► cs-001c Rebrand UI/copy ─┐
                                                                                    ▼
                                                     cs-001e Deploy + DNS + webhooks
                                                                                    │
                                          cs-001f E2E order verification ◄──────────┘
                                                                                    │
                                          cs-006a SEO research (no deps, start now) ─► cs-006b On-page SEO implementation ◄───┤
                                          cs-005 Gmail customer service (no deps; finish during 001e) ◄───────────────────────┘
```

## Priority Order

| # | Task | Priority | Effort | Depends on |
|---|------|----------|--------|------------|
| 1 | cs-001a Supabase + env vars | CRITICAL | 0.5 day | account access |
| 2 | cs-001b Seed 8 products into DB | CRITICAL | 0.5 day | 001a |
| 3 | cs-001c Rebrand UI + copy | HIGH | 1–2 days | 001a |
| 4 | cs-001e Deploy: Vercel + DNS + webhooks | CRITICAL | 0.5 day | 001b/c |
| 5 | cs-001f E2E order verification | CRITICAL | 0.5 day | 001e |
| 6 | cs-006a SEO research + strategy doc | MEDIUM | parallel, anytime | none |
| 7 | cs-005 Gmail customer service | MEDIUM | 0.5 day | none (batch with 001e DNS) |
| 8 | cs-006b On-page SEO implementation | MEDIUM | 1 day | 001c + 006a |
| 9 | cs-001d Stripe configuration | MEDIUM | 0.5 day | LATER |

## task-cs-001 — Storefront launch (re-scoped)

**cs-001a — Infrastructure (blocks everything).** Audit `.env.local` first — it contains all 25 keys from `.env.example` but I couldn't verify which have values (Printify token/shop ID likely set; Supabase/Stripe likely empty per `STATUS.md`). Then: create the Supabase project, fill the four Supabase vars, push the existing Drizzle schema with `npm run db:push`, confirm `npm run dev` boots. Also update Mission Control's `COLORANDSCENT_SUPABASE_*` vars so `/projects/colorandscent` reads live data.

**cs-001b — Product seeding.** Reconcile `data/printify-products.json` (shop 28475121, 8 products) against `docs/PRODUCT-CATALOG.md` pricing/scents, then run/adapt the existing seed scripts to insert the 8 SKUs with scent variants, prices, and Printify mockup images. Write slugs/titles/descriptions carefully once — they double as SEO copy. Verify `/products` and `/products/[slug]` render with working scent selection.

**cs-001c — Rebrand (the real "build" work).** Source of truth is `docs/DESIGN-BRIEF.md`. Swap Noren theme tokens in `app/globals.css`/Tailwind for the C&S palette and fonts; rework the homepage hero and featured sections; add candle-specific PDP content (scent notes, burn time, wax details, label imagery from `labels/`); rewrite About, FAQ, Contact, and all four policy pages for POD candle realities (production time, no returns on burned candles); rebrand the OG route, metadata, and transactional emails in `lib/email/`; sweep for leftover Noren references.

**cs-001e — Deploy.** Vercel project + env vars, DNS for colorandscent.com, register the Printify webhooks against the prod URL, confirm the four crons in `vercel.json` run with `CRON_SECRET`, set `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH`, and verify the Resend sending domain (DNS records — can take 24–48h, do early). ⚠️ One reconciliation needed: `DEPLOY_STATUS.md` documents `COLORANDSCENT_*`-prefixed env names, but the app reads unprefixed names via `lib/env.ts` — fix before deploy.

**cs-001f — Definition of done.** The storefront works: browse → product pages → Mission Control integration. No Stripe yet — that's for later.

**cs-001d — Stripe (later).** Add Stripe when we're ready to launch.

## task-cs-005 — Gmail customer service (~0.5 day, before launch)

- **Email:** colorandscentltd@gmail.com (you own this)
- Update the storefront's `/api/contact` recipient to this email
- Set up labels (`C&S/Orders`, `C&S/Shipping`, `C&S/Returns`), filters to auto-label support mail, and 4–5 canned replies (order status, POD shipping times, damaged item, cancellation, refunds)
- Optional cheap win: this environment already has Gmail MCP tools connected, so a scheduled routine could triage the support label and prepare **draft** replies (never auto-send) using order data from Supabase.
- Write a short `docs/CUSTOMER-SERVICE.md` with SLAs (reply < 24h) and Printify escalation steps.

## task-cs-006 — SEO strategy

**cs-006a — Research (start now, zero dependencies).** The 8 SKUs are message-led ("You Are My Favorite", "Good Vibes Only"), so the winnable lane is **gift-intent keywords** ("funny candle gifts", occasion terms), not commodity "buy candles online" terms. Do keyword research and a competitor teardown extending the design brief's analysis, and be honest about channels: for a new POD brand, organic Google is a 6–12 month compounding play — Pinterest, Instagram/TikTok, and possibly Etsy will outproduce SEO in months 1–3. Deliverable: `docs/SEO-STRATEGY.md` with a keyword map (1 primary + 2–3 secondary per SKU), a content calendar (gift guides, scent guides, care guides), and channel priorities.

**cs-006b — Implementation (after rebrand).** Unique titles/meta per product via the existing `/admin/seo` panel; add `Product` JSON-LD structured data to PDPs and `Organization` schema to the homepage — **this is the one likely code gap to verify in the Noren codebase**; confirm `sitemap.ts`/`robots.ts` output post-rebrand and submit to Google Search Console + Bing; alt text on all images and a Core Web Vitals pass on the deployed site; publish the first two content pieces.

## Consolidated blockers (needs from Sebb)

1. **Supabase account access** — blocks the entire critical path; #1 priority. (Sebb to create and give access)
2. **DNS/registrar access** — needed by Vercel domain, Resend, and support email; batch into one session.
3. **Customer email:** colorandscentltd@gmail.com — redirect customer emails here.
4. **Env naming mismatch** between `DEPLOY_STATUS.md` (`COLORANDSCENT_*`) and `lib/env.ts` (unprefixed).
5. `.env.local` contents unverified — audit which of the 25 keys are filled before starting.
6. **Stripe: NOT NOW** — add later when ready to launch.

## Suggested Schedule

**Day 1:** Supabase + env vars + seed products · **Days 2-3:** Rebrand UI + copy · **Day 4:** Deploy + DNS + Gmail setup · **Day 5:** E2E verification → then SEO and Search Console submission.
