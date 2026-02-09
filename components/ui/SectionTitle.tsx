import React from 'react'

export function SectionTitle({ children, light = false }: { children: React.ReactNode, light?: boolean }) {
  return (
    <h2 className={`text-sm font-medium ${light ? 'text-white' : 'text-slate-900'}`}>
      {children}
    </h2>
  )
}
