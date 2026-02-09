'use client'

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium text-slate-900">Project settings</h1>
        <p className="text-sm text-slate-500">Manage configuration and access for this.</p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-900 border-b border-slate-100 pb-2">General</h2>
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Project name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" defaultValue="ForgeBuilder" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Brand name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" defaultValue="ForgeBuilder" />
            </div>
            <div className="pt-2">
              <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                Save changes
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-900 border-b border-slate-100 pb-2">Access</h2>
          <p className="text-sm text-slate-500">Project members and roles</p>
          <div className="text-xs text-slate-400 italic">No other members yet. Members added here will have full operational access.</div>
          {/* Elite Power Move */}
          <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/30 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">Request custom automation</p>
              <p className="text-xs text-slate-500">Elite members can request bespoke SAS™ logic for specific operational needs.</p>
            </div>
            <button className="text-xs font-medium text-slate-400 cursor-not-allowed">Elite only</button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-900 border-b border-slate-100 pb-2">SAS™ Autonomy & Governance</h2>
          <div className="p-6 border border-slate-100 rounded-lg bg-white space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">Autonomy mode</p>
                  <p className="text-xs text-slate-500">Delegate low-risk operational optimizations to the system.</p>
                </div>
                <select className="w-full text-xs font-medium border border-slate-200 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400">
                  <option value="off">Off</option>
                  <option value="recommend">Recommend</option>
                  <option value="execute">Execute (Elite)</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">Approval mode</p>
                  <p className="text-xs text-slate-500">Control how the system executes permitted actions.</p>
                </div>
                <select className="w-full text-xs font-medium border border-slate-200 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400">
                  <option value="none">None (Full Autonomy)</option>
                  <option value="first_time">First time only</option>
                  <option value="always">Always require approval</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-4">
              <p className="text-xs font-medium text-slate-900 uppercase tracking-wider">Per-Action Permissions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'queue_optimize', label: 'Queue optimization' },
                  { id: 'signal_suppress', label: 'Signal suppression' },
                  { id: 'project_duplicate', label: 'Project duplication' },
                  { id: 'cadence_adjust', label: 'Cadence adjustment' },
                  { id: 'signal_reweight', label: 'Signal reweighting' },
                ].map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-md">
                    <span className="text-xs text-slate-700">{action.label}</span>
                    <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-900">Compliance mode</p>
                <p className="text-[10px] text-slate-500">Restrict autonomy to non-destructive system optimizations only.</p>
              </div>
              <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Enable</button>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-900">Audit & Governance</p>
                <p className="text-[10px] text-slate-500">Export full system action history for compliance review.</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline">Export CSV</button>
                <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline">Export JSON</button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic">System assistance operates within configured permissions and governance rules.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-red-600 border-b border-red-100 pb-2">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/30">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">Pause project</p>
                <p className="text-xs text-slate-500">Pausing this project will disable billing and automations. You can resume at any time.</p>
              </div>
              <button className="text-xs font-medium text-red-600 hover:text-red-700">Pause project</button>
            </div>
            <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/30">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">Delete project</p>
                <p className="text-xs text-slate-500">Deleting this project permanently removes all associated data. This action cannot be undone.</p>
              </div>
              <button className="text-xs font-medium text-red-600 hover:text-red-700">Delete permanently</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
