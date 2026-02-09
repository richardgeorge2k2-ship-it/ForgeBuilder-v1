import React from 'react'

export function MutedText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-slate-500 leading-relaxed">
      {children}
    </p>
  )
}
