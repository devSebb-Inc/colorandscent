# Color & Scent — Project Brief

_Type: ecommerce_
_Owner: Sebb_
_Created: 2026-08_
_Last updated: 2026-08-03_

---

## What It Is
A Next.js storefront for a premium candle and home fragrance brand called Color & Scent. DB-driven product catalog via Supabase. Deployed on Vercel.

## Stack
- **Storefront**: Next.js (hosted on Vercel)
- **DB**: Supabase (`COLORANDSCENT_SUPABASE_*` env vars)
- **Printify**: `COLORANDSCENT_PRINTIFY_API_TOKEN`
- **Email**: Resend (`COLORANDSCENT_RESEND_API_KEY`)
- **Domain**: colorandscent.com
- **Dashboard**: Mission Control `/projects/colorandscent` (reads Supabase live)

## Mission Control Integration
The `/projects/colorandscent` page reads from Supabase directly via the API keys in `.env.local`. It shows orders, customers, subscribers, cart sessions, and discount codes.

## Strategic Objective
Launch a functioning DTC storefront for premium candles & home fragrance, validate product-market fit, then scale.
