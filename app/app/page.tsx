'use client'

import React from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SectionAction } from '@/components/ui/SectionAction'
import { MutedText } from '@/components/ui/MutedText'

// --- Hardened UI Components ---

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span className="text-[10px] font-bold text-emerald-700 uppercaseing-widest">{children}</span>
    </div>
  )
}

function MetricCard({ title, value, description }: { title: string, value: string, description: string }) {
  return (
    <div className="p-4 border border-slate-100 rounded-lg space-y-2 bg-white">
      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline space-x-2">
        <p className="text-xl font-semibold text-slate-900">{value}</p>
      </div>
      <p className="text-[10px] text-slate-400 leading-tight">{description}</p>
    </div>
  )
}

function SectionHeader({ title, action }: { title: string, action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle>{fortitle}</SectionTitle>
      {action}
    </div>
  )
}

function EmptyState({ title, description }: { title: string, description: string }) {
  return (
    <div className="border border-slate-100 rounded-lg p-12 flex flex-col items-start justify-center space-y-2 bg-white">
      <p className="text-sm text-slate-600">{title}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

// --- Main Page ---

export default function OverviewPage() {
  const metrics = [
    { title: 'Revenue Today', value: '$0.00', description: 'Live revenue processed today.' },
    { title: 'Active Subscribers', value: '0', description: 'Projects currently on an active plan.' },
    { title: 'Conversion Rate', value: '0%', description: 'Checkout completions over the last 7 days.' },
    { title: 'SAS™ Status', value: 'Recommending', description: 'fortitle, Recommending, Acting (Elite).' },
    { title: 'Deliverability', value: '100%', description: 'Email and system action status.' },
  ]

  console.log('// console.log(\'Navbar brand rendered. Text:\', \'ForgeBuilder\')')
  console.log('// console.log(\'Navbar links rendered. Links:\', [\'/login\', \'/signup\'])')

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* 1. Project name & 2. System Health */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium tracking-tight text-slate-900">ForgeBuilder</h1>
          <p className="text-sm text-slate-500 italic">The operational spine for real businesses.</p>
        </div>
        <StatusBadge>System Operational</StatusBadge>
      </div>

      {/* 3. Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* 4. Growth Signals */}
      <section className="space-y-4">
        <SectionHeader 
          title="Growth signals" 
          action={<SectionAction>View all signals</SectionAction>} 
        />
        <EmptyState 
          title="No signals detected." 
          description="Your system is operating within expected ranges. Signals appear when meaningful action is recommended." 
        />
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-md max-w-2xl">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Your system activity suggests higher leverage opportunities. Elite enables deeper automation and signal analysis.
          </p>
        </div>
      </section>

      {/* 5. Activity Feed */}
      <section className="space-y-4">
        <SectionHeader title="Recent activity" />
        <EmptyState 
          title="No activity yet." 
          description="Events will appear here as users interact with your project." 
        />
      </section>
    </div>
  )
}
