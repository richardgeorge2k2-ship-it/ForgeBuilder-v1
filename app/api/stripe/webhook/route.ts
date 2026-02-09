import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Stripe from "stripe";

export const runtime = "nodejs";

function toDate(ts?: number | null) {
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing stripe-signature", { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  const admin = supabaseAdmin();

  const resolveUserId = async (sub: Stripe.Subscription | Stripe.Checkout.Session) => {
    const metaUser = sub.metadata?.supabase_user_id;
    if (metaUser) return metaUser as string;

    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
    if (!customerId) return null;

    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    return profile?.id ?? null;
  };

  const upsertSub = async (sub: Stripe.Subscription) => {
    const userId = await resolveUserId(sub);
    if (!userId) return;

    const priceId = sub.items.data?.[0]?.price?.id ?? null;

    await admin.from("subscriptions").upsert({
      id: sub.id,
      user_id: userId,
      status: sub.status,
      price_id: priceId,
      current_period_end: toDate(sub.current_period_end),
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      updated_at: new Date().toISOString(),
    });
  };

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          await upsertSub(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSub(sub);
        break;
      }
      default:
        break;
    }
  } catch (e: any) {
    console.error(`Webhook handler failed: ${e.message}`);
    return new NextResponse(`Webhook handler failed: ${e.message}`, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
