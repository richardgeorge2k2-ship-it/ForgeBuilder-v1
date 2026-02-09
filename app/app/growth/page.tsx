'use client'

import { GrowthSignal } from '@/lib/sas/types'

export default function GrowthSignalsPage() {
  // Mock signals based on SAS spec + Growth Loop v1
  const signals: GrowthSignal[] = [
    {
      id: '3',
      severity: 'low',
      category: 'growth',
      title: 'Invite another operator',
      detail: 'Your project shows healthy usage patterns. If you know another builder who would benefit, you can invite them privately.',
      recommended_action: 'Send invitation',
      status: 'open',
      confidence_score: 90,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      severity: 'high',
      category: 'revenue',
      title: 'Protective pause initiated',
      detail: 'Paid or growth automations paused to prevent spend during billing issues.',
      recommended_action: 'Verify Stripe connection to resume automations.',
      status: 'open',
      confidence_score: 95,
      created_at: new Date().toISOString()
    },
    {
      id: '1',
      severity: 'medium',
      category: 'conversion',
      title: 'Traffic increased without revenue lift',
      detail: 'Recent traffic growth is not translating into additional revenue.',
      recommended_action: 'Review landing message match and reduce checkout friction.',
      status: 'open',
      confidence_score: 82,
      evidence_json: {
        'Traffic growth': '+28% (7d avg)',
        'Revenue growth': '-6%',
        'Checkout abandon rate': '+12%'
      },
      created_at: new Date().toISOString()
    }
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-slate-900">Growth signals</h1>
          <p className="text-sm text-slate-500">Actionable insights generated from your system activity.</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">SAS™: Recommending</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-slate-900">Active signals</h2>
          <div className="grid gap-4">
            {signals.length > 0 ? (
              signals.map((signal) => (
                <div key={signal.id} className="p-6 border border-slate-100 rounded-lg bg-white space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          signal.severity === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {signal.severity}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                          {signal.category}
                        </span>
                        {signal.confidence_score && (
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider border-l border-slate-100 pl-2">
                            Signal strength: {signal.confidence_score}%
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-medium text-slate-900">{signal.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-xs font-medium text-slate-500 hover:text-slate-900 px-3 py-1.5 transition-colors">
                        Dismiss
                      </button>
                      <button className="text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-slate-800 transition-colors">
                        Mark as resolved
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 leading-relaxed">{signal.detail}</p>
                    
                    {signal.evidence_json && (
                      <details className="group">
                        <summary className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 transition-colors list-none flex items-center space-x-1">
                          <span>Why?</span>
                          <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="mt-2 grid grid-cols-2 gap-2 p-3 bg-slate-50/50 rounded border border-slate-100">
                          {Object.entries(signal.evidence_json).map(([key, value]) => (
                            <div key={key} className="space-y-0.5">
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{key}</p>
                              <p className="text-xs font-medium text-slate-900">{value}</p>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}

                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <p className="text-xs font-medium text-slate-900">System suggests:</p>
                      <p className="text-xs text-slate-600 mt-1">{signal.recommended_action}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border border-slate-100 rounded-lg p-20 flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-sm text-slate-600"> E2B No signals detected</p>
                <p className="text-xs text-slate-400">Your system is operating within expected ranges.</p>
                <p className="text-[10px] text-slate-400 mt-4">Signals appear when meaningful action is recommended.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-slate-900">Autonomous growth</h2>
            <p className="text-xs text-slate-500">These signals are generated by observing real system behavior. Nothing is published or sent without your approval.</p>
          </div>
          <p className="text-[10px] text-slate-400 italic">SAS™ prioritizes stability, clarity, and long-term growth.</p>
        </div>
      </div>
    </div>
  )
}
