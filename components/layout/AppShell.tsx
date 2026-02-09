'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/app' },
  { name: 'Pages', href: '/app/pages' },
  { name: 'Automations', href: '/app/automations' },
  { name: 'Growth signals', href: '/app/growth' },
  { name: 'Billing', href: '/app/billing' },
  { name: 'Settings', href: '/app/settings' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-white font-sans antialiased text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/app" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
              FB
            </div>
            <span className="font-semibold tracking-tight">ForgeBuilder</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? 'bg-slate-100 text-black shadow-sm' 
                    : 'text-slate-500 hover:text-black hover:bg-slate-50'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-slate-200 group-hover:bg-slate-300 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Operator</p>
              <p className="text-[10px] text-slate-400 truncate uppercase tracking-wider font-bold">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
