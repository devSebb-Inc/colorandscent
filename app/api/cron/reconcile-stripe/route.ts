import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { eq } from "drizzle-orm"
import { stripe } from "@/lib/stripe/client"
import { handleCheckoutSessionCompleted } from "@/lib/stripe/webhooks"
import { db, orders } from "@/lib/db"

export const runtime = "nodejs"
export const maxDuration = 60

function getCronSecret(req: NextRequest): string | null {
  return (
    req.headers.get("x-cron-secret") ??
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    null
  )
}

export async function GET(req: NextRequest) {
  const secret = getCronSecret(req)

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const results: { checked: number; recovered: number; skipped: number; errors: string[] } = {
    checked: 0,
    recovered: 0,
    skipped: 0,
    errors: [],
  }

  const since = Math.floor(Date.now() / 1000) - 48 * 60 * 60

  let hasMore = true
  let startingAfter: string | undefined

  while (hasMore) {
    const sessions: Stripe.ApiList<Stripe.Checkout.Session> = await stripe.checkout.sessions.list({
      limit: 100,
      created: { gte: since },
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    })

    for (const session of sessions.data) {
      if (session.payment_status !== "paid") {
        continue
      }

      results.checked += 1

      const existing = await db
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.stripeCheckoutSessionId, session.id))
        .limit(1)

      if (existing.length > 0) {
        results.skipped += 1
        continue
      }

      try {
        await handleCheckoutSessionCompleted(session)
        results.recovered += 1
        console.log(`[Reconcile] Recovered order for session ${session.id}`)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        const formatted = `Session ${session.id}: ${message}`
        results.errors.push(formatted)
        console.error("[Reconcile] Failed to recover:", formatted)
      }
    }

    hasMore = sessions.has_more
    startingAfter = sessions.data.at(-1)?.id
  }

  console.log("[Reconcile] Done:", results)

  return NextResponse.json({ ok: true, ...results })
}
