-- COLOR & SCENT RLS Fix — 2026-04-07
-- Enables Row Level Security on all previously UNRESTRICTED tables.
-- Service role (used by all API routes) bypasses RLS automatically.
-- Anon/public access is denied on all sensitive tables.

-- ============================================================
-- cart_sessions — private, server-only
-- ============================================================
ALTER TABLE cart_sessions ENABLE ROW LEVEL SECURITY;
-- No public policies — only service_role can access

-- ============================================================
-- discount_codes — private, server-only
-- ============================================================
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
-- No public policies — only service_role can access

-- ============================================================
-- order_events — private, server-only
-- ============================================================
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
-- No public policies — only service_role can access

-- ============================================================
-- order_items — private, server-only
-- ============================================================
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
-- No public policies — only service_role can access

-- ============================================================
-- seo_settings — public read-only (used by frontend for meta tags)
-- ============================================================
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read SEO settings"
  ON seo_settings FOR SELECT
  USING (true);

-- ============================================================
-- store_settings — public read-only (used by frontend for banners, config)
-- ============================================================
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read store settings"
  ON store_settings FOR SELECT
  USING (true);

-- ============================================================
-- collections — public read-only (already existed, confirm it's set)
-- ============================================================
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active collections"
  ON collections FOR SELECT
  USING (is_active = true);
