import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

function planNameFromPrice(priceId?: string | null) {
  if (!priceId) return "None";
  if (priceId === process.env.STRIPE_PRICE_STARTER) return "Starter";
  if (priceId === process.env.STRIPE_PRICE_PRO) return "Pro";
  if (priceId === process.env.STRIPE_PRICE_ELITE) return "Elite";
  return "Custom";
}

export default async function SettingsPage() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: sub } = await sb
    .from("subscriptions")
    .select("status, price_id, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan = planNameFromPrice(sub?.price_id ?? null);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Project settings</h1>
          <p className="text-sm text-slate-500">Manage configuration and access for this project.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Subscription</h2>
            <Card className="p-6 space-y-4 border-slate-100 shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current plan</p>
                  <p className="text-lg font-semibold text-slate-900">{plan}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</p>
                  <p className={`text-sm font-medium ${sub?.status === 'active' ? 'text-emerald-600' : 'text-slate-900'} capitalize`}>
                    {sub?.status ?? "No active subscription"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Renewal date</p>
                  <p className="text-sm text-slate-900">
                    {sub?.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Auto-renew</p>
                  <p className="text-sm text-slate-900">
                    {sub?.cancel_at_period_end ? "Disabled" : "Enabled"}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4 border-t border-slate-50">
                <form action="/api/stripe/portal" method="post">
                  <button 
                    type="submit"
                    className="text-xs font-medium text-slate-900 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Manage billing
                  </button>
                </form>
                <a 
                  href="/app/billing" 
                  className="text-xs font-medium text-white bg-black px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-sm"
                >
                  Upgrade or change plan
                </a>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">General</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Project name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" defaultValue="ForgeBuilder" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Brand name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" defaultValue="ForgeBuilder" />
                </div>
              </div>
              <div className="pt-2">
                <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-sm">
                  Save changes
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">SAS™ Autonomy & Governance</h2>
            <Card className="p-6 space-y-6 border-slate-100 shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">Autonomy mode</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Delegate low-risk operational optimizations to the system.</p>
                  </div>
                  <select className="w-full text-xs font-medium border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/5">
                    <option value="off">Off</option>
                    <option value="recommend">Recommend</option>
                    <option value="execute">Execute (Elite)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">Approval mode</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Control how the system executes permitted actions.</p>
                  </div>
                  <select className="w-full text-xs font-medium border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/5">
                    <option value="none">None (Full Autonomy)</option>
                    <option value="first_time">First time only</option>
                    <option value="always">Always require approval</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Per-Action Permissions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'queue_optimize', label: 'Queue optimization' },
                    { id: 'signal_suppress', label: 'Signal suppression' },
                    { id: 'project_duplicate', label: 'Project duplication' },
                    { id: 'cadence_adjust', label: 'Cadence adjustment' },
                    { id: 'signal_reweight', label: 'Signal reweighting' },
                  ].map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="text-xs text-slate-700 font-medium">{action.label}</span>
                      <input type="checkbox" className="rounded-md border-slate-300 text-black focus:ring-black h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">System Health</h2>
            <Card className="p-4 space-y-4 border-slate-100 shadow-none bg-slate-50/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Stripe Mode</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Last Webhook</span>
                  <span className="text-xs font-medium text-slate-900">2 mins ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Supabase</span>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-slate-900">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">SAS™ Engine</span>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-slate-900">Active</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200/60">
                <button className="w-full text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline text-center">Run Diagnostics</button>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-red-600 border-b border-red-100 pb-2">Danger Zone</h2>
            <Card className="p-4 space-y-4 border-red-50 shadow-none bg-red-50/10">
              <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                Pause project
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                Delete permanently
              </button>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
