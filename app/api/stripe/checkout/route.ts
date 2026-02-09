import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const PRICE_BY_TIER: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  elite: process.env.STRIPE_PRICE_ELITE,
};

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get("tier");

    if (!tier || !PRICE_BY_TIER[tier]) {
      return new NextResponse("Invalid tier", { status: 400 });
    }

    const sb = await supabaseServer();
    const { data: { user }, error: authError } = await sb.auth.getUser();
    
    if (authError || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const admin = supabaseAdmin();

    // Ensure profile row exists and get stripe_customer_id
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    let stripeCustomerId = profile?.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      stripeCustomerId = customer.id;

      await admin.from("profiles").upsert({
        id: user.id,
        email: user.email,
        stripe_customer_id: stripeCustomerId,
      });
    }

    const appUrl = process.env.APP_URL || `https://${process.env.VERCEL_URL}`;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: PRICE_BY_TIER[tier]!, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/billing/cancel`,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
