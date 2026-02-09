'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Overview', href: '/app' },
    { name: 'Pages', href: '/app/pages' },
    { name: 'Automations', href: '/app/automations' },
    { name: 'Growth signals', href: '/app/growth' },
    { name: 'Billing', href: '/app/billing' },
    { name: 'Settings', href: '/app/settings' },
  ]

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col">
        <div className="p-6">
          <div className="h-8 w-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xs">
            FB
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-slate-50 text-slate-900' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Operator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
