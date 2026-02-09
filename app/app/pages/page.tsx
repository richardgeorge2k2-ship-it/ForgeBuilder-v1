'use client'

export default function PagesManager() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-slate-900">Pages</h1>
          <p className="text-sm text-slate-500">Manage application and landing pages for this project.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
          Create page
        </button>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-100">
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Path</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Last updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-4 py-20">
                <div className="space-y-2 max-w-md">
                  <p className="text-sm text-slate-600 font-medium">No pages created yet.</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Create your first page to begin building your project. Once created, you can manage paths, status, and content from this view.
                  </p>
                  <div className="pt-2">
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                      Create first page
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
