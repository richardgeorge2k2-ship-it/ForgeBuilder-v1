'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/database.types'

export default function BillingPage() {
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<Database['public']['Tables']['subscriptions']['Row'] | null>(null)
  const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row'] | null>(null)

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function loadBillingData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [subRes, profRes] = await Promise.all([
        supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      ])

      if (subRes.data) setSubscription(subRes.data)
      if (profRes.data) setProfile(profRes.data)
      setLoading(false)
    }

    loadBillingData()
  }, [supabase])

  const handleCheckout = async (tier: string) => {
    try {
      setActionLoading(tier)
      const res = await fetch(`/api/stripe/checkout?tier=${tier.toLowerCase()}`, { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handlePortal = async () => {
    try {
      setActionLoading('portal')
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error('Portal error:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const getPlanName = (priceId: string | null) => {
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) return 'Starter'
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) return 'Pro'
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE) return 'Elite'
    return 'Unknown Plan'
  }

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      positioning: 'For validating an idea and launching with confidence.',
      features: [
        'One active project',
        'Live Stripe billing',
        'Core dashboard',
        'Page builder',
        'Daily system health monitoring',
        'Weekly growth signals',
        'Basic automations enabled',
        'Community support',
      ],
      buttonText: 'Start with Starter',
      recommended: false,
      tier: 'starter'
    },
    {
      name: 'Pro',
      price: '$79',
      positioning: 'For operators running a real business.',
      features: [
        'Up to five active projects',
        'Full dashboard access',
        'Advanced automations',
        'Full growth signal history',
        'Content draft generation',
        'Conversion and retention insights',
        'Priority support',
      ],
      buttonText: 'Upgrade to Pro',
      recommended: true,
      tier: 'pro'
    },
    {
      name: 'Elite',
      price: '$149',
      positioning: 'For serious builders scaling multiple revenue streams.',
      features: [
        'Unlimited projects',
        'Full SAS autonomy',
        'Advanced anomaly detection',
        'Priority execution of automations',
        'Early access to new capabilities',
        'Direct escalation support',
      ],
      buttonText: 'Upgrade to Elite',
      recommended: false,
      tier: 'elite'
    },
  ]

  if (loading) {
    return <div className="p-8 max-w-6xl mx-auto">Loading billing details...</div>
  }

  if (!subscription || subscription.status !== 'active') {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-12">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-medium text-slate-900">Choose a plan</h1>
          <p className="text-sm text-slate-500">
            Plans scale with your operation. You can upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative p-8 border rounded-xl flex flex-col space-y-6 transition-all ${
                plan.recommended 
                  ? 'border-slate-900 shadow-sm ring-1 ring-slate-900' 
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Recommended
                </span>
              )}
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-900">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{plan.positioning}</p>
              </div>

              <button 
                onClick={() => handleCheckout(plan.tier)}
                disabled={!!actionLoading}
                className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
                  plan.recommended 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
                } disabled:opacity-50`}
              >
                {actionLoading === plan.tier ? 'Redirecting...' : plan.buttonText}
              </button>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">What's included</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400">Billing through Stripe • No long-term contracts • Cancel anytime</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-slate-900">Billing</h1>
        <p className="text-sm text-slate-500">Manage payments and subscription status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="p-6 border border-slate-100 rounded-lg space-y-4 bg-white">
            <h2 className="text-sm font-medium text-slate-900">Current plan</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Plan</p>
                <p className="text-sm font-medium text-slate-900">{getPlanName(subscription.price_id)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Status</p>
                <p className="text-sm font-medium text-emerald-600 capitalize">{subscription.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Next billing date</p>
                <p className="text-sm text-slate-900">
                  {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            <div className="pt-4 flex space-x-4">
              <button 
                onClick={handlePortal}
                disabled={!!actionLoading}
                className="text-xs font-medium text-slate-900 border border-slate-200 px-4 py-2 rounded hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {actionLoading === 'portal' ? 'Loading...' : 'Manage subscription'}
              </button>
            </div>
          </div>

          <div className="p-6 border border-slate-100 rounded-lg space-y-4 bg-white">
            <h2 className="text-sm font-medium text-slate-900">Builder credits</h2>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 leading-relaxed">
                Invite another operator to ForgeBuilder. Both receive one free month upon activation.
              </p>
              <p className="text-[10px] text-slate-400 italic">
                Builder credit applied to next invoice. Invitations are private and not publicly visible.
              </p>
            </div>
            <button className="text-xs font-medium text-slate-900 border border-slate-200 px-4 py-2 rounded hover:bg-slate-50 transition-colors">
              Send private invite
            </button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="p-6 border border-slate-100 rounded-lg space-y-4 bg-white">
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-slate-900">Add-ons</h2>
              <p className="text-[10px] text-slate-400">High-leverage extensions for your operation.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between group">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-900">White-label mode</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Remove ForgeBuilder branding from all public pages.</p>
                  <p className="text-[10px] font-bold text-slate-400">$39/mo</p>
                </div>
                <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline shrink-0">Enable</button>
              </div>
              <div className="flex items-start justify-between group">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-900">Advanced audit logs</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Extended event history and CSV exports for compliance.</p>
                  <p className="text-[10px] font-bold text-slate-400">$19/mo</p>
                </div>
                <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline shrink-0">Enable</button>
              </div>
              <div className="flex items-start justify-between group">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-900">Priority automation queue</p>
                  <p className="text-[10px] text-scyte-500 leading-relaxed">Faster SAS™ execution and higher frequency monitoring.</p>
                  <p className="text-[10px] font-bold text-slate-400">$29/mo</p>
                </div>
                <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline shrink-0">Enable</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
