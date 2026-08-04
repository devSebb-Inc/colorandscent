import { NextRequest, NextResponse } from "next/server"
import { and, eq, gte } from "drizzle-orm"
import { db, orderEvents, orderItems, orders } from "@/lib/db"
import { createPrintifyOrder } from "@/lib/printify/orders"

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

  const since = new Date(Date.now() - 48 * 60 * 60 * 1000)
  const results: { checked: number; retried: number; errors: string[] } = {
    checked: 0,
    retried: 0,
    errors: [],
  }

  const candidateOrders = await db
    .select()
    .from(orders)
    .where(and(eq(orders.fulfillmentStatus, "unfulfilled"), gte(orders.createdAt, since)))

  for (const order of candidateOrders) {
    results.checked += 1

    const events = await db
      .select({ eventType: orderEvents.eventType })
      .from(orderEvents)
      .where(eq(orderEvents.orderId, order.id))

    const hasPrintifyError = events.some((event) => event.eventType === "printify_error")
    const hasSentToPrintify = events.some((event) => event.eventType === "sent_to_printify")

    if (!hasPrintifyError || hasSentToPrintify) {
      continue
    }

    const items = await db
      .select({
        orderId: orderItems.orderId,
        title: orderItems.title,
        variantLabel: orderItems.variantLabel,
        quantity: orderItems.quantity,
        unitPriceCents: orderItems.unitPriceCents,
        totalCents: orderItems.totalCents,
        printifyVariantId: orderItems.printifyVariantId,
      })
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id))

    try {
      await createPrintifyOrder(
        { id: order.id, orderNumber: order.orderNumber },
        items,
        {
          name: order.shippingName,
          address1: order.shippingAddressLine1,
          address2: order.shippingAddressLine2 ?? "",
          city: order.shippingCity,
          state: order.shippingState ?? "",
          zip: order.shippingPostalCode,
          country: order.shippingCountry,
          email: order.email,
        }
      )

      await db.insert(orderEvents).values({
        orderId: order.id,
        eventType: "sent_to_printify",
        description: "Printify order submitted via retry cron.",
      })

      results.retried += 1
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      const formatted = `Order ${order.orderNumber}: ${message}`

      results.errors.push(formatted)

      await db.insert(orderEvents).values({
        orderId: order.id,
        eventType: "printify_error",
        description: `Retry failed: ${formatted}`,
      })

      console.error("[Retry Printify] Failed:", formatted)
    }
  }

  console.log("[Retry Printify] Done:", results)

  return NextResponse.json({ ok: true, ...results })
}
