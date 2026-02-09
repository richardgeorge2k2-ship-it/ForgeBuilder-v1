import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST() {
  try {
    const sb = await supabaseServer();
    const { data: { user }, error: authError } = await sb.auth.getUser();
    
    if (authError || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const admin = supabaseAdmin();
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    const customerId = profile?.stripe_customer_id;
    if (!customerId) {
      return new NextResponse("No Stripe customer found. Please subscribe first.", { status: 400 });
    }

    const appUrl = process.env.APP_URL || `https://${process.env.VERCEL_URL}`;
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/app/settings`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error: any) {
    console.error("Portal Error:", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
