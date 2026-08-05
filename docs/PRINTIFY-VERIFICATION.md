# Printify Product Verification Report

**Date:** August 3, 2026  
**Purpose:** Verify that Color & Scent's 8-product lineup can be fulfilled through Printify  
**Status:** ⚠️ PARTIAL VERIFICATION — Requires Printify Account Login for Full Details

---

## Executive Summary

Based on research of Printify's public-facing website, API documentation, and blog content, **5 of 8 products are likely viable** through Printify. However, **full verification requires logging into a Printify account** to access the complete catalog, variant details, and scent options. The Printify catalog is behind a login wall and cannot be fully explored without authentication.

---

## Printify API Overview

### Can we create products programmatically?
**✅ YES** — Printify provides a full REST API for product creation.

**Base URL:** `https://api.printify.com/v1/`

### Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/catalog/blueprints.json` | GET | List all product blueprints (catalog) |
| `/v1/catalog/blueprints/{blueprint_id}.json` | GET | Get blueprint details |
| `/v1/catalog/blueprints/{blueprint_id}/print_providers.json` | GET | Get print providers for a blueprint |
| `/v1/catalog/blueprints/{blueprint_id}/print_providers/{provider_id}/variants.json` | GET | Get variants for a product |
| `/v1/uploads/images.json` | POST | Upload a design image |
| `/v1/shops/{shop_id}/products.json` | POST | Create a new product |
| `/v1/shops/{shop_id}/products/{product_id}.json` | PUT | Update a product |
| `/v1/shops/{shop_id}/products/{product_id}/publish.json` | POST | Publish product to store |

### Authentication
- **Personal Access Token** (for individual merchants)
- **OAuth 2.0** (for platforms managing multiple merchants)
- Tokens valid for 1 year

### Rate Limits
- **Global:** 600 requests/minute
- **Catalog API:** 100 requests/minute (separate limit)
- **Product Publishing:** 200 requests/30 minutes

---

## Product Creation Flow via API

### Step 1: Upload Design Image
```bash
POST /v1/uploads/images.json
Content-Type: multipart/form-data
Authorization: Bearer {token}

# Upload your label design as PNG/JPG
# Returns: { "id": "abc123", "src": "https://...", "width": 3000, "height": 1500 }
```

### Step 2: Get Blueprint & Provider IDs
```bash
GET /v1/catalog/blueprints.json
# Find your product (e.g., "Scented Candles, Coconut Apricot Wax")
# Note the blueprint_id (e.g., 1234)

GET /v1/catalog/blueprints/1234/print_providers.json
# Find "Printed Mint" provider
# Note the print_provider_id (e.g., 56)
```

### Step 3: Get Variants (Sizes, Colors, Lids)
```bash
GET /v1/catalog/blueprints/1234/print_providers/56/variants.json
# Returns all available variants with IDs, prices, options
# Select the variants you want to enable
```

### Step 4: Create Product
```bash
POST /v1/shops/{shop_id}/products.json
{
  "title": "Amber Jar 9oz - Lavender Dreams",
  "description": "Hand-poured soy candle with lavender essential oil",
  "blueprint_id": 1234,
  "print_provider_id": 56,
  "variants": [
    { "id": 45740, "price": 2499, "is_enabled": true }
  ],
  "print_areas": [
    {
      "variant_ids": [45740],
      "placeholders": [
        {
          "position": "front",
          "images": [
            {
              "id": "abc123",
              "x": 0.5,
              "y": 0.5,
              "scale": 1,
              "angle": 0
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Product-by-Product Verification

### Product 1: Amber Jar 9oz
**Printify Mapping:** Printed Mint 'Candle Amber Jar 9oz'

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ⚠️ **LIKELY YES** — Printed Mint offers "Scented Candles, Coconut Apricot Wax" in 4oz and 9oz sizes with 2 colors. The amber jar variant likely exists as a color option. |
| Lid colors available? | ⚠️ **UNKNOWN** — Requires catalog access. Blog shows "2 colors" for Printed Mint candles. Likely: Black and Gold lids. |
| Scents available? | ⚠️ **UNKNOWN** — Requires catalog access. Printed Mint candles are "Scented" so scents are selectable at order time. |
| Custom label upload? | ✅ **YES** — Upload via `/v1/uploads/images.json`, place on candle via print_areas |
| Product ID/URL? | ⚠️ **REQUIRES LOGIN** — Blueprint ID and variant IDs only visible in logged-in catalog |

**Risk:** Medium — Product likely exists but exact variant details need confirmation.

---

### Product 2: Glass Jar 9oz
**Printify Mapping:** Printed Mint 'Candle Clear Jar 9oz'

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ⚠️ **LIKELY YES** — Printed Mint's "Scented Candles, Coconut Apricot Wax" comes in clear glass variant |
| Lid colors available? | ⚠️ **UNKNOWN** — Likely Black and Gold options |
| Scents available? | ⚠️ **UNKNOWN** — Requires catalog access |
| Custom label upload? | ✅ **YES** — Same API flow as above |
| Product ID/URL? | ⚠️ **REQUIRES LOGIN** |

**Risk:** Medium — Same Printed Mint product line, likely exists.

---

### Product 3: Premium Glass 9oz (Gold Lid)
**Printify Mapping:** Printed Mint 'Candle Clear Jar 9oz' (with gold lid)

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ⚠️ **LIKELY YES** — Same base product as #2, gold lid is a variant option |
| Lid colors available? | ⚠️ **UNKNOWN** — Gold lid likely available as variant |
| Scents available? | ⚠️ **UNKNOWN** |
| Custom label upload? | ✅ **YES** |
| Product ID/URL? | ⚠️ **REQUIRES LOGIN** — Same blueprint, different variant |

**Risk:** Low — This is just a variant selection (gold lid) of the same product.

---

### Product 4: Premium Amber 9oz (Gold Lid)
**Printify Mapping:** Printed Mint 'Candle Amber Jar 9oz' (with gold lid)

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ⚠️ **LIKELY YES** — Same base product as #1, gold lid variant |
| Lid colors available? | ⚠️ **UNKNOWN** — Gold lid likely available |
| Scents available? | ⚠️ **UNKNOWN** |
| Custom label upload? | ✅ **YES** |
| Product ID/URL? | ⚠️ **REQUIRES LOGIN** |

**Risk:** Low — Variant selection of existing product.

---

### Product 5: Large Glass 13.75oz
**Printify Mapping:** Printed Mint 'Straight-Sided Clear Glass 12.5oz'

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ❓ **UNCONFIRMED** — The blog mentions "Multi-Size" candles but doesn't specifically list a 12.5oz straight-sided glass. This may be a different product line or may not exist. |
| Lid colors available? | ❓ **UNKNOWN** |
| Scents available? | ❓ **UNKNOWN** |
| Custom label upload? | ✅ **YES** (if product exists) |
| Product ID/URL? | ❓ **REQUIRES LOGIN** — Must search catalog |

**Risk:** HIGH — This specific product (12.5oz straight-sided glass) is not confirmed in Printify's public listings. May need to find alternative or verify in catalog.

---

### Product 6: Frosted Glass 11oz
**Printify Mapping:** Printed Mint 'Candle Frosted Glass 11oz'

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ❓ **UNCONFIRMED** — Not mentioned in blog posts. Must verify in catalog. |
| Lid colors available? | ❓ **UNKNOWN** |
| Scents available? | ❓ **UNKNOWN** |
| Custom label upload? | ✅ **YES** (if product exists) |
| Product ID/URL? | ❓ **REQUIRES LOGIN** |

**Risk:** HIGH — Frosted glass candle not confirmed in public listings.

---

### Product 7: Tin Duo 4oz × 2
**Printify Mapping:** Printed Mint 'Candle Tin 4oz' × 2

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ⚠️ **PARTIALLY YES** — Printed Mint offers 4oz candles, but "tin" variant not confirmed. Blog shows "Coconut Apricot Wax (4oz, 9oz)" — the 4oz may be in a tin. |
| Lid colors available? | ⚠️ **UNKNOWN** |
| Scents available? | ⚠️ **UNKNOWN** |
| Custom label upload? | ✅ **YES** |
| Product ID/URL? | ⚠️ **REQUIRES LOGIN** |

**Risk:** MEDIUM — 4oz size exists, but tin container not confirmed. May need to verify container type in catalog.

---

### Product 8: Gift Set 4-piece
**Printify Mapping:** Printonic '4-Piece Blush & Bloom Gift Set'

| Question | Finding |
|----------|---------|
| Does this exact product exist? | ❓ **UNCONFIRMED** — Printonic is a different print provider. Not mentioned in Printify's public candle listings. Must verify in catalog. |
| Can you mix and match products? | ❓ **UNKNOWN** — Gift sets are typically pre-made bundles on Printify. Mixing products in a single gift set may not be possible via API. |
| Custom label upload? | ❓ **UNKNOWN** |
| Product ID/URL? | ❓ **REQUIRES LOGIN** |

**Risk:** HIGH — Printonic gift set not confirmed. Gift sets on Printify are typically pre-configured bundles, not mix-and-match.

---

## How to Upload Custom Label Designs

### Via API:
1. **Upload your label image** via `POST /v1/uploads/images.json`
   - Format: PNG, JPG, or SVG
   - Recommended: 300 DPI, transparent background
   - Max size: Check Printify's current limits

2. **Place the label** on the candle in the product creation request
   - Use the `print_areas` array with `position: "front"` (or appropriate position)
   - Set `x`, `y`, `scale`, `angle` for placement

### Via Printify Dashboard:
1. Login to Printify
2. Go to Catalog → Candles
3. Select your candle product
4. Click "Start designing"
5. Upload your label design
6. Position and resize on the candle
7. Save and publish

---

## Label Dimensions (Estimated)

**⚠️ MUST VERIFY IN CATALOG** — Exact dimensions are only visible when creating the product in Printify's dashboard or via the API variants endpoint.

Typical candle label dimensions:
- **9oz jar:** ~8" × 3" wrap-around label (varies by jar diameter)
- **4oz tin:** ~6" × 2" wrap-around label
- **11oz-13oz jar:** ~9" × 3.5" wrap-around label

**Recommendation:** Once you have API access, call `GET /v1/catalog/blueprints/{id}/print_providers/{id}/variants.json` to get exact print area dimensions for each variant.

---

## Gift Set Configuration

### Can you mix and match products?
**⚠️ UNCERTAIN** — Printify gift sets are typically:
- Pre-configured bundles from a single provider
- Each item in the bundle is a separate product variant
- You may be able to create a "gift set" by bundling multiple products in your own store

### Approach:
1. Create 4 individual candle products in Printify
2. In your ecommerce store (Shopify, Etsy, etc.), create a "Gift Set" listing
3. When an order comes in, place 4 separate Printify orders
4. OR use Printify's bundle features if available

---

## Next Steps (REQUIRED)

### 1. Create Printify Account
- Sign up at https://www.printify.com
- Complete onboarding

### 2. Generate API Token
- Go to My Profile → Connections
- Generate Personal Access Token
- Store securely (only shown once)

### 3. Connect Store
- Go to My Stores → Add new store → API
- Connect your store

### 4. Query Catalog
```bash
# Get all blueprints
curl -X GET https://api.printify.com/v1/catalog/blueprints.json \
  -H "Authorization: Bearer {YOUR_TOKEN}"

# Search for candle products
# Look for: "Printed Mint", "Coconut Apricot Wax", "Amber Jar", "Clear Jar"

# Get variants for each product
curl -X GET https://api.printify.com/v1/catalog/blueprints/{blueprint_id}/print_providers/{provider_id}/variants.json \
  -H "Authorization: Bearer {YOUR_TOKEN}"
```

### 5. Verify Each Product
For each of our 8 products, confirm:
- Blueprint ID
- Print Provider ID (Printed Mint or Printonic)
- Variant IDs for each size/color/lid combination
- Available scents (if selectable at order time)
- Exact label dimensions

### 6. Create Test Product
- Upload a test label design
- Create one product via API
- Verify it appears in your store
- Place a test order

---

## Risk Assessment

| Product | Risk Level | Issue |
|---------|------------|-------|
| 1. Amber Jar 9oz | 🟡 MEDIUM | Likely exists, needs variant confirmation |
| 2. Glass Jar 9oz | 🟡 MEDIUM | Likely exists, needs variant confirmation |
| 3. Premium Glass 9oz | 🟢 LOW | Variant of #2, gold lid option |
| 4. Premium Amber 9oz | 🟢 LOW | Variant of #1, gold lid option |
| 5. Large Glass 13.75oz | 🔴 HIGH | 12.5oz straight-sided glass not confirmed |
| 6. Frosted Glass 11oz | 🔴 HIGH | Frosted glass not confirmed in public listings |
| 7. Tin Duo 4oz×2 | 🟡 MEDIUM | 4oz exists, tin container not confirmed |
| 8. Gift Set 4-piece | 🔴 HIGH | Printonic gift set not confirmed, mixing uncertain |

### Overall Viability: ⚠️ CONDITIONALLY VIABLE
- 4 products likely viable (1-4)
- 1 product partially viable (7)
- 3 products need verification (5, 6, 8)

---

## Recommendations

1. **Priority 1:** Create Printify account and generate API token
2. **Priority 2:** Query catalog to verify all 8 products exist
3. **Priority 3:** If products 5, 6, or 8 don't exist, find alternatives:
   - Product 5: Look for any 12-14oz clear glass candle
   - Product 6: Look for any frosted glass candle option
   - Product 8: Consider creating gift set as 4 separate products bundled in your store
4. **Priority 4:** Upload test designs and create one product end-to-end
5. **Priority 5:** Document exact blueprint IDs, provider IDs, and variant IDs for all 8 products

---

## Files Created
- `/Users/jessica/.openclaw/workspace/projects/colorandscent/docs/PRINTIFY-VERIFICATION.md` (this file)

---

*Report generated August 3, 2026. Product availability may change. Verify with Printify catalog after account creation.*
