# Color & Scent — Deploy Status

_Status: Not yet deployed_

## Deployment Plan

1. **Create Supabase project** for Color & Scent
2. **Set up Printify shop** and add candle products
3. **Configure Stripe** for payments
4. **Deploy to Vercel** via GitLab integration
5. **Set environment variables** in Vercel dashboard
6. **Configure DNS** for colorandscent.com

## Environment Variables Needed

In Vercel → Color & Scent → Settings → Environment Variables:

```
COLORANDSCENT_SUPABASE_URL=
COLORANDSCENT_SUPABASE_ANON_KEY=
COLORANDSCENT_SUPABASE_SERVICE_ROLE_KEY=
COLORANDSCENT_STRIPE_SECRET_KEY=
COLORANDSCENT_STRIPE_WEBHOOK_SECRET=
COLORANDSCENT_PRINTIFY_API_TOKEN=
COLORANDSCENT_PRINTIFY_SHOP_ID=
COLORANDSCENT_RESEND_API_KEY=
COLORANDSCENT_CRON_SECRET=
NEXT_PUBLIC_APP_URL=https://colorandscent.com
```

## Notes
- Same tech stack as Noren Ecom
- Domain: colorandscent.com
