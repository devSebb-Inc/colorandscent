# Printify Image Sync — Architecture

This sync script fetches mockup images from Printify and stores them in Supabase.

## Data Flow

1. **Read Supabase products** — get all active products with their `printify_product_id`
2. **Fetch Printify images** — call Printify API for each product's mockups
3. **Map images** — the Printify `product.id` matches Supabase `printify_product_id`
4. **Store in Supabase** — upsert into `product_images` table via REST API
5. **Update storefront** — the storefront currently uses static `lib/data/products.ts`; after sync, switch to Supabase-backed `lib/data/products-db.ts`

## Printify → Supabase Product Mapping

| Printify Title | Slug | Supabase printify_product_id |
|---|---|---|
| Amber Glow | amber-glow | 6a726221fd55886efa076fe1 |
| After Hours | after-hours | 6a72622411b5f89622037080 |
| Midnight Bloom | midnight-bloom | 6a726227ac872ebabe028d21 |
| Golden Hour | golden-hour | 6a72622b74473a69e400c99a |
| Calm & Collected | calm-collected | 6a72623011b5f89622037095 |
| Soft Life | soft-life | 6a726233fd55886efa07700b |
| Fresh Start | fresh-start | 6a726237cdd350d4e704cfc9 |
| Essentials Collection | essentials-collection | 6a72623a2b267329480dcf75 |

## Script Location
- `/Users/jessica/.openclaw/workspace/projects/colorandscent/scripts/sync-printify-images.py`
- Run: `python3 scripts/sync-printify-images.py`
- This is a one-shot sync, not a daemon

## Supabase API
- Base: set via `NEXT_PUBLIC_SUPABASE_URL` / project config
- Anon key: set via `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key: set via `SUPABASE_SERVICE_ROLE_KEY` in local/server env only; never commit real keys
- Table: `product_images`
  - id: uuid (auto)
  - product_id: uuid (FK to products.id)
  - url: text
  - alt_text: text
  - position: integer
  - is_primary: boolean
  - variant_color: text (nullable)

## Image Serving
- Mockup URLs from Printify CDN are hotlinkable (images-api.printify.com)
- No need to download + rehost; just store the Printify CDN URL
- next.config.mjs already has remotePatterns for images-api.printify.com