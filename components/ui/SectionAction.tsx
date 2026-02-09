import React from 'react'

export function SectionAction({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
    >
      {children}
    </button>
  )
}
