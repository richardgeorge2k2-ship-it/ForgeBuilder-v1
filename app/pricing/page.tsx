"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Tier = "starter" | "pro" | "elite";

async function startCheckout(tier: Tier) {
  const res = await fetch(`/api/stripe/checkout?tier=${tier}`, { method: "POST" });
  if (!res.ok) throw new Error(await res.text());
  const { url } = await res.json();
  window.location.href = url;
}

export default function PricingPage() {
  const [loading, setLoading] = useState<Tier | null>(null);

  const buy = async (tier: Tier) => {
    try {
      setLoading(tier);
      await startCheckout(tier);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="text-gray-600">Choose your plan. Subscriptions are managed securely through Stripe.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Starter</div>
            <div className="text-2xl font-semibold">Starter</div>
            <div className="text-sm text-gray-600 mt-1">Core access + essentials.</div>
          </div>
          <Button disabled={loading === "starter"} onClick={() => buy("starter")}>
            {loading === "starter" ? "Redirecting..." : "Subscribe Starter"}
          </Button>
        </Card>

        <Card className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Pro</div>
            <div className="text-2xl font-semibold">Pro</div>
            <div className="text-sm text-gray-600 mt-1">Advanced features + higher limits.</div>
          </div>
          <Button disabled={loading === "pro"} onClick={() => buy("pro")}>
            {loading === "pro" ? "Redirecting..." : "Subscribe Pro"}
          </Button>
        </Card>

        <Card className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Elite</div>
            <div className="text-2xl font-semibold">Elite</div>
            <div className="text-sm text-gray-600 mt-1">Full power + priority workflows.</div>
          </div>
          <Button disabled={loading === "elite"} onClick={() => buy("elite")}>
            {loading === "elite" ? "Redirecting..." : "Subscribe Elite"}
          </Button>
        </Card>
      </div>
    </main>
  );
}
