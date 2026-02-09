import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { AppShell } from '@/components/layout/AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: sub } = await sb
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const ok = sub?.status === "active" || sub?.status === "trialing";
  
  // Allow access to billing even if subscription is not active
  // This allows users to subscribe if they are redirected here
  if (!ok) {
    // We need to check the current path, but in a Server Layout we can't easily.
    // However, we can allow the billing page to handle its own state or 
    // redirect to pricing if they try to access other app pages.
    // For now, let's redirect to pricing if no active sub.
    redirect("/pricing");
  }

  return <AppShell>{children}</AppShell>;
}
