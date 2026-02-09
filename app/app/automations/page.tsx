'use client'

export default function AutomationsPage() {
  const automations = [
    {
      title: 'SAS™ Observer',
      description: 'Monitors activity and billing events every 30 minutes to establish operational baselines.',
      enabled: true,
      mode: 'Observe'
    },
    {
      title: 'SAS™ Recommender',
      description: 'Analyzes trends daily to identify conversion, revenue, and retention opportunities.',
      enabled: true,
      mode: 'Recommend'
    },
    {
      title: 'SAS™ Actor',
      description: 'Executes protective actions and drafts re-engagement content based on high-confidence signals.',
      enabled: true,
      mode: 'Act',
      eliteOnly: true
    },
    {
      title: 'Self-Growth Loop',
      description: 'Identifies opportunities to expand the ForgeBuilder network through high-performing operators.',
      enabled: true,
      mode: 'Recommend'
    },
    {
      title: 'Daily system health',
      description: 'Monitors activity, billing, and operational signals.',
      enabled: true
    },
    {
      title: 'Content draft generation',
      description: 'Produces content ideas for review and publishing.',
      enabled: false
    }
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-slate-900">Automations</h1>
        <p className="text-sm text-slate-500">Background systems that monitor, analyze, and assist growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((automation) => (
          <div key={automation.title} className="p-6 border border-slate-100 rounded-lg flex flex-col justify-between space-y-4 bg-white">
            <div className="space-y-2">
             cy
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-900">{automation.title}</h3>
                {automation.eliteOnly && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-2 py-0.5 rounded">Elite</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{automation.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <button 
                disabled={automation.eliteOnly}
                className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors w-fit ${
                  automation.enabled 
                    ? 'text-slate-500 border-slate-200 hover:bg-slate-50' 
                    : 'text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white'
                } ${automation.eliteOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {automation.enabled ? 'Disable automation' : 'Enable automation'}
              </button>
              {automation.mode && (
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Mode: {automation.mode}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
